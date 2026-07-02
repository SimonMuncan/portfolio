import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { act3 } from '../content'

export default function AriaShowcase() {
  return (
    <section id="aria" className="relative min-h-[150vh] flex flex-col justify-center py-28">
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <div className="inline-block rounded-3xl bg-void/50 backdrop-blur-md px-6 py-8 sm:px-10">
          <motion.h2
            className="font-display text-3xl sm:text-4xl text-bone mb-6 text-scrim"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            {act3.eyebrow}
          </motion.h2>
          <motion.p
            className="font-sans text-bone/80 leading-relaxed max-w-2xl mx-auto text-scrim"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {act3.description}
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
        {act3.cards.map((card, i) => (
          <motion.div
            key={card.title}
            className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="font-display text-base text-cosmic mb-3">{card.title}</h3>
            <p className="font-sans text-sm text-ash leading-relaxed">{card.body}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link
          to={act3.cta.href}
          className="inline-flex items-center gap-2 font-sans text-sm text-bone hover:text-cosmic transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold text-scrim"
        >
          {act3.cta.label}
          <span aria-hidden>→</span>
        </Link>
      </motion.div>
    </section>
  )
}
