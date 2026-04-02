"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const creations = [
  {
    id: 1,
    title: "Croissant au beurre",
    desc: "Feuilletage pur beurre, 27 couches, dorure à l'oeuf",
    tag: "Viennoiserie",
    src: "/images/vitrine-noel.jpg",
    alt: "Vitrine de Noël Baraka, viennoiseries et créations de fête",
  },
  {
    id: 2,
    title: "Pain au levain",
    desc: "Levain naturel 48h, croûte craquante, mie alvéolée",
    tag: "Pain",
    src: "/images/baguettes.jpg",
    alt: "Baguettes et pains au levain artisanaux Baraka",
  },
  {
    id: 3,
    title: "Tarte au citron meringuée",
    desc: "Citrons de Sicile, meringue italienne, pâte sablée maison",
    tag: "Pâtisserie",
    src: "/images/fraisier.jpg",
    alt: "Fraisier et pâtisseries fines Baraka",
  },
  {
    id: 4,
    title: "Brioche feuilletée",
    desc: "Beurre AOP Charentes-Poitou, laminage délicat",
    tag: "Viennoiserie",
    src: "/images/patisseries.jpg",
    alt: "Assortiment de pâtisseries artisanales Baraka",
  },
  {
    id: 5,
    title: "Éclair chocolat",
    desc: "Pâte à choux maison, ganache 70% Valrhona",
    tag: "Pâtisserie",
    src: "/images/mangues.jpg",
    alt: "Entremets mangues et créations fruitées Baraka",
  },
  {
    id: 6,
    title: "Gâteau sur mesure",
    desc: "Créations uniques pour vos événements les plus précieux",
    tag: "Sur mesure",
    src: "/images/fraisier.jpg",
    alt: "Création sur mesure Baraka pour événements",
  },
];

function GlassCard({ item, index }: { item: typeof creations[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.8, ease: EASE }}
      style={{
        position: "relative",
        overflow: "hidden",
        willChange: "transform, opacity",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: "cover", transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
          }}
        />
        {/* Hover overlay — glass dark */}
        <div
          className="glass-dark"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "1.5rem",
            opacity: 0,
            transition: "opacity 0.4s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "0";
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 300,
              fontSize: "0.78rem",
              color: "rgba(250,247,242,0.75)",
              lineHeight: 1.65,
            }}
          >
            {item.desc}
          </p>
        </div>
      </div>

      {/* Card footer */}
      <div
        className="creation-card-footer"
        style={{
          padding: "1.25rem 0 0",
          borderTop: "1px solid rgba(232,25,26,0.2)",
          marginTop: "0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 2vw, 1.35rem)",
              fontWeight: 400,
              color: "rgba(250,247,242,0.92)",
              letterSpacing: "-0.01em",
            }}
          >
            {item.title}
          </p>
        </div>
        <span
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 300,
            fontSize: "0.5rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#E8191A",
            flexShrink: 0,
            marginLeft: "1rem",
          }}
        >
          {item.tag}
        </span>
      </div>
    </motion.div>
  );
}

export default function Creations() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="creations"
      className="mesh-dark"
      style={{
        padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 7vw, 5rem)",
        paddingTop: "clamp(7rem, 12vw, 10rem)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── PATTERN INTERRUPTION: dark section after light ── */}

      {/* Header */}
      <div
        ref={ref}
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "clamp(3rem, 6vw, 5rem)",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <span className="section-number">03</span>
            <div style={{ width: 40, height: 1, background: "rgba(232,25,26,0.3)" }} />
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "0.55rem",
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "rgba(232,25,26,0.6)",
              }}
            >
              Nos créations
            </p>
          </div>

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
              willChange: "transform, opacity",
            }}
          >
            L'excellence
            <br />
            <span style={{ color: "#E8191A" }}>au quotidien</span>
          </motion.h2>
        </div>

        {/* EDGE™ bleeding stat XXL — pattern interruption */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: "clamp(6rem, 18vw, 16rem)",
            fontWeight: 300,
            color: "rgba(232,25,26,0.06)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            position: "absolute",
            right: "-2vw",
            top: "clamp(3rem, 8vw, 7rem)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          100%
        </motion.div>
      </div>

      {/* ── Glass cards grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: "clamp(1.5rem, 3vw, 2.5rem)",
        }}
      >
        {creations.map((item, i) => (
          <GlassCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
