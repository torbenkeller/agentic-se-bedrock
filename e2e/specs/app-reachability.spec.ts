import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Application Reachability @smoke', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
  });

  test('should load the application and show main interface', async ({ page }) => {
    await dashboardPage.goto();
    await dashboardPage.expectApplicationReachable();
  });
});