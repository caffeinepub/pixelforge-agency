import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Eye,
  Film,
  Instagram,
  LayoutDashboard,
  Linkedin,
  Loader2,
  Mail,
  Menu,
  PenLine,
  Share2,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Twitter,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "./hooks/useInView";
import { usePortfolioItems, useSubmitContactForm } from "./hooks/useQueries";

/* ───────── Helpers ───────────────────────────────────────────── */

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

function RevealSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal", isVisible && "visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="h-px w-8 bg-primary" />
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary font-body">
        {children}
      </span>
      <div className="h-px w-8 bg-primary" />
    </div>
  );
}

function SectionDivider() {
  return <div className="section-divider my-0" />;
}

/* ───────── Navbar ────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function handleScrollTo(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent",
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleScrollTo("#home")}
          className="font-display font-black text-xl tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          Pixel<span className="text-primary glow-text">Forge</span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <button
                type="button"
                data-ocid={`nav.link.${i + 1}`}
                onClick={() => handleScrollTo(link.href)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-card"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          type="button"
          data-ocid="nav.primary_button"
          onClick={() => handleScrollTo("#contact")}
          className="hidden md:inline-flex items-center gap-2 btn-primary px-5 py-2 rounded-md text-sm font-semibold font-body"
        >
          Start a Project <ArrowRight size={14} />
        </button>

        {/* Hamburger */}
        <button
          type="button"
          className="md:hidden text-foreground p-2 rounded-md hover:bg-card transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden animate-slide-down bg-card/95 backdrop-blur-md border-b border-border px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <button
                  type="button"
                  data-ocid={`nav.link.${i + 1}`}
                  onClick={() => handleScrollTo(link.href)}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background/50 rounded-md transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="mt-2">
              <button
                type="button"
                data-ocid="nav.primary_button"
                onClick={() => handleScrollTo("#contact")}
                className="w-full btn-primary px-5 py-2.5 rounded-md text-sm font-semibold text-center font-body"
              >
                Start a Project
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

/* ───────── Hero ──────────────────────────────────────────────── */

const PARTICLES: Array<{
  x: string;
  y: string;
  size: number;
  duration: string;
  delay: string;
  id: string;
}> = [
  { x: "10%", y: "20%", size: 3, duration: "6s", delay: "0s", id: "p1" },
  { x: "85%", y: "15%", size: 4, duration: "8s", delay: "1s", id: "p2" },
  { x: "25%", y: "70%", size: 2, duration: "5s", delay: "2s", id: "p3" },
  { x: "70%", y: "65%", size: 3, duration: "7s", delay: "0.5s", id: "p4" },
  { x: "50%", y: "85%", size: 2, duration: "9s", delay: "1.5s", id: "p5" },
  { x: "90%", y: "50%", size: 4, duration: "6s", delay: "3s", id: "p6" },
  { x: "15%", y: "45%", size: 2, duration: "8s", delay: "2.5s", id: "p7" },
  { x: "60%", y: "30%", size: 3, duration: "5s", delay: "1s", id: "p8" },
  { x: "40%", y: "10%", size: 2, duration: "7s", delay: "0.8s", id: "p9" },
  { x: "78%", y: "88%", size: 3, duration: "6s", delay: "3.5s", id: "p10" },
];

function Hero() {
  function handleScrollTo(href: string) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image + overlays */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/assets/generated/hero-bg.dim_1600x900.jpg)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      <div className="absolute inset-0 bg-grid" />

      {/* Particles */}
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={
            {
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              "--duration": p.duration,
              "--delay": p.delay,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-12">
        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <Badge
            className="mb-6 border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 text-xs tracking-widest uppercase font-semibold py-1 px-4"
            variant="outline"
          >
            <Zap size={10} className="mr-1.5" /> Creative Digital Agency
          </Badge>
        </div>

        <h1
          className="animate-fade-in-up font-display font-black leading-tight tracking-tight mb-6"
          style={{
            fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
            animationDelay: "0.2s",
          }}
        >
          Forging Powerful <span className="shimmer-text">Digital</span>{" "}
          <br className="hidden sm:block" />
          Brands
        </h1>

        <p
          className="animate-fade-in-up text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-body"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            animationDelay: "0.35s",
          }}
        >
          We transform your business presence through bold design, compelling
          content, and precision strategy that moves the needle.
        </p>

        <div
          className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animationDelay: "0.5s" }}
        >
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={() => handleScrollTo("#portfolio")}
            className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-md text-base font-semibold font-body w-full sm:w-auto justify-center"
          >
            View Work <ChevronRight size={16} />
          </button>
          <button
            type="button"
            data-ocid="hero.secondary_button"
            onClick={() => handleScrollTo("#contact")}
            className="btn-outline inline-flex items-center gap-2 px-8 py-3.5 rounded-md text-base font-semibold font-body w-full sm:w-auto justify-center"
          >
            Start a Project
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className="animate-fade-in-up mt-16 flex flex-col items-center gap-2 text-muted-foreground/50"
          style={{ animationDelay: "0.8s" }}
        >
          <span className="text-xs tracking-widest uppercase font-body">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ───────── About ─────────────────────────────────────────────── */

const STATS = [
  { value: "50+", label: "Brands Built", id: "brands" },
  { value: "3+", label: "Years Experience", id: "years" },
  { value: "100%", label: "Client Focused", id: "clients" },
];

function About() {
  return (
    <section
      id="about"
      data-ocid="about.section"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <RevealSection>
            <SectionLabel>About Us</SectionLabel>
            <h2 className="font-display font-black text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
              The Digital <span className="text-primary">Forge</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 font-body text-base lg:text-lg">
              PixelForge is a creative digital forge — where raw brand potential
              is heated, shaped, and refined into strong, memorable online
              identities. We work with startups and growing businesses to build
              the digital presence they deserve.
            </p>
            <p className="text-muted-foreground leading-relaxed font-body text-base lg:text-lg">
              Born from a passion for design and driven by measurable results,
              our team crafts every brand story with intentionality, precision,
              and a relentless focus on growth.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <div className="w-12 h-px bg-primary" />
              <span className="text-sm text-primary font-semibold tracking-wider uppercase font-body">
                Strategy · Design · Growth
              </span>
            </div>
          </RevealSection>

          {/* Stat cards */}
          <div className="grid grid-cols-1 gap-4">
            {STATS.map((stat, i) => (
              <RevealSection key={stat.id} delay={i * 120}>
                <div className="card-hover bg-card border border-border rounded-xl p-6 flex items-center gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center glow-blue-sm">
                    <span className="font-display font-black text-2xl text-primary">
                      {stat.value.replace("+", "").replace("%", "")}
                    </span>
                  </div>
                  <div>
                    <div className="font-display font-black text-3xl text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-sm font-body mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Services ──────────────────────────────────────────── */

const SERVICES = [
  {
    id: "social",
    icon: Share2,
    title: "Social Media Management",
    desc: "Strategic social presence that builds audiences and drives meaningful engagement across every platform.",
    color: "text-blue-400",
  },
  {
    id: "content",
    icon: PenLine,
    title: "Content Creation",
    desc: "Compelling content that tells your story, builds authority, and converts your target audience.",
    color: "text-cyan-400",
  },
  {
    id: "video",
    icon: Film,
    title: "Video Editing",
    desc: "Cinematic edits that bring your brand to life on screen — from short-form reels to full productions.",
    color: "text-indigo-400",
  },
  {
    id: "brand",
    icon: Sparkles,
    title: "Brand Identity Design",
    desc: "Complete visual identity from logo to brand guidelines — everything your brand needs to stand out.",
    color: "text-sky-400",
  },
  {
    id: "revamp",
    icon: LayoutDashboard,
    title: "Page Revamp",
    desc: "Transform outdated pages into high-converting digital experiences that drive real business results.",
    color: "text-teal-400",
  },
];

function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <SectionDivider />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <RevealSection className="text-center mb-14">
          <SectionLabel>Our Services</SectionLabel>
          <h2 className="font-display font-black text-4xl lg:text-5xl tracking-tight">
            What We <span className="text-primary">Forge</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto font-body">
            Five core disciplines. One unified mission: making your brand
            impossible to ignore.
          </p>
        </RevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <RevealSection key={svc.id} delay={i * 80}>
                <div
                  data-ocid={`services.item.${i + 1}`}
                  className="card-hover bg-card border border-border rounded-2xl p-7 h-full flex flex-col gap-5 cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center flex-shrink-0">
                    <Icon className={cn("w-5 h-5", svc.color)} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-2">
                      {svc.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-body">
                      {svc.desc}
                    </p>
                  </div>
                </div>
              </RevealSection>
            );
          })}

          {/* Filler card */}
          <RevealSection delay={5 * 80}>
            <div className="card-hover bg-primary/5 border border-primary/20 rounded-2xl p-7 h-full flex flex-col justify-center items-center text-center gap-4 cursor-default">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <p className="font-display font-bold text-foreground">
                Custom Projects
              </p>
              <p className="text-muted-foreground text-sm font-body">
                Have a unique challenge? We love building something new.
              </p>
              <button
                type="button"
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary text-sm px-5 py-2 rounded-md font-semibold font-body"
              >
                Let's Talk
              </button>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

/* ───────── Portfolio ─────────────────────────────────────────── */

const STATIC_PORTFOLIO = [
  {
    id: "portfolio-brand",
    image: "/assets/generated/portfolio-brand.dim_800x600.jpg",
    category: "Brand Identity",
    title: "TechVault Rebrand",
    description:
      "Complete visual identity overhaul — logo, typography, color system, and brand guidelines.",
  },
  {
    id: "portfolio-social",
    image: "/assets/generated/portfolio-social.dim_800x600.jpg",
    category: "Social Media",
    title: "Novex Social Campaign",
    description:
      "Multi-platform social campaign generating 300% engagement increase in 90 days.",
  },
  {
    id: "portfolio-web",
    image: "/assets/generated/portfolio-web.dim_800x600.jpg",
    category: "Page Revamp",
    title: "Prism Web Overhaul",
    description:
      "Landing page redesign boosting conversion rate from 1.2% to 4.8%.",
  },
  {
    id: "portfolio-video",
    image: "/assets/generated/portfolio-video.dim_800x600.jpg",
    category: "Video Editing",
    title: "Apex Product Reel",
    description:
      "Cinematic 60-second product reel that drove 2M+ organic views on launch day.",
  },
];

const SKELETON_ITEMS = ["sk1", "sk2", "sk3", "sk4"];

function PortfolioCard({
  image,
  category,
  title,
  description,
  ocid,
}: {
  image: string;
  category: string;
  title: string;
  description: string;
  ocid: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-ocid={ocid}
      className="relative rounded-2xl overflow-hidden border border-border bg-card cursor-pointer"
      style={{
        transition:
          "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
          loading="lazy"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to top, oklch(0.08 0.01 250 / 0.95) 0%, oklch(0.08 0.01 250 / 0.6) 50%, transparent 100%)",
            opacity: hovered ? 1 : 0.65,
          }}
        >
          <Badge
            className="w-fit mb-2 border border-primary/40 bg-primary/15 text-primary text-xs font-semibold"
            variant="outline"
          >
            {category}
          </Badge>
          <h3 className="font-display font-bold text-foreground text-lg leading-tight">
            {title}
          </h3>
          <p
            className="text-muted-foreground text-xs leading-relaxed font-body mt-1.5 transition-all duration-300"
            style={{
              maxHeight: hovered ? "60px" : "0",
              opacity: hovered ? 1 : 0,
              overflow: "hidden",
            }}
          >
            {description}
          </p>
        </div>
      </div>
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300"
        style={{
          boxShadow: hovered
            ? "0 0 20px oklch(0.65 0.22 240 / 0.3), inset 0 0 0 1px oklch(0.65 0.22 240 / 0.4)"
            : "none",
        }}
      />
    </div>
  );
}

function Portfolio() {
  const { data: backendItems, isLoading } = usePortfolioItems();

  const allItems = [
    ...STATIC_PORTFOLIO,
    ...(backendItems ?? []).map((item) => ({
      id: `backend-${item.title}`,
      image: item.imageUrl,
      category: item.category,
      title: item.title,
      description: item.description,
    })),
  ];

  return (
    <section id="portfolio" className="relative py-24 lg:py-32">
      <SectionDivider />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <RevealSection className="text-center mb-14">
          <SectionLabel>Portfolio</SectionLabel>
          <h2 className="font-display font-black text-4xl lg:text-5xl tracking-tight">
            Our Forge <span className="text-primary">Work</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto font-body">
            Each project is a testament to the craft — purposeful, bold, and
            built to perform.
          </p>
        </RevealSection>

        {isLoading && (
          <div
            data-ocid="portfolio.loading_state"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8"
          >
            {SKELETON_ITEMS.map((id) => (
              <div
                key={id}
                className="rounded-2xl overflow-hidden border border-border"
              >
                <div className="skeleton aspect-[4/3]" />
                <div className="p-4 space-y-2 bg-card">
                  <div className="skeleton h-4 w-20 rounded" />
                  <div className="skeleton h-5 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && allItems.length === 0 && (
          <div
            data-ocid="portfolio.empty_state"
            className="text-center py-16 text-muted-foreground font-body"
          >
            No portfolio items yet.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {allItems.map((item, i) => (
            <RevealSection key={item.id} delay={i * 90}>
              <PortfolioCard
                image={item.image}
                category={item.category}
                title={item.title}
                description={item.description}
                ocid={`portfolio.item.${i + 1}`}
              />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Why Us ────────────────────────────────────────────── */

const WHY_US = [
  {
    id: "creativity",
    icon: Star,
    title: "Creative Excellence",
    desc: "Every pixel crafted with intentionality and artistic vision — no shortcuts, no templates.",
    num: "01",
  },
  {
    id: "strategy",
    icon: Target,
    title: "Strategy-Driven",
    desc: "Data-informed decisions that move your brand metrics in the right direction, every time.",
    num: "02",
  },
  {
    id: "aesthetics",
    icon: Eye,
    title: "Modern Aesthetics",
    desc: "Design trends that keep your brand ahead of the curve and ahead of your competitors.",
    num: "03",
  },
  {
    id: "growth",
    icon: TrendingUp,
    title: "Growth-Focused",
    desc: "Everything we build is engineered for measurable, sustainable growth for your business.",
    num: "04",
  },
];

function WhyUs() {
  return (
    <section id="why-us" className="relative py-24 lg:py-32 overflow-hidden">
      <SectionDivider />
      {/* Glow blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.65 0.22 240) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <RevealSection className="text-center mb-14">
          <SectionLabel>Why PixelForge</SectionLabel>
          <h2 className="font-display font-black text-4xl lg:text-5xl tracking-tight">
            Why Brands <span className="text-primary">Choose Us</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto font-body">
            We don't just build brands — we build momentum.
          </p>
        </RevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {WHY_US.map((item, i) => {
            const Icon = item.icon;
            return (
              <RevealSection key={item.id} delay={i * 100}>
                <div
                  data-ocid={`whyus.item.${i + 1}`}
                  className="card-hover relative bg-card border border-border rounded-2xl p-8 overflow-hidden cursor-default"
                >
                  {/* Decorative number */}
                  <span
                    className="absolute top-4 right-6 font-display font-black text-6xl leading-none pointer-events-none select-none"
                    style={{ color: "oklch(0.65 0.22 240 / 0.07)" }}
                  >
                    {item.num}
                  </span>

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-body text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </RevealSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────── Contact ───────────────────────────────────────────── */

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const mutation = useSubmitContactForm();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    mutation.mutate({
      name: form.name,
      email: form.email,
      subject: form.subject || null,
      message: form.message,
    });
  }

  const isSuccess = mutation.isSuccess;
  const isError = mutation.isError;
  const isPending = mutation.isPending;

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <SectionDivider />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <RevealSection className="text-center mb-14">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="font-display font-black text-4xl lg:text-5xl tracking-tight">
            Start Your <span className="text-primary">Project</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto font-body">
            Ready to forge something remarkable? Drop us a message and let's
            make it happen.
          </p>
        </RevealSection>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Form */}
          <RevealSection className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-2xl p-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-foreground font-body"
                  >
                    Name <span className="text-primary">*</span>
                  </label>
                  <Input
                    id="contact-name"
                    data-ocid="contact.input"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-background border-border focus:border-primary focus:ring-primary/30 font-body"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-foreground font-body"
                  >
                    Email <span className="text-primary">*</span>
                  </label>
                  <Input
                    id="contact-email"
                    data-ocid="contact.email.input"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                    className="bg-background border-border focus:border-primary focus:ring-primary/30 font-body"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-subject"
                  className="text-sm font-medium text-foreground font-body"
                >
                  Subject{" "}
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </label>
                <Input
                  id="contact-subject"
                  data-ocid="contact.subject.input"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's it about?"
                  className="bg-background border-border focus:border-primary focus:ring-primary/30 font-body"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium text-foreground font-body"
                >
                  Message <span className="text-primary">*</span>
                </label>
                <Textarea
                  id="contact-message"
                  data-ocid="contact.textarea"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  required
                  rows={5}
                  className="bg-background border-border focus:border-primary focus:ring-primary/30 resize-none font-body"
                />
              </div>

              <button
                data-ocid="contact.submit_button"
                type="submit"
                disabled={isPending}
                className="btn-primary w-full py-3 rounded-md text-sm font-semibold font-body flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send Message <ArrowRight size={14} />
                  </>
                )}
              </button>

              {isSuccess && (
                <div
                  data-ocid="contact.success_state"
                  className="flex items-center gap-3 p-4 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-body"
                >
                  <CheckCircle2 size={16} className="flex-shrink-0" />
                  Message sent! We'll be in touch within 24 hours.
                </div>
              )}

              {isError && (
                <div
                  data-ocid="contact.error_state"
                  className="flex items-center gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-body"
                >
                  <AlertCircle size={16} className="flex-shrink-0" />
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </RevealSection>

          {/* Contact info */}
          <RevealSection className="lg:col-span-2" delay={150}>
            <div className="space-y-8">
              {/* Email */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-display font-bold text-foreground">
                    Email Us
                  </span>
                </div>
                <a
                  href="mailto:hello@pixelforge.studio"
                  className="text-primary hover:underline font-body text-sm"
                >
                  hello@pixelforge.studio
                </a>
                <p className="text-muted-foreground text-xs mt-1 font-body">
                  We respond within 24 hours
                </p>
              </div>

              {/* Social */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <p className="font-display font-bold text-foreground mb-4">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: Twitter, label: "Twitter", href: "#" },
                    { icon: Instagram, label: "Instagram", href: "#" },
                    { icon: Linkedin, label: "LinkedIn", href: "#" },
                  ].map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 rounded-lg border border-border hover:border-primary/50 bg-background hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Tagline */}
              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.12 0.015 250) 0%, oklch(0.15 0.04 240) 100%)",
                  border: "1px solid oklch(0.65 0.22 240 / 0.2)",
                }}
              >
                <div className="font-display font-black text-2xl text-primary mb-2">
                  Let's Build
                </div>
                <p className="text-muted-foreground text-sm font-body">
                  Something extraordinary together.
                </p>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

/* ───────── Footer ────────────────────────────────────────────── */

function Footer() {
  const year = new Date().getFullYear();

  function handleScrollTo(href: string) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <footer className="relative border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="font-display font-black text-2xl tracking-tight">
              Pixel<span className="text-primary">Forge</span>
            </div>
            <p className="text-muted-foreground text-sm font-body leading-relaxed max-w-xs">
              Forging Digital Excellence — one brand at a time.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: "Twitter", href: "#" },
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-md border border-border hover:border-primary/50 bg-background hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-display font-bold text-foreground mb-4 text-sm tracking-wider uppercase">
              Quick Links
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleScrollTo(link.href)}
                    className="text-muted-foreground hover:text-primary text-sm font-body transition-colors inline-flex items-center gap-1.5"
                  >
                    <ChevronRight size={12} className="text-primary/50" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <p className="font-display font-bold text-foreground mb-4 text-sm tracking-wider uppercase">
              Contact
            </p>
            <div className="space-y-3">
              <a
                href="mailto:hello@pixelforge.studio"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm font-body transition-colors"
              >
                <Mail size={14} className="text-primary flex-shrink-0" />
                hello@pixelforge.studio
              </a>
            </div>
          </div>
        </div>

        <div className="section-divider mt-10 mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground font-body">
          <span>© {year} PixelForge. All rights reserved.</span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ───────── App ───────────────────────────────────────────────── */

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
