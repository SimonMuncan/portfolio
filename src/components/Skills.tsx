import { Code2, Layout, Server, Sparkles, Cloud, Database, Plug } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import type { LucideIcon } from 'lucide-react'

interface SkillGroup {
  category: string
  Icon: LucideIcon
  pillClass: string
  items: string[]
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    Icon: Code2,
    pillClass: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20 hover:bg-indigo-500/15',
    items: ['Python', 'TypeScript', 'JavaScript', 'C#', '.NET'],
  },
  {
    category: 'Frontend',
    Icon: Layout,
    pillClass: 'bg-violet-500/10 text-violet-300 border-violet-500/20 hover:bg-violet-500/15',
    items: [
      'React',
      'Next.js',
      'Tailwind CSS',
      'Material UI v7',
      'Zustand',
      'TanStack Query',
      'React Hook Form',
      'Zod',
      'shadcn/ui',
      'Vite',
    ],
  },
  {
    category: 'Backend',
    Icon: Server,
    pillClass: 'bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500/15',
    items: [
      'FastAPI',
      '.NET Core',
      'Django',
      'SQLAlchemy (async)',
      'Pydantic v2',
      'Alembic',
      'Uvicorn',
      'APScheduler',
    ],
  },
  {
    category: 'AI / ML',
    Icon: Sparkles,
    pillClass: 'bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/15',
    items: [
      'OpenAI API',
      'Anthropic Claude API',
      'Hugging Face Transformers',
      'Gemini Flash 2.0',
      'LLM Integration',
      'AI-driven prototyping',
    ],
  },
  {
    category: 'Cloud & DevOps',
    Icon: Cloud,
    pillClass: 'bg-sky-500/10 text-sky-300 border-sky-500/20 hover:bg-sky-500/15',
    items: [
      'AWS S3',
      'AWS RDS',
      'AWS Lambda',
      'AWS ECS',
      'Google Cloud Run',
      'GitHub Actions',
      'Docker',
      'Sentry',
      'Firebase',
    ],
  },
  {
    category: 'Databases',
    Icon: Database,
    pillClass: 'bg-teal-500/10 text-teal-300 border-teal-500/20 hover:bg-teal-500/15',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'pgvector', 'TimescaleDB', 'AWS RDS'],
  },
  {
    category: 'Integrations',
    Icon: Plug,
    pillClass: 'bg-rose-500/10 text-rose-300 border-rose-500/20 hover:bg-rose-500/15',
    items: [
      'Stripe (Webhooks, PaymentIntent)',
      'Google Drive API',
      'Gmail API (OAuth2)',
      'Firebase Auth',
      'Leaflet Maps',
    ],
  },
]

export default function Skills() {
  const ref = useReveal()

  return (
    <section id="skills" className="py-28">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className="mb-14">
          <p className="section-label reveal mb-4">Skills</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-100 reveal reveal-delay-1">
            Technical toolkit
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl reveal reveal-delay-2">
            React, Python, .NET, and FastAPI in production. AI integration wired into real products, not demos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => {
            const { Icon } = group
            const delay = `reveal-delay-${Math.min(i + 1, 6)}`
            return (
              <div key={group.category} className={`glass-card p-5 reveal ${delay}`}>
                <div className="flex items-center gap-2.5 mb-4">
                  <Icon size={15} className="text-indigo-400" />
                  <h3 className="text-sm font-semibold text-slate-300">{group.category}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className={`text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors duration-200 cursor-default ${group.pillClass}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
