export interface ApiGatewayEvent {
  requestContext?: {
    http?: {
      method?: string;
      path?: string;
    };
  };
  rawPath?: string;
  body?: string | null;
}

export interface ApiGatewayResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

const CORS_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN ?? "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function respond(statusCode: number, payload: unknown): ApiGatewayResponse {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(payload),
  };
}

export async function handler(event: ApiGatewayEvent): Promise<ApiGatewayResponse> {
  const method = (event.requestContext?.http?.method ?? "GET").toUpperCase();
  const path = event.rawPath ?? event.requestContext?.http?.path ?? "/";

  if (method === "OPTIONS") {
    return respond(204, {});
  }

  if (method === "GET" && path.endsWith("/health")) {
    return respond(200, {
      status: "ok",
      service: "aws-contact-lambda",
      cloud: "aws-lambda",
    });
  }

  if (method === "POST" && path.endsWith("/contact")) {
    let parsed: { name?: unknown; email?: unknown; message?: unknown };
    try {
      parsed = event.body ? (JSON.parse(event.body) as typeof parsed) : {};
    } catch {
      return respond(400, { ok: false, error: "Invalid JSON body." });
    }

    const name = typeof parsed.name === "string" ? parsed.name.trim() : "";
    const email = typeof parsed.email === "string" ? parsed.email.trim() : "";
    const message = typeof parsed.message === "string" ? parsed.message.trim() : "";

    if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
      return respond(400, {
        ok: false,
        error: "Name (>=2 chars), valid email, and message (>=10 chars) are required.",
      });
    }

    // Structured log for CloudWatch Logs (free tier: 5 GB ingestion/month)
    console.log(
      JSON.stringify({
        event: "portfolio_contact_received",
        name,
        email,
        messageLength: message.length,
        receivedAt: new Date().toISOString(),
      })
    );

    return respond(200, {
      ok: true,
      service: "aws-contact-lambda",
      message: "Contact payload accepted by AWS Lambda.",
    });
  }

  return respond(404, { ok: false, error: "Route not found." });
}
