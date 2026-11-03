import { currentCollections, markCollectionDeleted, evaluateChanges } from "../state";
import { sendLivePreviewUpdate, toDirectGoogleDriveUrl } from "../livePreview";

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

export function updateCasePills() {
  const pillsContainer = document.getElementById("cases-pills-container");
  if (!pillsContainer) return;
  const cards = document.querySelectorAll("#cases-list-container .case-card-item");
  let html = '<span class="text-[10px] text-[#8A827B] uppercase font-bold flex-shrink-0">Pular para:</span>';
  cards.forEach((card, idx) => {
    html += `<button type="button" class="scroll-to-card-btn px-2.5 py-1 rounded-lg bg-[#24201C] hover:bg-[#2D2824] text-[11px] font-semibold text-[#FAF8F5] border border-[#2D2824] hover:border-[#A8382B] transition cursor-pointer flex-shrink-0" data-target="${card.id}">Caso ${idx + 1}</button>`;
  });
  pillsContainer.innerHTML = html;
  pillsContainer.querySelectorAll(".scroll-to-card-btn").forEach(setupScrollToCard);
}

export function bindCaseCard(card: Element) {
  card.querySelectorAll(".case-input").forEach((input) => {
    input.addEventListener("input", (e) => {
      const el = e.target as HTMLInputElement | HTMLTextAreaElement;
      const path = el.getAttribute("data-path");
      const field = el.getAttribute("data-field");
      if (!path || !field) return;

      const data = currentCollections.get(path);
      if (data) {
        data[field] = el.value;
        if (field === "brand") {
          const brandDisplay = card.querySelector(".case-card-brand-display");
          if (brandDisplay) brandDisplay.textContent = el.value || "Novo Case";
        } else if (field === "stats") {
          const statsDisplay = card.querySelector(".case-card-stats-display");
          if (statsDisplay) statsDisplay.textContent = el.value || "+0%";
        }
        evaluateChanges();

        // Live Preview in Iframe
        const allCards = Array.from(document.querySelectorAll("#cases-list-container .case-card-item"));
        const index = allCards.indexOf(card);
        if (index !== -1) {
          sendLivePreviewUpdate({
            caseUpdate: {
              index,
              brand: data.brand,
              title: data.title,
              stats: data.stats,
              badge: data.badge,
              highlightMetric: data.highlightMetric,
              metricLabel: data.metricLabel,
              quote: data.quote,
              author: data.author,
              thumbnail: toDirectGoogleDriveUrl(data.thumbnail),
              youtubeId: data.youtubeId,
            },
          });
        }
      }
    });
  });

  const deleteBtn = card.querySelector(".btn-delete-case");
  deleteBtn?.addEventListener("click", () => {
    const path = card.getAttribute("data-path");
    if (!path) return;
    if (confirm("Deseja realmente remover este case de destaque?")) {
      markCollectionDeleted(path);
      card.remove();
      updateCasePills();
    }
  });
}

export function setupCasesModule() {
  document.querySelectorAll(".case-card-item").forEach(bindCaseCard);

  const btnAddCase = document.getElementById("btn-add-case");
  btnAddCase?.addEventListener("click", () => {
    const container = document.getElementById("cases-list-container");
    if (!container) return;
    const currentCount = container.querySelectorAll(".case-card-item").length;
    const id = `case-${Date.now()}`;
    const path = `src/content/cases/${id}.json`;
    const newCase = {
      brand: "Nova Marca",
      title: "Novo Criativo UGC",
      badge: "Vídeo UGC",
      thumbnail: "",
      youtubeId: "",
      stats: "+50% conversão",
      highlightMetric: "+50%",
      metricLabel: "Aumento na Taxa de Conversão",
      pillar1: "Gancho visual forte",
      pillar2: "Demonstração autêntica",
      pillar3: "Chamada para ação clara",
      quote: "Os vídeos geraram alto retorno sobre o investimento em nossos anúncios.",
      author: "Head de Marketing",
    };

    currentCollections.set(path, newCase);

    const card = document.createElement("div");
    card.id = `card-case-${currentCount}`;
    card.className = "case-card-item p-3.5 rounded-2xl bg-[#24201C] border border-[#2D2824] space-y-2.5 transition-all scroll-mt-2";
    card.setAttribute("data-path", path);
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-white truncate max-w-[200px] case-card-brand-display">${newCase.brand}</span>
        <div class="flex items-center gap-2">
          <span class="text-[10px] px-2 py-0.5 rounded bg-[#1B1815] text-[#C28D3F] border border-[#2D2824] font-semibold case-card-stats-display">${newCase.stats}</span>
          <button
            type="button"
            class="btn-delete-case p-1 rounded-lg text-[#8A827B] hover:text-red-400 hover:bg-red-950 transition cursor-pointer"
            data-path="${path}"
            title="Excluir este case"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div>
          <label class="block text-[10px] font-bold text-[#8A827B] mb-1">Marca / Produto</label>
          <input
            type="text"
            class="case-input w-full px-2.5 py-1.5 rounded-lg bg-[#1B1815] border border-[#2D2824] focus:border-[#A8382B] text-xs text-white"
            data-path="${path}"
            data-field="brand"
            value="${newCase.brand}"
            placeholder="Ex: Lumière Cosméticos"
          />
        </div>
        <div>
          <label class="block text-[10px] font-bold text-[#8A827B] mb-1">Métrica Resumida (Badge)</label>
          <input
            type="text"
            class="case-input w-full px-2.5 py-1.5 rounded-lg bg-[#1B1815] border border-[#2D2824] focus:border-[#A8382B] text-xs text-white"
            data-path="${path}"
            data-field="stats"
            value="${newCase.stats}"
            placeholder="Ex: 450k views · Conversão +42%"
          />
        </div>
      </div>
      <div>
        <label class="block text-[10px] font-bold text-[#8A827B] mb-1">Título do Criativo / Case</label>
        <input
          type="text"
          class="case-input w-full px-2.5 py-1.5 rounded-lg bg-[#1B1815] border border-[#2D2824] focus:border-[#A8382B] text-xs text-white"
          data-path="${path}"
          data-field="title"
          value="${newCase.title}"
        />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div>
          <label class="block text-[10px] font-bold text-[#8A827B] mb-1">Número Destaque</label>
          <input
            type="text"
            class="case-input w-full px-2.5 py-1.5 rounded-lg bg-[#1B1815] border border-[#2D2824] focus:border-[#A8382B] text-xs text-white"
            data-path="${path}"
            data-field="highlightMetric"
            value="${newCase.highlightMetric}"
          />
        </div>
        <div>
          <label class="block text-[10px] font-bold text-[#8A827B] mb-1">Descrição Métrica</label>
          <input
            type="text"
            class="case-input w-full px-2.5 py-1.5 rounded-lg bg-[#1B1815] border border-[#2D2824] focus:border-[#A8382B] text-xs text-white"
            data-path="${path}"
            data-field="metricLabel"
            value="${newCase.metricLabel}"
          />
        </div>
      </div>
      <div>
        <label class="block text-[10px] font-bold text-[#8A827B] mb-1">Depoimento da Marca</label>
        <textarea
          rows="2"
          class="case-input w-full px-2.5 py-1.5 rounded-lg bg-[#1B1815] border border-[#2D2824] focus:border-[#A8382B] text-xs text-white resize-none"
          data-path="${path}"
          data-field="quote"
        >${newCase.quote}</textarea>
      </div>
      <div>
        <label class="block text-[10px] font-bold text-[#8A827B] mb-1">Autor do Depoimento</label>
        <input
          type="text"
          class="case-input w-full px-2.5 py-1.5 rounded-lg bg-[#1B1815] border border-[#2D2824] focus:border-[#A8382B] text-xs text-white"
          data-path="${path}"
          data-field="author"
          value="${newCase.author}"
        />
      </div>
      <div>
        <label class="block text-[10px] font-bold text-[#8A827B] mb-1">Vídeo (Link Google Drive ou YouTube)</label>
        <input
          type="text"
          class="case-input w-full px-2.5 py-1.5 rounded-lg bg-[#1B1815] border border-[#2D2824] focus:border-[#A8382B] text-xs text-white placeholder-[#8A827B]"
          data-path="${path}"
          data-field="youtubeId"
          value=""
          placeholder="Ex: https://drive.google.com/file/d/... ou ID do YouTube"
        />
      </div>
      <div>
        <label class="block text-[10px] font-bold text-[#8A827B] mb-1">Capa / Thumbnail (Link Google Drive ou Imagem)</label>
        <input
          type="text"
          class="case-input w-full px-2.5 py-1.5 rounded-lg bg-[#1B1815] border border-[#2D2824] focus:border-[#A8382B] text-xs text-white placeholder-[#8A827B]"
          data-path="${path}"
          data-field="thumbnail"
          value=""
          placeholder="Ex: https://drive.google.com/file/d/... ou link de imagem"
        />
      </div>
    `;
    container.appendChild(card);
    bindCaseCard(card);
    updateCasePills();
    evaluateChanges();
    card.scrollIntoView({ behavior: "smooth" });
  });
}
