"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useSyncExternalStore } from "react";
import { getPortfolioContent, type Locale } from "@/content/portfolio";
import { ProjectGlyph } from "./ProjectGlyph";

const PortraitScene = dynamic(() => import("./PortraitScene"), {
  ssr: false,
  loading: () => <div className="portrait-loading" aria-hidden="true" />,
});

const skillsPositions = [
  "skill-top-left",
  "skill-top",
  "skill-top-right",
  "skill-right",
  "skill-bottom-right",
  "skill-bottom",
  "skill-bottom-left",
  "skill-left",
];

function subscribeLocale(onStoreChange: () => void) {
  window.addEventListener("portfolio-locale-change", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("portfolio-locale-change", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getStoredLocale(): Locale {
  return window.localStorage.getItem("portfolio-locale") === "en" ? "en" : "ru";
}

function usePortfolioLocale() {
  const locale = useSyncExternalStore<Locale>(subscribeLocale, getStoredLocale, () => "ru");
  const setLocale = (next: Locale) => {
    window.localStorage.setItem("portfolio-locale", next);
    window.dispatchEvent(new Event("portfolio-locale-change"));
  };
  return [locale, setLocale] as const;
}

export default function Portfolio() {
  const [locale, setLocale] = usePortfolioLocale();
  const t = getPortfolioContent(locale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="baibakovkir — home">
          <Image src="/logo-small.png" alt="" width={38} height={38} priority unoptimized />
          <span>baibakovkir<span className="brand-dot">.</span></span>
        </a>
        <nav className="main-nav" aria-label={locale === "ru" ? "Основная навигация" : "Main navigation"}>
          <a href="#about">{t.nav[0]}</a>
          <a href="#work">{t.nav[1]}</a>
          <a href="#architecture">{t.nav[2]}</a>
        </nav>
        <div className="header-actions">
          <div className="availability"><i />{t.availability}</div>
          <div className="locale-switch" aria-label={locale === "ru" ? "Язык" : "Language"}>
            <button type="button" aria-pressed={locale === "ru"} onClick={() => setLocale("ru")}>RU</button>
            <span>/</span>
            <button type="button" aria-pressed={locale === "en"} onClick={() => setLocale("en")}>EN</button>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-index">01</span>{t.kicker}</p>
          <h1>{t.headline.map((line, index) => <span key={line} className={index === 2 ? "accent-line" : undefined}>{line}</span>)}</h1>
          <p className="hero-intro">{t.intro}</p>
          <div className="hero-actions">
            <a className="button-primary" href="#work">{t.explore}<span aria-hidden="true">↘</span></a>
            <span className="hero-location">{t.location}</span>
          </div>
        </div>
        <div className="hero-visual">
          <PortraitScene />
        </div>
        <div className="hero-index">PORTFOLIO <span>2026</span></div>
      </section>

      <section className="about section-wrap" id="about">
        <div className="section-marker">{t.sectionAbout}</div>
        <div className="about-grid">
          <h2>{t.aboutTitle}</h2>
          <div className="about-copy">
            <p>{t.aboutText}</p>
            <div className="skills-heading"><h3>{t.skillsTitle}</h3><span>{t.skillsNote}</span></div>
            <div className="skill-constellation" aria-label={t.skillsTitle}>
              <svg className="skill-connectors" viewBox="0 0 600 310" aria-hidden="true">
                <path d="M300 158 104 53m196 105 187-105m-187 105 0-124m0 124 219 13m-219-13 169 107m-169-107 0 125m0-125L111 269m189-111L82 164" />
                <circle cx="300" cy="158" r="72" />
                <circle cx="300" cy="158" r="99" />
              </svg>
              <div className="skill-core"><span>BUILD</span><b>↗</b><span>SYSTEMS</span></div>
              {t.skills.map((skill, index) => (
                <div className={`skill-node ${skillsPositions[index]}`} key={skill.name}>
                  <span>{skill.group}</span><b>{skill.name}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="work section-wrap" id="work">
        <div className="section-marker">{t.sectionWork}</div>
        <div className="work-heading"><h2>{t.workTitle}</h2><span className="work-count">03 <i>SELECTED PROJECTS</i></span></div>
        <div className="project-list">
          {t.projects.map((project) => (
            <article className="project-card" key={project.number}>
              <div className={`project-art project-art-${project.glyph}`}><ProjectGlyph kind={project.glyph} /><span className="project-art-index">{project.number} / 03</span></div>
              <div className="project-info">
                <p className="project-tag"><span>{project.number}</span>{project.tag}</p>
                <h3>{project.title}</h3>
                <p className="project-summary">{project.summary}</p>
                <div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                <div className="project-links">
                  <a href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel={project.href.startsWith("http") ? "noreferrer" : undefined}>
                    {project.action}<span aria-hidden="true"> ↗</span>
                  </a>
                  {project.source && <a className="source-link" href={project.source} target="_blank" rel="noreferrer">GitHub ↗</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="architecture section-wrap" id="architecture">
        <div className="section-marker">{t.architectureLabel}</div>
        <div className="architecture-intro">
          <h2>{t.architectureTitle}</h2>
          <p>{t.architectureIntro}</p>
        </div>
        <div className="flow-diagram" aria-label={locale === "ru" ? "Схема фоновой обработки" : "Background processing diagram"}>
          {t.architectureSteps.map((step, index) => (
            <div className="flow-step" key={step.title}>
              <div className="flow-step-top"><span>0{index + 1}</span><div className="flow-step-icon">{["↗", "⌘", "◉", "↯"][index]}</div></div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <div className="flow-connector" aria-hidden="true"><span /></div>
            </div>
          ))}
        </div>
        <p className="architecture-foot"><i />{t.architectureFoot}</p>
      </section>

      <section className="contact section-wrap" id="contact">
        <div className="section-marker">{t.contactLabel}</div>
        <div className="contact-panel">
          <div><h2>{t.contactTitle}</h2><p>{t.contactText}</p></div>
          <a className="button-primary contact-button" href="mailto:baibakovkir@yandex.ru">{t.contactButton}<span aria-hidden="true">↗</span></a>
          <span className="contact-orbit contact-orbit-one" /><span className="contact-orbit contact-orbit-two" />
        </div>
      </section>

      <footer className="site-footer"><a href="#top" className="footer-brand">baibakovkir<span>.</span></a><span>{t.footer} · 2026</span><a href="#top">{t.backTop}</a></footer>
    </main>
  );
}
