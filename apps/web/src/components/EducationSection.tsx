import { Award, GraduationCap } from "lucide-react";
import { CERTIFICATIONS, PROFILE } from "@/data/resume";

export function EducationSection() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
        Academic Background &amp; Credentials
      </p>
      <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
        Education &amp; Certifications
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <article
          className="flex flex-col justify-between rounded-xl border p-6"
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
                <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                University Degree
              </span>
              <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                {PROFILE.education.period}
              </span>
            </div>

            <h3 className="mt-4 text-lg font-bold">{PROFILE.education.degree}</h3>
            <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
              {PROFILE.education.school}
            </p>
          </div>

          <p className="mt-4 border-t pt-3 text-xs" style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}>
            Foundation in embedded systems, control theory, software engineering, and mathematics.
          </p>
        </article>

        <div className="space-y-4">
          {CERTIFICATIONS.map((cert) => (
            <article
              key={cert.name}
              className="rounded-xl border p-5"
              style={{
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg-surface)",
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold" style={{ color: "var(--accent)" }}>
                  <Award className="h-4 w-4" aria-hidden="true" />
                  {cert.issuer}
                </span>
                <span
                  className="rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium"
                  style={{
                    borderColor: "var(--border-subtle)",
                    backgroundColor: "var(--bg-muted)",
                    color: cert.status === "Earned" ? "var(--accent-emerald)" : "var(--text-secondary)",
                  }}
                >
                  {cert.status}
                </span>
              </div>
              <h3 className="mt-2 text-base font-bold">{cert.name}</h3>
              <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                {cert.focus}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
