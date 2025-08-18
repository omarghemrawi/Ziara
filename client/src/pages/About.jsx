import "./About.css";

export default function About() {
  return (
    <main className="about">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-container">
          <p className="eyebrow">About Ziara</p>
          <h1>Discover Lebanon, together.</h1>
          <p className="lead">
            Ziara connects visitors with local businesses—restaurants, stays, activities,
            and shops—through a simple, bilingual experience across web and mobile.
          </p>
        </div>
      </section>

      {/* What is Ziara */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="section-title">
            What is Ziara?
            <span className="section-bar" />
          </h2>

          <div className="steps">
            <article className="step">
              <div className="step-icon" aria-hidden>
                {/* phone icon */}
                <svg viewBox="0 0 24 24"><path d="M9 2h6a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 3h6M9 19h6" fill="none" stroke="currentColor" strokeWidth="1.8"/></svg>
              </div>
              <h3>Mobile app for visitors</h3>
              <p>
                Search by category and GPS, save <strong>Favorites</strong> and move them to
                <strong> Visited</strong>, and read/write photo reviews. UI supports Arabic/English.
              </p>
            </article>

            <article className="step">
              <div className="step-icon" aria-hidden>
                {/* store icon */}
                <svg viewBox="0 0 24 24"><path d="M3 10l2-6h14l2 6M5 10v10h14V10M9 14h6" fill="none" stroke="currentColor" strokeWidth="1.8"/></svg>
              </div>
              <h3>Website for business owners</h3>
              <p>
                Create a rich profile (photos, description, links, map; restaurants add a menu link),
                pick a plan to boost visibility, and reply to reviews.
              </p>
            </article>

            <article className="step">
              <div className="step-icon" aria-hidden>
                {/* shield icon */}
                <svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" fill="none" stroke="currentColor" strokeWidth="1.8"/></svg>
              </div>
              <h3>Admin dashboard</h3>
              <p>
                Manage accounts, review reports, and curate touristic/religious places
                to keep the ecosystem healthy.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Web ↔ Mobile sync */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="section-title">
            Website × Mobile: one system
            <span className="section-bar" />
          </h2>

          <ul className="bullets">
            <li><span className="dot" /> Updates on the website appear instantly in the app.</li>
            <li><span className="dot" /> App reviews/photos show on the website; owners can reply.</li>
            <li><span className="dot" /> Plans chosen on the website influence ranking and limits in the app.</li>
          </ul>
        </div>
      </section>

      {/* Two cards */}
      <section className="about-section">
        <div className="about-container grid-2">
          <div className="card">
            <h3>For Visitors</h3>
            <ul className="list">
              <li>Discover nearby places by category & location</li>
              <li>Save Favorites → move to Visited after your trip</li>
              <li>Read & write honest, photo-based reviews</li>
            </ul>
          </div>
          <div className="card">
            <h3>For Business Owners</h3>
            <ul className="list">
              <li>Professional profile with photos, description, links & map</li>
              <li>Restaurant-friendly: add your public menu link</li>
              <li>Flexible plans to boost visibility in the app</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="about-section">
        <div className="about-container">
          <div className="card">
            <h3>Trust & Safety</h3>
            <p className="muted">
              Users can report spam, off-topic, or abusive content. Admin tools keep Ziara
              fair and helpful for everyone.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
