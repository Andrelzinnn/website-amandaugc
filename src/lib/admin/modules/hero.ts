import { currentHero, evaluateChanges } from "../state";
import { updateIframeText, sendLivePreviewUpdate, toDirectGoogleDriveUrl } from "../livePreview";

export function setupHeroModule() {
  const inputHeroHeadline = document.getElementById("input-hero-headline") as HTMLInputElement | null;
  const inputHeroCursive = document.getElementById("input-hero-cursive") as HTMLInputElement | null;
  const inputHeroSubheadline = document.getElementById("input-hero-subheadline") as HTMLTextAreaElement | null;
  const inputHeroPhoto = document.getElementById("input-hero-photo") as HTMLInputElement | null;
  const inputHeroM1Val = document.getElementById("input-hero-m1-val") as HTMLInputElement | null;
  const inputHeroM1Lbl = document.getElementById("input-hero-m1-lbl") as HTMLInputElement | null;
  const inputHeroM2Val = document.getElementById("input-hero-m2-val") as HTMLInputElement | null;
  const inputHeroM2Lbl = document.getElementById("input-hero-m2-lbl") as HTMLInputElement | null;
  const inputHeroM3Val = document.getElementById("input-hero-m3-val") as HTMLInputElement | null;
  const inputHeroM3Lbl = document.getElementById("input-hero-m3-lbl") as HTMLInputElement | null;

  inputHeroHeadline?.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentHero.headline = val;
    updateIframeText('[data-i18n="hero.headline"]', val);
    evaluateChanges();
  });

  inputHeroCursive?.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentHero.headlineCursive = val;
    updateIframeText('[data-i18n="hero.headlineCursive"]', val);
    evaluateChanges();
  });

  inputHeroSubheadline?.addEventListener("input", (e) => {
    const val = (e.target as HTMLTextAreaElement).value;
    currentHero.subheadline = val;
    updateIframeText('[data-i18n="hero.subheadline"]', val);
    evaluateChanges();
  });

  inputHeroPhoto?.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentHero.photoUrl = val;

    sendLivePreviewUpdate({
      imageSelector: "#hero img",
      imageUrl: toDirectGoogleDriveUrl(val),
    });
    evaluateChanges();
  });

  inputHeroM1Val?.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentHero.metric1Value = val;
    updateIframeText('[data-i18n="hero.metric1.value"]', val);
    evaluateChanges();
  });

  inputHeroM1Lbl?.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentHero.metric1Label = val;
    updateIframeText('[data-i18n="hero.metric1.label"]', val);
    evaluateChanges();
  });

  inputHeroM2Val?.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentHero.metric2Value = val;
    updateIframeText('[data-i18n="hero.metric2.value"]', val);
    evaluateChanges();
  });

  inputHeroM2Lbl?.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentHero.metric2Label = val;
    updateIframeText('[data-i18n="hero.metric2.label"]', val);
    evaluateChanges();
  });

  inputHeroM3Val?.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentHero.metric3Value = val;
    updateIframeText('[data-i18n="hero.metric3.value"]', val);
    evaluateChanges();
  });

  inputHeroM3Lbl?.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentHero.metric3Label = val;
    updateIframeText('[data-i18n="hero.metric3.label"]', val);
    evaluateChanges();
  });
}
