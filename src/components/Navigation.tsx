"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const links = [
  { label: "Histoire", href: "#histoire" },
  { label: "Creations", href: "#creations" },
  { label: "Commander", href: "#commandes" },
  { label: "Savoir-faire", href: "#savoir-faire" },
  { label: "Adresses", href: "#adresses" },
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
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8, ease: EASE }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9000,
          padding: "1.5rem clamp(1.5rem, 5vw, 4rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.5s, backdrop-filter 0.5s",
          background: scrolled
            ? "rgba(45, 31, 26, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(232,25,26,0.12)"
            : "none",
        }}
      >
        {/* Logo */}
        <Link href="#hero" style={{ textDecoration: "none", display: "inline-block" }}>
          <Image
            src="/images/logo.jpg"
            alt="Baraka Boulangeries"
            width={48}
            height={48}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        </Link>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            gap: "2.5rem",
            alignItems: "center",
          }}
          className="hidden md:flex"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(250,247,242,0.7)",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#E8191A")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "rgba(250,247,242,0.7)")
              }
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          style={{
            background: "none",
            border: "none",
            padding: "0.5rem",
            display: "flex",
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
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, ease: EASE, duration: 0.4 }}
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
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
