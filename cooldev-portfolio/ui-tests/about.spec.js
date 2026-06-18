// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('About Section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => document.querySelector('#about').scrollIntoView());
        await page.waitForTimeout(800);
    });

    test('about section title displays', async ({ page }) => {
        const title = page.locator('#about .section-title');
        await expect(title).toContainText('About Me');
        await expect(title).toContainText('01.');
    });

    test('about text is visible', async ({ page }) => {
        const text = page.locator('.about-text p').first();
        await expect(text).toBeVisible();
    });

    test('stats are displayed', async ({ page }) => {
        const stats = page.locator('.stat-item');
        await expect(stats).toHaveCount(3);
    });

    test('stat numbers animate on scroll', async ({ page }) => {
        await page.evaluate(() => document.querySelector('#about').scrollIntoView());
        await page.waitForTimeout(2000);
        const firstStat = page.locator('.stat-number').first();
        const value = await firstStat.textContent();
        expect(parseInt(value)).toBeGreaterThan(0);
    });

    test('code block is visible', async ({ page }) => {
        const codeBlock = page.locator('.code-block');
        await expect(codeBlock).toBeVisible();
    });

    test('code block has syntax highlighting', async ({ page }) => {
        const keywords = page.locator('.code-block .kw');
        await expect(keywords.first()).toBeVisible();
    });
});
