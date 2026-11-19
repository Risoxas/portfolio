export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

const FEATURED_REPO_NAMES = new Set([
  "portfolio",
  "BankAPI",
  "rutina-fe",
  "OnlineFoodBE",
  "BoatMaintenance",
  "mock-gmail-back",
  "python_Similarity",
  "Vue-Training",
]);

const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: "portfolio",
    description: "Multi-cloud free-tier portfolio (Next.js on Vercel + FastAPI on GCP Cloud Run + AWS Lambda)",
    html_url: "https://github.com/Risoxas/portfolio",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
    topics: ["nextjs", "fastapi", "aws-lambda", "cloud-run", "terraform"],
  },
  {
    id: 2,
    name: "BankAPI",
    description: "Bank account API to transfer money with Python",
    html_url: "https://github.com/Risoxas/BankAPI",
    language: "Python",
    stargazers_count: 1,
    forks_count: 0,
    updated_at: "2026-09-05T11:39:35Z",
    topics: ["python", "api"],
  },
  {
    id: 3,
    name: "rutina-fe",
    description: "Exercise routines organizer frontend in TypeScript",
    html_url: "https://github.com/Risoxas/rutina-fe",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2025-12-05T01:35:22Z",
    topics: ["typescript", "react"],
  },
  {
    id: 4,
    name: "OnlineFoodBE",
    description: "Online food ordering system with TypeORM and MongoDB",
    html_url: "https://github.com/Risoxas/OnlineFoodBE",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-07-31T05:59:35Z",
    topics: ["typescript", "mongodb", "typeorm"],
  },
  {
    id: 5,
    name: "BoatMaintenance",
    description: "Maintenance tracking backend service in Python",
    html_url: "https://github.com/Risoxas/BoatMaintenance",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2023-03-31T00:49:39Z",
    topics: ["python"],
  },
  {
    id: 6,
    name: "mock-gmail-back",
    description: "Gmail clone backend service in TypeScript",
    html_url: "https://github.com/Risoxas/mock-gmail-back",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2022-12-21T16:49:00Z",
    topics: ["typescript", "nodejs"],
  },
];

export async function getGitHubRepos(username = "Risoxas"): Promise<{
  repos: GitHubRepo[];
  source: "github-api" | "fallback";
}> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=30&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return { repos: FALLBACK_REPOS, source: "fallback" };
    }

    const data = (await res.json()) as GitHubRepo[];
    if (!Array.isArray(data) || data.length === 0) {
      return { repos: FALLBACK_REPOS, source: "fallback" };
    }

    const curated = data
      .filter((repo) => FEATURED_REPO_NAMES.has(repo.name) || repo.stargazers_count > 0)
      .slice(0, 6);

    return {
      repos: curated.length > 0 ? curated : data.slice(0, 6),
      source: "github-api",
    };
  } catch {
    return { repos: FALLBACK_REPOS, source: "fallback" };
  }
}
