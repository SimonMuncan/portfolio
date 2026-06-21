import { useReveal } from '../hooks/useReveal'

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '7+', label: 'Projects Shipped' },
  { value: '6+', label: 'Companies & Clients' },
]

const facts = [
  ['Location', 'Serbia · open to relocation'],
  ['Current role', 'Software Engineer · VegaIT'],
  ['Education', 'B.Sc. Electrical & Computer Engineering, Uni Novi Sad'],
  ['Erasmus', 'Budapest University of Technology'],
  ['Languages', 'Serbian (native) · English (B2)'],
  ['Community', 'Red Cross Serbia · ORS volunteer'],
] as const

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <p className="section-label reveal mb-4">About</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-100 leading-tight mb-8 reveal reveal-delay-1">
              Building software that{' '}
              <span className="gradient-text">actually ships</span>
            </h2>

            <div className="space-y-5 text-slate-400 leading-relaxed reveal reveal-delay-2">
              <p>
                I'm a Full-Stack Engineer and AI practitioner based in Serbia. Over the past
                3+ years I've owned features end-to-end across healthcare SaaS, enterprise
                project management, and community platforms, from database schema to deployed
                production feature.
              </p>
              <p>
                I led a frontend architecture refactor that cut our codebase by{' '}
                <span className="text-slate-200 font-medium">25%</span> and accelerated new
                feature delivery by{' '}
                <span className="text-slate-200 font-medium">30%</span>. I build JSON-driven
                systems that eliminate per-feature changes across the whole stack. I integrate
                AI where it genuinely helps, not as a gimmick.
              </p>
              <p>
                Currently working at{' '}
                <span className="text-indigo-400 font-medium">VegaIT</span> on a healthcare
                SaaS platform, and building{' '}
                <span className="text-violet-400 font-medium">ARIA</span>, a privacy-first
                personal AI assistant, in my own time.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 reveal reveal-delay-3">
              <a
                href="https://linkedin.com/in/simon-muncan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-sm"
              >
                View LinkedIn
              </a>
              <a href="mailto:simonmuncan@gmail.com" className="btn-secondary btn-sm">
                simonmuncan@gmail.com
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-4 reveal reveal-delay-1">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card p-5 text-center">
                  <div className="text-3xl font-black gradient-text mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="glass-card p-6 reveal reveal-delay-2">
              <h3 className="text-sm font-semibold text-slate-300 mb-5">Quick facts</h3>
              <ul className="space-y-3.5">
                {facts.map(([key, val]) => (
                  <li key={key} className="flex gap-3 text-sm">
                    <span className="text-slate-600 w-28 flex-shrink-0">{key}</span>
                    <span className="text-slate-300">{val}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
