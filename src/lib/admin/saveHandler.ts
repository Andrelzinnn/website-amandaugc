import {
  currentGeneral,
  initialGeneral,
  currentTopbar,
  initialTopbar,
  currentHero,
  initialHero,
  currentCollections,
  initialCollections,
  deletedCollections,
  evaluateChanges,
} from "./state";
import { saveContentFiles, getKeystaticAuth, redirectToLogin } from "../keystaticClient";

export function setupSaveHandler() {
  const btnSaveAll = document.getElementById("btn-save-all") as HTMLButtonElement | null;
  const saveBtnText = document.getElementById("save-btn-text");
  const saveFeedback = document.getElementById("save-feedback");

  btnSaveAll?.addEventListener("click", async () => {
    const { isGeneralChanged, isTopbarChanged, isHeroChanged, totalChanged } = evaluateChanges();
    if (totalChanged === 0) return;

    const auth = getKeystaticAuth();
    const isDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

    if (!isDev && !auth.isAuthenticated) {
      if (saveFeedback) {
        saveFeedback.className = "text-center text-[11px] font-semibold py-2.5 px-3 rounded-xl bg-amber-950/90 border border-amber-700 text-amber-200 block";
        saveFeedback.innerHTML = `<span>Você precisa se conectar para salvar alterações.<br><button type="button" id="feedback-login-btn" class="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#A8382B] hover:bg-[#82271D] text-white font-bold text-xs cursor-pointer shadow">Fazer Login no Studio ↗</button></span>`;
        document.getElementById("feedback-login-btn")?.addEventListener("click", () => {
          redirectToLogin();
        });
      }
      return;
    }

    btnSaveAll.disabled = true;
    btnSaveAll.className = "w-full py-2.5 px-4 rounded-xl bg-[#24201C] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-wait border border-[#2D2824]";
    if (saveBtnText) saveBtnText.textContent = "Salvando no site...";
    if (saveFeedback) saveFeedback.classList.add("hidden");

    const filesToSave: { path: string; contents: string }[] = [];
    const commitParts: string[] = [];

    if (isTopbarChanged) {
      filesToSave.push({
        path: "src/content/topbar.json",
        contents: JSON.stringify(currentTopbar, null, 2) + "\n",
      });
      commitParts.push("aviso do topo");
    }

    if (isHeroChanged) {
      filesToSave.push({
        path: "src/content/hero.json",
        contents: JSON.stringify(currentHero, null, 2) + "\n",
      });
      commitParts.push("hero");
    }

    if (isGeneralChanged) {
      filesToSave.push({
        path: "src/content/general.json",
        contents: JSON.stringify(currentGeneral, null, 2) + "\n",
      });
      commitParts.push("identidade e contato");
    }

    // Add changed or new collection items (excluding deleted)
    currentCollections.forEach((currData, path) => {
      if (deletedCollections.has(path)) return;
      const initData = initialCollections.get(path);
      if (!initData || JSON.stringify(currData) !== JSON.stringify(initData)) {
        filesToSave.push({
          path,
          contents: JSON.stringify(currData, null, 2) + "\n",
        });
        commitParts.push(path.split("/").pop()?.replace(".json", "") || "conteúdo");
      }
    });

    // Add deletions
    const deletionsToSave = Array.from(deletedCollections).map((p) => {
      commitParts.push(`remove ${p.split("/").pop()?.replace(".json", "") || "item"}`);
      return { path: p };
    });

    const commitMessage = `Atualiza ${commitParts.slice(0, 3).join(", ")}${commitParts.length > 3 ? "..." : ""} via Studio Admin`;

    const result = await saveContentFiles({
      message: commitMessage,
      files: filesToSave,
      deletions: deletionsToSave.length > 0 ? deletionsToSave : undefined,
    });

    if (result.success) {
      // Sync deleted collections
      deletedCollections.forEach((p) => {
        initialCollections.delete(p);
        currentCollections.delete(p);
      });
      deletedCollections.clear();

      // Sync initial state with current state
      Object.assign(initialGeneral, currentGeneral);
      Object.assign(initialTopbar, currentTopbar);
      Object.assign(initialHero, currentHero);

      currentCollections.forEach((currData, path) => {
        initialCollections.set(path, JSON.parse(JSON.stringify(currData)));
      });

      evaluateChanges();

      if (saveFeedback) {
        saveFeedback.className = "text-center text-[11px] font-semibold py-1.5 px-2.5 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-300 block";
        saveFeedback.textContent = "✓ Alterações publicadas com sucesso!";
        setTimeout(() => {
          saveFeedback.classList.add("hidden");
        }, 5000);
      }
    } else {
      evaluateChanges();
      if (saveFeedback) {
        saveFeedback.className = "text-center text-[11px] font-semibold py-2 px-3 rounded-lg bg-red-950 border border-red-800 text-red-300 block";
        if (result.error?.toLowerCase().includes("autentica") || result.error?.toLowerCase().includes("login")) {
          saveFeedback.innerHTML = `<span>Erro: ${result.error}<br><button type="button" id="err-login-btn" class="mt-1.5 underline text-amber-300 hover:text-white font-bold cursor-pointer">Fazer Login agora ↗</button></span>`;
          document.getElementById("err-login-btn")?.addEventListener("click", () => {
            redirectToLogin();
          });
        } else {
          saveFeedback.textContent = `Erro: ${result.error || "Falha ao salvar"}`;
        }
      }
    }
  });
}
