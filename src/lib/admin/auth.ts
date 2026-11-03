import { getKeystaticAuth, redirectToLogin } from "../keystaticClient";

export function updateAuthUI() {
  const auth = getKeystaticAuth();
  const isDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

  const headerLoginBtn = document.getElementById("header-login-btn");
  const headerAuthBadge = document.getElementById("header-auth-badge");
  const authWarningBanner = document.getElementById("auth-warning-banner");
  const bannerLoginBtn = document.getElementById("banner-login-btn");
  const authStatusDot = document.getElementById("auth-status-dot");
  const authStatusText = document.getElementById("auth-status-text");
  const btnAuthAction = document.getElementById("btn-auth-action") as HTMLButtonElement | null;

  if (isDev) {
    if (authStatusDot) authStatusDot.className = "w-2 h-2 rounded-full bg-emerald-500";
    if (authStatusText) authStatusText.textContent = "Modo Local (Dev)";
    if (btnAuthAction) btnAuthAction.style.display = "none";
    if (headerLoginBtn) headerLoginBtn.style.display = "none";
    if (headerAuthBadge) {
      headerAuthBadge.style.display = "inline-flex";
      headerAuthBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-500"></span><span>Modo Local</span>';
    }
    if (authWarningBanner) authWarningBanner.style.display = "none";
  } else if (auth.isAuthenticated) {
    if (authStatusDot) authStatusDot.className = "w-2 h-2 rounded-full bg-emerald-500";
    if (authStatusText) authStatusText.textContent = "Conectado ao Studio";
    if (btnAuthAction) btnAuthAction.style.display = "none";
    if (headerLoginBtn) headerLoginBtn.style.display = "none";
    if (headerAuthBadge) {
      headerAuthBadge.style.display = "inline-flex";
      headerAuthBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-500"></span><span>Conectado</span>';
    }
    if (authWarningBanner) authWarningBanner.style.display = "none";
  } else {
    if (authStatusDot) authStatusDot.className = "w-2 h-2 rounded-full bg-amber-500 animate-pulse";
    if (authStatusText) authStatusText.textContent = "Sessão Desconectada";
    if (btnAuthAction) {
      btnAuthAction.style.display = "inline-block";
      btnAuthAction.onclick = () => redirectToLogin();
    }
    if (headerLoginBtn) {
      headerLoginBtn.style.display = "inline-flex";
      headerLoginBtn.onclick = () => redirectToLogin();
    }
    if (headerAuthBadge) {
      headerAuthBadge.style.display = "none";
    }
    if (authWarningBanner) {
      authWarningBanner.style.display = "block";
      if (bannerLoginBtn) {
        bannerLoginBtn.onclick = () => redirectToLogin();
      }
    }
  }
}

export function setupAuth() {
  updateAuthUI();
  window.addEventListener("storage", updateAuthUI);
  window.addEventListener("focus", updateAuthUI);
}
