export type Locale = "ru" | "en";

export const portfolio = {
  ru: {
    nav: ["Обо мне", "Проекты", "Подход"],
    availability: "Открыт к интересным задачам",
    kicker: "BAIBAKOVKIR · РАЗРАБОТЧИК",
    headline: ["Проектирую", "системы, которые", "работают."],
    intro:
      "Разрабатываю веб-сервисы под ключ: от архитектуры и надёжного backend до понятного интерфейса. Превращаю процессы компаний в простые рабочие инструменты.",
    explore: "Смотреть проекты",
    location: "FULL-STACK · BACKEND",
    scroll: "ЛИСТАЙТЕ НИЖЕ",
    sectionAbout: "01 / КОРОТКО ОБО МНЕ",
    aboutTitle: "От идеи до\nработающего продукта.",
    aboutText:
      "Разрабатываю full-stack приложения, фоновые процессы и интеграции. Думаю о том, как система ведёт себя под нагрузкой, как её поддерживать и как показать сложную логику без лишнего шума.",
    skillsTitle: "Инструменты и опыт",
    skillsNote: "Технологии, подтверждённые проектами",
    skills: [
      { name: "TypeScript", group: "ЯЗЫК" },
      { name: "NestJS", group: "BACKEND" },
      { name: "React", group: "FRONTEND" },
      { name: "PostgreSQL", group: "ДАННЫЕ" },
      { name: "Redis · BullMQ", group: "ОЧЕРЕДИ" },
      { name: "WebSocket", group: "REALTIME" },
      { name: "Docker", group: "ДОСТАВКА" },
      { name: "Go", group: "BACKEND" },
    ],
    sectionWork: "02 / ИЗБРАННОЕ",
    workTitle: "Проекты, за которыми\nстоят реальные задачи.",
    projects: [
      {
        number: "01",
        tag: "FULL-STACK · ПЕРСОНАЛЬНЫЙ ПРОДУКТ",
        title: "Countryhouse Planner",
        summary:
          "Веб-приложение для планирования загородного участка: схема в масштабе, объекты, расходы и календарь работ в одном пространстве.",
        stack: ["Go", "Next.js", "PostgreSQL", "SVG / 3D"],
        href: "https://countryhouse.baibakovkir.space",
        source: "https://github.com/baibakovkir/countryhouse-go-next",
        action: "Открыть проект",
        glyph: "plot",
      },
      {
        number: "02",
        tag: "BACKEND · АСИНХРОННАЯ ИНТЕГРАЦИЯ",
        title: "Очереди и события",
        summary:
          "Интеграционный backend, который принимает запросы, выполняет долгие операции в фоне и сообщает клиенту о ходе работы в реальном времени.",
        stack: ["NestJS", "BullMQ", "Redis", "Socket.IO"],
        href: "#architecture",
        source: "",
        action: "Как устроен процесс",
        glyph: "nodes",
      },
      {
        number: "03",
        tag: "АВТОМАТИЗАЦИЯ · НАДЁЖНОСТЬ ДАННЫХ",
        title: "Синхронизация каталога",
        summary:
          "Инструменты для сверки больших наборов данных: безопасная загрузка изменений, повторные попытки и проверка результата после импорта.",
        stack: ["TypeScript", "REST API", "Batch jobs", "Validation"],
        href: "#contact",
        source: "",
        action: "Обсудить похожую задачу",
        glyph: "sync",
      },
    ],
    architectureLabel: "02 / ПОД КАПОТОМ",
    architectureTitle: "Долгая операция.\nПонятный статус.",
    architectureIntro:
      "HTTP-запрос не должен ждать, пока завершится вся цепочка интеграции. Задача сохраняется, обрабатывается в фоне, а клиент получает обновления по мере выполнения.",
    architectureSteps: [
      { title: "Запрос", text: "REST endpoint проверяет входные данные и создаёт запись операции." },
      { title: "Очередь", text: "BullMQ ставит задачу в Redis. API сразу возвращает ID для отслеживания." },
      { title: "Обработка", text: "NestJS worker выполняет интеграцию и сохраняет итоговый статус в PostgreSQL." },
      { title: "Обновление", text: "Socket.IO отправляет статус клиенту; REST остаётся резервным способом проверки." },
    ],
    architectureFoot: "РАЗДЕЛЕНИЕ HTTP-ЗАПРОСА И ДОЛГОЙ РАБОТЫ",
    contactLabel: "03 / СВЯЗАТЬСЯ",
    contactTitle: "Есть задача?\nДавайте обсудим.",
    contactText: "Расскажите о задаче — помогу спроектировать и разработать веб-сервис для вашей компании.",
    contactButton: "Почта - baibakovkir@yandex.ru",
    footer: "СДЕЛАНО С ИНТЕРЕСОМ К ДЕТАЛЯМ",
    backTop: "НАВЕРХ ↑",
  },
  en: {
    nav: ["About", "Projects", "Approach"],
    availability: "Open to interesting work",
    kicker: "BAIBAKOVKIR · SOFTWARE DEVELOPER",
    headline: ["I build", "systems that", "work."],
    intro:
      "I create web products where dependable backends meet clear interfaces. I enjoy turning complex processes into simple, useful tools.",
    explore: "Explore projects",
    location: "FULL-STACK · BACKEND",
    scroll: "SCROLL TO EXPLORE",
    sectionAbout: "01 / A LITTLE ABOUT ME",
    aboutTitle: "From an idea\nto a working product.",
    aboutText:
      "I build full-stack applications, background jobs, and integrations. I care about how systems behave under load, how they can be maintained, and how to make complex logic easy to follow.",
    skillsTitle: "Tools & experience",
    skillsNote: "Technologies represented in project work",
    skills: [
      { name: "TypeScript", group: "LANGUAGE" },
      { name: "NestJS", group: "BACKEND" },
      { name: "React", group: "FRONTEND" },
      { name: "PostgreSQL", group: "DATA" },
      { name: "Redis · BullMQ", group: "QUEUES" },
      { name: "WebSocket", group: "REALTIME" },
      { name: "Docker", group: "DELIVERY" },
      { name: "Go", group: "BACKEND" },
    ],
    sectionWork: "02 / SELECTED WORK",
    workTitle: "Projects built\naround real problems.",
    projects: [
      {
        number: "01",
        tag: "FULL-STACK · PERSONAL PRODUCT",
        title: "Countryhouse Planner",
        summary:
          "A web app for planning a country plot: a scaled map, structures, expenses, and a work schedule in one workspace.",
        stack: ["Go", "Next.js", "PostgreSQL", "SVG / 3D"],
        href: "https://countryhouse.baibakovkir.space",
        source: "https://github.com/baibakovkir/countryhouse-go-next",
        action: "View live project",
        glyph: "plot",
      },
      {
        number: "02",
        tag: "BACKEND · ASYNC INTEGRATION",
        title: "Queues & events",
        summary:
          "An integration backend that accepts requests, runs long tasks in the background, and reports progress to the client in real time.",
        stack: ["NestJS", "BullMQ", "Redis", "Socket.IO"],
        href: "#architecture",
        source: "",
        action: "See how it works",
        glyph: "nodes",
      },
      {
        number: "03",
        tag: "AUTOMATION · DATA RELIABILITY",
        title: "Catalog synchronization",
        summary:
          "Tools for reconciling large datasets: safely applying changes, retrying jobs, and verifying results after import.",
        stack: ["TypeScript", "REST API", "Batch jobs", "Validation"],
        href: "#contact",
        source: "",
        action: "Discuss a similar problem",
        glyph: "sync",
      },
    ],
    architectureLabel: "02 / UNDER THE HOOD",
    architectureTitle: "A long-running task.\nA clear status.",
    architectureIntro:
      "An HTTP request should not wait for an entire integration workflow to finish. The task is stored, processed in the background, and the client receives updates as work progresses.",
    architectureSteps: [
      { title: "Request", text: "A REST endpoint validates input and creates an operation record." },
      { title: "Queue", text: "BullMQ puts a job in Redis. The API immediately returns a tracking ID." },
      { title: "Process", text: "A NestJS worker runs the integration and saves the final status in PostgreSQL." },
      { title: "Update", text: "Socket.IO sends progress to the client; REST remains a fallback for status checks." },
    ],
    architectureFoot: "HTTP REQUESTS AND LONG-RUNNING WORK STAY SEPARATE",
    contactLabel: "03 / GET IN TOUCH",
    contactTitle: "Have a challenge?\nLet’s talk.",
    contactText: "Tell me about your challenge — I can design and build a web service for your company.",
    contactButton: "Email me on baibakovkir@yandex.ru",
    footer: "MADE WITH AN EYE FOR DETAIL",
    backTop: "BACK TO TOP ↑",
  },
} as const;

export type PortfolioContent = (typeof portfolio)[Locale];

export function getPortfolioContent(locale: Locale): PortfolioContent {
  return portfolio[locale];
}
