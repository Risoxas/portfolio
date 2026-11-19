export interface ImpactMetric {
  value: string;
  label: string;
  detail: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location?: string;
  stack: string[];
  highlights: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  cloud: "GCP" | "AWS" | "Multi-Cloud";
  impact: string;
  summary: string;
  architecture: string[];
  stack: string[];
  highlights: string[];
  repoUrl?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  items: { name: string; level: "Core" | "Proficient" | "Experienced" }[];
}

export interface CloudNode {
  id: "vercel" | "gcp" | "aws";
  provider: string;
  service: string;
  role: string;
  freeTierLimit: string;
  runtime: string;
  endpointPath: string;
  highlights: string[];
}

export const PROFILE = {
  name: "David Alvarez Gasca",
  handle: "Risoxas",
  role: "Senior Full-Stack & Cloud Engineer",
  location: "México",
  email: "davidag93@gmail.com",
  linkedin: "https://www.linkedin.com/in/davidag93",
  github: "https://github.com/Risoxas",
  summary:
    "Full-Stack Developer with 6+ years of experience building scalable, cloud-native applications. Specialized in Python (FastAPI), React / Next.js (TypeScript), and serverless deployments on AWS and GCP—delivering measurable infrastructure savings and high-throughput architectures.",
  education: {
    degree: "B.S. in Mechatronic Engineering",
    school: "Monterrey Institute of Technology (Tec de Monterrey)",
    period: "2012 – 2018",
  },
} as const;

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    value: "6+ yrs",
    label: "Full-Stack & Cloud",
    detail: "Production systems across fintech, SaaS, automotive & AI",
  },
  {
    value: "-30%",
    label: "Infra Costs",
    detail: "Serverless GCP Cloud Run migration & usage-based scaling",
  },
  {
    value: "-70%",
    label: "Data Processing Cost",
    detail: "BigQuery analytics replacing Cloud Storage query scans",
  },
  {
    value: "+30%",
    label: "App Performance",
    detail: "Hybrid PostgreSQL + BigQuery read/write data strategy",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Itransition",
    role: "Sr. Full-Stack Engineer",
    period: "Oct 2023 – Present",
    stack: ["Python", "FastAPI", "React", "TypeScript", "GCP", "Cloud Run", "BigQuery", "PostgreSQL"],
    highlights: [
      "Built and maintained full-stack apps with Python (FastAPI) and React/TypeScript on serverless GCP architecture, cutting monthly infrastructure costs by 30%.",
      "Adopted BigQuery for analytical workloads, reducing data processing costs by 70% compared to Cloud Storage queries.",
      "Designed a hybrid data storage strategy splitting access between PostgreSQL and BigQuery, increasing application performance by 30%.",
    ],
  },
  {
    company: "Self-Employed",
    role: "Freelance Full-Stack Developer",
    period: "Aug 2019 – Present",
    stack: ["Next.js", "React", "TypeScript", "Python", "FastAPI", "Docker", "Cloud Run", "BigQuery", "PostgreSQL"],
    highlights: [
      "Architected an AI-powered inventory forecasting platform that reduced stockouts by 30% and improved inventory turnover by 15%.",
      "Led a team of three developers building a serverless ERP for the automotive industry on GCP Cloud Run and Docker.",
      "Automated CI/CD deployment pipelines and mentored junior developers through end-to-end client deliveries.",
    ],
  },
  {
    company: "Svitla",
    role: "Sr. Full-Stack Developer (Contractor)",
    period: "Mar 2022 – Nov 2022",
    stack: ["Vue.js", "Node.js", "TypeScript", "AWS Lambda", "API Gateway", "AWS Cognito"],
    highlights: [
      "Built web applications with Vue.js and Node.js/TypeScript on serverless AWS, reducing deployment times by 30%.",
      "Built and secured high-volume fintech API endpoints using AWS Lambda and AWS Cognito for thousands of daily users.",
    ],
  },
  {
    company: "IBM",
    role: "Web Technologies Developer",
    period: "Oct 2021 – Mar 2022",
    stack: ["React Native", "Vue.js", "Kotlin", "Docker", "GCP", "AppCenter"],
    highlights: [
      "Developed web and mobile applications using React Native, Vue.js, and Kotlin, increasing cross-platform user engagement by 20%.",
      "Managed Docker deployments to GCP for a multi-tenant SaaS platform serving 10,000+ users and mobile releases via AppCenter.",
    ],
  },
  {
    company: "Capgemini Engineering",
    role: "Software Developer & Test Engineer",
    period: "Mar 2020 – Oct 2021",
    stack: ["C++", "Python", "Agile", "V-Model"],
    highlights: [
      "Created and tested embedded automotive software in C++ and Python, reducing development cycles from 6 to 4 weeks and boosting team output by 33%.",
    ],
  },
  {
    company: "Intel",
    role: "Validation Associate",
    period: "Nov 2019 – Mar 2020",
    stack: ["Validation", "Hardware/Software QA"],
    highlights: ["Executed pre-silicon and platform validation workflows."],
  },
  {
    company: "New York Life",
    role: "Jr. Developer",
    period: "Jul 2018 – Oct 2019",
    stack: ["JavaScript", "Python", "Web Development"],
    highlights: ["Developed internal web tools and supported enterprise application delivery."],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "multi-cloud-portfolio",
    title: "Zero-Cost Multi-Cloud Portfolio",
    subtitle: "Vercel + GCP Cloud Run + AWS Lambda",
    cloud: "Multi-Cloud",
    impact: "$0/mo Free-Tier Architecture",
    summary:
      "This portfolio is a live monorepo demonstrating how to split frontend SSR, Python analytics, and serverless event ingestion across three cloud free tiers without vendor lock-in.",
    architecture: [
      "Vercel Hobby hosts Next.js 15 App Router with ISR caching for GitHub API data.",
      "GCP Cloud Run runs containerized Python FastAPI for architecture telemetry & stack metrics (scales to zero).",
      "AWS Lambda + HTTP API Gateway handles contact form validation & ingestion.",
      "Terraform provisions cloud resources; GitHub Actions runs lint, typecheck, Vitest, and Pytest.",
    ],
    stack: ["Next.js", "TypeScript", "Python", "FastAPI", "AWS Lambda", "GCP Cloud Run", "Docker", "Terraform"],
    highlights: [
      "Graceful API fallback in Next.js Route Handlers when external cloud endpoints are unset",
      "Strict CI/CD pipeline across TypeScript and Python services",
      "Modern CSS with light-dark(), native <dialog>, and :user-invalid validation",
    ],
    repoUrl: "https://github.com/Risoxas/portfolio",
  },
  {
    id: "hybrid-data-platform",
    title: "Hybrid PostgreSQL + BigQuery Platform",
    subtitle: "Itransition · Enterprise Cloud Modernization",
    cloud: "GCP",
    impact: "-70% data cost · +30% performance",
    summary:
      "Redesigned a legacy monolithic data layer into a split OLTP/OLAP architecture on serverless GCP, pairing PostgreSQL for low-latency transactions with BigQuery for analytical queries.",
    architecture: [
      "FastAPI backend services deployed on Google Cloud Run with usage-based autoscaling.",
      "PostgreSQL handles transactional state; BigQuery executes heavy analytical aggregations.",
      "React + TypeScript frontend consumes typed REST endpoints with TanStack Query.",
    ],
    stack: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "BigQuery", "Cloud Run"],
    highlights: [
      "70% lower data processing cost vs. Cloud Storage scans",
      "30% faster application response times",
      "30% monthly infrastructure cost reduction",
    ],
  },
  {
    id: "ai-inventory-erp",
    title: "AI Inventory Forecasting & Automotive ERP",
    subtitle: "Freelance · Team Lead (3 Developers)",
    cloud: "GCP",
    impact: "-30% stockouts · +15% turnover",
    summary:
      "Led a 3-developer team to architect and ship an AI-powered inventory forecasting platform and serverless ERP for the automotive sector.",
    architecture: [
      "Next.js & React/TypeScript dashboard for real-time stock and demand forecasting.",
      "FastAPI microservices containerized with Docker and deployed on Cloud Run.",
      "Automated CI/CD pipelines via Cloud Build and GitHub.",
    ],
    stack: ["Next.js", "React", "TypeScript", "FastAPI", "Docker", "Cloud Run", "PostgreSQL"],
    highlights: [
      "Reduced stockouts by 30% across client warehouses",
      "Improved inventory turnover by 15%",
      "End-to-end delivery from architecture to mentoring junior engineers",
    ],
  },
  {
    id: "fintech-aws-api",
    title: "Serverless Fintech Auth & API Gateway",
    subtitle: "Svitla · High-Volume Financial Platform",
    cloud: "AWS",
    impact: "-30% deploy time · Thousands of daily users",
    summary:
      "Engineered secure, high-throughput serverless APIs and identity workflows for a fintech platform serving thousands of daily active users.",
    architecture: [
      "AWS Lambda + API Gateway handling stateless Node.js/TypeScript business logic.",
      "AWS Cognito managing JWT authentication, MFA, and user pools.",
      "Vue.js frontend consuming authenticated REST endpoints.",
    ],
    stack: ["Node.js", "TypeScript", "AWS Lambda", "API Gateway", "AWS Cognito", "Vue.js"],
    highlights: [
      "30% faster deployment cycles via serverless IaC",
      "Zero-downtime scaling for high-volume daily traffic",
      "Strict API security with Cognito authorizers",
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "cloud",
    label: "Cloud & Serverless",
    items: [
      { name: "GCP Cloud Run", level: "Core" },
      { name: "AWS Lambda", level: "Core" },
      { name: "BigQuery", level: "Core" },
      { name: "AWS API Gateway", level: "Core" },
      { name: "AWS Cognito", level: "Proficient" },
      { name: "AWS DynamoDB & SQS", level: "Proficient" },
      { name: "AWS S3 & RDS", level: "Proficient" },
      { name: "Cloud Storage & IAM", level: "Experienced" },
      { name: "Cloud Build & App Engine", level: "Experienced" },
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    items: [
      { name: "Python (FastAPI)", level: "Core" },
      { name: "Node.js / Express", level: "Core" },
      { name: "TypeScript", level: "Core" },
      { name: "Django & Flask", level: "Proficient" },
      { name: "GraphQL", level: "Proficient" },
      { name: "Pytest", level: "Core" },
      { name: "C / C++", level: "Experienced" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend & Mobile",
    items: [
      { name: "React", level: "Core" },
      { name: "Next.js", level: "Core" },
      { name: "TypeScript / JS", level: "Core" },
      { name: "TanStack Query & Redux", level: "Proficient" },
      { name: "Vue.js", level: "Proficient" },
      { name: "React Native", level: "Experienced" },
      { name: "Vite & Jest", level: "Proficient" },
    ],
  },
  {
    id: "data-devops",
    label: "Databases & DevOps",
    items: [
      { name: "PostgreSQL", level: "Core" },
      { name: "Docker", level: "Core" },
      { name: "Terraform & CloudFormation", level: "Proficient" },
      { name: "CI/CD (GitHub Actions)", level: "Core" },
      { name: "MongoDB", level: "Proficient" },
      { name: "Redis", level: "Proficient" },
      { name: "Git", level: "Core" },
    ],
  },
];

export const CLOUD_NODES: CloudNode[] = [
  {
    id: "vercel",
    provider: "Vercel",
    service: "Hobby Free Tier",
    role: "Next.js 15 App Router, SSR/ISR & Edge CDN",
    freeTierLimit: "100 GB bandwidth · Unlimited deployments",
    runtime: "Node.js 22 / Edge",
    endpointPath: "/api/health",
    highlights: [
      "Serves portfolio UI & static assets globally",
      "Caches GitHub API repo metadata with 1h ISR",
      "Zero-config preview deployments on every PR",
    ],
  },
  {
    id: "gcp",
    provider: "Google Cloud",
    service: "Cloud Run (Always Free)",
    role: "Python FastAPI Telemetry & Stack Metrics API",
    freeTierLimit: "2M requests/mo · 360k vCPU-sec · Scale to 0",
    runtime: "Python 3.12 · FastAPI · Docker",
    endpointPath: "/api/v1/stack-metrics",
    highlights: [
      "Containerized FastAPI microservice (port 8080)",
      "Scales to zero when idle — $0 monthly compute",
      "Showcases Pydantic validation & Pytest suite",
    ],
  },
  {
    id: "aws",
    provider: "Amazon Web Services",
    service: "Lambda + HTTP API Gateway",
    role: "Serverless Contact Ingestion & Event Handler",
    freeTierLimit: "1M requests/mo · 400k GB-sec compute",
    runtime: "Node.js 22 · TypeScript",
    endpointPath: "/contact",
    highlights: [
      "Stateless contact form validation & routing",
      "CORS-secured HTTP API Gateway trigger",
      "Provisioned via Terraform IaC",
    ],
  },
];
