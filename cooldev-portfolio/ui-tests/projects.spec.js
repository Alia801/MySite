// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Projects Section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => document.querySelector('#projects').scrollIntoView());
        await page.waitForTimeout(800);
    });

    test('projects section title displays', async ({ page }) => {
        const title = page.locator('#projects .section-title');
        await expect(title).toContainText('Projects');
        await expect(title).toContainText('03.');
    });

    test('displays 4 project cards', async ({ page }) => {
        const cards = page.locator('.project-card');
        await expect(cards).toHaveCount(4);
    });

    test('project cards have titles', async ({ page }) => {
        await expect(page.locator('.project-card').nth(0)).toContainText('AI Chat Platform');
        await expect(page.locator('.project-card').nth(1)).toContainText('Neon Social');
        await expect(page.locator('.project-card').nth(2)).toContainText('CodeForge IDE');
        await expect(page.locator('.project-card').nth(3)).toContainText('CyberShop');
    });

    test('project cards have tech tags', async ({ page }) => {
        const tags = page.locator('.project-tech span');
        const count = await tags.count();
        expect(count).toBeGreaterThan(8);
    });

    test('project images have gradients', async ({ page }) => {
        const image = page.locator('.project-image').first();
        const bg = await image.evaluate(el => window.getComputedStyle(el).backgroundImage);
        expect(bg).toContain('linear-gradient');
    });

    test('project cards have hover effect', async ({ page }) => {
        const card = page.locator('.project-card').first();
        await card.hover();
        await page.waitForTimeout(300);
        const transform = await card.evaluate(el => window.getComputedStyle(el).transform);
        expect(transform).not.toBe('none');
    });
});
