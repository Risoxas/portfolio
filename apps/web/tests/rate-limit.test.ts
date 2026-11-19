import { describe, expect, it } from "vitest";
import { getClientIp, SlidingWindowRateLimiter } from "@/lib/rate-limit";

describe("SlidingWindowRateLimiter", () => {
  it("allows up to maxRequests and blocks subsequent requests until window expires", () => {
    const limiter = new SlidingWindowRateLimiter(3, 10_000);
    const t0 = 1_000_000;

    expect(limiter.check("1.2.3.4", t0).allowed).toBe(true);
    expect(limiter.check("1.2.3.4", t0 + 100).allowed).toBe(true);
    expect(limiter.check("1.2.3.4", t0 + 200).allowed).toBe(true);

    const blocked = limiter.check("1.2.3.4", t0 + 300);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterSeconds).toBeGreaterThanOrEqual(1);

    // Different IP is unaffected
    expect(limiter.check("5.6.7.8", t0 + 300).allowed).toBe(true);

    // After window expires, requests are allowed again
    expect(limiter.check("1.2.3.4", t0 + 10_500).allowed).toBe(true);
  });

  it("extracts client IP from x-forwarded-for or x-real-ip", () => {
    const h1 = new Headers({ "x-forwarded-for": "203.0.113.1, 10.0.0.1" });
    expect(getClientIp(h1)).toBe("203.0.113.1");

    const h2 = new Headers({ "x-real-ip": "198.51.100.2" });
    expect(getClientIp(h2)).toBe("198.51.100.2");

    expect(getClientIp(new Headers())).toBe("unknown");
  });
});
