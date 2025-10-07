import { test, expect } from '@playwright/test';

// Utility: Generate random number string
function generateRandomBillNo() {
  return Math.floor(Math.random() * 1_000_000_000).toString();
}

// Utility: Select random option from dropdown with retries + logging
async function selectRandomDropdownOption(page, dropdownLabel) {
  // Open dropdown
  const dropdown = page.locator(`div.rz-dropdown:has-text("${dropdownLabel}")`);
  await dropdown.click();

  // Ensure options are loaded
  const options = page.locator('li[role="option"]:visible');
  await expect(options.first()).toBeVisible({ timeout: 5000 });

  const count = await options.count();
  if (count === 0) throw new Error(`No options found for ${dropdownLabel}`);

  // Pick a random option
  const randomIndex = Math.floor(Math.random() * count);
  const option = options.nth(randomIndex);

  // Read text/label
  const selectedText =
    (await option.getAttribute("aria-label")) ||
    (await option.innerText());

  // Try clicking with retries (in case not visible immediately)
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await option.scrollIntoViewIfNeeded();
      await option.click({ timeout: 2000 });
      console.log(`✅ Selected option: ${selectedText}`);
      return selectedText.trim();
    } catch (e) {
      console.log(`⚠️ Attempt ${attempt} failed for ${selectedText}, retrying...`);
      if (attempt === 3) throw e;
    }
  }
}

test('Login Test - Navyug Expense App (using roles)', async ({ page }) => {
  // Login
  await page.goto('https://dev-navyugexpense.maxpro.cloud/account/login');
  await page.getByRole('textbox', { name: 'Please enter your Login ID' }).fill('vikramb');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('Welcome@123');
  await page.getByRole('button', { name: 'Login' }).click();
  console.log("✅ Login successful");

  // Navigate to Expense Request
  await page.locator('p', { hasText: 'Expense' }).first().hover();
  await page.locator('text=Expense Request').click();
  await page.getByRole('button', { name: '+ ADD' }).click();

  // Fill random bill number
  await page.getByLabel('Default TextBox').fill(generateRandomBillNo());

  // Select current date in calendar
  await page.locator('button.rz-datepicker-trigger').click();
  await expect(page.locator('.rz-calendar')).toBeVisible();
  await page.locator('.rz-datepicker-currentday').click();
  console.log("✅ Current date selected");

  // Select random Expense Type
  const selected = await selectRandomDropdownOption(page, 'Expense Type');

  // Conditional actions based on selection
  switch (selected) {
    case "Office":
      console.log("🏢 Office flow");
      await page.fill('input[placeholder="Enter Office Bill Number"]', "OFF-" + Date.now());
      break;

    case "Transport":
      console.log("🚛 Transport flow");
      await page.fill('input[placeholder="Enter Vehicle Number"]', "TN-" + Math.floor(Math.random() * 9999));
      break;

    case "Loading & Unloading":
      console.log("📦 Loading & Unloading flow");
      await page.fill('input[placeholder="Enter Loading Ref No"]', "LD-" + Date.now());
      break;

    default:
      console.log(`ℹ️ No specific flow for: ${selected}`);
      break;
  }
});
