import { test, expect } from '@playwright/test';
const config = require('C:\\Users\\admin\\playwrightautomation\\expense-management-app\\config.js');

test('Payment Process', async ({ page }) => {
  // -------------------------------
  //  Login
  // -------------------------------
  await page.goto(config.siteUrl);
  await page.getByRole('textbox', { name: 'Please enter your Login ID' }).fill(config.username);
  await page.getByRole('textbox', { name: 'Enter your password' }).fill(config.password);
  await page.getByRole('button', { name: 'Login' }).click();

  // -------------------------------
  // Navigate to Payment Process
  // -------------------------------
  await page.locator('a', { hasText: 'Payment' }).first().click();
  await page.getByRole('link', { name: 'Payment Process' }).click();
  await page.getByRole('button', { name: /\+ ADD PAYMENT GROUP/i }).click();

  // -------------------------------
  // Select invoice row ending with '-2526'
  // -------------------------------
  const targetRow = page.locator('tr.rz-data-row', { hasText: '-2526' }).first();
  await expect(targetRow).toBeVisible({ timeout: 15000 });
  await targetRow.scrollIntoViewIfNeeded();

  // -------------------------------
  // Capture and print Expense Number
  // -------------------------------
  const expenseNumber = await targetRow.locator('p.fw-500').textContent();
  console.log(' Payment Processing for Expense Number:', expenseNumber?.trim());

  // -------------------------------
  // Click the checkbox for that row
  // -------------------------------
  const checkbox = targetRow.locator('div.rz-chkbox-box');
  await expect(checkbox).toBeVisible({ timeout: 10000 });
  await checkbox.click({ force: true });
  console.log(' Checkbox selected for the row containing "-2526"');

  // -------------------------------
  // Select Bank Account
  // -------------------------------
  await page.getByText('Bank Account Nellore Store 3').click();
  await page.getByText('Nellore Store 3 - Axis Bank Ltd -').click();

  // Submit Payment
  await page.getByRole('button', { name: 'SUBMIT' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  console.log(' Payment process completed successfully');

  // -------------------------------
  // Navigate to Payment Update
  // -------------------------------
  await page.locator('a', { hasText: 'Payment' }).first().click();
  await page.getByRole('link', { name: 'Payment Update' }).click();

  // -------------------------------
  // Click first row with PENDING status
  // -------------------------------
  const pendingRow = page.locator('tr.rz-data-row').filter({
    has: page.locator('td div.Pending_status span', { hasText: 'PENDING' })
  }).first();
  await expect(pendingRow).toBeVisible({ timeout: 10000 });
  await pendingRow.locator('td:last-child div.action img[alt="eye-icon"]').click();

  // -------------------------------
  // Update Payment Details
  // -------------------------------
  await page.locator('#RadzenDatePickerBindValue').click();
  await page.getByText('10', { exact: true }).click();

  const textBox = page.getByRole('textbox', { name: 'Default TextBox' });
  // Wait for rows to load
await page.waitForSelector('tr.rz-data-row');

//  Locate the <span> that contains the Expense Number pattern (e.g. 00336-2526)
const expenseNumberLocator = page.locator('tr.rz-data-row span.rz-cell-data[title*="-"]');

// Get the visible text
const expNumber = (await expenseNumberLocator.first().textContent())?.trim();

// Print it
console.log(' Expense Number:', expNumber);



  // Fill random 8-digit number
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000).toString();
  await textBox.click();
  await textBox.fill(randomNumber);

  await page.getByRole('button', { name: 'UPDATE' }).click();

  console.log(' Payment Updated completed successfully');
});
