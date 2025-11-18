import { Page, Locator } from '@playwright/test';

export class DashboardPage {
    private dashboardHeader: Locator;
    private recruitmentLink: Locator;
    
    constructor(page: Page) {
        this.dashboardHeader = page.locator('.oxd-topbar-header-breadcrumb-module');
        this.recruitmentLink = page.getByText('Recruitment');
    }

    async navigateToRecruitment(){
        await this.dashboardHeader.isVisible();
        await this.recruitmentLink.click();
    }
}