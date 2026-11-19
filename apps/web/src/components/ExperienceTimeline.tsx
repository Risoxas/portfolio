import { Briefcase, GraduationCap } from "lucide-react";
import { EXPERIENCE, PROFILE } from "@/data/resume";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
        Career Track
      </p>
      <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
        Experience &amp; Engineering Impact
      </h2>

      <div className="mt-8 space-y-5">
        {EXPERIENCE.map((item) => (
          <article
            key={`${item.company}-${item.period}`}
            className="rounded-xl border p-6"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-surface)",
            }}
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2.5">
                <Briefcase className="h-4 w-4 shrink-0" style={{ color: "var(--accent)" }} aria-hidden="true" />
                <h3 className="text-lg font-bold">
                  {item.role} <span className="font-normal" style={{ color: "var(--text-secondary)" }}>· {item.company}</span>
                </h3>
              </div>
              <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                {item.period}
              </span>
            </div>

            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm" style={{ color: "var(--text-secondary)" }}>
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
          </article>
        ))}

        <article
          className="flex flex-col justify-between gap-3 rounded-xl border p-6 sm:flex-row sm:items-center"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-surface)",
          }}
        >
          <div className="flex items-center gap-3">
            <GraduationCap className="h-5 w-5 shrink-0" style={{ color: "var(--accent)" }} aria-hidden="true" />
            <div>
              <h3 className="font-bold">{PROFILE.education.degree}</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {PROFILE.education.school}
              </p>
            </div>
          </div>
          <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
            {PROFILE.education.period}
          </span>
        </article>
      </div>
    </section>
  );
}
