"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#2D1F1A",
        borderTop: "1px solid rgba(232,25,26,0.12)",
        padding: "clamp(3rem, 7vw, 5rem) clamp(1.5rem, 7vw, 5rem)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "2rem",
          alignItems: "end",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {/* Logo + tagline */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 300,
              color: "#FAF7F2",
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              marginBottom: "1.25rem",
            }}
          >
            Baraka
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 300,
              fontSize: "0.62rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(232,25,26,0.5)",
            }}
          >
            L'art de la boulangerie française depuis 2010
          </p>
        </div>

        {/* Links */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "flex-end",
          }}
        >
          {[
            { label: "Notre histoire", href: "#histoire" },
            { label: "Nos créations", href: "#creations" },
            { label: "Commander sur mesure", href: "#commandes" },
            { label: "Nos adresses", href: "#adresses" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(250,247,242,0.35)",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#E8191A")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "rgba(250,247,242,0.35)")
              }
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Signature line */}
      <div
        style={{
          maxWidth: 1400,
          margin: "3rem auto 0",
          borderTop: "1px solid rgba(232,25,26,0.08)",
          paddingTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 300,
            fontSize: "0.52rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(250,247,242,0.18)",
          }}
        >
          {new Date().getFullYear()} — Baraka Boulangeries
        </p>
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: "0.9rem",
            fontWeight: 300,
            color: "rgba(232,25,26,0.3)",
            letterSpacing: "0.04em",
          }}
        >
          Fait avec passion, chaque matin
        </p>
      </div>
    </footer>
  );
}
