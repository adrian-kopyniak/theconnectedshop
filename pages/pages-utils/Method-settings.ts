import { Locator, Page, expect } from "@playwright/test";
 
export class Header {

  readonly page: Page;
  

  constructor(page: Page) {
    this.page = page;
  }
 
// async verifyLogo() {
//     await expect(this.logo).toBeVisible();
    
//   }
}