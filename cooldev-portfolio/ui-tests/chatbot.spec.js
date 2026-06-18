// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('AI Chatbot', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('chatbot FAB button is visible', async ({ page }) => {
        const fab = page.locator('#chatbot-toggle');
        await expect(fab).toBeVisible();
    });

    test('clicking FAB opens chatbot', async ({ page }) => {
        await page.click('#chatbot-toggle');
        const chatbot = page.locator('#ai-chatbot');
        await expect(chatbot).not.toHaveClass(/hidden/);
        await expect(page.locator('#chatbot-toggle')).not.toBeVisible();
    });

    test('chatbot has header with title', async ({ page }) => {
        await page.click('#chatbot-toggle');
        const header = page.locator('.chatbot-title');
        await expect(header).toContainText('AI Assistant');
    });

    test('chatbot has greeting message', async ({ page }) => {
        await page.click('#chatbot-toggle');
        const msg = page.locator('.message.bot .message-content').first();
        await expect(msg).toContainText('Hi');
    });

    test('chatbot has input field', async ({ page }) => {
        await page.click('#chatbot-toggle');
        await expect(page.locator('#chatbot-input')).toBeVisible();
    });

    test('chatbot has send button', async ({ page }) => {
        await page.click('#chatbot-toggle');
        await expect(page.locator('#chatbot-send')).toBeVisible();
    });

    test('can send a message', async ({ page }) => {
        await page.click('#chatbot-toggle');
        await page.fill('#chatbot-input', 'привет');
        await page.click('#chatbot-send');
        await page.waitForTimeout(2000);
        const userMsgs = page.locator('.message.user');
        await expect(userMsgs).toHaveCount(1);
    });

    test('bot responds to message', async ({ page }) => {
        await page.click('#chatbot-toggle');
        await page.fill('#chatbot-input', 'привет');
        await page.click('#chatbot-send');
        await page.waitForTimeout(3000);
        const botMsgs = page.locator('.message.bot');
        const count = await botMsgs.count();
        expect(count).toBeGreaterThanOrEqual(2);
    });

    test('can send message with Enter key', async ({ page }) => {
        await page.click('#chatbot-toggle');
        await page.fill('#chatbot-input', 'навыки');
        await page.press('#chatbot-input', 'Enter');
        await page.waitForTimeout(3000);
        const userMsgs = page.locator('.message.user');
        await expect(userMsgs).toHaveCount(1);
    });

    test('typing indicator shows while waiting', async ({ page }) => {
        await page.click('#chatbot-toggle');
        await page.fill('#chatbot-input', 'проекты');
        await page.click('#chatbot-send');
        await page.waitForTimeout(200);
        const typing = page.locator('.typing-indicator');
        await expect(typing).toBeVisible();
    });

    test('close button closes chatbot', async ({ page }) => {
        await page.click('#chatbot-toggle');
        await expect(page.locator('#ai-chatbot')).not.toHaveClass(/hidden/);
        await page.click('#chatbot-close');
        await expect(page.locator('#ai-chatbot')).toHaveClass(/hidden/);
        await expect(page.locator('#chatbot-toggle')).toBeVisible();
    });

    test('responds to different topics', async ({ page }) => {
        await page.click('#chatbot-toggle');
        
        await page.fill('#chatbot-input', 'что умеешь');
        await page.click('#chatbot-send');
        await page.waitForTimeout(2000);
        
        await page.fill('#chatbot-input', 'как связаться');
        await page.click('#chatbot-send');
        await page.waitForTimeout(2000);
        
        const userMsgs = page.locator('.message.user');
        await expect(userMsgs).toHaveCount(2);
    });
});
