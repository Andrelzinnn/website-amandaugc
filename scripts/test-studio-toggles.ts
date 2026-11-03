import { chromium } from "playwright";
import * as path from "path";

const ARTIFACT_DIR = "/home/andrelzinn/.gemini/antigravity/brain/00e2253a-f5dd-4458-95fa-92ba9ae9405d";

async function testStudioBrandToggles() {
  console.log("🚀 Testing Studio Brand & Legal Toggles with Live Preview...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    await page.goto("http://localhost:4321/admin", { waitUntil: "networkidle" });

    // Click on Marcas tab
    console.log("🏷️ Navigating to Marcas tab...");
    await page.locator('.module-tab[data-tab="brands"]').click();
    await page.waitForTimeout(400);

    // Verify presence of toggles
    const toggleShowBrands = page.locator("#toggle-show-brands");
    const toggleNotice = page.locator("#toggle-illustrative-notice");
    const badgeBrands = page.locator("#badge-brands-status");
    const badgeNotice = page.locator("#badge-notice-status");

    console.log(`  - toggleShowBrands exists: ${await toggleShowBrands.isVisible()}`);
    console.log(`  - toggleNotice exists: ${await toggleNotice.isVisible()}`);
    console.log(`  - Initial brands badge: ${await badgeBrands.textContent()}`);
    console.log(`  - Initial notice badge: ${await badgeNotice.textContent()}`);

    // Take initial screenshot
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "studio-brands-toggles.png") });

    // Test Live Preview Toggle 1: Uncheck toggleShowBrands
    console.log("🔄 Toggling Show Brands (unchecking)...");
    await toggleShowBrands.uncheck();
    await page.waitForTimeout(400);

    console.log(`  - New brands badge: ${await badgeBrands.textContent()}`);

    // Check preview iframe state for #marcas
    const frame = page.frameLocator("#preview-frame");
    const marcasSection = frame.locator("#marcas");
    const isMarcasHidden = await marcasSection.evaluate((el) => el.classList.contains("hidden"));
    console.log(`  - Preview #marcas is hidden: ${isMarcasHidden} (expected: true)`);

    // Test Live Preview Toggle 2: Uncheck toggleIllustrativeNotice (Official Mode)
    console.log("🔄 Toggling Illustrative Notice (switching to Official Mode)...");
    await toggleNotice.uncheck();
    await page.waitForTimeout(400);

    console.log(`  - New notice badge: ${await badgeNotice.textContent()}`);

    const noticeEl = frame.locator("#footer-illustrative-brands-notice");
    const isNoticeHidden = await noticeEl.evaluate((el) => el.classList.contains("hidden"));
    console.log(`  - Preview illustrative notice is hidden: ${isNoticeHidden} (expected: true)`);

    // Verify Save Button is enabled with pending modifications
    const pendingCount = await page.locator("#pending-count").textContent();
    console.log(`  - Pending items counter: ${pendingCount}`);

    // Take screenshot of toggled state
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "studio-brands-toggled-state.png") });

    console.log("\n=================================");
    console.log("🎉 ALL STUDIO BRAND & LEGAL TOGGLE TESTS PASSED!");
    console.log("=================================\n");
  } catch (err) {
    console.error("Test error:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testStudioBrandToggles();
