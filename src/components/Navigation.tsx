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
      {/* Logo — fixed left */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8, ease: EASE }}
        style={{
          position: "fixed",
          top: "1.25rem",
          left: "clamp(1rem, 4vw, 2.5rem)",
          zIndex: 9001,
          pointerEvents: "auto",
        }}
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

      {/* Pill wrapper — centered */}
      <div style={{
        position: "fixed",
        top: "1.25rem",
        left: 0,
        right: 0,
        zIndex: 9000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
      }}>
      <motion.nav
        className="nav-glass"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8, ease: EASE }}
        style={{
          pointerEvents: "auto",
          padding: "1rem 3rem",
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
                fontSize: "0.72rem",
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

        {/* Mobile burger + label */}
        <button
          onClick={() => setOpen(!open)}
          className="nav-mobile-burger"
          style={{
            background: "none",
            border: "none",
            padding: "0.5rem",
            alignItems: "center",
            gap: "0.75rem",
            cursor: "pointer",
          }}
          aria-label="Menu"
        >
          <span
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 600,
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(250,247,242,0.85)",
            }}
          >
            {open ? "Fermer" : "Menu"}
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              style={{
                display: "block",
                width: 20,
                height: 1.5,
                background: "#E8191A",
                transformOrigin: "center",
                borderRadius: 1,
              }}
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1, width: open ? 0 : 14 }}
              style={{ display: "block", height: 1.5, background: "#E8191A", borderRadius: 1 }}
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              style={{
                display: "block",
                width: 20,
                height: 1.5,
                background: "#E8191A",
                transformOrigin: "center",
                borderRadius: 1,
              }}
            />
          </div>
        </button>
      </motion.nav>
      </div>

      {/* Mobile menu — Liquid Glass fullscreen */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: EASE, duration: 0.5 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 8000,
              background: "rgba(45, 31, 26, 0.6)",
              backdropFilter: "blur(30px) saturate(180%) brightness(0.9)",
              WebkitBackdropFilter: "blur(30px) saturate(180%) brightness(0.9)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            {/* Glass card container for links */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ delay: 0.1, ease: EASE, duration: 0.5 }}
              style={{
                background: "rgba(26, 20, 16, 0.45)",
                backdropFilter: "blur(24px) saturate(160%)",
                WebkitBackdropFilter: "blur(24px) saturate(160%)",
                border: "1px solid rgba(232, 25, 26, 0.2)",
                borderRadius: "28px",
                padding: "3rem 2.5rem",
                width: "100%",
                maxWidth: "380px",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.5)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
              }}
            >
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, ease: EASE, duration: 0.45 }}
                  style={{ width: "100%", textAlign: "center" }}
                >
                  {i > 0 && (
                    <div
                      style={{
                        height: "1px",
                        background: "linear-gradient(90deg, transparent 0%, rgba(232,25,26,0.2) 50%, transparent 100%)",
                        margin: "0 2rem",
                      }}
                    />
                  )}
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontStyle: "italic",
                      fontSize: "clamp(1.8rem, 7vw, 2.8rem)",
                      color: "rgba(250,247,242,0.85)",
                      textDecoration: "none",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                      display: "block",
                      padding: "0.9rem 0",
                      transition: "color 0.3s",
                    }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              {/* CTA at bottom */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, ease: EASE, duration: 0.5 }}
                style={{ marginTop: "1.5rem", width: "100%", textAlign: "center" }}
              >
                <Link
                  href="/commandes"
                  onClick={() => setOpen(false)}
                  className="btn-glass"
                  style={{ width: "100%", textAlign: "center", display: "block" }}
                >
                  Commander sur mesure
                </Link>
              </motion.div>
            </motion.div>

            {/* Corner label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "0.45rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(250,247,242,0.2)",
                marginTop: "2rem",
              }}
            >
              Baraka Boulangeries · Depuis 2010
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
