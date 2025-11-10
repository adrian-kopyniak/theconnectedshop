import { Locator, Page, expect } from '@playwright/test';

export class Search {
  readonly page:Page;
  readonly search: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchButtonIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.search = page.locator('div.header__search');
    this.searchInput = page.locator('input#Search-In-Inline');
    this.searchButton = page.locator('button.search__button').first();
    this.searchButtonIcon = page.locator('svg.icon-search').first();
  }

  async verifySearchVisibility() {
    await expect(this.search).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.searchInput).toHaveAttribute('placeholder', 'Search');
    await expect(this.searchButton).toBeVisible();
    await expect(this.searchButtonIcon).toBeVisible();
  }

  async verifySearchFill(value: string) {
    await this.searchInput.fill(value);
    await expect(this.searchInput).toHaveValue(value);
  }

  async pressEnterOnSearch() {
    await this.page.keyboard.press('Enter');
  }

  async clickOnSearchButtonIcon() {
    await this.searchButtonIcon.click();
  }
}
