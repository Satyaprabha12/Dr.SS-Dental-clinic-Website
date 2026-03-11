import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Logo from "../../assets/navbar-icon.png";

const navLinks = [
  { label: "Home", href: "#" },
  {
    label: "Services",
    href: "#",
    dropdown: [
      "General Dentistry",
      "Dental Implants",
      "Teeth Whitening",
      "Orthodontics",
      "Root Canal",
      "Cosmetic Dentistry",
    ],
  },
  {
    label: "About",
    href: "#",
    dropdown: ["About Us", "Our Mission", "Our Clinic"],
  },
  {
    label: "Our Team's",
    href: "#",
    dropdown: ["Dr. Shahul", "Our Specialists", "Support Staff"],
  },
  { label: "Gallery", href: "#" },
  { label: "Blog",    href: "#" },
  { label: "Contact", href: "#" },
];

// ── Design tokens ─────────────────────────────────────────────────────────────
const GOLD       = "#C8A96A";
const GOLD_LIGHT = "#E8D5A8";
const OBSIDIAN   = "#07070D";
const TEXT       = "#EAE5D8";
const MUTED      = "rgba(234,229,216,0.45)";
const DESKTOP_BP = 1024; // matches Tailwind "lg:"

// ── Reusable SVG icons ────────────────────────────────────────────────────────
const PhoneIcon = ({ size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
  </svg>
);
const CalIcon = ({ size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8"  y1="2" x2="8"  y2="6"/>
    <line x1="3"  y1="10" x2="21" y2="10"/>
  </svg>
);
const ChevronIcon = ({ open, size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={open ? GOLD : "rgba(234,229,216,0.4)"}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
  >
    <path d="M19 9l-7 7-7-7" />
  </svg>
);

export default function Navbar() {
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [openDropdown,   setOpenDropdown]   = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [scrolled,       setScrolled]       = useState(false);
  const [isDesktop,      setIsDesktop]      = useState(
    typeof window !== "undefined" ? window.innerWidth >= DESKTOP_BP : true
  );
  const [hoverBook,    setHoverBook]    = useState(false);
  const [hoverCall,    setHoverCall]    = useState(false);
  const [hoverLinks,   setHoverLinks]   = useState({});
  const [hoverDdItems, setHoverDdItems] = useState({});

  const navRef       = useRef(null);
  const logoRef      = useRef(null);
  const linksRef     = useRef(null);
  const ctaRef       = useRef(null);
  const hamburgerRef = useRef(null);

  // ── Breakpoint listener ───────────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      const desktop = window.innerWidth >= DESKTOP_BP;
      setIsDesktop(desktop);
      if (desktop) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Scroll listener ───────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── GSAP entrance ─────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(logoRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.35 }
      );
      if (isDesktop) {
        if (linksRef.current?.children) {
          gsap.fromTo(linksRef.current.children,
            { y: -12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.07, delay: 0.45 }
          );
        }
        if (ctaRef.current) {
          gsap.fromTo(ctaRef.current,
            { x: 30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.55 }
          );
        }
      } else {
        if (hamburgerRef.current) {
          gsap.fromTo(hamburgerRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)", delay: 0.55 }
          );
        }
      }
    });
    return () => ctx.revert();
  }, [isDesktop]);

  const toggleMobileDropdown = (label) =>
    setMobileDropdown((prev) => (prev === label ? null : label));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Raleway:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      {/* ══════════════════════════════════════════════
          NAV BAR
      ══════════════════════════════════════════════ */}
      <nav
        ref={navRef}
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          fontFamily: "'Raleway', sans-serif",
          height: scrolled ? "60px" : isDesktop ? "80px" : "68px",
          padding: isDesktop ? "0 5vw" : "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "100vw",
          boxSizing: "border-box",
          overflow: "hidden",
          background: scrolled
            ? "rgba(7,7,13,0.97)"
            : "linear-gradient(to bottom, rgba(7,7,13,0.92), rgba(7,7,13,0.6))",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${scrolled ? "rgba(200,169,106,0.14)" : "rgba(200,169,106,0.06)"}`,
          transition: "height 0.4s ease, background 0.4s ease, border-color 0.4s ease",
        }}
      >

        {/* ── Logo ── */}
        <a
          ref={logoRef}
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: isDesktop ? "14px" : "10px",
            textDecoration: "none",
            flexShrink: 1,
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <img
            src={Logo}
            alt="DRSS Dental"
            style={{
              height: isDesktop ? "42px" : "34px",
              width: "auto",
              filter: "brightness(0) invert(1)",
              opacity: 0.9,
              flexShrink: 0,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: 0, overflow: "hidden" }}>
            <span style={{
              fontSize: isDesktop ? "17px" : "13px",
              fontWeight: 600,
              letterSpacing: isDesktop ? "2px" : "1px",
              textTransform: "uppercase",
              color: TEXT, lineHeight: 1,
              fontFamily: "'Playfair Display', serif",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
              Dr. SS <span style={{ color: GOLD }}>Dental</span>
            </span>
            {isDesktop && (
              <span style={{
                fontSize: "8.5px", fontWeight: 500, letterSpacing: "3px",
                textTransform: "uppercase", color: MUTED, whiteSpace: "nowrap",
              }}>
                Advanced Implant Center
              </span>
            )}
          </div>
        </a>

        {/* ══════════════════════════════
            DESKTOP LINKS + CTA
        ══════════════════════════════ */}
        {isDesktop && (
          <>
            {/* Links */}
            <div ref={linksRef} style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <a
                    href={link.href}
                    style={{
                      position: "relative",
                      fontSize: "10.5px", fontWeight: 500,
                      letterSpacing: "2.5px", textTransform: "uppercase",
                      color: (openDropdown === link.label || hoverLinks[link.label]) ? GOLD : "rgba(234,229,216,0.65)",
                      textDecoration: "none",
                      padding: "8px 14px",
                      display: "flex", alignItems: "center", gap: "5px",
                      transition: "color 0.3s",
                      fontFamily: "'Raleway', sans-serif",
                    }}
                    onMouseEnter={() => setHoverLinks(h => ({ ...h, [link.label]: true }))}
                    onMouseLeave={() => setHoverLinks(h => ({ ...h, [link.label]: false }))}
                  >
                    {link.label}
                    {link.dropdown && <ChevronIcon open={openDropdown === link.label} />}
                    {(openDropdown === link.label || hoverLinks[link.label]) && (
                      <span style={{ position: "absolute", bottom: "2px", left: "14px", right: "14px", height: "1px", background: GOLD }} />
                    )}
                  </a>

                  {/* Dropdown */}
                  {link.dropdown && openDropdown === link.label && (
                    <div style={{
                      position: "absolute", top: "calc(100% + 10px)", left: 0,
                      minWidth: "210px",
                      background: "rgba(10,10,18,0.98)",
                      border: "1px solid rgba(200,169,106,0.15)",
                      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                      padding: "10px 0", zIndex: 200,
                      boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
                    }}>
                      <div style={{ height: "2px", background: `linear-gradient(to right, ${GOLD}, transparent)`, marginBottom: "8px" }} />
                      {link.dropdown.map((item) => (
                        <a
                          key={item} href="#"
                          style={{
                            display: "block", padding: "11px 22px",
                            fontSize: "10px", fontWeight: 500,
                            letterSpacing: "2px", textTransform: "uppercase",
                            color: hoverDdItems[item] ? GOLD : "rgba(234,229,216,0.6)",
                            textDecoration: "none",
                            transition: "color 0.25s, background 0.25s",
                            background: hoverDdItems[item] ? "rgba(200,169,106,0.06)" : "transparent",
                            borderLeft: hoverDdItems[item] ? `2px solid ${GOLD}` : "2px solid transparent",
                            fontFamily: "'Raleway', sans-serif",
                          }}
                          onMouseEnter={() => setHoverDdItems(h => ({ ...h, [item]: true }))}
                          onMouseLeave={() => setHoverDdItems(h => ({ ...h, [item]: false }))}
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div ref={ctaRef} style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
              <a
                href="tel:+91XXXXXXXXXX"
                style={{
                  fontSize: "9.5px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase",
                  color: hoverCall ? OBSIDIAN : GOLD,
                  background: hoverCall ? GOLD : "transparent",
                  border: `1px solid ${hoverCall ? GOLD : "rgba(200,169,106,0.45)"}`,
                  padding: "10px 22px", textDecoration: "none",
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  transition: "all 0.3s", fontFamily: "'Raleway', sans-serif", cursor: "pointer",
                }}
                onMouseEnter={() => setHoverCall(true)}
                onMouseLeave={() => setHoverCall(false)}
              >
                <PhoneIcon /> Call Now
              </a>
              <a
                href="#"
                style={{
                  fontSize: "9.5px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase",
                  color: hoverBook ? GOLD_LIGHT : OBSIDIAN,
                  background: hoverBook ? "rgba(200,169,106,0.85)" : GOLD,
                  border: "none", padding: "10px 22px", textDecoration: "none",
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  transition: "all 0.3s",
                  clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                  fontFamily: "'Raleway', sans-serif", cursor: "pointer",
                  transform: hoverBook ? "translateY(-1px)" : "none",
                }}
                onMouseEnter={() => setHoverBook(true)}
                onMouseLeave={() => setHoverBook(false)}
              >
                <CalIcon /> Book Appointment
              </a>
            </div>
          </>
        )}

        {/* ══════════════════════════════
            MOBILE HAMBURGER BUTTON
        ══════════════════════════════ */}
        {!isDesktop && (
          <button
            ref={hamburgerRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            style={{
              display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "center", gap: "5px",
              width: "42px", height: "42px",
              border: "1px solid rgba(200,169,106,0.3)",
              background: "rgba(200,169,106,0.06)",
              cursor: "pointer", padding: "8px", flexShrink: 0,
              transition: "border-color 0.3s",
            }}
          >
            <span style={{
              display: "block", height: "1.5px", width: "22px",
              background: GOLD, borderRadius: "1px",
              transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
              transform: mobileOpen ? "rotate(45deg) translate(4.5px, 4.5px)" : "none",
            }} />
            <span style={{
              display: "block", height: "1.5px", width: "22px",
              background: GOLD, borderRadius: "1px",
              transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
              opacity: mobileOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block", height: "1.5px", width: "22px",
              background: GOLD, borderRadius: "1px",
              transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
              transform: mobileOpen ? "rotate(-45deg) translate(4.5px, -4.5px)" : "none",
            }} />
          </button>
        )}
      </nav>

      {/* ══════════════════════════════════════════════
          MOBILE MENU PANEL (only visible on mobile)
      ══════════════════════════════════════════════ */}
      {!isDesktop && mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: scrolled ? "60px" : "68px",
            left: 0, right: 0,
            background: "rgba(7,7,13,0.98)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(200,169,106,0.12)",
            zIndex: 999,
            padding: "16px 20px 28px",
            fontFamily: "'Raleway', sans-serif",
            maxHeight: "calc(100vh - 68px)",
            overflowY: "auto",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          {/* Links */}
          {navLinks.map((link) => (
            <div key={link.label}>
              <button
                onClick={() => link.dropdown && toggleMobileDropdown(link.label)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", padding: "14px 0",
                  borderTop: "none", borderLeft: "none", borderRight: "none",
                  borderBottom: "1px solid rgba(200,169,106,0.07)",
                  background: "none", cursor: "pointer",
                  fontFamily: "'Raleway', sans-serif",
                }}
              >
                <a
                  href={link.href}
                  style={{
                    fontSize: "11px", fontWeight: 500, letterSpacing: "2.5px",
                    textTransform: "uppercase", color: "rgba(234,229,216,0.75)",
                    textDecoration: "none", flex: 1, textAlign: "left",
                  }}
                  onClick={(e) => link.dropdown && e.preventDefault()}
                >
                  {link.label}
                </a>
                {link.dropdown && <ChevronIcon open={mobileDropdown === link.label} size={12} />}
              </button>

              {/* Sub-items */}
              {link.dropdown && mobileDropdown === link.label && (
                <div style={{
                  paddingLeft: "16px", marginLeft: "8px",
                  marginTop: "4px", marginBottom: "4px",
                  borderLeft: "1px solid rgba(200,169,106,0.2)",
                }}>
                  {link.dropdown.map((item) => (
                    <a key={item} href="#" style={{
                      display: "block", padding: "10px 12px",
                      fontSize: "10px", fontWeight: 400, letterSpacing: "2px",
                      textTransform: "uppercase", color: MUTED,
                      textDecoration: "none", fontFamily: "'Raleway', sans-serif",
                    }}>
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Mobile CTAs */}
          <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
            <a href="#" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              padding: "14px", fontSize: "10px", fontWeight: 600,
              letterSpacing: "2.5px", textTransform: "uppercase",
              color: OBSIDIAN, background: GOLD, textDecoration: "none",
              fontFamily: "'Raleway', sans-serif",
            }}>
              <CalIcon size={12} /> Book Appointment
            </a>
            <a href="tel:+91XXXXXXXXXX" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              padding: "14px", fontSize: "10px", fontWeight: 600,
              letterSpacing: "2.5px", textTransform: "uppercase",
              color: GOLD, background: "transparent",
              border: "1px solid rgba(200,169,106,0.4)",
              textDecoration: "none", fontFamily: "'Raleway', sans-serif",
            }}>
              <PhoneIcon size={12} /> Call Now
            </a>
          </div>
        </div>
      )}
    </>
  );
}