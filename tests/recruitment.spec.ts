import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from '../src/pages/loginPage';
import { DashboardPage } from '../src/pages/dashboardPage';
import { RecruitmentPage } from '../src/pages/recruitmentPage';
import { faker } from '@faker-js/faker';
import path from 'path';

dotenv.config();

const userLogin = process.env.LOGIN_USERNAME;
const userPassword = process.env.LOGIN_PASSWORD;

const candidateData = {
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    contactNumber: faker.phone.number({style: 'international'}),
    keywords: Array.from({length: 3}, () => faker.word.noun()).join(', '),
    notes: 'Candidate added via automated test'
};

test.describe('Recruitment Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.login(userLogin!, userPassword!);
        
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.navigateToRecruitment();
        
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
    });

    test('Test Case 2: Create a new candidate successfully', async ({ page }) => {
        const recruitmentPage = new RecruitmentPage(page);

        await recruitmentPage.clickAddCandidate();
        await recruitmentPage.fillCandidateForm(candidateData);
        await recruitmentPage.saveCandidate();

        await page.waitForLoadState('networkidle');
        
        const candidateNameElement = page.locator('xpath=/html/body/div/div[1]/div[2]/div[2]/div[1]/form/div[1]/div[1]/div/div[2]/p');
        await expect(candidateNameElement).toBeVisible({ timeout: 10000 });
        
        const displayedName = await candidateNameElement.textContent();
        expect(displayedName).toContain(candidateData.firstName);
    });

    test('Test Case 3: Edit existing candidate successfully', async ({ page }) => {
        const recruitmentPage = new RecruitmentPage(page);

        await recruitmentPage.clickAddCandidate();
        await recruitmentPage.fillCandidateForm(candidateData);
        await recruitmentPage.saveCandidate();
        
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        
        await page.locator('xpath=/html/body/div/div[1]/div[1]/aside/nav/div[2]/ul/li[5]/a').click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);

        const searchName = `${candidateData.firstName} ${candidateData.middleName}`;
        await recruitmentPage.searchCandidate(searchName);
        await recruitmentPage.viewFirstCandidate();
        await recruitmentPage.enableEditMode();
        await page.waitForTimeout(1000);

        const updatedEmail = `updated.${candidateData.email}`;
        const updatedNotes = 'Profile updated via automated test';
        
        await recruitmentPage.fillCandidateForm({
            firstName: candidateData.firstName,
            middleName: candidateData.middleName,
            lastName: candidateData.lastName,
            email: updatedEmail,
            contactNumber: candidateData.contactNumber,
            notes: updatedNotes
        });

        await recruitmentPage.saveCandidate();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        
        const confirmMessage = page.getByRole('button', { name: 'Yes, Confirm' })
        await confirmMessage.click();

        const successToast = page.locator('.oxd-toast--success');
        await expect(successToast).toBeVisible({ timeout: 10000 });
    });

    test('Additional Test: Create candidate with resume attachment', async ({ page }) => {
        const recruitmentPage = new RecruitmentPage(page);
        const resumePath = path.join(__dirname, '../src/fixtures/sample-resume.txt');

        await recruitmentPage.clickAddCandidate();
        
        await recruitmentPage.fillCandidateForm({
            ...candidateData,
            email: `candidate.resume${Date.now()}@example.com`,
            resumePath: resumePath
        });

        await recruitmentPage.saveCandidate();
        await page.waitForLoadState('networkidle');
        
        const candidateNameElement = page.locator('xpath=/html/body/div/div[1]/div[2]/div[2]/div[1]/form/div[1]/div[1]/div/div[2]/p');
        await expect(candidateNameElement).toBeVisible({ timeout: 10000 });
    });

    test('Additional Test: Verify required fields validation', async ({ page }) => {
        const recruitmentPage = new RecruitmentPage(page);
        
        await recruitmentPage.clickAddCandidate();
        await page.locator('button[type="submit"]').click();
        await page.waitForTimeout(1000);

        const requiredMessages = page.locator('.oxd-input-field-error-message');
        const errorCount = await requiredMessages.count();
        
        expect(errorCount).toBeGreaterThan(0);
        await expect(requiredMessages.first()).toBeVisible();
    });
});