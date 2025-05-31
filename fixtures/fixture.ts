import { PlayPage } from '../pages/PlayPage';
import { test as base } from '@playwright/test';

type TextFixture = {
  playPage: PlayPage;
};

export const test = base.extend<TextFixture>({
  playPage: async ({ page }, use) => {
    const playPage = new PlayPage(page);
    await playPage.navigate();
    await playPage.login('user@email.com');
    await playPage.selectCharacter('Knight');
    await playPage.start();
    await use(playPage);
  },
});
