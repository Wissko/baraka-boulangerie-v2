"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer
      ref={ref}
      style={{
        background: "#2D1F1A",
        borderTop: "1px solid rgba(232,25,26,0.12)",
        overflow: "hidden",
      }}
    >
      {/* ── ZONE HAUTE : Marque + Tagline ── */}
      <div
        className="footer-hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 6vw, 5rem) 0",
          alignItems: "start",
          gap: "2rem",
        }}
      >
        {/* Col gauche — BARAKA massif EDGE™ */}
        <div style={{ overflow: "hidden" }}>
          <motion.h2
            initial={{ y: "105%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1.2, ease: EASE }}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(5rem, 18vw, 18rem)",
              color: "#E8191A",
              letterSpacing: "-0.04em",
              lineHeight: 0.82,
              margin: 0,
              willChange: "transform",
            }}
          >
            Baraka
          </motion.h2>
        </div>

        {/* Col droite — tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            paddingTop: "0.5rem",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
              fontWeight: 300,
              color: "rgba(250,247,242,0.85)",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              textAlign: "right",
              maxWidth: "14ch",
            }}
          >
            Fait avec passion,<br />chaque matin
          </motion.p>
        </div>
      </div>

      {/* ── Divider ── */}
      <div
        style={{
          height: "1px",
          background: "rgba(232,25,26,0.15)",
          margin: "clamp(2rem, 4vw, 3rem) clamp(2rem, 6vw, 5rem) 0",
        }}
      />

      {/* ── ZONE BASSE : 4 colonnes ── */}
      <motion.div
        className="footer-4col"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "clamp(1.5rem, 3vw, 3rem)",
          padding: "clamp(2rem, 4vw, 3rem) clamp(2rem, 6vw, 5rem)",
        }}
      >
        {/* Col 1 — Contact */}
        <div>
          <p style={labelStyle}>Contact</p>
          <p style={bodyStyle}>hello@baraka-boulangeries.fr</p>
          <p style={bodyStyle}>+33 1 00 00 00 00</p>
          <p style={{ ...bodyStyle, marginTop: "0.5rem" }}>Île-de-France</p>
        </div>

        {/* Col 2 — Pages */}
        <div>
          <p style={labelStyle}>Explorer</p>
          {[
            { label: "Notre histoire", href: "/histoire" },
            { label: "Nos créations", href: "/creations" },
            { label: "Savoir-faire", href: "/savoir-faire" },
            { label: "Adresses", href: "/adresses" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                ...bodyStyle,
                display: "block",
                textDecoration: "none",
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#E8191A")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(250,247,242,0.6)")}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Col 3 — Horaires */}
        <div>
          <p style={labelStyle}>Horaires</p>
          <p style={bodyStyle}>Lun – Ven</p>
          <p style={{ ...bodyStyle, color: "rgba(250,247,242,0.4)" }}>07h00 – 20h00</p>
          <p style={{ ...bodyStyle, marginTop: "0.5rem" }}>Sam – Dim</p>
          <p style={{ ...bodyStyle, color: "rgba(250,247,242,0.4)" }}>07h00 – 19h00</p>
        </div>

        {/* Col 4 — Commande */}
        <div>
          <p style={labelStyle}>Sur mesure</p>
          <p style={{ ...bodyStyle, maxWidth: "22ch", lineHeight: 1.7, marginBottom: "1.25rem" }}>
            Gâteaux, traiteur, événements — sur demande.
          </p>
          <Link
            href="/commandes"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 300,
              fontSize: "0.55rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#E8191A",
              textDecoration: "none",
              borderBottom: "1px solid rgba(232,25,26,0.4)",
              paddingBottom: "2px",
              transition: "border-color 0.3s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#E8191A")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(232,25,26,0.4)")}
          >
            Commander
          </Link>
        </div>
      </motion.div>

      {/* ── Barre bottom ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
          padding: "1.25rem clamp(2rem, 6vw, 5rem)",
          borderTop: "1px solid rgba(232,25,26,0.08)",
        }}
      >
        <span style={bottomStyle}>© 2025 Baraka Boulangeries</span>
        <span style={bottomStyle}>Maison artisanale depuis 2010</span>
        <a
          href="#"
          style={{ ...bottomStyle, textDecoration: "none", transition: "color 0.3s" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(250,247,242,0.6)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(250,247,242,0.25)")}
        >
          Mentions légales
        </a>
      </div>
    </footer>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans)",
  fontWeight: 300,
  fontSize: "0.52rem",
  letterSpacing: "0.38em",
  textTransform: "uppercase",
  color: "#E8191A",
  marginBottom: "0.85rem",
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans)",
  fontWeight: 300,
  fontSize: "0.82rem",
  color: "rgba(250,247,242,0.6)",
  lineHeight: 1.75,
  margin: 0,
};

const bottomStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans)",
  fontWeight: 300,
  fontSize: "0.48rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "rgba(250,247,242,0.25)",
};
