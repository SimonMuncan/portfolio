import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Zap, ExternalLink } from 'lucide-react'

const stack = {
  Frontend: ['React Native', 'Expo SDK 54', 'Expo Router', 'NativeWind'],
  Backend: ['Python', 'FastAPI', 'SQLAlchemy (async)', 'Pydantic'],
  Data: ['PostgreSQL 16', 'pgvector', 'Time-series extensions'],
  Infrastructure: ['GCP Cloud Run', 'Cloud SQL', 'Secret Manager', 'Cloud Build', 'Terraform'],
  AI: ['Gemini Flash 2.0', 'Provider abstraction layer'],
  Auth: ['Firebase Auth'],
}

const decisions = [
  {
    title: 'Memory lives in the database, not the model',
    body: 'Rather than relying on the LLM\'s context window, Sithea rebuilds each conversation\'s context from the database on every call, across a layered memory model: working, daily, recent, and long-term. The model never has to remember anything - the system does. This makes memory durable, inspectable, and completely portable across AI providers.',
  },
  {
    title: 'A provider abstraction layer keeps the AI swappable',
    body: 'All AI calls go through a single interface for chat, streaming, and structured extraction, rather than calling a vendor SDK directly from business logic. Swapping the underlying model - or running different models for different tasks - needs no changes anywhere else in the codebase. No vendor lock-in by design.',
  },
  {
    title: 'Privacy is an architectural constraint, not a feature',
    body: 'Sensitive health data is isolated end to end: handled separately, never written to logs, never sent raw to third-party models, never used to train anyone\'s AI, and fully exportable and deletable by the user. The privacy guarantees are built into the data architecture rather than promised in a policy.',
  },
  {
    title: 'Single-tenant to multi-tenant, done deliberately',
    body: 'Moving from one hardcoded user to true multi-tenancy meant rethinking data isolation, authentication, per-tenant configuration, and cost-safe autoscaling. This was the highest-leverage architectural work in the project and the part I learned the most from.',
  },
  {
    title: 'Infrastructure as code from the start',
    body: 'The entire stack is defined in Terraform with separate dev, staging, and production environments, so the infrastructure is reproducible, reviewable, and version-controlled rather than clicked together by hand.',
  },
  {
    title: 'Serverless and cost-aware backend',
    body: 'The backend runs on GCP Cloud Run: containerised, request-based autoscaling, scale-to-zero when idle, with a separate worker service for scheduled background jobs. I also built a full cost model across user-scale tiers to keep the unit economics viable as it grows.',
  },
]

function CosmicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Aurora line */}
      <div
        className="absolute top-0 inset-x-0 h-px animate-aurora"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.5) 20%, rgba(34,211,238,0.7) 50%, rgba(124,58,237,0.5) 80%, transparent 100%)',
          boxShadow: '0 0 80px 12px rgba(124,58,237,0.18)',
        }}
      />
      {/* Top glow */}
      <div
        className="absolute top-0 inset-x-0 h-[600px]"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(124,58,237,0.11) 0%, transparent 70%)',
        }}
      />
      {/* Blob 1 — nebula, top-left */}
      <div
        className="absolute w-[900px] h-[900px] rounded-full opacity-[0.10] animate-blob-1"
        style={{
          background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
          top: '-20%',
          left: '-20%',
          filter: 'blur(90px)',
        }}
      />
      {/* Blob 2 — cosmic, bottom-right */}
      <div
        className="absolute w-[750px] h-[750px] rounded-full opacity-[0.08] animate-blob-2"
        style={{
          background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)',
          bottom: '10%',
          right: '-15%',
          filter: 'blur(100px)',
        }}
      />
      {/* Blob 3 — nebula, mid-page */}
      <div
        className="absolute w-[550px] h-[550px] rounded-full opacity-[0.07] animate-blob-3"
        style={{
          background: 'radial-gradient(circle, #A78BFA 0%, transparent 70%)',
          top: '45%',
          left: '35%',
          filter: 'blur(110px)',
        }}
      />
      {/* Blob 4 — nebula, top-right */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.06] animate-blob-4"
        style={{
          background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
          top: '10%',
          right: '8%',
          filter: 'blur(80px)',
        }}
      />
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.04] dot-grid-violet" />
    </div>
  )
}

function CaseStudyNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-void/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-ash hover:text-bone transition-colors duration-200 font-medium group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          Simon Muncan
        </Link>
        <a
          href="mailto:simonmuncan@gmail.com"
          className="text-sm border border-gold text-gold px-4 py-1.5 rounded-full hover:bg-gold hover:text-void transition-colors duration-300"
        >
          Hire me
        </a>
      </nav>
    </header>
  )
}

export default function SitheaCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative min-h-screen bg-void text-bone font-sans">
      <CosmicBackground />
      <CaseStudyNav />

      {/* All content sits above the fixed bg */}
      <div className="relative z-10">

        {/* Hero */}
        <section className="pt-36 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border bg-nebula/10 text-nebula border-nebula/20">
                <span className="w-1.5 h-1.5 rounded-full bg-nebula animate-pulse" />
                In Development
              </span>
              <span className="text-xs text-ash/70">Personal Project · June 2026 - Present</span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl mb-4">
              <span className="gradient-text">Sithea</span>
            </h1>
            <p className="text-xl sm:text-2xl text-bone/90 font-light mb-8 leading-relaxed">
              A private AI companion for living with a chronic condition.
            </p>
            <p className="text-ash max-w-2xl mb-10 leading-relaxed">
              Designed, built, and architected solo. Mobile app, backend API, cloud infrastructure, and a full custom design system.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {['React Native (Expo)', 'FastAPI', 'PostgreSQL', 'GCP Cloud Run', 'Terraform', 'Gemini'].map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-medium px-3 py-1 rounded-full border bg-nebula/10 text-nebula/80 border-nebula/20"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-nebula/30 to-transparent" />
          </div>
        </section>

        {/* Overview + Role */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass-card p-8">
              <p className="section-label mb-4">Overview</p>
              <p className="text-bone/90 leading-relaxed mb-4">
                Sithea is a personal AI health companion I am building end to end as a solo developer. It started as a single-user prototype and is now being re-architected into a multi-tenant product - the transition that turns a working demo into a real, scalable application.
              </p>
              <p className="text-ash leading-relaxed">
                I own every layer: the React Native mobile frontend, the FastAPI backend, the PostgreSQL data model, the GCP infrastructure, the CI/CD pipeline, and the entire visual design system. This project is where I pushed hardest on the parts of engineering that do not show up in tutorials - multi-tenancy, data isolation, infrastructure as code, and designing for a swappable AI layer.
              </p>
            </div>

            <div className="glass-card p-8 flex flex-col justify-center">
              <p className="section-label mb-4">My Role</p>
              <p className="text-bone/90 font-medium mb-3">Sole engineer, architect, and designer.</p>
              <ul className="space-y-1.5">
                {['Frontend', 'Backend', 'Database design', 'Cloud infrastructure', 'DevOps', 'UI/UX'].map((r) => (
                  <li key={r} className="text-xs text-ash flex items-center gap-2">
                    <span className="text-nebula">▸</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* The Challenge */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-6">
            <div className="glass-card p-8">
              <p className="section-label mb-4">The Challenge</p>
              <p className="text-bone/90 leading-relaxed mb-4">
                Most AI assistants are stateless and generic. They forget you between sessions and treat every user identically. Sithea's premise is the opposite: an assistant that genuinely learns an individual over time, while keeping that deeply personal data private and under the user's control.
              </p>
              <p className="text-ash leading-relaxed">
                That premise creates the hard engineering problems I wanted to solve. How do you give an AI durable, personal memory without the model itself remembering anything? How do you isolate sensitive data in a multi-tenant system so one user can never reach another's? How do you avoid locking the whole product to a single AI vendor? And how do you take something built for one person and make it safely serve thousands?
              </p>
            </div>
          </div>
        </section>

        {/* Engineering Decisions */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-10">
              <p className="section-label mb-2">Key Engineering Decisions</p>
              <h2 className="font-display text-2xl text-bone">The choices that shaped the architecture</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {decisions.map((d) => (
                <div key={d.title} className="glass-card p-7 glass-card-hover">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="mt-0.5 text-nebula flex-shrink-0">
                      <Zap size={16} />
                    </span>
                    <h3 className="text-sm font-semibold text-bone leading-snug">{d.title}</h3>
                  </div>
                  <p className="text-sm text-ash leading-relaxed pl-7">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Design */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-6">
            <div className="glass-card p-8">
              <p className="section-label mb-4">Design System</p>
              <h3 className="font-display text-lg text-bone mb-4">Sithea Cosmic Edition</h3>
              <div className="md:grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-bone/90 leading-relaxed mb-4">
                    I built Sithea's design system from scratch. A calm, trustworthy dark aesthetic in deep near-black, nebula purple, and cosmic cyan - with an animated orb as the assistant's identity, a custom starfield, and a consistent glass-card component language.
                  </p>
                  <p className="text-ash leading-relaxed">
                    For a health app the design has a job beyond looking good: it has to feel private and trustworthy in the first few seconds, or people will not enter sensitive data.
                  </p>
                </div>

                <div className="mt-6 md:mt-0 rounded-xl overflow-hidden border border-white/[0.08] bg-void flex items-center justify-center aspect-video relative">
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 70%)',
                    }}
                    aria-hidden="true"
                  />
                  <div className="text-center relative animate-float">
                    <div className="w-16 h-16 rounded-full mx-auto mb-3 border border-nebula/30 bg-nebula/10 flex items-center justify-center">
                      <Zap size={24} className="text-nebula" />
                    </div>
                    <p className="text-xs text-ash">Interactive prototype</p>
                    <p className="text-xs text-ash/70 mt-1">Coming soon</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { label: 'Deep near-black', color: '#05050E' },
                  { label: 'Nebula purple', color: '#7C3AED' },
                  { label: 'Cosmic cyan', color: '#22D3EE' },
                  { label: 'Soft white', color: '#EDEDF2' },
                ].map(({ label, color }) => (
                  <div key={label} className="flex items-center gap-2 text-xs text-ash">
                    <span className="w-4 h-4 rounded-full border border-white/10 flex-shrink-0" style={{ background: color }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-6">
            <div className="glass-card p-8">
              <p className="section-label mb-6">Tech Stack</p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Object.entries(stack).map(([category, techs]) => (
                  <div key={category}>
                    <p className="text-xs font-semibold text-ash uppercase tracking-widest mb-3">{category}</p>
                    <ul className="space-y-1.5">
                      {techs.map((t) => (
                        <li key={t} className="text-sm text-bone/90 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-nebula flex-shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Status */}
        <section className="py-8 pb-28">
          <div className="max-w-4xl mx-auto px-6">
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{
                background: 'linear-gradient(#0a0a18, #0a0a18) padding-box, linear-gradient(135deg, #7C3AED, #22D3EE) border-box',
                border: '1px solid transparent',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(124,58,237,0.1) 0%, transparent 70%)',
                }}
                aria-hidden="true"
              />
              <div className="relative md:flex md:items-center md:justify-between gap-8">
                <div>
                  <p className="section-label mb-3">Status &amp; What's Next</p>
                  <p className="text-bone/90 leading-relaxed mb-3">
                    Sithea is in active development. The foundation, design system, and core architecture are in place. The focus now is completing the multi-tenant transition and the predictive features that make the assistant genuinely useful over time.
                  </p>
                  <p className="text-ash text-sm leading-relaxed">
                    This is a real, in-progress product - not a finished commercial release. I am documenting the build as I go.
                  </p>
                </div>
                <div className="mt-6 md:mt-0 flex-shrink-0">
                  <a
                    href="mailto:simonmuncan@gmail.com"
                    className="inline-flex items-center gap-2 whitespace-nowrap border border-gold text-gold px-5 py-2.5 rounded-full hover:bg-gold hover:text-void transition-colors duration-300"
                  >
                    <ExternalLink size={14} />
                    Get in touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-10">
          <div className="max-w-4xl mx-auto px-6 flex items-center justify-between gap-4 flex-wrap">
            <Link to="/" className="text-sm text-ash hover:text-bone transition-colors flex items-center gap-2 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              Back to portfolio
            </Link>
            <p className="text-xs text-ash/60">© 2026 Simon Muncan</p>
          </div>
        </footer>

      </div>
    </div>
  )
}
