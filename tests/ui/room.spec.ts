//import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../utils/constants';
import { test, expect, Fixtures } from '../../utils/fixtures'; // import the custom test


test.describe('UI - Room Creating using Manual Flow)', () => { 

    async function login(page) {
    // Go to Admin Panel link at top right
    await page.getByRole('link', { name: 'Admin', exact: true }).click();

    //Enter valid login
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify login
    await expect(page.getByRole('link', { name: 'Rooms' })).toBeVisible();
    }

  test.beforeEach(async ({ page }) => {
    test.setTimeout(30000);
    await page.goto(BASE_URL);
    await login(page); // Login before each test by calling the helper function

  });

    // Use the normal method to login 
    test('Admin adding room', async ({ page }) => {

    // //Go to Rooms page
    await page.getByRole('link', { name: 'Rooms' }).click();

    //Click Add Room button and fill in details
    await page.locator('id=roomName').fill('999');
    await page.locator('id=type').selectOption('Suite');
    await page.locator('id=accessible').selectOption('false');
    await page.locator('id=roomPrice').fill('150');
    await page.locator('id=createRoom').click();

    //Verify to handle the last created room
    await page.locator('div.row.detail').last().click();

    // ✅ Verify a random detail 
        await expect(page.getByRole('button', {name : 'Edit'})).toBeVisible();

    });

});

test.describe('UI - Delete Room Test using Fixture', () => { 

    // Use the "adminPage" fixture to get a logged-in page and for the delete testing
    test('Admin deleting room', async ({ adminPage }) => {
    // ✅ No need to call login, you're already logged in
    await adminPage.getByRole('link', { name: 'Rooms' }).click();

    //Remove the last created room
    //await adminPage.getByRole('button', { name: 'Delete' }).last().click();
    await adminPage.locator('[class*="roomDelete"]').last().click();
    });
});
