// @ts-check
const { test, expect, chromium } = require('@playwright/test');

test('check login - Invalid Password - gives error', async ( {page} ) => {
  await page.goto('http://localhost/web%20Applications%20with%20PHP/finalModule_Course1/login.php');

  //set username
  await page.fill('input[name="who"]', 'Jack');
  //set password field, inalid password
  await page.fill('input[name="pass"]', 'pass123'); //wrong password

  // Now click the login button
  await page.click('button[value="LogIn"]');
  //wait for navigation
  await page.waitForSelector('text=Log In', {timeout: 5000});
  
  await expect(page.locator('p[style="color: red;"]')).toHaveText(
    "Incorrect Password."
  );
});

test('check login - without username - gives error', async ( {page} ) => {
  await page.goto('http://localhost/web%20Applications%20with%20PHP/finalModule_Course1/login.php');
  //Not providing any username and password.

  // Now click the login button
  await page.click('button[value="LogIn"]');
  //wait for navigation
  await page.waitForSelector('text=Log In', {timeout: 5000});
  
  await expect(page.locator('p[style="color: red;"]')).toHaveText(
    "User Name and Password are required."
  );
});
 
test('check login - with valid username and password', async({ page }) => {
  await page.goto('http://localhost/web%20Applications%20with%20PHP/finalModule_Course1/Login.php');

  //set username
  await page.fill('input[name="who"]', 'Khan');
  //set password field, inalid password
  await page.fill('input[name="pass"]', 'php123'); //correct password
  // Now click the login button
  await page.click('button[value="LogIn"]');
  //wait for navigation
  await page.waitForURL('http://localhost/web%20Applications%20with%20PHP/finalModule_Course1/game.php?name=Khan');

  await expect(page.getByRole('heading', { name: 'Rock Paper Scissors' })).toHaveText("Rock Paper Scissors");
});

test('after login - shows correct username', async({page}) => {
  await page.goto('http://localhost/web%20Applications%20with%20PHP/finalModule_Course1/game.php?name=Khan');

  await expect(page.getByText('Welcome : Khan')).toHaveText('Welcome : Khan');
});

