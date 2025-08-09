---
layout: post
title: "How One Line in next.config.js Took Down Our Vercel APIs"
categories: [technology]
tags: [technology, development, vercel, nextjs, debugging, engineering, infrastructure]
description: "A case study on how a benign-looking rewrite rule can create production-only 404s by interacting with Vercel's edge routing layer."
author: martin
image: assets/images/vercel-404-debugging.png
featured: false
hidden: false
comments: true
---

## The Problem: Production APIs Return 404, Local Works Fine

We recently faced a production incident where a routine deployment caused all dynamic API routes to return a 404 Not Found error. Static API routes and all page routes worked correctly. The issue was not reproducible in our local development environment.

This is a common, and often maddening, class of bug. Here’s a breakdown of the symptoms:

**Working Routes:**
- `/` (All page routes) ✓
- `/api/health` (Static API route) ✓
- `/api/auth/[...nextauth]` (NextAuth.js dynamic routes) ✓

**Failing Routes:**
- `/api/users/[id]` ✗
- `/api/posts/[slug]` ✗
- All other dynamic API routes ✗

The Vercel build logs showed all functions were created successfully, and the function logs showed no invocations for the failing routes. The requests were disappearing before they hit our Next.js application code.

## The Investigation: Ruling Out the Obvious

Our initial debugging focused on the application layer, which turned out to be the wrong place to look.

1.  **Middleware (`middleware.ts`)**: We confirmed our middleware was correctly configured to exclude `/api/` routes, so it wasn't interfering.
2.  **Next.js Route Config**: We tried explicitly setting `export const dynamic = 'force-dynamic'` and other flags in the route handlers. This had no effect, as the issue occurred before the function was invoked.
3.  **Vercel Build Output**: We inspected the `.vercel/output` directory and confirmed that function bundles for the dynamic routes were present and correctly mapped in `config.json`.

The breakthrough came when we questioned why `/api/auth/[...nextauth]` was the *only* dynamic route that worked.

## The Root Cause: A Misleading `rewrites` Rule

The investigation led us to a seemingly harmless block in our `next.config.js`:

```javascript
// next.config.js
async rewrites() {
  return [
    {
      source: '/api/auth/:path*',
      destination: '/api/auth/:path*',
    }
  ];
}
```

This rewrite appears to be an identity function—it rewrites a path to itself. It was likely added during initial NextAuth setup and forgotten.

However, on Vercel's platform, this configuration has a critical side effect. **When `rewrites` are defined, Vercel's edge network uses them to inform its routing logic.** By explicitly defining a rewrite for `/api/auth/:path*`, we inadvertently told Vercel that *only* paths matching this pattern were valid API routes. All other dynamic API routes, which did not have a matching rewrite rule, were treated as non-existent by the edge, resulting in a 404 before ever reaching the Next.js runtime.

### Why It Worked Locally

The Next.js development server (`next dev`) does not replicate Vercel's edge routing layer. Locally, the `rewrites` function has a much more limited scope and doesn't influence the fundamental route resolution in the same way. This is a classic example of environment parity drift, where the local development environment is a poor approximation of the production platform.

## The Fix: Aligning Configuration with Platform Behavior

The solution was to make the rewrite rule generic enough to encompass all API routes, not just the one for authentication.

```javascript
// next.config.js
async rewrites() {
  return [
    {
      // This now correctly tells Vercel's edge that ALL /api routes are valid.
      source: '/api/:path*',
      destination: '/api/:path*',
    }
  ];
}
```

Alternatively, if no other rewrites are needed, the entire `rewrites` function can be deleted. After deploying this change, all API routes immediately began resolving correctly.

## Key Lessons on Platform Abstractions

This incident provides several important takeaways for teams building on modern PaaS environments like Vercel.

1.  **Configuration is Code (and Has Hidden Side Effects)**: A `next.config.js` file is not just for your application; it's also configuration for the platform. Seemingly "identity" operations can have profound impacts on the underlying infrastructure.
2.  **Local Environments Are an Approximation, Not a Replica**: `next dev` is a development tool, not a production simulator. Critical infrastructure layers like edge networks, serverless function routing, and CDN behavior are often absent locally. Always validate platform-sensitive changes with preview deployments.
3.  **Think in Layers**: When debugging, consider the entire request lifecycle. The bug wasn't in our code; it was in the interaction between our configuration and the platform's routing layer. The request was failing at "step 1" (Edge Routing), not "step 4" (Application Code).

## Debugging Checklist for Vercel 404s

If you encounter production-only 404s on Vercel with Next.js, here is a checklist:

1.  **`next.config.js` is Your Primary Suspect**: Immediately audit `rewrites`, `redirects`, and `headers`. These directly influence the Vercel edge.
2.  **Look for Overly-Specific Rules**: Are your rules too narrow? A rule for `/api/auth/:path*` can exclude `/api/users/:path*`.
3.  **Compare Build Outputs**: Use Vercel's CLI to download the build output for a working and a failing deployment. Diff the `.vercel/output/config.json` file to find discrepancies in the generated routes and rewrites.
4.  **Simplify to Isolate**: Create a new branch, remove all `rewrites` and other routing configurations, and deploy it. If it works, reintroduce rules one by one to find the offender. 