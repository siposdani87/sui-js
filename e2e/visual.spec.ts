import { test, expect } from '@playwright/test';

async function showPanel(page: any, panelId: string) {
    await page.evaluate((id: string) => {
        // Hide all panels
        document.querySelectorAll('.panel').forEach((p: any) => {
            p.style.display = 'none';
        });
        // Show target panel
        const panel = document.getElementById(id);
        if (panel) panel.style.display = 'block';
    }, panelId);
    await page.waitForTimeout(300);
}

test.describe('Visual regression', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/example/', { waitUntil: 'domcontentloaded' });
        await page.evaluate(() => {
            // Hide loader overlay
            const loader = document.getElementById('loader');
            if (loader) loader.style.display = 'none';
            // Hide all overlays
            const dialog = document.getElementById('dialog');
            if (dialog) dialog.style.display = 'none';
            const confirm = document.getElementById('confirm');
            if (confirm) confirm.style.display = 'none';
        });
        await page.waitForTimeout(500);
    });

    test('buttons - flat, raised, icon, fab variants', async ({ page }) => {
        await showPanel(page, 'components-panel');
        const section = page.locator('#components-panel .demo-section').first();
        await expect(section).toBeVisible();
        await expect(section).toHaveScreenshot('buttons.png');
    });

    test('table component', async ({ page }) => {
        await showPanel(page, 'components-panel');
        const section = page.locator('#components-panel .demo-section').nth(1);
        await expect(section).toBeVisible();
        await expect(section).toHaveScreenshot('table.png');
    });

    test('form fields - light theme', async ({ page }) => {
        await showPanel(page, 'form-panel');
        const formPanel = page.locator('#form-panel');
        await expect(formPanel).toBeVisible();
        await expect(formPanel).toHaveScreenshot('form-light.png', {
            maxDiffPixelRatio: 0.02,
        });
    });

    test('modals section', async ({ page }) => {
        await showPanel(page, 'modals-panel');
        const panel = page.locator('#modals-panel');
        await expect(panel).toBeVisible();
        await expect(panel).toHaveScreenshot('modals-section.png');
    });

    test('services section', async ({ page }) => {
        await showPanel(page, 'services-panel');
        const panel = page.locator('#services-panel');
        await expect(panel).toBeVisible();
        await expect(panel).toHaveScreenshot('services-section.png');
    });

    test('dark theme buttons', async ({ page }) => {
        await page.evaluate(() => {
            document.documentElement.classList.remove('light-theme');
            document.documentElement.classList.add('dark-theme');
        });
        await showPanel(page, 'components-panel');
        const section = page.locator('#components-panel .demo-section').first();
        await expect(section).toBeVisible();
        await expect(section).toHaveScreenshot('buttons-dark.png');
    });
});
