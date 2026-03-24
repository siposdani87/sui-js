import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    outputDir: './e2e/test-results',
    snapshotPathTemplate: '{testDir}/snapshots/{testFilePath}/{arg}{ext}',
    timeout: 30000,
    expect: {
        toHaveScreenshot: {
            maxDiffPixelRatio: 0.01,
        },
    },
    use: {
        baseURL: 'http://localhost:4000',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
                viewport: { width: 1280, height: 720 },
            },
        },
    ],
    webServer: {
        command: 'npx serve . -p 4000',
        port: 4000,
        reuseExistingServer: !process.env.CI,
    },
});
