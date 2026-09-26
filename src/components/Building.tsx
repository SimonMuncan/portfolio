import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { act3, act4 } from '../content'
import Section, { SectionHeading } from './Section'

// The two things Simon is building outside his job: Sithea (flagship, solo)
// and Solenne (co-founded). Sithea gets the room; Solenne sits underneath.

export default function Building() {
  const { solenne } = act4

  return (
    <Section id="building" index="03" label="Building">
      <SectionHeading>What I'm building outside my job</SectionHeading>

      <article>
        <p className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-1 text-xs tabular-nums text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          {act3.status}
        </p>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{act3.eyebrow}</h3>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/90">{act3.description}</p>
        <p className="mt-4 max-w-2xl font-medium leading-relaxed text-ink">{act3.builtBy}</p>

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 md:grid-cols-3">
          {act3.cards.map((card) => (
            <div key={card.title} className="bg-surface p-6">
              <h4 className="eyebrow mb-3">{card.title}</h4>
              <p className="text-[15px] leading-relaxed text-ink/90">{card.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs tabular-nums leading-relaxed text-ink/70">{act3.stack}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link to={act3.cta.href} className="btn-primary">
            {act3.cta.label}
            <ArrowRight size={16} />
          </Link>
          <a href={act3.website} target="_blank" rel="me noopener" className="btn-secondary">
            sithea.com
            <span aria-hidden>↗</span>
          </a>
        </div>
      </article>

      <article className="mt-12 border-t border-ink/10 pt-10">
        <p className="eyebrow">{solenne.label}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">{solenne.heading}</h3>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink/90">{solenne.body}</p>
        <p className="mt-4 max-w-2xl font-medium leading-relaxed text-ink">{solenne.role}</p>
        <blockquote className="mt-6 max-w-2xl border-l-2 border-accent pl-5 text-xl leading-snug text-ink">
          {solenne.statement}
        </blockquote>

        <h4 className="eyebrow mt-10">Also in the platform</h4>
        <ul className="mt-4 max-w-2xl space-y-2">
          {solenne.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-muted">
              <span aria-hidden className="mt-[0.7em] h-px w-3 flex-shrink-0 bg-ink/40" />
              {h}
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-2xl text-xs tabular-nums leading-relaxed text-ink/70">{solenne.stack}</p>
        <a href={solenne.href} target="_blank" rel="me noopener" className="btn-secondary mt-8">
          solenne.it.com
          <span aria-hidden>↗</span>
        </a>
      </article>
    </Section>
  )
}
