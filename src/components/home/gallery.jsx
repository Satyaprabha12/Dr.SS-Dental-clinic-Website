import { useEffect, useRef, useState } from "react";
import gallery1 from "../../assets/gallery1.jpeg";
import gallery2 from "../../assets/gallery2.jpeg";
import gallery3 from "../../assets/gallery3.jpeg";
import gallery4 from "../../assets/gallery4.jpeg";

const GOLD  = "#C8A96A";
const INK   = "#0E0E18";
const TEXT  = "#EAE5D8";
const MUTED = "rgba(234,229,216,0.5)";

const images = [gallery1, gallery2, gallery3, gallery4];

export default function Gallery() {
  const sectionRef                  = useRef(null);
  const [visible, setVisible]       = useState(false);
  const [activeIndex, setActive]    = useState(null);
  const [hoverIndex, setHover]      = useState(null);

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

        .gal-section {
          background: ${INK};
          padding: 100px 6vw;
          position: relative; overflow: hidden;
          font-family: 'Raleway', sans-serif;
        }

        /* gold grid */
        .gal-section::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(200,169,106,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,106,.025) 1px, transparent 1px);
          background-size: 70px 70px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
          pointer-events: none;
        }

        /* top center glow */
        .gal-section::after {
          content: ''; position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 70%; height: 50%;
          background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200,169,106,.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .gal-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }

        /* heading */
        .gal-head {
          text-align: center; margin-bottom: 64px;
          transition: opacity .7s ease, transform .7s ease;
        }
        .gal-head.hidden  { opacity: 0; transform: translateY(30px); }
        .gal-head.visible { opacity: 1; transform: translateY(0); }

        .gal-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-size: 9px; font-weight: 600; letter-spacing: 4px;
          text-transform: uppercase; color: ${GOLD}; margin-bottom: 16px;
        }
        .gal-eyebrow::before, .gal-eyebrow::after { content: ''; width: 28px; height: 1px; background: ${GOLD}; }

        .gal-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(30px, 4vw, 50px); font-weight: 300;
          color: ${TEXT}; margin-bottom: 12px; line-height: 1.1;
        }
        .gal-title em { font-style: italic; color: ${GOLD}; }

        .gal-sub {
          font-size: 12px; font-weight: 300; letter-spacing: 1px;
          color: ${MUTED}; font-family: 'Raleway', sans-serif;
        }

        .gal-divider { display: flex; align-items: center; justify-content: center; gap: 12px; margin: 16px 0 0; }
        .gal-dl { width: 44px; height: 1px; background: linear-gradient(to right, transparent, ${GOLD}); }
        .gal-dl.rev { background: linear-gradient(to left, transparent, ${GOLD}); }
        .gal-dd { width: 5px; height: 5px; background: ${GOLD}; transform: rotate(45deg); flex-shrink: 0; }

        /* grid */
        .gal-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 640px) { .gal-grid { grid-template-columns: 1fr 1fr; } }

        /* card */
        .gal-card {
          position: relative; cursor: pointer;
          border: 1px solid rgba(200,169,106,0.1);
          overflow: hidden;
          transition: border-color .35s, transform .5s ease;
          background: #07070D;
        }
        .gal-card.active { transform: translateY(-6px); border-color: rgba(200,169,106,0.45); }

        /* gold corner brackets */
        .gal-card::before {
          content: ''; position: absolute;
          top: 10px; left: 10px;
          width: 28px; height: 28px;
          border-top: 1px solid ${GOLD}; border-left: 1px solid ${GOLD};
          z-index: 3; pointer-events: none;
          opacity: 0; transition: opacity .35s;
        }
        .gal-card::after {
          content: ''; position: absolute;
          bottom: 10px; right: 10px;
          width: 28px; height: 28px;
          border-bottom: 1px solid ${GOLD}; border-right: 1px solid ${GOLD};
          z-index: 3; pointer-events: none;
          opacity: 0; transition: opacity .35s;
        }
        .gal-card:hover::before,
        .gal-card:hover::after,
        .gal-card.active::before,
        .gal-card.active::after { opacity: 1; }

        /* image */
        .gal-img {
          width: 100%; height: 280px;
          object-fit: cover; display: block;
          transition: transform .6s ease, filter .5s ease;
          filter: grayscale(60%) brightness(0.75);
        }
        .gal-card:hover .gal-img,
        .gal-card.active .gal-img {
          transform: scale(1.06);
          filter: grayscale(0%) brightness(1);
        }

        /* overlay on inactive */
        .gal-overlay {
          position: absolute; inset: 0;
          background: rgba(7,7,13,0.35);
          transition: opacity .4s;
          pointer-events: none;
        }
        .gal-card:hover .gal-overlay,
        .gal-card.active .gal-overlay { opacity: 0; }

        /* card index label */
        .gal-num {
          position: absolute; top: 14px; right: 14px;
          font-family: 'Playfair Display', serif;
          font-size: 11px; font-weight: 300;
          color: rgba(200,169,106,0.5);
          letter-spacing: 1px; z-index: 4;
        }

        /* bottom gold bar on active */
        .gal-bar {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, ${GOLD}, transparent);
          transform: scaleX(0);
          transition: transform .4s ease;
          z-index: 4;
        }
        .gal-card:hover .gal-bar,
        .gal-card.active .gal-bar { transform: scaleX(1); }

        /* entrance animation */
        .gal-card {
          opacity: 0; transform: translateY(40px);
          transition: opacity .7s ease, transform .7s ease, border-color .35s;
        }
        .gal-card.show { opacity: 1; transform: translateY(0); }
        .gal-card.active.show { transform: translateY(-6px); }
      `}</style>

      <section ref={sectionRef} className="gal-section">
        <div className="gal-inner">

          {/* Heading */}
          <div className={`gal-head ${visible ? "visible" : "hidden"}`}>
            <div className="gal-eyebrow">Our Work</div>
            <h2 className="gal-title">Smiles That <em>Say It All</em></h2>
            <p className="gal-sub">From dull days to bright smiles — see happy changes</p>
            <div className="gal-divider">
              <div className="gal-dl rev" />
              <div className="gal-dd" />
              <div className="gal-dl" />
            </div>
          </div>

          {/* Grid */}
          <div className="gal-grid">
            {images.map((img, index) => (
              <div
                key={index}
                className={`gal-card ${visible ? "show" : ""} ${activeIndex === index ? "active" : ""}`}
                style={{ transitionDelay: `${index * 120}ms` }}
                onClick={() => handleToggle(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(null)}
              >
                <span className="gal-num">0{index + 1}</span>
                <img src={img} alt={`Gallery ${index + 1}`} className="gal-img" />
                <div className="gal-overlay" />
                <div className="gal-bar" />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}