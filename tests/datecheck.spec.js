import{test, expect} from '@playwright/test';
const config = require('C:\\Users\\admin\\playwrightautomation\\expense-management-app\\config.js');
test('date-pick', async ({page}) => {

    await page.goto(config.siteUrl);
    await page.getByRole('textbox', { name: 'Please enter your Login ID' }).fill(config.username);
    await page.getByRole('textbox', {name : 'Enter your password'}).fill(config.password);
    await page.getByRole('button', {name : 'Login'}).click();

    await page.getByRole('listitem').filter({hasText : 'Expense'}).locator('a').first().click();
    await page.getByRole('link', {name : 'Expense Request'}).click();
    await page.getByRole('button', {name : '+ADD'}).click();

    await page.getByRole('textbox',{name : 'Default text'}).fill('23425452');



});
