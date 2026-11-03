import { currentGeneral, evaluateChanges } from "../state";
import { sendLivePreviewUpdate } from "../livePreview";

export function setupIdentityModule() {
  const inputContactFullName = document.getElementById("input-contact-fullname") as HTMLInputElement | null;
  const inputContactRole = document.getElementById("input-contact-role") as HTMLInputElement | null;
  const inputContactInstagram = document.getElementById("input-contact-instagram") as HTMLInputElement | null;
  const inputContactTiktok = document.getElementById("input-contact-tiktok") as HTMLInputElement | null;
  const inputContactWhatsapp = document.getElementById("input-contact-whatsapp") as HTMLInputElement | null;
  const paletteCards = document.querySelectorAll(".palette-card");
  const iframe = document.getElementById("preview-frame") as HTMLIFrameElement | null;

  inputContactFullName?.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentGeneral.fullName = val;
    sendLivePreviewUpdate({
      creatorUpdate: {
        fullName: val,
      },
    });
    evaluateChanges();
  });

  inputContactRole?.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentGeneral.role = val;
    sendLivePreviewUpdate({
      creatorUpdate: {
        role: val,
      },
    });
    evaluateChanges();
  });

  inputContactInstagram?.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentGeneral.instagram = val;
    sendLivePreviewUpdate({
      creatorUpdate: {
        instagram: val,
      },
    });
    evaluateChanges();
  });

  inputContactTiktok?.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentGeneral.tiktok = val;
    evaluateChanges();
  });

  inputContactWhatsapp?.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentGeneral.whatsappNumber = val;
    evaluateChanges();
  });

  // Palette cards click
  paletteCards.forEach((card) => {
    card.addEventListener("click", () => {
      const theme = card.getAttribute("data-theme") || "terracotta";
      currentGeneral.theme = theme;

      paletteCards.forEach((c) => {
        c.classList.remove("border-[#A8382B]", "bg-[#361A16]", "active-card");
        c.classList.add("border-[#2D2824]", "bg-[#24201C]");
        const check = c.querySelector(".check-icon");
        if (check) check.classList.add("hidden");
      });

      card.classList.remove("border-[#2D2824]", "bg-[#24201C]");
      card.classList.add("border-[#A8382B]", "bg-[#361A16]", "active-card");
      const check = card.querySelector(".check-icon");
      if (check) check.classList.remove("hidden");

      evaluateChanges();

      // Live update in iframe
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.document.documentElement.setAttribute("data-theme", theme);
        } catch (e) {
          iframe.src = `/?theme=${theme}`;
        }
      }
    });
  });
}
