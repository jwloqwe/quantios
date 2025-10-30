import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
    test('Register then Login', async ({ page }) => {
        // Access the site and make sure that the Title of the Page is correct
        await page.goto(process.env.BASE_URL!);
        expect(page).toHaveTitle('Login Page');
    
        // Look for the link with the 'Create New User' label
        await page.getByRole('link', { name: 'Create new user' }).click();

        // Ensure that the page is present
        expect(page).toHaveURL('/register/');
        await page.waitForSelector('#registerForm');
        
        // Expect that the Button is Disabled
        const createAcc = page.getByRole('button', { name: "Create Account" });
        await expect(createAcc).toBeDisabled();
        
        // Look for the Username and Passoword then fill the credentials using env variables.
        const randomNumber = Math.floor(Math.random() * 100);
        const username = process.env.Q_USERNAME! + randomNumber +'@gmail.com';
        const password = process.env.Q_PASSWORD!;
        await page.getByLabel('Username').fill(username);
        await page.getByLabel('Password').fill(password);
        await (createAcc).click({ force: true });

        // Login Into Account
        await page.waitForSelector('#loginForm');
        const loginBtn = page.getByRole('button', { name: "Login" });
        await page.getByPlaceholder('Email Address').fill(username);
        await page.getByPlaceholder('Password').fill(password);
        await loginBtn.click({ force: true });
        
        // Verify Dashboard is Present
        await page.waitForSelector('.dashboard');
        await expect(page.locator('h1')).toHaveText('Stock Market Dashboard');
    });
});