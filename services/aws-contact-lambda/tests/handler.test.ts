import { describe, expect, it } from "vitest";
import { handler } from "../src/handler";

describe("aws-contact-lambda handler", () => {
  it("returns 200 on GET /health", async () => {
    const res = await handler({
      requestContext: { http: { method: "GET", path: "/health" } },
      rawPath: "/health",
    });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.status).toBe("ok");
    expect(body.cloud).toBe("aws-lambda");
  });

  it("rejects invalid contact payloads with 400", async () => {
    const res = await handler({
      requestContext: { http: { method: "POST", path: "/contact" } },
      rawPath: "/contact",
      body: JSON.stringify({ name: "A", email: "bad", message: "short" }),
    });
    expect(res.statusCode).toBe(400);
  });

  it("accepts valid contact payloads with 200", async () => {
    const res = await handler({
      requestContext: { http: { method: "POST", path: "/contact" } },
      rawPath: "/contact",
      body: JSON.stringify({
        name: "Recruiter",
        email: "recruiter@example.com",
        message: "We would love to discuss a Senior Full-Stack role.",
      }),
    });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.ok).toBe(true);
  });
});
