import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Suspense, lazy, useState } from "react";
import profile from "@/assets/profile.jpeg";
import {
  Fish,
  Bug,
  FileText,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Award,
  BookOpen,
  Microscope,
  Globe,
} from "lucide-react";

const Scene3D = lazy(() => import("@/components/Scene3D"));
import PDFViewer from "@/components/PDFViewer";
import fishSomyaPdf from "@/assets/papers/Fish_somya.pdf";
import butterflyPdf from "@/assets/papers/butterfly.pdf";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Soumya Ranjan Satapathy — Aquatic Biodiversity Researcher" },
      {
        name: "description",
        content:
          "Portfolio of Soumya Ranjan Satapathy — ichthyofaunal diversity, freshwater ecology, and conservation research from the Mahanadi River Basin.",
      },
      { property: "og:title", content: "Soumya Ranjan Satapathy — Researcher" },
      { property: "og:description", content: "Freshwater fish diversity & conservation research." },
    ],
  }),
  component: Portfolio,
});

const stats = [
  { label: "Species Documented", value: "602" },
  { label: "Publications", value: "9" },
  { label: "Field Surveys", value: "28" },
  { label: "Years Research", value: "5+" },
];

const focus = [
  { icon: Fish, label: "Ichthyology", desc: "Freshwater fish diversity" },
  { icon: Bug, label: "Lepidoptera", desc: "Butterfly biogeography" },
];

const skills = [
  "Ichthyology",
  "Lepidoptera",
  "Taxonomy",
  "Freshwater Ecology",
  "Biodiversity Assessment",
  "GIS Mapping",
  "Statistical Analysis",
  "Conservation Biology",
  "Field Sampling",
];

const papers = [
  {
    featured: true,
    title:
      "Exploring the Freshwater Fish Diversity of the Mahanadi River Basin, India: A Taxonomically Updated and Validated Checklist",
    journal: "Annual Research & Review in Biology",
    vol: "Vol. 41, Issue 2, pp. 69–99",
    year: "2026",
    doi: "10.9734/arrb/2026/v41i22376",
    abstract:
      "A comprehensive synthesis of ichthyofaunal records (1940–2025) documenting 173 fish species across the Mahanadi basin — including 121 food fishes, 20 ornamentals, and IUCN-status assessment of conservation priorities.",
    href: fishSomyaPdf,
    tags: ["Ichthyology", "Conservation", "Taxonomy"],
  },
  {
    featured: true,
    title:
      "Butterfly (Lepidoptera) Diversity Across Four Biogeographical Regions of India: A Systematic Review",
    journal: "Acta Entomology and Zoology",
    vol: "Vol. 7, Issue 3, pp. 26–38",
    year: "2026",
    doi: "10.33545/27080013.2026.v7.i3a.298",
    abstract:
      "A systematic review of 429 butterfly species across six families spanning the Deccan Peninsula, Western Ghats, East Coast, and West Coast — with Nymphalidae emerging as the dominant family.",
    href: butterflyPdf,
    tags: ["Lepidoptera", "Biogeography", "Review"],
  },
];

const featuredPapers = papers.filter((p) => p.featured);

function Portfolio() {
  const [selectedPaper, setSelectedPaper] = useState<{
    title: string;
    href: string;
    doi?: string;
    journal?: string;
    abstract?: string;
  } | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between glass rounded-b-2xl">
          <div className="flex items-center gap-2">
            <Fish className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold tracking-tight">
              Soumya Ranjan Satapathy
            </span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm text-muted-foreground">
            <a href="#research" className="hover:text-primary transition">
              Research
            </a>
            <a href="#about" className="hover:text-primary transition">
              About
            </a>
            <a href="#publications" className="hover:text-primary transition">
              Publications
            </a>
            <a href="#contact" className="hover:text-primary transition">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-mono text-primary mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Researcher · Dept. of Zoology
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6">
              Mapping life from <span className="text-gradient">river beds</span> to{" "}
              <span className="text-gradient">forest canopies</span>.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-6">
              I'm Soumya Ranjan Satapathy — a zoologist studying India's biodiversity across two
              worlds: the freshwater fish of its great river basins, and the butterflies of its
              biogeographical regions.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {focus.map((f) => (
                <div
                  key={f.label}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full glass text-xs"
                >
                  <f.icon className="w-3.5 h-3.5 text-primary" />
                  <span className="font-mono font-medium">{f.label}</span>
                  <span className="text-muted-foreground">· {f.desc}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#research"
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium glow hover:scale-105 transition"
              >
                View Featured Papers
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-full glass font-medium hover:border-primary transition"
              >
                Get in touch
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 lg:ml-12"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-6">
                <div className="text-4xl font-display font-bold text-gradient">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Research */}
      <section id="research" className="relative py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-primary mb-2">
                ★ Featured Research
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Two studies. Two ecosystems.
              </h2>
            </div>
            <div className="text-sm text-muted-foreground font-mono">2026 · Peer Reviewed</div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {featuredPapers.map((p, idx) => {
              const Icon = idx === 0 ? Fish : Bug;
              return (
                <motion.article
                  key={p.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.15 }}
                  className="glass rounded-3xl p-8 relative overflow-hidden glow flex flex-col"
                >
                  <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
                  <div className="relative flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="text-xs font-mono text-muted-foreground">{p.year}</div>
                    </div>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-bold leading-tight mb-3">
                      {p.title}
                    </h3>
                    <div className="text-xs text-muted-foreground mb-4 font-mono">
                      {p.journal} · {p.vol}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                      {p.abstract}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedPaper(p)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:scale-105 transition cursor-pointer"
                      >
                        <FileText className="w-4 h-4" /> Read
                      </button>
                      <a
                        href={p.href}
                        download
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass text-sm font-medium hover:border-primary transition"
                      >
                        <Download className="w-4 h-4" /> PDF
                      </a>
                      <a
                        href={`https://doi.org/${p.doi}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass text-sm font-medium hover:border-primary transition"
                      >
                        <ExternalLink className="w-4 h-4" /> DOI
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Combined research highlights */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            {[
              { icon: Fish, label: "173", desc: "Fish species (Mahanadi)" },
              { icon: Bug, label: "429", desc: "Butterfly species (4 regions)" },
              { icon: Microscope, label: "1940–2025", desc: "Records synthesized" },
              { icon: Globe, label: "Pan-India", desc: "Field coverage" },
            ].map((k) => (
              <div key={k.desc} className="flex gap-3 p-4 rounded-2xl glass">
                <k.icon className="w-7 h-7 text-primary shrink-0" />
                <div>
                  <div className="font-display font-bold text-lg">{k.label}</div>
                  <div className="text-xs text-muted-foreground">{k.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-24 px-6">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-5 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/40 to-accent/40 blur-2xl" />
              <img
                src={profile}
                alt="Soumya Ranjan Satapathy"
                className="relative rounded-3xl w-full aspect-square object-cover border-2 border-border"
              />
              <div className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span className="text-sm font-mono">M.Sc. Zoology</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-primary mb-2">
              About
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Field biologist working across rivers and forests of India.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Based at the Department of Zoology, Maa Manikeshwari University, my work bridges
              traditional taxonomy with modern biodiversity informatics — from documenting
              freshwater fish in the Mahanadi basin to reviewing butterfly diversity across India's
              biogeographical regions.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              I collaborate across institutions to build open, reproducible datasets that support
              both academic research and community-led conservation.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-3 glass rounded-xl p-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">Kalahandi, Odisha · India</span>
              </div>
              <div className="flex items-center gap-3 glass rounded-xl p-3">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm">ORCID: 0009-0003-6548-5184</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-mono border border-border"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="relative py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <div className="text-xs font-mono uppercase tracking-widest text-primary mb-2">
              All Publications
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold">Selected Papers</h2>
          </div>

          <div className="grid gap-4">
            {papers.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 md:p-8 hover:border-primary transition group"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="md:w-20 shrink-0">
                    <div className="text-4xl font-display font-bold text-gradient">{p.year}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-display font-semibold mb-2 group-hover:text-primary transition">
                      {p.title}
                    </h3>
                    <div className="text-xs text-muted-foreground font-mono mb-3">
                      {p.journal} · {p.vol}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {p.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-full bg-secondary/60 text-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {p.href && (
                    <button
                      onClick={() => setSelectedPaper(p)}
                      className="shrink-0 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 glow"
          >
            <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Let's collaborate.</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Open to research collaborations, field expeditions, and inquiries on freshwater
              biodiversity in eastern India.
            </p>
            <a
              href="mailto:soumya.satapathy@example.in"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium glow hover:scale-105 transition"
            >
              <Mail className="w-4 h-4" />
              <span>soumyasatapathy36@gmail.com</span>
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-border text-center text-xs text-muted-foreground font-mono">
        © 2026 Soumya Ranjan Satapathy · Built with curiosity for aquatic life.
      </footer>

      <PDFViewer
        isOpen={selectedPaper !== null}
        onClose={() => setSelectedPaper(null)}
        title={selectedPaper?.title ?? ""}
        pdfUrl={selectedPaper?.href ?? ""}
        doi={selectedPaper?.doi}
        journal={selectedPaper?.journal}
        abstract={selectedPaper?.abstract}
      />
    </div>
  );
}
