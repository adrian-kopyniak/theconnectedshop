import { Locator, Page, expect } from '@playwright/test';

export async function clickElement(locator: Locator, elementName: string) {
  try {
    console.log(`CLICK: ${elementName}`);
    await locator.click();
    console.log(`CLICK SUCCESS: ${elementName}`);
  } catch (error) {
    console.error(`CLICK FAILED: ${elementName}`);
    throw new Error(`Cannot click '${elementName}': ${error}`);
  }
}

export async function fillElement(locator: Locator, value: string, name: string) {
  try {
    console.log(`FILL: ${name} -> "${value}"`);
    await locator.fill(value);
    await expect(locator).toHaveValue(value);
    const actual = await locator.inputValue();
    console.log(`FILL CHECK: ${name} VALUE = "${actual}"`);
  } catch (error) {
    throw new Error(`FILL FAILED: ${name}, VALUE="${value}"\n${error}`);
  }
}

export async function visibleElement(locator: Locator, name: string) {
  try {
    console.log(`CHECK VISIBLE: ${name}`);
    await expect(locator).toBeVisible();
    console.log(`VISIBLE OK: ${name}`);
  } catch (error) {
    throw new Error(` NOT VISIBLE: ${name}\n${error}`);
  }
}

export async function verifyText(locator: Locator, expectedText: string, elementName: string, partial = false) {
  try {
    console.log(`CHECK TEXT: ${elementName} -> "${expectedText}"`);
    if (partial) {
      await expect(locator).toContainText(expectedText);
    } else {
      await expect(locator).toHaveText(expectedText);
    }
    console.log(`TEXT OK: ${elementName}`);
  } catch (error) {
    throw new Error(`TEXT MISMATCH: ${elementName}, EXPECTED="${expectedText}"\n${error}`);
  }
}

export async function verifyUrl(page: Page, expectedUrl: string) {
  try {
    console.log(`CHECK URL: ${expectedUrl}`);
    await expect(page).toHaveURL(expectedUrl);
    console.log(`URL OK: ${expectedUrl}`);
  } catch (error) {
    throw new Error(`URL MISMATCH: EXPECTED="${expectedUrl}"\n${error}`);
  }
}

export async function verifyTitle(page: Page, expectedTitle: string) {
  try {
    console.log(`CHECK TITLE: ${expectedTitle}`);
    await expect(page).toHaveTitle(expectedTitle);
    console.log(`TITLE OK`);
  } catch (error) {
    throw new Error(`TITLE MISMATCH: EXPECTED="${expectedTitle}"\n${error}`);
  }
}

export async function pressKey(page: Page, key: string, actionName: string) {
  try {
    console.log(`PRESS KEY: ${key} (${actionName})`);
    await page.keyboard.press(key);
    console.log(`KEY PRESSED: ${key}`);
  } catch (error) {
    throw new Error(`KEY PRESS FAILED: ${key} (${actionName})\n${error}`);
  }
}

export async function verifyAttribute(
  locator: Locator, 
  attribute: string, 
  expectedValue: string, 
  elementName: string
) {
  try {
    console.log(`CHECK ATTR: ${elementName}.${attribute} -> "${expectedValue}"`);
    await expect(locator).toHaveAttribute(attribute, expectedValue);
    console.log(`ATTR OK: ${elementName}.${attribute}`);
  } catch (error) {
    throw new Error(`ATTR MISMATCH: ${elementName}.${attribute}, EXPECTED="${expectedValue}"\n${error}`);
  }
}

export async function openUrl(page: Page, url: string) {
  try {
    console.log(`OPENING URL: ${url}`);
    await page.goto(url);
    console.log(`URL OPENED: ${url}`);
  } catch (error) {
    throw new Error(`FAILED TO OPEN URL: ${url}\n${error}`);
  }
}