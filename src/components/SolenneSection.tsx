import { act4 } from '../content'

// SolenneSection — Act 4 founder block. Flat, editorial, one gold accent.
// The single quote on the entire site lives here. Do not duplicate the pattern for ARIA.

export default function SolenneSection() {
  const { solenne } = act4

  return (
    <section id="solenne" className="mx-auto max-w-3xl px-6 py-24">
      <p className="mb-2 font-sans text-sm uppercase tracking-[0.2em] text-ash">{solenne.label}</p>
      <h2 className="mb-4 font-display text-4xl text-bone">{solenne.heading}</h2>
      <p className="mb-10 max-w-xl font-sans leading-relaxed text-ash">{solenne.body}</p>

      <blockquote className="mb-10 border-l-[3px] border-gold pl-6">
        <p className="font-display text-2xl italic leading-snug text-bone md:text-3xl">
          &ldquo;{solenne.quote}&rdquo;
        </p>
        <cite className="mt-4 block font-sans text-sm not-italic text-ash">- {solenne.cite}</cite>
      </blockquote>

      <a
        href={solenne.href}
        rel="me noopener"
        target="_blank"
        className="group inline-flex items-center gap-2 font-sans text-bone transition-colors hover:text-cosmic focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
      >
        solenne.it.com
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          &#8599;
        </span>
      </a>
    </section>
  )
}
