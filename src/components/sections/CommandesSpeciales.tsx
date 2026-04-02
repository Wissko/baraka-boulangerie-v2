"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Clock, CheckCircle } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const TYPES = [
  "Gâteau de mariage",
  "Gâteau d'anniversaire",
  "Autre occasion",
];

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toISOString().split("T")[0];
}

function isDateTooSoon(dateStr: string): boolean {
  if (!dateStr) return false;
  const chosen = new Date(dateStr);
  const min = new Date();
  min.setDate(min.getDate() + 14);
  min.setHours(0, 0, 0, 0);
  return chosen < min;
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans)",
  fontWeight: 300,
  fontSize: "0.55rem",
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  display: "block",
  marginBottom: "0.75rem",
  transition: "color 0.35s",
};

export default function CommandesSpeciales() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [focused, setFocused] = useState<string | null>(null);
  const [type, setType] = useState(TYPES[0]);
  const [date, setDate] = useState("");
  const [personnes, setPersonnes] = useState("");
  const [description, setDescription] = useState("");
  const [allergies, setAllergies] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dateError, setDateError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  // CTA magnétique
  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;
    const handleMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
    };
    const handleLeave = () => {
      btn.style.transform = "";
      btn.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1)";
    };
    btn.addEventListener("mousemove", handleMove);
    btn.addEventListener("mouseleave", handleLeave);
    return () => {
      btn.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  function handleDateChange(val: string) {
    setDate(val);
    setDateError(isDateTooSoon(val));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isDateTooSoon(date)) { setDateError(true); return; }
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch("/api/commande-speciale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, date, personnes, description, allergies, prenom, nom, email, telephone }),
      });
      if (!res.ok) {
        const data = await res.json();
        setServerError(data.error || "Une erreur est survenue.");
      } else {
        setSuccess(true);
      }
    } catch {
      setServerError("Une erreur réseau est survenue. Merci de réessayer.");
    } finally {
      setLoading(false);
    }
  }

  const formStep = (() => {
    if (description) return 3;
    if (date && personnes && !dateError) return 2;
    return 1;
  })();

  const inputBase: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans)",
    fontWeight: 300,
    fontSize: "0.9rem",
    color: "#FAF7F2",
    background: "transparent",
    border: "none",
    padding: "0.9rem 0",
    width: "100%",
    outline: "none",
    letterSpacing: "0.03em",
  };

  function borderStyle(field: string, hasError = false): React.CSSProperties {
    const isFocused = focused === field;
    return {
      borderBottom: `1px solid ${hasError ? "#C41E3A" : isFocused ? "#C9A96E" : "rgba(250,247,242,0.15)"}`,
      boxShadow: isFocused ? "0 1px 0 0 rgba(201,169,110,0.3)" : "none",
      transition: "border-color 0.4s, box-shadow 0.4s",
    };
  }

  return (
    <section
      id="commandes"
      style={{
        background: "#FAF7F2",
        padding: "clamp(5rem, 12vw, 10rem) 0",
        overflow: "hidden",
      }}
    >
      <div
        ref={sectionRef}
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 7vw, 5rem)" }}
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
          <span className="section-number">04</span>
          <div style={{ height: 1, width: 40, background: "rgba(26,20,16,0.15)" }} />
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
            Commandes spéciales
          </p>
        </div>

        {/* EDGE™ grid golden ratio */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "clamp(280px, 35%, 420px) 1fr",
            gap: "clamp(3rem, 7vw, 7rem)",
            alignItems: "start",
          }}
        >
          {/* Left — intro */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
          >
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 300,
                color: "var(--ink)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: "2rem",
              }}
            >
              Sur mesure,
              <br />
              <span style={{ color: "#C9A96E" }}>pour vous</span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "0.9rem",
                color: "var(--ink-soft)",
                lineHeight: 1.85,
                marginBottom: "2rem",
              }}
            >
              Confiez-nous vos créations les plus precieuses. Gâteaux de
              mariage, anniversaires, pièces montées : chaque commande est une
              collaboration unique entre vous et notre atelier.
            </p>

            {/* 14 days notice */}
            <div
              style={{
                border: "1px solid rgba(201,169,110,0.4)",
                background: "rgba(201,169,110,0.04)",
                padding: "1.25rem 1.5rem",
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
              }}
            >
              <Clock size={15} color="#C9A96E" strokeWidth={1} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 300,
                    fontSize: "0.55rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#C9A96E",
                    marginBottom: "0.4rem",
                  }}
                >
                  Délai minimum
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 300,
                    fontSize: "0.82rem",
                    color: "var(--ink-soft)",
                    lineHeight: 1.7,
                  }}
                >
                  Nos créations sur mesure nécessitent un délai de{" "}
                  <strong style={{ color: "var(--ink)", fontWeight: 400 }}>14 jours minimum</strong>{" "}
                  avant votre événement.
                </p>
              </div>
            </div>

            {/* CTA magnétique */}
            <div style={{ marginTop: "3rem" }}>
              <a
                ref={ctaRef}
                href="#commandes-form"
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 400,
                  fontSize: "0.62rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#1A1410",
                  background: "#C9A96E",
                  padding: "1.1rem 2.75rem",
                  textDecoration: "none",
                  animation: "cta-pulse 2.5s ease-in-out infinite",
                  transition: "background 0.3s",
                  willChange: "transform",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.animation = "none";
                  el.style.background = "#A8833C";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.animation = "cta-pulse 2.5s ease-in-out infinite";
                  el.style.background = "#C9A96E";
                }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("commandes-form")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Commander sur mesure
              </a>
            </div>
          </motion.div>

          {/* Right — form, dark card */}
          <motion.div
            id="commandes-form"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
            style={{
              background: "#1A1410",
              padding: "clamp(2rem, 5vw, 4rem)",
            }}
          >
            {/* Success */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: EASE, duration: 0.7 }}
                  style={{ textAlign: "center", padding: "3rem 1rem" }}
                >
                  <CheckCircle size={52} color="#C9A96E" strokeWidth={0.8} style={{ margin: "0 auto 2rem", display: "block" }} />
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontStyle: "italic",
                      fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                      fontWeight: 300,
                      color: "#FAF7F2",
                      marginBottom: "1rem",
                    }}
                  >
                    Demande transmise
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontWeight: 300,
                      fontSize: "0.85rem",
                      color: "rgba(250,247,242,0.5)",
                      lineHeight: 1.75,
                    }}
                  >
                    Nous reviendrons vers vous sous 48h pour confirmer les détails de votre création.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {!success && (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                {/* Progress */}
                <div style={{ display: "flex", gap: 6, marginBottom: "3rem", alignItems: "center" }}>
                  {[1, 2, 3].map((step) => (
                    <div key={step} style={{ flex: 1, position: "relative", height: 1 }}>
                      <div style={{ height: 1, background: "rgba(250,247,242,0.1)" }} />
                      <motion.div
                        animate={{ scaleX: formStep >= step ? 1 : 0 }}
                        initial={{ scaleX: step === 1 ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        style={{
                          position: "absolute",
                          top: 0, left: 0, right: 0,
                          height: 1,
                          background: "#C9A96E",
                          transformOrigin: "left",
                        }}
                      />
                    </div>
                  ))}
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,247,242,0.25)", whiteSpace: "nowrap", marginLeft: "0.5rem" }}>
                    {formStep} / 3
                  </p>
                </div>

                {/* Section 01 */}
                <div style={{ marginBottom: "3.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                    <span style={{ ...labelStyle as object, fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1rem", color: "#C9A96E", fontWeight: 400, marginBottom: 0, letterSpacing: "0.05em" }}>01</span>
                    <div style={{ flex: 1, height: 1, background: "rgba(201,169,110,0.15)" }} />
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "0.52rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(250,247,242,0.3)" }}>Votre création</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                    {/* Types */}
                    <div>
                      <label style={{ ...labelStyle, color: "rgba(250,247,242,0.35)" }}>Type de pièce</label>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {TYPES.map((t) => {
                          const selected = type === t;
                          return (
                            <label key={t} style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                              padding: "0.85rem 1.25rem",
                              border: `1px solid ${selected ? "#C9A96E" : "rgba(250,247,242,0.08)"}`,
                              background: selected ? "rgba(201,169,110,0.07)" : "transparent",
                              cursor: "pointer",
                              transition: "border-color 0.3s, background 0.3s",
                            }}>
                              <div style={{
                                width: 12, height: 12, borderRadius: "50%",
                                border: `1px solid ${selected ? "#C9A96E" : "rgba(250,247,242,0.2)"}`,
                                background: selected ? "#C9A96E" : "transparent",
                                flexShrink: 0, transition: "all 0.25s",
                              }} />
                              <input type="radio" name="type" value={t} checked={selected} onChange={() => setType(t)} style={{ display: "none" }} />
                              <span style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "0.88rem", color: selected ? "#FAF7F2" : "rgba(250,247,242,0.5)", letterSpacing: "0.02em", transition: "color 0.25s" }}>
                                {t}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <label style={{ ...labelStyle, color: focused === "date" ? "#C9A96E" : dateError ? "#C41E3A" : "rgba(250,247,242,0.35)" }}>Date souhaitée</label>
                      <div style={borderStyle("date", dateError)}>
                        <input type="date" required min={getMinDate()} value={date}
                          onChange={(e) => handleDateChange(e.target.value)}
                          onFocus={() => setFocused("date")} onBlur={() => setFocused(null)}
                          style={{ ...inputBase, colorScheme: "dark" }} />
                      </div>
                      {dateError && <p style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "0.75rem", color: "#C41E3A", marginTop: "0.5rem", lineHeight: 1.6 }}>Délai minimum de 14 jours requis.</p>}
                    </div>

                    {/* Personnes */}
                    <div>
                      <label style={{ ...labelStyle, color: focused === "personnes" ? "#C9A96E" : "rgba(250,247,242,0.35)" }}>Nombre de personnes</label>
                      <div style={borderStyle("personnes")}>
                        <input type="number" min={10} required placeholder="Minimum 10" value={personnes}
                          onChange={(e) => setPersonnes(e.target.value)}
                          onFocus={() => setFocused("personnes")} onBlur={() => setFocused(null)}
                          style={inputBase} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "linear-gradient(90deg, rgba(201,169,110,0.4) 0%, transparent 100%)", marginBottom: "3.5rem" }} />

                {/* Section 02 */}
                <div style={{ marginBottom: "3.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                    <span style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1rem", color: "#C9A96E" }}>02</span>
                    <div style={{ flex: 1, height: 1, background: "rgba(201,169,110,0.15)" }} />
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "0.52rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(250,247,242,0.3)" }}>Votre vision</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                    <div>
                      <label style={{ ...labelStyle, color: focused === "description" ? "#C9A96E" : "rgba(250,247,242,0.35)" }}>Description et vision</label>
                      <div style={borderStyle("description")}>
                        <textarea required rows={4} placeholder="Ex : Gâteau à étages, fleurs en sucre, couleurs ivoire et or..." value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          onFocus={() => setFocused("description")} onBlur={() => setFocused(null)}
                          style={{ ...inputBase, border: "none", resize: "none", lineHeight: 1.8 }} />
                      </div>
                    </div>
                    <div>
                      <label style={{ ...labelStyle, color: focused === "allergies" ? "#C9A96E" : "rgba(250,247,242,0.35)" }}>
                        Allergies <span style={{ fontWeight: 300, fontSize: "0.5rem", letterSpacing: "0.1em", color: "rgba(250,247,242,0.2)", marginLeft: "0.5rem", textTransform: "none" }}>Facultatif</span>
                      </label>
                      <div style={borderStyle("allergies")}>
                        <textarea rows={2} placeholder="Intolérances, restrictions alimentaires..." value={allergies}
                          onChange={(e) => setAllergies(e.target.value)}
                          onFocus={() => setFocused("allergies")} onBlur={() => setFocused(null)}
                          style={{ ...inputBase, border: "none", resize: "none", lineHeight: 1.8 }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "linear-gradient(90deg, rgba(201,169,110,0.4) 0%, transparent 100%)", marginBottom: "3.5rem" }} />

                {/* Section 03 */}
                <div style={{ marginBottom: "3rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                    <span style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1rem", color: "#C9A96E" }}>03</span>
                    <div style={{ flex: 1, height: 1, background: "rgba(201,169,110,0.15)" }} />
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "0.52rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(250,247,242,0.3)" }}>Coordonnées</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                      {[["prenom", "Prénom", prenom, setPrenom], ["nom", "Nom", nom, setNom]].map(([field, lbl, val, setter]) => (
                        <div key={field as string}>
                          <label style={{ ...labelStyle, color: focused === field ? "#C9A96E" : "rgba(250,247,242,0.35)" }}>{lbl as string}</label>
                          <div style={borderStyle(field as string)}>
                            <input type="text" required value={val as string}
                              onChange={(e) => (setter as (v: string) => void)(e.target.value)}
                              onFocus={() => setFocused(field as string)} onBlur={() => setFocused(null)}
                              style={inputBase} />
                          </div>
                        </div>
                      ))}
                    </div>
                    {[["email", "Email", "email", email, setEmail], ["telephone", "Téléphone", "tel", telephone, setTelephone]].map(([field, lbl, type_, val, setter]) => (
                      <div key={field as string}>
                        <label style={{ ...labelStyle, color: focused === field ? "#C9A96E" : "rgba(250,247,242,0.35)" }}>{lbl as string}</label>
                        <div style={borderStyle(field as string)}>
                          <input type={type_ as string} required value={val as string}
                            onChange={(e) => (setter as (v: string) => void)(e.target.value)}
                            onFocus={() => setFocused(field as string)} onBlur={() => setFocused(null)}
                            style={inputBase} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {serverError && (
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "0.8rem", color: "#C41E3A", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                    {serverError}
                  </p>
                )}

                {/* Submit */}
                <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontWeight: 400,
                      fontSize: "0.62rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.28em",
                      color: "#1A1410",
                      background: loading ? "rgba(201,169,110,0.5)" : "#C9A96E",
                      border: "none",
                      padding: "1.15rem 3rem",
                      cursor: loading ? "wait" : "pointer",
                      transition: "background 0.3s, transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.8rem",
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        const el = e.currentTarget;
                        el.style.background = "#A8833C";
                        el.style.transform = "translateY(-2px)";
                        el.style.boxShadow = "0 10px 28px rgba(201,169,110,0.2)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.background = loading ? "rgba(201,169,110,0.5)" : "#C9A96E";
                      el.style.transform = "";
                      el.style.boxShadow = "";
                    }}
                  >
                    {loading ? (
                      <>
                        <span style={{ display: "inline-block", width: 10, height: 10, border: "1px solid rgba(26,20,16,0.3)", borderTopColor: "#1A1410", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                        Envoi en cours
                      </>
                    ) : "Envoyer ma demande"}
                  </button>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "0.7rem", color: "rgba(250,247,242,0.25)", lineHeight: 1.65, maxWidth: 220 }}>
                    Réponse sous 48h. Aucun engagement avant confirmation.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
