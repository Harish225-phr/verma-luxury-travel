# Developer Guide - Verma Luxury Travel on Netlify

## For Developers Maintaining This Project

This guide covers the technical architecture and operational procedures for the Verma Luxury Travel website now running on Netlify Functions.

---

## Architecture Overview

### Technology Stack

```
Frontend:
  - React 19.2.0
  - TanStack Router 1.168.25
  - TanStack React Start 1.167.50
  - TailwindCSS 4.2.1
  - TypeScript 5.8.3
  - Radix UI Components

Backend/Runtime:
  - Netlify Functions (Node.js 18)
  - SSR via TanStack Start server-entry
  - No database (API-driven)

Build Tools:
  - Vite 7.3.1
  - Lovable Vite Config

Deployment:
  - Netlify Functions (SSR handler)
  - Netlify CDN (static assets)
```

### Request Architecture

```
┌─ Static Assets (Cached)
│  ├─ /assets/index-*.js (versioned, 1 year cache)
│  ├─ /assets/styles-*.css (versioned, 1 year cache)
│  └─ /assets/images/* (versioned, 1 year cache)
│
└─ Dynamic Requests (SSR)
   ├─ Request comes in
   ├─ netlify.toml redirects to /.netlify/functions/ssr
   ├─ netlify/functions/ssr.ts runs
   ├─ Converts Netlify Event → Web Request
   ├─ Calls TanStack Start server-entry handler
   ├─ Returns HTML with hydration data
   └─ Browser hydrates React components
```

---

## File Organization

### Core Application Structure

```
src/
├── routes/              # TanStack Router route definitions
│   ├── __root.tsx      # Root layout (Navbar, Footer)
│   ├── index.tsx       # Home page
│   ├── about.tsx       # About page
│   ├── services.tsx    # Services page
│   ├── packages.tsx    # Packages page
│   ├── fleet.tsx       # Fleet page
│   ├── gallery.tsx     # Gallery page
│   └── contact.tsx     # Contact page
│
├── components/
│   ├── site/           # Page-level components
│   │   ├── Layout.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Facilities.tsx
│   │   └── ...
│   └── ui/             # Radix UI components (pre-built)
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       └── ...
│
├── hooks/
│   └── use-mobile.tsx  # Responsive design hook
│
├── lib/
│   ├── error-capture.ts      # Browser error capture
│   ├── error-page.ts         # Error page HTML template
│   └── utils.ts              # Utility functions
│
├── router.tsx          # Router configuration
├── server.ts           # Server entry (kept for reference)
└── styles.css          # Global styles
```

### Netlify Configuration

```
netlify/
├── functions/
│   └── ssr.ts          # Main SSR handler function
│       ├─ Receives Netlify event
│       ├─ Converts to Web Request
│       ├─ Calls TanStack Start SSR
│       └─ Returns HTML response
│
netlify.toml            # Netlify build & deploy config
.netlifyignore          # Files to exclude from deployment
```

---

## Development Workflow

### Local Development

```bash
# Start dev server
npm run dev
# Opens http://localhost:5173
# Features:
#   - Hot reload on file changes
#   - Vite dev server
#   - TanStack Start SSR during dev
#   - No need for Netlify locally
```

### Building for Production

```bash
# Build static + server artifacts
npm run build

# Output structure:
# dist/
#   ├─ client/        ← Deployed to Netlify CDN
#   │  └─ assets/     ← Hashed/versioned files
#   └─ server/        ← Reference only
#      └─ server.js   ← Server bundle (not used)
```

### Testing in Netlify Environment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run dev server that simulates Netlify
ntl dev
# Opens http://localhost:8888
# Simulates:
#   - Static asset serving
#   - Netlify Functions execution
#   - Redirects from netlify.toml
#   - Environment variables
```

---

## SSR Handler Details

### File: `netlify/functions/ssr.ts`

#### Responsibility
Handles all server-side rendering requests for non-static routes.

#### Workflow

```typescript
1. Handler receives Netlify event
   {
     httpMethod: "GET",
     rawPath: "/services",
     rawUrl: "http://localhost:8888/services",
     headers: { "accept": "text/html", ... },
     body: null
   }

2. Convert to Web Request API
   const request = new Request(url, {
     method: httpMethod,
     headers: headers,
     body: body
   })

3. Get server entry (lazy-loaded)
   const serverEntry = await import("@tanstack/react-start/server-entry")

4. Call fetch handler (TanStack SSR)
   const response = await serverEntry.fetch(request)
   Returns: Response object with rendered HTML + hydration data

5. Error handling
   - Catch h3 framework errors ({"unhandled": true, ...})
   - Return custom error page if SSR fails
   - Log errors to Netlify Functions logs

6. Convert Response to Netlify format
   {
     statusCode: 200,
     headers: { "content-type": "text/html", ... },
     body: "PGRvYyBodG1sPi4uLg==", // base64
     isBase64Encoded: true
   }

7. Return to Netlify
   Browser receives HTML, renders, hydrates React
```

#### Key Types

```typescript
// Netlify event format
type NetlifyEvent = {
  httpMethod?: string;      // GET, POST, etc.
  rawPath?: string;         // /services
  rawUrl?: string;          // Full URL with host
  headers: Record<string, string>;
  body?: string;            // Request body (null for GET)
};

// Netlify response format
type NetlifyResponse = {
  statusCode: number;       // 200, 404, 500, etc.
  headers: Record<string, string>;
  body: string;             // Base64 encoded
  isBase64Encoded: boolean; // true for binary
};

// TanStack server entry
type ServerEntry = {
  fetch: (request: Request) => Promise<Response> | Response;
};
```

#### Error Handling

```typescript
// 1. Catastrophic SSR errors (h3 framework)
// h3 returns: {"unhandled": true, "message": "HTTPError"}
// Detection: Check for these fields in 5xx JSON responses
// Response: Return custom error page with proper styling

// 2. Catch-all errors
// Any thrown error during SSR processing
// Response: Return 500 error page, log to console

// 3. Custom error page
// Uses src/lib/error-page.ts
// Beautiful HTML error page with styling
// Shown to users on SSR failures
```

---

## Routing Architecture

### TanStack Router Setup

File: `src/router.tsx`

```typescript
// Router is file-based (in src/routes/)
// Routes:
// /                (index.tsx)
// /about           (about.tsx)
// /services        (services.tsx)
// /packages        (packages.tsx)
// /fleet           (fleet.tsx)
// /gallery         (gallery.tsx)
// /contact         (contact.tsx)

// Root layout (__root.tsx) wraps all routes with:
// - Navbar (site/Navbar.tsx)
// - Footer (site/Footer.tsx)
// - Layout container (site/Layout.tsx)
```

### Route Rendering

```
Request for /services
    ↓
netlify/functions/ssr.ts
    ↓
TanStack Start SSR
    ↓
Router matches /services route
    ↓
Load services.tsx component
    ↓
Render root layout (__root.tsx)
    + Navbar
    + Services component
    + Footer
    ↓
Render to HTML string with hydration markers
    ↓
Send to browser
    ↓
Browser renders HTML immediately
    ↓
React hydrates components
    ↓
App becomes interactive (client-side routing works)
```

---

## Build Process

### Development Build (`npm run dev`)

```
Source Code
    ↓
Vite Dev Server
    ├─ JSX → JavaScript (via @vitejs/plugin-react)
    ├─ Tailwind styles
    ├─ Asset imports
    └─ Hot Module Replacement (HMR)
    ↓
Browser at http://localhost:5173
```

### Production Build (`npm run build`)

```
Source Code
    ↓
Vite Build
    ├─ Client build
    │  ├─ React components
    │  ├─ CSS (Tailwind)
    │  ├─ Assets (images)
    │  ├─ Code splitting
    │  ├─ Minification
    │  └─ Hashing (for caching)
    │  ↓
    │  dist/client/
    │  ├─ index.html (SSR-generated, not static)
    │  └─ assets/
    │     ├─ index-abc123.js
    │     ├─ styles-def456.css
    │     └─ [images, fonts]
    │
    └─ Server build
       ├─ Router
       ├─ Components (for SSR)
       ├─ Server-only code
       └─ Hydration manifest
       ↓
       dist/server/
       ├─ server.js (reference only)
       └─ assets/
```

### Deployment to Netlify

```
Build Artifacts
    ↓
dist/client/ → Netlify CDN
    ├─ Cached globally
    ├─ 1-year cache for /assets/*
    ├─ Cache-busting for /
    └─ Served on each request
    
netlify/functions/ssr.ts → Serverless Function
    ├─ Deployed to Netlify
    ├─ Executes on each request
    ├─ Renders HTML server-side
    └─ Returns SSR-rendered page
    
netlify.toml → Build Configuration
    ├─ Build command: npm run build
    ├─ Functions directory: netlify/functions
    ├─ Publish directory: dist/client
    └─ Redirects all requests to SSR function
```

---

## Performance Optimization

### Code Splitting

TanStack Start automatically code-splits by route:

```
Route-based bundles:
├─ index.js         (home page + shared code)
├─ about.js         (about page)
├─ services.js      (services page)
├─ packages.js      (packages page)
└─ ... etc

Shared bundle:
├─ vendor.js        (React, router, etc.)
└─ index.js         (shared utilities)

Benefits:
- Users only download needed code per route
- Faster initial page load
- Faster subsequent navigation
```

### Asset Optimization

```
Cache Strategy:
├─ /assets/*                    (versioned filenames)
│  ├─ Cache-Control: max-age=31536000 (1 year)
│  └─ Reason: Filename includes hash, changes when content changes
│
└─ / (HTML)                     
   ├─ Cache-Control: max-age=0, must-revalidate
   └─ Reason: Always revalidate for fresh SSR content
```

### Bundle Analysis

```bash
# Check bundle size
npm run build
# Output includes bundle sizes:
# ✓ built in 18.50s

# dist/client/assets/index-DQkmmT-M.js    16.46 kB │ gzip:   4.67 kB
# dist/client/assets/proxy-AC7XO-eO.js   132.89 kB │ gzip:  43.53 kB
```

---

## Testing & Debugging

### Local Testing Checklist

```bash
# 1. Development
npm run dev
# - Visit http://localhost:5173
# - Test each route
# - Check DevTools console (no errors)

# 2. Production build
npm run build
# - Check build output
# - Verify dist/client/ has assets
# - Verify dist/server/ has server.js

# 3. Netlify simulation
npm install -g netlify-cli
ntl dev
# - Visit http://localhost:8888
# - Test each route
# - Test page refresh (should NOT 404)
# - Check console for errors

# 4. Page performance
# - Open DevTools Network tab
# - Load page
# - Check timings:
#   - HTML: 200-500ms (SSR render)
#   - JS bundles: 50-200ms (CDN cached)
#   - Images: varies (depends on size)
```

### Debugging SSR Issues

```bash
# 1. Check Netlify Functions logs
ntl dev
# Look for error messages in terminal

# 2. Check browser console
# Open DevTools → Console
# Look for hydration mismatches or errors

# 3. Check Netlify dashboard
# https://app.netlify.com → Your site → Functions
# Look for ssr function errors

# 4. Test locally first
npm run build
ntl dev
# If it works locally, issue is with Netlify config
# If it fails locally, issue is with code
```

### Common SSR Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Hydration mismatch | Component renders different on client/server | Use `useEffect` for client-only code |
| 404 on refresh | Missing SSR handler | Verify netlify.toml redirects configured |
| Styles missing on refresh | CSS not included in SSR | Check Tailwind bundling |
| Images broken | Wrong asset paths | Verify `/assets/` paths are correct |
| Function timeout | SSR takes too long | Check for infinite loops, optimize queries |

---

## Environment Variables

### Configuration

```bash
# Local development (.env file)
VITE_API_URL=http://localhost:3000
VITE_PUBLIC_VAR=exposed-to-client

# Netlify deployment
# Set in Netlify dashboard:
# Site settings → Build & deploy → Environment
VITE_API_URL=https://api.vermaluxurytravel.com
SECRET_API_KEY=xxx (server-side only)
```

### Variable Naming

```
VITE_*          # Exposed to client code (bundled)
SECRET_*        # Server-side only (Netlify Functions)
Other           # Server-side only
```

### Usage

```typescript
// Client-side (available everywhere)
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl); // exposed to client

// Server-side (only in netlify/functions/ssr.ts)
const secretKey = process.env.SECRET_API_KEY;
// NOT available in browser
```

---

## Monitoring & Logging

### Netlify Dashboard

Navigate to: https://app.netlify.com → Your site

#### Deploys Tab
- View deployment history
- Check build logs
- Rollback to previous versions

#### Functions Tab
- Monitor ssr function
- View real-time logs
- Check error rates
- Monitor execution times

#### Analytics Tab (Premium)
- Page load performance
- Core Web Vitals
- Error tracking
- Traffic analytics

### Logging in Code

```typescript
// netlify/functions/ssr.ts

// Log successful requests
console.log(`SSR rendered: ${request.url}`);

// Log errors
console.error("SSR Error:", error);

// Accessible in Netlify dashboard Functions logs
```

---

## Deployment Process

### Normal Deployment (via Git)

```bash
# 1. Commit changes
git add .
git commit -m "Feature: Add new section"

# 2. Push to main
git push origin main

# 3. Netlify auto-deploys
# - Receives webhook from GitHub
# - Runs: npm run build
# - Deploys: dist/client/ + netlify/functions/
# - Site goes live

# 4. Monitor in dashboard
# Site → Deploys → Check deploy progress
```

### Rollback (If Issues)

```bash
# Via Netlify dashboard:
# 1. Deploys tab
# 2. Find good previous deploy
# 3. Click "Restore this deploy"

# Via Git:
git revert HEAD~1
git push origin main
# Netlify redeploys with reverted code
```

---

## Adding New Features

### Adding a New Page

1. **Create route file**
   ```bash
   # File: src/routes/new-page.tsx
   export default function NewPage() {
     return <h1>New Page</h1>;
   }
   ```

2. **Update router**
   - TanStack Start auto-discovers routes from src/routes/
   - No manual router registration needed

3. **Add navigation link**
   ```typescript
   // src/components/site/Navbar.tsx
   <Link to="/new-page">New Page</Link>
   ```

4. **Test locally**
   ```bash
   npm run dev
   # Visit http://localhost:5173/new-page
   ```

5. **Deploy**
   ```bash
   git push origin main
   ```

### Adding a New Component

1. **Create component file**
   ```bash
   # File: src/components/site/NewComponent.tsx
   export default function NewComponent() {
     return <div>Component</div>;
   }
   ```

2. **Import and use**
   ```typescript
   import NewComponent from "@/components/site/NewComponent";
   
   export default function SomePage() {
     return <NewComponent />;
   }
   ```

3. **Test with hot reload**
   ```bash
   npm run dev
   ```

### Adding Environment Variables

1. **Add to .env for local development**
   ```
   VITE_NEW_VAR=value
   ```

2. **Add to Netlify dashboard**
   - Site settings → Build & deploy → Environment
   - Add new variable

3. **Use in code**
   ```typescript
   const value = import.meta.env.VITE_NEW_VAR;
   ```

---

## Best Practices

### Performance
- ✅ Use code splitting (automatic)
- ✅ Lazy load heavy components
- ✅ Optimize images (use WebP)
- ✅ Monitor bundle size growth
- ✅ Cache aggressively (static assets)

### Developer Experience
- ✅ Use TypeScript for type safety
- ✅ Keep components small and focused
- ✅ Use meaningful variable/function names
- ✅ Document complex logic
- ✅ Test locally before deploying

### Error Handling
- ✅ Catch errors in SSR handler
- ✅ Show user-friendly error pages
- ✅ Log errors to console for debugging
- ✅ Monitor errors in Netlify dashboard
- ✅ Set up alerts for high error rates

### Security
- ✅ Never expose secrets in client code
- ✅ Use environment variables for sensitive data
- ✅ Validate input on server
- ✅ Keep dependencies updated
- ✅ Use HTTPS everywhere

---

## Troubleshooting Guide

### Build Fails

**Check**:
1. `npm run build` works locally?
2. All dependencies installed?
3. TypeScript errors?

**Fix**:
```bash
npm install
npm run build
# Fix errors shown
git push origin main
```

### Deployment Fails

**Check**:
1. Netlify build logs
2. Node version compatibility
3. Environment variables set?

**View logs**:
https://app.netlify.com → Deploys → Failed deploy → Deploy log

### SSR Errors

**Check**:
1. `ntl dev` works locally?
2. Netlify Functions logs
3. Component compatibility?

**Debug**:
```bash
ntl dev
# Terminal shows ssr function logs
# Check for errors
```

### 404 Errors

**For static assets**:
- Check `/assets/` paths
- Verify files in dist/client/assets/
- Check browser Network tab

**For routes**:
- Should NOT happen (all routes → SSR)
- If happening: Check netlify.toml redirects

---

## Resources & References

### Official Docs
- [TanStack Start Docs](https://tanstack.com/start/latest)
- [Netlify Docs](https://docs.netlify.com)
- [Netlify Functions](https://docs.netlify.com/functions/overview)
- [Vite Docs](https://vitejs.dev)
- [React Docs](https://react.dev)

### Useful Tools
- [Netlify CLI](https://cli.netlify.com)
- [Lighthouse (Performance)](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals (Performance)](https://web.dev/vitals)

### Team Communication
- Create issues for bugs/features
- Document decisions in commit messages
- Use PR descriptions for context

---

## Maintenance Schedule

### Daily
- Monitor Netlify dashboard for errors
- Check analytics for unusual patterns

### Weekly
- Review build times
- Check error logs
- Update dependencies if needed

### Monthly
- Full performance audit
- Review bundle size trends
- Update security patches

### Quarterly
- Major version updates
- Dependency audit
- Architecture review

---

**Keep the web fast, keep the code clean, and keep the users happy!**
