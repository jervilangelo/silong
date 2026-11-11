import { test, expect } from "@playwright/test";
import { profileSchema } from "../src/lib/validation";
test("profile validation rejects reserved and malformed handles", () => {
  for (const username of ["admin", "Upper", "a", "hello-world"])
    expect(
      profileSchema.safeParse({ username, pen_name: "Writer", bio: "" })
        .success,
    ).toBe(false);
  expect(
    profileSchema.safeParse({
      username: "ulan_writer",
      pen_name: "Writer",
      bio: "Hello",
    }).success,
  ).toBe(true);
});
test("homepage, branding, navigation and protection", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Find your pause",
  );
  await expect(page.locator("header img")).toHaveAttribute(
    "src",
    /silong-wordmark-on-dark/,
  );
  await page.getByRole("link", { name: "Explore", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "The reading room.",
  );
  await page.goto("/dashboard/profile");
  await expect(page).toHaveURL(/\/signin/);
  await page.getByLabel("Email address").fill("writer@example.com");
  await page.getByLabel("Password", { exact: true }).fill("longpassword");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("not configured");
  await page.goto("/u/missing");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "unwritten",
  );
});
for (const width of [1440, 768, 390])
  test(`responsive ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `docs/screenshots/home-${width}.png`,
      fullPage: true,
    });
    if (width < 801) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("link", { name: "Get started" })
        .click();
      await expect(page).toHaveURL(/signup/);
    }
  });
test("reduced motion, form constraints and basic semantics", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".rain").first()).toBeHidden();
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveCount(1);
  for (const img of await page.locator("img").all())
    await expect(img).toHaveAttribute("alt");
  await page.goto("/signup");
  await page.getByLabel("Password", { exact: true }).fill("short");
  expect(
    await page
      .getByLabel("Password", { exact: true })
      .evaluate(
        (node: HTMLInputElement) =>
          node.validity.tooShort || node.value.length < node.minLength,
      ),
  ).toBe(true);
});
