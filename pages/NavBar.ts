import { Locator, Page, expect } from '@playwright/test';

export class NavBar {
  readonly navBar: Locator;
  readonly navBarHomeButton: Locator;
  readonly navBarOnSaleButton: Locator;
  readonly navBarCollectionsButton: Locator;
  readonly navBarPersonalButton: Locator;
  readonly navBarBusinessesButton: Locator;
  readonly navBarTechTalkButton: Locator;
  readonly navBarAboutUsButton: Locator;
  readonly navBarFAQButton: Locator;
  readonly navBarContactButton: Locator;

  constructor(page: Page) {
    this.navBar = page.locator('div.header__inline-menu');
    this.navBarHomeButton = page.locator('a.header__menu-item[href="/"]');
    this.navBarOnSaleButton = page.locator('a.header__menu-item[href="/collections/on-sale"]');
    this.navBarCollectionsButton = page.locator('summary.header__menu-item[data-href="/pages/products"]');
    this.navBarPersonalButton = page.locator('summary.header__menu-item[data-href="/pages/personal"]');
    this.navBarBusinessesButton = page.locator('summary.header__menu-item[data-href="/pages/businesses"]');
    this.navBarTechTalkButton = page.locator('a.header__menu-item[href="/blogs/tech-talk"]');
    this.navBarAboutUsButton = page.locator('summary.header__menu-item[data-href="/pages/about-us"]');
    this.navBarFAQButton = page.locator('a.header__menu-item[href="/pages/faqs"]');
    this.navBarContactButton = page.locator('a.header__menu-item[href="/pages/contact-us"]');
  }

  async verifyNavBar() {
    await expect(this.navBar).toBeVisible();
    await expect(this.navBarHomeButton).toBeVisible();
    await expect(this.navBarHomeButton).toHaveText('Home');

    await expect(this.navBarOnSaleButton).toBeVisible();
    await expect(this.navBarOnSaleButton).toHaveText('On Sale');

    await expect(this.navBarOnSaleButton).toBeVisible();
    await expect(this.navBarOnSaleButton).toHaveText('On Sale');

    await expect(this.navBarCollectionsButton).toBeVisible();
    await expect(this.navBarCollectionsButton).toHaveText('Collections');

    await expect(this.navBarPersonalButton).toBeVisible();
    await expect(this.navBarPersonalButton).toHaveText('Personal');

    await expect(this.navBarBusinessesButton).toBeVisible();
    await expect(this.navBarBusinessesButton).toHaveText('Businesses');

    await expect(this.navBarTechTalkButton).toBeVisible();
    await expect(this.navBarTechTalkButton).toHaveText('Tech Talk');

    await expect(this.navBarAboutUsButton).toBeVisible();
    await expect(this.navBarAboutUsButton).toHaveText('About us');

    await expect(this.navBarFAQButton).toBeVisible();
    await expect(this.navBarFAQButton).toHaveText('FAQ');

    await expect(this.navBarContactButton).toBeVisible();
    await expect(this.navBarContactButton).toHaveText('Contact');
  }
}
