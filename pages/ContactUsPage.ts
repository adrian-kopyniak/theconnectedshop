import { Locator, Page, expect } from '@playwright/test';

export class contactUsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly nameInput: Locator;
  readonly nameInputLabel: Locator;
  readonly emailInput: Locator;
  readonly emailInputLabel: Locator;
  readonly phoneNumberInput: Locator;
  readonly phoneNumberInputLabel: Locator;
  readonly commentTextarea: Locator;
  readonly commentLabel: Locator;
  readonly sendButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('div.title');
    this.nameInput = page.locator('input#ContactForm-name');
    this.nameInputLabel = page.locator('label[for="ContactForm-name"]');
    this.emailInput = page.locator('#ContactForm-email');
    this.emailInputLabel = page.locator('label[for="ContactForm-email"]');
    this.phoneNumberInput = page.locator('#ContactForm-phone');
    this.phoneNumberInputLabel = page.locator('label[for="ContactForm-phone"]');
    this.commentTextarea = page.locator('#ContactForm-body');
    this.commentLabel = page.locator('label[for="ContactForm-body"]');
    this.sendButton = page.locator('button[type="submit"]');
  }

  async openContactUs() {
    await this.page.goto('/pages/contact-us');
  }

  async verifyUrl() {
    await expect(this.page).toHaveURL('/pages/contact-us');
  }

  async verifyTitle() {
    await expect(this.page).toHaveTitle('Contact us - Email, Phone Call & Online Chat - The Connected Shop');
  }

  async verifyPageHeading() {
    await expect(this.heading).toHaveText('Contact Us');
  }

  async verifyAllLabels() {
    await expect(this.nameInputLabel).toHaveText('Name');
    await expect(this.emailInputLabel).toContainText('Email'); // contains через asterisk
    await expect(this.phoneNumberInputLabel).toHaveText('Phone number');
    await expect(this.commentLabel).toHaveText('Comment');
  }

  async fillContactForm(name: string, email: string, phone: string, comment: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.phoneNumberInput.fill(phone);
    await this.commentTextarea.fill(comment);
  }

  async submitContactForm() {
    await this.sendButton.click();
  }
}
