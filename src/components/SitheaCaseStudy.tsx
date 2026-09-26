import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import EmailLink from './EmailLink'

const stack = {
  Frontend: ['React Native', 'Expo SDK 54', 'Expo Router', 'NativeWind'],
  Backend: ['Python', 'FastAPI', 'SQLAlchemy (async)', 'Pydantic'],
  Data: ['PostgreSQL 16', 'pgvector', 'Time-series extensions'],
  Infrastructure: ['GCP Compute Engine', 'Docker Compose', 'Caddy', 'Secret Manager', 'Terraform'],
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
    body: 'Moving from one hardcoded user to true multi-tenancy meant rethinking data isolation, authentication, per-tenant configuration, and cost-safe scaling. This was the highest-leverage architectural work in the project and the part I learned the most from.',
  },
  {
    title: 'Infrastructure as code from the start',
    body: 'The entire stack is defined in Terraform with separate dev, staging, and production environments, so the infrastructure is reproducible, reviewable, and version-controlled rather than clicked together by hand.',
  },
  {
    title: 'One hardened VM, running exactly what local dev runs',
    body: 'Production is the same docker-compose stack I run on my own machine - TimescaleDB and pgvector intact - on a single free-tier VM fronted by Caddy, which provisions and renews its own Let\'s Encrypt certificates. Dev/prod parity is the point: what I test is what ships. For something holding health data the posture is deliberate - no public SSH (IAP tunnel only), Shielded VM, a dedicated VPC with a two-rule firewall, a least-privilege service account, secrets only in Secret Manager and never in Terraform state, daily snapshots, and a budget alert. I also built a full cost model across user-scale tiers to keep the unit economics viable as it grows.',
  },
]

const role = ['Frontend', 'Backend', 'Database design', 'Cloud infrastructure', 'DevOps', 'UI/UX']

const palette = [
  { label: 'Deep near-black', color: '#05050E' },
  { label: 'Nebula purple', color: '#7C3AED' },
  { label: 'Cosmic cyan', color: '#22D3EE' },
  { label: 'Soft white', color: '#EDEDF2' },
]

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-ink/10 py-14 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10">
      <p className="eyebrow md:pt-1.5">{label}</p>
      <div>{children}</div>
    </section>
  )
}

export default function SitheaCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link to="/" className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink">
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
            Simon Muncan
          </Link>
          <EmailLink className="btn-primary !px-4 !py-2">Email me</EmailLink>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-6">
        <div className="pb-14 pt-16 md:pt-20">
          <p className="eyebrow">Case study · Personal project · June 2026 - Present</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-ink sm:text-6xl">Sithea</h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink/90 sm:text-2xl">
            A private AI companion for living with a chronic condition.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Designed, built, and architected solo. Mobile app, backend API, cloud infrastructure, and a full custom design system.
          </p>
          <p className="mt-6 text-sm text-ink/80">
            React Native (Expo) · FastAPI · PostgreSQL · GCP · Terraform · Gemini
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://sithea.com" target="_blank" rel="me noopener" className="btn-primary">
              Visit sithea.com <span aria-hidden>↗</span>
            </a>
            <span className="inline-flex items-center gap-2 rounded-md border border-ink/15 px-4 py-2.5 text-xs tabular-nums text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              In development
            </span>
          </div>
        </div>

        <Block label="Overview">
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="text-ink/90">
              Sithea is a personal AI health companion I am building end to end as a solo developer. It started as a single-user prototype and is now being re-architected into a multi-tenant product - the transition that turns a working demo into a real, scalable application.
            </p>
            <p className="text-muted">
              I own every layer: the React Native mobile frontend, the FastAPI backend, the PostgreSQL data model, the GCP infrastructure, the CI/CD pipeline, and the entire visual design system. This project is where I pushed hardest on the parts of engineering that do not show up in tutorials - multi-tenancy, data isolation, infrastructure as code, and designing for a swappable AI layer.
            </p>
          </div>
        </Block>

        <Block label="My role">
          <p className="font-medium text-ink">Sole engineer, architect, and designer.</p>
          <p className="mt-2 text-sm text-muted">{role.join(' · ')}</p>
        </Block>

        <Block label="The challenge">
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="text-ink/90">
              Most AI assistants are stateless and generic. They forget you between sessions and treat every user identically. Sithea's premise is the opposite: an assistant that genuinely learns an individual over time, while keeping that deeply personal data private and under the user's control.
            </p>
            <p className="text-muted">
              That premise creates the hard engineering problems I wanted to solve. How do you give an AI durable, personal memory without the model itself remembering anything? How do you isolate sensitive data in a multi-tenant system so one user can never reach another's? How do you avoid locking the whole product to a single AI vendor? And how do you take something built for one person and make it safely serve thousands?
            </p>
          </div>
        </Block>

        <Block label="Decisions">
          <h2 className="mb-8 text-2xl font-semibold tracking-tight text-ink">The choices that shaped the architecture</h2>
          <ol className="divide-y divide-ink/10">
            {decisions.map((d, i) => (
              <li key={d.title} className="grid gap-2 py-6 first:pt-0 sm:grid-cols-[40px_minmax(0,1fr)]">
                <span className="text-sm text-accent">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-semibold text-ink">{d.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{d.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Block>

        <Block label="Design system">
          <div className="space-y-4 leading-relaxed">
            <p className="text-ink/90">
              I built Sithea's design system from scratch. A calm, trustworthy dark aesthetic in deep near-black, nebula purple, and cosmic cyan - with an animated orb as the assistant's identity, a custom starfield, and a consistent glass-card component language.
            </p>
            <p className="text-muted">
              For a health app the design has a job beyond looking good: it has to feel private and trustworthy in the first few seconds, or people will not enter sensitive data.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {palette.map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2 text-xs tabular-nums text-muted">
                <span className="h-4 w-4 flex-shrink-0 rounded border border-ink/15" style={{ background: color }} />
                {label}
              </div>
            ))}
          </div>
        </Block>

        <Block label="Tech stack">
          <dl className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {Object.entries(stack).map(([category, techs]) => (
              <div key={category}>
                <dt className="eyebrow mb-2">{category}</dt>
                <dd className="space-y-1 text-[15px] text-ink">
                  {techs.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block label="Status">
          <p className="text-lg leading-relaxed text-ink/90">
            Sithea is in active development. The foundation, design system, and core architecture are in place. The focus now is completing the multi-tenant transition and the predictive features that make the assistant genuinely useful over time.
          </p>
          <p className="mt-3 leading-relaxed text-muted">
            This is a real, in-progress product - not a finished commercial release. I am documenting the build as I go.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://sithea.com" target="_blank" rel="me noopener" className="btn-secondary">
              Visit sithea.com <span aria-hidden>↗</span>
            </a>
            <EmailLink className="btn-primary">Get in touch</EmailLink>
          </div>
        </Block>
      </main>

      <footer className="border-t border-ink/10">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-8">
          <Link to="/" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            Back to portfolio
          </Link>
          <p className="text-xs tabular-nums text-muted">© 2026 Simon Muncan</p>
        </div>
      </footer>
    </div>
  )
}
