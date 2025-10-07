const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');

test.describe('Login Tests', () => {
    test('should login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('vikramb', 'Welcome@123');

        // Example assertion – adjust based on dashboard page
        // await expect(page).toHaveURL(/dashboard|home/i); 
        // await expect(page.locator('text=Dashboard')).toBeVisible();

        // Check that the URL is now the home/dashboard URL
        await expect(page).toHaveURL('https://dev-navyugexpense.maxpro.cloud/');

        // Validate Dashboard UI is visible
        await expect(page.locator('text=Dashboard')).toBeVisible();
    });
});
