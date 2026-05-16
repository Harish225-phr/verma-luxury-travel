# Complete Code Changes - Cloudflare to Netlify Migration

## Summary of Changes

This document contains all file-by-file changes made during the migration from Cloudflare Workers to Netlify Functions.

---

## 1. package.json

**What Changed**: Removed `@cloudflare/vite-plugin` dependency

### Removed from dependencies:
```json
"@cloudflare/vite-plugin": "^1.25.5",
```

### Result:
- 147 packages added (after removing Cloudflare plugin)
- 0 vulnerabilities found
- Node.js runtime fully compatible with Netlify

---

## 2. vite.config.ts

**What Changed**: Removed Cloudflare-specific plugin configuration

### Before:
```typescript
// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
```

### After:
```typescript
// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Configure for Netlify Functions SSR
// The TanStack Start build will output to dist/ with static assets in dist/client
// Netlify Functions will handle the SSR rendering via netlify/functions/ssr.ts
export default defineConfig();
```

**Explanation**: 
- Removed Cloudflare plugin reference from comments
- Removed `tanstackStart.server` config since Netlify uses its own handler
- Simplified to use default configuration

---

## 3. netlify.toml (NEW FILE)

**What This Does**: Tells Netlify how to build and deploy the application

```toml
# Netlify configuration for TanStack Start SSR
[build]
  # Build command
  command = "npm run build"
  # Directory to publish (static assets from TanStack Start build)
  publish = "dist/client"
  # Functions directory
  functions = "netlify/functions"

# Configure Node.js version
[env]
  NODE_VERSION = "18"

# Rewrite all requests to the SSR function
[[redirects]]
  from = "/*"
  to = "/.netlify/functions/ssr"
  status = 200
  force = true

# Exclude static asset paths from the SSR function
[[redirects]]
  from = "/assets/*"
  to = "/assets/:splat"
  status = 200

[[redirects]]
  from = "/favicon.ico"
  to = "/favicon.ico"
  status = 200

# Cache headers for different asset types
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

**Key Configuration Points**:
- `build.command`: Runs the Vite build process
- `build.publish`: Publishes built static assets (client bundle)
- `build.functions`: Points to Netlify Functions directory
- `[[redirects]]`: Routes all requests through SSR function with 200 status (silent rewrite)
- `[[headers]]`: Implements cache strategy for immutable vs. dynamic content

---

## 4. .netlifyignore (NEW FILE)

**What This Does**: Excludes unnecessary files from Netlify deployment

```
node_modules
.git
.github
dist
build
.env.local
.env.*.local
wrangler.jsonc
.wrangler
```

**Explanation**: Reduces deployment bundle size by excluding build artifacts and Cloudflare config

---

## 5. netlify/functions/ssr.ts (NEW FILE)

**What This Does**: Serverless function that handles SSR requests

```typescript
import { renderErrorPage } from "../../src/lib/error-page";

// Netlify Functions handler types
type NetlifyEvent = {
  httpMethod?: string;
  rawPath?: string;
  rawUrl?: string;
  headers: Record<string, string>;
  body?: string;
};

type NetlifyContext = {
  functionVersion?: string;
  invocationId?: string;
  clientContext?: unknown;
};

type NetlifyResponse = {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
  isBase64Encoded: boolean;
};

type ServerEntry = {
  fetch: (request: Request) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) =>
        ((m as { default?: ServerEntry }).default ??
          (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(
  body: string,
  responseStatus: number,
): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(
  response: Response,
): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(`SSR Error: ${body}`);
  return brandedErrorResponse();
}

const handler = async (
  event: NetlifyEvent,
  context: NetlifyContext,
): Promise<NetlifyResponse> => {
  try {
    // Convert Netlify event to a Web Request object
    const url =
      event.rawUrl ||
      `${event.headers.host || "localhost"}${event.rawPath || "/"}`;
    const request = new Request(url, {
      method: event.httpMethod || "GET",
      headers: event.headers as HeadersInit,
      body:
        event.httpMethod !== "GET" && event.httpMethod !== "HEAD"
          ? event.body
          : undefined,
    });

    // Get and execute the server entry
    const serverEntry = await getServerEntry();
    const response = await serverEntry.fetch(request);
    const normalizedResponse = await normalizeCatastrophicSsrResponse(response);

    // Convert Response to Netlify function response format
    const buffer = await normalizedResponse.arrayBuffer();
    return {
      statusCode: normalizedResponse.status,
      headers: Object.fromEntries(normalizedResponse.headers.entries()),
      body: Buffer.from(buffer).toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error("SSR Function Error:", error);
    const errorResponse = brandedErrorResponse();
    const buffer = await errorResponse.arrayBuffer();
    return {
      statusCode: 500,
      headers: Object.fromEntries(errorResponse.headers.entries()),
      body: Buffer.from(buffer).toString("base64"),
      isBase64Encoded: true,
    };
  }
};

export { handler };
```

**Key Points**:
- Defines custom TypeScript types for Netlify event/response format
- Converts Netlify event to Web Request API
- Lazy-loads TanStack Start server entry for optimal cold start
- Handles SSR error normalization (catches h3 framework errors)
- Returns response in Netlify Functions format (base64-encoded body)
- Includes comprehensive error handling with custom error page

---

## 6. Removed Files

### wrangler.jsonc ✅ DELETED

**Original Content**:
```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "tanstack-start-app",
  "compatibility_date": "2025-09-24",
  "compatibility_flags": ["nodejs_compat"],
  "main": "src/server.ts",
}
```

**Reason for Deletion**: Cloudflare-specific configuration no longer needed

---

## 7. Updated Dependencies Summary

### Removed:
- `@cloudflare/vite-plugin` v1.25.5

### Added:
- None (no new runtime dependencies)

### Unchanged:
- `@tanstack/react-start` - Still used for SSR
- All UI component libraries (Radix UI, etc.)
- All styling and utility packages

**Result**: 
- Reduced bundle size
- No new external dependencies
- Pure Node.js runtime compatibility

---

## Build Output Structure

### Before (Cloudflare):
```
dist/
├── _worker.js                 # Cloudflare Worker bundle
├── _assets/                   # Cloudflare Assets
└── ...
```

### After (Netlify):
```
dist/
├── client/                    # Static assets (deployed to CDN)
│   ├── assets/
│   │   ├── index-*.js
│   │   ├── styles-*.css
│   │   └── images
│   └── index.html
└── server/                    # Server bundle (not deployed, used for reference)
    ├── server.js
    └── assets/
```

---

## Commands Reference

### Development
```bash
npm run dev              # Start dev server with HMR
npm run build          # Production build
npm run build:dev      # Development build with source maps
npm run preview        # Preview production build locally
```

### Testing Locally with Netlify CLI
```bash
npm install -g netlify-cli
ntl dev                 # Simulates Netlify environment
```

### Deployment
```bash
# Connect repository to Netlify (via dashboard)
# Push to main/deploy branch
git push origin main

# OR deploy via CLI
ntl login
ntl deploy
```

---

## Network Request Flow

```
1. User visits https://verma-luxury-travel.netlify.app/services

2. Browser requests URL

3. Netlify CDN checks static assets
   - Does /services exist in dist/client/?
   - No, route to server function

4. netlify.toml redirect rule triggers
   - /* → /.netlify/functions/ssr (200 status)

5. netlify/functions/ssr.ts handler executes
   - Create Request object with URL, method, headers
   - Import @tanstack/react-start/server-entry
   - Call serverEntry.fetch(request)

6. TanStack Start SSR renders
   - Load router
   - Match /services route
   - Render React components to HTML string
   - Include hydration data

7. Response returned
   - HTML body (base64-encoded)
   - Content-Type: text/html
   - Status: 200

8. Browser receives HTML
   - Renders page immediately (no 404!)
   - Loads React bundle
   - Hydrates components
   - App becomes interactive

9. User navigates /packages
   - Client-side routing (no full page reload)
   - React Router handles navigation
```

---

## Comparison Table

| Aspect | Cloudflare Workers | Netlify Functions |
|--------|---|---|
| **Handler Format** | `fetch(request, env, ctx)` | Async function + event object |
| **Config File** | `wrangler.jsonc` | `netlify.toml` |
| **Build Plugin** | `@cloudflare/vite-plugin` | None (Netlify handles it) |
| **Server Entry** | `main: "src/server.ts"` | `netlify/functions/*.ts` |
| **Cold Start** | ~1ms | ~100-500ms |
| **Regions** | 250+ edge locations | 15+ regions |
| **Perfect For** | Ultra-low latency, APIs | Standard SSR, webhooks |

---

## Verification Checklist

- [x] Removed `wrangler.jsonc`
- [x] Removed `@cloudflare/vite-plugin` from package.json
- [x] Updated `vite.config.ts` - removed Cloudflare config
- [x] Created `netlify.toml` with correct build settings
- [x] Created `.netlifyignore` 
- [x] Created `netlify/functions/ssr.ts` handler
- [x] npm install completed successfully
- [x] npm run build completed successfully
- [x] Build output structure verified (dist/client + dist/server)
- [x] No build errors or warnings
- [x] TypeScript compilation successful

---

## Next Steps

1. **Push to Repository**
   ```bash
   git add .
   git commit -m "Migration: Cloudflare Workers → Netlify Functions"
   git push origin main
   ```

2. **Connect to Netlify**
   - Log in to netlify.com
   - Click "New site from Git"
   - Select your GitHub repository
   - Netlify auto-detects netlify.toml
   - Click Deploy

3. **Verify Deployment**
   - Check all routes work
   - Test page refresh (should work now!)
   - Verify hydration works correctly
   - Monitor Netlify dashboard for errors

4. **Monitor Performance**
   - Check Netlify Analytics
   - Monitor function execution times
   - Review error logs

---

**Migration Date**: May 16, 2026  
**Status**: ✅ Ready for Production
