import { test, expect } from '@playwright/test';

test('SajiloCare homepage loads', async ({ page }) => {

  // Step 1: Open the browser and go to SajiloCare
  await page.goto('https://sajilocare.com.np');

  // Step 2: Check that the page title contains the word "Sajilo"
  await expect(page).toHaveTitle(/Sajilo/);

  // Step 3: Print a happy message in the terminal
  console.log('Homepage loaded successfully!');

});


test('clicking login opens the login page', async ({ page }) => {

  // Step 1: Open SajiloCare homepage
  await page.goto('https://sajilocare.com.np');

  // Step 2: Find the Login link and click it
  await page.getByRole('link', { name: 'Login' }).click();

  // Step 3: Wait for the login page to load
  await page.waitForLoadState('domcontentloaded');

  // Step 4: Check that the URL now contains "/login"
  await expect(page).toHaveURL(/login/);

  console.log('Login page opened successfully!');

});


test('user can login with valid credentials', async ({ page }) => {

  // Go directly to the login page
  await page.goto('https://sajilocare.com.np/login');

  // Type the email into the email input box
  await page.fill('#email', 'testuser@gmail.com');

  // Type the password into the password box
  await page.fill('#password', 'test1234');

  // Click the Sign In button
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Wait for the page to fully finish loading
  await page.waitForLoadState('networkidle');

  // Check that the URL changed to the homepage after login
  await expect(page).toHaveURL('https://sajilocare.com.np/');

  // Check that the user profile button is visible — confirms login worked
await expect(page.getByRole('button', { name: 'User profile menu' })).toBeVisible();

  console.log('Login test passed!');

});


test('login with invalid credentials shows error', async ({ page }) => {

  // Go directly to the login page
  await page.goto('https://sajilocare.com.np/login');

  // Type a wrong email
  await page.fill('#email', 'wronguser@gmail.com');

  // Type a wrong password
  await page.fill('#password', 'wrongpassword');

  // Click Sign In
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Check that an error popup/message appears
  await expect(page.getByText(/invalid/i)).toBeVisible({ timeout: 10000 });

  console.log('Invalid login test passed!');

});

test('search returns relevant products', async ({ page }) => {

  // Go to homepage
  await page.goto('https://sajilocare.com.np');

  // Find the search bar and type a keyword
  await page.getByRole('searchbox').fill('cereal');

  // Press Enter to search
  await page.keyboard.press('Enter');

  // Wait for results to load
  await page.waitForLoadState('networkidle');

  // Check that at least one product result is visible
  await expect(page.getByText(/cereal/i).first()).toBeVisible();

  console.log('Search test passed!');

});


test('contact form submits successfully', async ({ page }) => {

  // Go to the contact page
  await page.goto('https://sajilocare.com.np/contact');

  // Fill in each field using their IDs
  await page.fill('#fullName', 'Test User');
  await page.fill('#email', 'testuser@gmail.com');
  await page.fill('#phone', '9800000000');

  // Select an option from the subject dropdown
  await page.selectOption('#subject', 'General Inquiry');

  // Fill in the message textarea
  await page.fill('#message', 'This is an automated test message.');

  // Click the Send Message button
  await page.getByRole('button', { name: /send/i }).click();

  // Check that a success message appears
 await expect(page.getByText(/success/i).first()).toBeVisible({ timeout: 10000 });

  console.log('Contact form test passed!');

});