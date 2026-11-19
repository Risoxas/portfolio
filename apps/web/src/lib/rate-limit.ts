export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

interface BucketEntry {
  timestamps: number[];
}

export class SlidingWindowRateLimiter {
  private readonly store = new Map<string, BucketEntry>();

  constructor(
    private readonly maxRequests: number,
    private readonly windowMs: number
  ) {}

  check(key: string, now = Date.now()): RateLimitResult {
    const cutoff = now - this.windowMs;
    const existing = this.store.get(key);
    const active = existing ? existing.timestamps.filter((t) => t > cutoff) : [];

    if (active.length >= this.maxRequests) {
      const oldest = active[0];
      const retryAfterSeconds = Math.max(1, Math.ceil((oldest + this.windowMs - now) / 1000));
      this.store.set(key, { timestamps: active });
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds,
      };
    }

    active.push(now);
    this.store.set(key, { timestamps: active });

    // Prevent unbounded memory growth across warm serverless invocations
    if (this.store.size > 1000) {
      for (const [k, entry] of this.store.entries()) {
        if (entry.timestamps.every((t) => t <= cutoff)) {
          this.store.delete(k);
        }
      }
    }

    return {
      allowed: true,
      remaining: Math.max(0, this.maxRequests - active.length),
      retryAfterSeconds: 0,
    };
  }
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}
