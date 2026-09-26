import { act2 } from '../content'
import type { CardLink } from '../content'
import { openChat } from '../lib/chat'
import Section, { SectionHeading } from './Section'

function CardAction({ link }: { link: CardLink }) {
  if ('ask' in link) {
    return (
      <button type="button" onClick={() => openChat(link.ask)} className="text-link">
        {link.label}
        <span aria-hidden>→</span>
      </button>
    )
  }
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-link">
      {link.label}
      <span aria-hidden>↗</span>
    </a>
  )
}

export default function Projects() {
  return (
    <Section id="work" index="01" label={act2.label}>
      <SectionHeading>{act2.heading}</SectionHeading>

      <div className="grid gap-5 md:grid-cols-2">
        {act2.cards.map((card) => (
          <article
            key={card.title}
            // Larger bodies of work get the full width, with bullets in two columns.
            className={`flex flex-col rounded-lg border border-ink/10 bg-surface p-6 ${card.featured ? 'md:col-span-2 md:p-8' : ''}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-semibold tracking-tight text-ink">{card.title}</h3>
              <p className="text-xs tabular-nums text-muted">
                {card.company} · {card.period}
              </p>
            </div>
            <p className="mt-3 leading-relaxed text-ink/90">{card.summary}</p>
            <ul className={`mt-4 gap-x-8 space-y-2 ${card.featured ? 'md:columns-2 md:space-y-0' : ''}`}>
              {card.built.map((item) => (
                <li
                  key={item}
                  className={`flex gap-3 text-[15px] leading-relaxed text-muted ${card.featured ? 'md:mb-2 md:break-inside-avoid' : ''}`}
                >
                  <span aria-hidden className="mt-[0.7em] h-px w-3 flex-shrink-0 bg-ink/40" />
                  {item}
                </li>
              ))}
            </ul>
            {card.note && <p className="mt-4 text-sm italic text-muted">{card.note}</p>}
            <div className="mt-auto pt-5">
              <ul className="flex flex-wrap gap-1.5 border-t border-ink/10 pt-4" aria-label="Stack">
                {card.stack.map((tech) => (
                  <li key={tech} className="rounded-md bg-ink/[0.06] px-2 py-1 text-xs font-medium text-ink/75">
                    {tech}
                  </li>
                ))}
              </ul>
              {card.links && (
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {card.links.map((link) => (
                    <CardAction key={link.label} link={link} />
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
