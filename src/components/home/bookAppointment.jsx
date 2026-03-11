import { useEffect, useRef, useState } from "react";
import ClinicPhoto from "../../assets/clinic-photo.jpeg";

const GOLD       = "#C8A96A";
const GOLD_LIGHT = "#E8D5A8";
const OBSIDIAN   = "#07070D";
const INK        = "#0E0E18";
const CHARCOAL   = "#181825";
const TEXT       = "#EAE5D8";
const MUTED      = "rgba(234,229,216,0.5)";

export default function BookAppointment() {
  const sectionRef            = useRef(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm]       = useState({ name: "", phone: "", message: "" });
  const [focused, setFocused] = useState({});
  const [hover, setHover]     = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    alert(`Thank you ${form.name}! We will contact you shortly.`);
    setForm({ name: "", phone: "", message: "" });
  };

  const fieldStyle = (name) => ({
    width: "100%",
    background: "rgba(200,169,106,0.04)",
    border: `1px solid ${focused[name] ? "rgba(200,169,106,0.5)" : "rgba(200,169,106,0.12)"}`,
    borderRadius: 0,
    padding: "14px 20px",
    fontSize: "12px",
    fontWeight: 300,
    letterSpacing: "0.5px",
    color: TEXT,
    outline: "none",
    transition: "border-color .3s, background .3s",
    fontFamily: "'Raleway', sans-serif",
    boxSizing: "border-box",
    boxShadow: focused[name] ? "0 0 0 1px rgba(200,169,106,0.15)" : "none",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Raleway:wght@200;300;400;500;600&display=swap');

        .ba-section {
          background: ${CHARCOAL};
          position: relative; overflow: hidden;
          font-family: 'Raleway', sans-serif;
        }

        .ba-section::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(200,169,106,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,106,.025) 1px, transparent 1px);
          background-size: 70px 70px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
          pointer-events: none;
        }

        .ba-banner {
          background: ${OBSIDIAN};
          border-bottom: 1px solid rgba(200,169,106,0.1);
          padding: 56px 6vw 52px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .ba-banner::after {
          content: ''; position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 60%; height: 100%;
          background: radial-gradient(ellipse 80% 100% at 50% 0%, rgba(200,169,106,.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .ba-banner-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-size: 9px; font-weight: 600; letter-spacing: 4px;
          text-transform: uppercase; color: ${GOLD}; margin-bottom: 16px;
          position: relative; z-index: 1;
        }
        .ba-banner-eyebrow::before,
        .ba-banner-eyebrow::after { content: ''; width: 28px; height: 1px; background: ${GOLD}; }

        .ba-banner-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 3.5vw, 46px); font-weight: 300;
          color: ${TEXT}; line-height: 1.2;
          max-width: 700px; margin: 0 auto;
          position: relative; z-index: 1;
        }
        .ba-banner-title em { font-style: italic; color: ${GOLD}; }

        
        .ba-card {
          margin: 0 4vw;
          background: ${INK};
          border: 1px solid rgba(200,169,106,0.12);
          border-top: 2px solid ${GOLD};
          padding: 56px 6vw 64px;
          position: relative; z-index: 1;
          transform: translateY(-32px);
        }
        /* gold corner brackets */
        .ba-card::before {
          content: ''; position: absolute;
          bottom: 16px; right: 16px;
          width: 32px; height: 32px;
          border-bottom: 1px solid rgba(200,169,106,0.3);
          border-right: 1px solid rgba(200,169,106,0.3);
          pointer-events: none;
        }

        .ba-card-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; flex-direction: column; gap: 48px; align-items: center;
        }
        @media (min-width: 1024px) { .ba-card-inner { flex-direction: row; gap: 64px; } }

        
        .ba-img-col {
          width: 100%;
          transition: opacity .9s ease .3s, transform .9s ease .3s;
        }
        @media (min-width: 1024px) { .ba-img-col { width: 48%; } }
        .ba-img-col.hidden  { opacity: 0; transform: translateX(-50px); }
        .ba-img-col.visible { opacity: 1; transform: translateX(0); }

        .ba-img-wrap {
          position: relative;
        }
      
        .ba-img-wrap::before {
          content: ''; position: absolute;
          top: -8px; left: -8px;
          width: 36px; height: 36px;
          border-top: 1px solid ${GOLD}; border-left: 1px solid ${GOLD};
          z-index: 2; pointer-events: none;
        }
        .ba-img-wrap::after {
          content: ''; position: absolute;
          bottom: -8px; right: -8px;
          width: 36px; height: 36px;
          border-bottom: 1px solid ${GOLD}; border-right: 1px solid ${GOLD};
          z-index: 2; pointer-events: none;
        }
        .ba-img-wrap img {
          width: 100%; display: block; object-fit: cover;
          filter: grayscale(10%) contrast(1.05);
        }
        .ba-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(7,7,13,.4) 0%, transparent 50%);
          pointer-events: none;
        }

        
        .ba-form-col {
          width: 100%;
          transition: opacity .9s ease .4s, transform .9s ease .4s;
        }
        @media (min-width: 1024px) { .ba-form-col { width: 52%; } }
        .ba-form-col.hidden  { opacity: 0; transform: translateX(50px); }
        .ba-form-col.visible { opacity: 1; transform: translateX(0); }

        .ba-phone-line {
          font-size: 12px; font-weight: 300; letter-spacing: 0.5px;
          color: ${MUTED}; margin-bottom: 28px;
          font-family: 'Raleway', sans-serif;
        }
        .ba-phone-link {
          color: ${GOLD}; font-weight: 600; text-decoration: none;
          letter-spacing: 1px; transition: opacity .2s;
        }
        .ba-phone-link:hover { opacity: 0.75; }

        .ba-fields { display: flex; flex-direction: column; gap: 14px; }

        ::placeholder { color: rgba(234,229,216,0.3); font-family: 'Raleway', sans-serif; font-size: 12px; letter-spacing: 0.5px; }

        .ba-submit {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 40px;
          font-size: 9px; font-weight: 600; letter-spacing: 3px;
          text-transform: uppercase; cursor: pointer;
          font-family: 'Raleway', sans-serif; border: none;
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          transition: opacity .25s, transform .25s;
          margin-top: 6px;
        }
        .ba-submit:hover { transform: translateY(-2px); }
        .ba-submit svg { width: 13px; height: 13px; }

        
        .ba-banner-head {
          transition: opacity .7s ease, transform .7s ease;
        }
        .ba-banner-head.hidden  { opacity: 0; transform: translateY(24px); }
        .ba-banner-head.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <section ref={sectionRef} className="ba-section">

        
        <div className="ba-banner">
          <div className={`ba-banner-head ${visible ? "visible" : "hidden"}`}>
            <div className="ba-banner-eyebrow">Book Appointment</div>
            <h2 className="ba-banner-title">
              Visit <em>Dr. SS Dental Care</em> &amp; Implant Centre With Ease.
            </h2>
          </div>
        </div>

       
        <div className="ba-card">
          <div className="ba-card-inner">

            
            <div className={`ba-img-col ${visible ? "visible" : "hidden"}`}>
              <div className="ba-img-wrap">
                <img src={ClinicPhoto} alt="Dr. SS Dental Care Clinic" />
                <div className="ba-img-overlay" />
              </div>
            </div>

            
            <div className={`ba-form-col ${visible ? "visible" : "hidden"}`}>

              <p className="ba-phone-line">
                For general queries call{" "}
                <a href="tel:+918884645500" className="ba-phone-link">+91 8884645500</a>
              </p>

              <div className="ba-fields">

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name *"
                  style={fieldStyle("name")}
                  onFocus={() => setFocused((p) => ({ ...p, name: true }))}
                  onBlur={() => setFocused((p) => ({ ...p, name: false }))}
                />

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  style={fieldStyle("phone")}
                  onFocus={() => setFocused((p) => ({ ...p, phone: true }))}
                  onBlur={() => setFocused((p) => ({ ...p, phone: false }))}
                />

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message..."
                  rows={4}
                  style={{ ...fieldStyle("message"), resize: "none" }}
                  onFocus={() => setFocused((p) => ({ ...p, message: true }))}
                  onBlur={() => setFocused((p) => ({ ...p, message: false }))}
                />

                <button
                  className="ba-submit"
                  onClick={handleSubmit}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  style={{
                    background: hover ? GOLD_LIGHT : GOLD,
                    color: OBSIDIAN,
                  }}
                >
                  Submit Request
                  <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

              </div>
            </div>

          </div>
        </div>

      </section>
    </>
  );
}