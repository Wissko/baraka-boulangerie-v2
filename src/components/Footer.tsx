"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const navLinks = [
  { label: "Histoire", href: "/histoire" },
  { label: "Créations", href: "/creations" },
  { label: "Commander", href: "/commandes" },
  { label: "Savoir-faire", href: "/savoir-faire" },
  { label: "Adresses", href: "/adresses" },
];

const gallery = [
  { src: "/images/baguettes.jpg", alt: "Pains artisanaux Baraka" },
  { src: "/images/fraisier.jpg", alt: "Fraisier Baraka" },
  { src: "/images/patisseries.jpg", alt: "Pâtisseries Baraka" },
  { src: "/images/vitrine-noel.jpg", alt: "Vitrine Baraka" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#2D1F1A",
        padding: "clamp(3rem, 5vw, 4.5rem) clamp(2rem, 7vw, 6rem) 2rem",
        borderTop: "1px solid rgba(232,25,26,0.15)",
      }}
    >
      {/* ── Grid principale 3 colonnes ── */}
      <div
        className="footer-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "clamp(2rem, 4vw, 4rem)",
          alignItems: "end",
          maxWidth: "1100px",
          margin: "0 auto",
          marginBottom: "clamp(2.5rem, 4vw, 3.5rem)",
        }}
      >
        {/* Col 1 — Édito */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 300,
              fontSize: "0.55rem",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: "#E8191A",
              marginBottom: "1rem",
            }}
          >
            Nos Maisons
          </p>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 400,
              color: "#FAF7F2",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
              whiteSpace: "pre-line",
            }}
          >
            {"L'artisanat\nà l'état pur"}
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 300,
              fontSize: "0.85rem",
              color: "rgba(250,247,242,0.55)",
              maxWidth: "28ch",
              lineHeight: 1.8,
            }}
          >
            Depuis 2010, Baraka perpétue l'art de la boulangerie française dans 5 boutiques en Île-de-France.
          </p>
        </div>

        {/* Col 2 — Brand massif */}
        <div
          className="footer-brand-col"
          style={{
            alignSelf: "end",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              fontWeight: 400,
              color: "#E8191A",
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              margin: 0,
            }}
          >
            Baraka
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 300,
              fontSize: "0.55rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(250,247,242,0.4)",
              marginTop: "0.75rem",
            }}
          >
            Boulangeries
          </p>
        </div>

        {/* Col 3 — Galerie 2×2 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3px",
            maxWidth: "240px",
            marginLeft: "auto",
          }}
        >
          {gallery.map((img) => (
            <div
              key={img.src}
              style={{
                aspectRatio: "1 / 1",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                style={{
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div
        style={{
          height: "1px",
          background: "rgba(232,25,26,0.2)",
          marginBottom: "1.75rem",
          maxWidth: "1100px",
          margin: "0 auto 1.75rem",
        }}
      />

      {/* ── Barre nav ── */}
      <nav
        className="footer-nav-links"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2.5rem",
          marginBottom: "1.75rem",
          maxWidth: "1100px",
          margin: "0 auto 1.75rem",
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 300,
              fontSize: "0.55rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(250,247,242,0.5)",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#E8191A";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(250,247,242,0.5)";
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* ── Divider ── */}
      <div
        style={{
          height: "1px",
          background: "rgba(232,25,26,0.12)",
          marginBottom: "1.5rem",
        }}
      />

      {/* ── Barre bottom ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 300,
            fontSize: "0.5rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(250,247,242,0.3)",
          }}
        >
          © 2025 Baraka Boulangeries
        </span>
        <span
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 300,
            fontSize: "0.5rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(250,247,242,0.3)",
          }}
        >
          Fait avec passion, chaque matin
        </span>
        <a
          href="#"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 300,
            fontSize: "0.5rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(250,247,242,0.3)",
            textDecoration: "none",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "rgba(250,247,242,0.6)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "rgba(250,247,242,0.3)";
          }}
        >
          Mentions légales
        </a>
      </div>
    </footer>
  );
}
