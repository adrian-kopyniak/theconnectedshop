import { Locator, Page, expect } from '@playwright/test';
import { visibleElement, verifyAttribute } from './pages-utils/FunctionsSettings';

export class Header {
  readonly page: Page;
  readonly logo: Locator;
  readonly logoImage: Locator;
  readonly customerSupportButton: Locator;
  readonly customerSupportButtonIcon: Locator;
  readonly accountButton: Locator;
  readonly accountButtonIcon: Locator;
  readonly cartButton: Locator;
  readonly cartButtonIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('a.header__heading-link');
    this.logoImage = this.logo.locator('img.header__heading-logo');

    this.customerSupportButton = page.locator('a.header__customer-support-region');
    this.customerSupportButtonIcon = page.locator('svg.icon-support-region').nth(1);

    this.accountButton = page.locator('a.header__icon--account').nth(1);
    this.accountButtonIcon = page.locator('svg.icon-account').nth(1);

    this.cartButton = page.locator('a.header__icon--cart');
    this.cartButtonIcon = page.locator('svg.icon-cart');
  }

  async verifyLogo() {
    /* replaced by a utility function:
    await expect(this.logo).toBeVisible();
    await expect(this.logo).toHaveAttribute("href", "/");
    await expect(this.logoImage).toBeVisible();
    await expect(this.logoImage).toHaveAttribute("alt", "The Connected Shop"); */
    await visibleElement(this.logo, 'logo');
    await visibleElement(this.logoImage, 'logo image');
    await verifyAttribute(this.logo, 'href', '/', 'Logo link');
    await verifyAttribute(this.logoImage, 'alt', 'The Connected Shop', 'Logo image');
  }

  async verifyCustomerSupport() {
    /* replaced by a utility function:
    await expect(this.customerSupportButton).toBeVisible();
    await expect(this.customerSupportButton).toHaveAttribute("href", "tel:(305) 330-3424");
    await expect(this.customerSupportButtonIcon).toBeVisible(); */
    await visibleElement(this.customerSupportButton, 'Customer Support Button');
    await visibleElement(this.customerSupportButtonIcon, 'Customer Support Button Icon');
    await verifyAttribute(this.customerSupportButton, 'href', 'tel:(305) 330-3424', 'Customer Support Button');
  }

  async verifyAccountButton() {
    /* replaced by a utility function:
    await expect(this.accountButton).toBeVisible();
    await expect(this.accountButtonIcon).toBeVisible(); */
    await visibleElement(this.accountButton, 'Account Button');
    await visibleElement(this.accountButtonIcon, 'Account Button Icon');
  }

  async verifyCartButton() {
    /* replaced by a utility function:
    await expect(this.cartButton).toBeVisible();
    await expect(this.cartButtonIcon).toBeVisible(); */
    await visibleElement(this.cartButton, 'Cart Button');
    await visibleElement(this.cartButtonIcon, 'Cart Button Icon');
  }
}
