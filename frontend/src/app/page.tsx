import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FileText,
  Zap,
  Users,
  Download,
  BookOpen,
  History,
  Shield,
  ArrowRight,
  Upload,
  Sparkles,
  Eye,
  Send,
  Check,
  Star,
  Quote,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────────── */

const features = [
  {
    icon: Zap,
    title: "AI-Powered DOCX → LaTeX",
    desc: "Upload Word documents and our AI converts them to publication-ready LaTeX with proper formatting, citations, and math equations preserved.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Users,
    title: "Real-Time Collaboration",
    desc: "Edit manuscripts simultaneously with co-authors. Track changes, leave comments, and chat — all synced in real-time via WebSocket.",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: Download,
    title: "Multi-Format Export",
    desc: "One source, six formats. Export to PDF, LaTeX, HTML, XML, JATS XML, and ePUB — ready for any publisher or repository.",
    color: "from-emerald-400 to-green-500",
  },
  {
    icon: BookOpen,
    title: "Journal Template Library",
    desc: "Publisher-approved templates for Nature, IEEE, Springer, Elsevier, and more — with class files, BibTeX styles, and custom macros.",
    color: "from-purple-400 to-violet-500",
  },
  {
    icon: History,
    title: "Version History & Diff",
    desc: "Every keystroke tracked. Compare revisions side-by-side, label milestones, and restore any previous version instantly.",
    color: "from-rose-400 to-pink-500",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    desc: "Role-based access control, encrypted storage, audit logs, SSO/OAuth support, and SOC 2-ready infrastructure.",
    color: "from-slate-400 to-gray-600",
  },
];

const workflow = [
  { step: 1, icon: Upload, title: "Upload or Start Fresh", desc: "Import your existing DOCX/LaTeX files or start with a journal template." },
  { step: 2, icon: Sparkles, title: "AI Formats & Structures", desc: "Our AI engine converts, formats, and structures your manuscript automatically." },
  { step: 3, icon: Eye, title: "Collaborate & Refine", desc: "Edit in real-time with co-authors. Preview the compiled PDF side-by-side." },
  { step: 4, icon: Send, title: "Export & Submit", desc: "Export in any format and submit directly to supported journals." },
];

const templates = [
  { name: "Nature", type: "Research Article", tag: "Popular" },
  { name: "IEEE", type: "Conference Paper", tag: "Popular" },
  { name: "Springer", type: "Journal Article", tag: null },
  { name: "Elsevier", type: "Review Paper", tag: null },
  { name: "ACM", type: "Proceedings", tag: "New" },
  { name: "PLOS ONE", type: "Open Access", tag: null },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "For individual researchers getting started.",
    features: [
      "1 active project",
      "Basic DOCX → LaTeX conversion",
      "PDF export",
      "Community templates",
      "7-day version history",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$15",
    period: "/month",
    desc: "For researchers who need advanced tools.",
    features: [
      "Unlimited projects",
      "AI-powered conversion + formatting",
      "All 6 export formats",
      "All journal templates",
      "Unlimited version history",
      "Real-time collaboration (up to 5)",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    desc: "For labs and research groups.",
    features: [
      "Everything in Pro",
      "Unlimited collaborators",
      "Admin dashboard & RBAC",
      "Custom templates & branding",
      "API access & webhooks",
      "SSO / SAML integration",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const testimonials = [
  {
    quote: "PaperScript cut our submission prep time from days to hours. The AI conversion from Word to LaTeX is remarkably accurate.",
    author: "Dr. Sarah Chen",
    role: "Principal Investigator, MIT",
    avatar: "SC",
  },
  {
    quote: "Finally, a platform that understands academic publishing. The real-time collaboration is game-changing for our distributed team.",
    author: "Prof. James Müller",
    role: "Research Director, ETH Zurich",
    avatar: "JM",
  },
  {
    quote: "We switched from Overleaf and haven't looked back. The multi-format export alone saves us countless hours per publication cycle.",
    author: "Dr. Priya Sharma",
    role: "Editor-in-Chief, Springer Nature",
    avatar: "PS",
  },
];

/* ─── Page ─────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* ──── HERO ──── */}
        <section className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-100/50 blur-3xl" />
            <div className="absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-accent-100/40 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 text-center lg:pt-28">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Scientific Publishing
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Write. Collaborate.{" "}
              <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                Publish.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              The enterprise platform for scientific manuscripts. Convert DOCX to LaTeX with AI,
              collaborate in real-time, and export to six publication formats — all in one place.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 text-base">
                  Start Writing Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button variant="secondary" size="lg" className="text-base">
                  Watch Demo
                </Button>
              </Link>
            </div>

            <p className="mt-4 text-sm text-gray-400">
              No credit card required · Free forever plan · Cancel anytime
            </p>
          </div>
        </section>

        {/* ──── PRODUCT DEMO / EDITOR PREVIEW ──── */}
        <section id="demo" className="relative bg-gray-50 py-4">
          <div className="mx-auto max-w-6xl px-6">
            {/* Browser mockup */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/60">
              {/* Title bar */}
              <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="ml-4 flex-1 rounded-md bg-gray-100 px-3 py-1 text-center text-xs text-gray-400">
                  paperscript.wyze.pro/editor
                </div>
              </div>

              {/* Editor layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: code editor */}
                <div className="border-r border-gray-100 p-6">
                  <div className="mb-4 flex items-center gap-2 text-xs text-gray-400">
                    <FileText className="h-3.5 w-3.5" />
                    manuscript.tex
                  </div>
                  <pre className="space-y-1 font-mono text-xs leading-relaxed text-gray-600">
                    <code>
                      <span className="text-purple-600">\documentclass</span>
                      <span className="text-gray-400">{"{"}article{"}"}  </span>{"\n"}
                      <span className="text-purple-600">\usepackage</span>
                      <span className="text-gray-400">{"{"}amsmath, graphicx{"}"}  </span>{"\n\n"}
                      <span className="text-purple-600">\title</span>
                      <span className="text-gray-400">{"{"}Deep Learning for Climate</span>{"\n"}
                      <span className="text-gray-800">  Pattern Recognition</span>
                      <span className="text-gray-400">{"}"}  </span>{"\n"}
                      <span className="text-purple-600">\author</span>
                      <span className="text-gray-400">{"{"}S. Chen, J. Müller{"}"}  </span>{"\n\n"}
                      <span className="text-purple-600">\begin</span>
                      <span className="text-gray-400">{"{"}document{"}"}  </span>{"\n"}
                      <span className="text-purple-600">\maketitle</span>{"\n"}
                      <span className="text-purple-600">\begin</span>
                      <span className="text-gray-400">{"{"}abstract{"}"}  </span>{"\n"}
                      <span className="text-gray-800">  We present a novel approach...</span>{"\n"}
                      <span className="text-purple-600">\end</span>
                      <span className="text-gray-400">{"{"}abstract{"}"}  </span>
                    </code>
                  </pre>
                </div>

                {/* Right: PDF preview */}
                <div className="bg-gray-50/50 p-6">
                  <div className="mb-4 flex items-center gap-2 text-xs text-gray-400">
                    <Eye className="h-3.5 w-3.5" />
                    Live Preview
                  </div>
                  <div className="rounded-lg bg-white p-8 shadow-sm border border-gray-100">
                    <h2 className="text-center text-lg font-bold text-gray-900">
                      Deep Learning for Climate Pattern Recognition
                    </h2>
                    <p className="mt-1 text-center text-sm text-gray-500">
                      S. Chen, J. Müller
                    </p>
                    <div className="mt-6 space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-700">Abstract</p>
                      <p className="text-xs leading-relaxed text-gray-600">
                        We present a novel approach to identifying climate patterns using
                        deep neural networks trained on satellite imagery spanning 40 years of
                        observational data. Our model achieves state-of-the-art accuracy...
                      </p>
                      <div className="mt-4 h-24 rounded bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center border border-dashed border-primary-200">
                        <span className="text-xs text-primary-400">Figure 1: Model Architecture</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──── FEATURES ──── */}
        <section id="features" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">Features</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Everything researchers need
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                From manuscript creation to journal submission — one platform for the entire academic publishing workflow.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-gray-100 bg-white p-7 transition-all hover:border-gray-200 hover:shadow-lg"
                >
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} shadow-sm`}>
                    <f.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-gray-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──── WORKFLOW ──── */}
        <section id="workflow" className="border-t border-gray-100 bg-gray-50 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">How It Works</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                From draft to publication in four steps
              </h2>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {workflow.map((w) => (
                <div key={w.step} className="relative text-center">
                  {w.step < 4 && (
                    <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-gradient-to-r from-primary-200 to-transparent lg:block" />
                  )}
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md border border-gray-100">
                    <w.icon className="h-7 w-7 text-primary-600" />
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                      {w.step}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-gray-900">{w.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──── TEMPLATES ──── */}
        <section id="templates" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">Templates</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Publisher-approved journal templates
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Start with a template that matches your target journal. Class files, bibliography styles, and formatting rules — all pre-configured.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-6 py-5 transition-all hover:border-primary-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 font-mono text-sm font-bold text-gray-600">
                      {t.name.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.type}</p>
                    </div>
                  </div>
                  {t.tag && (
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      t.tag === "Popular"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}>
                      {t.tag}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/templates" className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
                Browse all templates <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ──── PRICING ──── */}
        <section id="pricing" className="border-t border-gray-100 bg-gray-50 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">Pricing</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Plans for every research stage
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Start free, upgrade when you need more power. All plans include core editing and PDF export.
              </p>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border bg-white p-8 transition-shadow ${
                    plan.highlighted
                      ? "border-primary-300 shadow-xl shadow-primary-100/50 ring-1 ring-primary-200"
                      : "border-gray-200 hover:shadow-lg"
                  }`}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 px-4 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{plan.desc}</p>
                  <div className="mt-6">
                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  </div>
                  <ul className="mt-8 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/dashboard" className="mt-8 block">
                    <Button
                      variant={plan.highlighted ? "primary" : "outline"}
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──── TESTIMONIALS ──── */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">Testimonials</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Trusted by researchers worldwide
              </h2>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {testimonials.map((t) => (
                <div
                  key={t.author}
                  className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
                >
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="mt-4 h-6 w-6 text-gray-200" />
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.quote}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{t.author}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──── FINAL CTA ──── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-accent-500/20 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to transform your publishing workflow?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
              Join thousands of researchers who write, collaborate, and publish with PaperScript.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="gap-2 bg-white text-primary-700 hover:bg-gray-50 focus:ring-white"
                >
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#pricing">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10 hover:text-white"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
