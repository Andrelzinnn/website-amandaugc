import type { LivePreviewUpdateData } from "./types";

export function toDirectGoogleDriveUrl(url: string): string {
  if (!url || typeof url !== "string") return url;
  const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
  }
  return url;
}

export function sendLivePreviewUpdate(updateData: LivePreviewUpdateData) {
  const iframe = document.getElementById("preview-frame") as HTMLIFrameElement | null;

  // 1. PostMessage to iframe window
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage({ type: "STUDIO_LIVE_UPDATE", data: updateData }, "*");
  }

  // 2. Direct DOM mutation fallback if same-origin
  try {
    const doc = iframe?.contentDocument || iframe?.contentWindow?.document;
    if (!doc) return;

    if (updateData.selector && typeof updateData.text === "string") {
      const els = doc.querySelectorAll(updateData.selector);
      els.forEach((el) => {
        el.textContent = updateData.text!;
        el.setAttribute("data-pt-text", updateData.text!);
      });
    }

    if (updateData.imageSelector && typeof updateData.imageUrl === "string") {
      const img = doc.querySelector(updateData.imageSelector) as HTMLImageElement;
      if (img) img.src = updateData.imageUrl;
    }

    if (updateData.theme) {
      doc.documentElement.setAttribute("data-theme", updateData.theme);
    }

    if (updateData.caseUpdate) {
      const { index, brand, title, stats, badge, highlightMetric, metricLabel, quote, author, thumbnail, youtubeId } = updateData.caseUpdate;
      const card = doc.querySelector(`.case-card[data-index="${index}"]`);
      if (card) {
        if (brand) {
          const bEl = card.querySelector(".inline-block.self-start");
          if (bEl) bEl.textContent = brand;
        }
        if (title) {
          const tEl = card.querySelector("p.text-xs.font-bold");
          if (tEl) tEl.textContent = title;
        }
        if (stats) {
          const sEl = card.querySelector("span.text-\\[\\#C28D3F\\]") || card.querySelector(".text-\\[11px\\]");
          if (sEl) sEl.textContent = stats;
        }
        if (thumbnail) {
          const img = card.querySelector("img");
          if (img) img.src = thumbnail;
        }
        if (youtubeId) {
          card.setAttribute("data-youtube", youtubeId);
        }
      }

      const narr = doc.querySelector(`.case-narrative[data-narrative-index="${index}"]`);
      if (narr) {
        if (badge) {
          const bBadge = narr.querySelector(`[data-i18n="case.${index + 1}.badge"]`) || narr.querySelector(".rounded-full span");
          if (bBadge) bBadge.textContent = badge;
        }
        if (brand) {
          const h3 = narr.querySelector("h3");
          if (h3) h3.textContent = brand;
        }
        if (highlightMetric) {
          const mVal = narr.querySelector(".font-impact.font-bold.text-\\[\\#A8382B\\]") || narr.querySelector(".font-impact.text-\\[\\#A8382B\\]");
          if (mVal) mVal.textContent = highlightMetric;
        }
        if (metricLabel) {
          const mLbl = narr.querySelector(`[data-i18n="case.${index + 1}.metricLabel"]`) || narr.querySelector(".text-lg.font-bold.text-\\[\\#1B1815\\]");
          if (mLbl) mLbl.textContent = metricLabel;
        }
        if (quote) {
          const qEl = narr.querySelector(`[data-i18n="case.${index + 1}.quote"]`) || narr.querySelector("blockquote p, blockquote, .italic span");
          if (qEl) qEl.textContent = quote.startsWith('"') ? quote : `"${quote}"`;
        }
        if (author) {
          const aEl = narr.querySelector(`[data-i18n="case.${index + 1}.author"]`) || narr.querySelector("cite, .not-italic");
          if (aEl) aEl.textContent = author.startsWith("—") ? author : `— ${author}`;
        }
      }
    }

    if (updateData.serviceUpdate) {
      const { index, title, shortDesc, deliverables, idealFor } = updateData.serviceUpdate;
      const serviceCards = doc.querySelectorAll("#servicos .lg\\:col-span-7 > div");
      const card = serviceCards[index];
      if (card) {
        if (title) {
          const h3 = card.querySelector("h3");
          if (h3) h3.textContent = title;
        }
        if (shortDesc) {
          const p = card.querySelector("p.text-sm");
          if (p) p.textContent = shortDesc;
        }
        if (deliverables) {
          const container = card.querySelector(".flex.flex-wrap.gap-2");
          if (container) {
            const items = deliverables.split(",").map((s) => s.trim()).filter(Boolean);
            container.innerHTML = items.map((it) => `<span class="px-2.5 py-1 rounded-lg bg-white border border-[#1B1815]/10 text-xs font-medium text-[#57524C]">• ${it}</span>`).join("");
          }
        }
        if (idealFor) {
          const idealEl = card.querySelector(".pt-4.border-t");
          if (idealEl) idealEl.innerHTML = `<span class="font-bold text-[#1B1815]">Ideal para:</span> ${idealFor}`;
        }
      }
    }

    if (updateData.testUpdate) {
      const { index, clientName, brand, role, quote } = updateData.testUpdate;
      const testCards = doc.querySelectorAll("#depoimentos .grid > div");
      const card = testCards[index];
      if (card) {
        if (quote) {
          const q = card.querySelector("blockquote");
          if (q) q.textContent = quote.startsWith('"') ? quote : `"${quote}"`;
        }
        if (clientName) {
          const n = card.querySelector("span.text-xs.font-bold");
          if (n) n.textContent = clientName;
        }
        if (brand || role) {
          const r = card.querySelector("span.text-\\[11px\\]");
          if (r) r.innerHTML = `${role || ""} · <strong class="text-[#A8382B]">${brand || ""}</strong>`;
        }
      }
    }

    if (updateData.brandsUpdate && Array.isArray(updateData.brandsUpdate)) {
      const marqueeTrack = doc.querySelector("#marcas .animate-marquee-left");
      if (marqueeTrack) {
        const list = updateData.brandsUpdate.filter((b) => b.name && b.name.trim());
        if (list.length > 0) {
          const repeat = Math.max(2, Math.ceil(18 / list.length));
          const repeated = Array.from({ length: repeat }, () => list).flat();
          marqueeTrack.innerHTML = repeated.map((b) => `
            <div class="inline-flex items-center gap-10 text-xs sm:text-sm font-impact uppercase tracking-widest text-[#FAF8F5]/90 hover:text-[#C28D3F] transition-colors cursor-default">
              <span>${b.name}</span>
              <span class="text-[#A8382B] text-xs font-serif">◆</span>
            </div>
          `).join("");
        }
      }
    }

    if (updateData.creatorUpdate) {
      const { fullName, instagram } = updateData.creatorUpdate;
      if (fullName) {
        const parts = fullName.trim().split(" ");
        const firstName = parts[0] || "";
        const lastName = parts.slice(1).join(" ") || "";
        const headerLogo = doc.querySelector("nav a.font-serif-editorial");
        if (headerLogo) {
          const spans = headerLogo.querySelectorAll("span");
          if (spans[0]) spans[0].textContent = firstName;
          if (spans[1]) spans[1].textContent = lastName;
        }
        const footerName = doc.querySelector("footer .font-serif-editorial");
        if (footerName) footerName.textContent = fullName;
      }
      if (instagram) {
        const instaLinks = doc.querySelectorAll('a[href*="instagram.com"]');
        instaLinks.forEach((a) => {
          (a as HTMLAnchorElement).href = `https://instagram.com/${instagram.replace("@", "")}`;
          const textSpan = a.querySelector("span.text-xs");
          if (textSpan) textSpan.textContent = instagram.startsWith("@") ? instagram : `@${instagram}`;
        });
      }
    }

    if (updateData.legalUpdate) {
      const { illustrativeBrandsNotice, showBrandsSection } = updateData.legalUpdate;
      if (typeof showBrandsSection === "boolean") {
        const marcasEl = doc.getElementById("marcas");
        if (marcasEl) {
          if (showBrandsSection) marcasEl.classList.remove("hidden");
          else marcasEl.classList.add("hidden");
        }
      }
      if (typeof illustrativeBrandsNotice === "boolean") {
        const noticeEl = doc.getElementById("footer-illustrative-brands-notice");
        if (noticeEl) {
          if (illustrativeBrandsNotice) noticeEl.classList.remove("hidden");
          else noticeEl.classList.add("hidden");
        }
      }
    }
  } catch (e) {}
}

export function updateIframeText(selector: string, text: string) {
  sendLivePreviewUpdate({ selector, text });
}
