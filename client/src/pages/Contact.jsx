// src/pages/Contact.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";   // ✅ إضافة الترجمة
import "./Contact.css";

export default function Contact() {
  const { t } = useTranslation();   // ✅ hook الترجمة

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return t("contact.form.errors.name");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return t("contact.form.errors.email");
    if (!form.message.trim()) return t("contact.form.errors.message");
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setStatus({ loading: false, ok: false, msg: err });

    try {
      setStatus({ loading: true, ok: null, msg: "" });

      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const ct = res.headers.get("content-type") || "";
      const data = ct.includes("application/json") ? await res.json() : { success: false };
      if (!res.ok || !data?.success) throw new Error(data?.error || t("contact.form.errors.failed"));

      setStatus({ loading: false, ok: true, msg: t("contact.form.success") });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (e2) {
      setStatus({ loading: false, ok: false, msg: e2.message || t("contact.form.errors.unknown") });
    }
  };

  return (
    <main className="contact-v2">
      {/* HERO */}
      <section className="hero-wrap">
        <div className="hero-card">
          <span className="chip">{t("contact.hero.kicker")}</span>
          <h1 className="hero-title">{t("contact.hero.title")}</h1>
          <p className="hero-sub">{t("contact.hero.subtitle")}</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container">
        <div className="grid">
          {/* Form Card */}
          <div className="card form-card">
            <form onSubmit={onSubmit} noValidate>
              <div className="row2">
                <div className="field">
                  <label htmlFor="name">{t("contact.form.name")}</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t("contact.form.placeholders.name")}
                    value={form.name}
                    onChange={onChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">{t("contact.form.email")}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("contact.form.placeholders.email")}
                    value={form.email}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="subject">{t("contact.form.subject")}</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder={t("contact.form.placeholders.subject")}
                  value={form.subject}
                  onChange={onChange}
                />
              </div>

              <div className="field">
                <label htmlFor="message">{t("contact.form.message")}</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder={t("contact.form.placeholders.message")}
                  value={form.message}
                  onChange={onChange}
                />
              </div>

              <button className="btn" disabled={status.loading}>
                {status.loading ? t("contact.form.sending") : t("contact.form.send")}
              </button>

              {status.ok === true && <div className="alert ok">{status.msg}</div>}
              {status.ok === false && <div className="alert err">{status.msg}</div>}
            </form>
          </div>

          {/* Info Card */}
          <aside className="card info-card">
            <div className="info-block">
              <div className="info-icon" aria-hidden="true">
                {/* Email icon */}
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M4 8l8 5 8-5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
                  <rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1"/>
                </svg>
              </div>
              <div>
                <div className="info-title">{t("contact.info.email.title")}</div>
                <div className="info-text">ziaralebanon@gmail.com</div>
              </div>
            </div>

            <div className="info-block">
              <div className="info-icon" aria-hidden="true">
                {/* Phone icon */}
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M6.6 10.8c1.4 2.7 3.9 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.6.6 4 .6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.8 22 2 13.2 2 3c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.4.2 2.8.6 4 .1.4 0 .8-.3 1.1L6.6 10.8z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <div className="info-title">{t("contact.info.support.title")}</div>
                <div className="info-text">{t("contact.info.support.text")}</div>
              </div>
            </div>

            <ul className="bullets">
              <li>{t("contact.info.list.item1")}</li>
              <li>{t("contact.info.list.item2")}</li>
              <li>{t("contact.info.list.item3")}</li>
            </ul>

            <div className="info-note">{t("contact.info.note")}</div>
          </aside>
        </div>
      </section>
    </main>
  );
}
