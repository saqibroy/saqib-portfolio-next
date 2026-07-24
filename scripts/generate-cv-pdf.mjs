import { chromium } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const outputPath = path.join(projectRoot, "public", "Saqib_Sohail_CV.pdf");
const baseUrl = process.env.PORTFOLIO_BASE_URL ?? "http://127.0.0.1:3000";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  await page.goto(`${baseUrl}/cv`, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print", reducedMotion: "reduce" });
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
  });
  console.log(`Generated ${outputPath}`);
} finally {
  await browser.close();
}

