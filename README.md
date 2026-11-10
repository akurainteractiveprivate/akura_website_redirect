# Akura Interactive — Permanent Domain Migration Service (HTTP 301 / 308)

This repository is designed specifically to host on your **legacy domain** (e.g. `akurainteractive.vercel.app` or any old domain) to execute a **Google-compliant Permanent Site Move** to the new primary domain:

> **New Primary Address**: `https://akurainteractive.dpdns.org`

---

## 🎯 How Google PageRank & Search Ranking Transfer Works

According to [Google Search Central Guidelines on Site Moves](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes):
1. **HTTP 301 / 308 Permanent Redirects**: The primary signal Googlebot uses to forward indexing signals, incoming backlinks, and PageRank equity to the new address.
2. **Path & Query Preservation**: A visitor or crawler hitting `/games/flaprush3d?ref=google` on the old domain is redirected precisely to `https://akurainteractive.dpdns.org/games/flaprush3d?ref=google`.
3. **Canonical Link Header**: Each HTTP response injects `Link: <destination>; rel="canonical"`.
4. **Crawlable `robots.txt`**: Google requires the old domain's `robots.txt` to **allow** crawling (`Allow: /`) so Googlebot can read the HTTP 301 status. Blocking bots in `robots.txt` stops ranking migration!
5. **Fallback HTML & JavaScript**: For legacy clients, scrapers, or browser tabs that render HTML before redirecting, a `<meta http-equiv="refresh">` tag and instant JavaScript `window.location.replace()` ensure zero stranded users.

---

## 🏗️ 5-Layer Defense-in-Depth Architecture

| Layer | File | Mechanism | Description |
|---|---|---|---|
| **1. Edge CDN** | `vercel.json` | Vercel Edge 301 | Sub-10ms permanent redirect at Vercel edge POPs worldwide before invoking serverless compute. |
| **2. Edge Fallback** | `public/_redirects` | Cloudflare / Netlify | Compatible with Cloudflare Pages and Netlify edge redirect rules. |
| **3. Next.js Config** | `next.config.ts` | HTTP 308 Table | Built-in Next.js permanent routing rule with `Link: rel="canonical"` headers. |
| **4. Edge Middleware** | `src/middleware.ts` | HTTP 301 Handler | Intercepts requests, formats destination preserving paths & queries, and injects SEO headers. |
| **5. Rendered Fallback** | `src/components/RedirectView.tsx` | Meta Refresh + JS | Instant visual countdown, Schema.org `WebSite` relocation signal, and `<meta http-equiv="refresh">`. |

---

## 🚀 How to Deploy on Vercel

1. In Vercel, link your old domain (e.g., `akurainteractive.vercel.app` or legacy custom domain) to this project (`akura_redirect`).
2. Set Environment Variable (Optional, defaults to `https://akurainteractive.dpdns.org`):
   ```env
   TARGET_DOMAIN=https://akurainteractive.dpdns.org
   ```
3. Deploy! Vercel will immediately begin serving permanent 301 redirects to your new domain.

---

## 🔍 Google Search Console "Change of Address" Tool

After deploying this redirect:
1. Open **Google Search Console** for your **old domain property**.
2. Go to **Settings** → **Change of address**.
3. Enter your new domain: `https://akurainteractive.dpdns.org`.
4. Google will verify the 301 redirect and accelerate index transfer.
