import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Every page is prerendered at build time, so the cache is served read-only from
 * Workers static assets: no R2/KV resources to provision. Content updates ship by
 * redeploying. Switch to the R2 cache if on-demand revalidation is ever needed.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
