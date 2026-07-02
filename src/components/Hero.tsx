import { motion, useReducedMotion } from 'framer-motion'
import { hero } from '../content'

const words = hero.name.split(' ')

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          className="font-display text-gold tracking-tight leading-none mb-6 text-scrim"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 8.5rem)' }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduced ? 0 : 0.04 } },
          }}
        >
          {words.map((word, wi) => (
            <span key={wi}>
              {wi > 0 && ' '}
              <span className="inline-block whitespace-nowrap">
                {word.split('').map((char, ci) => (
                  <motion.span
                    key={ci}
                    className="inline-block"
                    variants={
                      reduced
                        ? undefined
                        : {
                            hidden: { opacity: 0, y: 24 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                          }
                    }
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="font-sans text-lg sm:text-xl text-bone mb-12 text-scrim"
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: reduced ? 0 : 0.9 }}
        >
          {hero.subline}
        </motion.p>

        <motion.a
          href="#work"
          className="inline-flex items-center gap-2 border border-gold text-gold font-sans font-medium px-7 py-3 rounded-full hover:bg-gold hover:text-void transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: reduced ? 0 : 1.1 }}
        >
          {hero.cta}
        </motion.a>
      </div>

      <motion.a
        href="#work"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-ash hover:text-bone transition-colors text-scrim"
        aria-label="Scroll to selected work"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: reduced ? 0 : 1.4 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-sans font-medium">Scroll</span>
        <span className={`w-px h-10 bg-current ${reduced ? '' : 'animate-pulse'}`} />
      </motion.a>
    </section>
  )
}
