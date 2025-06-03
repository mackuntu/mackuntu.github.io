---
layout: post
title: "When Vercel Breaks Your API Routes: A Debugging War Story"
categories: [technology]
tags: [technology, development, vercel, nextjs, debugging, engineering]
description: "How a single line of configuration brought down every API route in production - and what it taught me about platform abstractions"
author: martin
image: assets/images/vercel-404-debugging.png
featured: false
hidden: false
comments: true
---

## The 3 AM Wake-Up Call

Every engineer has that moment. The one where production is on fire, nothing makes sense, and you question every decision that led you here.

Mine came when our entire API layer vanished into 404s after a routine deployment.

The kicker? Everything worked perfectly locally. Classic.

## When Abstractions Betray You

Here's what makes this story worth telling: it wasn't a bug in our code. It was a fundamental misunderstanding of how Vercel's routing layer works.

And that misunderstanding was hidden behind what seemed like a harmless configuration.

Let me paint the picture:

**Working:**
- `/api/health` ✓
- `/api/auth/[...nextauth]` ✓  
- Every single page route ✓

**Dead:**
- `/api/users/[id]` ✗
- `/api/posts/[slug]` ✗
- Every other dynamic API route ✗

The Vercel Functions dashboard showed everything deployed. The build logs were clean. Yet every dynamic API route returned 404.

## The Hunt Begins

I did what any engineer does - started eliminating variables.

**Middleware?** Properly excluding API routes.

**Route configuration?** Added every Next.js flag known to humanity:
```javascript
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';
// Still dead
```

**Build output?** Functions were there, mocking me:
```
├ ƒ /api/users/[id]     0 B    0 B
├ ƒ /api/posts/[slug]   0 B    0 B
```

Then I noticed something odd.

## The Smoking Gun

Why did NextAuth work when nothing else did?

I found this in `next.config.js`:

```javascript
async rewrites() {
  return [
    {
      source: '/api/auth/:path*',
      destination: '/api/auth/:path*',
    }
  ];
}
```

A rewrite that sends `/api/auth/*` to... itself?

This looked like dead code. Probably added months ago when debugging NextAuth. Harmless, right?

Wrong.

## The Brutal Truth

This innocent rewrite was acting as a route whitelist in Vercel's edge network.

It was essentially telling Vercel: "Only `/api/auth/*` routes are real API routes. Everything else? Doesn't exist."

The fix was insulting in its simplicity:

```javascript
// Delete the entire rewrites function
// Or if you need rewrites:
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: '/api/:path*',
    }
  ];
}
```

Deployed. Fixed. Four hours of my life gone.

## The Deeper Lesson

This bug taught me something important about modern deployment platforms.

**Local development lies to you.**

Your Next.js dev server doesn't have Vercel's edge network. It doesn't have their routing layer. It's a beautiful lie that everything works the same way.

When you deploy to Vercel, your request goes through:
1. Edge network routing
2. Middleware execution  
3. Function routing
4. Your actual code

That rewrite rule? It was intercepting at step 1, before your code even had a chance.

## What This Means for Engineering Teams

This isn't just a Vercel gotcha. It's a pattern I've seen repeatedly:

1. **Platform abstractions hide complexity** - Until they don't
2. **Identity operations aren't always identity** - A rewrite to itself can still break things
3. **Production has layers your local environment doesn't** - And those layers have opinions

The real lesson? When debugging platform issues, think like the platform.

Don't just think about your code. Think about every layer between the user and your code.

## Your 404 Debugging Checklist

If you're here because your API routes are returning 404:

1. **Check `next.config.js` first** - Especially rewrites and redirects
2. **Look for "identity" operations** - Rewrites that seem to do nothing
3. **Compare working vs broken routes** - What's different?
4. **Think in layers** - Where in the stack could the request be dying?
5. **When in doubt, simplify** - Remove configuration until it works

## The Takeaway

Every production bug is a lesson in humility.

This one reminded me that no matter how well you understand your code, you're always at the mercy of the platform you deploy on.

And sometimes, the most innocent-looking configuration is the one that burns you.

Have you been bitten by platform abstractions? What's your worst "it works locally" story? 