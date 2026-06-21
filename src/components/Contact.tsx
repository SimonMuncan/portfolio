import { Mail, Linkedin, MapPin } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  const ref = useReveal()

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(99,102,241,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto px-6 text-center relative" ref={ref}>
        <p className="section-label reveal mb-4">Contact</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-100 leading-tight mb-6 reveal reveal-delay-1">
          Let's build something{' '}
          <span className="gradient-text">together</span>
        </h2>
        <p className="text-slate-500 text-lg leading-relaxed mb-14 reveal reveal-delay-2">
          Open to full-time roles and freelance work. If you're building something real, let's talk.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 reveal reveal-delay-3">
          <a
            href="mailto:simonmuncan@gmail.com"
            className="glass-card glass-card-hover p-6 flex flex-col items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/15 transition-colors">
              <Mail size={20} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Email</p>
              <p className="text-sm text-slate-300 font-medium">simonmuncan@gmail.com</p>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/simon-muncan"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card glass-card-hover p-6 flex flex-col items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/15 transition-colors">
              <Linkedin size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">LinkedIn</p>
              <p className="text-sm text-slate-300 font-medium">simon-muncan</p>
            </div>
          </a>

          <div className="glass-card p-6 flex flex-col items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <MapPin size={20} className="text-violet-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Location</p>
              <p className="text-sm text-slate-300 font-medium">Serbia · open to relocation</p>
            </div>
          </div>
        </div>

        <a
          href="mailto:simonmuncan@gmail.com"
          className="btn-primary reveal reveal-delay-4 inline-flex"
        >
          <Mail size={18} />
          Send me a message
        </a>
      </div>
    </section>
  )
}
