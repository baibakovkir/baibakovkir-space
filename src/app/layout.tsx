import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://baibakovkir.space";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "baibakovkir — Software Developer",
  description: "Full-stack developer building dependable web products, asynchronous systems, and useful tools.",
  applicationName: "baibakovkir",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "baibakovkir",
    title: "baibakovkir — Software Developer",
    description: "Selected projects, system design, and engineering notes.",
    images: [{ url: "/logo.png", width: 1676, height: 844, alt: "baibakovkir" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "baibakovkir — Software Developer",
    description: "Selected projects, system design, and engineering notes.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [{ url: "/favicons/favicon.ico" }, { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" }],
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: "/favicons/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0c100f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
