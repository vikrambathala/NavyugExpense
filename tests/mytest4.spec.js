import { test, expect } from '@playwright/test';

test('Create 3 Expense Requests and Approve / Reject / Revise them', async ({ page }) => {
  // -------------------------------
  // ✅ Login
  // -------------------------------
  await page.goto('https://dev-navyugexpense.maxpro.cloud/account/login');
  await page.getByRole('textbox', { name: 'Please enter your Login ID' }).fill('vikramb');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('Welcome@123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Store bill numbers to use later
  const billNumbers = [];

  // -------------------------------
  // ✅ Create Expense Requests (3 times)
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
  // ✅ Navigate to Approval Page
  // -------------------------------
  await page.getByRole('listitem').filter({ hasText: 'Expense Expense' }).locator('a').first().click();
  await page.getByRole('link', { name: 'Approval' }).click();
  await page.waitForLoadState('networkidle');

  // -------------------------------
  // ✅ Approve First Request
  // -------------------------------
  const approveBill = billNumbers[0];
  const approveRow = page.locator('table tbody tr', { hasText: approveBill });
  await expect(approveRow).toHaveCount(1);
  await approveRow.locator('img[alt="view"], .fa-eye, .pi-eye').first().click();
  await page.getByRole('button', { name: 'APPROVE' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  console.log(`✅ Approved Bill No: ${approveBill}`);

  // -------------------------------
  // ❌ Reject Second Request
  // -------------------------------
  const rejectBill = billNumbers[1];
  const rejectRow = page.locator('table tbody tr', { hasText: rejectBill });
  await expect(rejectRow).toHaveCount(1);
  await rejectRow.locator('img[alt="view"], .fa-eye, .pi-eye').first().click();
  await page.getByRole('button', { name: 'REJECT' }).click();
  await page.locator('textarea').fill('Reason for rejection');
  await page.getByLabel('Confirmation').getByRole('button', { name: 'REJECT' }).click();
  console.log(`❌ Rejected Bill No: ${rejectBill}`);

  // -------------------------------
  // 🔄 To Be Revised for Third Request
  // -------------------------------
  const reviseBill = billNumbers[2];
  const reviseRow = page.locator('table tbody tr', { hasText: reviseBill });
  await expect(reviseRow).toHaveCount(1);
  await reviseRow.locator('img[alt="view"], .fa-eye, .pi-eye').first().click();
  await page.locator('textarea').fill('Needs revision: amount mismatch');
  await page.getByRole('button', { name: 'SUBMIT' }).click();
  console.log(`🔄 Marked Bill No: ${reviseBill} as "To Be Revised"`);

  // Optional pause for debug
  await page.pause();
});
