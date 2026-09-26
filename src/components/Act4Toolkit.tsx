import Section, { SectionHeading } from './Section'

interface SkillGroup {
  category: string
  items: string[]
}

// Tiered on purpose: the order is the claim. The full tool-by-tool list lives
// in the chat dossier, where it can be asked about instead of scanned past.
const skillGroups: SkillGroup[] = [
  { category: 'Primary', items: ['Python', 'FastAPI', '.NET / C#', 'PostgreSQL', 'SQLAlchemy'] },
  { category: 'Cloud & infra', items: ['AWS (Lambda, ECS Fargate, RDS, S3)', 'Azure', 'GCP', 'Terraform', 'Docker', 'GitHub Actions'] },
  { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind', 'MUI'] },
  { category: 'Also', items: ['Django', 'Redis', 'PostGIS', 'pgvector', 'LLM APIs (Gemini, Claude, OpenAI)'] },
]

export default function Act4Toolkit() {
  return (
    <Section id="toolkit" index="04" label="Toolkit">
      <SectionHeading>What I work with</SectionHeading>

      <div className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <div
            key={group.category}
            className={`rounded-2xl border p-5 ${i === 0 ? 'border-ink/20 bg-surface' : 'border-ink/10 bg-surface/60'}`}
          >
            <h3 className="text-sm font-semibold text-ink">{group.category}</h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className={`rounded-lg px-2.5 py-1 text-sm ${i === 0 ? 'bg-ink text-paper' : 'bg-ink/[0.06] text-ink/85'}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
