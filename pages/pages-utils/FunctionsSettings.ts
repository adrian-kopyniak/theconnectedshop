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