import { test as setup } from '@playwright/test'

setup('authenticate', async ({ page }) => {
    await page.goto('http://localhost:3000/persons')

    await page.fill('input[name="username"]', process.env.TEST_USERNAME!)
    await page.fill('input[name="password"]', process.env.TEST_PASSWORD!)
    await page.click('button[type="submit"]')

    await page.waitForURL('http://localhost:3000/**')
    await page.context().storageState({ path: 'e2e/.auth/user.json' })
})