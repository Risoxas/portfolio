"use client";

import { useState } from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { PROFILE } from "@/data/resume";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector<HTMLElement>(":invalid");
      firstInvalid?.focus();
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    setStatus("submitting");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; message?: string; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setFeedback(data.error ?? "Unable to send message right now.");
        return;
      }

      setStatus("success");
      setFeedback(data.message ?? "Message received!");
      form.reset();
    } catch {
      setStatus("error");
      setFeedback("Network error. Please email davidag93@gmail.com directly.");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div
        className="grid grid-cols-1 gap-8 rounded-2xl border p-6 sm:p-10 lg:grid-cols-2"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-surface)",
        }}
      >
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            AWS Lambda + API Gateway Ready
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Let&apos;s Build Something Scalable
          </h2>
          <p className="mt-3 text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
            Looking for a Senior Full-Stack Engineer who can architect FastAPI backends, React/Next.js frontends, and
            cost-efficient AWS/GCP infrastructure? Send a message below.
          </p>

          <div className="mt-6 space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" style={{ color: "var(--accent)" }} aria-hidden="true" />
              <a href={`mailto:${PROFILE.email}`} className="font-mono hover:underline">
                {PROFILE.email}
              </a>
            </div>
            <p className="font-mono text-xs">
              Endpoint: POST /api/contact → AWS Lambda (fallback: Next.js Route Handler)
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-semibold">
              Name
            </label>
            <span id="name-hint" className="mt-0.5 block text-xs" style={{ color: "var(--text-secondary)" }}>
              At least 2 characters
            </span>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              minLength={2}
              autoComplete="name"
              aria-describedby="name-hint"
              className="field-input mt-1.5 text-sm"
              placeholder="Jane Doe"
            />
            <div id="name-error" className="field-error">
              Please enter your name (at least 2 characters).
            </div>
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-semibold">
              Email Address
            </label>
            <span id="email-hint" className="mt-0.5 block text-xs" style={{ color: "var(--text-secondary)" }}>
              Format: you@example.com
            </span>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              aria-describedby="email-hint"
              className="field-input mt-1.5 text-sm"
              placeholder="you@example.com"
            />
            <div id="email-error" className="field-error">
              Enter an email address in the format you@example.com.
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-semibold">
              Message
            </label>
            <span id="message-hint" className="mt-0.5 block text-xs" style={{ color: "var(--text-secondary)" }}>
              At least 10 characters
            </span>
            <textarea
              id="contact-message"
              name="message"
              required
              minLength={10}
              rows={4}
              aria-describedby="message-hint"
              className="field-input mt-1.5 text-sm"
              placeholder="Tell me about your project or role..."
            />
            <div id="message-error" className="field-error">
              Please enter a message with at least 10 characters.
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>

          <div aria-live="polite" className="min-h-5 text-xs">
            {status === "success" && (
              <p className="flex items-center gap-1.5 font-medium" style={{ color: "var(--accent-emerald)" }}>
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                {feedback}
              </p>
            )}
            {status === "error" && (
              <p className="font-medium text-red-500">{feedback}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
