// @ts-check
const { test, expect } = require('@playwright/test');

test('has studentId', async ({ page }) => {
    await page.goto('http://localhost:3001');

    // Expect a title "to contain" a substring.
    await expect(page.getByTestId('student-id')).toHaveText(/P[0-9]{7}/);
});
