import {test as base, expect, request, Page} from '@playwright/test';
import { BASE_URL } from './constants';
import { AdminLoginPage } from '../pages/AdminLoginPage';

type Fixtures = {
    adminPage: Page; //UI login
    authToken: string; // API login
};

export const test = base.extend<Fixtures>({
    adminPage: async ({ page }, use) => {

    const loginPage = new AdminLoginPage(page);
    await loginPage.goto(BASE_URL);
    await loginPage.login('admin', 'password');
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