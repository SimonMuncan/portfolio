import { motion } from 'framer-motion'
import { act4 } from '../content'

export default function Act4About() {
  const { about } = act4

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-3xl mx-auto px-6">
        <motion.p
          className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-ash mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          {about.label}
        </motion.p>
        <motion.h2
          className="font-display text-3xl sm:text-4xl text-bone mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {about.heading}
        </motion.h2>

        <motion.div
          className="space-y-4 font-sans text-ash leading-relaxed mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {about.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-x-10 gap-y-4 mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {about.stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-2xl text-gold">{stat.value}</div>
              <div className="text-xs text-ash font-sans">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 border-t border-white/10 pt-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {about.facts.map(([key, val]) => (
            <li key={key} className="flex gap-3 text-sm font-sans">
              <span className="text-ash/70 w-28 flex-shrink-0">{key}</span>
              <span className="text-bone">{val}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
