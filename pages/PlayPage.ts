import { expect, Locator, Page } from '@playwright/test';
import { Adventure } from '../components/Adventure.component';
import { YourCharacter } from '../components/YourCharacter.component';
import { BasePage } from './BasePage';

export class PlayPage extends BasePage {
  readonly character: YourCharacter;
  readonly adventure: Adventure;

  readonly loginButton = this.page.getByTestId('login-button');
  readonly emailInput = this.page.locator('input[type="email"]');
  readonly passwordInput = this.page.locator('input[type="password"]');
  readonly submitLoginButton = this.page.locator('button[type="submit"]');

  readonly heroNameInput = this.page.getByPlaceholder('Galactic space lord');
  readonly heroList = this.page.getByRole('combobox');
  getOptionByName(name: string): Locator {
    return this.page.getByRole('option', { name });
  }

  readonly startButton = this.page.getByRole('button', { name: 'Start!' });

  constructor(page: Page) {
    super(page);
    this.character = new YourCharacter(page);
    this.adventure = new Adventure(page);
  }

  async login(username: string): Promise<void> {
    await this.loginButton.click();
    await this.emailInput.fill(username);
    await this.passwordInput.fill('Password');
    await this.submitLoginButton.click();
  }

  async selectCharacter(name: string): Promise<void> {
    await this.heroNameInput.fill('Hero');
    await this.heroList.click();
    await this.getOptionByName(name).click();
    const selected = await this.heroList.textContent();
    await expect(selected).toEqual(name);
  }

  async start(): Promise<void> {
    await this.startButton.click();
  }
}
