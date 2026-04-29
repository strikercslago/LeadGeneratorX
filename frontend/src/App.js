import React, { useEffect, useMemo, useState } from "react";
import "@/App.css";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { ArrowUpRight, Check, Globe, Mail, Phone, Sparkles, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DICT, SERVICE_VALUES } from "@/i18n";
import useReveal from "@/lib/useReveal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PORTRAIT_HERO = "https://customer-assets.emergentagent.com/job_09576fd4-b8a5-4930-b967-b1ac5bbfce0e/artifacts/qxf5u5rw_WhatsApp%20Image%202026-04-28%20at%2018.36.35.jpeg";
const PORTRAIT_LIFESTYLE = "https://customer-assets.emergentagent.com/job_09576fd4-b8a5-4930-b967-b1ac5bbfce0e/artifacts/kw5rs0qt_WhatsApp%20Image%202026-04-28%20at%2018.32.59.jpeg";
const PORTRAIT_LAPTOP = "https://customer-assets.emergentagent.com/job_09576fd4-b8a5-4930-b967-b1ac5bbfce0e/artifacts/xe0h8mj2_WhatsApp%20Image%202026-04-28%20at%2018.32.55.jpeg";

const PHONE = "+1 (619) 997-1471";
const EMAIL = "lucasa@bluegemsmgmt.com";

/* --------------------------------- Nav --------------------------------- */
function Nav({ lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { id: "about", label: t.nav.about },
    { id: "services", label: t.nav.services },
    { id: "credentials", label: t.nav.credentials },
    { id: "cases", label: t.nav.cases },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-ink/70 border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" data-testid="brand-logo" className="flex items-center gap-3 group">
          <span className="font-mono text-[10px] tracking-[0.3em] text-neon">[ LA ]</span>
          <span className="font-serif text-xl md:text-2xl tracking-tight">Lucas Azaro</span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              data-testid={`nav-link-${it.id}`}
              className="font-sans text-sm text-white/70 hover:text-white transition-colors"
            >
              {it.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "pt" ? "en" : "pt")}
            data-testid="lang-toggle"
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/70 hover:text-neon transition-colors flex items-center gap-1.5 px-3 py-1.5 border border-white/10 rounded-full"
            aria-label="Toggle language"
          >
            <Globe size={12} />
            {lang === "pt" ? "PT / EN" : "EN / PT"}
          </button>
          <a
            href="#contact"
            data-testid="nav-cta-button"
            className="hidden md:inline-flex items-center gap-2 bg-neon text-ink font-sans text-sm font-medium px-4 py-2 rounded-full hover:bg-white transition-colors"
          >
            {t.nav.cta} <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </header>
  );
}

/* --------------------------------- Hero -------------------------------- */
function Hero({ t }) {
  return (
    <section id="top" data-testid="hero-section" className="relative min-h-screen pt-32 pb-20 overflow-hidden grain-overlay">
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 reveal">
            <p className="font-mono text-[11px] tracking-[0.3em] text-neon mb-6">{t.hero.overline}</p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.02] tracking-tight text-balance">
              {t.hero.title_pre}{" "}
              <em className="not-italic text-neon font-serif relative">
                {t.hero.title_em}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-neon/60" />
              </em>{" "}
              <span className="text-white/85">{t.hero.title_post}</span>
            </h1>

            <p className="mt-8 max-w-xl font-sans text-base md:text-lg text-white/60 leading-relaxed">
              {t.hero.sub}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                data-testid="hero-cta-primary"
                className="inline-flex items-center gap-2 bg-neon text-ink font-sans text-sm font-medium px-6 py-3.5 rounded-full hover:bg-white transition-colors"
              >
                {t.hero.cta_primary} <MoveRight size={16} />
              </a>
              <a
                href="#about"
                data-testid="hero-cta-secondary"
                className="inline-flex items-center gap-2 font-sans text-sm text-white/85 hover:text-white border border-white/15 hover:border-white/40 px-6 py-3.5 rounded-full transition-colors"
              >
                {t.hero.cta_secondary}
              </a>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl border-t border-white/10 pt-8">
              {[
                [t.hero.stat1_n, t.hero.stat1_l],
                [t.hero.stat2_n, t.hero.stat2_l],
                [t.hero.stat3_n, t.hero.stat3_l],
              ].map(([n, l], i) => (
                <div key={i} data-testid={`hero-stat-${i}`}>
                  <div className="font-serif text-3xl md:text-4xl text-white">{n}</div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/45 mt-2 leading-tight">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative reveal">
            <div className="relative aspect-[4/5] w-full max-w-md ml-auto">
              <div className="absolute -inset-4 border border-white/10 rounded-sm pointer-events-none" />
              <div className="absolute -inset-2 border border-neon/30 rounded-sm pointer-events-none" style={{ transform: "translate(8px, 8px)" }} />
              <img
                src={PORTRAIT_HERO}
                alt="Lucas Azaro"
                className="absolute inset-0 w-full h-full object-cover rounded-sm grayscale-[15%]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/70 via-ink/10 to-transparent rounded-sm" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/80">[ AZCARENTAL · TECH ]</span>
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neon">LIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* marquee */}
        <div className="mt-24 border-y border-white/10 py-5 overflow-hidden">
          <div className="flex marquee-track gap-12 whitespace-nowrap">
            {[...Array(2)].flatMap((_, k) =>
              ["INNOVATION", "ARTIFICIAL INTELLIGENCE", "DIGITAL TRANSFORMATION", "NEGOTIATION", "AZCARENTAL", "GenAI · IBM"].map((w, i) => (
                <span key={`${k}-${i}`} className="font-serif italic text-3xl md:text-5xl text-white/35">
                  {w} <span className="text-neon">✦</span>
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- About ------------------------------- */
function About({ t }) {
  return (
    <section id="about" data-testid="about-section" className="relative py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="font-mono text-[11px] tracking-[0.3em] text-neon reveal">{t.about.overline}</p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 reveal">
            <div className="relative aspect-square w-full">
              <img src={PORTRAIT_LIFESTYLE} alt="Lucas Azaro lifestyle" className="absolute inset-0 w-full h-full object-cover rounded-sm" />
              <div className="absolute inset-0 ring-1 ring-white/10 rounded-sm pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 font-mono text-[10px] tracking-[0.25em] uppercase text-white/55 bg-ink px-3 py-1.5 border border-white/10">
                @lucasazaro · 2026
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 reveal">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
              {t.about.title_pre} <em className="not-italic text-neon">{t.about.title_em}</em>{" "}
              <span className="text-white/65">{t.about.title_post}</span>
            </h2>

            <p className="mt-8 font-sans text-base md:text-lg text-white/65 leading-relaxed">
              <span className="float-left font-serif text-7xl leading-[0.85] mr-3 mt-1 text-neon">“</span>
              {t.about.p1}
            </p>
            <p className="mt-6 font-sans text-base md:text-lg text-white/65 leading-relaxed">{t.about.p2}</p>

            <div className="mt-10 flex flex-wrap gap-2.5">
              {[t.about.tag1, t.about.tag2, t.about.tag3, t.about.tag4].map((tag, i) => (
                <span
                  key={i}
                  data-testid={`about-tag-${i}`}
                  className="font-mono text-[11px] tracking-[0.15em] uppercase text-white/75 border border-white/15 px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Services ------------------------------ */
function Services({ t }) {
  return (
    <section id="services" data-testid="services-section" className="relative py-28 md:py-40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 reveal">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] tracking-[0.3em] text-neon">{t.services.overline}</p>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
              {t.services.title}
            </h2>
          </div>
          <a
            href="#contact"
            data-testid="services-cta"
            className="self-start font-mono text-xs tracking-[0.2em] uppercase text-neon hover:text-white inline-flex items-center gap-2"
          >
            {t.services.cta} <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.services.list.map((s, i) => (
            <article
              key={i}
              data-testid={`service-card-${i}`}
              className="trace-card relative bg-[#0b0b0b] rounded-sm p-8 md:p-10 border border-white/8 flex flex-col min-h-[420px]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.25em] text-neon">{s.tag}</span>
                <Sparkles size={14} className="text-white/30" />
              </div>
              <h3 className="mt-8 font-serif text-3xl md:text-[34px] leading-tight tracking-tight">{s.title}</h3>
              <p className="mt-4 font-sans text-sm text-white/55 leading-relaxed">{s.desc}</p>

              <ul className="mt-6 space-y-2.5">
                {s.bullets.map((b, k) => (
                  <li key={k} className="flex items-start gap-2.5 font-mono text-[12px] text-white/70">
                    <span className="text-neon mt-0.5">›</span>
                    <span className="font-sans text-sm text-white/75">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40">SCHEDULE</span>
                <a
                  href="#contact"
                  data-testid={`service-card-cta-${i}`}
                  className="text-white/85 hover:text-neon transition-colors"
                  aria-label={`${s.title} CTA`}
                >
                  <ArrowUpRight size={20} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Credentials ----------------------------- */
function Credentials({ t }) {
  return (
    <section id="credentials" data-testid="credentials-section" className="relative py-28 md:py-40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 reveal">
            <p className="font-mono text-[11px] tracking-[0.3em] text-neon">{t.credentials.overline}</p>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
              {t.credentials.title}
            </h2>
          </div>

          <div className="lg:col-span-7 reveal">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/5">
              {t.credentials.items.map((c, i) => (
                <div
                  key={i}
                  data-testid={`credential-${i}`}
                  className="bg-ink p-8 md:p-10 group hover:bg-[#0b0b0b] transition-colors"
                >
                  <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">[ {String(i + 1).padStart(2, "0")} ]</div>
                  <div className="mt-6 font-serif text-2xl md:text-3xl leading-tight">{c.label}</div>
                  <div className="mt-3 font-mono text-xs text-neon">{c.tag}</div>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/35">CERTIFIED</span>
                    <Check size={14} className="text-neon opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Cases -------------------------------- */
function Cases({ t }) {
  return (
    <section id="cases" data-testid="cases-section" className="relative py-28 md:py-40 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="font-mono text-[11px] tracking-[0.3em] text-neon reveal">{t.cases.overline}</p>
        <h2 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl reveal">
          {t.cases.title}
        </h2>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/5 reveal">
            {t.cases.items.map((it, i) => (
              <div key={i} data-testid={`case-${i}`} className="bg-ink p-8 md:p-10">
                <div className="font-serif text-5xl md:text-6xl text-neon leading-none">{it.k}</div>
                <p className="mt-5 font-sans text-sm md:text-base text-white/65 leading-relaxed">{it.v}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 reveal">
            <div className="relative h-full min-h-[360px]">
              <img
                src={PORTRAIT_LAPTOP}
                alt="Lucas Azaro at work"
                className="absolute inset-0 w-full h-full object-cover rounded-sm grayscale-[10%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent rounded-sm" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <p className="font-serif italic text-xl md:text-2xl leading-snug text-white">{t.cases.quote}</p>
                <p className="mt-4 font-mono text-[11px] tracking-[0.2em] uppercase text-white/55">{t.cases.quote_author}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Contact ------------------------------- */
function Contact({ t, lang }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "innovation", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(t.contact.error);
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, { ...form, locale: lang });
      toast.success(t.contact.success);
      setForm({ name: "", email: "", company: "", service: "innovation", message: "" });
    } catch (err) {
      console.error(err);
      toast.error(t.contact.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" data-testid="contact-section" className="relative py-28 md:py-40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5 reveal">
          <p className="font-mono text-[11px] tracking-[0.3em] text-neon">{t.contact.overline}</p>
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
            {t.contact.title_pre} <em className="not-italic text-neon">{t.contact.title_em}</em>
            {t.contact.title_post}
          </h2>
          <p className="mt-6 font-sans text-base text-white/60 max-w-md leading-relaxed">{t.contact.sub}</p>

          <div className="mt-12 space-y-6">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/45">{t.contact.direct}</div>
            <a
              href={`mailto:${EMAIL}`}
              data-testid="contact-email-link"
              className="group flex items-center gap-4 border-b border-white/10 pb-4 hover:border-neon transition-colors"
            >
              <Mail size={18} className="text-neon" />
              <span className="font-serif text-xl md:text-2xl text-white/85 group-hover:text-white">{EMAIL}</span>
            </a>
            <a
              href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
              data-testid="contact-phone-link"
              className="group flex items-center gap-4 border-b border-white/10 pb-4 hover:border-neon transition-colors"
            >
              <Phone size={18} className="text-neon" />
              <span className="font-serif text-xl md:text-2xl text-white/85 group-hover:text-white">{PHONE}</span>
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} data-testid="contact-form" className="lg:col-span-7 reveal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label={t.contact.name} required>
              <Input
                data-testid="contact-name-input"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="bg-transparent border-0 border-b border-white/15 rounded-none px-0 h-12 focus-visible:ring-0 focus-visible:border-neon font-sans text-base text-white placeholder:text-white/30"
                placeholder=""
                required
              />
            </Field>
            <Field label={t.contact.email} required>
              <Input
                data-testid="contact-email-input"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="bg-transparent border-0 border-b border-white/15 rounded-none px-0 h-12 focus-visible:ring-0 focus-visible:border-neon font-sans text-base text-white"
                required
              />
            </Field>
            <Field label={t.contact.company}>
              <Input
                data-testid="contact-company-input"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                className="bg-transparent border-0 border-b border-white/15 rounded-none px-0 h-12 focus-visible:ring-0 focus-visible:border-neon font-sans text-base text-white"
              />
            </Field>
            <Field label={t.contact.service} required>
              <Select value={form.service} onValueChange={(v) => update("service", v)}>
                <SelectTrigger
                  data-testid="contact-service-trigger"
                  className="bg-transparent border-0 border-b border-white/15 rounded-none px-0 h-12 focus:ring-0 focus:border-neon font-sans text-base text-white"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0b0b0b] border border-white/10 text-white">
                  {SERVICE_VALUES.map((v) => (
                    <SelectItem key={v} value={v} data-testid={`contact-service-option-${v}`} className="font-sans">
                      {t.contact.service_options[v]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="mt-6">
            <Field label={t.contact.message} required>
              <Textarea
                data-testid="contact-message-input"
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className="bg-transparent border-0 border-b border-white/15 rounded-none px-0 focus-visible:ring-0 focus-visible:border-neon font-sans text-base text-white resize-none"
                required
              />
            </Field>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40">[ ENCRYPTED · 24H RESPONSE ]</p>
            <Button
              type="submit"
              data-testid="contact-submit-button"
              disabled={loading}
              className="bg-neon text-ink hover:bg-white font-sans rounded-full h-12 px-7"
            >
              {loading ? t.contact.sending : t.contact.submit}
              <MoveRight size={16} className="ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/45">
        {label} {required && <span className="text-neon">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

/* -------------------------------- Footer ------------------------------- */
function Footer({ t }) {
  return (
    <footer data-testid="site-footer" className="relative pt-24 pb-10 border-t border-white/5 grain-overlay">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <div className="font-serif text-5xl md:text-7xl leading-none tracking-tight">
              Lucas <em className="not-italic text-neon">Azaro</em>
              <span className="caret align-baseline" />
            </div>
            <p className="mt-6 font-mono text-xs tracking-[0.25em] uppercase text-white/45">{t.footer.tag}</p>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-6">
            <div>
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40">EMAIL</div>
              <a href={`mailto:${EMAIL}`} className="mt-2 block font-sans text-sm text-white/80 hover:text-neon transition-colors">{EMAIL}</a>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40">PHONE</div>
              <a href={`tel:${PHONE.replace(/[^+\d]/g, "")}`} className="mt-2 block font-sans text-sm text-white/80 hover:text-neon transition-colors">{PHONE}</a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/35">© {new Date().getFullYear()} Lucas Azaro · {t.footer.rights}</p>
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/35">[ Crafted in Noir Editorial Tech ]</p>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------- App --------------------------------- */
export default function App() {
  const [lang, setLang] = useState(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("lang") : null;
    return saved === "en" ? "en" : "pt";
  });
  useEffect(() => {
    window.localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useMemo(() => DICT[lang], [lang]);

  useReveal();

  return (
    <div className="App min-h-screen bg-ink text-white">
      <Toaster theme="dark" position="top-right" toastOptions={{ className: "font-sans" }} />
      <Nav lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <About t={t} />
        <Services t={t} />
        <Credentials t={t} />
        <Cases t={t} />
        <Contact t={t} lang={lang} />
      </main>
      <Footer t={t} />
    </div>
  );
}
