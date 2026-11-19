import { ArrowDownRight, Cloud, Github, Mail } from "lucide-react";
import { IMPACT_METRICS, PROFILE } from "@/data/resume";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs font-medium"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-surface)",
              color: "var(--accent-emerald)",
            }}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            Multi-Cloud Free Tier · $0/mo Architecture
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-secondary)",
            }}
          >
            <Cloud className="h-3.5 w-3.5" aria-hidden="true" />
            Vercel · GCP Cloud Run · AWS Lambda
          </span>
        </div>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {PROFILE.name}
          <span className="block pt-2 text-2xl font-semibold sm:text-3xl lg:text-4xl" style={{ color: "var(--accent)" }}>
            {PROFILE.role}
          </span>
        </h1>

        <p className="max-w-2xl text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
          {PROFILE.summary}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#architecture"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Explore Live Architecture
            <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-primary)",
            }}
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub @{PROFILE.handle}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-primary)",
            }}
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Get in Touch
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="card-hover rounded-xl border p-5"
              style={{
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg-surface)",
              }}
            >
              <div className="font-mono text-2xl font-bold" style={{ color: "var(--accent)" }}>
                {metric.value}
              </div>
              <div className="mt-1 text-sm font-semibold">{metric.label}</div>
              <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
