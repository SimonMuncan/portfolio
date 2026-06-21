import { ExternalLink, Zap } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

interface Project {
  title: string
  company: string
  period: string
  badge: string
  badgeStyle: string
  description: string
  highlights: string[]
  stack: string[]
  inDev?: boolean
}

const projects: Project[] = [
  {
    title: 'Healthcare SaaS Platform',
    company: 'VegaIT',
    period: 'May 2025 - Present',
    badge: 'Current Role',
    badgeStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    description:
      'Production healthcare SaaS serving clinical teams. Owned both frontend architecture and backend data pipelines on an active, mid-project team.',
    highlights: [
      'JSON-driven generic dashboard renderer that eliminated per-feature DB, backend & frontend changes',
      'Frontend architecture refactor: −25% codebase, +30% feature delivery speed',
      '.NET REST APIs for calculation-heavy endpoints powering predictive clinical trial charts',
    ],
    stack: ['.NET', 'React', 'TypeScript', 'Python', 'AWS', 'S3', 'RDS', 'Lambda', 'ECS', 'Docker'],
  },
  {
    title: 'HNZ Church Community Platform',
    company: 'Freelance',
    period: '2024',
    badge: 'Freelance',
    badgeStyle: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    description:
      'Production digital hub for a Serbian Christian community. Designed, built, and deployed solo from architecture through to production.',
    highlights: [
      '5-layer async backend (Controllers → Services → Repos → Models → Schemas)',
      'JWT auth with double-hashed passwords, RBAC at middleware & route level',
      'Stripe donations, audio streaming, Leaflet maps, automated monthly email digest',
    ],
    stack: ['FastAPI', 'PostgreSQL', 'React 18', 'TypeScript', 'Tailwind', 'Stripe', 'Docker', 'Gmail API'],
  },
  {
    title: 'Project Management Dashboard',
    company: 'EPAM Systems',
    period: 'Nov 2024 - Apr 2025',
    badge: 'Internship',
    badgeStyle: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    description:
      'Enterprise web dashboard for creating, organising, and reporting projects within an organisation. Built in a Scrum environment.',
    highlights: [
      'Signed S3 URLs for secure, time-limited file access',
      'Hierarchical SQL schema for project/task data with proper indexing',
      'Deadline & task-assignment notification system',
    ],
    stack: ['FastAPI', 'PostgreSQL', 'AWS RDS', 'S3', 'React.js', 'Docker', 'GitHub Actions'],
  },
  {
    title: 'AI Desktop Assistant',
    company: 'Schneider Electric Hub',
    period: 'Oct - Nov 2023',
    badge: 'Internship',
    badgeStyle: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    description:
      'Personal AI desktop assistant built during internship. Applied NLP and transformer model integration, later extended as a final university project.',
    highlights: [
      'Built with Python + Hugging Face Transformers',
      'Demonstrated applied NLP in standalone desktop application context',
      'Extended and used as foundation for final university project',
    ],
    stack: ['Python', 'Hugging Face', 'Transformers', 'NLP'],
  },
  {
    title: 'Drive Backup + Dashboard',
    company: 'Personal Project',
    period: 'May 2025',
    badge: 'Personal Tool',
    badgeStyle: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    description:
      'Automated weekly backup tool that uploads local folders to Google Drive and sends an HTML email summary after each run. Includes a React web dashboard for viewing run history, logs, and storage trends.',
    highlights: [
      'Keeps the last N weeks of backups and prunes the rest, verified against Drive after each run',
      'HTML email digest with stats, folder breakdown chart, and recent run results via Gmail API',
      'React + Firestore dashboard with Google OAuth, deployed to Firebase Hosting',
    ],
    stack: ['Python', 'Google Drive API', 'Gmail API', 'React', 'Vite', 'Firebase', 'Firestore', 'Windows Task Scheduler'],
  },
  {
    title: 'ARIA Personal AI Assistant',
    company: 'Personal Project',
    period: 'June 2026 - Present',
    badge: 'In Development',
    badgeStyle: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    description:
      'A closed-loop personal AI that learns you deeply while keeping all data on your own infrastructure. Privacy-first by design, every byte stays in your Cloud SQL instance.',
    highlights: [
      'RA health tracking with proactive daily check-ins and pattern recognition',
      'Four-layer memory: working · daily · recent · deep (pgvector semantic search)',
      'Provider-agnostic AI abstraction: Gemini today, swap with zero refactor',
    ],
    stack: ['React Native', 'Expo', 'FastAPI', 'PostgreSQL', 'pgvector', 'Gemini Flash 2.0', 'GCP Cloud Run'],
    inDev: true,
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const delay = `reveal-delay-${Math.min(index + 1, 6)}`
  const accentColor = project.inDev ? 'violet' : 'indigo'

  return (
    <div
      className={`p-6 reveal ${delay} ${
        project.inDev ? 'gradient-border-card' : 'glass-card glass-card-hover'
      }`}
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${project.badgeStyle}`}>
              {project.inDev && (
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse-ring" />
              )}
              {project.badge}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-100 leading-tight">{project.title}</h3>
          <p className="text-xs text-slate-500 mt-1">{project.company} · {project.period}</p>
        </div>
        {project.inDev
          ? <Zap size={20} className="text-violet-400 mt-1 flex-shrink-0" />
          : <ExternalLink size={15} className="text-slate-600 mt-1 flex-shrink-0" />
        }
      </div>

      <p className="text-sm text-slate-400 leading-relaxed mb-5">{project.description}</p>

      <ul className="space-y-2 mb-5">
        {project.highlights.map((h) => (
          <li key={h} className="text-xs text-slate-500 flex gap-2 items-start">
            <span className={`mt-0.5 flex-shrink-0 text-${accentColor}-500`}>▸</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className={`text-[10px] font-medium px-2 py-0.5 rounded-md border bg-${accentColor}-500/10 text-${accentColor}-300/80 border-${accentColor}-500/10`}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const ref = useReveal()

  return (
    <section id="projects" className="py-28 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(99,102,241,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 relative" ref={ref}>
        <div className="mb-14">
          <p className="section-label reveal mb-4">Projects</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-100 reveal reveal-delay-1">
            What I've built
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl reveal reveal-delay-2">
            Production systems across healthcare, community, and enterprise, plus one ambitious personal project currently in the works.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
