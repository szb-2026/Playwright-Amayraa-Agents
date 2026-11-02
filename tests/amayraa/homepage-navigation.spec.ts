import { test, expect } from '@playwright/test';

test.describe('Storefront discovery and shopping', () => {
  test('Browse the homepage and navigate to a category', async ({ page }) => {
    // 1. Start with a fresh browser context, no signed-in user, and an empty cart. Open https://www.amayraa.com.
    await page.goto('https://www.amayraa.com');

    await expect(page).toHaveURL(/\/us\/?$/);
    await expect(page).toHaveTitle('Amayraa | Premium Fashion Storefront');
    await expect(page.getByText('SHOP BY CATEGORIES', { exact: true })).toBeVisible();
    await expect(page.locator('a[href="#shoppingCart"]')).toContainText('0');
    await page.waitForTimeout(1000);

    // 2. Inspect the primary navigation, hero carousel, category carousel, new-items section, shop-the-look links, brand section, and footer.
    const navigation = page.getByRole('navigation');
    for (const name of ['Shirting', 'Tops', 'Lounge', 'Dresses', 'Occasion', 'About']) {
      await expect(navigation.getByRole('link', { name: new RegExp(`^${name}`) })).toBeVisible();
    }


    await expect(page.getByRole('heading', { name: 'Discover all new items' })).toBeVisible();
    await expect(page.getByRole('button', { name: /View product: Linen Button-Down Shirt/ })).toBeVisible();
    await page.waitForTimeout(3000);
    await expect(page.getByRole('link', { name: /View All Brands/ })).toBeVisible();
    await expect(page.getByText('© 2025 Amayraa Store. All Rights Reserved')).toBeVisible();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Go to slide 2' }).click();
    await expect(page.getByRole('button', { name: 'Go to slide 2' })).toBeFocused();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Go to slide 1' }).click();
    await expect(page.getByRole('button', { name: 'Go to slide 1' })).toBeFocused();
    await page.waitForTimeout(1000);
    

    // 3. Open Dresses from the primary navigation, then use the site logo to return home.
    await navigation.getByRole('link', { name: /^Dresses/ }).click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/\/us\/categories\/dresses(?:[?#]|$)/);
    await expect(page.getByRole('link', { name: /Kanavu dress/ }).first()).toBeVisible();
    await page.waitForTimeout(1000);
    await page.getByRole('link', { name: 'Amayraa', exact: true }).click();

    await expect(page).toHaveURL(/\/us\/?$/);
    await expect(page).toHaveTitle('Amayraa | Premium Fashion Storefront');
    await page.waitForTimeout(1000);

  });
});
