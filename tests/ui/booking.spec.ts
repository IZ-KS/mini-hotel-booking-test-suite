import { BASE_URL } from '../../utils/constants';
import { test, expect, Fixtures } from '../../utils/fixtures'; // import the custom test


test.describe('UI - Booking Tests', () => { 

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });
    test('Create Booking on date itself', async ({ page }) => {
      await page.getByRole('button', { name: 'Check Availability' }).click();

      await page.locator('div').filter({ hasText: /^£150 per nightBook now$/ }).getByRole('link').click();

      await page.locator('id=doReservation').click();

      await page.getByRole('textbox', { name: 'Firstname' }).fill('Isaac');
      await page.getByRole('textbox', { name: 'Lastname' }).fill('Lim');
      await page.getByRole('textbox', { name: 'Email' }).fill('abc@gmail.com');
      await page.getByRole('textbox', { name: 'Phone' }).fill('+601912345678');

      await page.getByRole('button', { name: 'Reserve Now' }).click();


      const returnHome = page.getByRole('link', { name: 'Return home' });
      const errorHeading = page.getByRole('heading', { name: 'Application error: a client-' });
      const winner = await Promise.race([
          returnHome.waitFor({ state: 'visible', timeout: 5000 }).then(() => 'home').catch(() => null),
          errorHeading.waitFor({ state: 'visible', timeout: 5000 }).then(() => 'error').catch(() => null)
  ]);

  // The "if else statement" is to handle the server stability outcome after booking the room
      if (winner === 'home') {
        console.log('Return home link is visible');
      } else if (winner === 'error') {
        console.log('Server error heading is visible');
      } else {
        console.log('Neither element became visible after 5s');
        throw new Error('Unexpected UI state');
      }

    });

});

