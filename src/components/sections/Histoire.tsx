"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const stats = [
  { value: 5, suffix: "", label: "Boutiques", sub: "en Île-de-France" },
  { value: 15, suffix: "", label: "Années", sub: "d'artisanat" },
  { value: 4, suffix: "h", label: "Du matin", sub: "chaque jour" },
  { value: 100, suffix: "%", label: "Farines", sub: "françaises" },
];

function AnimatedCounter({ value, suffix, delay }: { value: number; suffix: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      let start = 0;
      const increment = value / 40;
      const interval = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, value, delay]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Histoire() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!borderRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) borderRef.current?.classList.add("in-view");
      },
      { threshold: 0.3 }
    );
    obs.observe(borderRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="histoire"
      ref={sectionRef}
      style={{ background: "var(--cream)", padding: "clamp(5rem, 12vw, 10rem) 0", paddingTop: "clamp(7rem, 12vw, 10rem)", overflow: "hidden" }}
    >
      {/* ── Section label + border scroll ── */}
      <div
        ref={borderRef}
        className="border-scroll"
        style={{
          padding: "0 clamp(1.5rem, 7vw, 5rem)",
          marginBottom: "clamp(3rem, 7vw, 6rem)",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <span className="section-number">02</span>
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 300,
            fontSize: "0.55rem",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "var(--ink-muted)",
          }}
        >
          Notre histoire
        </p>
      </div>

      {/* ── EDGE™ Golden ratio grid: 1fr 2.618fr ── */}
      <div
        className="histoire-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2.618fr",
          gap: 0,
          alignItems: "end",
          padding: "0 clamp(1.5rem, 7vw, 5rem)",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {/* Left col — stats corner gravity bottom-left */}
        <div
          className="histoire-stats"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
            paddingBottom: "1rem",
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: EASE }}
            >
              <div
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  fontWeight: 300,
                  color: "#E8191A",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                <AnimatedCounter value={s.value} suffix={s.suffix} delay={0.3 + i * 0.1} />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 400,
                  fontSize: "0.78rem",
                  color: "var(--ink)",
                  marginTop: "0.25rem",
                  letterSpacing: "0.01em",
                }}
              >
                {s.label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 300,
                  fontSize: "0.55rem",
                  color: "var(--ink-muted)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginTop: "0.2rem",
                }}
              >
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Right col — image + text */}
        <div className="histoire-right-col" style={{ paddingLeft: "clamp(2rem, 5vw, 5rem)" }}>
          {/* Image with scroll reveal */}
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={inView ? { clipPath: "inset(0 0 0% 0)" } : {}}
            transition={{ delay: 0.15, duration: 1.1, ease: EASE }}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/9",
              marginBottom: "3rem",
              overflow: "hidden",
              borderRadius: "16px",
              willChange: "transform, opacity",
            }}
          >
            <Image
              src="/images/baguettes.jpg"
              alt="Baguettes artisanales Baraka, pains façonnés à la main"
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 70vw"
              style={{ objectFit: "cover" }}
            />
            {/* Corner label on image */}
            <div
              style={{
                position: "absolute",
                bottom: "1.25rem",
                right: "1.25rem",
              }}
            >
              <p className="corner-label">Atelier · 4h du matin</p>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
          >
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                fontWeight: 300,
                color: "var(--ink)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                marginBottom: "1.5rem",
              }}
            >
              L'artisanat comme{" "}
              <span style={{ color: "#E8191A" }}>philosophie</span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
                color: "var(--ink-soft)",
                lineHeight: 1.85,
                maxWidth: "55ch",
                marginBottom: "1.5rem",
              }}
            >
              Depuis 2010, Baraka perpétue le savoir-faire boulanger dans le respect des
              traditions françaises. Chaque matin, nos artisans commencent leur journée
              à 4h pour préparer des pains, croissants et viennoiseries façonnés à la main.
            </p>

            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
                color: "var(--ink-soft)",
                lineHeight: 1.85,
                maxWidth: "55ch",
              }}
            >
              De la farine 100% française sélectionnée auprès de meuniers artisans
              aux produits finis : chaque étape est maîtrisée avec rigueur et passion
              dans nos 5 boutiques d'Île-de-France.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
