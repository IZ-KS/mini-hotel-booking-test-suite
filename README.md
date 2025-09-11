📌Overview

This project is a Playwright-based automation test suite for the Hotel Booking Demo Application
.
It covers both UI and API testing, with integration into GitHub Actions CI/CD for continuous testing.

Features

UI test coverage for:Admin login

Room creation & deletion

Booking form validation



✅ API test coverage for:

Authentication

Booking CRUD operations



✅ CI/CD:

GitHub Actions pipeline runs tests on every push/pull request

Test reports automatically uploaded as artifacts

Tech Stack

Playwright
 – End-to-end browser automation

TypeScript
 – Strongly typed JavaScript

[Jest/Playwright Test Runner] – Test framework

GitHub Actions
 – CI/CD pipeline

Getting started

1. git clone https://github.com/<your-username>/mini-hotel-booking-test-suite.git
cd mini-hotel-booking-test-suite

2.npm install

3.npx playwright test

🤖 CI/CD with GitHub Actions

Every push or pull request to main triggers:

Install dependencies

Install Playwright browsers

Run all tests

Upload test report as an artifact

📈 Future Improvements

Add more booking flow tests (end-to-end: search → book → cancel).

Integrate Jenkins as an alternative CI/CD pipeline.

Add environment config for staging vs production.

👤 Author

Isaac Lim – QA Engineer passionate about UI, API, and CI/CD automation.
