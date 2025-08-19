// src/pages/About.jsx
import "./About.css";
import { useTranslation } from "react-i18next";  // ✅ إضافة الترجمة

export default function About() {
  const { t } = useTranslation();

  return (
    <main className="about">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-container">
          <p className="eyebrow">{t("about.hero.kicker")}</p>
          <h1>{t("about.hero.title")}</h1>
          <p className="lead">{t("about.hero.subtitle")}</p>
        </div>
      </section>

      {/* What is Ziara */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="section-title">
            {t("about.what.title")}
            <span className="section-bar" />
          </h2>

          <div className="steps">
            <article className="step">
              <div className="step-icon" aria-hidden>
                {/* phone icon */}
                <svg viewBox="0 0 24 24"><path d="M9 2h6a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 3h6M9 19h6" fill="none" stroke="currentColor" strokeWidth="1.8"/></svg>
              </div>
              <h3>{t("about.what.visitors.title")}</h3>
              <p>{t("about.what.visitors.desc")}</p>
            </article>

            <article className="step">
              <div className="step-icon" aria-hidden>
                {/* store icon */}
                <svg viewBox="0 0 24 24"><path d="M3 10l2-6h14l2 6M5 10v10h14V10M9 14h6" fill="none" stroke="currentColor" strokeWidth="1.8"/></svg>
              </div>
              <h3>{t("about.what.owners.title")}</h3>
              <p>{t("about.what.owners.desc")}</p>
            </article>

            <article className="step">
              <div className="step-icon" aria-hidden>
                {/* shield icon */}
                <svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" fill="none" stroke="currentColor" strokeWidth="1.8"/></svg>
              </div>
              <h3>{t("about.what.admin.title")}</h3>
              <p>{t("about.what.admin.desc")}</p>
            </article>
          </div>
        </div>
      </section>

      {/* Web ↔ Mobile sync */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="section-title">
            {t("about.sync.title")}
            <span className="section-bar" />
          </h2>

          <ul className="bullets">
            <li><span className="dot" /> {t("about.sync.item1")}</li>
            <li><span className="dot" /> {t("about.sync.item2")}</li>
            <li><span className="dot" /> {t("about.sync.item3")}</li>
          </ul>
        </div>
      </section>

      {/* Two cards */}
      <section className="about-section">
        <div className="about-container grid-2">
          <div className="card">
            <h3>{t("about.cards.visitors.title")}</h3>
            <ul className="list">
              <li>{t("about.cards.visitors.item1")}</li>
              <li>{t("about.cards.visitors.item2")}</li>
              <li>{t("about.cards.visitors.item3")}</li>
            </ul>
          </div>
          <div className="card">
            <h3>{t("about.cards.owners.title")}</h3>
            <ul className="list">
              <li>{t("about.cards.owners.item1")}</li>
              <li>{t("about.cards.owners.item2")}</li>
              <li>{t("about.cards.owners.item3")}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="about-section">
        <div className="about-container">
          <div className="card">
            <h3>{t("about.trust.title")}</h3>
            <p className="muted">{t("about.trust.desc")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
