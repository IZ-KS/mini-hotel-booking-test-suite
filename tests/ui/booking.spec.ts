import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../utils/constants';


test.describe('UI - Booking Tests', () => { 

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });
    test('Create Booking on date itself', async ({ page }) => {


    });



});

