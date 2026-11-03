import { chromium } from "playwright";
import * as path from "path";
import * as fs from "fs";

const ARTIFACT_DIR = "/home/andrelzinn/.gemini/antigravity/brain/00e2253a-f5dd-4458-95fa-92ba9ae9405d";

async function runResponsiveTests() {
  console.log("🚀 Launching Playwright Chromium...");
  const browser = await chromium.launch({
    headless: true,
  });

  const results: any[] = [];

  try {
    // TEST 1: Mobile (390 x 844 - iPhone 14 / modern smartphone)
    console.log("\n📱 Testing Mobile Smartphone Viewport (390x844)...");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto("http://localhost:4321/admin", { waitUntil: "networkidle" });

    // Assert Editor is visible, Preview is hidden
    const isSidebarVisible = await mobilePage.locator("#admin-sidebar").isVisible();
    const isPreviewHidden = !(await mobilePage.locator("#preview-main").isVisible());
    const isMobileToggleVisible = await mobilePage.locator("#mobile-view-toggle").isVisible();
    const isDesktopControlsHidden = !(await mobilePage.locator(".device-btn").first().isVisible());
    const isSplitterHidden = !(await mobilePage.locator("#sidebar-splitter").isVisible());

    console.log(`  - Sidebar visible: ${isSidebarVisible} (expected: true)`);
    console.log(`  - Preview hidden initially: ${isPreviewHidden} (expected: true)`);
    console.log(`  - Mobile toggle switcher visible: ${isMobileToggleVisible} (expected: true)`);
    console.log(`  - Desktop controls hidden: ${isDesktopControlsHidden} (expected: true)`);
    console.log(`  - Desktop splitter hidden: ${isSplitterHidden} (expected: true)`);

    // Check iOS input font-size >= 16px to prevent auto-zoom
    const inputFontSize = await mobilePage.evaluate(() => {
      const input = document.querySelector('input[type="text"]') as HTMLElement;
      return input ? window.getComputedStyle(input).fontSize : null;
    });
    console.log(`  - Input computed font-size: ${inputFontSize} (expected: 16px)`);

    const mobileEditorShot = path.join(ARTIFACT_DIR, "admin-mobile-editor.png");
    await mobilePage.screenshot({ path: mobileEditorShot });
    console.log(`  📸 Saved mobile editor screenshot: ${mobileEditorShot}`);

    // Switch to Preview tab
    console.log("  🔄 Switching to Preview tab on mobile...");
    await mobilePage.locator("#mobile-tab-preview").click();
    await mobilePage.waitForTimeout(400);

    const isSidebarHiddenNow = !(await mobilePage.locator("#admin-sidebar").isVisible());
    const isPreviewVisibleNow = await mobilePage.locator("#preview-main").isVisible();
    const isBackBtnVisible = await mobilePage.locator("#mobile-back-to-editor-btn").isVisible();

    console.log(`  - Sidebar hidden in preview mode: ${isSidebarHiddenNow} (expected: true)`);
    console.log(`  - Preview visible in preview mode: ${isPreviewVisibleNow} (expected: true)`);
    console.log(`  - Floating Back-to-Editor button visible: ${isBackBtnVisible} (expected: true)`);

    const mobilePreviewShot = path.join(ARTIFACT_DIR, "admin-mobile-preview.png");
    await mobilePage.screenshot({ path: mobilePreviewShot });
    console.log(`  📸 Saved mobile preview screenshot: ${mobilePreviewShot}`);

    // Click back to editor button
    console.log("  🔄 Clicking floating 'Voltar ao Editor' button...");
    await mobilePage.locator("#mobile-back-to-editor-btn").click();
    await mobilePage.waitForTimeout(400);

    const isSidebarBack = await mobilePage.locator("#admin-sidebar").isVisible();
    console.log(`  - Sidebar restored on return: ${isSidebarBack} (expected: true)`);

    results.push({
      test: "Mobile (390x844)",
      passed: isSidebarVisible && isPreviewHidden && isMobileToggleVisible && isDesktopControlsHidden && isSplitterHidden && inputFontSize === "16px" && isSidebarHiddenNow && isPreviewVisibleNow && isBackBtnVisible && isSidebarBack,
    });

    await mobileContext.close();

    // TEST 2: Tablet Portrait (768 x 1024 - iPad Portrait)
    console.log("\n📱 Testing Tablet Portrait Viewport (768x1024)...");
    const tabletContext = await browser.newContext({
      viewport: { width: 768, height: 1024 },
    });
    const tabletPage = await tabletContext.newPage();
    await tabletPage.goto("http://localhost:4321/admin", { waitUntil: "networkidle" });

    const tabletToggle = await tabletPage.locator("#mobile-view-toggle").isVisible();
    const tabletSidebar = await tabletPage.locator("#admin-sidebar").isVisible();
    const tabletPreview = !(await tabletPage.locator("#preview-main").isVisible());

    console.log(`  - Tablet toggle visible: ${tabletToggle} (expected: true)`);
    console.log(`  - Tablet sidebar editor visible: ${tabletSidebar} (expected: true)`);
    console.log(`  - Tablet preview initially hidden: ${tabletPreview} (expected: true)`);

    const tabletEditorShot = path.join(ARTIFACT_DIR, "admin-tablet-editor.png");
    await tabletPage.screenshot({ path: tabletEditorShot });
    console.log(`  📸 Saved tablet editor screenshot: ${tabletEditorShot}`);

    // Switch to preview
    await tabletPage.locator("#mobile-tab-preview").click();
    await tabletPage.waitForTimeout(400);
    const tabletPreviewShot = path.join(ARTIFACT_DIR, "admin-tablet-preview.png");
    await tabletPage.screenshot({ path: tabletPreviewShot });
    console.log(`  📸 Saved tablet preview screenshot: ${tabletPreviewShot}`);

    results.push({
      test: "Tablet Portrait (768x1024)",
      passed: tabletToggle && tabletSidebar && tabletPreview,
    });

    await tabletContext.close();

    // TEST 3: Desktop Viewport (1440 x 900 - Laptop / Monitor)
    console.log("\n💻 Testing Desktop Viewport (1440x900)...");
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto("http://localhost:4321/admin", { waitUntil: "networkidle" });

    const deskSidebar = await desktopPage.locator("#admin-sidebar").isVisible();
    const deskPreview = await desktopPage.locator("#preview-main").isVisible();
    const deskSplitter = await desktopPage.locator("#sidebar-splitter").isVisible();
    const deskDeviceBtns = await desktopPage.locator(".device-btn").first().isVisible();
    const deskMobileToggleHidden = !(await desktopPage.locator("#mobile-view-toggle").isVisible());

    console.log(`  - Desktop sidebar visible: ${deskSidebar} (expected: true)`);
    console.log(`  - Desktop preview visible: ${deskPreview} (expected: true)`);
    console.log(`  - Desktop splitter visible: ${deskSplitter} (expected: true)`);
    console.log(`  - Desktop device resolution buttons visible: ${deskDeviceBtns} (expected: true)`);
    console.log(`  - Mobile toggle hidden on desktop: ${deskMobileToggleHidden} (expected: true)`);

    const desktopShot = path.join(ARTIFACT_DIR, "admin-desktop-1440.png");
    await desktopPage.screenshot({ path: desktopShot });
    console.log(`  📸 Saved desktop screenshot: ${desktopShot}`);

    results.push({
      test: "Desktop (1440x900)",
      passed: deskSidebar && deskPreview && deskSplitter && deskDeviceBtns && deskMobileToggleHidden,
    });

    await desktopContext.close();

    console.log("\n=================================");
    console.log("🏁 SUMMARY OF RESPONSIVENESS TESTS:");
    results.forEach((r) => {
      console.log(`  ${r.passed ? "✅ PASS" : "❌ FAIL"}: ${r.test}`);
    });
    console.log("=================================\n");

    if (results.every((r) => r.passed)) {
      console.log("🎉 ALL RESPONSIVE TESTS PASSED SUCCESSFULLY!");
    } else {
      console.error("⚠️ SOME TESTS FAILED!");
      process.exit(1);
    }
  } catch (err) {
    console.error("Test execution error:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runResponsiveTests();
