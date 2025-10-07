import { test, expect } from '@playwright/test';

test('Create 3 Expense Requests and Approve / Reject / Revise them', async ({ page }) => {
  // -------------------------------
  // ✅ Login
  // -------------------------------
  await page.goto('https://dev-navyugexpense.maxpro.cloud/account/login');
  await page.getByRole('textbox', { name: 'Please enter your Login ID' }).fill('vikramb');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('Welcome@123');
  await page.getByRole('button', { name: 'Login' }).click();

  const billNumbers = [];

  // -------------------------------
  // ✅ Create 3 Expense Requests
  // -------------------------------
  for (let i = 0; i < 3; i++) {
    await page.getByRole('listitem').filter({ hasText: 'Expense Expense' }).locator('a').first().click();
    await page.getByRole('link', { name: 'Expense Request' }).click();
    await page.getByRole('button', { name: '+ ADD' }).click();

    const billNo = Math.floor(100000 + Math.random() * 900000).toString();
    billNumbers.push(billNo);
    console.log(`Creating Request ${i + 1} with Bill No: ${billNo}`);

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
    await page.waitForTimeout(1000);
  }

  // -------------------------------
  // ✅ Go to Approval Screen
  // -------------------------------
  await page.getByRole('listitem').filter({ hasText: 'Expense Expense' }).locator('a').first().click();
  await page.getByRole('link', { name: 'Approval' }).click();
  await page.waitForLoadState('networkidle');

  // -------------------------------
  // ✅ Function to act on a row by bill number
  // -------------------------------
  async function actOnBill(billNo, action) {
    const row = page.locator('table tbody tr', { hasText: billNo });
    await expect(row, `Row with bill ${billNo} should exist`).toHaveCount(1, { timeout: 60000 });

    await row.scrollIntoViewIfNeeded();

    const viewIcon = row.locator('img[alt="view"], .fa-eye, .pi-eye, [title="View"]');
    await viewIcon.first().waitFor({ state: 'visible', timeout: 60000 });

    await page.screenshot({ path: `debug_${billNo}.png`, fullPage: true });
    await viewIcon.first().click({ timeout: 60000, force: true });

    if (action === 'approve') {
      await page.getByRole('button', { name: 'APPROVE' }).click();
      await page.getByRole('button', { name: 'Confirm' }).click();
      console.log(`✅ Approved Bill No: ${billNo}`);
    } else if (action === 'reject') {
      await page.getByRole('button', { name: 'REJECT' }).click();
      await page.locator('textarea').fill('Reason for rejection');
      await page.getByLabel('Confirmation').getByRole('button', { name: 'REJECT' }).click();
      console.log(`❌ Rejected Bill No: ${billNo}`);
    } else if (action === 'revise') {
      await page.locator('textarea').fill('Needs revision: amount mismatch');
      await page.getByRole('button', { name: 'SUBMIT' }).click();
      console.log(`🔄 Marked Bill No: ${billNo} as "To Be Revised"`);
    }

    await page.waitForTimeout(1000);
  }

  // -------------------------------
  // ✅ Act on all 3 bills
  // -------------------------------
  await actOnBill(billNumbers[0], 'approve');
  await actOnBill(billNumbers[1], 'reject');
  await actOnBill(billNumbers[2], 'revise');

  // ⏸ Pause for inspection if needed
  await page.pause();
});
