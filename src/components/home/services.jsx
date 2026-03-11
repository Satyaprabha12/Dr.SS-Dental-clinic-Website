import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import General    from "../../assets/General.jpeg";
import Preventive from "../../assets/preventive.webp";
import Pediatric  from "../../assets/pediatric.webp";
import Laminates  from "../../assets/Dental-Laminates.jpg";
import Extraction from "../../assets/extraction.webp";
import Cosmetic   from "../../assets/cosmetic.webp";

const GOLD       = "#C8A96A";
const GOLD_LIGHT = "#E8D5A8";
const OBSIDIAN   = "#07070D";
const INK        = "#0E0E18";
const CHARCOAL   = "#181825";
const TEXT       = "#EAE5D8";
const MUTED      = "rgba(234,229,216,0.5)";

const services = [
  {
    title: "General Dentistry",
    image: General,
    description: "Comprehensive general dentistry services including routine check-ups, cleanings, fillings, and more to maintain your oral health.",
  },
  {
    title: "Preventive Dentistry",
    image: Preventive,
    description: "Dental laminates are ultra-thin, custom-made shells that cover the front surface of teeth to improve their appearance. Perfect for correcting discoloration, chips, gaps, and minor misalignments.",
  },
  {
    title: "Pediatric Dentistry",
    image: Pediatric,
    description: "Specialized dental care for children, focusing on prevention, early detection, and treatment of dental issues in a child-friendly environment.",
  },
  {
    title: "Dental Laminates",
    image: Laminates,
    description: "Dental laminates are ultra-thin, custom-made shells that cover the front surface of teeth to improve their appearance. Perfect for correcting discoloration, chips, gaps, and minor misalignments.",
  },
  {
    title: "Tooth Extraction",
    image: Extraction,
    description: "Safe and comfortable tooth extraction services using advanced techniques and anesthesia to ensure minimal discomfort during the procedure.",
  },
  {
    title: "Cosmetic Dentistry",
    image: Cosmetic,
    description: "Enhance your smile with our comprehensive cosmetic dentistry services, including teeth whitening, veneers, bonding, and more.",
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const [visible, setVisible]   = useState(false);
  const [hovered, setHovered]   = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Raleway:wght@200;300;400;500;600&display=swap');

        .srv-section {
          background: ${INK};
          padding: 100px 6vw;
          position: relative;
          overflow: hidden;
          font-family: 'Raleway', sans-serif;
        }


        .srv-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(200,169,106,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,106,.025) 1px, transparent 1px);
          background-size: 70px 70px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
          pointer-events: none;
        }


        .srv-section::after {
          content: '';
          position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 70%; height: 60%;
          background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200,169,106,.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .srv-inner {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }


        .srv-head {
          text-align: center;
          margin-bottom: 64px;
          transition: opacity .7s ease, transform .7s ease;
        }
        .srv-head.hidden  { opacity: 0; transform: translateY(30px); }
        .srv-head.visible { opacity: 1; transform: translateY(0); }

        .srv-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: ${GOLD};
          margin-bottom: 20px;
          font-family: 'Raleway', sans-serif;
        }
        .srv-eyebrow::before,
        .srv-eyebrow::after {
          content: '';
          width: 28px; height: 1px;
          background: ${GOLD};
        }

        .srv-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 300;
          color: ${TEXT};
          margin-bottom: 16px;
          line-height: 1.1;
        }
        .srv-title em { font-style: italic; color: ${GOLD}; }

        .srv-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .srv-divider-line {
          width: 60px; height: 1px;
          background: linear-gradient(to right, transparent, ${GOLD});
        }
        .srv-divider-line.rev {
          background: linear-gradient(to left, transparent, ${GOLD});
        }
        .srv-divider-diamond {
          width: 6px; height: 6px;
          background: ${GOLD};
          transform: rotate(45deg);
        }

        .srv-desc {
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.5px;
          line-height: 2;
          color: ${MUTED};
          max-width: 480px;
          margin: 0 auto;
          font-family: 'Raleway', sans-serif;
        }


        .srv-swiper-wrap {
          transition: opacity .7s ease .2s, transform .7s ease .2s;
        }
        .srv-swiper-wrap.hidden  { opacity: 0; transform: translateY(30px); }
        .srv-swiper-wrap.visible { opacity: 1; transform: translateY(0); }


        .srv-card {
          background: ${CHARCOAL};
          border: 1px solid rgba(200,169,106,0.1);
          position: relative;
          overflow: hidden;
          cursor: grab;
          transition: border-color .35s, transform .35s;
        }
        .srv-card:hover {
          border-color: rgba(200,169,106,0.35);
          transform: translateY(-6px);
        }

        .srv-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, ${GOLD}, transparent);
          transform: scaleX(0);
          transition: transform .4s ease;
        }
        .srv-card:hover::after { transform: scaleX(1); }


        .srv-img-wrap {
          position: relative;
          overflow: hidden;
          margin: 14px 14px 0;
        }
        .srv-img-wrap img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
          transition: transform .6s ease;
        }
        .srv-card:hover .srv-img-wrap img { transform: scale(1.07); }


        .srv-img-overlay {
          position: absolute; inset: 0;
          background: rgba(7,7,13,0.82);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          opacity: 0;
          transition: opacity .35s ease;
        }
        .srv-card:hover .srv-img-overlay { opacity: 1; }

        .srv-img-overlay p {
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.3px;
          line-height: 1.9;
          color: ${TEXT};
          text-align: center;
          font-family: 'Raleway', sans-serif;
          transform: translateY(12px);
          transition: transform .35s ease;
        }
        .srv-card:hover .srv-img-overlay p { transform: translateY(0); }


        .srv-img-wrap::before {
          content: '';
          position: absolute;
          top: 8px; left: 8px;
          width: 24px; height: 24px;
          border-top: 1px solid ${GOLD};
          border-left: 1px solid ${GOLD};
          z-index: 2;
          pointer-events: none;
        }


        .srv-card-body {
          padding: 20px 20px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .srv-card-num {
          position: absolute;
          top: 22px; right: 22px;
          font-family: 'Playfair Display', serif;
          font-size: 13px;
          font-weight: 300;
          color: rgba(200,169,106,0.35);
          letter-spacing: 1px;
          z-index: 3;
        }

        .srv-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 400;
          color: ${TEXT};
          text-align: center;
          letter-spacing: 0.5px;
        }

        .srv-arrow-btn {
          width: 40px; height: 40px;
          border: 1px solid rgba(200,169,106,0.3);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all .3s;
          color: ${GOLD};
          flex-shrink: 0;
        }
        .srv-card:hover .srv-arrow-btn {
          background: ${GOLD};
          color: ${OBSIDIAN};
          border-color: ${GOLD};
          transform: rotate(45deg);
        }
        .srv-arrow-btn svg {
          width: 14px; height: 14px;
          transition: transform .3s;
        }

        .swiper-slide { height: auto; }
      `}</style>

      <section ref={sectionRef} className="srv-section">
        <div className="srv-inner">

          <div className={`srv-head ${visible ? "visible" : "hidden"}`}>
            <div className="srv-eyebrow">We Are Specialized In</div>
            <h2 className="srv-title">
              Our <em>Dental</em> Services
            </h2>
            <div className="srv-divider">
              <div className="srv-divider-line rev" />
              <div className="srv-divider-diamond" />
              <div className="srv-divider-line" />
            </div>
            <p className="srv-desc">
              Dr. SS Dental Care embodies the ethos of Customer-friendly, Cost effective and Complete dental solutions.
            </p>
          </div>

          <div className={`srv-swiper-wrap ${visible ? "visible" : "hidden"}`}>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              grabCursor={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              breakpoints={{
                640:  { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {services.map((service, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="srv-card"
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                  >

                    <span className="srv-card-num">0{index + 1}</span>

                    <div className="srv-img-wrap">
                      <img src={service.image} alt={service.title} />
                      <div className="srv-img-overlay">
                        <p>{service.description}</p>
                      </div>
                    </div>

                    <div className="srv-card-body">
                      <h3 className="srv-card-title">{service.title}</h3>
                      <button className="srv-arrow-btn" aria-label={`Learn more about ${service.title}`}>
                        <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </section>
    </>
  );
}