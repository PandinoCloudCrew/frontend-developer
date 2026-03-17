# Frontend Developer Guide

> A framework-agnostic, principle-driven reference for building modern web applications.
> Covers software development principles, usability, and best practices adaptable to React, Angular, Vue, Svelte, and others.

---

## Stage Structure

The guide is organized in 8 progressive stages. Each stage builds on the previous one. Every stage includes:
- **Chapter document** (markdown) — concepts, principles, and framework-agnostic patterns
- **Mockups** (exported from .pen files) — visual references the student implements themselves
- **Exercises** — hands-on tasks to reinforce concepts

---

### Stage 1: Foundations
> *The bedrock every frontend developer must master before touching a framework.*

- Semantic HTML and the DOM
- CSS fundamentals: Box model, Flexbox, Grid, responsive units
- JavaScript essentials: ES2020+, async/await, modules
- Accessibility from day one (semantic elements, keyboard navigation)
- Developer environment: editor, browser DevTools, terminal
- TypeScript as the professional baseline

### Stage 2: Component Architecture
> *Think in components — the universal building block of modern frontends.*

- What is a component? (framework-agnostic mental model)
- SOLID principles applied to components
- Composition over inheritance
- Props, slots, and component contracts
- Atomic Design: atoms, molecules, organisms, templates, pages
- Compound components and headless patterns
- Hooks / Composables as the universal logic abstraction

### Stage 3: State & Data Flow
> *Master the data that drives your UI.*

- Local vs global state — when to lift
- Server state vs client state (the paradigm shift)
- Unidirectional data flow
- Derived / computed state — never store what you can calculate
- Immutability and why it matters
- State machines for complex flows (XState)
- Data fetching patterns: loading, error, success states

### Stage 4: Usability & Design Principles
> *Build interfaces people actually want to use.*

- Nielsen's 10 Heuristics applied to web
- Fitts's Law and Hick's Law in practice
- Gestalt principles in UI layout
- Progressive disclosure and cognitive load reduction
- Mobile-first and responsive design
- Typography, color, spacing, and visual hierarchy
- Form design and input patterns

### Stage 5: Performance
> *Every millisecond counts — ship fast, stay fast.*

- Core Web Vitals: LCP, INP, CLS
- The RAIL model
- Lazy loading: routes, components, images
- Code splitting and bundle optimization
- Virtualization for large lists
- Memoization — when to use it and when not to
- Image optimization and modern formats
- Measuring and monitoring performance

### Stage 6: Security & Resilience
> *Protect your users and handle the unexpected gracefully.*

- XSS prevention and framework auto-escaping
- CSRF protection and SameSite cookies
- Content Security Policy (CSP)
- Secure authentication: JWT storage, OAuth + PKCE, BFF pattern
- Input validation and sanitization
- Error boundaries and graceful degradation
- Optimistic updates with rollback
- Retry strategies with exponential backoff

### Stage 7: Testing & Quality
> *Confidence in every deploy.*

- The testing pyramid: unit, component, integration, E2E
- Testing Library — test from the user's perspective
- Mocking strategies: MSW for API mocking
- Accessibility testing (automated + manual)
- Linting and formatting: ESLint, Biome, Prettier
- CI pipeline strategy: fast feedback loops
- Code review practices

### Stage 8: Architecture at Scale
> *Patterns for teams and large applications.*

- Feature-based folder organization
- Feature-Sliced Design (FSD)
- Clean Architecture / Hexagonal in frontend
- Separation of concerns: 4-layer architecture
- Design systems: headless primitives + design tokens
- API patterns: REST, GraphQL, tRPC — when to use each
- Build tools: Vite, bundler configuration
- Meta-frameworks: SSR, SSG, ISR — choosing the right rendering strategy
- Monorepos and shared code strategies

---

## How to Use This Guide

1. **Sequential for learners**: Go stage by stage, completing exercises before moving on.
2. **Reference for practitioners**: Jump to any stage/topic as needed.
3. **Framework adapter**: Each concept is taught framework-agnostic first, then shows how it maps to React, Angular, Vue, and Svelte.

## Mockups

Visual mockups for each stage are in the `frontend-guide.pen` file and exported as images in each stage's directory. These serve as **implementation targets** — the student builds the actual implementation.
