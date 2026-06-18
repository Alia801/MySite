// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Hero Section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('hero title displays correctly', async ({ page }) => {
        const title = page.locator('.hero-title');
        await expect(title).toContainText('Creative');
        await expect(title).toContainText('Developer');
        await expect(title).toContainText('Designer');
    });

    test('hero subtitle is visible', async ({ page }) => {
        const subtitle = page.locator('.hero-subtitle');
        await expect(subtitle).toBeVisible();
    });

    test('CTA buttons are visible', async ({ page }) => {
        const viewProjects = page.locator('.btn-primary').first();
        const getInTouch = page.locator('.btn-secondary').first();
        await expect(viewProjects).toBeVisible();
        await expect(getInTouch).toBeVisible();
    });

    test('View Projects button navigates to projects', async ({ page }) => {
        await page.click('.hero-cta .btn-primary');
        await page.waitForTimeout(1000);
        const projects = page.locator('#projects');
        await expect(projects).toBeInViewport();
    });

    test('orbit system is present', async ({ page }) => {
        const orbitSystem = page.locator('.orbit-system');
        await expect(orbitSystem).toBeVisible();
    });

    test('core sphere exists', async ({ page }) => {
        const core = page.locator('.core-sphere');
        await expect(core).toBeVisible();
    });

    test('particles canvas is present', async ({ page }) => {
        const canvas = page.locator('#particles-canvas');
        await expect(canvas).toBeAttached();
    });

    test('scroll indicator is visible', async ({ page }) => {
        const scroll = page.locator('.scroll-indicator');
        await expect(scroll).toBeVisible();
    });
});
