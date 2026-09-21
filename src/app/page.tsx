import Portfolio from "@/components/Portfolio";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "baibakovkir",
  url: "https://baibakovkir.space",
  email: "mailto:baibakovkir@yandex.ru",
  jobTitle: "Full-stack разработчик веб-сервисов",
  description:
    "Разработка веб-сервисов под ключ: backend, frontend, интеграции API, автоматизация и асинхронные системы.",
  knowsAbout: ["TypeScript", "NestJS", "React", "Next.js", "Go", "PostgreSQL", "Redis", "WebSocket", "Docker"],
  sameAs: ["https://github.com/baibakovkir"],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Разработка веб-сервисов под ключ",
      serviceType: "Проектирование и разработка веб-приложений, backend-систем, API и интеграций",
      provider: { "@type": "Person", name: "baibakovkir" },
      areaServed: "Worldwide",
    },
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <Portfolio />
    </>
  );
}
