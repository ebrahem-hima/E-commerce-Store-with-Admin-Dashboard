import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public/images");

function checkImages(folder) {
  const files = fs.readdirSync(folder);
  for (const file of files) {
    const fullPath = path.join(folder, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      checkImages(fullPath);
    } else {
      if (!/\.(webp|jpg|jpeg|png|avif)$/i.test(file)) {
        console.log("❌ Invalid image format:", fullPath);
      } else {
        console.log("✅ OK:", fullPath);
      }
    }
  }
}

checkImages(dir);
