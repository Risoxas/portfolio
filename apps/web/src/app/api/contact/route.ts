import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid name, email, and message (at least 10 characters)." },
      { status: 400 }
    );
  }

  const awsEndpoint = process.env.AWS_CONTACT_API_URL?.replace(/\/$/, "");
  if (awsEndpoint) {
    try {
      const upstream = await fetch(`${awsEndpoint}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
        signal: AbortSignal.timeout(5000),
      });

      if (upstream.ok) {
        return NextResponse.json({
          ok: true,
          mode: "aws-lambda",
          message: "Message routed through AWS API Gateway + Lambda.",
        });
      }
    } catch {
      // Fall through to graceful Vercel fallback
    }
  }

  return NextResponse.json({
    ok: true,
    mode: "vercel-fallback",
    message:
      "Message validated via Next.js Route Handler (AWS Lambda standby mode). You can also reach David directly at davidag93@gmail.com.",
  });
}
