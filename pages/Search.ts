import { Locator, Page, expect } from '@playwright/test';

export class Search {
  readonly page: Page;
  readonly search: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchButtonIcon: Locator;

  readonly searchModal: Locator;
  readonly searchModalSuggestions: Locator;
  readonly searchModalSearchForButton: Locator;
  readonly searchModalResults: Locator;
  readonly searchModalFooter: Locator;

  readonly searchResultsHeader: Locator;
  readonly searchResultsHeaderTitle: Locator;
  readonly searchResultsHeaderSearch: Locator;
  readonly searchResultsHeaderSearchInput: Locator;
  readonly searchResultsHeaderSearchButton: Locator;
  readonly searchResultsHeaderNoResultsMessage: Locator;

  readonly searchResultsContainer: Locator;
  readonly searchResultsProducts: Locator;
  // readonly searchResultsProductsFirstItem: Locator;
  readonly searchResultsItems: Locator;

  readonly searchResultsArticles: Locator;
  readonly searchResultsPages: Locator;

  readonly searchResultsFilter: Locator;
  readonly searchResultsSorting: Locator;
  readonly searchResultsCounter: Locator;

  readonly searchResultsPaginationContainer: Locator;
  readonly searchResultsPaginationButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.search = page.locator('div.header__search');
    this.searchInput = page.locator('input#Search-In-Inline');
    this.searchButton = page.locator('button.search__button').first();
    this.searchButtonIcon = page.locator('svg.icon-search').first();

    this.searchModal = page.locator('div[data-predictive-search]');
    this.searchModalSuggestions = page.locator('div.predictive-search__queries');
    this.searchModalSearchForButton = page.locator('div.predictive-search__header');
    this.searchModalResults = page.locator('div.predictive-search__results-list');
    this.searchModalFooter = page.locator('div.predictive-search__search-url');

    this.searchResultsHeader = page.locator('div.template-search__header');
    this.searchResultsHeaderTitle = this.searchResultsHeader.locator('h1.font-heading-bold');
    this.searchResultsHeaderSearch = this.searchResultsHeader.locator('div.template-search__search');
    this.searchResultsHeaderSearchInput = this.searchResultsHeader.locator('input.search__input');
    this.searchResultsHeaderSearchButton = this.searchResultsHeader.locator('button.search__button');
    this.searchResultsHeaderNoResultsMessage = this.searchResultsHeader.locator('p.alert');

    this.searchResultsContainer = page.locator('div#product-grid');
    this.searchResultsProducts = page.locator('ul#results-product-list-1');
    this.searchResultsItems = page.locator('p.predictive-search__item__title');
    // this.searchResultsProductsFirstItem = this.searchResultsProducts.locator('li')
    this.searchResultsArticles = page.locator('ul#results-article-list-1');
    this.searchResultsPages = page.locator('ul#results-pages-list-1');

    this.searchResultsFilter = page.locator('form#FacetFiltersForm');
    this.searchResultsSorting = page.locator('form#FacetSortForm');
    this.searchResultsCounter = page.locator('div.product-count');

    this.searchResultsPaginationContainer = page.locator('nav.pagination');
    this.searchResultsPaginationButton = this.searchResultsPaginationContainer.locator('a.pagination__item');
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

  async resultsOnSearchModalButton(value: string) {
    await expect(this.searchModalSearchForButton).toBeVisible();
    await expect(this.searchModalSearchForButton).toContainText(value);
  }

  async resultsOnSearchModalSuggestions(value: string) {
    await expect(this.searchModalSuggestions).toBeVisible();
    await expect(this.searchModalSuggestions).toContainText(value);
  }

  async resultsOnSearchModalProducts(text: string) {
    await this.page.waitForSelector('p.predictive-search__item__title', { state: 'visible' });
    const allTitles = await this.searchResultsItems.allTextContents();
    console.log('Found search results:', allTitles);
    const hasMatch = allTitles.some((t) => t.toLowerCase().includes(text.toLowerCase()));
    expect(hasMatch, `Expected one of predictive results to contain: "${text}"`).toBeTruthy();
  }
}
