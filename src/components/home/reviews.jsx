import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const GOLD  = "#C8A96A";
const INK   = "#0E0E18";
const TEXT  = "#EAE5D8";
const MUTED = "rgba(234,229,216,0.5)";

const reviews = [
  { name: "Bharath Reddy",       time: "5 months ago",  review: "I have been consulting Dr. Ayesha for several years, and I'm truly glad to have found such a dedicated and knowledgeable doctor." },
  { name: "Anita Irappa Ai...",  time: "6 months ago",  review: "Consulted doctor asifa mam for my skin issues... Affordable treatment with great results. Highly recommended!" },
  { name: "Deepika",             time: "11 months ago", review: "I had severe dental issues and was in grave pain, thats when i came across Dr SS Dental Care. Best decision ever!" },
  { name: "Rajesh Kumar",        time: "3 months ago",  review: "Excellent service and very professional staff. The treatment was painless and the results were amazing. Highly recommend!" },
  { name: "Priya Sharma",        time: "2 months ago",  review: "Dr. Shahul is very experienced and caring. The clinic is very clean and hygienic. Very happy with the treatment." },
  { name: "Mohammed Ali",        time: "1 month ago",   review: "Best dental clinic in Bangalore. State of the art equipment and very friendly staff. Will definitely come back." },
];

const StarRating = () => (
  <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} style={{ width: "14px", height: "14px", color: GOLD }} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const GoogleIcon = () => (
  <svg style={{ width: "14px", height: "14px", flexShrink: 0 }} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

export default function Reviews() {
  const sectionRef              = useRef(null);
  const [visible, setVisible]   = useState(false);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleExpand = (i) => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Raleway:wght@200;300;400;500;600&display=swap');

        .rev-section {
          background: #181825;
          padding: 100px 6vw;
          position: relative; overflow: hidden;
          font-family: 'Raleway', sans-serif;
        }
        .rev-section::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(200,169,106,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,106,.025) 1px, transparent 1px);
          background-size: 70px 70px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
          pointer-events: none;
        }
        .rev-section::after {
          content: ''; position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 70%; height: 50%;
          background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200,169,106,.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .rev-inner { max-width: 1280px; margin: 0 auto; position: relative; z-index: 1; }

        .rev-head {
          text-align: center; margin-bottom: 64px;
          transition: opacity .7s ease, transform .7s ease;
        }
        .rev-head.hidden  { opacity: 0; transform: translateY(30px); }
        .rev-head.visible { opacity: 1; transform: translateY(0); }

        .rev-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-size: 9px; font-weight: 600; letter-spacing: 4px;
          text-transform: uppercase; color: ${GOLD}; margin-bottom: 16px;
        }
        .rev-eyebrow::before, .rev-eyebrow::after { content: ''; width: 28px; height: 1px; background: ${GOLD}; }

        .rev-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 3.5vw, 48px); font-weight: 300;
          color: ${TEXT}; line-height: 1.1; margin-bottom: 20px;
        }
        .rev-title em { font-style: italic; color: ${GOLD}; }

        .rev-divider { display: flex; align-items: center; justify-content: center; gap: 12px; }
        .rev-dl { width: 44px; height: 1px; background: linear-gradient(to right, transparent, ${GOLD}); }
        .rev-dl.rev { background: linear-gradient(to left, transparent, ${GOLD}); }
        .rev-dd { width: 5px; height: 5px; background: ${GOLD}; transform: rotate(45deg); flex-shrink: 0; }

        .rev-swiper-wrap {
          transition: opacity .7s ease .2s, transform .7s ease .2s;
        }
        .rev-swiper-wrap.hidden  { opacity: 0; transform: translateY(30px); }
        .rev-swiper-wrap.visible { opacity: 1; transform: translateY(0); }

        .rev-card {
          background: ${INK};
          border: 1px solid rgba(200,169,106,0.1);
          border-top: 2px solid ${GOLD};
          padding: 28px 24px;
          height: 100%;
          position: relative; overflow: hidden;
          box-sizing: border-box;
          transition: border-color .35s, transform .35s;
          cursor: pointer;
        }
        .rev-card::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(200,169,106,0.03);
          transform: translateY(-100%); transition: transform .4s ease;
        }
        .rev-card:hover { transform: translateY(-5px); border-color: rgba(200,169,106,0.35); }
        .rev-card:hover::before { transform: translateY(0); }

        .rev-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, ${GOLD}, transparent);
          transform: scaleX(0); transition: transform .4s ease;
        }
        .rev-card:hover::after { transform: scaleX(1); }

        .rev-quote {
          font-family: 'Playfair Display', serif;
          font-size: 64px; line-height: 0.6;
          color: rgba(200,169,106,0.15);
          margin-bottom: 16px; display: block;
          font-weight: 300;
        }

        .rev-avatar {
          width: 42px; height: 42px; border-radius: 50%;
          border: 1px solid rgba(200,169,106,0.25);
          background: rgba(200,169,106,0.08);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .rev-avatar svg { width: 22px; height: 22px; color: rgba(200,169,106,0.5); }

        .rev-name {
          font-size: 13px; font-weight: 600; letter-spacing: 0.5px;
          color: ${TEXT}; font-family: 'Raleway', sans-serif;
        }
        .rev-time {
          font-size: 9px; font-weight: 400; letter-spacing: 1px;
          color: ${MUTED}; display: flex; align-items: center; gap: 5px;
          margin-top: 3px; font-family: 'Raleway', sans-serif;
        }

        .rev-text {
          font-size: 12px; font-weight: 300; letter-spacing: 0.3px;
          line-height: 1.9; color: ${MUTED};
          font-family: 'Raleway', sans-serif;
        }
        .rev-readmore {
          background: none; border: none; padding: 0;
          font-size: 10px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: ${GOLD}; cursor: pointer;
          margin-left: 6px; font-family: 'Raleway', sans-serif;
          transition: opacity .2s;
        }
        .rev-readmore:hover { opacity: 0.75; }

        .rev-swiper-wrap .swiper-pagination-bullet {
          background: rgba(200,169,106,0.3) !important;
          opacity: 1 !important;
          width: 6px !important; height: 6px !important;
        }
        .rev-swiper-wrap .swiper-pagination-bullet-active {
          background: ${GOLD} !important;
          width: 24px !important;
          border-radius: 3px !important;
        }
        .rev-swiper-wrap .swiper-wrapper { padding-bottom: 44px; }

        .rev-nav-wrap { display: flex; justify-content: center; gap: 12px; margin-top: 8px; }
        .rev-nav-btn {
          width: 40px; height: 40px;
          border: 1px solid rgba(200,169,106,0.25);
          background: transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: ${GOLD};
          transition: background .3s, border-color .3s, transform .3s;
        }
        .rev-nav-btn:hover {
          background: rgba(200,169,106,0.08);
          border-color: ${GOLD};
          transform: scale(1.05);
        }
        .rev-nav-btn svg { width: 14px; height: 14px; }

        .rev-verified svg { color: ${GOLD}; width: 13px; height: 13px; flex-shrink: 0; }
      `}</style>

      <section ref={sectionRef} className="rev-section">
        <div className="rev-inner">

          <div className={`rev-head ${visible ? "visible" : "hidden"}`}>
            <div className="rev-eyebrow">Google Reviews</div>
            <h2 className="rev-title">
              What Our <em>Patients</em> Say
            </h2>
            <div className="rev-divider">
              <div className="rev-dl rev" /><div className="rev-dd" /><div className="rev-dl" />
            </div>
          </div>

          <div className={`rev-swiper-wrap ${visible ? "visible" : "hidden"}`}>
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              grabCursor={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={{ prevEl: ".rev-prev", nextEl: ".rev-next" }}
              breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={index} style={{ height: "auto" }}>
                  <div className="rev-card">

                    <span className="rev-quote">"</span>

                    <StarRating />

                    <p className="rev-text">
                      {expanded[index] ? review.review : `${review.review.slice(0, 100)}...`}
                      <button className="rev-readmore" onClick={() => toggleExpand(index)}>
                        {expanded[index] ? "Less" : "More"}
                      </button>
                    </p>

                    <div style={{ height: "1px", background: "rgba(200,169,106,0.1)", margin: "18px 0" }} />

                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div className="rev-avatar">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                        </svg>
                      </div>
                      <div style={{ overflow: "hidden", minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }} className="rev-verified">
                          <p className="rev-name">{review.name}</p>
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="rev-time">
                          <span>{review.time} on</span>
                          <GoogleIcon />
                        </div>
                      </div>
                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            
            <div className="rev-nav-wrap">
              <button className="rev-nav-btn rev-prev" aria-label="Previous">
                <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="rev-nav-btn rev-next" aria-label="Next">
                <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}