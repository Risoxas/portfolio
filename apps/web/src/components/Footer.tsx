import { Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "@/data/resume";

export function Footer() {
  return (
    <footer className="border-t py-8" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-xs sm:flex-row sm:px-6" style={{ color: "var(--text-secondary)" }}>
        <p>
          © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js, FastAPI, AWS Lambda &amp; Terraform.
        </p>
        <div className="flex items-center gap-4">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            GitHub
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
            <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
            LinkedIn
          </a>
          <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-1 hover:underline">
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
