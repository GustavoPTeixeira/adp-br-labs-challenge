import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from '../src/pages/loginPage';
dotenv.config();

const userLogin = process.env.LOGIN_USERNAME;
const userPassword = process.env.LOGIN_PASSWORD;

test.describe('Login Page Tests', ()=>{
    test.beforeEach(async ({ page }) =>{
        await page.goto('/');
    })

    test('Successful login with valid credentials', async ({ page }) =>{
        const loginPage = new LoginPage(page);
        await loginPage.login(userLogin!, userPassword!)
        await expect(page).toHaveURL(/.*dashboard/);
        await expect(page.getByText('Dashboard')).toBeVisible();
    })

    test('Unsuccessful login with invalid credentials', async ({ page }) =>{
        const loginPage = new LoginPage(page);
        await loginPage.login('invalidUser', 'invalidPass')
        await expect(page.getByText('Invalid credentials')).toBeVisible();
    })

    test('Logout after successful login', async ({ page }) =>{
        const loginPage = new LoginPage(page);
        await loginPage.login(userLogin!, userPassword!)
        await expect(page).toHaveURL(/.*dashboard/);
        await loginPage.logout();
        await expect(page).toHaveURL(/.*login/);
    })
})