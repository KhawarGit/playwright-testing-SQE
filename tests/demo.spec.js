import {test, expect} from '@playwright/test';

test('first test', async({page}) => {
    await page.goto('http://localhost/web%20Applications%20with%20PHP/finalModule_Course1/Login.php');

    await page.pause();
})