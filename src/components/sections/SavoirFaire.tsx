"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Wheat, Timer, Award, Flame } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const pillars = [
  {
    icon: Wheat,
    title: "Matières premières",
    desc: "Farines françaises sélectionnées chez des meuniers artisans. Beurre AOP Charentes-Poitou.",
  },
  {
    icon: Timer,
    title: "Fermentation lente",
    desc: "Nos pains reposent entre 12 et 48 heures. Le temps est notre premier ingrédient.",
  },
  {
    icon: Flame,
    title: "Cuisson maîtrisée",
    desc: "Fours à sole, températures précises. La croûte est l'âme du pain.",
  },
  {
    icon: Award,
    title: "Transmission",
    desc: "Nos recettes traversent les générations. Chaque geste est appris, pratiqué, perfectionné.",
  },
];

export default function SavoirFaire() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="savoir-faire"
      ref={sectionRef}
      style={{ position: "relative", overflow: "hidden", background: "#2D1F1A", paddingTop: "clamp(7rem, 12vw, 10rem)" }}
    >
      {/* ── Full-bleed image ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(420px, 65vw, 700px)",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/patisseries.jpg"
          alt="Assortiment de pâtisseries artisanales Baraka, savoir-faire et excellence"
          fill
          loading="lazy"
          sizes="100vw"
          data-no-round
          style={{ objectFit: "cover", objectPosition: "center 30%", borderRadius: 0 }}
        />
        {/* Dark gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(45,31,26,0.45) 0%, rgba(45,31,26,0.1) 35%, rgba(45,31,26,0.85) 100%)",
          }}
        />
        {/* Glass blur overlay for readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(4px) saturate(140%)",
            WebkitBackdropFilter: "blur(4px) saturate(140%)",
            background: "linear-gradient(to bottom, rgba(45,31,26,0.35) 0%, rgba(45,31,26,0.15) 40%, rgba(45,31,26,0.6) 100%)",
          }}
        />

        {/* Quote overlay — Cormorant */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: EASE }}
          className="savoir-faire-quote"
          style={{
            position: "absolute",
            bottom: "clamp(2.5rem, 6vw, 5rem)",
            left: "clamp(1.5rem, 7vw, 6rem)",
            right: "clamp(1.5rem, 7vw, 6rem)",
            maxWidth: 700,
          }}
        >
          {/* EDGE™ section number top corner */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
            <span className="section-number">05</span>
            <div style={{ width: 40, height: 1, background: "rgba(232,25,26,0.3)" }} />
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
              Savoir-faire
            </p>
          </div>

          <blockquote
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "clamp(1.8rem, 4.5vw, 3.8rem)",
              fontWeight: 300,
              color: "#FAF7F2",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            "Le bon pain n'est pas fait — il est{" "}
            <em style={{ color: "#E8191A" }}>cultivé</em>."
          </blockquote>

          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 300,
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(250,247,242,0.35)",
              marginTop: "1.25rem",
            }}
          >
            Philosophie Baraka
          </p>
        </motion.div>
      </div>

      {/* ── Pillars grid ── */}
      <div
        style={{
          padding: "clamp(3rem, 7vw, 6rem) clamp(1.5rem, 7vw, 5rem)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
          gap: "0",
        }}
      >
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: EASE }}
              style={{
                padding: "2.5rem",
                borderLeft: "1px solid rgba(232,25,26,0.12)",
                position: "relative",
                willChange: "transform, opacity",
              }}
            >
              {/* Gold border animation on top */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.8, ease: EASE }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: "#E8191A",
                  transformOrigin: "left",
                }}
              />

              <Icon
                size={20}
                color="#E8191A"
                strokeWidth={1}
                style={{ marginBottom: "1.5rem", display: "block" }}
              />

              <h3
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: "1.35rem",
                  fontWeight: 400,
                  color: "#FAF7F2",
                  letterSpacing: "-0.01em",
                  marginBottom: "0.75rem",
                }}
              >
                {pillar.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 300,
                  fontSize: "0.82rem",
                  color: "rgba(250,247,242,0.45)",
                  lineHeight: 1.75,
                }}
              >
                {pillar.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
