import { initState } from "./state";
import { setupAuth } from "./auth";
import { setupTabsNav } from "./tabs";
import { setupViewportControls } from "./viewport";
import { setupTopbarModule } from "./modules/topbar";
import { setupHeroModule } from "./modules/hero";
import { setupBrandsModule } from "./modules/brands";
import { setupServicesModule } from "./modules/services";
import { setupCasesModule } from "./modules/cases";
import { setupTestimonialsModule } from "./modules/testimonials";
import { setupIdentityModule } from "./modules/identity";
import { setupSaveHandler } from "./saveHandler";

declare global {
  interface Window {
    __INITIAL_GENERAL__?: any;
    __INITIAL_TOPBAR__?: any;
    __INITIAL_HERO__?: any;
    __COLLECTIONS__?: any[];
  }
}

export function initAdminStudio() {
  // 1. Initialize State with injected server data
  initState(
    window.__INITIAL_GENERAL__,
    window.__INITIAL_TOPBAR__,
    window.__INITIAL_HERO__,
    window.__COLLECTIONS__ || []
  );

  // 2. Setup Core UI Systems
  setupAuth();
  setupTabsNav();
  setupViewportControls();

  // 3. Setup Content Modules
  setupTopbarModule();
  setupHeroModule();
  setupBrandsModule();
  setupServicesModule();
  setupCasesModule();
  setupTestimonialsModule();
  setupIdentityModule();

  // 4. Setup Atomic Save Handler
  setupSaveHandler();
}
