"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, ExternalLink } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const boutiques = [
  {
    id: 1,
    name: "Baraka 2",
    address: "15 Rue Jean-Jacques Rousseau",
    city: "Argenteuil",
    code: "95100",
    hours: "Lun-Ven 6h30-20h / Sam-Dim 7h-20h",
    tag: null,
    mapUrl: "https://maps.google.com/?q=15+Rue+Jean-Jacques+Rousseau+95100+Argenteuil",
  },
  {
    id: 2,
    name: "Baraka 3",
    address: "109 Rue de l'Ambassadeur",
    city: "Conflans-Sainte-Honorine",
    code: "78700",
    hours: "Lun-Ven 6h30-20h / Sam-Dim 7h-20h",
    tag: null,
    mapUrl: "https://maps.google.com/?q=109+Rue+de+l+Ambassadeur+78700+Conflans-Sainte-Honorine",
  },
  {
    id: 3,
    name: "Boulangerie Baraka",
    address: "135 Rue de Conflans",
    city: "Herblay-sur-Seine",
    code: "95220",
    hours: "Lun-Ven 6h30-20h / Sam-Dim 7h-20h",
    tag: "Boutique historique",
    mapUrl: "https://maps.google.com/?q=135+Rue+de+Conflans+95220+Herblay-sur-Seine",
  },
  {
    id: 4,
    name: "Baraka 5",
    address: "2 Chemin de la Croix de Bois",
    city: "Herblay-sur-Seine",
    code: "95220",
    hours: "Lun-Ven 6h30-20h / Sam-Dim 7h-20h",
    tag: null,
    mapUrl: "https://maps.google.com/?q=2+Chemin+de+la+Croix+de+Bois+95220+Herblay-sur-Seine",
  },
  {
    id: 5,
    name: "Baraka 6",
    address: "14 Av. de la Gare",
    city: "Beauchamp",
    code: "95250",
    hours: "Lun-Ven 6h30-20h / Sam-Dim 7h-20h",
    tag: null,
    mapUrl: "https://maps.google.com/?q=14+Avenue+de+la+Gare+95250+Beauchamp",
  },
];

export default function Adresses() {
  const [activeId, setActiveId] = useState<number | null>(1);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="adresses"
      ref={sectionRef}
      className="mesh-dark"
      style={{
        padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 7vw, 5rem)",
        paddingTop: "clamp(5rem, 10vw, 8rem)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          marginBottom: "clamp(3rem, 7vw, 6rem)",
        }}
      >
        <span className="section-number">06</span>
        <div style={{ height: 1, width: 40, background: "rgba(232,25,26,0.2)" }} />
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 300,
            fontSize: "0.55rem",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "rgba(232,25,26,0.5)",
          }}
        >
          Nos adresses
        </p>

        {/* Corner label top-right — EDGE */}
        <div style={{ marginLeft: "auto" }}>
          <p className="corner-label" style={{ color: "rgba(232,25,26,0.4)" }}>
            Île-de-France
          </p>
        </div>
      </div>

      {/* Title */}
      <motion.h2
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={inView ? { clipPath: "inset(0 0 0% 0)" } : {}}
        transition={{ delay: 0.1, duration: 0.9, ease: EASE }}
        style={{
          fontFamily: "var(--font-cormorant)",
          fontStyle: "italic",
          fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
          fontWeight: 300,
          color: "#FAF7F2",
          letterSpacing: "-0.03em",
          lineHeight: 0.95,
          marginBottom: "clamp(3rem, 7vw, 5rem)",
          maxWidth: 700,
          willChange: "transform, opacity",
        }}
      >
        5 boutiques,
        <br />
        <span style={{ color: "#E8191A" }}>une seule passion</span>
      </motion.h2>

      {/* Boutiques list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {boutiques.map((b, i) => {
          const isActive = activeId === b.id;
          return (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.7, ease: EASE }}
              onClick={() => setActiveId(isActive ? null : b.id)}
              style={{
                borderTop: "1px solid rgba(232,25,26,0.12)",
                padding: "clamp(1.25rem, 3vw, 2rem) 0",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
            >
              <div
                className="adresse-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr auto",
                  gap: "1.5rem",
                  alignItems: "center",
                }}
              >
                {/* Number */}
                <span
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                    fontWeight: 300,
                    color: isActive ? "#E8191A" : "rgba(232,25,26,0.25)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    transition: "color 0.3s",
                  }}
                >
                  0{b.id}
                </span>

                {/* Name + address */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontStyle: "italic",
                        fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
                        fontWeight: 400,
                        color: isActive ? "#FAF7F2" : "rgba(250,247,242,0.55)",
                        transition: "color 0.3s",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {b.name}
                    </h3>
                    {b.tag && (
                      <span
                        style={{
                          fontFamily: "var(--font-dm-sans)",
                          fontWeight: 300,
                          fontSize: "0.48rem",
                          letterSpacing: "0.25em",
                          textTransform: "uppercase",
                          color: "#E8191A",
                          border: "1px solid rgba(232,25,26,0.4)",
                          padding: "0.3rem 0.7rem",
                        }}
                      >
                        {b.tag}
                      </span>
                    )}
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ paddingTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <MapPin size={12} color="#E8191A" strokeWidth={1} />
                        <p
                          style={{
                            fontFamily: "var(--font-dm-sans)",
                            fontWeight: 300,
                            fontSize: "0.82rem",
                            color: "rgba(250,247,242,0.55)",
                          }}
                        >
                          {b.address}, {b.code} {b.city}
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <Clock size={12} color="#E8191A" strokeWidth={1} />
                        <p
                          style={{
                            fontFamily: "var(--font-dm-sans)",
                            fontWeight: 300,
                            fontSize: "0.78rem",
                            color: "rgba(250,247,242,0.4)",
                          }}
                        >
                          {b.hours}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Map link */}
                <a
                  href={b.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 300,
                    fontSize: "0.52rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: isActive ? "#E8191A" : "rgba(232,25,26,0.3)",
                    textDecoration: "none",
                    transition: "color 0.3s",
                    flexShrink: 0,
                  }}
                >
                  <ExternalLink size={11} strokeWidth={1} />
                  <span className="hidden sm:inline">Itinéraire</span>
                </a>
              </div>
            </motion.div>
          );
        })}
        <div style={{ borderTop: "1px solid rgba(232,25,26,0.12)" }} />
      </div>
    </section>
  );
}
