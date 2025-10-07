import { test, expect } from '@playwright/test';

test('Flow Test - Navyug Expense App', async ({ page }) => {
  // -------------------------------
  // ✅ Login
  // -------------------------------
  await page.goto('https://dev-navyugexpense.maxpro.cloud/account/login');
  await page.getByRole('textbox', { name: 'Please enter your Login ID' }).fill('vikramb');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('Welcome@123');
  await page.getByRole('button', { name: 'Login' }).click();

  // -------------------------------
  // ✅ Create Expense Request
  // -------------------------------
  await page.getByRole('listitem').filter({ hasText: 'Expense Expense' }).locator('a').first().click();
  await page.getByRole('link', { name: 'Expense Request' }).click();
  await page.getByRole('button', { name: '+ ADD' }).click();

  const billNo = Math.floor(100000 + Math.random() * 900000).toString();
  console.log('Generated Bill No:', billNo);

  await page.getByRole('textbox', { name: 'Default TextBox' }).fill(billNo);
  await page.locator('form').getByRole('button').click();
  await page.getByText('7', { exact: true }).first().click();
  await page.getByText('Expense Type Transport').click();
  await page.getByText('Transport').click();
  await page.getByText('Vendor TAMILVENDOR RAMAN').click();
  await page.getByRole('option', { name: 'TAMILVENDOR' }).click();
  await page.getByText('Type Per KG Per Box Lumpsum').click();
  await page.getByRole('option', { name: 'Per KG' }).click();
  await page.locator('.rz-spinner-input').nth(1).fill('100');
  await page.locator('.rz-spinner-input').nth(2).fill('10');
  await page.getByRole('button', { name: '+ ADD' }).click();
  await page.getByRole('button', { name: 'SUBMIT' }).click();

  // Wait for submission to complete
  await page.waitForTimeout(1000);

  // -------------------------------
  // ✅ Navigate to Approval Screen
  // -------------------------------
  await page.getByRole('listitem').filter({ hasText: 'Expense Expense' }).locator('a').first().click();
  await page.getByRole('link', { name: 'Approval' }).click();
  await page.waitForLoadState('networkidle');

  // -------------------------------
  // 🔍 Locate row by Bill No
  // -------------------------------
  const row = page.locator('table tbody tr', { hasText: billNo });
  await expect(row).toHaveCount(1); // Assert that row is found

  // 👁️ Click Action icon (eye)
  await row.locator('img[alt="view"], .fa-eye, .pi-eye').first().click(); // Use matching selector

  // -------------------------------
  // ❌ Reject the Request
  // -------------------------------
  await page.getByRole('button', { name: 'REJECT' }).click();
  await page.locator('textarea').fill('Reject reason: test1');
  await page.getByLabel('Confirmation').getByRole('button', { name: 'REJECT' }).click();
  console.log('❌ Rejected Request');

  // Optional wait
  await page.waitForTimeout(1000);

  // -------------------------------
  // ✅ Approve the Same Request
  // -------------------------------
  await row.locator('img[alt="view"], .fa-eye, .pi-eye').first().click();
  await page.getByRole('button', { name: 'APPROVE' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  console.log('✅ Approved Request');

  await page.waitForTimeout(1000);

  // -------------------------------
  // 🔄 Mark as "To Be Revised"
  // -------------------------------
  await row.locator('img[alt="view"], .fa-eye, .pi-eye').first().click();
  await page.locator('textarea').fill('Test for Revised');
  await page.getByRole('button', { name: 'SUBMIT' }).click();
  console.log('🔄 Marked as To Be Revised');

  // ⏸ Pause for inspection
  await page.pause();
});
