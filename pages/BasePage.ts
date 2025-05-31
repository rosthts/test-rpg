import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://test-rpg.vercel.app/play');
  }

  async click(selector) {
    await this.page.click(selector);
  }

  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  async getText(selector: string): Promise<string | null> {
    return await this.page.textContent(selector);
  }
}
