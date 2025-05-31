import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';

test('Character level increases after clicking', async ({ playPage }) => {
  await test.step('Get second level', async () => {
    const levelBefore = await playPage.character.getStat('Level');
    const strengthBefore = await playPage.character.getStat('Strength');
    await playPage.adventure.clickIt();
    const levelAfter = await playPage.character.getStat('Level');
    const strengthAfter = await playPage.character.getStat('Strength');

    expect(strengthAfter.value).toBeGreaterThan(strengthBefore.value);
    expect(strengthAfter.percent).toBeGreaterThan(strengthBefore.percent);

    expect(levelAfter.value).toBeGreaterThan(levelBefore.value);
    expect(levelAfter.percent).toBeGreaterThan(levelBefore.percent);
  });

  await test.step('Get third level', async () => {
    const levelBefore = await playPage.character.getStat('Level');
    await playPage.adventure.uploadIt('/Users/r.voinov/Desktop/Projects/RPG/tests/files/test.txt');
    const levelAfter = await playPage.character.getStat('Level');

    expect(levelAfter.value).toBeGreaterThan(levelBefore.value);
    expect(levelAfter.percent).toBeGreaterThan(levelBefore.percent);
  });

  await test.step('Get fourth level', async () => {
    const levelBefore = await playPage.character.getStat('Level');
    await playPage.adventure.typeIt();
    const levelAfter = await playPage.character.getStat('Level');

    expect(levelAfter.value).toBeGreaterThan(levelBefore.value);
    expect(levelAfter.percent).toBeGreaterThan(levelBefore.percent);
  });

  await test.step('Get fifth level', async () => {
    const levelBefore = await playPage.character.getStat('Level');
    await playPage.adventure.slideIt();
    const levelAfter = await playPage.character.getStat('Level');

    expect(levelAfter.value).toBeGreaterThan(levelBefore.value);
    expect(levelAfter.percent).toBeGreaterThan(levelBefore.percent);
  });
});
