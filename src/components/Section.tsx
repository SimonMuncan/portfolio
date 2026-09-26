import type { ReactNode } from 'react'

// Every homepage section shares one frame: an index label above the content,
// a hairline rule between sections.

interface Props {
  id: string
  index: string
  label: string
  children: ReactNode
}

export default function Section({ id, index, label, children }: Props) {
  return (
    <section id={id} className="border-t border-ink/10">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="eyebrow mb-4">
          <span className="text-accent">{index}</span> / {label}
        </p>
        {children}
      </div>
    </section>
  )
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="mb-10 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{children}</h2>
}
