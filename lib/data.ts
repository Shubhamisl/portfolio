// All portfolio content extracted from resume, remapped to an RPG schema.
// Skill "levels" are an editorial RPG framing of proficiency, not literal metrics.

export const hero = {
  name: "SHUBHAM KUMAR",
  class: "Full-Stack Engineer",
  subclass: "AI Integrations",
  location: "Greater Noida, India",
  level: 26,
  title: "Python · TypeScript · Next.js",
  blurb:
    "Final-year CSE student and full-stack engineer with a year of contract delivery shipping Python and TypeScript features into live SaaS workflows. Hands-on across agentic AI and LLM integrations, RAG and vector retrieval, and end-to-end deployment on Vercel, Supabase, and Firebase.",
};

export const contacts = {
  phone: "+91 8287359082",
  email: "shubhamzy82@gmail.com",
  linkedin: "https://www.linkedin.com/in/shubhamisl/",
  github: "https://github.com/shubhamisl",
};

// Each "stat" is a skill category. value = 0-100 ATB-style bar. Grouped under gold sub-bars.
export type Stat = {
  key: string;
  label: string;
  group: string;
  value: number;
  color: string;
  items: string[];
};

export const stats: Stat[] = [
  {
    key: "agentic",
    label: "Agentic AI / LLM",
    group: "MAGITEK (AI)",
    value: 92,
    color: "var(--magic-violet)",
    items: [
      "OpenAI API",
      "Anthropic Claude API (tool use, agents)",
      "OpenRouter",
      "embeddings",
      "RAG pipelines",
      "FSRS scheduling",
      "prompt engineering",
      "evaluation",
    ],
  },
  {
    key: "aiflow",
    label: "AI Dev Workflow",
    group: "MAGITEK (AI)",
    value: 89,
    color: "var(--magic-violet)",
    items: ["Cursor", "Claude Code", "GitHub Copilot", "MCP awareness", "AI-assisted code review"],
  },
  {
    key: "languages",
    label: "Languages",
    group: "ARCANA (LANGUAGES)",
    value: 90,
    color: "var(--gold)",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "HTML5", "CSS3"],
  },
  {
    key: "frontend",
    label: "Frontend",
    group: "FRONTEND",
    value: 88,
    color: "var(--hp-green)",
    items: ["React", "Next.js (App Router)", "Vite", "Tailwind CSS", "PWA", "Service Workers"],
  },
  {
    key: "backend",
    label: "Backend",
    group: "BACKEND",
    value: 86,
    color: "var(--mp-blue)",
    items: ["FastAPI", "REST APIs", "Next.js server actions", "async I/O", "authentication flows"],
  },
  {
    key: "data",
    label: "Data",
    group: "BACKEND",
    value: 84,
    color: "var(--mp-blue)",
    items: ["PostgreSQL", "Supabase (Auth, Storage, RLS)", "Firebase Firestore", "Redis", "pgvector", "ChromaDB"],
  },
  {
    key: "infra",
    label: "Infra & DevOps",
    group: "TRIALS (OPS & TEST)",
    value: 80,
    color: "var(--exp-amber)",
    items: ["Docker", "Celery", "Vercel", "Firebase Hosting", "Git/GitHub"],
  },
  {
    key: "testing",
    label: "Testing",
    group: "TRIALS (OPS & TEST)",
    value: 78,
    color: "var(--exp-amber)",
    items: ["pytest", "httpx", "Vitest", "Playwright"],
  },
];

export type Quest = {
  role: string;
  org: string;
  period: string;
  rank: "MAIN QUEST" | "SIDE QUEST";
  log: string[];
};

export const quests: Quest[] = [
  {
    role: "Software Engineer, Contract",
    org: "ExcSaaS",
    period: "Feb 2025 – Feb 2026",
    rank: "MAIN QUEST",
    log: [
      "Shipped end-to-end SaaS features in Python and JavaScript across the full stack — REST endpoints, frontend integration, database changes, and deployment — within tight contract turnarounds.",
      "Authored reusable API contracts and component patterns reused across multiple product flows, shortening iteration time on related features.",
      "Worked directly with product and frontend stakeholders through scoping, prototyping, code review, and post-release fixes, maintaining test coverage and code-review discipline throughout.",
      "Operated an agentic, AI-native development workflow (Cursor, Claude Code, Copilot) for spec breakdown, scaffolding, and refactoring, compounding throughput while keeping every change human-reviewed.",
    ],
  },
];

export type Dungeon = {
  name: string;
  tagline: string;
  links: { label: string; href: string }[];
  log: string[];
  loot: string[];
};

export const dungeons: Dungeon[] = [
  {
    name: "Cuemath Flashcards",
    tagline: "AI Flashcard & Spaced-Repetition Platform",
    links: [
      { label: "GitHub", href: "#" },
      { label: "Live", href: "#" },
    ],
    log: [
      "Shipped a deployed Next.js 16 app that ingests user PDFs and emits atomic, semantically deduplicated flashcards via LLM extraction and pgvector embeddings on Supabase Postgres.",
      "Built the full review loop end-to-end — deck library, review sprints, and FSRS spaced-repetition scheduling — with per-user data isolation through Supabase Auth and Row-Level Security policies.",
      "Designed an LLM provider abstraction over OpenRouter and Anthropic so models can be swapped without touching call sites; managed schema evolution via Supabase migrations.",
    ],
    loot: ["Next.js 16", "Supabase", "pgvector", "OpenRouter", "Anthropic", "RLS", "FSRS"],
  },
  {
    name: "GYM",
    tagline: "Bodybuilding Transformation PWA",
    links: [
      { label: "GitHub", href: "#" },
      { label: "Live", href: "#" },
    ],
    log: [
      "Shipped an installable, offline-first PWA for workout tracking on Firebase Hosting — Service Worker caching, Firestore cloud sync, and a mobile-first responsive UI built with Firebase Auth.",
      "Built the social loop end-to-end: invite-gated authentication, group challenges and leaderboards, live activity feed, calendar tracking, and stats dashboards, all governed by Firestore security rules.",
    ],
    loot: ["PWA", "Service Workers", "Firebase", "Firestore", "Firebase Auth"],
  },
  {
    name: "Meridian",
    tagline: "Autonomous Research Intelligence Engine",
    links: [
      { label: "GitHub", href: "#" },
      { label: "AI Backend", href: "#" },
    ],
    log: [
      "Built an autonomous research backend in FastAPI driving Claude tool-use over ChromaDB vector retrieval and PostgreSQL persistence, with Celery + Redis task orchestration in Docker, to produce iteratively gathered, cited research reports.",
    ],
    loot: ["FastAPI", "Claude tool-use", "ChromaDB", "PostgreSQL", "Celery", "Redis", "Docker"],
  },
];

export const lore = {
  degree: "B.Tech, Computer Science & Engineering",
  school: "JSS Academy of Technical Education, Noida",
  expected: "Expected Jun 2026",
  cgpa: "CGPA 7.08 / 10",
  prior: ["CBSE Class XII — 83.2% (2021)", "CBSE Class X — 90.2% (2019)"],
};

export const trophies = [
  { name: "Google AI Essentials", desc: "Certification", rarity: "rare" },
  { name: "Google Prompting Essentials", desc: "Certification", rarity: "rare" },
  { name: "Smart India Hackathon", desc: "Semi-finalist", rarity: "epic" },
  { name: "TATA Imagination Cup", desc: "Advanced to penultimate round", rarity: "epic" },
];
