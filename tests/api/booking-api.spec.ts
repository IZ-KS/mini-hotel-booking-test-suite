import { test, expect } from '@playwright/test';



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


  test('should get created booking by ID', async ({ request }) => {
    console.log('📌 Using bookingId:', bookingId);
    const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
    expect(response.ok()).toBeTruthy();

    const booking = await response.json();
    expect(booking.firstname).toBe('John');
    expect(booking.lastname).toBe('Doe');
  });

  test('return 404 for non-existent booking ID', async ({ request }) => {
    const invalidId = 5654;
    const response = await request.get('https://restful-booker.herokuapp.com/booking/' + invalidId);
    expect(response.status()).toBe(404);
  })

  //this t
  test('update partial booking by ID', async ({ request }) => {
    const authResponse = await request.post(`https://restful-booker.herokuapp.com/auth`, {
      data: { username: 'admin', password: 'password123' }
    });

    const {token} = await authResponse.json()
    console.log(' Using bookingId:' , bookingId)

    //Update part of the booking
    const updateResponse = await request.patch(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        headers: { 
          Cookie: `token=${token}`,
          'Content-Type' : 'application/json'
        },
        data: {
          firstname: 'Isaac',
          lastname: 'Smith',
        }
    });

    console.log('📌 Status:', updateResponse.status());
    const body = await updateResponse.json();
    console.log('📌 Booking update response body:', body);


    expect(updateResponse.ok()).toBeTruthy();
  });

  test('should retrieve all bookings and verify created booking exists', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking');
    expect(response.ok()).toBeTruthy(); 
    const bookings = await response.json();
    const bookingIds = bookings.map(b => b.bookingid);
    expect(bookingIds).toContain(bookingId);
    console.log('📌 All booking IDs:', bookingIds);
  });

});
// To run this test: npx playwright test tests/api/booking-api.spec.ts --headed --project=chromium
// To run a specific test: npx playwright test tests/api/booking-api.spec.ts --headed --project=chromium --grep "should get created booking by ID"