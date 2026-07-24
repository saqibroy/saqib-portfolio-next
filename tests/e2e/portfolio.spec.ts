import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", heading: "I design and build web products" },
  { path: "/work", heading: "Selected product engineering work" },
  {
    path: "/work/ai-assisted-contract-workflow",
    heading: "AI-assisted contract workflow",
  },
  {
    path: "/work/platform-modernisation",
    heading: "Platform modernisation and content architecture",
  },
  { path: "/work/jobs-tracker-bot", heading: "Jobs Tracker Bot" },
  { path: "/cv", heading: "Saqib Sohail" },
  { path: "/blog", heading: "Writing about the decision" },
] as const;

for (const route of routes) {
  test(`${route.path} renders its primary content`, async ({ page }) => {
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(route.heading);
  });
}

test("contact action exposes the verified email address", async ({ page }) => {
  await page.goto("/");
  const contact = page.getByTestId("contact-link");
  await expect(contact).toHaveAttribute("href", "mailto:saqib@ssohail.com");
});

test("CV exposes the verified date and PDF download", async ({ page }) => {
  await page.goto("/cv");
  await expect(page.getByText("08/2025–05/2026")).toBeVisible();
  await expect(page.getByRole("link", { name: /Download PDF/i })).toHaveAttribute(
    "href",
    "/Saqib_Sohail_CV.pdf",
  );
});

test("the blueprint has a non-animated reduced-motion state", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: /From structured input to editable contract/i,
    }),
  ).toBeVisible();
  await expect(page.getByTestId("request-marker")).toHaveCount(0);
  await expect(page.getByText("Application services", { exact: true })).toHaveCount(1);
  await expect(page.locator("[data-webgl='fallback']")).toBeVisible();
});

test("core routes have no detectable accessibility violations", async ({ page }) => {
  for (const path of ["/", "/work", "/cv", "/blog"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, `${path}: ${JSON.stringify(results.violations)}`).toEqual(
      [],
    );
  }
});
