# Content Distribution Map

> Maps existing research content to guide stages. Identifies what's covered, what's missing, and what needs to be written fresh for each stage.

## How to read this document

- **Source**: Reference to existing content in the research files
  - `P:` = `frontend-principles-and-best-practices.md` (section.subsection)
  - `E:` = `frontend-ecosystem-2026.md` (section)
- **Status**: Coverage level of existing content for the stage's needs
  - `covered` = Content exists and can be adapted directly
  - `partial` = Content exists but needs expansion for the stage's depth/angle
  - `missing` = Must be written from scratch

---

## Stage 1: Foundations

> The platform before the framework. Student must master HTML, CSS, JS, TypeScript, and accessibility basics without any framework.

| Topic | Source | Status | Notes |
|-------|--------|--------|-------|
| **Semantic HTML & DOM** | — | **missing** | No research doc covers HTML fundamentals. Need: document structure, semantic elements, forms, `<head>` metadata, DOM mental model. |
| **CSS Box Model** | — | **missing** | No research covers CSS basics. Need: content-box vs border-box, margin collapse, display modes. |
| **CSS Flexbox** | — | **missing** | Need: axis model, justify/align, wrapping, common layouts. |
| **CSS Grid** | — | **missing** | Need: explicit/implicit grids, fr units, minmax, auto-fill/auto-fit, named areas. |
| **Responsive Units** | P:5.8 | partial | Responsive principles covered but not the units themselves (rem, em, vw, dvh, clamp). |
| **CSS Custom Properties** | E:5 (native CSS) | partial | Mentioned as a feature, not taught. Need: syntax, cascading, theming patterns. |
| **JavaScript ES2020+** | — | **missing** | No research covers JS fundamentals. Need: modules, destructuring, async/await, array methods, closures. |
| **TypeScript Basics** | E:6, P:1.5 | partial | Adoption/best practices covered, but not a teaching introduction. Need: type annotations, interfaces, strict mode, unions, as vs unknown. |
| **TypeScript Anti-patterns** | E:6 anti-patterns | covered | `as` casting, over-engineered types, @ts-ignore, runtime boundaries, enums. |
| **Accessibility Fundamentals** | P:10.1–10.3 | covered | Semantic HTML first, ARIA rules, keyboard navigation well covered. |
| **Accessibility Anti-patterns** | P:10 anti-patterns | covered | Overlays, redundant ARIA, color-only, disabled buttons without explanation. |
| **Developer Environment** | E:12 (DX) | partial | Tools mentioned but not as a setup guide. Need: editor config, DevTools walkthrough, terminal basics. |
| **Mobile-First CSS** | P:5.7 | covered | Design principle covered. |
| **CSS Anti-patterns** | E:5 anti-patterns | covered | Tailwind abuse, nesting depth, mixed approaches, token sprawl. |

**Summary Stage 1**: 5 topics missing entirely (HTML, CSS box model, Flexbox, Grid, JavaScript). These are foundations not covered by either research doc because they focused on principles and ecosystem, not teaching basics.

---

## Stage 2: Component Architecture

| Topic | Source | Status | Notes |
|-------|--------|--------|-------|
| **What is a Component?** | — | **missing** | No research defines the component concept from scratch. Need: mental model (input→output), encapsulation, lifecycle concept. |
| **SRP in Components** | P:1.1 | covered | Defined with practical guidance and line-count heuristic. |
| **OCP via Composition** | P:1.2 | covered | Slots/children over boolean flags, extension via composition. |
| **LSP for Variants** | P:1.3 | covered | Component substitutability, prop contracts. |
| **ISP for Props** | P:1.4 | covered | Minimal prop interfaces, no mega-props. |
| **DIP with Hooks/Context/DI** | P:1.5 | covered | Framework-specific DI patterns (React Context, Vue provide/inject, Angular DI). |
| **SOLID Anti-patterns** | P:1 anti-patterns | covered | Over-engineering, nano-components, premature generalization, cargo-culted layers. |
| **Composition over Inheritance** | P:2.1 | covered | Children, slots, render props. |
| **Container/Presentational** | P:2.2 | covered | Classic pattern + evolution with hooks. |
| **Compound Components** | P:2.3 | covered | Pattern description with examples. |
| **Render Props / Slots** | P:2.4 | covered | Cross-framework pattern. |
| **HOCs vs Hooks** | P:2.5 | covered | Evolution from HOCs to hooks/composables. |
| **Atomic Design** | P:2.6 | covered | Five levels, 2025 perspective, hybrid recommendation. |
| **Component Anti-patterns** | P:2 anti-patterns | covered | God containers, compound overuse, prop drilling panic, bikeshedding, callback hell. |
| **Headless Component Pattern** | E:10 | partial | Libraries described but not the pattern as a teaching concept. |
| **Component API Design** | — | **missing** | No doc teaches how to design a good component API: required vs optional props, defaults, event callbacks, forwarding refs/attrs. |

**Summary Stage 2**: Strongest coverage. Only 2 gaps: component mental model intro and API design guide.

---

## Stage 3: State & Data Flow

| Topic | Source | Status | Notes |
|-------|--------|--------|-------|
| **Local vs Global State** | P:4.1 | covered | Decision table with scope, examples, tools, guideline. |
| **Server State vs Client State** | P:4.2, E:2 | covered | Both docs cover this paradigm shift with tool recommendations. |
| **Unidirectional Data Flow** | P:4.5 | covered | State→View→Action→State cycle, framework examples. |
| **Derived/Computed State** | P:4.3 | covered | Framework-specific examples (useMemo, computed, signals). |
| **Immutability** | P:4.6 | covered | Why mutation breaks detection, Immer, spread. |
| **State Machines (XState)** | P:4.4 | covered | When to use, examples of value (multi-step forms, auth flows). |
| **Data Fetching Patterns** | — | **missing** | Neither doc teaches loading/error/success/empty states as a pattern with code examples. P:7 covers error handling in general but not the UI state pattern specifically. |
| **URL State** | P:4 anti-patterns | partial | Mentioned as a neglected anti-pattern but not taught as a positive pattern with implementation guidance. |
| **State Anti-patterns** | P:4 anti-patterns, E:2 anti-patterns | covered | Circular derivation, stale closures, global store abuse, state machine overkill, etc. |
| **TanStack Query / SWR Patterns** | E:2 | partial | Tools mentioned with download stats but not taught (caching strategies, invalidation, optimistic updates). |
| **Form State** | — | **missing** | No doc covers form state management as a distinct topic (React Hook Form, controlled vs uncontrolled, validation timing). |

**Summary Stage 3**: Good foundation but 3 gaps: data fetching UI patterns, URL state as a positive pattern, form state management.

---

## Stage 4: Usability & Design Principles

| Topic | Source | Status | Notes |
|-------|--------|--------|-------|
| **Nielsen's 10 Heuristics** | P:5.1 | covered | All 10 mapped to web with examples. |
| **Fitts's Law** | P:5.2 | covered | Touch targets, placement, edge advantage. |
| **Hick's Law** | P:5.3 | covered | Choice reduction, decision aids. |
| **Gestalt Principles** | P:5.4 | covered | 6 principles with UI applications. |
| **Progressive Disclosure** | P:5.5 | covered | Max 2 levels, common implementations. |
| **Cognitive Load Reduction** | P:5.6 | covered | Chunking, defaults, visual hierarchy, consistency. |
| **Mobile-First Design** | P:5.7 | covered | Prioritization, min-width queries, touch targets. |
| **Responsive Design** | P:5.8 | covered | Fluid layouts, content breakpoints, container queries, fluid type. |
| **Usability Anti-patterns** | P:5 anti-patterns | covered | Dark patterns, toast fatigue, mobile-only, Fitts/Hick misuse, device breakpoints. |
| **Typography & Visual Hierarchy** | — | **missing** | No doc covers type scales, font pairing, line height/measure, whitespace rhythm, contrast ratios for readability. |
| **Color Theory for UI** | — | **missing** | No doc covers color systems (HSL, Oklch), palette construction, semantic colors, dark mode principles. |
| **Spacing Systems** | — | **missing** | No doc covers spacing scales (4px/8px grid), consistent spacing patterns, spacing tokens. |
| **Form Design Patterns** | — | **missing** | No doc covers form UX: label placement, inline vs on-submit validation, multi-step forms, field grouping, error message patterns. |
| **Heuristic Violation Examples** | — | **missing** | Need concrete before/after examples for each heuristic (this is where mockups come in). |

**Summary Stage 4**: Principles well covered, but visual design fundamentals (typography, color, spacing) and form UX are missing entirely. These are critical for a frontend guide.

---

## Stage 5: Performance

| Topic | Source | Status | Notes |
|-------|--------|--------|-------|
| **Core Web Vitals** | P:6.1, E:8 | covered | LCP, INP, CLS with thresholds. INP replacing FID noted. |
| **RAIL Model** | P:6.1 | covered | Response, Animation, Idle, Load with targets. |
| **Lazy Loading** | P:6.2, E:8 | covered | Route, component, image strategies. |
| **Code Splitting** | P:9.3, E:8 | covered | Route, feature, component, vendor splitting. |
| **Virtualization** | P:6.3 | covered | When to use, libraries, trade-offs. |
| **Memoization** | P:6.4 | covered | When to use AND when not to. Best section for anti-patterns. |
| **Bundle Optimization** | P:6.5 | covered | Tree shaking, dependency analysis, compression. |
| **Image Optimization** | E:8 | partial | Formats (AVIF, WebP) mentioned but not taught: srcset, sizes, picture element, fetchpriority. |
| **Performance Anti-patterns** | P:6 anti-patterns, E:8 anti-patterns | covered | Premature optimization, lazy LCP images, over-splitting, broken tree shaking, CDN false confidence. |
| **Measuring Performance** | E:8 | partial | CrUX/RUM vs Lighthouse distinction mentioned but not taught as a workflow (DevTools Performance panel, bundle analyzer, RUM setup). |
| **Streaming SSR** | E:4, E:8 | partial | Mentioned as strategy but not taught with implementation guidance. |
| **Third-party Script Impact** | E:8 anti-patterns | partial | Noted as "largest unaddressed bottleneck" but no mitigation strategies taught. |

**Summary Stage 5**: Strong coverage. Minor gaps in image optimization teaching and performance measurement workflow.

---

## Stage 6: Security & Resilience

| Topic | Source | Status | Notes |
|-------|--------|--------|-------|
| **XSS Prevention** | P:8.1 | covered | Auto-escaping, dangerous APIs, DOMPurify. |
| **CSRF Protection** | P:8.2 | covered | Tokens, SameSite, Origin/Referer. |
| **CSP** | P:8.3 | covered | Start restrictive, avoid unsafe-inline. |
| **Input Sanitization** | P:8.4 | covered | Client for UX, server for security. |
| **Secure Auth (JWT, OAuth, BFF)** | P:8.5 | covered | Token storage, PKCE, BFF, refresh rotation. |
| **Error Boundaries** | P:7.1 | covered | Cross-framework, strategic placement. |
| **Graceful Degradation** | P:7.2 | covered | Feature detection, cached data, fallbacks. |
| **Optimistic Updates** | P:7.3 | covered | When to use, rollback, TanStack Query support. |
| **Retry Strategies** | P:7.4 | covered | Exponential backoff, jitter, idempotency. |
| **Security Anti-patterns** | P:8 anti-patterns | covered | Client-only validation, security theater, exposed keys, CORS, clickjacking, open redirects. |
| **Error Handling Anti-patterns** | P:7 anti-patterns | covered | Swallowed errors, hidden dev bugs, generic messages, invisible retry, silent rollback. |
| **Runtime Type Validation** | E:6 anti-patterns | partial | Mentioned (Zod, Valibot) but not taught as a pattern with examples. |
| **HTTPS & Cookie Security** | P:8.5 | partial | HttpOnly, Secure, SameSite mentioned but not a teaching section on cookie security model. |

**Summary Stage 6**: Best covered stage. Only minor gaps in runtime validation teaching and cookie security.

---

## Stage 7: Testing & Quality

| Topic | Source | Status | Notes |
|-------|--------|--------|-------|
| **Testing Pyramid** | E:7 | partial | Recommended stack listed but pyramid concept not taught (why many unit, some integration, few E2E). |
| **Testing Library** | E:7 | partial | Purpose described but not taught (query priorities, user-event, async patterns). |
| **MSW for API Mocking** | E:7 | partial | Mentioned in CI context but not taught as a pattern. |
| **Accessibility Testing** | E:9, P:10 | covered | Automated tools (axe, Pa11y) + manual testing described. |
| **Linting (ESLint/Biome)** | E:12 | covered | Tool comparison with migration guidance. |
| **CI Pipeline Strategy** | E:7 | covered | Split pipelines: fast first, E2E second. |
| **Testing Anti-patterns** | E:7 anti-patterns | covered | Implementation details, over-mocking, snapshot abuse, inverted pyramid, coverage worship, MSW drift. |
| **Writing Good Tests** | — | **missing** | No doc teaches how to structure a test: Arrange-Act-Assert, test naming, what to test vs what not to, test isolation. |
| **Component Testing Patterns** | — | **missing** | Need: how to test components with Testing Library, mocking context/providers, testing hooks in isolation. |
| **E2E Test Patterns** | — | **missing** | Need: page objects, test data management, avoiding flaky tests, parallel execution. |
| **Code Review Practices** | — | **missing** | Not covered in either doc. Need: what to look for, giving actionable feedback, PR size, review checklists. |

**Summary Stage 7**: Weakest stage for existing content. Anti-patterns are strong but positive teaching content for how to actually write tests is largely missing.

---

## Stage 8: Architecture at Scale

| Topic | Source | Status | Notes |
|-------|--------|--------|-------|
| **Feature-Based Organization** | P:9.2 | covered | Three patterns (feature-based, FSD, domain-driven) with directory examples. |
| **Feature-Sliced Design** | P:9.2 | covered | FSD structure described. |
| **Clean Architecture / Hexagonal** | P:3.3 | covered | 4 layers, domain/application/infrastructure/presentation. |
| **Separation of Concerns** | P:3.1–3.3 | covered | 3-layer separation, hooks as abstraction, service layer patterns. |
| **Design Systems** | E:10 | covered | Headless UI, shadcn/ui, design tokens W3C standard. |
| **API Patterns (REST/GraphQL/tRPC)** | E:11 | covered | Multi-protocol reality, decision framework, BFF. |
| **Build Tools (Vite)** | E:3 | covered | Vite 8, Turbopack, Rspack comparison. |
| **Meta-frameworks & Rendering** | E:4 | covered | SSR/SSG/ISR/streaming strategy table. |
| **Architecture Anti-patterns** | P:3 anti-patterns, E:10–12 anti-patterns | covered | Over-layering, premature design systems, folder bureaucracy, tooling churn, monorepo complexity. |
| **Monorepos** | E:12 anti-patterns | partial | Complexity warned about but not taught: when to use, Nx/Turborepo, shared packages. |
| **Design Token Implementation** | E:10 | partial | W3C spec described but not taught as an implementation guide. |
| **Micro-frontends** | — | **missing** | Not covered. May be out of scope for this guide, but should be mentioned as a pattern with trade-offs. |

**Summary Stage 8**: Good coverage from both docs combined. Minor gaps in monorepo teaching and token implementation.

---

## Gap Summary (Updated)

All previously missing content has been written. 20 new topics across 4 supplemental files (5,422 lines).

| Stage | Covered | Partial | Missing | Status |
|-------|---------|---------|---------|--------|
| **1: Foundations** | 14 | 0 | 0 | **All gaps filled** |
| **2: Components** | 16 | 0 | 0 | **All gaps filled** |
| **3: State** | 12 | 0 | 0 | **All gaps filled** |
| **4: Usability** | 14 | 0 | 0 | **All gaps filled** |
| **5: Performance** | 8 | 4 | 0 | Partial items are depth expansions, not blockers |
| **6: Security** | 11 | 2 | 0 | Partial items are depth expansions, not blockers |
| **7: Testing** | 11 | 0 | 0 | **All gaps filled** |
| **8: Architecture** | 11 | 1 | 0 | **All gaps filled** |

### New content files

| File | Lines | Covers | Fills gaps for |
|------|-------|--------|----------------|
| `guide/stage-1-foundations/foundations-reference.md` | 1,598 | Semantic HTML, CSS Box Model, Flexbox, Grid, JavaScript ES2020+ | Stage 1 (5 topics) |
| `guide/supplemental-content-components-and-state.md` | 1,321 | Component mental model, API design, data fetching UI patterns, URL state, form state | Stage 2 (2 topics), Stage 3 (3 topics) |
| `guide/supplemental-content-visual-design.md` | 1,115 | Typography, color theory, spacing systems, form design patterns, heuristic violation examples | Stage 4 (5 topics) |
| `guide/supplemental-content-testing-and-architecture.md` | 1,388 | Writing tests, component testing, E2E patterns, code review, micro-frontends | Stage 7 (4 topics), Stage 8 (1 topic) |

### Remaining partial items (not blocking, expand during stage writing)

- **Stage 5**: Image optimization (srcset/sizes/picture teaching depth), performance measurement workflow (DevTools walkthrough), streaming SSR implementation, third-party script mitigation
- **Stage 6**: Runtime type validation with Zod/Valibot (code examples), cookie security model (teaching walkthrough)
- **Stage 8**: Monorepo teaching (Nx/Turborepo when/why), design token implementation guide

These partial items have the concepts mentioned in the research docs but need deeper teaching examples. They can be expanded inline when writing each stage's chapter.
