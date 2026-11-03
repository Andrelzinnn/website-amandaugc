import { currentTopbar, evaluateChanges } from "../state";
import { updateIframeText } from "../livePreview";

export function setupTopbarModule() {
  const inputTopbarBadge = document.getElementById("input-topbar-badge") as HTMLInputElement | null;
  const inputTopbarText = document.getElementById("input-topbar-text") as HTMLTextAreaElement | null;
  const inputTopbarCta = document.getElementById("input-topbar-cta") as HTMLInputElement | null;

  inputTopbarBadge?.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentTopbar.badge = val;
    updateIframeText('[data-i18n="topbar.badge"]', val);
    evaluateChanges();
  });

  inputTopbarText?.addEventListener("input", (e) => {
    const val = (e.target as HTMLTextAreaElement).value;
    currentTopbar.text = val;
    updateIframeText('[data-i18n="topbar.text"]', val);
    evaluateChanges();
  });

  inputTopbarCta?.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentTopbar.ctaText = val;
    updateIframeText('[data-i18n="topbar.cta"]', val);
    evaluateChanges();
  });

  // Topbar presets buttons
  document.querySelectorAll(".topbar-preset-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const badge = btn.getAttribute("data-badge") || "";
      const text = btn.getAttribute("data-text") || "";
      const cta = btn.getAttribute("data-cta") || "";

      if (inputTopbarBadge) inputTopbarBadge.value = badge;
      if (inputTopbarText) inputTopbarText.value = text;
      if (inputTopbarCta) inputTopbarCta.value = cta;

      currentTopbar.badge = badge;
      currentTopbar.text = text;
      currentTopbar.ctaText = cta;

      updateIframeText('[data-i18n="topbar.badge"]', badge);
      updateIframeText('[data-i18n="topbar.text"]', text);
      updateIframeText('[data-i18n="topbar.cta"]', cta);

      evaluateChanges();
    });
  });
}
