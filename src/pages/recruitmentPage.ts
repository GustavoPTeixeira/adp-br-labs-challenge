import { Page, Locator } from '@playwright/test';

export class RecruitmentPage{
    private addCandidateButton: Locator;
    private fistNameInput: Locator;
    private middleNameInput: Locator;
    private lastNameInput: Locator;
    private vacancySelect: Locator;
    private emailInput: Locator;
    private contactNumberInput: Locator;
    private attachResumeInput: Locator;
    private keywrodsInput: Locator;
    private dateOfApplicationInput: Locator;
    private notesInput: Locator;
    private saveButton: Locator;
    private searchCandidateInput: Locator;
    private searchCandidateButton: Locator;
    private viewCandidateButton: Locator;
    private candidateName: Locator;
    private editSwitch: Locator;

    constructor(page: Page){
        this.addCandidateButton = page.locator('button:has-text("Add")');
        this.fistNameInput = page.getByPlaceholder('First Name');
        this.middleNameInput = page.getByPlaceholder('Middle Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.vacancySelect = page.locator('.oxd-select-text-input')
        this.emailInput = page.locator('xpath=/html/body/div/div[1]/div[2]/div[2]/div/div/form/div[3]/div/div[1]/div/div[2]/input');
        this.contactNumberInput = page.locator('xpath=/html/body/div/div[1]/div[2]/div[2]/div/div/form/div[3]/div/div[2]/div/div[2]/input')
        this.attachResumeInput = page.locator('.oxd-file-input');
        this.keywrodsInput = page.getByPlaceholder('Enter comma seperated words...');
        this.dateOfApplicationInput = page.getByPlaceholder('yyyy-dd-mm');
        this.notesInput = page.locator('.oxd-textarea--resize-vertical')
        this.saveButton = page.locator('button:has-text("Save")');
        this.searchCandidateInput = page.getByPlaceholder('Type for hints...');
        this.searchCandidateButton = page.locator('button:has-text("Search")');
        this.viewCandidateButton = page.locator('.bi-eye-fill');
        this.candidateName = page.locator('xpath=/html/body/div/div[1]/div[2]/div[2]/div/div[2]/div[3]/div/div/div/div/div/div[1]/div[1]/div/div/div[2]')
        this.editSwitch = page.locator('.oxd-switch-input');
    }
}