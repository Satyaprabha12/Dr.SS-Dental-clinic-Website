import { useEffect, useRef, useState } from "react";

// ── Design tokens ─────────────────────────────────────────────────────────────
const GOLD       = "#C8A96A";
const GOLD_LIGHT = "#E8D5A8";
const OBSIDIAN   = "#07070D";
const INK        = "#0E0E18";
const CHARCOAL   = "#181825";
const DARK4      = "#222230";
const TEXT       = "#EAE5D8";
const MUTED      = "rgba(234,229,216,0.5)";

const videos = [
  {
    id: "q1hrzGOpujU",
    title: "Comparison between basal and Conventional Implants - Dr. Shahul Hameed",
    channel: "Implantologist & Prosthodontist | Dr SS Dental Care...",
    views: "1.8K views",
    ago: "5 days ago",
    url: "https://www.youtube.com/watch?v=q1hrzGOpujU",
  },
  {
    id: "oamLt5pAu60",
    title: "Dr. Shahul Hameed | Implantologist & Prosthodontist in Bangalore | Prosthodontist - Know Your Doctor",
    channel: "Implantologist & Prosthodontist | Dr SS Dental Care...",
    views: "2.1K views",
    ago: "2 days ago",
    url: "https://www.youtube.com/watch?v=oamLt5pAu60",
  },
  {
    id: "lkc2Yqkswmg",
    title: "Sleeping in your Dentures? Can it cause health problems? - Dr. Shahul Hameed",
    channel: "Implantologist & Prosthodontist | Dr SS Dental Care...",
    views: "3.2K views",
    ago: "1 week ago",
    url: "https://www.youtube.com/watch?v=lkc2Yqkswmg&t=7s",
  },
  {
    id: "57vwp6v1isY",
    title: "Dr.SS Dental Care & Advanced Dental Implant Center, OMBR Layout | Dr. Shahul Hameed | Implantologist",
    channel: "Dr SS Dental Care & Advanced Dental Implant Center...",
    views: "1.8K views",
    ago: "5 days ago",
    url: "https://www.youtube.com/watch?v=57vwp6v1isY",
  },
];

// ── YouTube play icon SVG ─────────────────────────────────────────────────────
const YTIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "14px", height: "14px" }}>
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Videos() {
  const sectionRef              = useRef(null);
  const [visible, setVisible]   = useState(false);
  const [activeVideo, setActive] = useState(videos[0]);
  const [hoverIdx, setHoverIdx] = useState(null);
  const [hoverYT,  setHoverYT]  = useState(false);

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

        .vid-section {
          background: ${CHARCOAL};
          padding: 100px 6vw;
          position: relative;
          overflow: hidden;
          font-family: 'Raleway', sans-serif;
        }

        /* grid bg */
        .vid-section::before {
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

        /* top glow */
        .vid-section::after {
          content: '';
          position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 80%; height: 50%;
          background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200,169,106,.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .vid-inner {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── heading ── */
        .vid-head {
          text-align: center;
          margin-bottom: 64px;
          transition: opacity .7s ease, transform .7s ease;
        }
        .vid-head.hidden  { opacity: 0; transform: translateY(30px); }
        .vid-head.visible { opacity: 1; transform: translateY(0); }

        .vid-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: ${GOLD};
          margin-bottom: 16px;
          font-family: 'Raleway', sans-serif;
        }
        .vid-eyebrow::before,
        .vid-eyebrow::after {
          content: ''; width: 28px; height: 1px; background: ${GOLD};
        }

        .vid-label {
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${MUTED};
          margin-bottom: 10px;
          font-family: 'Raleway', sans-serif;
        }

        .vid-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(30px, 4vw, 50px);
          font-weight: 300;
          color: ${TEXT};
          margin-bottom: 20px;
          line-height: 1.1;
        }
        .vid-title em { font-style: italic; color: ${GOLD}; }

        .vid-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .vid-divider-line {
          width: 56px; height: 1px;
          background: linear-gradient(to right, transparent, ${GOLD});
        }
        .vid-divider-line.rev { background: linear-gradient(to left, transparent, ${GOLD}); }
        .vid-divider-diamond {
          width: 6px; height: 6px;
          background: ${GOLD};
          transform: rotate(45deg);
        }

        /* ── layout ── */
        .vid-body {
          display: flex;
          flex-direction: column;
          gap: 24px;
          transition: opacity .7s ease .2s, transform .7s ease .2s;
        }
        .vid-body.hidden  { opacity: 0; transform: translateY(30px); }
        .vid-body.visible { opacity: 1; transform: translateY(0); }

        @media (min-width: 1024px) {
          .vid-body { flex-direction: row; align-items: flex-start; }
        }

        /* ── LEFT: main player ── */
        .vid-player-col {
          width: 100%;
        }
        @media (min-width: 1024px) { .vid-player-col { width: 57%; } }

        .vid-player-wrap {
          background: ${INK};
          border: 1px solid rgba(200,169,106,0.12);
          overflow: hidden;
          position: relative;
        }

        /* gold top accent */
        .vid-player-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, ${GOLD}, transparent);
          z-index: 2;
        }

        /* gold corner bracket */
        .vid-player-wrap::after {
          content: '';
          position: absolute;
          bottom: 80px; right: -8px;
          width: 36px; height: 36px;
          border-bottom: 1px solid ${GOLD};
          border-right: 1px solid ${GOLD};
          z-index: 2;
          pointer-events: none;
        }

        .vid-iframe-wrap {
          position: relative;
          width: 100%;
          padding-top: 56.25%;
        }
        .vid-iframe-wrap iframe {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          border: none;
        }

        .vid-info {
          padding: 22px 24px 24px;
          border-top: 1px solid rgba(200,169,106,0.08);
        }
        .vid-info-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 400;
          color: ${TEXT};
          line-height: 1.5;
          margin-bottom: 8px;
        }
        .vid-info-channel {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: ${MUTED};
          margin-bottom: 14px;
          font-family: 'Raleway', sans-serif;
        }
        .vid-yt-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: ${OBSIDIAN};
          background: ${GOLD};
          padding: 9px 20px;
          text-decoration: none;
          font-family: 'Raleway', sans-serif;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: opacity .25s, transform .25s;
        }
        .vid-yt-link:hover { opacity: .85; transform: translateY(-1px); }

        /* ── RIGHT: video list ── */
        .vid-list-col {
          width: 100%;
        }
        @media (min-width: 1024px) { .vid-list-col { width: 43%; } }

        .vid-list-wrap {
          background: ${INK};
          border: 1px solid rgba(200,169,106,0.12);
          overflow: hidden;
        }

        /* list header */
        .vid-list-header {
          padding: 16px 20px;
          border-bottom: 1px solid rgba(200,169,106,0.1);
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${GOLD};
          font-family: 'Raleway', sans-serif;
        }
        .vid-list-header::before {
          content: '';
          width: 20px; height: 1px;
          background: ${GOLD};
        }

        .vid-list-scroll {
          overflow-y: auto;
          max-height: 460px;
          scrollbar-width: thin;
          scrollbar-color: rgba(200,169,106,0.2) transparent;
        }
        .vid-list-scroll::-webkit-scrollbar { width: 3px; }
        .vid-list-scroll::-webkit-scrollbar-thumb { background: rgba(200,169,106,0.2); }

        /* video list item */
        .vid-item {
          display: flex;
          gap: 14px;
          padding: 14px 16px;
          cursor: pointer;
          border-left: 2px solid transparent;
          border-bottom: 1px solid rgba(200,169,106,0.06);
          transition: background .25s, border-color .25s, transform .25s;
          position: relative;
        }
        .vid-item.active {
          border-left-color: ${GOLD};
          background: rgba(200,169,106,0.05);
        }
        .vid-item:not(.active):hover {
          background: rgba(200,169,106,0.03);
          border-left-color: rgba(200,169,106,0.3);
        }

        /* thumbnail */
        .vid-thumb {
          position: relative;
          flex-shrink: 0;
          width: 110px;
          height: 64px;
          overflow: hidden;
        }
        .vid-thumb img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .4s ease;
          filter: brightness(0.85);
        }
        .vid-item:hover .vid-thumb img { transform: scale(1.05); }
        .vid-item.active .vid-thumb img { filter: brightness(1); }

        /* play overlay on thumb */
        .vid-thumb-overlay {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(7,7,13,0.4);
          transition: background .3s;
        }
        .vid-item:hover .vid-thumb-overlay,
        .vid-item.active .vid-thumb-overlay {
          background: rgba(7,7,13,0.25);
        }
        .vid-play-circle {
          width: 28px; height: 28px;
          border: 1px solid rgba(200,169,106,0.6);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: ${GOLD};
          transition: background .3s, border-color .3s;
        }
        .vid-item.active .vid-play-circle,
        .vid-item:hover .vid-play-circle {
          background: ${GOLD};
          color: ${OBSIDIAN};
          border-color: ${GOLD};
        }
        .vid-play-circle svg { width: 10px; height: 10px; margin-left: 2px; }

        /* item text */
        .vid-item-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          overflow: hidden;
          min-width: 0;
        }
        .vid-item-title {
          font-size: 12px;
          font-weight: 400;
          color: ${TEXT};
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-family: 'Raleway', sans-serif;
        }
        .vid-item.active .vid-item-title { color: ${GOLD_LIGHT}; }
        .vid-item-channel {
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 1px;
          color: ${MUTED};
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-family: 'Raleway', sans-serif;
        }
        .vid-item-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 9px;
          color: rgba(234,229,216,0.3);
          font-family: 'Raleway', sans-serif;
        }
        .vid-item-meta span {
          display: flex; align-items: center; gap: 4px;
        }
        .vid-item-meta svg { width: 10px; height: 10px; }
      `}</style>

      <section ref={sectionRef} className="vid-section">
        <div className="vid-inner">

          {/* ── Heading ── */}
          <div className={`vid-head ${visible ? "visible" : "hidden"}`}>
            <div className="vid-eyebrow">Featured Content</div>
            <p className="vid-label">Our Videos</p>
            <h2 className="vid-title">
              Watch Our <em>Dental Care</em> Videos
            </h2>
            <div className="vid-divider">
              <div className="vid-divider-line rev" />
              <div className="vid-divider-diamond" />
              <div className="vid-divider-line" />
            </div>
          </div>

          {/* ── Content ── */}
          <div className={`vid-body ${visible ? "visible" : "hidden"}`}>

            {/* ── Left: Main Player ── */}
            <div className="vid-player-col">
              <div className="vid-player-wrap">

                {/* iframe */}
                <div className="vid-iframe-wrap">
                  <iframe
                    key={activeVideo.id}
                    src={`https://www.youtube.com/embed/${activeVideo.id}`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* video info */}
                <div className="vid-info">
                  <h3 className="vid-info-title">{activeVideo.title}</h3>
                  <p className="vid-info-channel">{activeVideo.channel}</p>
                  <a
                    href={activeVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vid-yt-link"
                    style={{
                      background: hoverYT ? GOLD_LIGHT : GOLD,
                      transform: hoverYT ? "translateY(-1px)" : "none",
                    }}
                    onMouseEnter={() => setHoverYT(true)}
                    onMouseLeave={() => setHoverYT(false)}
                  >
                    <YTIcon /> Watch on YouTube
                  </a>
                </div>

              </div>
            </div>

            {/* ── Right: Video List ── */}
            <div className="vid-list-col">
              <div className="vid-list-wrap">

                <div className="vid-list-header">Up Next</div>

                <div className="vid-list-scroll">
                  {videos.map((video, idx) => (
                    <div
                      key={video.id}
                      className={`vid-item ${activeVideo.id === video.id ? "active" : ""}`}
                      onClick={() => setActive(video)}
                      onMouseEnter={() => setHoverIdx(idx)}
                      onMouseLeave={() => setHoverIdx(null)}
                    >
                      {/* thumbnail */}
                      <div className="vid-thumb">
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                          alt={video.title}
                        />
                        <div className="vid-thumb-overlay">
                          <div className="vid-play-circle">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* info */}
                      <div className="vid-item-info">
                        <p className="vid-item-title">{video.title}</p>
                        <p className="vid-item-channel">{video.channel}</p>
                        <div className="vid-item-meta">
                          <span>
                            <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {video.views}
                          </span>
                          <span>
                            <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {video.ago}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}