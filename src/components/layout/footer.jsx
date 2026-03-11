import Logo from "../../assets/footericon.png";

const GOLD       = "#C8A96A";
const GOLD_LIGHT = "#E8D5A8";
const OBSIDIAN   = "#07070D";
const INK        = "#0E0E18";
const TEXT       = "#EAE5D8";
const MUTED      = "rgba(234,229,216,0.45)";

const marqueeItems = [
  "72 Hours Dental Implants",
  "Root Canal Treatment",
  "Smile Designing",
  "Orthodontics",
  "Dental Laminates",
  "Cosmetic Dentistry",
];

const quickLinks = ["Home", "About Clinic", "Gallery", "Contact Us", "Appointment Now", "Blog"];

const services = [
  "Dental Implant",
  "24–72 Hours Dental Implants",
  "Root Canal Treatment",
  "Smile Designing",
  "Orthodontics",
  "Dental Laminates",
];

const PhoneIcon = () => (
  <svg style={{ width: "13px", height: "13px", flexShrink: 0, color: GOLD }} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const PinIcon = () => (
  <svg style={{ width: "13px", height: "13px", flexShrink: 0, marginTop: "2px", color: GOLD }} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const ChevronIcon = () => (
  <svg style={{ width: "10px", height: "10px", color: GOLD, flexShrink: 0, transition: "transform .2s" }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Raleway:wght@200;300;400;500;600&display=swap');

        /* ── Marquee ── */
        .ft-marquee-wrap {
          background: ${OBSIDIAN};
          border-top: 1px solid rgba(200,169,106,0.15);
          border-bottom: 1px solid rgba(200,169,106,0.15);
          padding: 18px 0;
          overflow: hidden;
          font-family: 'Raleway', sans-serif;
        }
        .ft-marquee-track {
          display: flex;
          animation: ft-scroll 30s linear infinite;
          white-space: nowrap;
        }
        .ft-marquee-track:hover { animation-play-state: paused; }
        @keyframes ft-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ft-marquee-item {
          display: inline-flex; align-items: center; gap: 0;
          font-size: 12px; font-weight: 500; letter-spacing: 3px;
          text-transform: uppercase; color: ${MUTED};
          padding: 0 28px;
        }
        .ft-marquee-sep {
          width: 5px; height: 5px;
          background: ${GOLD}; transform: rotate(45deg);
          margin-left: 28px; flex-shrink: 0; opacity: 0.5;
        }

        /* ── Footer body ── */
        .ft-body {
          background: ${INK};
          padding: 72px 6vw 56px;
          font-family: 'Raleway', sans-serif;
          position: relative; overflow: hidden;
        }
        /* grid bg */
        .ft-body::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(200,169,106,.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,106,.02) 1px, transparent 1px);
          background-size: 70px 70px;
          pointer-events: none;
        }

        .ft-grid {
          max-width: 1280px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          position: relative; z-index: 1;
        }
        @media (min-width: 640px)  { .ft-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .ft-grid { grid-template-columns: 1.4fr 1fr 1fr 1.2fr; gap: 56px; } }

        /* col headings */
        .ft-col-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px; font-weight: 400;
          color: ${TEXT}; margin-bottom: 14px; letter-spacing: 0.5px;
        }
        .ft-col-divider {
          width: 32px; height: 1px;
          background: linear-gradient(to right, ${GOLD}, transparent);
          margin-bottom: 22px;
        }

        /* logo col */
        .ft-logo {
          width: 68px; height: 68px;
          object-fit: contain; margin-bottom: 20px;
          border-radius: 50%;
          border: 1px solid rgba(200,169,106,0.2);
          filter: brightness(0.9);
        }
        .ft-hours-label {
          font-size: 9px; font-weight: 600; letter-spacing: 3px;
          text-transform: uppercase; color: ${GOLD}; margin-bottom: 6px;
        }
        .ft-hours-val {
          font-size: 12px; font-weight: 300; letter-spacing: 0.5px;
          color: ${MUTED}; line-height: 1.9;
        }

        /* links */
        .ft-link-list { display: flex; flex-direction: column; gap: 10px; list-style: none; padding: 0; margin: 0; }
        .ft-link {
          display: flex; align-items: center; gap: 10px;
          font-size: 12px; font-weight: 300; letter-spacing: 0.5px;
          color: ${MUTED}; text-decoration: none;
          transition: color .25s, gap .25s;
        }
        .ft-link:hover { color: ${TEXT}; gap: 14px; }
        .ft-link:hover svg { transform: translateX(2px); }

        /* contact */
        .ft-contact-item {
          display: flex; align-items: flex-start; gap: 10px;
          margin-bottom: 14px;
        }
        .ft-contact-text {
          font-size: 12px; font-weight: 300; letter-spacing: 0.3px;
          line-height: 1.8; color: ${MUTED};
        }
        .ft-phone-link {
          display: flex; align-items: center; gap: 10px;
          font-size: 12px; font-weight: 400; letter-spacing: 1px;
          color: ${GOLD}; text-decoration: none;
          transition: opacity .2s;
        }
        .ft-phone-link:hover { opacity: 0.75; }

        /* ── Bottom bar ── */
        .ft-bottom {
          background: ${OBSIDIAN};
          border-top: 1px solid rgba(200,169,106,0.1);
          padding: 24px 6vw;
          font-family: 'Raleway', sans-serif;
        }
        .ft-bottom-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; flex-direction: column;
          align-items: center; gap: 16px;
        }

        /* social icons */
        .ft-socials { display: flex; align-items: center; gap: 10px; }
        .ft-social-btn {
          width: 36px; height: 36px;
          border: 1px solid rgba(200,169,106,0.2);
          background: transparent;
          display: flex; align-items: center; justify-content: center;
          color: ${MUTED}; text-decoration: none;
          transition: all .3s;
        }
        .ft-social-btn:hover {
          border-color: ${GOLD}; color: ${GOLD};
          background: rgba(200,169,106,0.06);
          transform: translateY(-2px);
        }
        .ft-social-btn svg { width: 13px; height: 13px; }

        .ft-copyright {
          font-size: 10px; font-weight: 300; letter-spacing: 1px;
          color: rgba(234,229,216,0.3); text-align: center; line-height: 1.8;
        }
        .ft-copyright a {
          color: ${GOLD}; text-decoration: none; transition: opacity .2s;
        }
        .ft-copyright a:hover { opacity: 0.75; }

        /* gold separator line between footer and bottom */
        .ft-gold-line {
          width: 100%; height: 1px;
          background: linear-gradient(to right, transparent, ${GOLD} 30%, ${GOLD} 70%, transparent);
          opacity: 0.2;
        }
      `}</style>

      <div>

        {/* ── Gold Marquee ── */}
        <div className="ft-marquee-wrap">
          <div className="ft-marquee-track">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="ft-marquee-item">
                {item}
                <span className="ft-marquee-sep" />
              </span>
            ))}
          </div>
        </div>

        {/* ── Footer Body ── */}
        <footer className="ft-body">
          <div className="ft-grid">

            {/* Col 1: Logo + Hours */}
            <div>
              <img src={Logo} alt="Dr. SS Dental Care" className="ft-logo" />
              <div className="ft-hours-label">Clinic Hours</div>
              <div className="ft-hours-val">
                Monday – Saturday<br />
                09:00 am – 09:00 pm<br />
                <span style={{ color: "rgba(200,169,106,0.4)" }}>Sunday Closed</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="ft-col-title">Quick Links</h4>
              <div className="ft-col-divider" />
              <ul className="ft-link-list">
                {quickLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="ft-link">
                      <ChevronIcon />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Services */}
            <div>
              <h4 className="ft-col-title">Services</h4>
              <div className="ft-col-divider" />
              <ul className="ft-link-list">
                {services.map((s) => (
                  <li key={s}>
                    <a href="#" className="ft-link">
                      <ChevronIcon />
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact */}
            <div>
              <h4 className="ft-col-title">Contact Us</h4>
              <div className="ft-col-divider" />

              {/* Address */}
              <div className="ft-contact-item" style={{ alignItems: "flex-start" }}>
                <PinIcon />
                <p className="ft-contact-text">
                  #535, Asadel, 23rd Main Road, 22nd Cross Rd, Paringipalya circle, Sector 2, HSR Layout, Bengaluru, Karnataka 560102
                </p>
              </div>

              {/* Phones */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a href="tel:+918884645500" className="ft-phone-link">
                  <PhoneIcon /> +91 8884645500
                </a>
                <a href="tel:+919901291416" className="ft-phone-link">
                  <PhoneIcon /> +91 9901291416
                </a>
              </div>
            </div>

          </div>
        </footer>

        {/* gold line */}
        <div className="ft-gold-line" />

        {/* ── Bottom Bar ── */}
        <div className="ft-bottom">
          <div className="ft-bottom-inner">

            {/* Socials */}
            <div className="ft-socials">
              <a href="#" className="ft-social-btn" aria-label="Facebook">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" className="ft-social-btn" aria-label="Twitter">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a href="#" className="ft-social-btn" aria-label="Instagram">
                <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <p className="ft-copyright">
              © 2025{" "}
              <a href="#">Dr. SS Dental Care &amp; Advanced Dental Implant Center</a>
              . All Rights Reserved. Developed by{" "}
              <a href="#">Satyaprabha Yadav</a>
            </p>

          </div>
        </div>

      </div>
    </>
  );
}