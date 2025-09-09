import { test, expect } from '../../utils/fixtures'; // import the custom test

test.describe('API - Booking Tests', () => {
  let bookingId: number;

  test.beforeAll(async ({ request }) => {
    console.log('📌 Running beforeAll...');
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
      data: {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 120,
        depositpaid: true,
        bookingdates: {
          checkin: '2025-01-01',
          checkout: '2025-01-05'
        },
        additionalneeds: 'Breakfast'
      }
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    bookingId = body.bookingid;
    console.log('📌 Booking created with ID:', bookingId);
    console.log('📌 Booking creation response body:', body);
  });

  test('Get bookings with auth', async ({ request, authToken }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking', {
      headers: { Cookie: `token=${authToken}` },
    });
    expect(response.ok()).toBeTruthy();
  });

  test('should update booking by ID', async ({ request, authToken }) => {
    const updateResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
      headers: { Cookie: `token=${authToken}` },
      data: {
        firstname: 'Jane',
        lastname: 'Smith',
        totalprice: 150,
        depositpaid: false,
        bookingdates: {
          checkin: '2025-02-01',
          checkout: '2025-02-10'
        },
        additionalneeds: 'Late Checkout'
      }
    });

    expect(updateResponse.ok()).toBeTruthy();
  });


    test('should delete booking by ID', async ({ request,authToken }) => {
    const deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
      headers: { Cookie: `token=${authToken}` }
    });

    expect(deleteResponse.ok()).toBeTruthy();
    console.log('📌 Booking deleted with ID:', bookingId);
  });
});