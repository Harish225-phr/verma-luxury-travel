# Quick Deployment Guide

## Step-by-Step Deployment to Netlify

### Prerequisites
- GitHub repository with this code committed
- Netlify account (free at netlify.com)
- Node.js 18+ locally for testing

---

## Option 1: Deploy via GitHub (Recommended)

### Step 1: Prepare Local Changes
```bash
cd "d:\React Project\verma-luxury-travel"

# Verify everything builds correctly
npm run build

# Output should show:
# dist/client/      ← Static assets  
# dist/server/      ← Server bundle
```

### Step 2: Commit and Push
```bash
git add .
git commit -m "Migration: Cloudflare Workers → Netlify Functions"
git push origin main
```

### Step 3: Connect to Netlify
1. Go to https://app.netlify.com
2. Click **"New site from Git"**
3. Choose **"GitHub"**
4. Select your repository
5. Netlify auto-detects `netlify.toml`
6. Click **"Deploy site"**

That's it! Netlify will:
- Run `npm run build`
- Deploy `dist/client/` as static assets
- Deploy `netlify/functions/ssr.ts` as serverless function
- Apply all redirects from `netlify.toml`

---

## Option 2: Deploy via Netlify CLI

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Authenticate
```bash
netlify login
# Opens browser for GitHub authentication
```

### Step 3: Deploy
```bash
cd "d:\React Project\verma-luxury-travel"
netlify deploy --prod
```

Output:
```
Deploy path:        dist/client/
Functions path:     netlify/functions/
...
Website URL: https://your-site-name.netlify.app
```

---

## Option 3: Connect Existing Site

### If you already have a Netlify site:

```bash
# Link to existing site
netlify link

# Then deploy
netlify deploy --prod
```

---

## Local Testing (Simulates Netlify Environment)

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Run Development Simulation
```bash
cd "d:\React Project\verma-luxury-travel"
ntl dev
```

Opens: `http://localhost:8888`

Features:
- ✅ Static assets served
- ✅ Netlify Functions work
- ✅ Redirects applied
- ✅ SSR rendering works
- ✅ Cache headers respected

### Step 3: Test Routes
```
http://localhost:8888/              → Home (SSR)
http://localhost:8888/services      → Services (SSR)  
http://localhost:8888/packages      → Packages (SSR)
http://localhost:8888/fleet         → Fleet (SSR)
http://localhost:8888/gallery       → Gallery (SSR)
http://localhost:8888/contact       → Contact (SSR)
http://localhost:8888/about         → About (SSR)

Page Refresh: ✅ Should work (was 404 on Cloudflare)
Direct Navigation: ✅ Should work
Hydration: ✅ React should load and become interactive
```

---

## Verify Deployment

### After Deployment

1. **Check Site URL**
   ```
   https://your-site-name.netlify.app
   ```

2. **Test Routes**
   - [ ] Home page loads
   - [ ] Click navigation (client-side routing)
   - [ ] Refresh page (SSR should render)
   - [ ] Direct URL navigation works
   - [ ] Images load correctly
   - [ ] Styles are applied

3. **Check Netlify Dashboard**
   - Site settings → Build & deploy
   - Verify:
     - Build command: `npm run build`
     - Publish directory: `dist/client`
     - Functions directory: `netlify/functions`

4. **Monitor Functions**
   - Netlify dashboard → Functions
   - Check `ssr` function logs
   - Should see requests being processed

5. **Performance Check**
   - Open DevTools → Network
   - Should see:
     - HTML (via SSR function) - ~200-500ms
     - JS bundles (from CDN) - fast
     - Images (from CDN) - fast
   - No 404s on page refresh

---

## Troubleshooting

### Issue: 404 on Page Refresh
**Expected**: ✅ This is now fixed! The 404 was from Cloudflare. Netlify's redirects handle this.

**If still occurring**:
- [ ] Check netlify.toml exists
- [ ] Verify redirects are correct
- [ ] Redeploy: `netlify deploy --prod`

### Issue: Assets Not Loading
**Check**:
1. `dist/client/assets/` exists after build
2. Asset paths in HTML are correct
3. Browser DevTools shows URLs like `/assets/index-*.js`
4. No 404s in Network tab

**Fix**:
```bash
npm run build
netlify deploy --prod
```

### Issue: SSR Function Errors
**Check Logs**:
1. Netlify dashboard → Functions → ssr
2. Look for error stack traces
3. Check Node.js compatibility

**Debug**:
```bash
# Test locally first
ntl dev

# Check function output in terminal
```

### Issue: Build Fails on Netlify
**Check Build Logs**:
1. Netlify dashboard → Deploys → [your deploy] → Deploy log
2. Look for error messages
3. Usually missing dependency or TypeScript error

**Fix**:
```bash
# Test build locally
npm run build

# If it works locally but not on Netlify, check:
# - Node version in netlify.toml
# - Environment variables set in Netlify
# - .gitignore not excluding needed files
```

---

## Environment Variables

### For Netlify Deployment

1. Go to Netlify dashboard
2. Site settings → Build & deploy → Environment
3. Add variables:

**Example**:
```
VITE_API_URL = https://api.vermaluxurytravel.com
SECRET_ADMIN_KEY = your-secret-key
```

**Usage in Code**:
```typescript
// Client-side (exposed)
const apiUrl = import.meta.env.VITE_API_URL;

// Server-side (secret)
const adminKey = process.env.SECRET_ADMIN_KEY;
```

---

## Custom Domain

1. Netlify dashboard → Domain settings
2. **Option A**: Use Netlify domain
   - Site URL: `your-site-name.netlify.app`

3. **Option B**: Connect custom domain
   - Add DNS records pointing to Netlify
   - Enable SSL/TLS (automatic)

---

## Performance Optimization

### Caching Strategy (Already Configured)

```toml
# Immutable assets (cached forever)
/assets/*.js       → Cache-Control: max-age=31536000, immutable
/assets/*.css      → Cache-Control: max-age=31536000, immutable
/assets/*.png/jpg  → Cache-Control: max-age=31536000, immutable

# HTML (always revalidate)
/                  → Cache-Control: max-age=0, must-revalidate
```

### Monitor Performance
- Netlify Analytics → Site settings → Analytics
- Check:
  - Page load times
  - Bandwidth usage
  - Function execution times
  - Error rates

---

## Rollback (If Issues)

### If deployment causes problems:

1. **Quick rollback** (via Netlify dashboard):
   - Netlify dashboard → Deploys
   - Find previous good deploy
   - Click "Restore this deploy"

2. **Rollback via Git**:
   ```bash
   git revert HEAD
   git push origin main
   # Netlify auto-redeploys
   ```

---

## Useful Commands

```bash
# Local development
npm run dev              # Start dev server

# Building
npm run build            # Production build
npm run build:dev        # Dev build with source maps

# Testing
ntl dev                  # Test in Netlify environment locally

# Deployment
ntl login                # Authenticate with Netlify
ntl deploy --prod        # Deploy to production
ntl open                 # Open site in browser
ntl status               # Check deployment status
ntl logs                 # View function logs
```

---

## Success Criteria ✅

After deployment, verify:

- [x] Site loads without 404 on Cloudflare Workers URL redirect
- [x] Page refresh works on all routes
- [x] Direct URL navigation works
- [x] Client-side routing (React Router) works
- [x] Hydration completes (app becomes interactive)
- [x] Assets load correctly
- [x] Images display properly
- [x] No errors in browser console
- [x] No errors in Netlify Function logs
- [x] Performance is acceptable

---

## Support Resources

- **TanStack Start**: https://tanstack.com/start/latest
- **Netlify Docs**: https://docs.netlify.com
- **Netlify Functions**: https://docs.netlify.com/functions/overview
- **Netlify CLI**: https://cli.netlify.com
- **Common Issues**: https://docs.netlify.com/support/troubleshooting-tips

---

## Still Having Issues?

1. **Check Netlify Dashboard Logs**
   - Go to your site
   - Deploys tab → See deploy history
   - Click failing deploy → "Deploy log"

2. **Check Function Logs**
   - Functions tab → "ssr" function
   - View real-time logs

3. **Test Locally**
   ```bash
   npm run build
   ntl dev
   ```
   - Should work locally? Then it's a Netlify config issue
   - Doesn't work locally? Then it's a code issue

4. **Verify Build Output**
   ```bash
   npm run build
   ls dist/client/      # Should have assets
   ls dist/server/      # Should have server code
   ```

---

**Happy Deploying! 🚀**

Your Verma Luxury Travel site is now on Netlify with full SSR support!
