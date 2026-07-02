import { motion } from 'framer-motion'
import { act4 } from '../content'

export default function Act4Experience() {
  const { experience } = act4

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-3xl mx-auto px-6">
        <motion.p
          className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-ash mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          {experience.label}
        </motion.p>

        <ul className="space-y-4">
          {experience.items.map((item, i) => (
            <motion.li
              key={item.org}
              className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 border-b border-white/10 pb-4 font-sans"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="text-bone">
                {item.role} <span className="text-ash">· {item.org}</span>
              </span>
              <span className="text-xs text-ash/70 tracking-wide">{item.period}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
