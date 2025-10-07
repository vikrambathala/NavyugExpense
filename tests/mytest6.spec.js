import { test, expect } from '@playwright/test';

test.describe('Expense request flows', () => {
  // Increase timeout for this suite if needed
  test.setTimeout(2 * 60 * 1000); // 2 minutes

  test('Create 3 Expense Requests and Approve / Reject / Revise them', async ({ page }) => {
    // 1️⃣ Login
    await page.goto('https://dev-navyugexpense.maxpro.cloud/account/login');
    await page.getByRole('textbox', { name: 'Please enter your Login ID' }).fill('vikramb');
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('Welcome@123');
    await page.getByRole('button', { name: 'Login' }).click();

    const billNumbers = [];

    // 2️⃣ Create 3 expense requests
    for (let i = 0; i < 3; i++) {
      await page.getByRole('listitem').filter({ hasText: 'Expense Expense' }).locator('a').first().click();
      await page.getByRole('link', { name: 'Expense Request' }).click();
      await page.getByRole('button', { name: '+ ADD' }).click();

      const billNo = Math.floor(100000 + Math.random() * 900000).toString();
      billNumbers.push(billNo);
      console.log(`📝 Creating Request ${i + 1} with Bill No: ${billNo}`);

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

      // Wait briefly for submission to finish
      await page.waitForTimeout(2000);
    }

    // Navigate to Approval screen
    await page.getByRole('listitem').filter({ hasText: 'Expense Expense' }).locator('a').first().click();
    await page.getByRole('link', { name: 'Approval' }).click();
    await page.waitForLoadState('networkidle');

    // Helper to ensure we're on the approval list view
    async function ensureApprovalListVisible() {
      // Wait for table body or header to appear
      await page.locator('table tbody').waitFor({ state: 'visible', timeout: 30000 });
    }

    // Helper to act on a specific bill
    async function actOnBill(billNo, action) {
      console.log(`🔍 Processing Bill No: ${billNo} → Action: ${action.toUpperCase()}`);

      // Ensure the list is visible for the row
      await ensureApprovalListVisible();

      const row = page.locator('table tbody tr').filter({ hasText: billNo });
      await expect(row).toHaveCount(1, { timeout: 30000 });

      await row.scrollIntoViewIfNeeded();

      const viewIcon = row.locator('img[alt="eye-icon"]');
      await viewIcon.waitFor({ state: 'visible', timeout: 30000 });

      await page.screenshot({ path: `before-click-${billNo}.png`, fullPage: true });
      await viewIcon.click({ timeout: 30000 });
      console.log(`  clicked view icon for ${billNo}`);

      // Optionally wait for modal/dialog or navigation if any
      // e.g. await page.waitForSelector('selector-for-approve-modal', { timeout: 10000 });

      if (action === 'approve') {
        await page.getByRole('button', { name: 'APPROVE' }).click();
        await page.getByRole('button', { name: 'Confirm' }).click();
        console.log(`✅ Approved Bill No: ${billNo}`);
      } else if (action === 'reject') {
        await page.getByRole('button', { name: 'REJECT' }).click();
        await page.locator('textarea').fill('Rejected via automation');
        await page.getByLabel('Confirmation').getByRole('button', { name: 'REJECT' }).click();
        console.log(`❌ Rejected Bill No: ${billNo}`);
      } else if (action === 'revise') {
        await page.locator('textarea').fill('Needs revision via automation');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        console.log(`🔄 Marked Bill No: ${billNo} as "To Be Revised"`);
      }

      // Wait for the modal to close or for UI to return
      await page.waitForTimeout(5000);

      // After action, ensure you are back to the approval listing so next action can proceed
      await ensureApprovalListVisible();
    }

    // Perform the actions
    await actOnBill(billNumbers[0], 'approve');
    await actOnBill(billNumbers[1], 'reject');
    await actOnBill(billNumbers[2], 'revise');

    console.log('\n🔚 Summary:');
    console.log(`✔️ Approved Bill No: ${billNumbers[0]}`);
    console.log(`✖️ Rejected Bill No: ${billNumbers[1]}`);
    console.log(`↩️ To Be Revised Bill No: ${billNumbers[2]}`);

    await page.pause();
  });
});
