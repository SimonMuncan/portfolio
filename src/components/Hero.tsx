import { ArrowDown, Linkedin, Mail } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-[700px] h-[700px] rounded-full opacity-[0.07] animate-blob-1"
          style={{
            background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
            top: '-10%',
            left: '-15%',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.08] animate-blob-2"
          style={{
            background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
            bottom: '-5%',
            right: '-10%',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05] animate-blob-3"
          style={{
            background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)',
            top: '40%',
            left: '50%',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1
          className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-5 animate-fade-up"
          style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
        >
          <span className="gradient-text">Simon</span>
          <br />
          <span className="text-slate-100">Muncan</span>
        </h1>

        <p
          className="text-xl sm:text-2xl text-slate-400 font-medium mb-6 animate-fade-up"
          style={{ animationDelay: '0.25s', animationFillMode: 'both' }}
        >
          Full-Stack Developer
          <span className="mx-3 text-indigo-500/60">·</span>
          AI Engineer
        </p>

        <p
          className="max-w-xl mx-auto text-slate-500 text-base sm:text-lg leading-relaxed mb-12 animate-fade-up"
          style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
        >
          3+ years building production-grade web applications across healthcare SaaS,
          enterprise, and community platforms, with AI integration that actually ships.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up"
          style={{ animationDelay: '0.55s', animationFillMode: 'both' }}
        >
          <a href="#projects" className="btn-primary">
            See my work
            <ArrowDown size={16} strokeWidth={2.5} />
          </a>
          <a
            href="https://linkedin.com/in/simon-muncan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
          <a href="mailto:simonmuncan@gmail.com" className="btn-secondary">
            <Mail size={16} />
            Email me
          </a>
        </div>

        <p
          className="mt-16 text-xs text-slate-600 tracking-widest uppercase font-medium animate-fade-in"
          style={{ animationDelay: '0.9s', animationFillMode: 'both' }}
        >
          React · Python · FastAPI · .NET · AWS · PostgreSQL · AI/LLMs
        </p>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-600 hover:text-slate-400 transition-colors animate-fade-in"
        style={{ animationDelay: '1.2s', animationFillMode: 'both' }}
        aria-label="Scroll to about"
      >
        <span className="text-[10px] tracking-widest uppercase font-medium">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  )
}
