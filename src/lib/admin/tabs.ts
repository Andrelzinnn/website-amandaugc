let isProgrammaticScroll = false;
let scrollTimeout: any = null;
let lastSpiedSection = "";

const sectionToTabMap: Record<string, string> = {
  hero: "hero",
  marcas: "brands",
  cases: "cases",
  servicos: "services",
  depoimentos: "testimonials",
  contato: "contact",
};

export function activateTab(targetTab: string, scrollIframe: boolean = true) {
  const moduleTabs = document.querySelectorAll(".module-tab");
  const tabPanels = document.querySelectorAll(".tab-panel");
  const tabsScrollContainer = document.getElementById("tabs-scroll-container");
  const iframe = document.getElementById("preview-frame") as HTMLIFrameElement | null;

  const targetBtn = document.querySelector(`.module-tab[data-tab="${targetTab}"]`);
  if (!targetBtn) return;

  moduleTabs.forEach((t) => {
    t.classList.remove("active", "bg-[#24201C]", "text-white", "border-[#3D3630]");
    t.classList.add("text-[#9E968E]", "border-transparent");
  });

  targetBtn.classList.remove("text-[#9E968E]", "border-transparent");
  targetBtn.classList.add("active", "bg-[#24201C]", "text-white", "border-[#3D3630]");

  // Ensure the active tab button is scrolled into view in the horizontal tabs bar
  if (tabsScrollContainer) {
    const btnEl = targetBtn as HTMLElement;
    const containerLeft = tabsScrollContainer.scrollLeft;
    const containerWidth = tabsScrollContainer.clientWidth;
    const btnLeft = btnEl.offsetLeft;
    const btnWidth = btnEl.offsetWidth;

    if (btnLeft < containerLeft || btnLeft + btnWidth > containerLeft + containerWidth) {
      tabsScrollContainer.scrollTo({
        left: Math.max(0, btnLeft - 20),
        behavior: "smooth",
      });
    }
  }

  tabPanels.forEach((panel) => {
    panel.classList.add("hidden");
  });

  const activePanel = document.getElementById(`panel-${targetTab}`);
  if (activePanel) {
    activePanel.classList.remove("hidden");
  }

  if (scrollIframe) {
    const targetAnchor = targetBtn.getAttribute("data-target-anchor");
    if (targetAnchor === "top") {
      if (iframe && iframe.contentWindow) {
        isProgrammaticScroll = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isProgrammaticScroll = false;
        }, 900);
        iframe.contentWindow.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } else if (targetAnchor && iframe && iframe.contentWindow) {
      try {
        const doc = iframe.contentWindow.document;
        const el = doc.getElementById(targetAnchor);
        if (el) {
          isProgrammaticScroll = true;
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            isProgrammaticScroll = false;
          }, 900);

          const elTop = el.getBoundingClientRect().top + iframe.contentWindow.scrollY;
          iframe.contentWindow.scrollTo({
            top: Math.max(0, elTop - 24),
            behavior: "smooth",
          });
        }
      } catch (e) {}
    }
  }
}

export function setupTabsNav() {
  const tabsScrollContainer = document.getElementById("tabs-scroll-container");
  const btnScrollLeft = document.getElementById("tabs-scroll-left");
  const btnScrollRight = document.getElementById("tabs-scroll-right");
  const moduleTabs = document.querySelectorAll(".module-tab");
  const iframe = document.getElementById("preview-frame") as HTMLIFrameElement | null;

  btnScrollLeft?.addEventListener("click", () => {
    tabsScrollContainer?.scrollBy({ left: -140, behavior: "smooth" });
  });

  btnScrollRight?.addEventListener("click", () => {
    tabsScrollContainer?.scrollBy({ left: 140, behavior: "smooth" });
  });

  tabsScrollContainer?.addEventListener(
    "wheel",
    (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        tabsScrollContainer.scrollLeft += e.deltaY;
      }
    },
    { passive: false }
  );

  moduleTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.getAttribute("data-tab");
      if (targetTab) activateTab(targetTab, true);
    });
  });

  // Scroll Spy: Listening to Iframe Scroll to update active Editor Tab
  function setupIframeScrollSpy() {
    if (!iframe || !iframe.contentWindow) return;
    try {
      const iframeWin = iframe.contentWindow;
      const iframeDoc = iframe.contentDocument;
      if (!iframeDoc) return;

      const sectionIds = ["hero", "marcas", "cases", "servicos", "depoimentos", "contato"];

      const handleIframeScroll = () => {
        if (isProgrammaticScroll) return;

        const scrollY = iframeWin.scrollY;
        if (scrollY < 20) {
          if (lastSpiedSection !== "topbar") {
            lastSpiedSection = "topbar";
            activateTab("topbar", false);
          }
          return;
        }
        if (scrollY < 80) {
          if (lastSpiedSection !== "hero") {
            lastSpiedSection = "hero";
            activateTab("hero", false);
          }
          return;
        }

        const viewportAnchor = scrollY + iframeWin.innerHeight * 0.35;
        let matchedSection = "";

        for (const sId of sectionIds) {
          const el = iframeDoc.getElementById(sId);
          if (!el) continue;
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;

          if (viewportAnchor >= top && viewportAnchor < bottom) {
            matchedSection = sId;
            break;
          }
        }

        if (matchedSection && matchedSection !== lastSpiedSection) {
          lastSpiedSection = matchedSection;
          const mappedTab = sectionToTabMap[matchedSection];
          if (mappedTab) {
            activateTab(mappedTab, false);
          }
        }
      };

      iframeWin.removeEventListener("scroll", handleIframeScroll);
      iframeWin.addEventListener("scroll", handleIframeScroll, { passive: true });
    } catch (e) {}
  }

  iframe?.addEventListener("load", setupIframeScrollSpy);

  // Quick Scroll to Card Buttons inside panels
  const panelsContainer = document.getElementById("panels-container");
  document.querySelectorAll(".scroll-to-card-btn").forEach((btn) => {
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
  });
}
