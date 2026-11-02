import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://amayraa.com/us');
  await page.getByRole('link').filter({ hasText: /^$/ }).nth(2).click();
  await page.getByRole('button', { name: 'Company' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('szb202526@gmail.com');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('Tiger@00009');
  await page.getByRole('button', { name: 'Log in as Company Admin' }).click();

  await page.waitForTimeout(1000);
  
  await page.getByRole('button', { name: 'Go To Dashboard' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
 // await page.pause();
  await page.waitForTimeout(1000);
});
//test.setTimeout(100000);