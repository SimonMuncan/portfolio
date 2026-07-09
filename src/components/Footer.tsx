export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ash font-sans">
        <p>© {year} Simon Muncan</p>
        <p>Built with React + Vite · Hosted on Firebase</p>
        <div className="flex items-center gap-4">
          <a href="mailto:simonmuncan@gmail.com" className="hover:text-gold transition-colors">
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/simon-muncan-3067071b0/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/SimonMuncan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
