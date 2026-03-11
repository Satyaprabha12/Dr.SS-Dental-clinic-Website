import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero1 from "../../assets/hero-image1.jpg";
import hero2 from "../../assets/hero-image2.webp";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    image: hero1,
    eyebrow: "Award-Winning Care",
    heading: ["Crafting", "Perfect", "Smiles"],
    sub: "Where artistry meets advanced dentistry — your smile, perfected.",
    cta: "Book Consultation",
    ctaSub: "View Services",
  },
  {
    image: hero2,
    eyebrow: "Excellence Since 2009",
    heading: ["Your Smile,", "Our", "Masterpiece"],
    sub: "State-of-the-art treatment in an atmosphere of calm luxury.",
    cta: "Explore Treatments",
    ctaSub: "Meet Our Team",
  },
];

// ─── Inline styles (no Tailwind dependency for luxury tokens) ───────────────
const S = {
  section: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    overflow: "hidden",
    background: "#07070D",
    fontFamily: "'Raleway', sans-serif",
  },

  // Dark gradient vignette over each slide image
  vignette: {
    position: "absolute",
    inset: 0,
    background: `
      linear-gradient(to right,  rgba(7,7,13,.82) 0%, rgba(7,7,13,.45) 55%, rgba(7,7,13,.15) 100%),
      linear-gradient(to top,    rgba(7,7,13,.6)  0%, transparent 40%),
      linear-gradient(to bottom, rgba(7,7,13,.4)  0%, transparent 30%)
    `,
    zIndex: 2,
    pointerEvents: "none",
  },

  // Subtle gold grid overlay
  grid: {
    position: "absolute",
    inset: 0,
    zIndex: 3,
    pointerEvents: "none",
    backgroundImage: `
      linear-gradient(rgba(200,169,106,.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(200,169,106,.03) 1px, transparent 1px)
    `,
    backgroundSize: "72px 72px",
    maskImage: "radial-gradient(ellipse 100% 100% at center, black 20%, transparent 100%)",
    WebkitMaskImage: "radial-gradient(ellipse 100% 100% at center, black 20%, transparent 100%)",
  },

  // Grain texture
  grain: {
    position: "absolute",
    inset: 0,
    zIndex: 4,
    opacity: 0.04,
    pointerEvents: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  },

  img: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    transition: "opacity 1s cubic-bezier(.4,0,.2,1)",
    zIndex: 1,
  },

  // ── Content panel
  content: {
    position: "absolute",
    inset: 0,
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 7vw",
    maxWidth: "680px",
  },

  eyebrow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "28px",
  },
  eyebrowDash: {
    width: "38px",
    height: "1px",
    background: "#C8A96A",
    flexShrink: 0,
  },
  eyebrowText: {
    fontSize: "10px",
    fontWeight: 500,
    letterSpacing: "4px",
    textTransform: "uppercase",
    color: "#C8A96A",
    fontFamily: "'Raleway', sans-serif",
  },

  heading: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 300,
    lineHeight: 1.0,
    color: "#EAE5D8",
    marginBottom: "28px",
  },
  headingLine: (isItalic) => ({
    display: "block",
    fontSize: "clamp(52px, 7.5vw, 108px)",
    fontStyle: isItalic ? "italic" : "normal",
    color: isItalic ? "#C8A96A" : "#EAE5D8",
  }),

  sub: {
    fontSize: "13px",
    fontWeight: 300,
    letterSpacing: "0.8px",
    lineHeight: 2,
    color: "rgba(234,229,216,.6)",
    marginBottom: "48px",
    maxWidth: "420px",
    fontFamily: "'Raleway', sans-serif",
  },

  ctaRow: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
    flexWrap: "wrap",
  },
  btnPrimary: {
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: "#07070D",
    background: "#C8A96A",
    padding: "16px 40px",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Raleway', sans-serif",
    transition: "opacity .25s, transform .25s",
    clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
    textDecoration: "none",
    display: "inline-block",
  },
  btnGhost: {
    fontSize: "10px",
    fontWeight: 400,
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: "rgba(234,229,216,.55)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Raleway', sans-serif",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    transition: "color .3s",
    padding: 0,
  },

  // ── Slide counter (top-right)
  counter: {
    position: "absolute",
    top: "50%",
    right: "5vw",
    transform: "translateY(-50%)",
    zIndex: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  counterCurrent: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "42px",
    fontWeight: 300,
    color: "#C8A96A",
    lineHeight: 1,
  },
  counterDivider: {
    width: "1px",
    height: "50px",
    background: "rgba(200,169,106,.3)",
  },
  counterTotal: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "20px",
    fontWeight: 300,
    color: "rgba(200,169,106,.4)",
    lineHeight: 1,
  },

  // ── Vertical nav arrows (left / right)
  navBtn: (side) => ({
    position: "absolute",
    [side]: "3vw",
    bottom: "48px",
    zIndex: 20,
    width: "50px",
    height: "50px",
    border: "1px solid rgba(200,169,106,.3)",
    background: "rgba(7,7,13,.5)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "border-color .3s, background .3s",
  }),

  // ── Dot indicators
  dotsWrap: {
    position: "absolute",
    bottom: "52px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  dot: (active) => ({
    height: "3px",
    width: active ? "36px" : "12px",
    background: active ? "#C8A96A" : "rgba(200,169,106,.3)",
    transition: "all .4s ease",
    border: "none",
    cursor: "pointer",
    padding: 0,
  }),

  // ── Progress bar (bottom)
  progressBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "2px",
    background: "linear-gradient(to right, #C8A96A, #E8D5A8)",
    zIndex: 30,
    transformOrigin: "left",
  },

  // ── Slide label (bottom-right corner)
  slideLabel: {
    position: "absolute",
    bottom: "48px",
    right: "5vw",
    zIndex: 20,
    textAlign: "right",
  },
  slideLabelNum: {
    fontSize: "9px",
    fontWeight: 600,
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: "#C8A96A",
    marginBottom: "4px",
  },
  slideLabelText: {
    fontSize: "10px",
    fontWeight: 300,
    letterSpacing: "1.5px",
    color: "rgba(200,169,106,.5)",
    fontFamily: "'Raleway', sans-serif",
  },

  // ── Decorative vertical line (left edge accent)
  leftAccentLine: {
    position: "absolute",
    left: "3.5vw",
    top: "15%",
    bottom: "15%",
    width: "1px",
    background: "linear-gradient(to bottom, transparent, rgba(200,169,106,.25) 30%, rgba(200,169,106,.25) 70%, transparent)",
    zIndex: 20,
    pointerEvents: "none",
  },
};

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  const sectionRef  = useRef(null);
  const contentRef  = useRef(null);
  const dotsRef     = useRef(null);
  const counterRef  = useRef(null);
  const progressRef = useRef(null);
  const labelRef    = useRef(null);
  const timerRef    = useRef(null);
  const intervalMs  = 5000;

  const goTo = (index) => {
    if (animating || index === current) return;
    setAnimating(true);

    // Animate content out
    gsap.to(contentRef.current, {
      opacity: 0, y: 24, duration: 0.35, ease: "power2.in",
      onComplete: () => {
        setCurrent(index);
        setAnimating(false);
      },
    });
  };

  // Animate content in whenever slide changes
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: "power3.out", delay: 0.1 }
    );
  }, [current]);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: "power2.out" }
      );
      gsap.fromTo([dotsRef.current, counterRef.current, labelRef.current],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out", delay: 1.1 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Auto-advance + progress bar
  useEffect(() => {
    setProgress(0);
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / intervalMs) * 100, 100);
      setProgress(pct);
      if (pct < 100) timerRef.current = requestAnimationFrame(tick);
    };
    timerRef.current = requestAnimationFrame(tick);

    const auto = setTimeout(() => {
      setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));
    }, intervalMs);

    return () => {
      clearTimeout(auto);
      cancelAnimationFrame(timerRef.current);
    };
  }, [current]);

  const slide = slides[current];

  // Hover states
  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverGhost, setHoverGhost]     = useState(false);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Raleway:wght@200;300;400;500;600&display=swap');
      `}</style>

      <section ref={sectionRef} style={S.section} aria-label="Hero Slider">

        {/* ── Background images ── */}
        {slides.map((s, i) => (
          <img
            key={i}
            src={s.image}
            alt={`Slide ${i + 1}`}
            style={{ ...S.img, opacity: i === current ? 1 : 0 }}
          />
        ))}

        {/* ── Overlays ── */}
        <div style={S.vignette} />
        <div style={S.grid} />
        <div style={S.grain} />

        {/* ── Left decorative line ── */}
        <div style={S.leftAccentLine} />

        {/* ── Main content ── */}
        <div style={S.content} ref={contentRef}>

          <div style={S.eyebrow}>
            <div style={S.eyebrowDash} />
            <span style={S.eyebrowText}>{slide.eyebrow}</span>
          </div>

          <h1 style={S.heading}>
            {slide.heading.map((line, i) => (
              <span key={i} style={S.headingLine(i === 1)}>{line}</span>
            ))}
          </h1>

          <p style={S.sub}>{slide.sub}</p>

          <div style={S.ctaRow}>
            <button
              style={{
                ...S.btnPrimary,
                opacity: hoverPrimary ? 0.85 : 1,
                transform: hoverPrimary ? "translateY(-2px)" : "none",
              }}
              onMouseEnter={() => setHoverPrimary(true)}
              onMouseLeave={() => setHoverPrimary(false)}
            >
              {slide.cta}
            </button>

            <button
              style={{
                ...S.btnGhost,
                color: hoverGhost ? "#C8A96A" : "rgba(234,229,216,.55)",
              }}
              onMouseEnter={() => setHoverGhost(true)}
              onMouseLeave={() => setHoverGhost(false)}
            >
              <span style={{ width: hoverGhost ? "48px" : "28px", height: "1px", background: "currentColor", transition: "width .3s", flexShrink: 0 }} />
              {slide.ctaSub}
            </button>
          </div>
        </div>

        {/* ── Slide counter ── */}
        <div ref={counterRef} style={S.counter}>
          <span style={S.counterCurrent}>0{current + 1}</span>
          <div style={S.counterDivider} />
          <span style={S.counterTotal}>0{slides.length}</span>
        </div>

        {/* ── Dots ── */}
        <div ref={dotsRef} style={S.dotsWrap}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={S.dot(i === current)}
            />
          ))}
        </div>

        {/* ── Slide label bottom-right ── */}
        <div ref={labelRef} style={S.slideLabel}>
          <div style={S.slideLabelNum}>Slide {String(current + 1).padStart(2, "0")}</div>
          <div style={S.slideLabelText}>{slide.eyebrow}</div>
        </div>

        {/* ── Progress bar ── */}
        <div
          ref={progressRef}
          style={{ ...S.progressBar, width: `${progress}%` }}
        />

      </section>
    </>
  );
}