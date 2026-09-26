import { act4 } from '../content'
import Section, { SectionHeading } from './Section'

export default function Act4About() {
  const { about } = act4

  return (
    <Section id="about" index="05" label={about.label}>
      {/* Heading lives in the left column so the facts card starts level with
          it, the same way the hero card sits beside the headline. */}
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
        <div>
          <SectionHeading>{about.heading}</SectionHeading>
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink/90">
            {about.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <dl className="space-y-4 rounded-2xl border border-ink/10 bg-surface p-6">
          {about.facts.map(([key, val]) => (
            <div key={key}>
              <dt className="text-xs text-muted">{key}</dt>
              <dd className="mt-0.5 text-[15px] leading-snug text-ink">{val}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
