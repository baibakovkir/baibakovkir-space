import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://baibakovkir.space";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Разработка веб-сервисов под ключ — baibakovkir",
    template: "%s — baibakovkir",
  },
  description:
    "Разрабатываю веб-сервисы под ключ: backend, понятные интерфейсы, интеграции, автоматизацию и системы под нагрузкой. Обсудить проект: baibakovkir@yandex.ru.",
  applicationName: "baibakovkir",
  authors: [{ name: "baibakovkir", url: siteUrl }],
  creator: "baibakovkir",
  publisher: "baibakovkir",
  category: "software development",
  keywords: [
    "разработка веб-сервисов",
    "заказать веб-сервис",
    "разработка backend",
    "full-stack разработчик",
    "разработка под ключ",
    "автоматизация бизнеса",
    "интеграция API",
    "Next.js",
    "NestJS",
    "TypeScript",
    "Go",
  ],
  alternates: {
    canonical: "/",
    languages: { "ru-RU": "/", "x-default": "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "baibakovkir",
    locale: "ru_RU",
    title: "Разработка веб-сервисов под ключ — baibakovkir",
    description: "Создаю надёжные веб-продукты, backend-системы, интеграции и автоматизацию для бизнеса.",
    images: [{ url: "/logo.png", width: 1676, height: 844, alt: "baibakovkir — разработка веб-сервисов" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Разработка веб-сервисов под ключ — baibakovkir",
    description: "Надёжные веб-продукты, backend-системы, интеграции и автоматизация для бизнеса.",
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
