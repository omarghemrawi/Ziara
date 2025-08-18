import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Enter a valid email.";
    if (!form.message.trim()) return "Message cannot be empty.";
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
      if (!res.ok || !data?.success) throw new Error(data?.error || "Failed to send. Try again.");

      setStatus({ loading: false, ok: true, msg: "Your message was sent. Thank you! ✅" });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (e2) {
      setStatus({ loading: false, ok: false, msg: e2.message || "Something went wrong" });
    }
  };

  return (
    <main className="contact-v2">
      {/* HERO — نفس ستايل الـ Services */}
      <section className="hero-wrap">
        <div className="hero-card">
          <span className="chip">CONTACT</span>
          <h1 className="hero-title">Get in touch.</h1>
          <p className="hero-sub">
            Choose a plan or have questions about listing your business on Ziara?
            Send us a message — we usually reply within 24–48 hours.
          </p>
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
                  <label htmlFor="name">Full name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={onChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="subject">Subject (optional)</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={onChange}
                />
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={onChange}
                />
              </div>

              <button className="btn" disabled={status.loading}>
                {status.loading ? "Sending..." : "Send message"}
              </button>

              {status.ok === true && <div className="alert ok">{status.msg}</div>}
              {status.ok === false && <div className="alert err">{status.msg}</div>}
            </form>
          </div>

          {/* Info Card (يمين) */}
          <aside className="card info-card">
            <div className="info-block">
              <div className="info-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M4 8l8 5 8-5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
                  <rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1"/>
                </svg>
              </div>
              <div>
                <div className="info-title">Email</div>
                <div className="info-text">ziaralebanon@gmail.com</div>
              </div>
            </div>

            <div className="info-block">
              <div className="info-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M6.6 10.8c1.4 2.7 3.9 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.6.6 4 .6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.8 22 2 13.2 2 3c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.4.2 2.8.6 4 .1.4 0 .8-.3 1.1L6.6 10.8z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <div className="info-title">Support hours</div>
                <div className="info-text">Mon–Fri, 9:00–17:00</div>
              </div>
            </div>

            <ul className="bullets">
              <li>Partnerships & subscriptions</li>
              <li>Listing/verification help</li>
              <li>Report a technical issue</li>
            </ul>

            <div className="info-note">We’ll reply via email as soon as possible.</div>
          </aside>
        </div>
      </section>
    </main>
  );
}
