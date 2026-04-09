import type { Page } from "puppeteer";

const email = "ebrahemh636@gmail.com";
const pass = "hima122";

const config = {
  site: "https://e-commerce-store-with-admin-dashboa.vercel.app/",

  hooks: {
    authenticate: async (page: Page) => {
      await page.goto(
        "https://e-commerce-store-with-admin-dashboa.vercel.app/login",
        { waitUntil: "networkidle2" },
      );

      await page.waitForSelector('input[name="email"]');
      await page.waitForSelector('input[name="password"]');

      await page.type('input[name="email"]', email);
      await page.type('input[name="password"]', pass);

      const submitButton = await page.$('button[type="submit"]');
      if (!submitButton) {
        console.error(
          "❌ Submit button not found! Check the page or credentials.",
        );
        return;
      }

      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        submitButton.click(),
      ]);

      console.log("✅ Logged in successfully!");
    },
  },
};

export default config;
