import { ArrowRight, Briefcase, Github, HeartPulse, Linkedin, MapPin, MessageSquare, Rocket } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { act4, hero } from '../content'
import { openChat } from '../lib/chat'

const nowIcons: Record<string, LucideIcon> = {
  Now: Briefcase,
  Leading: Rocket,
  Building: HeartPulse,
  Based: MapPin,
}

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-14 md:pb-20 md:pt-20 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-end lg:gap-14">
      <div>
      <p className="mb-8 inline-flex items-center gap-2 text-xs tabular-nums text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
        {hero.availability}
      </p>

      <p className="mb-4 text-lg font-medium text-ink">
        {hero.name} <span className="text-muted">· {hero.role}</span>
      </p>

      <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
        {hero.headline}
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{hero.intro}</p>

      <p className="mt-6 text-sm text-ink/80">{hero.stack.join(' · ')}</p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a href="#work" className="btn-primary">
          {hero.cta}
          <ArrowRight size={16} />
        </a>
        <button type="button" onClick={() => openChat()} className="btn-secondary">
          <MessageSquare size={16} />
          {hero.askCta}
        </button>
        <div className="ml-1 flex items-center gap-1">
          <a
            href={act4.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-11 w-11 place-items-center rounded-md text-muted transition-colors hover:text-ink"
          >
            <Github size={19} />
          </a>
          <a
            href={act4.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-11 w-11 place-items-center rounded-md text-muted transition-colors hover:text-ink"
          >
            <Linkedin size={19} />
          </a>
        </div>
      </div>

      </div>

      <aside className="rounded-2xl border border-ink/10 bg-surface p-5 shadow-sm shadow-black/[0.03]">
        <ul className="space-y-4">
          {hero.now.map((row) => {
            const Icon = nowIcons[row.label] ?? Briefcase
            return (
              <li key={row.label} className="flex items-start gap-3.5">
                <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-ink/[0.06] text-ink">
                  <Icon size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-muted">{row.label}</p>
                  <p className="font-semibold leading-tight text-ink">{row.value}</p>
                  <p className="text-sm text-muted">{row.detail}</p>
                </div>
              </li>
            )
          })}
        </ul>
        <dl className="mt-5 grid grid-cols-3 gap-2">
          {act4.about.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse rounded-xl bg-ink/[0.04] px-3 py-3">
              <dt className="mt-0.5 text-xs leading-snug text-muted">{stat.label}</dt>
              <dd className="text-2xl font-semibold tracking-tight text-ink">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </section>
  )
}
