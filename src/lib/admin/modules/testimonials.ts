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

export function updateTestimonialPills() {
  const pillsContainer = document.getElementById("testimonials-pills-container");
  if (!pillsContainer) return;
  const cards = document.querySelectorAll("#testimonials-list-container .testimonial-card-item");
  let html = '<span class="text-[10px] text-[#8A827B] uppercase font-bold flex-shrink-0">Pular para:</span>';
  cards.forEach((card, idx) => {
    const displayEl = card.querySelector(".test-card-client-display");
    const label = displayEl?.textContent?.trim().split(" ")[0] || `Depoimento ${idx + 1}`;
    html += `<button type="button" class="scroll-to-card-btn px-2.5 py-1 rounded-lg bg-[#24201C] hover:bg-[#2D2824] text-[11px] font-semibold text-[#FAF8F5] border border-[#2D2824] hover:border-[#A8382B] transition cursor-pointer flex-shrink-0" data-target="${card.id}">${label}</button>`;
  });
  pillsContainer.innerHTML = html;
  pillsContainer.querySelectorAll(".scroll-to-card-btn").forEach(setupScrollToCard);
}

export function bindTestimonialCard(card: Element) {
  card.querySelectorAll(".test-input").forEach((input) => {
    input.addEventListener("input", (e) => {
      const el = e.target as HTMLInputElement | HTMLTextAreaElement;
      const path = el.getAttribute("data-path");
      const field = el.getAttribute("data-field");
      if (!path || !field) return;

      const data = currentCollections.get(path);
      if (data) {
        data[field] = el.value;
        if (field === "clientName") {
          const clientDisplay = card.querySelector(".test-card-client-display");
          if (clientDisplay) clientDisplay.textContent = el.value || "Novo Depoimento";
          updateTestimonialPills();
        }
        evaluateChanges();

        // Live Preview in Iframe
        const allCards = Array.from(document.querySelectorAll("#testimonials-list-container .testimonial-card-item"));
        const index = allCards.indexOf(card);
        if (index !== -1) {
          sendLivePreviewUpdate({
            testUpdate: {
              index,
              clientName: data.clientName,
              brand: data.brand,
              role: data.role,
              quote: data.quote,
            },
          });
        }
      }
    });
  });

  const deleteBtn = card.querySelector(".btn-delete-testimonial");
  deleteBtn?.addEventListener("click", () => {
    const path = card.getAttribute("data-path");
    if (!path) return;
    if (confirm("Deseja realmente remover este depoimento?")) {
      markCollectionDeleted(path);
      card.remove();
      updateTestimonialPills();
    }
  });
}

export function setupTestimonialsModule() {
  document.querySelectorAll(".testimonial-card-item").forEach(bindTestimonialCard);

  const btnAddTestimonial = document.getElementById("btn-add-testimonial");
  btnAddTestimonial?.addEventListener("click", () => {
    const container = document.getElementById("testimonials-list-container");
    if (!container) return;
    const currentCount = container.querySelectorAll(".testimonial-card-item").length;
    const id = `depoimento-${Date.now()}`;
    const path = `src/content/testimonials/${id}.json`;
    const newTest = {
      clientName: "Novo Cliente",
      brand: "Marca Parceira",
      role: "Gestor(a)",
      quote: "Excelente experiência trabalhando juntos. Conteúdo autêntico e de alto impacto para nossos resultados.",
    };

    currentCollections.set(path, newTest);

    const card = document.createElement("div");
    card.id = `card-test-${currentCount}`;
    card.className = "testimonial-card-item p-3.5 rounded-2xl bg-[#24201C] border border-[#2D2824] space-y-2.5 transition-all scroll-mt-2";
    card.setAttribute("data-path", path);
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-white truncate max-w-[200px] test-card-client-display">${newTest.clientName}</span>
        <button
          type="button"
          class="btn-delete-testimonial p-1 rounded-lg text-[#8A827B] hover:text-red-400 hover:bg-red-950 transition cursor-pointer"
          data-path="${path}"
          title="Excluir este depoimento"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div>
          <label class="block text-[10px] font-bold text-[#8A827B] mb-1">Nome do Cliente</label>
          <input
            type="text"
            class="test-input w-full px-2.5 py-1.5 rounded-lg bg-[#1B1815] border border-[#2D2824] focus:border-[#A8382B] text-xs text-white"
            data-path="${path}"
            data-field="clientName"
            value="${newTest.clientName}"
          />
        </div>
        <div>
          <label class="block text-[10px] font-bold text-[#8A827B] mb-1">Empresa / Marca</label>
          <input
            type="text"
            class="test-input w-full px-2.5 py-1.5 rounded-lg bg-[#1B1815] border border-[#2D2824] focus:border-[#A8382B] text-xs text-white"
            data-path="${path}"
            data-field="brand"
            value="${newTest.brand}"
          />
        </div>
      </div>
      <div>
        <label class="block text-[10px] font-bold text-[#8A827B] mb-1">Cargo</label>
        <input
          type="text"
          class="test-input w-full px-2.5 py-1.5 rounded-lg bg-[#1B1815] border border-[#2D2824] focus:border-[#A8382B] text-xs text-white"
          data-path="${path}"
          data-field="role"
          value="${newTest.role}"
        />
      </div>
      <div>
        <label class="block text-[10px] font-bold text-[#8A827B] mb-1">Texto do Depoimento</label>
        <textarea
          rows="2"
          class="test-input w-full px-2.5 py-1.5 rounded-lg bg-[#1B1815] border border-[#2D2824] focus:border-[#A8382B] text-xs text-white resize-none"
          data-path="${path}"
          data-field="quote"
        >${newTest.quote}</textarea>
      </div>
    `;
    container.appendChild(card);
    bindTestimonialCard(card);
    updateTestimonialPills();
    evaluateChanges();
    card.scrollIntoView({ behavior: "smooth" });
  });
}
