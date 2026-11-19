"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Moon, Sun, Terminal } from "lucide-react";
import { PROFILE } from "@/data/resume";

const NAV_LINKS = [
  { href: "#architecture", label: "Architecture" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.dataset.theme = saved;
    }
  }, []);

  const toggleTheme = () => {
    const isCurrentlyDark =
      theme === "dark" ||
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const next = isCurrentlyDark ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("portfolio-theme", next);
  };

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "color-mix(in srgb, var(--bg-page) 85%, transparent)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg border"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-surface)",
              color: "var(--accent)",
            }}
          >
            <Terminal className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>david.alvarez</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--text-secondary)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="rounded-lg border p-2 transition-colors hover:opacity-80"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-secondary)",
            }}
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="rounded-lg border p-2 transition-colors hover:opacity-80"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-secondary)",
            }}
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="cursor-pointer rounded-lg border p-2 transition-colors hover:opacity-80"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-secondary)",
            }}
          >
            <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
            <Moon className="block h-4 w-4 dark:hidden" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
