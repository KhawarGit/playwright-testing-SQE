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

test('Verifying all options of rock paper scissor', async({page})=> {
  await page.goto('http://localhost/web%20Applications%20with%20PHP/finalModule_Course1/game.php?name=Khan');

  //selecting option.
  await page.getByRole('combobox').selectOption('test');
  //clicking the Play button
  await page.getByRole('button', { name: 'Play' }).click();

  await expect(page.getByText('Human=rock Computer=rock')).toHaveText(`    
  Human=rock   Computer=rock   Result=Tie
  Human=rock   Computer=paper   Result=You lose
  Human=rock   Computer=scissor   Result=You win
  Human=paper   Computer=rock   Result=You win
  Human=paper   Computer=paper   Result=Tie
  Human=paper   Computer=scissor   Result=You lose
  Human=scissor   Computer=rock   Result=You lose
  Human=scissor   Computer=paper   Result=You win
  Human=scissor   Computer=scissor   Result=Tie`);

});

test('Verify logout', async({page}) => {
  await page.goto('http://localhost/web%20Applications%20with%20PHP/finalModule_Course1/game.php?name=Khan');

  //helps in getting locators of variables.
  // await page.pause();
  //click on logout button.
  await page.getByRole('button', { name: 'Logout' }).click();

  // wait for this URL
  await page.waitForURL('http://localhost/web%20Applications%20with%20PHP/finalModule_Course1/Logout.php');

  //check the if the login page is opened.
  await expect(page.getByRole('heading', { name: 'Please Log In' })).toHaveText('Please Log In');
  await expect(page.locator('input[name="who"]')).toHaveText('');
  await expect(page.locator('input[name="pass"]')).toHaveText('');


});

test('Verify Login -  Cancel Button Function', async({page})=>{
  await page.goto('http://localhost/web%20Applications%20with%20PHP/finalModule_Course1/login.php');

  //set username
  await page.fill('input[name="who"]', 'Jack');
  //set password field, inalid password
  await page.fill('input[name="pass"]', 'php123');
 //await page.pause();
  //clicking Cancel button
  await page.getByRole('button', { name: 'Cancel' }).click();
  //now wait for URL to navigate
  await page.waitForURL('http://localhost/web%20Applications%20with%20PHP/finalModule_Course1/cancelLogin.php');

  //now check that the fields are now empty again
  await expect(page.locator('input[name="who"]')).toHaveText('');
  await expect(page.locator('input[name="pass"]')).toHaveText('');

});