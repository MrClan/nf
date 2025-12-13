nhrc 

AnyDesk:
1593119921 / nhrc@1234


hosting a server bound to all ip addresses:
python3 -m http.server 5000


http://110.44.118.219:5000/


docker run -d \
  --name nhrc_cms \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres

docker exec -it nhrc_cms psql -U postgres


I'm starting on a new web application project to be built with NextJs, StrapiJs, Postgres - everything neatly dockerized.

Project Description:
This project is for a national health research institute, where the backend(CMS) users will be medically proficient but technically not so much. We need to make CMS/content editing as obvious as we possibly can. 

The main requirements for this project are: 
1. multi-language
2. fully 100% responsive UI
3. fully accessible following standard w3c guidelines so that it is accessible for all people, and on all devices.
4. Easy intuitive CMS structure.
5. CMS Content types are News, Gallery, Members, 
4. 3 versions of each UIs - 
	1. Minimal Version - targeted for extremely older browsers IE4, OperaMini, etc - where the look and feel is reasonably trimmed down to keep main content accessible.
	2. The modern version - for all other compatible devices - which follows modern trends.
	3. AMP compatible version of all screens
5. 

This project is for a national health research institute, where the backend(CMS) users will be medically proficient but technically not so much. We need to make CMS/content editing as obvious as we possibly can. 


____________________________________

Below is a **clean, complete, professional summary** of your entire system design, requirements, intentions, and goals — written so a developer using **Cursor**, GitHub, or any modern IDE can onboard immediately and start building from scratch with full context.

---

# **Project Summary: Ultra-Fast Multi-Language Static Website with Strapi + 11ty + AMP + CDN Deployment**

## **1. Core Intent & Vision**

You want to build a **high-performance, extremely lightweight, security-focused website** that delivers:

* **0 JavaScript on the client**
* **Ultra-fast static HTML pages**
* **Full multi-language support**
* **AMP versions of all pages for instant loading**
* **SEO-optimized pages (OpenGraph, JSON-LD, canonical links)**
* **A secure, internal-only CMS (Strapi v5)**
* **A fully static frontend deployed atomically to a CDN (Cloudflare Pages or Netlify)**

Your goals prioritize:

* **Speed**
* **Simplicity**
* **Security**
* **Reliability**
* **SEO ranking**

You want a system where backend failures **never break the frontend**, since the CDN always serves the last build.

---

## **2. System Architecture Overview**

You want a **three-part architecture**:

### **(A) Internal Server / Backend Layer**

* Runs **Strapi v5** (headless CMS)
* Not publicly exposed; only accessible to trusted internal network or VPN
* Stores multilingual content: blogs, news, homepage sections, sliders, documents, etc.

### **(B) Build Layer (Node.js Script + 11ty SSG)**

* A Node.js container on the same internal server
* Triggered by **Strapi Webhooks** whenever content is added or updated
* Responsibilities:

  1. Fetch latest multilingual content (e.g., English & Nepali)
  2. Generate `_data/*.json` files for 11ty
  3. Generate **AMP versions** of all pages
  4. Generate **language fallback pages**
  5. Perform **incremental builds** (hash-based)
  6. Output final static site into `_site/`

### **(C) Deployment Layer (CDN)**

* Cloudflare Pages (preferred) or Netlify
* Build artifacts uploaded atomically when ready
* Entire frontend is 100% static
* CDN handles:

  * Caching
  * Edge redirects
  * Instant global propagation
  * Always-online previous version fallback

---

## **3. Multi-Language Design**

You decided on **route-based language segmentation**, e.g.:

```
/en/blogs/my-post/
/np/blogs/my-post/
```

**No cookies**, because:

* You want maximum simplicity
* You want caching to work cleanly at the CDN level
* URLs should be shareable with specific languages

### **Fallback Behavior**

If content in a selected language doesn’t exist:

Example: `/np/blogs/post-a` doesn’t exist
→ Auto-generated redirect to `/en/blogs/post-a`

This fallback HTML is generated automatically by the Node.js script.

---

## **4. AMP Support**

Every page should have two versions:

* Normal page
* AMP page

URLs:

```
/en/blogs/my-post/
/amp/en/blogs/my-post/
```

AMP pages use stripped-down, compliant markup and load instantly.

There is **no limit** to how many AMP pages you can generate; AMP is just HTML.

---

## **5. Static Site Generation with 11ty**

You chose **11ty** because:

* Ultra-fast builds
* Small output artifacts
* Perfect for raw HTML generation
* Supports mixed templates, partials, and data directories
* Much simpler overhead than Astro for pure static sites

### **11ty responsibilities**

* Generate pages per language
* Generate AMP pages
* Load `_data/*.json` dynamically
* Build using templates: `base.njk`, `amp.njk`, `blog.njk`, etc.

---

## **6. Incremental Build Logic**

To avoid rebuilding the entire site every time:

* The Node.js script computes a **hash of all _data JSON files**
* If no changes → skip build
* If changed → run `eleventy --incremental`

This keeps builds fast even with thousands of posts.

---

## **7. Deployment Pipeline**

### **Workflow**

1. **Strapi content updated**
2. Webhook hits Node.js script
3. Script:

   * Fetches latest content
   * Generates multilingual JSON
   * Creates fallback HTML pages
   * Runs incremental 11ty build
4. Build result `_site/` uploaded via:

   * `netlify deploy --prod`
   * or `wrangler pages publish`
5. CDN instantly serves new version globally

### **Atomic Deployment**

* CDN always serves last successful version
* If build layer crashes, frontend remains unaffected

---

## **8. Security Design**

You prefer maximum isolation:

* Strapi is **not on the public internet**
* Only the static site is public
* No API requests from the browser
* No client-side JavaScript
* No runtime code execution on requests
* Only static HTML served by CDN

This makes your frontend **unhackable and maintenance-free**.

---

## **9. Final Objective**

Create a **production-grade static website system** where:

* Content editors use Strapi internally
* Build layer converts content to static HTML via 11ty
* Node.js script manages multilingual data & AMP pages
* CDN delivers everything instantly
* SEO is fully optimized
* System is resilient, fast, and extremely secure

You want this solution production-ready, documented, and easy for developers to understand — especially those using tools like **Cursor**, GitHub Copilot, or similar AI-assisted workflows.

---

If you want, I can now generate:

1. A **full technical specification**
2. A **README.md for GitHub**
3. A **step-by-step onboarding guide for new developers**
4. A **complete folder structure + code stubs**

Just tell me which you want next.
________________________________________________

