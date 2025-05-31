import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class Adventure extends BasePage {
  readonly clickerSection = this.page.getByTestId('adventure-clicker');
  readonly clickItText = this.clickerSection.getByRole('button');
  readonly clickItButton = this.page.getByRole('button', { name: /Click me \d+ times/i });
  readonly clickerSuccessMessage = this.clickerSection.locator('[data-task="clicker"]');

  readonly uploaderSection = this.page.getByTestId('adventure-uploader');
  readonly fileInput = this.uploaderSection.locator('input[type="file"]');
  readonly uploaderSuccessMessage = this.uploaderSection.locator('[data-task="uploader"]');

  readonly typerSection = this.page.getByTestId('adventure-typer');
  readonly typeItInstruction = this.typerSection.locator('p');
  readonly typeItInputField = this.typerSection.locator('input');
  readonly typerSuccessMessage = this.typerSection.locator('[data-task="typer"]');

  readonly sliderSection = this.page.getByTestId('adventure-slider');
  readonly handle = this.sliderSection.getByRole('slider');
  readonly sliderSuccessMessage = this.sliderSection.locator('[data-task="slider"]');

  readonly endgameMessage = this.page.locator('text=You\'ve reached the highest level!');
  readonly playAgainButton = this.page.locator('button[data-play-again="true"]');

  constructor(page: Page) {
    super(page);
  }

  private async expectSuccess(input: Locator, message: Locator, text: string): Promise<void> {
  await expect(input).toBeDisabled();
  await expect(message).toContainText(text);
}
  private async verifyTheHighestLevel(): Promise<void> {
    await expect(this.endgameMessage).toBeVisible();
    await expect(this.playAgainButton).toBeVisible();
  }

  async clickIt(): Promise<void> {
    const text = await this.clickItText.textContent();
    const match = text?.match(/Click me (\d+) times/i);
    if (!match) throw new Error('Cannot parse count');
    const clicksNeeded = match ? Number(match[1]) : null;

    for (let i = 0; i < clicksNeeded; i++) {
      await this.clickItButton.click();
    }
    await this.expectSuccess(this.clickItButton, this.clickerSuccessMessage, 'Great job! You levelled up');
  }
  async uploadIt(filePath: string): Promise<void> {
    await this.fileInput.setInputFiles(filePath);
    await this.expectSuccess(this.fileInput, this.uploaderSuccessMessage, 'File selected, level up!');
  }

  async typeIt(): Promise<void> {
    const instruction = await this.typeItInstruction.textContent();
    const match = instruction.match(/Type (.+) to level up/i);
    if (!match) throw new Error('Cannot parse text');

    const textToType = match[1];
    await this.typeItInputField.fill(textToType);

    await this.expectSuccess(this.typeItInputField, this.typerSuccessMessage, 'Dolar sit amet!');
  }

  async slideIt(): Promise<void> {
    const box = await this.handle.boundingBox();
    if (!box) throw new Error('Slider handle not found');
    const startX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;

    await this.page.mouse.move(startX, centerY);
    await this.page.mouse.down();
    await this.page.mouse.move(startX + 500, centerY, { steps: 10 });
    await this.page.mouse.up();

    await this.expectSuccess(this.handle, this.sliderSuccessMessage, 'Slid to the next level!');

    await this.verifyTheHighestLevel();
  }
}
