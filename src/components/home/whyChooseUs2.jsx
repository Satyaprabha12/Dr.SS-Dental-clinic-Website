import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhyChooseImg from "../../assets/why-choose.png";
import Icon1 from "../../assets/gennext.png";
import Icon2 from "../../assets/success.png";
import Icon3 from "../../assets/exp.png";
import Icon4 from "../../assets/sterilization.png";

gsap.registerPlugin(ScrollTrigger);

const GOLD  = "#C8A96A";
const INK   = "#0E0E18";
const TEXT  = "#EAE5D8";
const MUTED = "rgba(234,229,216,0.5)";

const cards = [
  { id: "top-left",     num: "01", title: "GENNEXT EQUIPMENT",    desc: "We have updated ourselves with the new generation technology to provide the best in dentistry",  from: { x: -100, y: -100 }, icon: Icon1, alt: "Gennext Equipment"    },
  { id: "top-right",    num: "02", title: "SUCCESS RATE",         desc: "We have completed more than 10000 Successful Cosmetic and Implant Cases",                        from: { x:  100, y: -100 }, icon: Icon2, alt: "Success Rate"         },
  { id: "bottom-left",  num: "03", title: "EXPERIENCED DENTISTS", desc: "We have a team of experienced dentists who constantly upgrade and update their skills",           from: { x: -100, y:  100 }, icon: Icon3, alt: "Experienced Dentists" },
  { id: "bottom-right", num: "04", title: "STERILIZATION",        desc: "We use latest sterilisation protocol to match with the international standards",                 from: { x:  100, y:  100 }, icon: Icon4, alt: "Sterilization"        },
];

export default function WhyChooseUs2() {
  const sectionRef = useRef(null);
  const cardRefs   = useRef([]);
  const centerRef  = useRef(null);
  const headRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" } }
      );
      cardRefs.current.forEach((card, i) => {
        gsap.fromTo(card,
          { x: cards[i].from.x, y: cards[i].from.y, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: i * 0.15,
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" } }
        );
      });
      gsap.fromTo(centerRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Raleway:wght@200;300;400;500;600&display=swap');

        .why2-section {
          background: #07070D;
          padding: 100px 6vw;
          position: relative; overflow: hidden;
          font-family: 'Raleway', sans-serif;
        }
        .why2-section::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(200,169,106,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,106,.025) 1px, transparent 1px);
          background-size: 70px 70px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
          pointer-events: none;
        }
        .why2-section::after {
          content: ''; position: absolute;
          top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 600px; height: 600px;
          background: radial-gradient(ellipse at center, rgba(200,169,106,.06) 0%, transparent 65%);
          pointer-events: none;
        }
        .why2-inner { max-width: 1280px; margin: 0 auto; position: relative; z-index: 1; }

        .why2-head { text-align: center; margin-bottom: 72px; }
        .why2-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-size: 9px; font-weight: 600; letter-spacing: 4px;
          text-transform: uppercase; color: ${GOLD}; margin-bottom: 16px;
        }
        .why2-eyebrow::before, .why2-eyebrow::after { content: ''; width: 28px; height: 1px; background: ${GOLD}; }
        .why2-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4vw, 52px); font-weight: 300;
          color: ${TEXT}; margin-bottom: 20px; line-height: 1.1;
        }
        .why2-title em { font-style: italic; color: ${GOLD}; }
        .why2-divider { display: flex; align-items: center; justify-content: center; gap: 12px; }
        .why2-dl { width: 56px; height: 1px; background: linear-gradient(to right, transparent, ${GOLD}); }
        .why2-dl.rev { background: linear-gradient(to left, transparent, ${GOLD}); }
        .why2-dd { width: 6px; height: 6px; background: ${GOLD}; transform: rotate(45deg); flex-shrink: 0; }

        .why2-grid { display: grid; grid-template-columns: 1fr; gap: 24px; align-items: center; }
        @media (min-width: 1024px) { .why2-grid { grid-template-columns: 1fr auto 1fr; gap: 40px; } }
        .why2-col { display: flex; flex-direction: column; gap: 20px; }

        .why2-card {
          background: ${INK};
          border: 1px solid rgba(200,169,106,0.1);
          border-left: 2px solid ${GOLD};
          padding: 28px 24px;
          position: relative; overflow: hidden; cursor: pointer;
          transition: border-color .35s, transform .35s;
        }
        .why2-card::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(200,169,106,0.04);
          transform: translateX(-100%); transition: transform .4s ease;
        }
        .why2-card:hover { transform: translateY(-5px); border-color: rgba(200,169,106,0.4); }
        .why2-card:hover::before { transform: translateX(0); }
        .why2-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, ${GOLD}, transparent);
          transform: scaleX(0); transition: transform .4s ease;
        }
        .why2-card:hover::after { transform: scaleX(1); }

        .why2-card-num {
          position: absolute; top: 16px; right: 16px;
          font-family: 'Playfair Display', serif; font-size: 11px;
          font-weight: 300; color: rgba(200,169,106,0.2);
        }
        .why2-icon-box {
          width: 56px; height: 56px;
          border: 1px solid rgba(200,169,106,0.25);
          background: rgba(200,169,106,0.06);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px;
          transition: background .3s, border-color .3s;
        }
        .why2-card:hover .why2-icon-box { background: rgba(200,169,106,0.12); border-color: rgba(200,169,106,0.5); }
       .why2-icon-box img {
  width: 34px; height: 34px; object-fit: contain;
  
}
        .why2-card:hover
        .why2-card-title {
          font-size: 10px; font-weight: 600; letter-spacing: 3px;
          text-transform: uppercase; color: ${GOLD}; margin-bottom: 10px;
        }
        .why2-card-desc {
          font-size: 12px; font-weight: 300; line-height: 1.9; color: ${MUTED};
        }

        .why2-center { display: flex; justify-content: center; align-items: center; }
        .why2-center-wrap { position: relative; width: 260px; height: 260px; flex-shrink: 0; }
        @media (min-width: 640px) { .why2-center-wrap { width: 300px; height: 300px; } }

        .why2-ring-outer {
          position: absolute; inset: -14px; border-radius: 50%;
          border: 1px solid rgba(200,169,106,0.2);
          animation: why2-spin 18s linear infinite;
        }
        .why2-ring-inner {
          position: absolute; inset: -5px; border-radius: 50%;
          border: 1px dashed rgba(200,169,106,0.15);
        }
        .why2-dot {
          position: absolute; width: 7px; height: 7px;
          background: ${GOLD}; border-radius: 50%; transform: translate(-50%, -50%);
        }
        .why2-dot.t { top: 0;    left: 50%; }
        .why2-dot.r { top: 50%;  left: 100%; }
        .why2-dot.b { top: 100%; left: 50%; }
        .why2-dot.l { top: 50%;  left: 0; }
        @keyframes why2-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .why2-circle {
          width: 100%; height: 100%; border-radius: 50%; overflow: hidden;
          border: 1px solid rgba(200,169,106,0.3); position: relative;
        }
        .why2-circle img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          filter: grayscale(15%) contrast(1.05);
        }
        .why2-circle::after {
          content: ''; position: absolute; inset: 0; border-radius: 50%;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(7,7,13,.4) 100%);
          pointer-events: none;
        }
      `}</style>

      <section ref={sectionRef} className="why2-section">
        <div className="why2-inner">

          {/* Heading */}
          <div ref={headRef} className="why2-head">
            <div className="why2-eyebrow">Our Advantages</div>
            <h2 className="why2-title">Why <em>Choose</em> Us</h2>
            <div className="why2-divider">
              <div className="why2-dl rev" />
              <div className="why2-dd" />
              <div className="why2-dl" />
            </div>
          </div>

          {/* Grid */}
          <div className="why2-grid">

            {/* Left: cards 0, 2 */}
            <div className="why2-col">
              {[0, 2].map((i) => (
                <div key={cards[i].id} ref={(el) => (cardRefs.current[i] = el)} className="why2-card">
                  <span className="why2-card-num">{cards[i].num}</span>
                  <div className="why2-icon-box"><img src={cards[i].icon} alt={cards[i].alt} /></div>
                  <h3 className="why2-card-title">{cards[i].title}</h3>
                  <p className="why2-card-desc">{cards[i].desc}</p>
                </div>
              ))}
            </div>

            {/* Center */}
            <div ref={centerRef} className="why2-center">
              <div className="why2-center-wrap">
                <div className="why2-ring-outer">
                  <span className="why2-dot t" /><span className="why2-dot r" />
                  <span className="why2-dot b" /><span className="why2-dot l" />
                </div>
                <div className="why2-ring-inner" />
                <div className="why2-circle">
                  <img src={WhyChooseImg} alt="Why Choose Us" />
                </div>
              </div>
            </div>

            {/* Right: cards 1, 3 */}
            <div className="why2-col">
              {[1, 3].map((i) => (
                <div key={cards[i].id} ref={(el) => (cardRefs.current[i] = el)} className="why2-card">
                  <span className="why2-card-num">{cards[i].num}</span>
                  <div className="why2-icon-box"><img src={cards[i].icon} alt={cards[i].alt} /></div>
                  <h3 className="why2-card-title">{cards[i].title}</h3>
                  <p className="why2-card-desc">{cards[i].desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}