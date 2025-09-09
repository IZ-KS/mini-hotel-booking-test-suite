import {test as base, expect, request, Page} from '@playwright/test';
import { BASE_URL } from './constants';

type Fixtures = {
    adminPage: Page; //UI login
    authToken: string; // API login
};

export const test = base.extend<Fixtures>({
    adminPage: async ({ page }, use) => {

        //Navigate to base URL
        await page.goto(BASE_URL);

        //Login Flow
        // Go to Admin Panel link at top right
        await page.getByRole('link', { name: 'Admin', exact: true }).click();

        //Enter valid login
        await page.getByLabel('Username').fill('admin');
        await page.getByLabel('Password').fill('password');
        await page.getByRole('button', { name: 'Login' }).click();

        // Verify login worked
        await expect(page.getByRole('link', { name: 'Rooms' })).toBeVisible();

        // Expose this logged-in page as "adminPage"
        await use(page);
    },

      // ✅ API login fixture
    authToken: async ({}, use) => {
    const requestContext = await request.newContext();
    const authResponse = await requestContext.post(
      'https://restful-booker.herokuapp.com/auth',
      {
        data: { username: 'admin', password: 'password123' },
      }
    );
    const { token } = await authResponse.json();
    await use(token);
  },
})



export { expect };

// ✅ Tell TS that this `test` includes our fixtures
export type { Fixtures };