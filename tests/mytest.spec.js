import { test, expect } from '@playwright/test';
test('Flow Test - Navyug Expense App ', async ({ page }) => 
    {
         await page.goto('https://dev-navyugexpense.maxpro.cloud/account/login');
            await page.getByRole('textbox', { name: 'Please enter your Login ID' }).fill('vikramb');
            await page.getByRole('textbox', { name: 'Enter your password' }).fill('Welcome@123');
            await page.getByRole('button', { name: 'Login' }).click();

            await page.getByRole('listitem').filter({ hasText: 'Expense Expense' }).locator('a').first().click();
            await page.getByRole('link', { name: 'Expense Request' }).click();
            await page.getByRole('button', { name: '+ ADD' }).click();
            const billno = Math.floor(100000 + Math.random() * 900000);
            await page.getByRole('textbox', { name: 'Default TextBox' }).fill(billno.toString());
            //await page.getByRole('textbox', { name: 'Default TextBox' }).fill('25425464');
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

            await page.getByRole('listitem').filter({ hasText: 'Expense Expense' }).locator('a').first().click();
            await page.getByRole('link', { name: 'Approval' }).click();

            //To Reject
            await page.locator('//tbody/tr[1]/td[11]/span[1]/div[1]/img[1]').click();
            await page.getByRole('button', { name: 'REJECT' }).click();
            await page.locator('textarea').click();
            await page.locator('textarea').fill('test1');
            await page.getByLabel('Confirmation').getByRole('button', { name: 'REJECT' }).click();
            console.log('Rejected Request');

            //To Approve
            //await page.getByRole('link', { name: 'Approval' }).click();
            await page.locator('//tbody/tr[1]/td[11]/span[1]/div[1]/img[1]').click();
            await page.getByRole('button', { name: 'APPROVE' }).click();
            await page.getByRole('button', { name: 'Confirm' }).click();
            console.log('Approve Request');

            //To be Revised
            //await page.getByRole('link', { name: 'Approval' }).click();
            await page.locator('//tbody/tr[1]/td[11]/span[1]/div[1]/img[1]').click();
  
            await page.locator('textarea').click();
            await page.locator('textarea').fill('Test for Revised');
            await page.getByRole('button', { name: 'SUBMIT' }).click();
            console.log('Expense Request To be Revised')
            await page.pause();
    
});