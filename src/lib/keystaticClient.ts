/**
 * Keystatic Client Adapter
 * Suporta tanto o modo Local (DEV via /api/keystatic/update)
 * quanto o modo Cloud (PROD via GitHub GraphQL proxy da Keystatic Cloud).
 */

export interface FileAddition {
  path: string;
  contents: string; // Conteúdo em texto UTF-8 plano (ex: JSON stringificado)
}

export interface SaveOptions {
  message: string;
  files: FileAddition[];
}

export interface AuthStatus {
  isLocal: boolean;
  isAuthenticated: boolean;
  token?: string;
  project?: string;
}

const KEYSTATIC_CLOUD_API_URL = "https://api.keystatic.cloud";
const PROJECT_ID = "website-amanda-ugc/website-amandaugc";
const REPO_OWNER = "Andrelzinnn";
const REPO_NAME = "website-amandaugc";
const BRANCH_NAME = "main";

/**
 * Converte string UTF-8 para Base64 seguro para binários/Git
 */
export function toBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
  return btoa(binString);
}

/**
 * Verifica o status de autenticação atual no navegador
 */
export function getKeystaticAuth(): AuthStatus {
  if (typeof window === "undefined") {
    return { isLocal: false, isAuthenticated: false };
  }

  // Verifica se está rodando localmente
  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (isLocal) {
    return { isLocal: true, isAuthenticated: true };
  }

  // Em produção, lê a sessão gravada pelo Keystatic
  const raw = localStorage.getItem("keystatic-cloud-access-token");
  if (!raw) {
    return { isLocal: false, isAuthenticated: false };
  }

  try {
    const data = JSON.parse(raw);
    const validUntil = new Date(data.validUntil);
    const isExpired = validUntil.getTime() <= Date.now();

    if (isExpired || data.project !== PROJECT_ID) {
      return { isLocal: false, isAuthenticated: false };
    }

    return {
      isLocal: false,
      isAuthenticated: true,
      token: data.token,
      project: data.project,
    };
  } catch (err) {
    return { isLocal: false, isAuthenticated: false };
  }
}

/**
 * Redireciona a usuária para a autenticação do Keystatic Cloud
 */
export function redirectToLogin(returnPath: string = "/admin") {
  if (typeof window === "undefined") return;
  // Redireciona para o próprio painel do Keystatic que já faz o handshake OAuth completo
  window.location.href = `/keystatic/branch/main/singleton/general`;
}

/**
 * Salva arquivos de conteúdo tanto localmente quanto na nuvem
 */
export async function saveContentFiles(options: SaveOptions): Promise<{ success: boolean; sha?: string; error?: string }> {
  const auth = getKeystaticAuth();

  // 1. Modo Local (DEV)
  if (auth.isLocal) {
    try {
      const res = await fetch("/api/keystatic/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "no-cors": "1",
        },
        body: JSON.stringify({
          additions: options.files.map((f) => ({
            path: f.path,
            contents: toBase64(f.contents),
          })),
          deletions: [],
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Falha ao salvar localmente no Keystatic");
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Erro desconhecido em modo local" };
    }
  }

  // 2. Modo Produção (Keystatic Cloud)
  if (!auth.isAuthenticated || !auth.token) {
    return {
      success: false,
      error: "Sessão não autenticada. Faça login no Keystatic antes de publicar.",
    };
  }

  try {
    const graphqlEndpoint = `${KEYSTATIC_CLOUD_API_URL}/v1/github/graphql`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-keystatic-version": "0.5.0",
    };

    // A. Busca o OID (SHA) atual do HEAD da branch
    const refQuery = `
      query FetchRef($owner: String!, $name: String!, $ref: String!) {
        repository(owner: $owner, name: $name) {
          ref(qualifiedName: $ref) {
            target {
              oid
            }
          }
        }
      }
    `;

    const refRes = await fetch(graphqlEndpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: refQuery,
        variables: {
          owner: REPO_OWNER,
          name: REPO_NAME,
          ref: `refs/heads/${BRANCH_NAME}`,
        },
      }),
    });

    const refJson = await refRes.json();
    const headOid = refJson?.data?.repository?.ref?.target?.oid;

    if (!headOid) {
      throw new Error("Não foi possível obter o commit atual do repositório no GitHub.");
    }

    // B. Envia a mutation CreateCommit
    const commitMutation = `
      mutation CreateCommit($input: CreateCommitOnBranchInput!) {
        createCommitOnBranch(input: $input) {
          ref {
            target {
              oid
            }
          }
        }
      }
    `;

    const commitRes = await fetch(graphqlEndpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: commitMutation,
        variables: {
          input: {
            branch: {
              repositoryNameWithOwner: `${REPO_OWNER}/${REPO_NAME}`,
              branchName: BRANCH_NAME,
            },
            expectedHeadOid: headOid,
            message: {
              headline: options.message,
            },
            fileChanges: {
              additions: options.files.map((f) => ({
                path: f.path,
                contents: toBase64(f.contents),
              })),
              deletions: [],
            },
          },
        },
      }),
    });

    const commitJson = await commitRes.json();
    if (commitJson.errors && commitJson.errors.length > 0) {
      throw new Error(commitJson.errors[0]?.message || "Erro na mutação GraphQL de commit");
    }

    const newSha = commitJson?.data?.createCommitOnBranch?.ref?.target?.oid;
    return { success: true, sha: newSha };
  } catch (err: any) {
    return { success: false, error: err?.message || "Erro ao conectar com Keystatic Cloud" };
  }
}
