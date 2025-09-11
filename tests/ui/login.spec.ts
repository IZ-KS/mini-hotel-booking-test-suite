import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../utils/constants';


test.describe('UI - Login Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('invalid login', async ({ page }) => {
    //await page.goto('https://automationintesting.online/');

    // Click "Admin panel" link at bottom of page
    await page.getByRole('link', { name: 'Admin', exact: true }).click();

    // Enter invalid login
    await page.locator('id=username').fill('wronguser');
    await page.getByLabel('Password').fill('wrongpass');
    await page.locator('xpath=//button[text()="Login"]').click();

    //await page.getByRole('button', { name: 'Login' }).click();

    // Verify error message
    await expect(page.locator('.alert')).toHaveText(/Invalid credentials/);
  });

  test('Valid Login', async ({ page }) => {

    //await page.goto('https://automationintesting.online/');

    // Go to Admin Panel link at top right
    await page.getByRole('link', { name: 'Admin', exact: true }).click();

    //Enter valid login
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify login
    await expect(page.getByRole('link', { name: 'Rooms' })).toContainText('Rooms');
    //await expect(page.getByRole('link', { name: 'Rooms' })).toBeVisible();

  })

  test('Valid Logout', async ({ page }) => {

     // Go to Admin Panel link at top right
    await page.locator('//a[text()="Admin"]').click();

    //Enter valid login
    await page.locator('id=username').fill('admin');
    await page.getByLabel('Password').fill('password');
    await page.locator('xpath=//button[text()="Login"]').click();

    // Verify login
    await expect(page.getByRole('link', { name: 'Rooms' })).toBeVisible();

    //Click logout button
    //await page.locator('//li[2]//a[text()="Logout"]').click();
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page.getByRole('link', { name: 'Shady Meadows B&B' })).toBeVisible();
  
  })


});
