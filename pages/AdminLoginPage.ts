import { Page, expect } from '@playwright/test';

export class AdminLoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(baseUrl: string) {
    await this.page.goto(baseUrl);
  }

  async login(username: string, password: string) {
    //Go to Admin Panel link
    await this.page.getByRole('link', { name: 'Admin', exact: true }).click();

    //Fill login form
    await this.page.getByLabel('Username').fill('admin');
    await this.page.getByLabel('Password').fill('password');
    await this.page.getByRole('button', { name: 'Login' }).click();

    //Verify login worked
    await expect(this.page.getByRole('link', { name: 'Rooms' })).toBeVisible();
  }
}