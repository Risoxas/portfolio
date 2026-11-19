"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, FolderGit2, Layers, Star, X } from "lucide-react";
import { CASE_STUDIES, type CaseStudy } from "@/data/resume";
import type { GitHubRepo } from "@/lib/github";

interface ProjectsSectionProps {
  repos: GitHubRepo[];
  repoSource: "github-api" | "fallback";
}

export function ProjectsSection({ repos, repoSource }: ProjectsSectionProps) {
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Fallback for browsers without native <dialog closedby="any">
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      let pressedOutside = false;
      const isOutside = (e: PointerEvent) => {
        const rect = dialog.getBoundingClientRect();
        return e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
      };
      const onPointerDown = (e: PointerEvent) => {
        pressedOutside = isOutside(e);
      };
      const onPointerUp = (e: PointerEvent) => {
        if (pressedOutside && isOutside(e)) dialog.close();
      };
      dialog.addEventListener("pointerdown", onPointerDown);
      dialog.addEventListener("pointerup", onPointerUp);
      return () => {
        dialog.removeEventListener("pointerdown", onPointerDown);
        dialog.removeEventListener("pointerup", onPointerUp);
      };
    }
  }, []);

  const openStudy = (study: CaseStudy) => {
    setActiveStudy(study);
    dialogRef.current?.showModal();
  };

  const closeStudy = () => {
    dialogRef.current?.close();
  };

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
        Production Work &amp; Open Source
      </p>
      <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
        Featured Case Studies
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {CASE_STUDIES.map((study) => (
          <article
            key={study.id}
            className="card-hover flex flex-col justify-between rounded-xl border p-6"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-surface)",
            }}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium"
                  style={{
                    borderColor: "var(--border-subtle)",
                    backgroundColor: "var(--bg-muted)",
                    color: "var(--accent)",
                  }}
                >
                  <Layers className="h-3 w-3" aria-hidden="true" />
                  {study.cloud}
                </span>
                <span className="font-mono text-xs font-semibold" style={{ color: "var(--accent-emerald)" }}>
                  {study.impact}
                </span>
              </div>

              <h3 className="mt-3 text-lg font-bold">{study.title}</h3>
              <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                {study.subtitle}
              </p>
              <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                {study.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {study.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border px-2 py-0.5 font-mono text-[11px]"
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
            </div>

            <div className="mt-5 flex items-center gap-3 border-t pt-4" style={{ borderColor: "var(--border-subtle)" }}>
              <button
                type="button"
                onClick={() => openStudy(study)}
                className="cursor-pointer rounded-lg px-3.5 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--accent)" }}
              >
                Inspect Architecture
              </button>
              {study.repoUrl && (
                <a
                  href={study.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Source <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Live GitHub Repositories */}
      <div className="mt-14">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="flex items-center gap-2 text-xl font-bold">
            <FolderGit2 className="h-5 w-5" style={{ color: "var(--accent)" }} aria-hidden="true" />
            GitHub Repositories (@Risoxas)
          </h3>
          <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
            Source: {repoSource === "github-api" ? "Live GitHub REST API (1h ISR)" : "Cached Snapshot"}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="card-hover flex flex-col justify-between rounded-xl border p-5"
              style={{
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg-surface)",
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-bold" style={{ color: "var(--accent)" }}>
                    {repo.name}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" style={{ color: "var(--text-secondary)" }} aria-hidden="true" />
                </div>
                <p className="mt-2 line-clamp-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                  {repo.description || "Repository in TypeScript / Python"}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between font-mono text-[11px]" style={{ color: "var(--text-secondary)" }}>
                <span>{repo.language ?? "Multi-stack"}</span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3 w-3" aria-hidden="true" />
                  {repo.stargazers_count}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Native <dialog> modal following modern-web-guidance */}
      <dialog
        ref={dialogRef}
        {...({ closedby: "any" } as Record<string, string>)}
        aria-labelledby="case-study-dialog-title"
        onClose={() => {
          if (dialogRef.current) dialogRef.current.returnValue = "";
        }}
        className="m-auto w-[min(92vw,40rem)] rounded-2xl p-6 shadow-2xl"
      >
        {activeStudy && (
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-semibold uppercase" style={{ color: "var(--accent)" }}>
                  {activeStudy.cloud} · {activeStudy.impact}
                </span>
                <h3 id="case-study-dialog-title" className="mt-1 text-xl font-bold">
                  {activeStudy.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeStudy}
                aria-label="Close architecture details"
                autoFocus
                className="cursor-pointer rounded-lg border p-1.5 hover:opacity-80"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
              {activeStudy.summary}
            </p>

            <h4 className="mt-5 font-mono text-xs font-semibold uppercase" style={{ color: "var(--text-secondary)" }}>
              Architecture Breakdown
            </h4>
            <ul className="mt-2 space-y-2 text-sm">
              {activeStudy.architecture.map((step) => (
                <li key={step} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--accent-emerald)" }} aria-hidden="true" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>

            <h4 className="mt-5 font-mono text-xs font-semibold uppercase" style={{ color: "var(--text-secondary)" }}>
              Key Outcomes
            </h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm" style={{ color: "var(--text-secondary)" }}>
              {activeStudy.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        )}
      </dialog>
    </section>
  );
}
