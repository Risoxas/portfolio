import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Layers } from "lucide-react";
import { CASE_STUDIES } from "@/data/resume";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({
    id: study.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const study = CASE_STUDIES.find((item) => item.id === id);
  if (!study) {
    return { title: "Case Study Not Found" };
  }
  return {
    title: `${study.title} | David Alvarez Gasca`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const study = CASE_STUDIES.find((item) => item.id === id);
  if (!study) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold hover:underline"
          style={{ color: "var(--accent)" }}
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to Portfolio
        </Link>

        <article
          className="mt-6 rounded-2xl border p-6 sm:p-10"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-surface)",
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-medium"
              style={{
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg-muted)",
                color: "var(--accent)",
              }}
            >
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              {study.cloud} · Static SSG Page
            </span>
            <span className="font-mono text-xs font-semibold" style={{ color: "var(--accent-emerald)" }}>
              {study.impact}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{study.title}</h1>
          <p className="mt-1 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            {study.subtitle}
          </p>

          <p className="mt-5 text-base" style={{ color: "var(--text-secondary)" }}>
            {study.summary}
          </p>

          <h2 className="mt-8 font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            Architecture Breakdown
          </h2>
          <ul className="mt-3 space-y-2.5 text-sm">
            {study.architecture.map((step) => (
              <li key={step} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--accent-emerald)" }} aria-hidden="true" />
                <span>{step}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-8 font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            Key Outcomes
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm" style={{ color: "var(--text-secondary)" }}>
            {study.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>

          <h2 className="mt-8 font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            Tech Stack
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {study.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border px-2.5 py-1 font-mono text-xs"
                style={{
                  borderColor: "var(--border-subtle)",
                  backgroundColor: "var(--bg-muted)",
                  color: "var(--text-secondary)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {study.repoUrl && (
            <div className="mt-8 border-t pt-6" style={{ borderColor: "var(--border-subtle)" }}>
              <a
                href={study.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--accent)" }}
              >
                View Repository on GitHub
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
