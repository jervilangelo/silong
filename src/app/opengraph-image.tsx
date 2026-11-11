/* ImageResponse requires native img elements for its server renderer. */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image() {
  const logo = await readFile(
    path.join(
      process.cwd(),
      "brand/png/wordmark/silong-wordmark-on-dark-1200w.png",
    ),
  );
  return new ImageResponse(
    <div
      style={{
        background: "#151D25",
        color: "#D6D5CE",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={"data:image/png;base64," + logo.toString("base64")}
        width={600}
        height={260}
        alt="Silong"
      />
      <p style={{ fontSize: 32 }}>A quiet refuge for words.</p>
    </div>,
    size,
  );
}
