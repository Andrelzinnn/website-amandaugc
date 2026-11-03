import type { ChangeEvaluation, CollectionItem } from "./types";

// Mutable reactive states
export const initialGeneral: any = {};
export const currentGeneral: any = {};

export const initialTopbar: any = {};
export const currentTopbar: any = {};

export const initialHero: any = {};
export const currentHero: any = {};

export const initialCollections = new Map<string, any>();
export const currentCollections = new Map<string, any>();
export const deletedCollections = new Set<string>();

export function initState(
  general: any,
  topbar: any,
  hero: any,
  collections: CollectionItem[]
) {
  Object.assign(initialGeneral, JSON.parse(JSON.stringify(general || {})));
  Object.assign(currentGeneral, JSON.parse(JSON.stringify(general || {})));

  Object.assign(initialTopbar, JSON.parse(JSON.stringify(topbar || {})));
  Object.assign(currentTopbar, JSON.parse(JSON.stringify(topbar || {})));

  Object.assign(initialHero, JSON.parse(JSON.stringify(hero || {})));
  Object.assign(currentHero, JSON.parse(JSON.stringify(hero || {})));

  initialCollections.clear();
  currentCollections.clear();
  deletedCollections.clear();

  if (Array.isArray(collections)) {
    collections.forEach((item) => {
      initialCollections.set(item.path, JSON.parse(JSON.stringify(item.data)));
      currentCollections.set(item.path, JSON.parse(JSON.stringify(item.data)));
    });
  }
}

export function markCollectionDeleted(path: string) {
  currentCollections.delete(path);
  if (initialCollections.has(path)) {
    deletedCollections.add(path);
  } else {
    deletedCollections.delete(path);
  }
  evaluateChanges();
}

export function evaluateChanges(): ChangeEvaluation {
  const pendingBadge = document.getElementById("pending-badge");
  const pendingCount = document.getElementById("pending-count");
  const mobilePreviewBadge = document.getElementById("mobile-preview-badge");
  const btnSaveAll = document.getElementById("btn-save-all") as HTMLButtonElement | null;
  const saveBtnText = document.getElementById("save-btn-text");

  let changedCount = 0;

  const isGeneralChanged = JSON.stringify(currentGeneral) !== JSON.stringify(initialGeneral);
  const isTopbarChanged = JSON.stringify(currentTopbar) !== JSON.stringify(initialTopbar);
  const isHeroChanged = JSON.stringify(currentHero) !== JSON.stringify(initialHero);

  if (isGeneralChanged) changedCount++;
  if (isTopbarChanged) changedCount++;
  if (isHeroChanged) changedCount++;

  // Check collections
  let collectionsChanged = 0;
  currentCollections.forEach((currData, path) => {
    if (deletedCollections.has(path)) return;
    const initData = initialCollections.get(path);
    if (!initData || JSON.stringify(currData) !== JSON.stringify(initData)) {
      collectionsChanged++;
    }
  });

  const totalChanged = changedCount + collectionsChanged + deletedCollections.size;

  if (totalChanged > 0) {
    if (pendingBadge) {
      pendingBadge.classList.remove("hidden");
      pendingBadge.classList.add("flex");
    }
    if (pendingCount) {
      pendingCount.textContent = `${totalChanged} item${totalChanged > 1 ? "ns" : ""} modificado${totalChanged > 1 ? "s" : ""}`;
    }
    if (mobilePreviewBadge) {
      mobilePreviewBadge.classList.remove("hidden");
    }

    if (btnSaveAll && saveBtnText) {
      btnSaveAll.disabled = false;
      btnSaveAll.className = "w-full py-2.5 px-4 rounded-xl bg-[#A8382B] hover:bg-[#8B2C21] active:bg-[#72231A] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#A8382B]";
      saveBtnText.textContent = "Salvar e Publicar no Site";
    }
  } else {
    if (pendingBadge) {
      pendingBadge.classList.add("hidden");
      pendingBadge.classList.remove("flex");
    }
    if (mobilePreviewBadge) {
      mobilePreviewBadge.classList.add("hidden");
    }

    if (btnSaveAll && saveBtnText) {
      btnSaveAll.disabled = true;
      btnSaveAll.className = "w-full py-2.5 px-4 rounded-xl bg-[#24201C] text-[#8A827B] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-not-allowed border border-[#2D2824] select-none";
      saveBtnText.textContent = "Nenhuma Alteração";
    }
  }

  return { isGeneralChanged, isTopbarChanged, isHeroChanged, totalChanged };
}
