// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Skills Section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => document.querySelector('#skills').scrollIntoView());
        await page.waitForTimeout(800);
    });

    test('skills section title displays', async ({ page }) => {
        const title = page.locator('#skills .section-title');
        await expect(title).toContainText('Skills');
        await expect(title).toContainText('02.');
    });

    test('displays 4 skill cards', async ({ page }) => {
        const cards = page.locator('.skill-card');
        await expect(cards).toHaveCount(4);
    });

    test('skill cards have icons', async ({ page }) => {
        const icons = page.locator('.skill-icon');
        await expect(icons).toHaveCount(4);
        await expect(icons.first()).toBeVisible();
    });

    test('skill cards have titles', async ({ page }) => {
        await expect(page.locator('.skill-card').nth(0)).toContainText('Frontend');
        await expect(page.locator('.skill-card').nth(1)).toContainText('Backend');
        await expect(page.locator('.skill-card').nth(2)).toContainText('AI');
        await expect(page.locator('.skill-card').nth(3)).toContainText('Design');
    });

    test('skill bars animate on scroll', async ({ page }) => {
        await page.evaluate(() => document.querySelector('#skills').scrollIntoView());
        await page.waitForTimeout(2000);
        const firstBar = page.locator('.skill-fill').first();
        const width = await firstBar.evaluate(el => el.style.width);
        expect(width).not.toBe('0');
    });

    test('skill cards have tilt effect', async ({ page }) => {
        const card = page.locator('.skill-card').first();
        await card.hover();
        await page.waitForTimeout(200);
        const transform = await card.evaluate(el => window.getComputedStyle(el).transform);
        expect(transform).not.toBe('none');
    });
});
