/**
 * Fixed-window, in-memory rate limiter.
 *
 * Limitation: state is per server instance. On serverless platforms each
 * instance keeps its own counters, so this is a speed bump, not a guarantee.
 * Replace with a shared store (e.g. Upstash Redis / Vercel KV) before high
 * traffic. See docs/ARCHITECTURE.md → Lead capture.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 10_000;

export function rateLimit(key: string, limit: number, windowMs: number, now = Date.now()): { ok: boolean; retryAfterMs: number } {
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size >= MAX_KEYS) {
      for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
      if (buckets.size >= MAX_KEYS) buckets.clear();
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterMs: 0 };
  }
  if (bucket.count >= limit) return { ok: false, retryAfterMs: bucket.resetAt - now };
  bucket.count += 1;
  return { ok: true, retryAfterMs: 0 };
}

export function __resetRateLimits() {
  buckets.clear();
}
