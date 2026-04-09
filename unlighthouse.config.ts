import type { Page } from "puppeteer";

const email = "ebrahem@gmail.com";
const pass = "hima";

const config = {
  site: "https://e-commerce-store-with-admin-dashboa.vercel.app/",

  hooks: {
    authenticate: async (page: Page) => {
      await page.goto(
        "https://e-commerce-store-with-admin-dashboa.vercel.app/login",
        {
          waitUntil: "networkidle2",
        },
      );

      await page.waitForSelector('input[name="email"]');
      await page.type('input[name="email"]', email);
      await page.type('input[name="password"]', pass);

      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click('button[type="submit"]'),
      ]);

      console.log("✅ Logged in successfully!");
    },
  },
};

export default config;
