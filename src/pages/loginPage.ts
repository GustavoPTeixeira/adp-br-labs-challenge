import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private userButton: Locator;
    private logoutButton: Locator;

    constructor(page: Page) {
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.locator('.orangehrm-login-button');
        this.userButton = page.locator('.oxd-userdropdown-tab');
        this.logoutButton = page.getByText('Logout');
    }

    async login(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async logout(){
        await this.userButton.click();
        await this.logoutButton.click();
    }
}