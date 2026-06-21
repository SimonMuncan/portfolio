export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <p>© {year} Simon Muncan</p>
        <p>Built with React + Vite · Hosted on Firebase</p>
        <div className="flex items-center gap-4">
          <a
            href="mailto:simonmuncan@gmail.com"
            className="hover:text-slate-400 transition-colors"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/simon-muncan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-400 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
