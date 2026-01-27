import { type Page, type Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly navigation: Locator;
  readonly sidebar: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.navigation = page.getByRole('navigation').filter({ hasText: 'Dashboard' });
    this.sidebar = page.getByRole('complementary');
  }

  async waitForPageLoad() {
    await expect(this.navigation).toBeVisible();
  }

  async expectNavigationVisible() {
    await expect(this.navigation).toBeVisible();
  }

  async expectPageTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }

  async navigateToBookings() {
    await this.navigation.getByRole('link', { name: /buchung/i }).click();
  }

  async navigateToLocations() {
    await this.navigation.getByRole('link', { name: /standort/i }).click();
  }

  async navigateToDashboard() {
    await this.navigation.getByRole('link', { name: /dashboard|übersicht/i }).click();
  }
}