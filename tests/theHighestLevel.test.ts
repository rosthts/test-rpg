import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';

test('Character level increases through all steps', async ({ playPage }) => {
  const checkLevelIncreases = async (
    label: string,
    action: () => Promise<void>,
    extraStat?: 'Strength' | 'Agility' | 'Wisdom' | 'Magic'
  ) => {
    await test.step(label, async () => {
      const levelBefore = await playPage.character.getStat('Level');
      const statBefore = extraStat ? await playPage.character.getStat(extraStat) : null;

      await action();

      const levelAfter = await playPage.character.getStat('Level');
      const statAfter = extraStat ? await playPage.character.getStat(extraStat) : null;

      expect(levelAfter.value).toBeGreaterThan(levelBefore.value);
      expect(levelAfter.percent).toBeGreaterThan(levelBefore.percent);

      if (statBefore && statAfter) {
        expect(statAfter.value).toBeGreaterThan(statBefore.value);
        expect(statAfter.percent).toBeGreaterThan(statBefore.percent);
      }
    });
  };

  await checkLevelIncreases('Get second level', () => playPage.adventure.clickIt(), 'Strength');
  await checkLevelIncreases('Get third level', () => playPage.adventure.uploadIt('tests/files/test.txt'));
  await checkLevelIncreases('Get fourth level', () => playPage.adventure.typeIt());
  await checkLevelIncreases('Get fifth level', () => playPage.adventure.slideIt());
});