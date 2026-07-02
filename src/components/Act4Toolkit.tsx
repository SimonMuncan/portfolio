import { motion } from 'framer-motion'
import { Code2, Layout, Server, Sparkles, Cloud, Database, Plug } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface SkillGroup {
  category: string
  Icon: LucideIcon
  items: string[]
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    Icon: Code2,
    items: ['Python', 'TypeScript', 'JavaScript', 'C#', '.NET'],
  },
  {
    category: 'Frontend',
    Icon: Layout,
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
    items: ['FastAPI', '.NET Core', 'Django', 'SQLAlchemy (async)', 'Pydantic v2', 'Alembic', 'Uvicorn', 'APScheduler'],
  },
  {
    category: 'AI / ML',
    Icon: Sparkles,
    items: ['OpenAI API', 'Anthropic Claude API', 'Hugging Face Transformers', 'Gemini Flash 2.0', 'LLM Integration'],
  },
  {
    category: 'Cloud & DevOps',
    Icon: Cloud,
    items: ['AWS S3', 'AWS RDS', 'AWS Lambda', 'AWS ECS', 'Google Cloud Run', 'GitHub Actions', 'Docker', 'Firebase'],
  },
  {
    category: 'Databases',
    Icon: Database,
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'pgvector', 'TimescaleDB'],
  },
  {
    category: 'Integrations',
    Icon: Plug,
    items: ['Stripe', 'Google Drive API', 'Gmail API (OAuth2)', 'Firebase Auth', 'Leaflet Maps'],
  },
]

export default function Act4Toolkit() {
  return (
    <section id="toolkit" className="py-20 relative">
      <div className="max-w-3xl mx-auto px-6">
        <motion.p
          className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-ash mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          Toolkit
        </motion.p>
        <motion.h2
          className="font-display text-3xl sm:text-4xl text-bone mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Technical toolkit
        </motion.h2>

        <div className="space-y-7">
          {skillGroups.map((group, i) => {
            const { Icon } = group
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.05 * i }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={14} className="text-cosmic" />
                  <h3 className="font-sans text-sm font-semibold text-bone">{group.category}</h3>
                </div>
                <p className="font-sans text-sm text-ash leading-relaxed">{group.items.join(' · ')}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
