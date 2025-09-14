import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 5,           // number of virtual users
  duration: '10s',  // how long to run
};

export default function () {
  let res = http.get('https://automationintesting.online/');
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'page has Rooms text': (r) => r.body.includes('Rooms'),
  });

  sleep(1); // wait 1 second between requests
}
