// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('logo displays NEON text', async ({ page }) => {
        const logo = page.locator('.nav-logo');
        await expect(logo).toContainText('NEON');
        await expect(logo).toContainText('.DEV');
    });

    test('all nav links are visible', async ({ page }) => {
        const links = page.locator('.nav-link:not(.ai-btn)');
        await expect(links).toHaveCount(5);
    });

    test('nav becomes scrolled on scroll', async ({ page }) => {
        const nav = page.locator('nav');
        await expect(nav).not.toHaveClass(/scrolled/);
        await page.evaluate(() => window.scrollTo(0, 200));
        await page.waitForTimeout(500);
        await expect(nav).toHaveClass(/scrolled/);
    });

    test('clicking nav link scrolls to section', async ({ page }) => {
        await page.click('a[href="#projects"]');
        await page.waitForTimeout(1000);
        const projects = page.locator('#projects');
        await expect(projects).toBeInViewport();
    });

    test('AI toggle button opens chat', async ({ page }) => {
        await page.click('#ai-toggle');
        const chatbot = page.locator('#ai-chatbot');
        await expect(chatbot).not.toHaveClass(/hidden/);
    });
});
