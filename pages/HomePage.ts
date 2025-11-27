import { Locator, Page, expect } from '@playwright/test';
import { verifyUrl, verifyTitle, openUrl } from './pages-utils/FunctionsSettings';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openMain() {
    /* replaced by a utility function:
    await this.page.goto('/'); */
    await openUrl(this.page, '/');
  }

  async verifyUrl() {
    /* replaced by a utility function:
    await expect(this.page).toHaveURL('/'); */
    await verifyUrl(this.page, '/');
  }

  async verifyTitle() {
    /* replaced by a utility function:
    await expect(this.page).toHaveTitle('The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office'); */
    await verifyTitle(this.page, 'The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office');
  }
}
