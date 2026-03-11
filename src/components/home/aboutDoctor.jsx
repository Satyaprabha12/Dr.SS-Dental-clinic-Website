import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DrShahul from "../../assets/dr-shahul.png";
import QualIcon1 from "../../assets/clinic-icon.png";
import QualIcon2 from "../../assets/implant-icon.png";

gsap.registerPlugin(ScrollTrigger);

// ── Design tokens (identical to Navbar & Hero) ───────────────────────────────
const GOLD        = "#C8A96A";
const GOLD_LIGHT  = "#E8D5A8";
const OBSIDIAN    = "#07070D";
const INK         = "#0E0E18";
const CHARCOAL    = "#181825";
const TEXT        = "#EAE5D8";
const MUTED       = "rgba(234,229,216,0.5)";

export default function AboutDoctor() {
  const sectionRef  = useRef(null);
  const imageRef    = useRef(null);
  const badgeRef    = useRef(null);
  const tagRef      = useRef(null);
  const headingRef  = useRef(null);
  const dividerRef  = useRef(null);
  const descRef     = useRef(null);
  const cardsRef    = useRef(null);
  const socialsRef  = useRef(null);
  const btnRef      = useRef(null);
  const lineRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Decorative vertical line draws down
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
        }
      );

      // Image slides in from left
      gsap.fromTo(imageRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
        }
      );

      // Badge pops in
      gsap.fromTo(badgeRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.5,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
        }
      );

      // Right side stagger
      gsap.fromTo(
        [tagRef.current, headingRef.current, dividerRef.current, descRef.current, cardsRef.current, socialsRef.current, btnRef.current],
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Raleway:wght@200;300;400;500;600&display=swap');

        .about-section {
          background: ${INK};
          padding: 100px 6vw;
          position: relative;
          overflow: hidden;
          font-family: 'Raleway', sans-serif;
        }

        /* subtle background grid */
        .about-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(200,169,106,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,106,.025) 1px, transparent 1px);
          background-size: 70px 70px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
          pointer-events: none;
        }

        /* radial gold glow */
        .about-section::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 50%; height: 100%;
          background: radial-gradient(ellipse 60% 70% at 80% 40%, rgba(200,169,106,.05) 0%, transparent 65%);
          pointer-events: none;
        }

        .about-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 64px;
          position: relative;
          z-index: 1;
        }

        @media (min-width: 1024px) {
          .about-inner {
            flex-direction: row;
            align-items: center;
            gap: 80px;
          }
        }

        /* ── LEFT: image side ── */
        .about-image-col {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (min-width: 1024px) {
          .about-image-col { width: 45%; }
        }

        .about-image-wrap {
          position: relative;
          width: 340px;
          max-width: 100%;
        }

        @media (min-width: 640px)  { .about-image-wrap { width: 400px; } }
        @media (min-width: 1024px) { .about-image-wrap { width: 460px; } }

        /* gold corner brackets */
        .about-image-wrap::before,
        .about-image-wrap::after {
          content: '';
          position: absolute;
          width: 40px; height: 40px;
          z-index: 2;
          pointer-events: none;
        }
        .about-image-wrap::before {
          top: -8px; left: -8px;
          border-top: 1px solid ${GOLD};
          border-left: 1px solid ${GOLD};
        }
        .about-image-wrap::after {
          bottom: 60px; right: -8px;
          border-bottom: 1px solid ${GOLD};
          border-right: 1px solid ${GOLD};
        }

        .about-image-wrap img {
          width: 100%;
          display: block;
          object-fit: cover;
          filter: grayscale(15%) contrast(1.05);
        }

        /* image overlay — dark vignette bottom */
        .about-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(7,7,13,.45) 0%, transparent 50%);
          pointer-events: none;
        }

        /* gold frame line on left of image */
        .about-image-line {
          position: absolute;
          left: -20px; top: 10%; bottom: 10%;
          width: 1px;
          background: linear-gradient(to bottom, transparent, ${GOLD} 30%, ${GOLD} 70%, transparent);
        }

        /* experience badge */
        .about-badge {
          position: absolute;
          bottom: 20px; right: -16px;
          background: ${OBSIDIAN};
          border: 1px solid rgba(200,169,106,0.3);
          padding: 18px 24px;
          text-align: center;
          z-index: 3;
          box-shadow: 0 16px 40px rgba(0,0,0,0.5);
        }
        .about-badge-num {
          font-family: 'Playfair Display', serif;
          font-size: 40px;
          font-weight: 300;
          color: ${GOLD};
          line-height: 1;
        }
        .about-badge-label {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${MUTED};
          margin-top: 6px;
        }

        /* ── RIGHT: content side ── */
        .about-content-col {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        @media (min-width: 1024px) { .about-content-col { width: 55%; } }

        /* eyebrow tag */
        .about-tag {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: ${GOLD};
          font-family: 'Raleway', sans-serif;
        }
        .about-tag::before {
          content: '';
          width: 30px; height: 1px;
          background: ${GOLD};
          flex-shrink: 0;
        }

        /* heading */
        .about-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 300;
          line-height: 1.1;
          color: ${TEXT};
          margin-bottom: 24px;
        }
        .about-heading em {
          font-style: italic;
          color: ${GOLD};
        }

        /* gold divider */
        .about-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
        }
        .about-divider-dot {
          width: 6px; height: 6px;
          background: ${GOLD};
          transform: rotate(45deg);
          flex-shrink: 0;
        }
        .about-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, ${GOLD}, transparent);
        }

        /* description */
        .about-desc {
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.5px;
          line-height: 2;
          color: ${MUTED};
          margin-bottom: 36px;
          max-width: 500px;
          font-family: 'Raleway', sans-serif;
        }

        /* qualification cards */
        .about-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: 36px;
        }
        @media (min-width: 480px) {
          .about-cards { grid-template-columns: 1fr 1fr; }
        }

        .about-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          background: ${OBSIDIAN};
          border: 1px solid rgba(200,169,106,0.12);
          border-left: 2px solid ${GOLD};
          transition: border-color .3s, background .3s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .about-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(200,169,106,0.04);
          transform: translateX(-100%);
          transition: transform .35s ease;
        }
        .about-card:hover::before { transform: translateX(0); }
        .about-card:hover { border-color: rgba(200,169,106,0.4); }

        .about-card img {
          width: 36px; height: 36px;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.7;
          flex-shrink: 0;
        }
        .about-card-title {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: ${TEXT};
          font-family: 'Raleway', sans-serif;
        }
        .about-card-sub {
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 1px;
          color: ${MUTED};
          margin-top: 2px;
          font-family: 'Raleway', sans-serif;
        }

        /* socials */
        .about-socials {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
        }
        .about-social-btn {
          width: 38px; height: 38px;
          border: 1px solid rgba(200,169,106,0.2);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${MUTED};
          text-decoration: none;
          transition: all .3s;
          cursor: pointer;
        }
        .about-social-btn:hover {
          border-color: ${GOLD};
          color: ${GOLD};
          background: rgba(200,169,106,0.06);
          transform: translateY(-2px);
        }
        .about-social-btn svg {
          width: 14px; height: 14px;
        }

        /* CTA button */
        .about-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 36px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${OBSIDIAN};
          background: ${GOLD};
          text-decoration: none;
          border: none;
          cursor: pointer;
          font-family: 'Raleway', sans-serif;
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          transition: opacity .25s, transform .25s;
          width: max-content;
          position: relative;
          overflow: hidden;
        }
        .about-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: ${GOLD_LIGHT};
          transform: translateX(-100%);
          transition: transform .35s ease;
        }
        .about-btn:hover { transform: translateY(-2px); }
        .about-btn:hover::before { transform: translateX(0); }
        .about-btn span { position: relative; z-index: 1; display: flex; align-items: center; gap: 12px; }
        .about-btn svg { width: 14px; height: 14px; transition: transform .3s; }
        .about-btn:hover svg { transform: translateX(4px); }
      `}</style>

      <section ref={sectionRef} className="about-section">
        <div className="about-inner">

          {/* ── LEFT: Doctor Image ── */}
          <div ref={imageRef} className="about-image-col">
            <div className="about-image-wrap">

              {/* left gold line */}
              <div ref={lineRef} className="about-image-line" />

              <img src={DrShahul} alt="Dr. Shahul Hameed Sattar" />
              <div className="about-image-overlay" />

              {/* Experience badge */}
              <div ref={badgeRef} className="about-badge">
                <div className="about-badge-num">15<span style={{ fontSize: "20px" }}>+</span></div>
                <div className="about-badge-label">Years of<br />Experience</div>
              </div>

            </div>
          </div>

          {/* ── RIGHT: Content ── */}
          <div className="about-content-col">

            {/* Tag */}
            <p ref={tagRef} className="about-tag">About Dr. Shahul</p>

            {/* Heading */}
            <h2 ref={headingRef} className="about-heading">
              Expert Dental Care from a<br />
              <em>Qualified</em> Professional
            </h2>

            {/* Divider */}
            <div ref={dividerRef} className="about-divider">
              <div className="about-divider-dot" />
              <div className="about-divider-line" />
            </div>

            {/* Description */}
            <p ref={descRef} className="about-desc">
              Dr. Shahul Hameed Sattar is a highly qualified dental professional
              specializing in Prosthodontics and Implantology with extensive
              training from prestigious institutions worldwide.
            </p>

            {/* Qualification Cards */}
            <div ref={cardsRef} className="about-cards">
              <div className="about-card">
                <img src={QualIcon1} alt="BDS MDS" />
                <div>
                  <p className="about-card-title">BDS, MDS</p>
                  <p className="about-card-sub">(Prosthodontics)</p>
                </div>
              </div>
              <div className="about-card">
                <img src={QualIcon2} alt="Fellow Diplomate" />
                <div>
                  <p className="about-card-title">Fellow &amp; Diplomate</p>
                  <p className="about-card-sub">Implantology-BOCI</p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div ref={socialsRef} className="about-socials">
              <a href="#" className="about-social-btn" aria-label="Facebook">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" className="about-social-btn" aria-label="Instagram">
                <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a href="#" className="about-social-btn" aria-label="Twitter">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a href="#" className="about-social-btn" aria-label="LinkedIn">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>

            {/* Learn More Button */}
            <a ref={btnRef} href="#" className="about-btn">
              <span>
                Learn More
                <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>

          </div>
        </div>
      </section>
    </>
  );
}