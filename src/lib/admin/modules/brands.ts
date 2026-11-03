import { currentGeneral, currentCollections, markCollectionDeleted, evaluateChanges } from "../state";
import { sendLivePreviewUpdate } from "../livePreview";

export function setupBrandsModule() {
  const toggleShowBrands = document.getElementById("toggle-show-brands") as HTMLInputElement | null;
  const toggleIllustrativeNotice = document.getElementById("toggle-illustrative-notice") as HTMLInputElement | null;
  const badgeBrandsStatus = document.getElementById("badge-brands-status");
  const badgeNoticeStatus = document.getElementById("badge-notice-status");

  toggleShowBrands?.addEventListener("change", (e) => {
    const isChecked = (e.target as HTMLInputElement).checked;
    currentGeneral.showBrandsSection = isChecked;
    if (badgeBrandsStatus) {
      if (isChecked) {
        badgeBrandsStatus.textContent = "Ativo";
        badgeBrandsStatus.className = "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800/60";
      } else {
        badgeBrandsStatus.textContent = "Oculto no Site";
        badgeBrandsStatus.className = "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-zinc-800 text-zinc-400 border border-zinc-700";
      }
    }
    sendLivePreviewUpdate({ legalUpdate: { showBrandsSection: isChecked } });
    evaluateChanges();
  });

  toggleIllustrativeNotice?.addEventListener("change", (e) => {
    const isChecked = (e.target as HTMLInputElement).checked;
    currentGeneral.illustrativeBrandsNotice = isChecked;
    if (badgeNoticeStatus) {
      if (isChecked) {
        badgeNoticeStatus.textContent = "Modo Teste / Exemplo";
        badgeNoticeStatus.className = "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-950 text-amber-300 border border-amber-800/60";
      } else {
        badgeNoticeStatus.textContent = "Modo Oficial Verificado";
        badgeNoticeStatus.className = "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800/60";
      }
    }
    sendLivePreviewUpdate({ legalUpdate: { illustrativeBrandsNotice: isChecked } });
    evaluateChanges();
  });

  function updateBrandsLivePreview() {
    const brandsList: { name: string }[] = [];
    const rows = document.querySelectorAll("#brands-list-container .brand-item-row");
    rows.forEach((row) => {
      const input = row.querySelector(".brand-input") as HTMLInputElement | null;
      if (input && input.value.trim()) {
        brandsList.push({ name: input.value.trim() });
      }
    });
    sendLivePreviewUpdate({ brandsUpdate: brandsList });
  }

  function bindBrandRow(row: Element) {
    const input = row.querySelector(".brand-input");
    input?.addEventListener("input", (e) => {
      const el = e.target as HTMLInputElement;
      const path = el.getAttribute("data-path");
      const field = el.getAttribute("data-field");
      if (!path || !field) return;

      const data = currentCollections.get(path);
      if (data) {
        data[field] = el.value;
        evaluateChanges();
        updateBrandsLivePreview();
      }
    });

    const deleteBtn = row.querySelector(".btn-delete-brand");
    deleteBtn?.addEventListener("click", () => {
      const path = row.getAttribute("data-path");
      if (!path) return;
      if (confirm("Deseja realmente remover esta marca parceira?")) {
        markCollectionDeleted(path);
        row.remove();
        evaluateChanges();
        updateBrandsLivePreview();
      }
    });
  }

  // Bind existing brand rows
  document.querySelectorAll("#brands-list-container .brand-item-row").forEach(bindBrandRow);

  // Add Brand Button
  const btnAddBrand = document.getElementById("btn-add-brand");
  btnAddBrand?.addEventListener("click", () => {
    const container = document.getElementById("brands-list-container");
    if (!container) return;
    const id = `marca-${Date.now()}`;
    const path = `src/content/brands/${id}.json`;
    currentCollections.set(path, { name: "" });

    const row = document.createElement("div");
    row.className = "brand-item-row p-2.5 rounded-xl bg-[#24201C] border border-[#2D2824] flex items-center gap-2";
    row.setAttribute("data-path", path);
    row.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-[#C28D3F]"></span>
      <input
        type="text"
        class="brand-input flex-1 px-2.5 py-1 rounded-lg bg-[#1B1815] border border-[#2D2824] focus:border-[#A8382B] text-xs text-white"
        data-path="${path}"
        data-field="name"
        value=""
        placeholder="Nome da Marca"
      />
      <button
        type="button"
        class="btn-delete-brand p-1.5 rounded-lg text-[#8A827B] hover:text-red-400 hover:bg-red-950 transition cursor-pointer"
        data-path="${path}"
        title="Remover marca"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    `;
    container.appendChild(row);
    bindBrandRow(row);
    (row.querySelector(".brand-input") as HTMLInputElement)?.focus();
    evaluateChanges();
    updateBrandsLivePreview();
  });
}
