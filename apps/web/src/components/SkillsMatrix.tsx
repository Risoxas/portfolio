"use client";

import { useState } from "react";
import { SKILL_CATEGORIES } from "@/data/resume";

export function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const visibleCategories =
    activeCategory === "all"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === activeCategory);

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            Technical Stack
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Technologies &amp; Cloud Services
          </h2>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter technologies by category">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className="cursor-pointer rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold transition-colors"
            style={{
              borderColor: activeCategory === "all" ? "var(--accent)" : "var(--border-subtle)",
              backgroundColor: activeCategory === "all" ? "var(--accent)" : "var(--bg-surface)",
              color: activeCategory === "all" ? "#ffffff" : "var(--text-secondary)",
            }}
          >
            All
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className="cursor-pointer rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold transition-colors"
              style={{
                borderColor: activeCategory === cat.id ? "var(--accent)" : "var(--border-subtle)",
                backgroundColor: activeCategory === cat.id ? "var(--accent)" : "var(--bg-surface)",
                color: activeCategory === cat.id ? "#ffffff" : "var(--text-secondary)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {visibleCategories.map((category) => (
          <div
            key={category.id}
            className="rounded-xl border p-6"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-surface)",
            }}
          >
            <h3 className="text-base font-bold">{category.label}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.items.map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium"
                  style={{
                    borderColor: "var(--border-subtle)",
                    backgroundColor: "var(--bg-muted)",
                  }}
                >
                  <span>{skill.name}</span>
                  <span
                    className="font-mono text-[10px]"
                    style={{
                      color: skill.level === "Core" ? "var(--accent)" : "var(--text-secondary)",
                    }}
                  >
                    {skill.level}
                  </span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
