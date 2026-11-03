import { currentCollections, markCollectionDeleted, evaluateChanges } from "../state";
import { sendLivePreviewUpdate } from "../livePreview";

function setupScrollToCard(btn: Element) {
  const panelsContainer = document.getElementById("panels-container");
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    if (!targetId) return;
    const targetCard = document.getElementById(targetId);
    if (targetCard && panelsContainer) {
      const cardTop = targetCard.offsetTop;
      panelsContainer.scrollTo({
        top: Math.max(0, cardTop - 12),
        behavior: "smooth",
      });
      targetCard.classList.add("border-[#A8382B]", "ring-2", "ring-[#A8382B]/40");
      setTimeout(() => {
        targetCard.classList.remove("border-[#A8382B]", "ring-2", "ring-[#A8382B]/40");
      }, 1500);
    }
  });
}

export function updateServicePills() {
  const pillsContainer = document.getElementById("services-pills-container");
  if (!pillsContainer) return;
  const cards = document.querySelectorAll("#services-list-container .service-card-item");
  let html = '<span class="text-[10px] text-[#8A827B] uppercase font-bold flex-shrink-0">Pular para:</span>';
  cards.forEach((card, idx) => {
    const stepEl = card.querySelector(".service-card-step");
    const stepText = stepEl?.textContent?.trim() || `0${idx + 1}`;
    html += `<button type="button" class="scroll-to-card-btn px-2.5 py-1 rounded-lg bg-[#24201C] hover:bg-[#2D2824] text-[11px] font-semibold text-[#FAF8F5] border border-[#2D2824] hover:border-[#A8382B] transition cursor-pointer flex-shrink-0" data-target="${card.id}">${stepText}</button>`;
  });
  pillsContainer.innerHTML = html;
  pillsContainer.querySelectorAll(".scroll-to-card-btn").forEach(setupScrollToCard);
}

export function bindServiceCard(card: Element) {
  card.querySelectorAll(".service-input").forEach((input) => {
    input.addEventListener("input", (e) => {
      const el = e.target as HTMLInputElement | HTMLTextAreaElement;
      const path = el.getAttribute("data-path");
      const field = el.getAttribute("data-field");
      if (!path || !field) return;

      const data = currentCollections.get(path);
      if (data) {
        data[field] = el.value;
        if (field === "title") {
          const titleEl = card.querySelector(".service-card-title-text");
          if (titleEl) titleEl.textContent = el.value || "Novo Formato";
        }
        evaluateChanges();

        // Live Preview in Iframe
        const allCards = Array.from(document.querySelectorAll("#services-list-container .service-card-item"));
        const index = allCards.indexOf(card);
        if (index !== -1) {
          sendLivePreviewUpdate({
            serviceUpdate: {
              index,
              title: data.title,
              shortDesc: data.shortDesc,
              deliverables: data.deliverables,
              idealFor: data.idealFor,
            },
          });
        }
      }
    });
  });

  const deleteBtn = card.querySelector(".btn-delete-service");
  deleteBtn?.addEventListener("click", () => {
    const path = card.getAttribute("data-path");
    if (!path) return;
    if (confirm("Deseja realmente remover este formato de trabalho?")) {
      markCollectionDeleted(path);
      card.remove();
      updateServicePills();
    }
  });
}

export function setupServicesModule() {
  document.querySelectorAll(".service-card-item").forEach(bindServiceCard);

  const btnAddService = document.getElementById("btn-add-service");
  btnAddService?.addEventListener("click", () => {
    const container = document.getElementById("services-list-container");
    if (!container) return;
    const currentCount = container.querySelectorAll(".service-card-item").length;
    const stepStr = String(currentCount + 1).padStart(2, "0");
    const id = `formato-${Date.now()}`;
    const path = `src/content/services/${id}.json`;
    const newService = {
      title: "Novo Formato de Vídeo",
      step: stepStr,
      shortDesc: "Descrição objetiva da proposta do formato e estilo.",
      deliverables: "Entregável 1, Entregável 2",
      idealFor: "Marcas que buscam alta conversão e diferenciação.",
    };

    currentCollections.set(path, newService);

    const card = document.createElement("div");
    card.id = `card-service-${currentCount}`;
    card.className = "service-card-item p-3.5 rounded-2xl bg-[#24201C] border border-[#2D2824] space-y-2.5 transition-all scroll-mt-2";
    card.setAttribute("data-path", path);
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-white flex items-center gap-2">
          <span class="service-card-step px-2 py-0.5 rounded-md bg-[#A8382B] text-white text-[10px] font-bold">${stepStr}</span>
          <span class="service-card-title-text truncate max-w-[200px]">${newService.title}</span>
        </span>
        <button
          type="button"
          class="btn-delete-service p-1 rounded-lg text-[#8A827B] hover:text-red-400 hover:bg-red-950 transition cursor-pointer"
          data-path="${path}"
          title="Excluir este formato"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      <div>
        <label class="block text-[10px] font-bold text-[#8A827B] mb-1">Nome do Formato</label>
        <input
          type="text"
          class="service-input w-full px-2.5 py-1.5 rounded-lg bg-[#1B1815] border border-[#2D2824] focus:border-[#A8382B] text-xs text-white"
          data-path="${path}"
          data-field="title"
          value="${newService.title}"
        />
      </div>
      <div>
        <label class="block text-[10px] font-bold text-[#8A827B] mb-1">Breve Descrição</label>
        <textarea
          rows="2"
          class="service-input w-full px-2.5 py-1.5 rounded-lg bg-[#1B1815] border border-[#2D2824] focus:border-[#A8382B] text-xs text-white resize-none"
          data-path="${path}"
          data-field="shortDesc"
        >${newService.shortDesc}</textarea>
      </div>
      <div>
        <label class="block text-[10px] font-bold text-[#8A827B] mb-1">O que inclui (separe por vírgula)</label>
        <input
          type="text"
          class="service-input w-full px-2.5 py-1.5 rounded-lg bg-[#1B1815] border border-[#2D2824] focus:border-[#A8382B] text-xs text-white"
          data-path="${path}"
          data-field="deliverables"
          value="${newService.deliverables}"
        />
      </div>
      <div>
        <label class="block text-[10px] font-bold text-[#8A827B] mb-1">Ideal para</label>
        <input
          type="text"
          class="service-input w-full px-2.5 py-1.5 rounded-lg bg-[#1B1815] border border-[#2D2824] focus:border-[#A8382B] text-xs text-white"
          data-path="${path}"
          data-field="idealFor"
          value="${newService.idealFor}"
        />
      </div>
    `;
    container.appendChild(card);
    bindServiceCard(card);
    updateServicePills();
    evaluateChanges();
    card.scrollIntoView({ behavior: "smooth" });
  });
}
