import { motion } from 'framer-motion'
import { act2 } from '../content'

export default function Projects() {
  return (
    <section id="work" className="relative min-h-[150vh] flex flex-col justify-center py-28">
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="mb-14 text-scrim">
          <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-cosmic mb-4">
            {act2.label}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-bone">{act2.heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {act2.cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-display text-lg text-bone leading-tight mb-1">{card.title}</h3>
              <p className="font-sans text-xs text-ash mb-4">
                {card.company} · {card.period}
              </p>
              <p className="font-sans text-sm text-ash leading-relaxed mb-5">{card.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                {card.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-sans font-medium px-2 py-0.5 rounded-md border border-cosmic/20 text-cosmic/80 bg-cosmic/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
