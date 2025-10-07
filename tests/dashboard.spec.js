const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { DashboardPage } = require('../pages/dashboard.page');

test.describe('Dashboard Navigation Tests', () => {
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('vikramb', 'Welcome@123');

    // Step 2: Initialize dashboard page object
    dashboardPage = new DashboardPage(page);

    // Step 3: Verify dashboard is visible
    await dashboardPage.verifyDashboardPage();
  });

  test('Navigate to Expense Request page', async ({ page }) => {
    await dashboardPage.navigateToExpenseRequest();
    await expect(page).toHaveURL(/expense-request/i);
    await expect(page.locator('text=Expense Request')).toBeVisible();
  });

//   test('Navigate to Approval page', async ({ page }) => {
//     await dashboardPage.navigateToApproval();
//     await expect(page).toHaveURL(/approval/i);
//     await expect(page.locator('text=Approval')).toBeVisible();
//   });
});
