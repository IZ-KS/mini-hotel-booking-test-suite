import { test } from '../../utils/fixtures';

test('Admin can access Rooms page', async ({ adminPage }) => {
  await adminPage.getByRole('link', { name: 'Rooms' }).click();

  // Assert that the Rooms page is displayed
  await adminPage.getByRole('heading', { name: 'Rooms' }).isVisible();
});