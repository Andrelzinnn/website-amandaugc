import { currentGeneral } from "./state";

export function setupViewportControls() {
  const iframe = document.getElementById("preview-frame") as HTMLIFrameElement | null;
  const wrapper = document.getElementById("preview-wrapper");
  const previewDimBadge = document.getElementById("preview-dim-badge");
  const iframeResizer = document.getElementById("iframe-resizer-right");
  const sidebarSplitter = document.getElementById("sidebar-splitter");
  const adminSidebar = document.getElementById("admin-sidebar");
  const btnReload = document.getElementById("btn-reload");
  const deviceBtns = document.querySelectorAll(".device-btn");

  // Device Presets
  deviceBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const width = btn.getAttribute("data-width") || "100%";

      deviceBtns.forEach((b) => {
        b.classList.remove("active", "bg-[#2D2824]", "text-white", "border-[#3D3630]");
        b.classList.add("text-[#9E968E]", "border-transparent");
      });
      btn.classList.remove("text-[#9E968E]", "border-transparent");
      btn.classList.add("active", "bg-[#2D2824]", "text-white", "border-[#3D3630]");

      if (wrapper && iframe) {
        if (width === "100%") {
          wrapper.style.width = "100%";
          wrapper.style.height = "100%";
          iframe.className = "w-full h-full bg-[#FAF8F5] rounded-xl shadow-2xl transition-all duration-300 border-2 border-[#2D2824]";
          if (previewDimBadge) previewDimBadge.textContent = "100% Fluido";
        } else if (width === "390px") {
          wrapper.style.width = "390px";
          wrapper.style.height = "844px";
          iframe.className = "w-full h-full bg-[#FAF8F5] rounded-[44px] shadow-2xl transition-all duration-300 border-8 border-[#1B1815] ring-2 ring-[#2D2824]";
          if (previewDimBadge) previewDimBadge.textContent = "390px × 844px (iPhone)";
        } else {
          wrapper.style.width = width;
          wrapper.style.height = "92%";
          iframe.className = "w-full h-full bg-[#FAF8F5] rounded-2xl shadow-2xl transition-all duration-300 border-4 border-[#2D2824]";
          if (previewDimBadge) previewDimBadge.textContent = `${width} × ${Math.round(wrapper.offsetHeight)}px`;
        }
      }
    });
  });

  // Draggable Iframe Resizer (Free Drag Width)
  let isIframeDragging = false;
  let iframeStartX = 0;
  let iframeStartWidth = 0;

  iframeResizer?.addEventListener("pointerdown", (e) => {
    isIframeDragging = true;
    iframeStartX = e.clientX;
    iframeStartWidth = wrapper?.offsetWidth || iframe?.offsetWidth || 0;

    if (iframe) iframe.style.pointerEvents = "none";
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
    iframeResizer.setPointerCapture(e.pointerId);
  });

  iframeResizer?.addEventListener("pointermove", (e) => {
    if (!isIframeDragging || !wrapper) return;
    const deltaX = (e.clientX - iframeStartX) * 2;
    const newWidth = Math.max(320, Math.min(window.innerWidth - 100, iframeStartWidth + deltaX));

    wrapper.style.width = `${newWidth}px`;
    wrapper.style.maxWidth = "100%";

    if (previewDimBadge) {
      previewDimBadge.textContent = `${Math.round(newWidth)}px × ${Math.round(wrapper.offsetHeight)}px`;
    }

    deviceBtns.forEach((b) => {
      b.classList.remove("active", "bg-[#2D2824]", "text-white", "border-[#3D3630]");
      b.classList.add("text-[#9E968E]", "border-transparent");
    });
  });

  const stopIframeDrag = () => {
    if (!isIframeDragging) return;
    isIframeDragging = false;
    if (iframe) iframe.style.pointerEvents = "auto";
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  iframeResizer?.addEventListener("pointerup", stopIframeDrag);
  iframeResizer?.addEventListener("pointercancel", stopIframeDrag);

  // Draggable Sidebar Splitter (Desktop)
  let isSidebarDragging = false;

  sidebarSplitter?.addEventListener("pointerdown", (e) => {
    isSidebarDragging = true;
    if (iframe) iframe.style.pointerEvents = "none";
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    sidebarSplitter.setPointerCapture(e.pointerId);
  });

  sidebarSplitter?.addEventListener("pointermove", (e) => {
    if (!isSidebarDragging || !adminSidebar) return;
    const newWidth = Math.max(320, Math.min(650, e.clientX));
    adminSidebar.style.width = `${newWidth}px`;
  });

  const stopSidebarDrag = () => {
    if (!isSidebarDragging) return;
    isSidebarDragging = false;
    if (iframe) iframe.style.pointerEvents = "auto";
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  sidebarSplitter?.addEventListener("pointerup", stopSidebarDrag);
  sidebarSplitter?.addEventListener("pointercancel", stopSidebarDrag);

  // Reload Iframe
  btnReload?.addEventListener("click", () => {
    if (iframe) {
      iframe.src = `/?theme=${currentGeneral.theme || "terracotta"}`;
    }
  });

  // Mobile / Tablet View Switcher Logic (< 1024px)
  const mobileTabEditor = document.getElementById("mobile-tab-editor");
  const mobileTabPreview = document.getElementById("mobile-tab-preview");
  const mobileSwitchToPreviewBtn = document.getElementById("mobile-switch-to-preview-btn");
  const mobileBackToEditorBtn = document.getElementById("mobile-back-to-editor-btn");
  const previewMain = document.getElementById("preview-main");

  let currentMobileView: "editor" | "preview" = "editor";

  function setMobileView(view: "editor" | "preview") {
    currentMobileView = view;
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
      if (adminSidebar) adminSidebar.classList.remove("hidden");
      if (previewMain) {
        previewMain.classList.remove("hidden");
        previewMain.classList.add("flex");
      }
      if (mobileBackToEditorBtn) mobileBackToEditorBtn.style.display = "none";
      return;
    }

    if (adminSidebar) adminSidebar.style.width = "";

    if (view === "editor") {
      if (adminSidebar) adminSidebar.classList.remove("hidden");
      if (previewMain) {
        previewMain.classList.add("hidden");
        previewMain.classList.remove("flex");
      }
      if (mobileTabEditor) {
        mobileTabEditor.className = "mobile-view-btn active px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer bg-[#2D2824] text-white border border-[#3D3630]";
      }
      if (mobileTabPreview) {
        mobileTabPreview.className = "mobile-view-btn px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer text-[#9E968E] hover:text-white border border-transparent";
      }
      if (mobileBackToEditorBtn) mobileBackToEditorBtn.style.display = "none";
    } else {
      if (adminSidebar) adminSidebar.classList.add("hidden");
      if (previewMain) {
        previewMain.classList.remove("hidden");
        previewMain.classList.add("flex");
      }
      if (mobileTabPreview) {
        mobileTabPreview.className = "mobile-view-btn active px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer bg-[#2D2824] text-white border border-[#3D3630]";
      }
      if (mobileTabEditor) {
        mobileTabEditor.className = "mobile-view-btn px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer text-[#9E968E] hover:text-white border border-transparent";
      }
      if (mobileBackToEditorBtn) mobileBackToEditorBtn.style.display = "flex";
    }
  }

  mobileTabEditor?.addEventListener("click", () => setMobileView("editor"));
  mobileTabPreview?.addEventListener("click", () => setMobileView("preview"));
  mobileSwitchToPreviewBtn?.addEventListener("click", () => setMobileView("preview"));
  mobileBackToEditorBtn?.addEventListener("click", () => setMobileView("editor"));

  window.addEventListener("resize", () => {
    setMobileView(currentMobileView);
  });

  setMobileView("editor");
}
