const { expect } = require('@playwright/test');
class DashboardPage {
    constructor(page) {
        this.page = page;
        this.dashboardHeader = page.locator('text=Dashboard');
        this.expenseMenu = page.locator('text=Expense');
        this.expenseRequestOption = page.locator('text=Expense Request');
        this.approvalOption = page.locator('text=Approval');

        this.pendingCount = page.locator('text=Pending').locator('xpath=.. >> .card-value');  
        this.approvedCount = page.locator('text=Approved').locator('xpath=.. >> .card-value');
        this.toBeRevisedCount = page.locator('text=To be Revised').locator('xpath=.. >> .card-value');
        this.rejectedCount = page.locator('text=Rejected').locator('xpath=.. >> .card-value');
        this.currentBalance = page.locator('text=Current Balance').locator('xpath=.. >> .card-value');
    }

    async verifyDashboardPage() {
        await expect(this.dashboardHeader).toBeVisible();
    }

    async navigateToExpenseRequest() {
        await this.expenseMenu.hover();
        await this.expenseRequestOption.click();
    }

    async navigateToApproval() {
        await this.expenseMenu.hover();
        await this.approvalOption.click();
    }

    async getDashboardStats() {
        return {
            pending: await this.pendingCount.textContent(),
            approved: await this.approvedCount.textContent(),
            toBeRevised: await this.toBeRevisedCount.textContent(),
            rejected: await this.rejectedCount.textContent(),
            currentBalance: await this.currentBalance.textContent(),
        };
    }
}

module.exports = { DashboardPage };
