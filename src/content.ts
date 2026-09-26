// Single source of truth for "Signal" redesign copy. Greppable, editable in one place.

export const hero = {
  name: 'Simon Muncan',
  role: 'Software Engineer',
  availability: 'Open to full-time roles and freelance work',
  headline: 'I build production backends, APIs and AI products.',
  intro:
    "Currently at VegaIT on an enterprise integration between an AI insurance platform and two insurance platforms, built on .NET and Azure, after building a clinical trial planning platform on .NET, PostgreSQL and AWS. Outside work I lead engineering at Solenne, a SaaS I co-founded, and I'm building Sithea, a private AI health companion, end to end.",
  stack: ['Python', 'FastAPI', '.NET', 'PostgreSQL', 'AWS', 'React'],
  cta: 'See the work',
  askCta: 'Ask my AI assistant',
  now: [
    { label: 'Now', value: 'VegaIT', detail: 'AI insurance integration · .NET, Azure' },
    { label: 'Leading', value: 'Solenne', detail: 'Co-founder & lead engineer' },
    { label: 'Building', value: 'Sithea', detail: 'Private AI health companion' },
    { label: 'Based', value: 'Serbia', detail: 'Open to relocation' },
  ],
}

// A link either leaves the site, or opens the chat with a question already asked.
export type CardLink = { label: string; href: string } | { label: string; ask: string }

export interface WorkCard {
  title: string
  company: string
  period: string
  summary: string
  built: string[]
  stack: string[]
  note?: string
  links?: CardLink[]
  // Full-width card with bullets in two columns, for the larger bodies of work.
  featured?: boolean
}

export const act2 = {
  label: 'Selected work',
  heading: "What I've built",
  cards: [
    {
      title: 'Solenne Platform',
      featured: true,
      company: 'Co-founder & lead engineer',
      period: '2026 - Present',
      summary:
        "The production SaaS behind Solenne's automated websites for small businesses. Async FastAPI on PostgreSQL, two React + TypeScript frontends, and containerized background jobs on AWS.",
      built: [
        'Monorepo with one async FastAPI backend (~100 REST endpoints), two React + TypeScript frontends, containerized workers and a shared Python domain library',
        'Layered router → service → model architecture with typed schemas, RFC 7807 errors, standard pagination and role-based access control',
        'Event-driven processing: the API launches one-off ECS Fargate jobs that ingest, normalize, deduplicate and score records with a rules engine configured from the database',
        'LLM features behind a provider-agnostic interface, with a shared rate and cost budget and automatic redaction of personal data before any request leaves',
        '500+ automated tests (pytest against disposable Postgres containers, plus Vitest), with ruff, mypy and ESLint enforced in CI and keyless OIDC deploys to AWS',
      ],
      stack: ['FastAPI', 'SQLAlchemy 2.0 (async)', 'PostgreSQL', 'React', 'TypeScript', 'AWS ECS Fargate', 'Terraform'],
      note: 'Confidential codebase. Code walkthroughs on request.',
      links: [
        { label: 'solenne.it.com', href: 'https://solenne.it.com' },
        { label: 'Ask about the architecture', ask: "How is Solenne's backend architected?" },
      ],
    },
    {
      title: 'AI Insurance Integration',
      featured: true,
      company: 'VegaIT',
      period: 'Sep 2026 - Present',
      summary:
        'Enterprise integration connecting an AI insurance platform with two insurance platforms, built on .NET and Azure. Submissions, quotes, binding and renewals flow between all three systems.',
      built: [
        'Support and maintain the integration layer on .NET and Azure, keeping data moving reliably between the AI platform and both insurance systems',
        'Work across the insurance lifecycle: submissions, quotes, binding and renewals, as they pass from one platform to the next',
        'Troubleshoot and resolve production issues across backend services, APIs, data flows and external system integrations',
        'Investigate across application, integration and deployment layers on Azure-based services and infrastructure',
        'Analyse issues spanning multiple services and components to find the root cause and coordinate the right fix',
        'Run CI/CD, deployment and release procedures, including change requests and production support',
        'Work with senior engineers and client-facing teams to investigate incidents and ship changes safely in production',
      ],
      stack: ['.NET', 'C#', 'Azure', 'REST APIs', 'SQL', 'Enterprise integrations'],
    },
    {
      title: 'Clinical Trial Planning Platform',
      featured: true,
      company: 'VegaIT',
      period: 'May 2025 - Aug 2026',
      summary:
        'Production platform pharma sponsors and healthcare teams use to plan clinical trials and run recruitment: choosing countries and sites, simulating cost and timeline, and tracking enrollment and site performance once a trial is live. Team of 10 to 15; I worked directly with the healthcare team and covered the team lead role while the lead was away.',
      built: [
        '.NET 8 modular monolith on a single AWS Lambda behind API Gateway, with Planning and Recruitment as modules that switch on and off independently',
        'Geospatial site selection: trial sites stored with real geography in PostgreSQL + PostGIS and scored by location through NetTopologySuite',
        'Trial-scoped authorization enforced on every endpoint, with Cognito JWT identity and a Redis permission cache so checks skip the database',
        'EF Core schema with soft-delete and audit conventions across every entity, and an audit trail on every configuration change for regulators',
        'Competing-trial analysis on the public ClinicalTrials.gov (AACT) dataset',
        'Signed S3 URLs for trial documents and reports, on-demand Excel exports, and large data imports through AWS Glue into Parquet',
        'JSON-driven KPI dashboards, so each trial gets its KPIs from configuration instead of new code',
        'Led a frontend refactor into shared modules: 25% smaller codebase, 30% faster feature delivery',
        'Custom React chart components that replaced the paid MUI charts tier',
        'Structured logging and tracing with CloudWatch and X-Ray; code reviews in a Scrum team',
      ],
      stack: ['.NET 8', 'C#', 'EF Core', 'PostgreSQL + PostGIS', 'AWS Lambda', 'API Gateway', 'Cognito', 'Redis', 'S3', 'AWS Glue', 'React', 'TypeScript', 'MUI'],
      note: 'Client work under NDA. Architecture and my own work only.',
      links: [{ label: 'Ask about this project', ask: 'What did he build on the clinical trial platform at VegaIT?' }],
    },
    {
      title: 'Portfolio AI Assistant',
      company: 'Personal Project',
      period: '2026',
      summary:
        "The chat on this site. It answers questions about my work from a written dossier and nothing else, so it can't invent an employer or a date.",
      built: [
        'Cloudflare Worker streaming Gemini replies to the browser over SSE',
        'Turnstile check on every message, and a Durable Object enforcing per-IP rate limits and a daily spend budget',
        'Knowledge written as standalone facts, so answers vary instead of repeating one block',
      ],
      stack: ['Cloudflare Workers', 'Durable Objects', 'Gemini', 'TypeScript', 'React'],
      links: [
        { label: 'Try it', ask: 'How does this chat widget actually work?' },
        { label: 'GitHub', href: 'https://github.com/SimonMuncan/portfolio' },
      ],
    },
    {
      title: 'Project Management API',
      company: 'EPAM Systems · Internship',
      period: '2024 - 2025',
      summary:
        'Backend for an enterprise project management platform, shipped with the engineering practice around it, not just the endpoints.',
      built: [
        'FastAPI service on PostgreSQL and SQLAlchemy, with Alembic migrations and its own authentication layer',
        'Clean split between models, schemas and service logic',
        'Docker, separate GitHub Actions CI and CD pipelines, pre-commit hooks and a pytest suite',
      ],
      stack: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'Docker', 'GitHub Actions'],
      links: [{ label: 'GitHub', href: 'https://github.com/SimonMuncan/FastAPI-project' }],
    },
    {
      title: 'HNZ Church Community Platform',
      company: 'Freelance',
      period: '2024',
      summary:
        'Production digital hub for a Serbian Christian community. Designed and shipped solo, from database to deploy.',
      built: [
        'Stripe donations',
        'Audio streaming for the community',
        'A five-layer FastAPI backend on PostgreSQL, containerised with Docker',
      ],
      stack: ['FastAPI', 'PostgreSQL', 'React 18', 'Stripe', 'Docker'],
    },
    {
      title: 'Automated Backup Platform',
      company: 'Personal Project',
      period: '2026',
      summary: 'Backs up local folders to Google Drive every week and reports on every run.',
      built: [
        'Scheduled Python backups through the Google Drive API',
        'Every run tracked in Firestore, with an HTML email summary of folder stats and run history',
        'React dashboard for status, progress and storage trends',
      ],
      stack: ['Python', 'Google Drive API', 'React', 'Firebase', 'Firestore'],
      links: [
        {
          label: 'GitHub',
          href: 'https://github.com/SimonMuncan/Weekly-Google-Drive-backup-with-a-live-web-dashboard',
        },
      ],
    },
  ] satisfies WorkCard[],
}

export const act3 = {
  eyebrow: 'Sithea: Private AI health companion',
  status: 'In development · live at sithea.com',
  description:
    'A multi-tenant platform helping people with rheumatoid arthritis track symptoms, spot flare patterns, and correlate them with weather and habits. Health data stays private and owned by the user.',
  builtBy:
    'Designed and built solo, end to end: mobile app, API, database, cloud infrastructure and design system.',
  cards: [
    {
      title: 'The challenge',
      body: "An assistant that learns one person over time, on infrastructure shared by many, where one user's health data can never reach another's.",
    },
    {
      title: 'The approach',
      body: 'Row-level security with a two-role Postgres setup. Memory lives in the database and is rebuilt into every conversation, so the model remembers nothing and the AI provider stays swappable.',
    },
    {
      title: 'The infrastructure',
      body: 'One hardened GCP VM running the same Docker Compose stack as local dev. No public SSH, Shielded VM, least-privilege service account, secrets in Secret Manager. All of it in Terraform.',
    },
  ],
  stack:
    'React Native (Expo) · FastAPI · PostgreSQL + TimescaleDB + pgvector · Docker Compose on GCP · Terraform · Firebase Auth',
  cta: {
    label: 'Read the full case study',
    href: '/sithea',
  },
  website: 'https://sithea.com',
}

export interface ExperienceProject {
  name: string
  period: string
  summary: string
}

export interface ExperienceItem {
  role: string
  org: string
  period: string
  summary: string
  bullets?: string[]
  // For roles spanning more than one client project, listed newest first.
  projects?: ExperienceProject[]
  links?: { label: string; href: string }[]
}

export const act4 = {
  about: {
    label: 'About',
    heading: 'Building software that actually ships',
    bio: [
      "I'm a backend-leaning full-stack engineer based in Serbia. I work on APIs, databases and the cloud infrastructure they run on, and I own features end to end, from database schema to Terraform-managed production deploy.",
      'I came to software from hardware. My degree is in electrical and computer engineering, and my first projects were written in C and 8051 assembly. That is where the habit comes from of weighing systems, cost and constraints before reaching for another service or a paid tier.',
      "Outside engineering I volunteer with ORS, Serbia's organisation for people with rheumatic and musculoskeletal disease, and with EULAR PARE in its Internal and External Affairs working group. That community is who Sithea is for.",
    ],
    stats: [
      { value: '3+', label: 'Years Experience' },
      { value: '10+', label: 'Projects Shipped' },
      { value: '8+', label: 'Companies & Clients' },
    ],
    facts: [
      ['Location', 'Serbia · open to relocation'],
      ['Current role', 'Software Engineer · VegaIT'],
      ['Education', 'B.Sc. Electrical & Computer Engineering, University of Novi Sad'],
      ['Erasmus', 'Budapest University of Technology'],
      ['Languages', 'Serbian (native) · English (B2)'],
      ['Volunteering', 'EULAR PARE · Internal & External Affairs'],
      ['Community', 'ORS · Red Cross Serbia (earlier)'],
    ] as const,
  },
  experience: {
    label: 'Experience',
    askHint: 'Want more detail on any of these?',
    askLabel: 'Ask my assistant',
    // Reverse-chronological by start date. Freelance sits last because it
    // started earliest, and runs underneath everything above it.
    items: [
      {
        role: 'Software Engineer',
        org: 'VegaIT',
        period: 'May 2025 - Present',
        summary: 'Client projects in insurance and healthcare, on .NET backends across Azure and AWS.',
        projects: [
          {
            name: 'AI insurance integration',
            period: 'Sep 2026 - Present',
            summary:
              'Integration between an AI insurance platform and two insurance platforms on .NET and Azure. Production support, root-cause analysis across services, and releases.',
          },
          {
            name: 'Clinical trial planning platform',
            period: 'May 2025 - Aug 2026',
            summary:
              '.NET 8 on AWS Lambda with PostGIS site scoring and trial-scoped authorization. Led a frontend refactor that cut the codebase 25%. Covered the team lead role.',
          },
        ],
      },
      {
        role: 'Software Engineering Intern',
        org: 'EPAM Systems',
        period: 'Nov 2024 - Apr 2025',
        summary: 'Enterprise project management platform.',
        bullets: [
          'Built the backend in FastAPI, PostgreSQL and SQLAlchemy, with Alembic migrations and its own authentication layer',
          'Shipped with Docker, separate GitHub Actions CI and CD pipelines, pre-commit hooks and a pytest suite',
        ],
        links: [{ label: 'FastAPI-project', href: 'https://github.com/SimonMuncan/FastAPI-project' }],
      },
      {
        role: 'Software Engineering Intern',
        org: 'Schneider Electric Hub',
        period: 'Oct - Nov 2023',
        summary: 'AI desktop assistant, built before LLM APIs made it a single call.',
        bullets: [
          'Python assistant with speech, and separate API, SQL and core-logic modules',
          'Continued it as VirtualAssistant 2.0: Tkinter GUI, SQLite persistence, live weather and appointment management',
        ],
        links: [
          { label: 'Sophia', href: 'https://github.com/SimonMuncan/Sophia' },
          { label: 'VirtualAssistant 2.0', href: 'https://github.com/SimonMuncan/VirtualAssistant-2.0' },
        ],
      },
      {
        role: 'Full-Stack Engineer',
        org: 'Freelance',
        period: '2022 - Present',
        summary: 'Client and independent work, alongside university and now alongside full-time work.',
        bullets: [
          'Shipped the HNZ community platform solo: Stripe donations, audio streaming, FastAPI + PostgreSQL',
          'Built a client website in Django (Digital Archive)',
          'The track Sithea and Solenne grew out of',
        ],
      },
    ] satisfies ExperienceItem[],
  },
  volunteering: {
    heading: 'Volunteering',
    items: [
      {
        org: 'EULAR PARE',
        role: 'Internal & External Affairs working group',
        period: 'Current',
        summary: 'The European network for people with arthritis and rheumatism.',
      },
      {
        org: 'ORS',
        role: 'Active member',
        period: 'Current',
        summary:
          "Serbia's organisation for people with rheumatic and musculoskeletal disease. I train members, bring new technology into how the organisation works, and organise events, including talks by rheumatologists.",
      },
      {
        org: 'Red Cross Serbia',
        role: 'Volunteer',
        period: '4 to 5 years, from middle school',
        summary: 'Helping elderly people in my village.',
      },
    ],
  },
  solenne: {
    label: 'Co-founder & lead engineer',
    heading: 'Solenne',
    body: 'Automated website generation for small businesses. From lead to live site, without the owner touching a line of code.',
    statement:
      "Most small businesses don't have a bad website. They have no website. That gap is the whole company.",
    role: 'I architected and built the platform from scratch and lead its engineering.',
    // What the Work card doesn't already say.
    highlights: [
      'PostgreSQL schema evolved through ~40 versioned Alembic migrations, async SQLAlchemy 2.0 throughout',
      'Internal dashboard with 11 views, and a public site with server-side prerendering, build-time SEO checks and localization served at the edge',
      'Multi-currency financial logic: exchange-rate conversion, MRR reporting, and a pluggable payment-provider layer with signature-verified webhooks',
      'Security work on the live platform: analyzed real malicious traffic and helped add CloudFront edge functions and alerting to block and monitor it',
    ],
    stack:
      'Python · FastAPI · PostgreSQL · SQLAlchemy 2.0 · Alembic · React · TypeScript · Vite · LLM APIs · AWS (Lambda, ECS Fargate, RDS, S3, CloudFront) · Terraform · Docker · GitHub Actions · pytest · Vitest',
    href: 'https://solenne.it.com',
  },
  contact: {
    label: 'Contact',
    heading: 'Have a role or project in mind?',
    body: "Open to full-time roles and freelance work. If you're building something real, let's talk.",
    email: 'simonmuncan@gmail.com',
    linkedin: 'https://www.linkedin.com/in/simon-muncan-3067071b0/',
    github: 'https://github.com/SimonMuncan',
  },
}
