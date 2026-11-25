import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * These tests run without email/CRM credentials, so submissions must be
 * reported as NOT sent. They would fail if the UI ever faked a success.
 */

async function answerSection(page: Page, value: number) {
  const groups = page.locator("fieldset");
  const count = await groups.count();
  for (let i = 0; i < count; i++) {
    await groups
      .nth(i)
      .locator("label")
      .nth(value - 1)
      .click();
  }
}

test("AI readiness assessment: full flow, scoring and results without personal data", async ({ page }) => {
  await page.goto("/ai-readiness");
  await page.getByRole("button", { name: "Start the assessment" }).click();

  const next = page.getByRole("button", { name: "Next section" });
  // Cannot advance until the section is complete
  await expect(next).toBeDisabled();

  // Sections 1–6 answered: leadership=5, people=4, data=1, technology=3, governance=2, process=4
  const plan = [5, 4, 1, 3, 2, 4];
  for (let s = 0; s < plan.length; s++) {
    await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", String(Math.round((s * 4 * 100) / 24)));
    await answerSection(page, plan[s]);
    if (s < plan.length - 1) await next.click();
  }
  await page.getByRole("button", { name: "See my results" }).click();

  // Expected: dimension scores 100,75,0,50,25,75 → overall 54 (Developing)
  const heading = page.getByRole("heading", { level: 2, name: /Developing/ });
  await expect(heading).toBeVisible();
  await expect(heading).toContainText("54");
  await expect(heading).toBeFocused();
  await expect(page.getByText("Where to focus first")).toBeVisible();
  // Lowest two dimensions are prioritized
  const priority = page.locator("section", { has: page.getByRole("heading", { name: "Where to focus first" }) });
  await expect(priority.getByText("Data and knowledge readiness").first()).toBeVisible();
  await expect(priority.getByText("Governance and responsible AI").first()).toBeVisible();
  // Data is lowest → consulting next step
  await expect(page.getByRole("link", { name: "Explore Praxis Consulting" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Request a consultation" })).toHaveAttribute("href", "/contact");

  const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
  expect(axe.violations.map((v) => v.id)).toEqual([]);

  // Optional email capture: consent required, then honest not-configured message
  await page.locator("#email").fill("leader@example.com");
  await page.waitForTimeout(2600);
  await page.getByRole("button", { name: "Send my results" }).click();
  await expect(page.getByText("Please confirm we may email you your results.")).toBeVisible();
  await page.getByLabel(/may email me about my assessment results/).check();
  await page.getByRole("button", { name: "Send my results" }).click();
  await expect(page.getByRole("alert").filter({ hasText: "not enabled yet" })).toBeVisible();

  // Retake resets
  await page.getByRole("button", { name: "Retake the assessment" }).click();
  await expect(page.getByRole("button", { name: "Start the assessment" })).toBeVisible();
});

test("contact form: validation keeps input and never fakes success when unconfigured", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("note").filter({ hasText: "Online submissions are not enabled yet" })).toBeVisible();

  await page.locator("#fullName").fill("Alex Morgan");
  await page.locator("#email").fill("not-an-email");
  await page.locator("#organization").fill("Example Co");
  await page.waitForTimeout(2600);
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
  await expect(page.getByText("Please choose an area of interest.")).toBeVisible();
  await expect(page.locator("#email")).toHaveAttribute("aria-invalid", "true");
  // Values survive the server round trip
  await expect(page.locator("#fullName")).toHaveValue("Alex Morgan");

  await page.locator("#email").fill("alex@example.com");
  await page.locator("#interest").selectOption("AI Training");
  await page.locator("#message").fill("We want to build AI literacy across a 200-person operations team.");
  await page.getByLabel(/may use these details to respond/).check();
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByRole("alert").filter({ hasText: "has not been sent" })).toBeVisible();
  await expect(page.getByText(/Your message has been received/)).toHaveCount(0);
});

test("academy interest form requires CASL consent", async ({ page }) => {
  await page.goto("/academy#register-interest");
  const form = page.locator("#register-interest");
  await form.locator("#email").fill("learner@example.com");
  await form.locator("#topic").selectOption("Agentic AI");
  await page.waitForTimeout(2600);
  await form.getByRole("button", { name: "Register interest" }).click();
  await expect(form.getByText("Please confirm you would like to receive updates.")).toBeVisible();
  await form.getByLabel(/email me when new Praxis Academy/).check();
  await form.getByRole("button", { name: "Register interest" }).click();
  await expect(form.getByRole("alert").filter({ hasText: "not enabled yet" })).toBeVisible();
});
