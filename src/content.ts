// Single source of truth for "Signal" redesign copy. Greppable, editable in one place.

export const hero = {
  name: 'Simon Muncan',
  subline: 'Full-stack engineer. Founder. Building ARIA.',
  cta: 'See the work',
}

export interface WorkCard {
  title: string
  company: string
  period: string
  description: string
  stack: string[]
}

export const act2 = {
  label: 'Selected work',
  heading: "What I've built",
  cards: [
    {
      title: 'HNZ Church Community Platform',
      company: 'Freelance',
      period: '2024',
      description:
        'Production digital hub for a Serbian Christian community, designed and shipped solo. Stripe donations, audio streaming, and a full 5-layer backend.',
      stack: ['FastAPI', 'PostgreSQL', 'React 18', 'Stripe', 'Docker'],
    },
    {
      title: 'Automated Backup Platform',
      company: 'Personal Project',
      period: '2025',
      description:
        'Weekly automated backup tool with a React dashboard for run history and storage trends, plus an HTML email digest after every run.',
      stack: ['Python', 'Google Drive API', 'React', 'Firebase'],
    },
    {
      title: 'Healthcare SaaS Platform',
      company: 'VegaIT',
      period: '2025 - Present',
      description:
        'Production healthcare SaaS for clinical teams. Led a frontend refactor that cut the codebase 25% and built .NET APIs for predictive trial charts.',
      stack: ['.NET', 'React', 'Python', 'AWS'],
    },
  ] satisfies WorkCard[],
}

export const act3 = {
  eyebrow: 'ARIA: Private AI health companion',
  description:
    'A multi-tenant platform helping people with rheumatoid arthritis track symptoms, spot flare patterns, and correlate them with weather and habits. Health data stays private and owned by the user.',
  cards: [
    {
      title: 'Architecture',
      body: "Four-layer memory: the database remembers, the model doesn't. Row-level security with a two-role Postgres setup.",
    },
    {
      title: 'Privacy',
      body: "Longitudinal health data never leaves the user's tenant. No ads near health data, by design.",
    },
    {
      title: 'Stack',
      body: 'React Native (Expo) · FastAPI · PostgreSQL + TimescaleDB + pgvector · GCP Cloud Run · Firebase Auth.',
    },
  ],
  cta: {
    label: 'Read the full case study',
    href: '/aria',
  },
}

export const act4 = {
  about: {
    label: 'About',
    heading: 'Building software that actually ships',
    bio: [
      "I'm a Full-Stack Engineer and AI practitioner based in Serbia. Over the past 3+ years I've owned features end-to-end across healthcare SaaS, enterprise project management, and community platforms, from database schema to deployed production feature.",
      'I led a frontend architecture refactor that cut our codebase by 25% and accelerated new feature delivery by 30%. I build JSON-driven systems that eliminate per-feature changes across the whole stack. I integrate AI where it genuinely helps, not as a gimmick.',
    ],
    stats: [
      { value: '3+', label: 'Years Experience' },
      { value: '7+', label: 'Projects Shipped' },
      { value: '6+', label: 'Companies & Clients' },
    ],
    facts: [
      ['Location', 'Serbia · open to relocation'],
      ['Current role', 'Software Engineer · VegaIT'],
      ['Education', 'B.Sc. Electrical & Computer Engineering, Uni Novi Sad'],
      ['Erasmus', 'Budapest University of Technology'],
      ['Languages', 'Serbian (native) · English (B2)'],
      ['Community', 'Red Cross Serbia · ORS volunteer'],
    ] as const,
  },
  experience: {
    label: 'Experience',
    items: [
      { role: 'Software Engineer', org: 'VegaIT', period: 'May 2025 - Present' },
      { role: 'Project Management Dashboard', org: 'EPAM Systems', period: 'Nov 2024 - Apr 2025' },
      { role: 'AI Desktop Assistant', org: 'Schneider Electric Hub', period: 'Oct - Nov 2023' },
    ],
  },
  solenne: {
    label: 'Co-founder',
    heading: 'Solenne',
    body: 'Automated website generation for small businesses. From lead to live site, without the owner touching a line of code.',
    statement:
      "Most small businesses don't have a bad website. They have no website. That gap is the whole company.",
    href: 'https://solenne.it.com',
  },
  contact: {
    label: 'Contact',
    heading: "Let's build something together",
    body: "Open to full-time roles and freelance work. If you're building something real, let's talk.",
    email: 'simonmuncan@gmail.com',
    linkedin: 'https://www.linkedin.com/in/simon-muncan-3067071b0/',
    github: 'https://github.com/SimonMuncan',
  },
}
