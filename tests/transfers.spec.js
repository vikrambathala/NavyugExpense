import { test, expect } from '@playwright/test';
const config = require('C:\\Users\\admin\\playwrightautomation\\expense-management-app\\config.js');

test('test', async ({ page }) => {
  await page.goto(config.siteUrl);
  
  await page.getByRole('textbox', { name: 'Please enter your Login ID' }).fill(config.username);
  await page.getByRole('textbox', { name: 'Enter your password' }).fill(config.password);
  await page.getByRole('button', { name: 'Login' }).click();

  //Petty Cash Transfer
  await page.locator('a').filter({ hasText: 'Payment' }).first().click();
  //await page.getByRole('link', { name: 'Petty Cash Transfer' }).click();
  await page.getByRole('link', { name: 'Petty Cash Transfer', exact: true }).click();

  await page.getByRole('button', { name: '+ ADD' }).click();
  await page.getByRole('button').nth(1).click();
  await page.getByText('9', { exact: true }).click();
  await page.getByText('Bank Account Nellore Store 3').click();
  await page.getByText('Nellore Store 3 - Axis Bank Ltd -').click();
  await page.getByText('Location Type Store').click();
  await page.getByRole('option', { name: 'Store' }).click();
  await page.getByText('Location').nth(3).click();
  await page.getByRole('option', { name: 'Nellore' }).click();
  await page.locator('.rz-spinner-input').click();
  await page.locator('.rz-spinner-input').fill('2500');
  await page.getByText('Payment Mode Cash Cheque NEFT').click();
  await page.getByRole('option', { name: 'Cash' }).click();
  await page.getByRole('textbox', { name: 'Default TextBox' }).click();
  await page.getByRole('textbox', { name: 'Default TextBox' }).fill('2524545');
  await page.getByRole('button', { name: 'SUBMIT' }).click();

  // Internal Transfer
  await page.locator('a').filter({ hasText: 'Payment' }).first().click();
  await page.getByRole('link', { name: 'Internal Transfer', exact: true }).click();
  await page.getByRole('button', { name: '+ ADD' }).click();
  await page.getByRole('button').nth(1).click();
  await page.getByText('9', { exact: true }).click();
  await page.getByText('From Bank account Nellore').click();
  await page.getByRole('option', { name: 'Nellore Store 3 - Axis Bank Ltd -' }).locator('span').click();
  await page.getByText('To Bank account Nellore Store').click();
  await page.getByRole('option', { name: 'Chennai - IDBI Bank Limited -' }).locator('span').click();
  await page.getByRole('textbox', { name: '0', exact: true }).click();
  await page.getByRole('textbox', { name: '0', exact: true }).fill('200');
  await page.getByPlaceholder('Reference No').click();
  await page.getByPlaceholder('Reference No').fill('254654343');
  await page.getByRole('button', { name: 'SUBMIT' }).click();


  //Petty Cash Withdrawl - - - APP Slow
  await page.locator('a').filter({ hasText: 'Payment' }).first().click();
  await page.getByRole('link', { name: 'Petty Cash Withdrawal' }).click();
  
  await page.locator('#popup3A1GO3ZDwk > .rz-datepicker-group > .rz-datepicker-calendar-container > .rz-datepicker-calendar > tbody > tr:nth-child(2) > td:nth-child(5) > .rz-state-default').click();
  await page.getByRole('button', { name: 'Yes' }).click();
});