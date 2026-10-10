import { defineConfig, devices } from "@playwright/test";

const port = process.env.PORT ?? "3100";
const baseURL = process.env.BASE_URL ?? `http://localhost:${port}`;

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  fullyParallel: true,
  retries: 0,
  reporter: [["list"]],
  use: { baseURL, trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], launchOptions: { executablePath: process.env.PW_CHROMIUM || undefined } } }],
  webServer: {
    command: `pnpm start --port ${port}`,
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120_000,
    env: { NEXT_PUBLIC_SHOW_PLACEHOLDERS: process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS ?? "" },
  },
});
