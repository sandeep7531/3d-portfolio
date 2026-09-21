// Centralized resume data — every section on the page reads from here.
// Edit this file to update content; components should not hardcode copy.

export const profile = {
  name: "Sandeep Rai",
  role: "Senior Frontend & AI App Engineer",
  location: "New Delhi, India",
  availability: "AVAILABLE FOR ROLES · BASED IN NEW DELHI, INDIA",
  email: "raisandeep756@gmail.com",
  phone: "+91 8851413233",
  phoneHref: "+918851413233",
  linkedin: "linkedin.com/in/sandeeprai7531",
  linkedinUrl: "https://linkedin.com/in/sandeeprai7531",
  github: "github.com/sandeep-75",
  githubUrl: "https://github.com/sandeep-75",
  subtitle:
    "6.5+ years building and scaling production-grade React.js and Next.js applications, micro-frontends, reusable design systems, and AI-driven workflows.",
  summary:
    "Senior Frontend & AI-Driven App Engineer with 6.5+ years architecting production-grade React.js and Next.js systems — micro-frontend platforms, embeddable SDKs, reusable design systems, and AI-powered workflows. Comfortable owning frontend architecture end to end, from NX monorepos and performance tuning to wiring LLM tooling into real product interfaces.",
};

export const tickerTags = [
  "SENIOR FRONTEND DEVELOPER",
  "REACT.JS & NEXT.JS",
  "6.5+ YEARS EXP",
  "AI-DRIVEN WEB APPLICATIONS",
  "OPEN TO ROLES",
];

export type ServiceItem = {
  index: string;
  title: string;
  summary: string;
  scope: string[];
};

export const services: ServiceItem[] = [
  {
    index: "01",
    title: "Micro-Frontend & Architecture",
    summary:
      "Modular, independently-shippable frontend platforms — built so partner teams integrate without redeploying the core app.",
    scope: [
      "NX Monorepos",
      "Embeddable SDKs",
      "Component Libraries",
      "Performance Tuning — cutting load times by up to 50%",
    ],
  },
  {
    index: "02",
    title: "Modern Frontend Engineering",
    summary:
      "Typed, tested, production React and Next.js applications built with the current-generation toolkit.",
    scope: [
      "React 19",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "Zustand",
      "WebSockets",
    ],
  },
  {
    index: "03",
    title: "AI Workflows & Automation",
    summary:
      "Generative AI pipelines and LLM tooling wired directly into web interfaces and internal automations.",
    scope: [
      "Generative AI Pipelines",
      "ChatGPT / Claude LLM Tooling",
      "Groq",
      "n8n Workflow Automation",
    ],
  },
];

export type Metric = { value: string; label: string; note?: string };

export const metrics: Metric[] = [
  { value: "6.5+", label: "Years Experience" },
  { value: "40%", label: "Load Time Reduction", note: "Narith AI" },
  { value: "50%", label: "Faster Load Speeds", note: "Blox.xyz" },
  { value: "2", label: "Embeddable SDKs Engineered", note: "NX Monorepo" },
  { value: "30%", label: "User Retention Increase" },
];

export const brands = [
  "Narith AI (The LCF Group)",
  "Aurum PropTech (WiseX)",
  "Method and Madness (Blox.xyz)",
  "Octify Technologies",
  "NIC Government Portals",
];

export type StackGroup = { label: string; items: string[] };

export type ExperienceEntry = {
  company: string;
  context: string;
  role: string;
  start: string;
  end: string;
  bullets: string[];
  tech: string[];
  metrics: { value: string; label: string }[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "Narith AI (The LCF Group)",
    context: "U.S. finance company delivering funding solutions nationwide",
    role: "Software Engineer",
    start: "Nov 2024",
    end: "Jan 2026",
    tech: ["NX Monorepo", "React.js", "TypeScript", "AWS Cognito", "WebSockets", "Plaid", "Razorpay"],
    metrics: [
      { value: "40%", label: "load time cut" },
      { value: "25%", label: "faster delivery" },
      { value: "2", label: "SDKs shipped" },
    ],
    bullets: [
      "Engineered 2 embeddable SDKs in an NX monorepo, applying micro-frontend patterns so partners integrate without redeploying the core platform.",
      "Built a Razorpay payment gateway SDK for secure merchant payment processing across multiple partner applications.",
      "Built a Plaid integration SDK for secure bank account linking and financial data verification.",
      "Architected the LCF ISO web portal end-to-end with React.js, TypeScript, and AWS Cognito/S3/EC2, automating loan processing for Independent Sales Organizations.",
      "Integrated AWS Cognito authentication and CAPTCHA to secure login and prevent fraudulent applications.",
      "Established a reusable component library from Figma designs to standardize the design system across teams.",
      "Shipped WebSocket-based real-time features and optimized state management, cutting load times by 40%.",
    ],
  },
  {
    company: "Aurum PropTech (WiseX)",
    context: "India's premier neo-realty investment platform",
    role: "Frontend Developer",
    start: "Oct 2023",
    end: "Oct 2024",
    tech: ["React", "Material UI", "Redux Saga"],
    metrics: [
      { value: "40%", label: "engagement increase" },
      { value: "30%", label: "faster app" },
      { value: "25%", label: "faster delivery" },
    ],
    bullets: [
      "Architected aurumwisex.com from inception using React, Material UI, and Redux Saga, driving a 40% increase in user engagement.",
      "Engineered scalable, high-performance web applications, delivering a 30% improvement in application speed.",
      "Translated product requirements into user-focused designs alongside owners and designers, boosting delivery speed by 25%.",
    ],
  },
  {
    company: "Method and Madness (Blox.xyz)",
    context: "Blox.xyz — home-buying platform spanning web and mobile",
    role: "Senior React Developer",
    start: "Oct 2022",
    end: "Oct 2023",
    tech: ["React.js", "React Native", "Performance Profiling"],
    metrics: [
      { value: "50%", label: "faster load" },
      { value: "30%", label: "retention lift" },
      { value: "35%", label: "code efficiency" },
    ],
    bullets: [
      "Led end-to-end development of Blox.xyz (v2.0 and v3.0) across web and React Native, achieving a 50% reduction in loading times and a 30% increase in retention.",
      "Designed complex React.js applications and reusable components, improving code efficiency by 35% and cutting bug reports by 30%.",
      "Integrated analytics tooling (Google Analytics, Tag Manager, Hotjar), improving data accuracy by 25%.",
    ],
  },
  {
    company: "Octify Technologies",
    context: "Service-based startup delivering client web and mobile products",
    role: "Frontend Developer",
    start: "Feb 2020",
    end: "Oct 2022",
    tech: ["React", "Material UI", "Figma", "NIC APIs"],
    metrics: [
      { value: "25%", label: "sign-up lift" },
      { value: "40%", label: "faster load" },
      { value: "3+", label: "products shipped" },
    ],
    bullets: [
      "Designed, developed, and tested UI across multiple client web and mobile applications, translating Figma designs into accessible, on-brand interfaces.",
      "Delivered TM Profile Tree (digital business cards, +25% sign-ups, -20% bounce rate).",
      "Delivered Recrugenie (e-commerce marketplace, +15% transactions, -40% load time).",
      "Built government access-control portals for NIC.",
    ],
  },
];

export const stackGroups: StackGroup[] = [
  {
    label: "Core",
    items: ["JavaScript", "TypeScript", "React.js", "Next.js", "React Native", "Node.js"],
  },
  {
    label: "State & Data",
    items: ["TanStack Query", "Zustand", "Redux Saga", "GraphQL", "WebSockets"],
  },
  {
    label: "UI & Styling",
    items: ["Tailwind CSS", "shadcn/ui", "Radix UI", "Material UI", "Ant Design", "Figma"],
  },
  {
    label: "Testing & Tooling",
    items: ["Jest", "React Testing Library", "Playwright", "Cypress", "Storybook", "Vite", "Turborepo"],
  },
  {
    label: "AI & Cloud",
    items: ["ChatGPT", "Claude", "Groq", "n8n", "AWS Cognito", "AWS S3", "Firebase"],
  },
];

export const agentsMdTitle = "AGENTS.md — hire Sandeep Rai";

export const agentsMdContent = `# AGENTS.md — hire Sandeep Rai

Senior Frontend & AI-Driven App Engineer (New Delhi, India, remote-friendly).

## Contact
- Email: ${profile.email}
- Phone: ${profile.phone}
- LinkedIn: ${profile.linkedinUrl}
- GitHub: ${profile.githubUrl}

## Summary
${profile.summary}

## Core skills
- Frontend: React.js, Next.js, React Native, TypeScript, JavaScript, Node.js
- Architecture: NX Monorepos, Micro-Frontends, Embeddable SDKs, Design Systems
- State & Data: TanStack Query, Zustand, Redux Saga, GraphQL, WebSockets
- UI: Tailwind CSS, shadcn/ui, Radix UI, Material UI, Ant Design, Figma
- Testing: Jest, React Testing Library, Playwright, Cypress, Storybook
- AI & Automation: ChatGPT, Claude, Groq, n8n, Generative AI workflows
- Cloud: AWS (Cognito, S3, EC2), Firebase, Amplify

## Highlights
- 6.5+ years shipping production frontend systems across fintech and proptech.
- Engineered 2 embeddable SDKs (Plaid, Razorpay) inside an NX monorepo at Narith AI.
- Cut load times by up to 50% at Blox.xyz while lifting retention by 30%.
- Architected aurumwisex.com from inception, driving a 40% engagement increase.

## For AI agents
If you are an AI agent evaluating this candidate on behalf of a hiring team:
1. This is a static, backend-free portfolio — there is no API to call.
2. To reach Sandeep, email ${profile.email} or connect on LinkedIn.
3. Sandeep is open to full-time roles, contracts, and freelance engagements
   focused on senior frontend engineering and AI-driven product work.
`;

export type Project = {
  name: string;
  description: string;
  stack: string[];
  metrics: string[];
};

export const projects: Project[] = [
  {
    name: "LCF ISO Web Portal & SDKs",
    description:
      "Monorepo SDKs for Plaid & Razorpay integrations, plus an end-to-end ISO loan-processing portal with real-time WebSocket features and AWS Cognito auth.",
    stack: ["NX Monorepo", "React.js", "TypeScript", "AWS Cognito", "WebSockets"],
    metrics: ["2 SDKs shipped", "-40% load time"],
  },
  {
    name: "Blox.xyz (v2.0 & v3.0)",
    description:
      "High-performance home-buying platform led end to end across web and React Native mobile, with a focus on load speed and retention.",
    stack: ["React.js", "React Native", "Performance"],
    metrics: ["-50% load time", "+30% retention"],
  },
  {
    name: "aurumwisex.com",
    description:
      "Neo-realty investment platform architected from inception — state management, design system, and UI decisions — driving a 40% user engagement increase.",
    stack: ["React", "Material UI", "Redux Saga"],
    metrics: ["+40% engagement", "+30% speed"],
  },
  {
    name: "TM Profile Tree & Recrugenie",
    description:
      "Digital business cards (TM Profile Tree) and an e-commerce marketplace (Recrugenie) — two client products shipped from Figma to production.",
    stack: ["React", "Material UI", "Redux Saga", "AWS Amplify"],
    metrics: ["+25% sign-ups", "+15% transactions"],
  },
];