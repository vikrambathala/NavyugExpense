import { test, expect } from '@playwright/test';

test.describe('Expense request flows', () => {
  test.setTimeout(2 * 60 * 1000); // 2 minutes

  test('Expense Process flow', async ({ page }) => {

    // Login
    await page.goto('https://dev-navyugexpense.maxpro.cloud/account/login');
    await page.getByRole('textbox', { name: 'Please enter your Login ID' }).fill('vikramb');
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('Welcome@123');
    await page.getByRole('button', { name: 'Login' }).click();
    console.log('Login successful');

    // Navigate to Expense Request
    await page.getByRole('listitem').filter({ hasText: 'Expense Expense' }).locator('a').first().click();
    await page.getByRole('link', { name: 'Expense Request' }).click();

    // Helper to create random bill number
    const randomBillNo = () => Math.floor(100000 + Math.random() * 900000).toString();
    const today = new Date().getDate().toString();

    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');

   /* // -------------------- EXPENSE 1: TRANSPORT --------------------
    console.log('Creating Transport Expense Request');
    await page.getByRole('button', { name: '+ ADD' }).click();

    const billNo1 = randomBillNo();
    console.log(`Bill No: ${billNo1}`);
    await page.getByRole('textbox', { name: 'Default TextBox' }).fill(billNo1);

    // Select date
    await page.locator('form').getByRole('button').click();
    await page.getByText(today, { exact: true }).first().click();

    // Expense type - Transport
    await page.getByText('Expense Type Transport').click();
    await page.getByText('Transport').click();
    await page.getByText('Vendor TAMILVENDOR RAMAN').click();
    await page.getByRole('option', { name: 'TAMILVENDOR' }).click();
    await page.getByText('Type Per KG Per Box Per KM').click();
    await page.getByRole('option', { name: 'Per KG' }).click();

    // Amount fields
    await page.locator('.rz-spinner-input').nth(1).fill('100');
    await page.locator('.rz-spinner-input').nth(2).fill('10');
    await page.getByRole('button', { name: '+ ADD' }).click();
    await page.getByRole('button', { name: 'SUBMIT' }).click();
    console.log('Transport Expense submitted');*/

   /* // -------------------- EXPENSE 2: OFFICE --------------------
    console.log('Creating Office Expense Request');
    //await page.getByRole('link', { name: 'Expense Request' }).click();
    await page.getByRole('button', { name: '+ ADD' }).click();

    const billNo2 = randomBillNo();
    console.log(`Bill No: ${billNo2}`);
    await page.getByRole('textbox', { name: 'Default TextBox' }).fill(billNo2);

    // Select date
    await page.locator('form').getByRole('button').click();
    await page.getByText(today, { exact: true }).first().click();

    await page.getByText('Expense Type Transport').click();
    await page.getByRole('option', { name: 'Office' }).click();

    await page.getByText('Expense Head Travelling and').click();
    await page.getByText('Travelling and Conveyance').click();

    await page.getByText('Vendor TAMILVENDOR RAMAN').click();
    await page.getByRole('option', { name: 'TAMILVENDOR' }).click();

    await page.getByPlaceholder('Description').fill('twtwrtrwt');
    await page.locator("//label[normalize-space(.)='Rate']/following::input[contains(@class,'rz-spinner-input')][1]").fill('45');
    await page.locator("//label[normalize-space(.)='Rate']/following::input[contains(@class,'rz-spinner-input')][2]").fill('45');
    await page.getByRole('button', { name: '+ ADD' }).click();
    await page.getByRole('button', { name: 'SUBMIT' }).click();
    console.log('Office Expense submitted');*/

    // -------------------- EXPENSE 3: LABOUR --------------------
    console.log('Creating Labour Expense Request');
    //await page.getByRole('link', { name: 'Expense Request' }).click();
    await page.getByRole('button', { name: '+ ADD' }).click();

    const billNo3 = randomBillNo();
    console.log(`Bill No: ${billNo3}`);
    await page.getByRole('textbox', { name: 'Default TextBox' }).fill(billNo3);

    await page.getByRole('textbox', { name: 'dd/MM/yyyy' }).click();
    await page.getByText(today, { exact: true }).click();

    await page.getByText('Expense Type Transport').click();
    await page.getByText('Loading & Unloading').click();

    await page.getByText('Labour Type Outside Labour').click();
    await page.getByRole('option', { name: 'Outside Labour' }).click();
    const labourname = `Labour_${timestamp}`;
    await page.getByPlaceholder('Labour name').fill(labourname);
    const transportername = `Transporter_${timestamp}`;
    await page.getByPlaceholder('L.R. No. / Transporter').fill(transportername);
    const rate = page.locator("//label[normalize-space(.)='Rate']/following::input[contains(@class,'rz-spinner-input')][1]");
    rate.fill('25');
    const qty = page.locator("//label[normalize-space(.)='Rate']/following::input[contains(@class,'rz-spinner-input')][2]");
    qty.fill('25');

    /*amount = page.locator("//label[normalize-space(.)='Rate']/following::input[contains(@class,'rz-spinner-input')][3]");
    cgst = page.locator("//label[normalize-space(.)='Rate']/following::input[contains(@class,'rz-spinner-input')][4]");
    sgst = page.locator("//label[normalize-space(.)='Rate']/following::input[contains(@class,'rz-spinner-input')][5]");
    igst = page.locator("//label[normalize-space(.)='Rate']/following::input[contains(@class,'rz-spinner-input')][6]");*/
    
    await page.getByRole('button', { name: '+ ADD' }).click();

    //const payableamt = page.locator("//label[normalize-space(.)='Rate']/following::input[contains(@class,'rz-spinner-input')][12]");
    //payableamt.fill('250');
    await page.getByRole('button', { name: 'SUBMIT' }).click();
    console.log('Labour Expense submitted');

    console.log('All 3 expense requests created successfully!');
  });
});
