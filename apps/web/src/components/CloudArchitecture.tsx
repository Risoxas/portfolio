"use client";

import { useState } from "react";
import { Activity, CheckCircle2, Cloud, Cpu, Database, Server } from "lucide-react";
import { CLOUD_NODES, type CloudNode } from "@/data/resume";
import type { ServiceProbe } from "@/app/api/health/route";

interface HealthResponse {
  ok: boolean;
  timestamp: string;
  monthlyCostUsd: number;
  services: ServiceProbe[];
}

export function CloudArchitecture() {
  const [selectedId, setSelectedId] = useState<CloudNode["id"]>("vercel");
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedNode = CLOUD_NODES.find((n) => n.id === selectedId) ?? CLOUD_NODES[0];

  const runHealthCheck = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as HealthResponse;
        setHealth(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const getProbeFor = (id: CloudNode["id"]) =>
    health?.services.find((s) => s.id === id);

  return (
    <section id="architecture" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            Multi-Cloud Free-Tier Blueprint
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            How This Portfolio Runs at $0/Month
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
            Instead of paying for a single monolithic server, workloads are split across Vercel, Google Cloud Run, and
            AWS Lambda—staying comfortably inside each provider&apos;s permanent free tier.
          </p>
        </div>

        <button
          type="button"
          onClick={runHealthCheck}
          disabled={loading}
          className="inline-flex cursor-pointer items-center gap-2 self-start rounded-lg border px-4 py-2 font-mono text-xs font-semibold transition-opacity hover:opacity-85 disabled:opacity-60 sm:self-auto"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-surface)",
            color: "var(--text-primary)",
          }}
        >
          <Activity className="h-4 w-4" style={{ color: "var(--accent-emerald)" }} aria-hidden="true" />
          {loading ? "Probing Cloud Nodes..." : "Ping Multi-Cloud Health"}
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {CLOUD_NODES.map((node) => {
          const isSelected = node.id === selectedId;
          const probe = getProbeFor(node.id);
          const Icon = node.id === "vercel" ? Cloud : node.id === "gcp" ? Server : Cpu;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedId(node.id)}
              className="card-hover cursor-pointer rounded-xl border p-5 text-left transition-colors"
              style={{
                borderColor: isSelected ? "var(--accent)" : "var(--border-subtle)",
                backgroundColor: "var(--bg-surface)",
                boxShadow: isSelected ? "0 0 0 1px var(--accent)" : undefined,
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold" style={{ color: "var(--accent)" }}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {node.provider}
                </span>
                {probe ? (
                  <span
                    className="rounded-full px-2 py-0.5 font-mono text-[11px] font-medium"
                    style={{
                      backgroundColor: "var(--bg-muted)",
                      color: probe.status === "live" ? "var(--accent-emerald)" : "var(--text-secondary)",
                    }}
                  >
                    {probe.status === "live" ? `LIVE · ${probe.latencyMs}ms` : "STANDBY FALLBACK"}
                  </span>
                ) : (
                  <span className="font-mono text-[11px]" style={{ color: "var(--text-secondary)" }}>
                    Click to inspect
                  </span>
                )}
              </div>

              <h3 className="mt-3 text-base font-bold">{node.service}</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                {node.role}
              </p>

              <div className="mt-4 border-t pt-3 font-mono text-xs" style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}>
                {node.freeTierLimit}
              </div>
            </button>
          );
        })}
      </div>

      <div
        className="mt-6 rounded-xl border p-6"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-surface)",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-mono text-xs font-semibold uppercase" style={{ color: "var(--accent)" }}>
              {selectedNode.provider} · {selectedNode.service}
            </span>
            <h3 className="mt-1 text-lg font-bold">{selectedNode.role}</h3>
          </div>
          <div
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-muted)",
            }}
          >
            <Database className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} aria-hidden="true" />
            <span>{selectedNode.runtime}</span>
          </div>
        </div>

        <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {selectedNode.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--accent-emerald)" }} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {getProbeFor(selectedNode.id) && (
          <div
            className="mt-4 rounded-lg border px-3.5 py-2.5 font-mono text-xs"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-muted)",
              color: "var(--text-secondary)",
            }}
          >
            Probe: {getProbeFor(selectedNode.id)?.detail}
          </div>
        )}
      </div>
    </section>
  );
}
