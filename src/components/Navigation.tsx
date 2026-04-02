"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const links = [
  { label: "Home", href: "/" },
  { label: "Histoire", href: "/histoire" },
  { label: "Créations", href: "/creations" },
  { label: "Commander", href: "/commandes" },
  { label: "Savoir-faire", href: "/savoir-faire" },
  { label: "Adresses", href: "/adresses" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Wrapper centré — Framer Motion ne peut pas gérer translateX(-50%) seul */}
      <div style={{
        position: "fixed",
        top: "1.25rem",
        left: 0,
        right: 0,
        zIndex: 9000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        pointerEvents: "none",
      }}>
      {/* Logo — outside the pill */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8, ease: EASE }}
        style={{ pointerEvents: "auto", flexShrink: 0 }}
      >
        <Link href="/" style={{ textDecoration: "none", display: "inline-block" }}>
          <Image
            src="/images/Design sans titre.svg"
            alt="Baraka Boulangeries"
            width={52}
            height={52}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        </Link>
      </motion.div>

      {/* Glass pill — links only */}
      <motion.nav
        className="nav-glass"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8, ease: EASE }}
        style={{
          pointerEvents: "auto",
          padding: "0.75rem 2.5rem",
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
          background: scrolled
            ? "rgba(45, 31, 26, 0.55)"
            : "rgba(45, 31, 26, 0.35)",
          backdropFilter: "blur(20px) saturate(180%) brightness(1.05)",
          WebkitBackdropFilter: "blur(20px) saturate(180%) brightness(1.05)",
          border: "1px solid rgba(232, 25, 26, 0.25)",
          borderRadius: "100px",
          boxShadow: scrolled
            ? "inset 0 1px 0 rgba(255,255,255,0.12), 0 8px 40px rgba(0,0,0,0.35), 0 2px 8px rgba(232,25,26,0.08)"
            : "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.2)",
          transition: "background 0.4s cubic-bezier(0.16,1,0.36,1), box-shadow 0.4s cubic-bezier(0.16,1,0.36,1)",
          whiteSpace: "nowrap",
          position: "relative",
        }}
      >
        {/* Desktop links */}
        <div
          className="nav-desktop-links"
          style={{
            gap: "2.5rem",
            alignItems: "center",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 600,
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(250,247,242,0.85)",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#E8191A")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "rgba(250,247,242,0.85)")
              }
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="nav-mobile-burger"
          style={{
            background: "none",
            border: "none",
            padding: "0.5rem",
            flexDirection: "column",
            gap: "5px",
          }}
          aria-label="Menu"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
            style={{
              display: "block",
              width: 22,
              height: 1,
              background: "#E8191A",
              transformOrigin: "center",
            }}
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            style={{ display: "block", width: 22, height: 1, background: "#E8191A" }}
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
            style={{
              display: "block",
              width: 22,
              height: 1,
              background: "#E8191A",
              transformOrigin: "center",
            }}
          />
        </button>
      </motion.nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ ease: EASE, duration: 0.4 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 8000,
              background: "rgba(45, 31, 26, 0.97)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2.5rem",
            }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, ease: EASE, duration: 0.4 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontSize: "clamp(2.5rem, 8vw, 4rem)",
                    color: "#FAF7F2",
                    textDecoration: "none",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
