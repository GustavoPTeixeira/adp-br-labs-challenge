import { Page, Locator } from '@playwright/test';

export class RecruitmentPage {
    private page: Page;
    private addCandidateButton: Locator;
    private firstNameInput: Locator;
    private middleNameInput: Locator;
    private lastNameInput: Locator;
    private vacancySelect: Locator;
    private emailInput: Locator;
    private contactNumberInput: Locator;
    private attachResumeInput: Locator;
    private keywordsInput: Locator;
    private dateOfApplicationInput: Locator;
    private notesInput: Locator;
    private saveButton: Locator;
    private searchCandidateInput: Locator;
    private searchCandidateButton: Locator;
    private viewCandidateButton: Locator;
    private candidateName: Locator;
    private editSwitch: Locator;
    private successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addCandidateButton = page.locator('button:has-text("Add")');
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.middleNameInput = page.getByPlaceholder('Middle Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.vacancySelect = page.locator('.oxd-select-text-input').first();
        this.emailInput = page.locator('(//input[@placeholder="Type here"])[1]');
        this.contactNumberInput = page.locator('(//input[@placeholder="Type here"])[2]');
        this.attachResumeInput = page.locator('input[type="file"]');
        this.keywordsInput = page.getByPlaceholder('Enter comma seperated words...');
        this.dateOfApplicationInput = page.getByPlaceholder('yyyy-dd-mm');
        this.notesInput = page.locator('.oxd-textarea--resize-vertical');
        this.saveButton = page.locator('button[type="submit"]');
        this.searchCandidateInput = page.getByPlaceholder('Type for hints...').first();
        this.searchCandidateButton = page.locator('button[type="submit"]');
        this.viewCandidateButton = page.locator('.bi-eye-fill').first();
        this.candidateName = page.locator('.orangehrm-edit-employee-name h6');
        this.editSwitch = page.locator('.oxd-switch-input');
        this.successMessage = page.locator('.oxd-toast--success');
    }

    async clickAddCandidate() {
        await this.addCandidateButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async fillCandidateForm(candidateData: {
        firstName: string;
        middleName?: string;
        lastName: string;
        email: string;
        contactNumber?: string;
        keywords?: string;
        notes?: string;
        resumePath?: string;
    }) {
        await this.firstNameInput.fill(candidateData.firstName);
        if (candidateData.middleName) {
            await this.middleNameInput.fill(candidateData.middleName);
        }
        await this.lastNameInput.fill(candidateData.lastName);
        await this.vacancySelect.click();
        await this.page.locator('.oxd-select-dropdown').locator('span').first().click();
        await this.emailInput.fill(candidateData.email);
        if (candidateData.contactNumber) {
            await this.contactNumberInput.fill(candidateData.contactNumber);
        }
        if (candidateData.resumePath) {
            await this.attachResumeInput.setInputFiles(candidateData.resumePath);
        }
        if (candidateData.keywords) {
            await this.keywordsInput.fill(candidateData.keywords);
        }
        if (candidateData.notes) {
            await this.notesInput.fill(candidateData.notes);
        }
    }

    async saveCandidate() {
        await this.saveButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async searchCandidate(candidateName: string) {
        await this.searchCandidateInput.fill(candidateName);
        await this.page.waitForTimeout(1000); // Aguardar sugestões
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.searchCandidateButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async viewFirstCandidate() {
        await this.viewCandidateButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async enableEditMode() {
        await this.editSwitch.click();
        await this.page.waitForTimeout(500);
    }

    async getCandidateName(): Promise<string> {
        return await this.candidateName.textContent() || '';
    }

    async isSuccessMessageVisible(): Promise<boolean> {
        return await this.successMessage.isVisible();
    }

    async getEmailValue(): Promise<string> {
        return await this.emailInput.inputValue();
    }
}