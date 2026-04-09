// unlighthouse.config.ts
import type { Page } from "playwright";

const email = "ebrahemh636@gmail.com";
const pass = "hima122";

const config = {
  site: "https://e-commerce-store-with-admin-dashboa.vercel.app/",

  hooks: {
    authenticate: async (page: Page) => {
      // حددنا نوع page
      // 1. فتح صفحة login
      await page.goto(
        "https://e-commerce-store-with-admin-dashboa.vercel.app/login",
      );

      // 2. التأكد إن الصفحة حملت
      await page.waitForSelector('input[name="email"]');

      // 3. إدخال البيانات
      await page.fill('input[name="email"]', email);
      await page.fill('input[name="password"]', pass);

      // 4. تسجيل الدخول
      await page.click('button[type="submit"]');

      // 5. انتظار نجاح login
      await page.waitForURL("**/admin**");

      console.log("✅ Authenticated successfully!");
    },
  },

  scanner: {
    skipJavascript: false,
  },
};

export default config;
