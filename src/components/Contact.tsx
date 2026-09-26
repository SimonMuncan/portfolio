import { ArrowUpRight, Github, Linkedin, MapPin } from 'lucide-react'
import { act4 } from '../content'
import EmailLink from './EmailLink'
import Section from './Section'

export default function Contact() {
  const { contact } = act4

  return (
    <Section id="contact" index="06" label={contact.label}>
      <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{contact.heading}</h2>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{contact.body}</p>

      <EmailLink
        className="group mt-10 inline-flex items-center gap-2 text-2xl font-medium text-ink underline decoration-ink/20 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent sm:text-3xl"
        copiedLabel="Copied to clipboard"
      >
        {contact.email}
        <ArrowUpRight size={24} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </EmailLink>

      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">
          <Linkedin size={16} />
          LinkedIn
        </a>
        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-link">
          <Github size={16} />
          GitHub
        </a>
        <span className="inline-flex items-center gap-1 text-sm text-muted">
          <MapPin size={16} />
          Serbia · open to relocation
        </span>
      </div>
    </Section>
  )
}
