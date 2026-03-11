import { useEffect, useRef, useState } from "react";
import ClinicImg from "../../assets/about-clinic.png";

const GOLD       = "#C8A96A";
const GOLD_LIGHT = "#E8D5A8";
const OBSIDIAN   = "#07070D";
const INK        = "#0E0E18";
const CHARCOAL   = "#181825";
const TEXT       = "#EAE5D8";
const MUTED      = "rgba(234,229,216,0.5)";

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Raleway:wght@200;300;400;500;600&display=swap');

        .why-section {
          background: ${OBSIDIAN};
          padding: 100px 6vw;
          position: relative;
          overflow: hidden;
          font-family: 'Raleway', sans-serif;
        }

        .why-section::before {
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

        .why-section::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 50%; height: 100%;
          background: radial-gradient(ellipse 60% 70% at 20% 50%, rgba(200,169,106,.05) 0%, transparent 65%);
          pointer-events: none;
        }

        .why-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 64px;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 1024px) {
          .why-inner {
            flex-direction: row;
            align-items: center;
            gap: 80px;
          }
        }

        .why-content {
          width: 100%;
          transition: opacity .9s ease, transform .9s ease;
        }
        @media (min-width: 1024px) { .why-content { width: 42%; } }

        .why-content.hidden-left  { opacity: 0; transform: translateX(-60px); }
        .why-content.visible-left { opacity: 1; transform: translateX(0); }

        .why-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: ${GOLD};
          border: 1px solid rgba(200,169,106,0.3);
          padding: 7px 16px;
          margin-bottom: 28px;
          font-family: 'Raleway', sans-serif;
          background: rgba(200,169,106,0.04);
        }
        .why-tag-dot {
          width: 4px; height: 4px;
          background: ${GOLD};
          border-radius: 50%;
          flex-shrink: 0;
        }

        .why-heading-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${MUTED};
          margin-bottom: 8px;
          font-family: 'Raleway', sans-serif;
        }
        .why-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 4.5vw, 58px);
          font-weight: 300;
          line-height: 1.0;
          color: ${TEXT};
          margin-bottom: 4px;
        }
        .why-subheading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(18px, 2.5vw, 28px);
          font-style: italic;
          font-weight: 300;
          color: ${GOLD};
          margin-bottom: 36px;
        }

        .why-stats {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 36px;
        }
        .why-stat {
          padding-right: 32px;
        }
        .why-stat + .why-stat {
          padding-left: 32px;
          border-left: 1px solid rgba(200,169,106,0.2);
        }
        .why-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 300;
          color: ${GOLD};
          line-height: 1;
        }
        .why-stat-label {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${MUTED};
          margin-top: 6px;
          font-family: 'Raleway', sans-serif;
        }

        .why-cards {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .why-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px 22px;
          background: ${INK};
          border: 1px solid rgba(200,169,106,0.1);
          border-left: 2px solid ${GOLD};
          position: relative;
          overflow: hidden;
          transition: border-color .3s;
          cursor: pointer;
        }
        .why-card::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(200,169,106,0.04);
          transform: translateX(-100%);
          transition: transform .35s ease;
        }
        .why-card:hover::before { transform: translateX(0); }
        .why-card:hover { border-color: rgba(200,169,106,0.35); }

        .why-card-icon {
          width: 28px; height: 28px;
          border: 1px solid rgba(200,169,106,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .why-card-icon svg {
          width: 12px; height: 12px;
          color: ${GOLD};
        }
        .why-card-text {
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.3px;
          line-height: 1.9;
          color: ${MUTED};
          font-family: 'Raleway', sans-serif;
        }

        .why-image-col {
          width: 100%;
          display: flex;
          justify-content: center;
          transition: opacity .9s ease .2s, transform .9s ease .2s;
        }
        @media (min-width: 1024px) { .why-image-col { width: 58%; } }

        .why-image-col.hidden-right  { opacity: 0; transform: translateX(60px); }
        .why-image-col.visible-right { opacity: 1; transform: translateX(0); }

        .why-image-wrap {
          position: relative;
          width: 100%;
          max-width: 620px;
        }

        .why-image-wrap::before,
        .why-image-wrap::after {
          content: '';
          position: absolute;
          width: 44px; height: 44px;
          z-index: 2;
          pointer-events: none;
        }
        .why-image-wrap::before {
          top: -8px; left: -8px;
          border-top: 1px solid ${GOLD};
          border-left: 1px solid ${GOLD};
        }
        .why-image-wrap::after {
          bottom: 80px; right: -8px;
          border-bottom: 1px solid ${GOLD};
          border-right: 1px solid ${GOLD};
        }

        .why-image-wrap img {
          width: 100%;
          display: block;
          object-fit: cover;
          filter: grayscale(10%) contrast(1.05);
          transition: transform .5s ease;
        }
        .why-image-wrap:hover img { transform: scale(1.02); }

        .why-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(7,7,13,.55) 0%, transparent 45%);
          pointer-events: none;
        }

        .why-badges {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 3;
          white-space: nowrap;
        }
        .why-badge {
          background: rgba(7,7,13,0.92);
          border: 1px solid rgba(200,169,106,0.25);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 12px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          min-width: 110px;
        }
        .why-badge svg {
          width: 18px; height: 18px;
          color: ${GOLD};
        }
        .why-badge-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: ${TEXT};
          text-align: center;
          font-family: 'Raleway', sans-serif;
        }
      `}</style>

      <section ref={sectionRef} className="why-section">
        <div className="why-inner">

          <div className={`why-content ${visible ? "visible-left" : "hidden-left"}`}>

            <span className="why-tag">
              <span className="why-tag-dot" />
              Award Winning
            </span>

            <p className="why-heading-label">Excellence in</p>
            <h2 className="why-heading">Dental Care</h2>
            <h3 className="why-subheading">Bangalore's Premier Clinic</h3>

            <div className="why-stats">
              <div className="why-stat">
                <div className="why-stat-num">10,000<span style={{ fontSize: "20px" }}>+</span></div>
                <div className="why-stat-label">Successful Cases</div>
              </div>
              <div className="why-stat">
                <div className="why-stat-num">15<span style={{ fontSize: "20px" }}>+</span></div>
                <div className="why-stat-label">Years Experience</div>
              </div>
            </div>

            <div className="why-cards">

              <div className="why-card">
                <div className="why-card-icon">
                  <svg fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="why-card-text">
                  Dr. SS Dental Care embodies the ethos of Customer-friendly, Cost effective and
                  Complete dental solutions.
                </p>
              </div>

              <div className="why-card">
                <div className="why-card-icon">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <p className="why-card-text">
                  With more than 10000 successful cosmetic and implant cases over a decade has
                  defined us as one of the best Dental Clinics in Bangalore.
                </p>
              </div>

            </div>
          </div>

          <div className={`why-image-col ${visible ? "visible-right" : "hidden-right"}`}>
            <div className="why-image-wrap">

              <img src={ClinicImg} alt="Dr. SS Dental Care Clinic" />
              <div className="why-image-overlay" />


              <div className="why-badges">
                <div className="why-badge">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                  </svg>
                  <span className="why-badge-label">Best Dental Clinic</span>
                </div>
                <div className="why-badge">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="why-badge-label">5 Star Rated</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}