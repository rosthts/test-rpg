import { Locator, Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class YourCharacter extends BasePage {
  readonly userName = this.page.getByTestId('character-name');
  readonly userInfo = this.page.getByTestId('character-stats');

  getStatBlock(stat: string) {
    return this.page.locator(`[data-character-stats="${stat}"]`);
  }

  getStatValueLocator(stat: string) {
    return this.getStatBlock(stat).locator('span.text-sm');
  }

  getStatProgressLocator(stat: string) {
    return this.getStatBlock(stat).locator('div[style*="transform: translateX"]');
  }

  constructor(page: Page) {
    super(page);
  }

  async getUserName(): Promise<string> {
    const name = await this.userName.textContent();
    if (!name) throw new Error('Character name not found');
    return name.trim();
  }

  async getUserInfo(): Promise<string> {
    const text: string = await this.userInfo.textContent();
    if (!text) throw new Error('Character stats not found');
    return text.trim();
  }

  async getStat(
    stat: 'Strength' | 'Agility' | 'Wisdom' | 'Magic' | 'Level',
  ): Promise<{ value: number; percent: number }> {
    const valueLocator = this.getStatValueLocator(stat);
    const progressLocator = this.getStatProgressLocator(stat);

    const valueText = await valueLocator.textContent();
    const value = Number(valueText?.trim());

    const style = await progressLocator.getAttribute('style');
    const match = style?.match(/translateX\((-?\d+)%\)/);
    const percent = match ? 100 + Number(match[1]) : NaN;

    if (isNaN(value) || isNaN(percent)) {
      throw new Error(`Can't parse stat ${stat}: value="${valueText}", transform="${style}"`);
    }

    return { value, percent };
  }
}
