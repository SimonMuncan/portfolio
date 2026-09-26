import { MessageSquare } from 'lucide-react'
import { act4 } from '../content'
import { openChat } from '../lib/chat'
import Section, { SectionHeading } from './Section'

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((b) => (
        <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-muted">
          <span aria-hidden className="mt-[0.7em] h-px w-3 flex-shrink-0 bg-ink/40" />
          {b}
        </li>
      ))}
    </ul>
  )
}

export default function Act4Experience() {
  const { experience } = act4

  return (
    <Section id="experience" index="02" label={experience.label}>
      <SectionHeading>Where I've worked</SectionHeading>
      <ol className="divide-y divide-ink/10">
        {experience.items.map((item) => (
          <li
            key={item.org}
            className="grid gap-3 py-8 first:pt-0 md:grid-cols-[150px_minmax(0,1fr)] md:gap-8"
          >
            <p className="text-xs tabular-nums text-muted md:pt-1.5">{item.period}</p>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {item.role} <span className="font-normal text-muted">· {item.org}</span>
              </h3>
              <p className="mt-2 leading-relaxed text-ink/90">{item.summary}</p>
              {item.bullets && <Bullets items={item.bullets} />}
              {item.projects?.map((project) => (
                <div key={project.name} className="mt-6 border-l border-ink/15 pl-5">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <h4 className="font-medium text-ink">{project.name}</h4>
                    <p className="text-xs tabular-nums text-muted">{project.period}</p>
                  </div>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{project.summary}</p>
                </div>
              ))}
              {item.projects && (
                <a href="#work" className="text-link mt-5">
                  Full project details in Selected work
                  <span aria-hidden>↑</span>
                </a>
              )}
              {item.links && (
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {item.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      {link.label}
                      <span aria-hidden>↗</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>

      <h3 className="eyebrow mb-2 mt-14">{act4.volunteering.heading}</h3>
      <ul className="divide-y divide-ink/10 border-y border-ink/10">
        {act4.volunteering.items.map((v) => (
          <li key={v.org} className="grid gap-2 py-5 md:grid-cols-[150px_minmax(0,1fr)] md:gap-8">
            <p className="text-xs tabular-nums text-muted md:pt-1">{v.period}</p>
            <div>
              <p className="font-semibold text-ink">
                {v.org} <span className="font-normal text-muted">· {v.role}</span>
              </p>
              <p className="mt-1 text-[15px] leading-relaxed text-muted">{v.summary}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-ink/10 bg-surface px-5 py-4">
        <p className="text-sm text-muted">{experience.askHint}</p>
        <button type="button" onClick={() => openChat()} className="btn-secondary !py-2">
          <MessageSquare size={15} />
          {experience.askLabel}
        </button>
      </div>
    </Section>
  )
}
