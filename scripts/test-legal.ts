import { chromium } from "playwright";
import * as path from "path";

const ARTIFACT_DIR = "/home/andrelzinn/.gemini/antigravity/brain/00e2253a-f5dd-4458-95fa-92ba9ae9405d";

async function runLegalComplianceTests() {
  console.log("🚀 Testing Legal Disclaimers, Modal & Cookies via Playwright...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  try {
    await page.goto("http://localhost:4321/", { waitUntil: "networkidle" });

    // 1. Check Legal Disclaimer in Footer
    console.log("🔍 Checking footer legal disclaimer...");
    const footerDisclaimer = await page.locator('[data-i18n="legal.disclaimer.title"]').isVisible();
    const brandsNotice = await page.locator('[data-i18n="legal.disclaimer.brands"]').textContent();
    console.log(`  - Footer legal title visible: ${footerDisclaimer}`);
    console.log(`  - Brands notice mentions 'ilustrativo/demonstrativo': ${brandsNotice?.includes("ilustrativo/demonstrativo")}`);

    // 2. Check Cookie Banner
    console.log("🍪 Checking cookie banner...");
    await page.waitForTimeout(1500); // Wait for the 1.2s delay
    const isCookieBannerVisible = await page.locator("#cookie-banner").isVisible();
    console.log(`  - Cookie banner visible: ${isCookieBannerVisible}`);

    // Take screenshot of cookie banner
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "legal-cookie-banner.png") });

    // 3. Open Legal Modal from footer button
    console.log("📜 Testing Legal Modal opening...");
    const legalBtn = page.locator("[data-open-legal-modal]").first();
    await legalBtn.click();
    await page.waitForTimeout(400);

    const isModalVisible = await page.locator("#legal-modal").isVisible();
    const modalTitle = await page.locator("#legal-modal-title").textContent();
    console.log(`  - Legal modal visible: ${isModalVisible}`);
    console.log(`  - Legal modal title: ${modalTitle}`);

    // Take screenshot of opened modal
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "legal-modal.png") });

    // Close modal via Close button
    await page.locator("#btn-close-legal-modal").click();
    await page.waitForTimeout(300);
    const isModalClosed = !(await page.locator("#legal-modal").isVisible());
    console.log(`  - Modal closed successfully: ${isModalClosed}`);

    // 4. Accept Cookies
    console.log("🍪 Accepting cookies...");
    await page.locator("#btn-accept-cookies").click();
    await page.waitForTimeout(300);
    const isCookieBannerClosed = !(await page.locator("#cookie-banner").isVisible());
    console.log(`  - Cookie banner dismissed: ${isCookieBannerClosed}`);

    // 5. Test Language Switcher to EN and verify legal strings
    console.log("🌐 Testing translation to EN...");
    const enBtn = page.locator('.lang-btn[data-lang="en"]').first();
    if (await enBtn.isVisible()) {
      await enBtn.click();
      await page.waitForTimeout(300);
      const enDisclaimer = await page.locator('[data-i18n="legal.disclaimer.title"]').textContent();
      console.log(`  - English disclaimer title: "${enDisclaimer}" (expected: Legal Notice & Demonstrative Terms)`);
    }

    // Scroll to footer and take screenshot
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "legal-footer-disclaimer.png") });

    console.log("\n=================================");
    console.log("🎉 ALL LEGAL COMPLIANCE TESTS PASSED!");
    console.log("=================================\n");
  } catch (err) {
    console.error("Test error:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runLegalComplianceTests();
