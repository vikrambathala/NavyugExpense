class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginIDInput = page.locator('input[placeholder="Please enter your Login ID"]');
        this.passwordInput = page.locator('input[placeholder="Enter your password"]');
        this.loginButton = page.locator('button:has-text("Login")');
    }

    async goto() {
        await this.page.goto('https://dev-navyugexpense.maxpro.cloud/account/login');
    }

    async login(username, password) {
        await this.loginIDInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

module.exports = { LoginPage };
