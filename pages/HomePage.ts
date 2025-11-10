import { Locator, Page, expect } from "@playwright/test";

export class HomePage {
    readonly page: Page;

      constructor(page: Page) {
        this.page = page;
      }

      async openMain (){
        await this.page.goto('/');
      }

      async verifyUrl (){
        await expect(this.page).toHaveURL('/');
      }

      async verifyTitle (){
        await expect(this.page).toHaveTitle('The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office');
      }
}
