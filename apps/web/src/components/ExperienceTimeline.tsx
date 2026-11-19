"use client";

import { useState } from "react";
import { Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import { EXPERIENCE } from "@/data/resume";

export function ExperienceTimeline() {
  // Expand the 2 most recent roles by default; older roles start collapsed
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(() => new Set([0, 1]));

  const allExpanded = expandedIndices.size === EXPERIENCE.length;

  const toggleIndex = (idx: number) => {
    setExpandedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedIndices(new Set());
    } else {
      setExpandedIndices(new Set(EXPERIENCE.map((_, idx) => idx)));
    }
  };

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            Career Track
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Experience &amp; Engineering Impact
          </h2>
        </div>

        <button
          type="button"
          onClick={toggleAll}
          className="cursor-pointer self-start rounded-lg border px-3.5 py-1.5 font-mono text-xs font-semibold transition-opacity hover:opacity-85 sm:self-auto"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-surface)",
            color: "var(--text-secondary)",
          }}
        >
          {allExpanded ? "Collapse All" : "Expand All"}
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {EXPERIENCE.map((item, idx) => {
          const isOpen = expandedIndices.has(idx);
          const panelId = `exp-panel-${idx}`;

          return (
            <article
              key={`${item.company}-${item.period}`}
              className="rounded-xl border"
              style={{
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg-surface)",
              }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleIndex(idx)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <Briefcase className="h-4 w-4 shrink-0" style={{ color: "var(--accent)" }} aria-hidden="true" />
                  <h3 className="truncate text-base font-bold sm:text-lg">
                    {item.role}{" "}
                    <span className="font-normal" style={{ color: "var(--text-secondary)" }}>
                      · {item.company}
                    </span>
                  </h3>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden font-mono text-xs sm:inline" style={{ color: "var(--text-secondary)" }}>
                    {item.period}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" style={{ color: "var(--text-secondary)" }} aria-hidden="true" />
                  ) : (
                    <ChevronDown className="h-4 w-4" style={{ color: "var(--text-secondary)" }} aria-hidden="true" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div id={panelId} className="border-t px-5 pb-5 pt-4" style={{ borderColor: "var(--border-subtle)" }}>
                  <p className="mb-2 font-mono text-xs sm:hidden" style={{ color: "var(--text-secondary)" }}>
                    {item.period}
                  </p>
                  <ul className="list-disc space-y-1.5 pl-5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    {item.highlights.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border px-2.5 py-0.5 font-mono text-xs"
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
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
