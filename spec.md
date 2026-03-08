# PixelForge Agency Website

## Current State
New project with no existing code.

## Requested Changes (Diff)

### Add
- **Hero Section**: Bold headline "Forging Powerful Digital Brands", short description about transforming business presence through design, content, and strategy. Two CTAs: "View Work" and "Start a Project".
- **About Section**: Introduction to PixelForge as a creative digital forge building strong online identities for startups and businesses.
- **Services Section**: Five services — Social Media Management, Content Creation, Video Editing, Brand Identity Design, Page Revamp — each with an icon, title, and short description.
- **Portfolio Section**: Grid/showcase of creative work, brand transformations, and social media designs (static sample items).
- **Why Choose PixelForge Section**: Four value pillars — Creativity, Strategy, Modern Design, Growth-focused Branding — with icons and short blurbs.
- **Contact Section**: Contact form (name, email, message + submit), email display, and social media links (Twitter/X, Instagram, LinkedIn).
- **Navigation**: Fixed top navbar with logo, links to each section, and a "Start a Project" CTA button.
- **Footer**: Logo, copyright, social links.

### Modify
- None

### Remove
- None

## Implementation Plan
1. Backend: Motoko canister exposing a `submitContactForm` endpoint that stores contact messages (name, email, message).
2. Frontend design system: Dark theme with black/near-black backgrounds, metallic/steel tones for surfaces, glowing electric-blue accents, Sora (body) + Mona Sans (display) fonts, sharp/subtle border radii.
3. Hero section with animated headline, particle or glow background effect, two CTA buttons.
4. Smooth scroll navigation; active section highlighting.
5. Services section with card grid, animated hover glow effects.
6. Portfolio section with image cards, hover overlay reveal.
7. "Why Choose Us" section with icon + stat cards.
8. Contact section wired to backend `submitContactForm`, with success/error feedback states.
9. Subtle scroll-reveal animations (transform + opacity) respecting prefers-reduced-motion.
10. Full responsiveness: mobile-first, tested at sm/md/lg breakpoints.
