import { Locator, Page, expect } from "@playwright/test";
 
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
    this.logo = page.locator("a.header__heading-link");
    this.logoImage = this.logo.locator("img.header__heading-logo");
 
    this.customerSupportButton = page.locator("a.header__customer-support-region");
    this.customerSupportButtonIcon = page.locator("svg.icon-support-region").nth(1);
 
    this.accountButton = page.locator("a.header__icon--account").nth(1);
    this.accountButtonIcon = page.locator("svg.icon-account").nth(1);
 
    this.cartButton = page.locator("a.header__icon--cart");
    this.cartButtonIcon = page.locator("svg.icon-cart");
  }
 


  async verifyLogo() {
    await expect(this.logo).toBeVisible();
    await expect(this.logo).toHaveAttribute("href", "/");
    await expect(this.logoImage).toBeVisible();
    await expect(this.logoImage).toHaveAttribute("alt", "The Connected Shop");
  }
 
  async verifyCustomerSupport() {
    await expect(this.customerSupportButton).toBeVisible();
    await expect(this.customerSupportButton).toHaveAttribute("href", "tel:(305) 330-3424");
    await expect(this.customerSupportButtonIcon).toBeVisible();
  }
 
  async verifyAccountButton() {
    await expect(this.accountButton).toBeVisible();
    await expect(this.accountButtonIcon).toBeVisible();
  }
 
  async verifyCartButton() {
    await expect(this.cartButton).toBeVisible();
    await expect(this.cartButtonIcon).toBeVisible();
  }
}