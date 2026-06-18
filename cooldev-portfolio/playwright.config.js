// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './ui-tests',
    timeout: 30000,
    retries: 1,
    use: {
        baseURL: 'http://localhost:3000',
        headless: true,
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        channel: 'chrome',
    },
    webServer: {
        command: 'npx serve . -l 3000',
        port: 3000,
        reuseExistingServer: true,
    },
});
