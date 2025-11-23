import { Locator, Page, expect } from '@playwright/test';

export class className {
  readonly page: Page;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('a.header__heading-link');
  }

  async methodName() {
    await expect(this.logo).toBeVisible();
    await expect(this.logo).toHaveAttribute('href', '/');
  }
}
