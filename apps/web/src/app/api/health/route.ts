import { NextResponse } from "next/server";

export interface ServiceProbe {
  id: "vercel" | "gcp" | "aws";
  status: "live" | "fallback";
  latencyMs: number;
  detail: string;
}

async function probeUrl(url: string, timeoutMs = 2500): Promise<{ ok: boolean; latencyMs: number }> {
  const start = performance.now();
  try {
    const res = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(timeoutMs),
      cache: "no-store",
    });
    return {
      ok: res.ok,
      latencyMs: Math.round(performance.now() - start),
    };
  } catch {
    return {
      ok: false,
      latencyMs: Math.round(performance.now() - start),
    };
  }
}

export async function GET() {
  const gcpBase = process.env.GCP_API_URL?.replace(/\/$/, "");
  const awsBase = process.env.AWS_CONTACT_API_URL?.replace(/\/$/, "");

  const [gcpProbe, awsProbe] = await Promise.all([
    gcpBase ? probeUrl(`${gcpBase}/health`) : Promise.resolve(null),
    awsBase ? probeUrl(`${awsBase}/health`) : Promise.resolve(null),
  ]);

  const services: ServiceProbe[] = [
    {
      id: "vercel",
      status: "live",
      latencyMs: 1,
      detail: "Next.js 15 App Router & Edge CDN active (Hobby Free Tier)",
    },
    gcpProbe?.ok
      ? {
          id: "gcp",
          status: "live",
          latencyMs: gcpProbe.latencyMs,
          detail: "GCP Cloud Run FastAPI microservice responded 200 OK",
        }
      : {
          id: "gcp",
          status: "fallback",
          latencyMs: gcpProbe?.latencyMs ?? 0,
          detail: gcpBase
            ? "GCP Cloud Run endpoint unreachable — serving Vercel fallback"
            : "GCP_API_URL not set — serving Vercel fallback (ready for Cloud Run)",
        },
    awsProbe?.ok
      ? {
          id: "aws",
          status: "live",
          latencyMs: awsProbe.latencyMs,
          detail: "AWS Lambda + HTTP API Gateway responded 200 OK",
        }
      : {
          id: "aws",
          status: "fallback",
          latencyMs: awsProbe?.latencyMs ?? 0,
          detail: awsBase
            ? "AWS API Gateway endpoint unreachable — serving Vercel fallback"
            : "AWS_CONTACT_API_URL not set — serving Vercel fallback (ready for Lambda)",
        },
  ];

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    monthlyCostUsd: 0,
    services,
  });
}
