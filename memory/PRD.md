# PRD — Lucas Azaro · Personal Brand Site

## Original Problem Statement
Build a high-end personal brand website for Lucas Azaro, an international executive consultant. Owner of Azcarental and tech companies. Practices: Innovation Consulting, AI Consulting, Digital Transformation. Credentials: MBA in Innovation @mbiusp, Academic Background @uffoficial, IBM Certifications, Certified Chaplain @chaplain.usa.ctma. Stack: FastAPI + React + MongoDB.

## User Choices (verbatim)
- Bilingual PT/EN with toggle
- Style: Editorial sofisticado serif + Tech moderno escuro com acentos neon (hybrid)
- Contact info: +1 (619) 997-1471 — lucasa@bluegemsmgmt.com
- Schedule form: defaults (simple form saving to DB)

## Architecture
- **Frontend**: React (CRA) + TailwindCSS + Shadcn UI primitives + Sonner toaster + lucide-react icons. Custom CSS reveal animations + grain overlay + tracing border on service cards.
- **Backend**: FastAPI + Motor (MongoDB async). All routes prefixed `/api`. Pydantic models with EmailStr validation.
- **DB Collections**: `contact_requests`, `status_checks`.
- **i18n**: Centralized dictionary in `/app/frontend/src/i18n.js`, persisted to localStorage.

## Implemented (2026-04-29)
- Bilingual PT/EN toggle in navbar (data-testid `lang-toggle`).
- Hero (asymmetric editorial, rooftop portrait, neon caret stats, scrolling marquee).
- About (4-grid lifestyle composite, drop-cap quote).
- Services bento (3 cards: Innovation, AI, Digital Transformation; tracing-border hover).
- Credentials grid (4 typographic badges).
- Cases / Indicators (4 stat cards + laptop portrait + serif quote).
- Contact form (Shadcn Input/Textarea/Select; underline-only minimal styling) → POST `/api/contact` → MongoDB.
- Footer with cyan caret, mono labels.
- Direct contact links: tel:+16199971471, mailto:lucasa@bluegemsmgmt.com.

## API Surface
- `GET /api/` → health
- `POST /api/contact` → create consulting request
- `GET /api/contact` → list requests (admin)
- `GET/POST /api/status` → legacy

## Testing (iteration_1)
- Backend: 100% (10/10 pytest)
- Frontend: 100% (lang toggle, form submit, persistence verified)

## Backlog
### P1
- Admin dashboard to view/export contact requests.
- Email notification on form submit (e.g., Resend integration).
- Calendar booking integration (Google Calendar / Calendly).
- SEO metadata + OG image + favicon.
- Sitemap + robots.txt.

### P2
- Blog/insights section.
- Testimonials slider with multiple voices.
- Lighthouse pass + image lazy-loading + WebP.
- Lenis smooth scrolling + Framer Motion staggered reveals.
- Rate limiting on `/api/contact`.
- Strict service Literal validation.

## Next Action Items
- (User) Decide whether to add email notifications and/or Calendly booking.
- (User) Provide additional case studies, real testimonials, and brand assets if available.
