"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        position: "relative",
        height: "100svh",
        minHeight: 700,
        overflow: "hidden",
        background: "#2D1F1A",
      }}
      aria-label="Baraka Boulangeries hero"
    >
      {/* ── Parallax background ── */}
      <motion.div
        style={{ position: "absolute", inset: 0, y: imageY, willChange: "transform" }}
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.8, ease: EASE }}
      >
        <Image
          src="/images/vitrine.jpg"
          alt="Vitrine de la boulangerie Baraka, devanture artisanale"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {/* Overlay gradient luxueux — profondeur */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(45,31,26,0.45) 0%, rgba(45,31,26,0.1) 35%, rgba(45,31,26,0.72) 100%)",
          }}
        />
      </motion.div>

      {/* Glass overlay plein écran — luxueux, opaque juste ce qu'il faut */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(6px) saturate(140%)',
          WebkitBackdropFilter: 'blur(6px) saturate(140%)',
          background: 'linear-gradient(to bottom, rgba(45,31,26,0.52) 0%, rgba(45,31,26,0.18) 40%, rgba(45,31,26,0.75) 100%)',
          zIndex: 2,
        }}
      />

      {/* ── Corner label top-right (EDGE™ corner gravity) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        style={{
          position: "absolute",
          top: "1.75rem",
          right: "clamp(1.5rem, 5vw, 4rem)",
          zIndex: 20,
        }}
      >
        <p className="corner-label">Île-de-France</p>
      </motion.div>

      {/* ── Corner section number bottom-left (EDGE™) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "clamp(1.5rem, 5vw, 4rem)",
          zIndex: 20,
        }}
      >
        <span className="section-number">01</span>
      </motion.div>

      {/* ── Signature caramel line (EDGE™ — draws on load) ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 1.8, ease: EASE }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, #E8191A 0%, rgba(232,25,26,0.3) 70%, transparent 100%)",
          transformOrigin: "left",
          zIndex: 20,
        }}
      />

      {/* ── Main content ── */}
      <motion.div
        style={{ y: textY, opacity, position: "relative", zIndex: 10, height: "100%" }}
      >
        {/* NEUROPATH: content bottom-left for Z-path toward CTA */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(3.5rem, 8vw, 6rem)",
            left: "clamp(1.5rem, 7vw, 5rem)",
            maxWidth: "90vw",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
            style={{
              display: "inline-block",
              maxWidth: "700px",
            }}
          >
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "0.6rem",
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "#E8191A",
                marginBottom: "1.25rem",
              }}
            >
              Maison artisanale depuis 2010
            </motion.p>

            {/* EDGE™ Bleeding title — clip-path reveal line 1 */}
            <div style={{ overflow: "hidden" }}>
              <motion.h1
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                transition={{ delay: 0.65, duration: 1, ease: EASE }}
                className="edge-title"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 300,
                  color: "#FAF7F2",
                  lineHeight: 0.88,
                  textAlign: "left",
                  willChange: "transform, opacity",
                }}
              >
                Baraka
              </motion.h1>
            </div>

            {/* Line 2 — italic offset */}
            <div style={{ overflow: "hidden" }}>
              <motion.p
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                transition={{ delay: 0.85, duration: 1, ease: EASE }}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                  fontWeight: 300,
                  color: "rgba(232,25,26,0.85)",
                  letterSpacing: "0.02em",
                  lineHeight: 1.1,
                  marginLeft: "clamp(0rem, 2vw, 3rem)",
                  willChange: "transform, opacity",
                }}
              >
                Boulangeries
              </motion.p>
            </div>

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8, ease: EASE }}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "clamp(0.78rem, 1.5vw, 0.95rem)",
                color: "rgba(250,247,242,0.5)",
                marginTop: "1.5rem",
                maxWidth: "460px",
                lineHeight: 1.8,
                letterSpacing: "0.02em",
              }}
            >
              L'art de la boulangerie française : croissants, pains au levain,
              viennoiseries et pâtisseries d'exception. 5 boutiques en Île-de-France.
            </motion.p>

            {/* CTA — pop animation + pulse */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.25, duration: 0.6, type: "spring", stiffness: 280 }}
              style={{ marginTop: "2.5rem", display: "inline-block" }}
            >
              <a
                href="#commandes"
                id="cta-magnetic"
                className="btn-glass"
              >
                Commander sur mesure
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "clamp(1.5rem, 5vw, 4rem)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div style={{ width: 1, height: 28, background: "rgba(232,25,26,0.4)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
