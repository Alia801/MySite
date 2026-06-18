// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Contact Section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => document.querySelector('#contact').scrollIntoView());
        await page.waitForTimeout(800);
    });

    test('contact section title displays', async ({ page }) => {
        const title = page.locator('#contact .section-title');
        await expect(title).toContainText('Contact');
        await expect(title).toContainText('04.');
    });

    test('contact form has all fields', async ({ page }) => {
        await expect(page.locator('#name')).toBeVisible();
        await expect(page.locator('#email')).toBeVisible();
        await expect(page.locator('#message')).toBeVisible();
    });

    test('form fields have floating labels', async ({ page }) => {
        const nameLabel = page.locator('label[for="name"]');
        await expect(nameLabel).toContainText('Your Name');
    });

    test('submit button is visible', async ({ page }) => {
        const btn = page.locator('#contactForm button[type="submit"]');
        await expect(btn).toBeVisible();
        await expect(btn).toContainText('Send Message');
    });

    test('form validates required fields', async ({ page }) => {
        const btn = page.locator('#contactForm button[type="submit"]');
        await btn.click();
        const nameInput = page.locator('#name');
        const isValid = await nameInput.evaluate(el => el.validity.valid);
        expect(isValid).toBe(false);
    });

    test('form submission shows success state', async ({ page }) => {
        await page.fill('#name', 'Test User');
        await page.fill('#email', 'test@example.com');
        await page.fill('#message', 'Hello!');
        await page.click('#contactForm button[type="submit"]');
        await page.waitForTimeout(500);
        const btn = page.locator('#contactForm button[type="submit"]');
        await expect(btn).toContainText('Sent');
    });

    test('contact info displays location', async ({ page }) => {
        const item = page.locator('.contact-item').first();
        await expect(item).toContainText('Moscow');
    });

    test('social links are present', async ({ page }) => {
        const links = page.locator('.social-link');
        await expect(links).toHaveCount(3);
    });
});
