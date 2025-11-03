import { expect, test } from "@playwright/test";

test.describe('Main page verification', ()=>{
test.beforeEach(async({page})=>{
    await page.goto('/');
});

test('Test opening verification', async ({page})=>{
        await expect(page).toHaveURL('/')

});

test('Title verification', async ({page})=>{
       await expect(page).toHaveTitle('The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office');

});

test('Logo verification', async ({page})=>{
const logo = page.locator('a.header__heading-link'); 
const logoImage = logo.locator('img.header__heading-logo');

await expect(logo).toBeVisible({timeout:10000});
await expect(logo).toHaveAttribute('href', '/');

await expect(logoImage).toBeVisible({timeout:10000});
await expect(logoImage).toHaveAttribute('alt', 'The Connected Shop');
await expect(logoImage).toHaveAttribute('height', '90.0');
await expect(logoImage).toHaveAttribute('width', '180');
});

test('Search availability verification', async ({page})=>{
const search = page.locator('div.header__search');
const searchInput = page.locator('input#Search-In-Inline');
const searchButton = page.locator('button.search__button').first();
const searchButtonIcon = page.locator('svg.icon-search').first();

await expect(search).toBeVisible({timeout:10000});

await expect(searchInput).toBeVisible({timeout:10000});
await expect(searchInput).toHaveAttribute('id', 'Search-In-Inline');
await expect(searchInput).toHaveAttribute('type', 'search');
await expect(searchInput).toHaveAttribute('name', 'q');
await expect(searchInput).toHaveAttribute('placeholder', 'Search');
await expect(searchInput).toHaveAttribute('role', 'combobox');

await expect(searchButton).toBeVisible({timeout:10000});

await expect(searchButtonIcon).toBeVisible({timeout:10000});
await expect(searchButtonIcon).toHaveAttribute('role', 'presentation');
await expect(searchButtonIcon).toHaveAttribute('width', '24');
await expect(searchButtonIcon).toHaveAttribute('height', '24');
});

test('Customer support button availability verification', async ({page})=>{
const customerSupportButton = page.locator('a.header__customer-support-region');
const customerSupportButtonIcon = page.locator('svg.icon-support-region').nth(1);

await expect(customerSupportButton).toBeVisible({timeout:10000});
await expect(customerSupportButton).toHaveAttribute('href', 'tel:(305) 330-3424');

await expect(customerSupportButtonIcon).toBeVisible({timeout:10000});
await expect(customerSupportButtonIcon).toHaveAttribute('width', '24');
await expect(customerSupportButtonIcon).toHaveAttribute('height', '24');
});

test('Account button availability verification', async ({page})=>{
const accountButton = page.locator('a.header__icon--account').nth(1);
const accountButtonIcon = page.locator('svg.icon-account').nth(1);

await expect(accountButton).toBeVisible({timeout:10000});

await expect(accountButtonIcon).toBeVisible({timeout:10000});
await expect(accountButtonIcon).toHaveAttribute('width', '24');
await expect(accountButtonIcon).toHaveAttribute('height', '24');
});

test('Cart button availability verification', async ({page}) => {
const cartButton = page.locator('a.header__icon--cart');
const cartButtonIcon = page.locator('svg.icon-cart');

await expect(cartButton).toBeVisible({timeout:10000});

await expect(cartButtonIcon).toBeVisible({timeout:10000});
await expect(cartButtonIcon).toHaveAttribute('width', '24');
await expect(cartButtonIcon).toHaveAttribute('height', '24');
});
});