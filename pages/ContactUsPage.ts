import { Locator, Page, expect } from '@playwright/test';
import { clickElement, fillElement, visibleElement, verifyText, verifyUrl, verifyTitle, openUrl } from './pages-utils/FunctionsSettings';

export class ContactUsPage {
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
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('div.title h2');
    this.nameInput = page.locator('input#ContactForm-name');
    this.nameInputLabel = page.locator('label[for="ContactForm-name"]');
    this.emailInput = page.locator('#ContactForm-email');
    this.emailInputLabel = page.locator('label[for="ContactForm-email"]');
    this.phoneNumberInput = page.locator('#ContactForm-phone');
    this.phoneNumberInputLabel = page.locator('label[for="ContactForm-phone"]');
    this.commentTextarea = page.locator('#ContactForm-body');
    this.commentLabel = page.locator('label[for="ContactForm-body"]');
    this.sendButton = page.locator('div.contact__button button');
    this.successMessage = page.locator('form#ContactForm h2');
  }

  async openContactUs() {
    /* replaced by a utility function:
    await this.page.goto('/pages/contact-us'); */
    await openUrl(this.page, '/pages/contact-us');
  }

  async verifyUrl() {
    /* replaced by a utility function:
    await expect(this.page).toHaveURL('/pages/contact-us'); */
    await verifyUrl(this.page, '/pages/contact-us');
  }

  async verifyTitle() {
    /* replaced by a utility function:
    await expect(this.page).toHaveTitle('Contact us - Email, Phone Call & Online Chat - The Connected Shop'); */
    await verifyTitle(this.page, 'Contact us - Email, Phone Call & Online Chat - The Connected Shop');
  }

  async verifyPageHeading() {
    /* replaced by a utility function:
    await expect(this.heading).toHaveText('Contact Us'); */
    await verifyText(this.heading, 'Contact Us', 'h2 title of "Contact Us" section');
  }

  async verifyFormElements() {
    /* replaced by a utility function:
  await expect(this.nameInput).toBeVisible();
  await expect(this.emailInput).toBeVisible();
  await expect(this.phoneNumberInput).toBeVisible();
  await expect(this.commentTextarea).toBeVisible();
  await expect(this.sendButton).toBeVisible(); */
    await visibleElement(this.nameInput, 'name input');
    await visibleElement(this.emailInput, 'email input');
  }

  async verifyAllLabels() {
    /* replaced by a utility function:
    await expect(this.nameInputLabel).toHaveText('Name');
    await expect(this.emailInputLabel).toContainText('Email'); // contains через asterisk
    await expect(this.phoneNumberInputLabel).toHaveText('Phone number');
    await expect(this.commentLabel).toHaveText('Comment'); */
    await verifyText(this.nameInputLabel, 'Name', 'Name input label');
    await verifyText(this.emailInputLabel, 'Email', 'Email input label');
    await verifyText(this.phoneNumberInputLabel, 'Phone number', 'Phone number input label');
    await verifyText(this.commentLabel, 'Comment', 'Comment input label');
  }

  async fillContactForm(name: string, email: string, phone: string, comment: string) {
    /* replaced by a utility function:
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.phoneNumberInput.fill(phone);
    await this.commentTextarea.fill(comment); */
    await fillElement(this.nameInput, name, 'filed name field');
    await fillElement(this.emailInput, email, 'filed email field');
    await fillElement(this.phoneNumberInput, phone, 'filed phoneNumber field');
    await fillElement(this.commentTextarea, comment, 'filed comment field');
  }

  async submitContactForm() {
    /* replaced by a utility function:
    await this.sendButton.click(); */
    await clickElement(this.sendButton, 'send button');
  }

  async verifySuccessMessage() {
    /* replaced by a utility function:
    await expect(this.successMessage).toHaveText("Thanks for contacting us. We'll get back to you as soon as possible."); */
    await verifyText(
      this.successMessage,
      "Thanks for contacting us. We'll get back to you as soon as possible.",
      'Success Message of subimiting "Contact Us" form'
    );
  }
}
