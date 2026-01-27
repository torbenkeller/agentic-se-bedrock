import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly mainContent: Locator;

  constructor(page: Page) {
    super(page);
    
    this.mainContent = page.getByRole('main');
  }

  async goto() {
    await this.page.goto('/');
    await this.waitForPageLoad();
  }

  async expectDashboardLoaded() {
    await expect(this.mainContent).toBeVisible();
    await this.expectNavigationVisible();
  }

  async expectApplicationReachable() {
    await expect(this.page).toHaveTitle('Vite + React + TS');
    await this.expectNavigationVisible();
  }
}