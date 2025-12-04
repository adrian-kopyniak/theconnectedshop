import { expect, test } from '@playwright/test';
import { ContactUsPage } from '../pages/ContactUsPage';
import { generateContactFormData } from '../utils/TestData';
import * as allure from 'allure-js-commons';

test.describe('"Contact Us" page verification', () => {
  let contactUsPage: ContactUsPage;

  test.beforeEach(async ({ page }) => {
    contactUsPage = new ContactUsPage(page);
    await contactUsPage.openContactUs();
    await contactUsPage.verifyUrl();
  });

  test('Check "Contact Us" page', async () => {
    await allure.severity('medium');
    await contactUsPage.verifyTitle();
    await contactUsPage.verifyPageHeading();
    await contactUsPage.verifyFormElements();
    await contactUsPage.verifyAllLabels();
  });

  test('Fill form with valid data', async () => {
    const formData = await generateContactFormData();

    await allure.severity('medium');

    await contactUsPage.fillContactForm(formData.name, formData.email, formData.phone, formData.comment);
    await contactUsPage.submitContactForm();
    /* captcha issue
    await contactUsPage.verifySuccessMessage(); */
  });

  test('Fill form with invalid data', async () => {
    const formData = await generateContactFormData();

    await contactUsPage.fillContactForm(formData.email, formData.phone, formData.comment, formData.name);
    await contactUsPage.submitContactForm();
    await expect(contactUsPage.successMessage).not.toBeVisible();
  });

  test('Submit form with empty required fields', async () => {
    const formData = await generateContactFormData();

    await contactUsPage.fillContactForm(formData.name, '', formData.phone, formData.comment);
    await contactUsPage.submitContactForm();
    await expect(contactUsPage.successMessage).not.toBeVisible();
  });

  test('Submit form with filled only required fields', async () => {
    const formData = await generateContactFormData();

    await contactUsPage.fillContactForm('', formData.email, '', '');
    await contactUsPage.submitContactForm();
    /* captcha issue
    await contactUsPage.verifySuccessMessage(); */
  });
});
