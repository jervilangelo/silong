import type { Metadata } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/newsreader";
import "./globals.css";
import { Header, Footer } from "@/components/shell";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Silong — A quiet refuge for words",
    template: "%s · Silong",
  },
  description:
    "A quiet refuge for stories, poetry, and everything left unsaid.",
  icons: { icon: "/brand/favicon.svg", apple: "/brand/apple-touch-icon.png" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Silong — Find your pause in writing",
    description: "A Filipino-centered literary refuge.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
