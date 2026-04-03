import { test, expect } from '@playwright/test'

test("page loads", async ({page}) => {
    await page.goto("http://localhost:3000/persons");
    await expect(page).toHaveTitle(/HE\/CLA/);
})

test("post person", async ({page}) => {
    await page.goto("http://localhost:3000/persons/post");
    await expect(page).toHaveTitle(/HE\/CLA/);

    await page.fill(`input[name="birthYear"]`, "1234")
    await page.fill(`input[name="deathYear"]`, "5678")
    await page.click(`input[name="post"]`)

    await page.goto("http://localhost:3000/persons")
    await expect(page.locator("tr").last()).toContainText("1234");
    await expect(page.locator("tr").last()).toContainText("5678")

    await page.locator("tr").last().getByRole("link").click()
    await expect(page.locator("ul").first()).toContainText("Syntynyt: 1234, N/A");
    await expect(page.locator("ul").first()).toContainText("Kuollut: 5678, N/A")

    await page.locator("li").last().getByRole("link").click()
    await page.fill(`input[name="birthYear"]`, "2345")
    await page.fill(`input[name="deathYear"]`, "6789")
    await page.click(`input[name="put"]`)

    await page.getByRole('link').first().click()
    await expect(page.locator("ul").first()).toContainText("Syntynyt: 2345, N/A");
    await expect(page.locator("ul").first()).toContainText("Kuollut: 6789, N/A");

    await page.locator("li").last().getByRole("link").click()
    await page.locator("li").last().getByRole("link").click()
    await page.fill(`input[name="verify"]`, "N/A N/A")
    await page.click(`input[name="delete"]`)
    await page.waitForURL("http://localhost:3000/persons")
})