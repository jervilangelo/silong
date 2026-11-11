import { mkdir, copyFile } from "node:fs/promises";
const files = [
  "svg/silong-wordmark-on-dark.svg",
  "svg/silong-wordmark-on-light.svg",
  "svg/silong-wordmark-animated-on-dark.svg",
  "svg/silong-symbol-neon.svg",
  "web/favicon.svg",
  "web/favicon.ico",
  "web/apple-touch-icon.png",
  "web/icon-192.png",
  "web/icon-512.png",
  "web/maskable-512.png",
  "png/silong-social-avatar-1024.png",
];
await mkdir("public/brand", { recursive: true });
for (const file of files)
  await copyFile(`brand/${file}`, `public/brand/${file.split("/").pop()}`);
