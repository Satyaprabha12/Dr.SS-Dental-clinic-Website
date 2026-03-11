import { useEffect, useRef, useState } from "react";
import t1 from "../../assets/transformation1.jpeg";
import t2 from "../../assets/transformation2.jpeg";
import t3 from "../../assets/transformation3.jpeg";
import t4 from "../../assets/transformation4.jpeg";

const GOLD  = "#C8A96A";
const INK   = "#0E0E18";
const TEXT  = "#EAE5D8";
const MUTED = "rgba(234,229,216,0.5)";

const images = [t1, t2, t3, t4];

export default function Transformation() {
  const sectionRef              = useRef(null);
  const [visible, setVisible]   = useState(false);
  const [activeIndex, setActive] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleToggle = (i) => setActive(activeIndex === i ? null : i);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Raleway:wght@200;300;400;500;600&display=swap');

        .tf-section {
          background: #07070D;
          padding: 100px 6vw;
          position: relative; overflow: hidden;
          font-family: 'Raleway', sans-serif;
        }
        .tf-section::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(200,169,106,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,106,.025) 1px, transparent 1px);
          background-size: 70px 70px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
          pointer-events: none;
        }
        .tf-section::after {
          content: ''; position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 70%; height: 50%;
          background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200,169,106,.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .tf-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }

        /* heading */
        .tf-head {
          text-align: center; margin-bottom: 64px;
          transition: opacity .7s ease, transform .7s ease;
        }
        .tf-head.hidden  { opacity: 0; transform: translateY(30px); }
        .tf-head.visible { opacity: 1; transform: translateY(0); }

        .tf-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-size: 9px; font-weight: 600; letter-spacing: 4px;
          text-transform: uppercase; color: ${GOLD}; margin-bottom: 16px;
        }
        .tf-eyebrow::before, .tf-eyebrow::after { content: ''; width: 28px; height: 1px; background: ${GOLD}; }

        .tf-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(30px, 4vw, 50px); font-weight: 300;
          color: ${TEXT}; margin-bottom: 12px; line-height: 1.1;
        }
        .tf-title em { font-style: italic; color: ${GOLD}; }

        .tf-sub {
          font-size: 12px; font-weight: 300; letter-spacing: 1px; color: ${MUTED};
        }

        .tf-divider { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 16px; }
        .tf-dl { width: 44px; height: 1px; background: linear-gradient(to right, transparent, ${GOLD}); }
        .tf-dl.rev { background: linear-gradient(to left, transparent, ${GOLD}); }
        .tf-dd { width: 5px; height: 5px; background: ${GOLD}; transform: rotate(45deg); flex-shrink: 0; }

        /* grid */
        .tf-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 640px) { .tf-grid { grid-template-columns: 1fr 1fr; } }

        /* card */
        .tf-card {
          position: relative; overflow: hidden; cursor: pointer;
          border: 1px solid rgba(200,169,106,0.1);
          background: #07070D;
          opacity: 0;
          transition: opacity .7s ease, transform .7s ease, border-color .35s;
        }
        .tf-card.from-left  { transform: translateX(-60px); }
        .tf-card.from-right { transform: translateX( 60px); }
        .tf-card.show { opacity: 1; transform: translateX(0) translateY(0) !important; }
        .tf-card.active.show { transform: translateY(-6px) !important; border-color: rgba(200,169,106,0.45); }

        /* gold corners appear on hover/active */
        .tf-card::before {
          content: ''; position: absolute;
          top: 10px; left: 10px;
          width: 28px; height: 28px;
          border-top: 1px solid ${GOLD}; border-left: 1px solid ${GOLD};
          z-index: 3; pointer-events: none;
          opacity: 0; transition: opacity .35s;
        }
        .tf-card::after {
          content: ''; position: absolute;
          bottom: 10px; right: 10px;
          width: 28px; height: 28px;
          border-bottom: 1px solid ${GOLD}; border-right: 1px solid ${GOLD};
          z-index: 3; pointer-events: none;
          opacity: 0; transition: opacity .35s;
        }
        .tf-card:hover::before, .tf-card:hover::after,
        .tf-card.active::before, .tf-card.active::after { opacity: 1; }

        /* image */
        .tf-img {
          width: 100%; height: 420px;
          object-fit: cover; display: block;
          transition: transform .6s ease, filter .5s ease;
          filter: brightness(0.8) contrast(1.05);
        }
        .tf-card:hover .tf-img,
        .tf-card.active .tf-img {
          transform: scale(1.05);
          filter: brightness(1) contrast(1.05);
        }

        /* dark vignette overlay */
        .tf-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(7,7,13,.5) 0%, transparent 50%);
          pointer-events: none;
          transition: opacity .4s;
        }
        .tf-card:hover .tf-overlay,
        .tf-card.active .tf-overlay { opacity: 0.3; }

        /* card number */
        .tf-num {
          position: absolute; top: 14px; right: 14px;
          font-family: 'Playfair Display', serif;
          font-size: 11px; font-weight: 300;
          color: rgba(200,169,106,0.5); letter-spacing: 1px; z-index: 4;
        }

        /* gold bottom bar */
        .tf-bar {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, transparent, ${GOLD}, transparent);
          transform: scaleX(0); transition: transform .4s ease; z-index: 4;
        }
        .tf-card:hover .tf-bar,
        .tf-card.active .tf-bar { transform: scaleX(1); }

        /* bottom label on active */
        .tf-label {
          position: absolute; bottom: 16px; left: 20px;
          font-size: 9px; font-weight: 600; letter-spacing: 3px;
          text-transform: uppercase; color: ${GOLD};
          font-family: 'Raleway', sans-serif;
          opacity: 0; transform: translateY(8px);
          transition: opacity .35s, transform .35s;
          z-index: 4;
        }
        .tf-card:hover .tf-label,
        .tf-card.active .tf-label { opacity: 1; transform: translateY(0); }
      `}</style>

      <section ref={sectionRef} className="tf-section">
        <div className="tf-inner">

          {/* Heading */}
          <div className={`tf-head ${visible ? "visible" : "hidden"}`}>
            <div className="tf-eyebrow">Before &amp; After</div>
            <h2 className="tf-title">See The <em>Transformation</em></h2>
            <p className="tf-sub">Stunning results that showcase the life changing impact</p>
            <div className="tf-divider">
              <div className="tf-dl rev" /><div className="tf-dd" /><div className="tf-dl" />
            </div>
          </div>

          {/* Grid */}
          <div className="tf-grid">
            {images.map((img, index) => (
              <div
                key={index}
                className={`tf-card ${index % 2 === 0 ? "from-left" : "from-right"} ${visible ? "show" : ""} ${activeIndex === index ? "active" : ""}`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onClick={() => handleToggle(index)}
              >
                <span className="tf-num">0{index + 1}</span>
                <img src={img} alt={`Transformation ${index + 1}`} className="tf-img" />
                <div className="tf-overlay" />
                <div className="tf-bar" />
                <span className="tf-label">View Case</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}