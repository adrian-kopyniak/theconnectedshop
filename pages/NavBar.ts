import { vi } from '@faker-js/faker/.';
import { Locator, Page, expect } from '@playwright/test';
import { verifyText, visibleElement } from './pages-utils/FunctionsSettings';

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
    /* replaced by a utility function:
    await expect(this.navBar).toBeVisible();
    await expect(this.navBarHomeButton).toBeVisible();
    await expect(this.navBarHomeButton).toHaveText('Home');

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
    await expect(this.navBarContactButton).toHaveText('Contact'); */

    await visibleElement(this.navBar, 'NavBar Container');
    await visibleElement(this.navBarHomeButton, 'NavBar "Home" Button');
    await visibleElement(this.navBarOnSaleButton, 'NavBar "On Sale" Button');
    await visibleElement(this.navBarCollectionsButton, 'NavBar "Collections" Button');
    await visibleElement(this.navBarPersonalButton, 'NavBar "Personal" Button');
    await visibleElement(this.navBarBusinessesButton, 'NavBar "Businesses" Button');
    await visibleElement(this.navBarTechTalkButton, 'NavBar "Tech Talk" Button');
    await visibleElement(this.navBarAboutUsButton, 'NavBar "About Us" Button');
    await visibleElement(this.navBarFAQButton, 'NavBar FAQ Button');
    await visibleElement(this.navBarContactButton, 'NavBar "Contact" Button');

    await verifyText(this.navBarHomeButton, 'Home', 'NavBar "Home" Button');
    await verifyText(this.navBarOnSaleButton, 'On Sale', 'NavBar "On Sale" Button');
    await verifyText(this.navBarCollectionsButton, 'Collections', 'NavBar "Collections" Button');
    await verifyText(this.navBarPersonalButton, 'Personal', 'NavBar "Personal" Button');
    await verifyText(this.navBarBusinessesButton, 'Businesses', 'NavBar "Businesses" Button');
    await verifyText(this.navBarTechTalkButton, 'Tech Talk', 'NavBar "Tech Talk" Button');
    await verifyText(this.navBarAboutUsButton, 'About Us', 'NavBar "About Us" Button');
    await verifyText(this.navBarFAQButton, 'FAQ', 'NavBar FAQ Button');
    await verifyText(this.navBarContactButton, 'Contact', 'NavBar "Contact" Button');
  }
}
