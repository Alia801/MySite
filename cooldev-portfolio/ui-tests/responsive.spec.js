// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Responsive Design', () => {
    test('mobile: hamburger menu visible', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        const hamburger = page.locator('.hamburger');
        await expect(hamburger).toBeVisible();
    });

    test('mobile: nav links hidden by default', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        const navLinks = page.locator('.nav-links');
        await expect(navLinks).not.toBeVisible();
    });

    test('mobile: hamburger opens menu', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await page.click('.hamburger');
        await expect(page.locator('.nav-links')).toHaveClass(/open/);
    });

    test('mobile: hero section stacks vertically', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        const hero = page.locator('#hero');
        const direction = await hero.evaluate(el => window.getComputedStyle(el).flexDirection);
        expect(direction).toBe('column');
    });

    test('mobile: skills grid is single column', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await page.evaluate(() => document.querySelector('#skills').scrollIntoView());
        await page.waitForTimeout(500);
        const grid = page.locator('.skills-grid');
        const columns = await grid.evaluate(el => window.getComputedStyle(el).gridTemplateColumns);
        expect(columns.split(' ').length).toBe(1);
    });

    test('mobile: projects grid is single column', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await page.evaluate(() => document.querySelector('#projects').scrollIntoView());
        await page.waitForTimeout(500);
        const grid = page.locator('.projects-grid');
        const columns = await grid.evaluate(el => window.getComputedStyle(el).gridTemplateColumns);
        expect(columns.split(' ').length).toBe(1);
    });

    test('mobile: chatbot takes full width', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await page.click('#chatbot-toggle');
        const chatbot = page.locator('#ai-chatbot');
        const width = await chatbot.evaluate(el => el.offsetWidth);
        expect(width).toBeGreaterThan(300);
    });

    test('tablet: layout adjusts', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('/');
        const aboutGrid = page.locator('.about-grid');
        const columns = await aboutGrid.evaluate(el => window.getComputedStyle(el).gridTemplateColumns);
        expect(columns.split(' ').length).toBe(1);
    });

    test('desktop: all sections visible', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('/');
        await expect(page.locator('#hero')).toBeVisible();
        await expect(page.locator('.nav-links')).toBeVisible();
    });
});
