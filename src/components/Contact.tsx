import { Mail, Linkedin, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { act4 } from '../content'

export default function Contact() {
  const { contact } = act4

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6">
        <motion.p
          className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-ash mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          {contact.label}
        </motion.p>
        <motion.h2
          className="font-display text-3xl sm:text-4xl text-bone mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {contact.heading}
        </motion.h2>
        <motion.p
          className="font-sans text-ash leading-relaxed mb-10 max-w-lg"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {contact.body}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-x-10 gap-y-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 font-sans text-bone hover:text-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <Mail size={16} />
            {contact.email}
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-bone hover:text-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
          <span className="inline-flex items-center gap-2 font-sans text-ash">
            <MapPin size={16} />
            Serbia
          </span>
        </motion.div>
      </div>
    </section>
  )
}
