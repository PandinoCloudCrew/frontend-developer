# Frontend Developer Guide — Project Plan

## Vision

A framework-agnostic, principle-driven reference guide for frontend developers. Emphasizes **how things work AND how they fail**. Teaches software development principles, usability, and best practices that can be adapted to React, Angular, Vue, Svelte, or any component-based framework.

## Approach

- **Hybrid format**: Markdown chapters (concepts + anti-patterns) + visual mockups (.pen files exported as images)
- **Student-driven implementation**: Mockups serve as design targets — the student builds the actual code
- **Both paths covered**: Every concept includes the positive path (how to do it) AND the negative path (how it fails, common mistakes, anti-patterns)
- **Framework-agnostic first**: Principles taught without framework bias, then mapped to specific implementations
- **Acceptance-driven**: Every stage has clear criteria the student must meet and concrete validation steps to verify

## Deliverables Per Stage

Each stage produces:
1. **Chapter document** (`stage-N-name/README.md`) — concepts, principles, anti-patterns, exercises
2. **Mockups** (designed in `guide/frontend-guide.pen`) — visual references exported as images into each stage directory
3. **Exercises** — hands-on tasks with clear deliverables
4. **Acceptance criteria** — specific, verifiable conditions for "done"
5. **Validation checklist** — concrete steps the student executes to prove mastery

## How Acceptance Criteria Work

Each stage defines:
- **Acceptance criteria**: Observable outcomes the student's work must demonstrate. Written as "The student's implementation must..." statements.
- **Validation steps**: Specific actions the student performs to verify each criterion. These are concrete: run a command, open a tool, perform an action, and observe a specific result. No vague "understand X" — always "do X and observe Y."

---

## Stage Breakdown

---

### Stage 1: Foundations

**Goal**: Master the web platform before touching a framework.
**Prerequisites**: None.

#### Content Outline

1. **Semantic HTML & the DOM**
   - Document structure: `doctype`, `html`, `head`, `body`
   - Semantic elements: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`
   - When to use `div` vs semantic elements (decision tree)
   - Forms: `label`, `fieldset`, `legend`, native validation attributes
   - Anti-pattern: div-soup — building entire UIs with `div` and `span`

2. **CSS Fundamentals**
   - Box model: `content-box` vs `border-box`, margin collapse
   - Flexbox: axis model, alignment, distribution, wrapping
   - Grid: explicit vs implicit grids, `fr` units, `minmax`, `auto-fill`/`auto-fit`
   - Responsive units: `rem`, `em`, `vw`, `vh`, `dvh`, `clamp()`
   - Custom properties (CSS variables) and theming
   - Anti-pattern: pixel-everything, specificity wars, `!important` chains

3. **JavaScript Essentials (ES2020+)**
   - Modules: `import`/`export`, dynamic `import()`
   - Destructuring, spread, rest, optional chaining, nullish coalescing
   - `async`/`await`, Promises, error handling with `try`/`catch`
   - Array methods: `map`, `filter`, `reduce`, `find`, `some`, `every`
   - Closures and scope — how they work and common bugs
   - Anti-pattern: callback hell, mutation of shared state, `var` usage

4. **TypeScript Baseline**
   - Type annotations, interfaces, type aliases
   - `strict: true` from day one
   - Union types, literal types, discriminated unions
   - `unknown` vs `any` — why `any` defeats the purpose
   - Anti-pattern: `as` casting to silence errors, `@ts-ignore` proliferation

5. **Accessibility Fundamentals**
   - Semantic elements provide behavior for free
   - Keyboard navigation: Tab, Enter, Space, Escape, arrow keys
   - Labels, alt text, heading hierarchy
   - Anti-pattern: `<div onClick>` as a button, `outline: none` without replacement

6. **Developer Environment**
   - Editor setup: TypeScript integration, ESLint/Biome, Prettier
   - Browser DevTools: Elements, Console, Network, Performance, Accessibility panels
   - Terminal basics: package managers (npm/pnpm/bun), scripts

#### Exercises

1. **Semantic Profile Page**: Build a personal profile page using only semantic HTML (no `div` for structure). Include a nav, header with name/role, main with bio sections, aside with contact info, and a footer.
2. **CSS Layout Challenge**: Reproduce a provided mockup (dashboard layout) using Flexbox and Grid. Must work at 3 viewport widths (mobile, tablet, desktop) using only `rem`/`clamp()` — no pixel values for spacing.
3. **TypeScript Data Transformer**: Write a module that fetches JSON from a public API, validates the shape with TypeScript types, transforms the data, and handles errors. No `any` allowed.
4. **Keyboard Navigation Audit**: Take the profile page from Exercise 1, unplug the mouse, and complete every interaction using only keyboard. Document every failure.

#### Acceptance Criteria

| # | Criterion | How to verify |
|---|-----------|---------------|
| 1.1 | Page uses zero `div` elements for structural layout (semantic elements only) | Open DevTools → Elements panel. Search for `<div>`. Only decorative/styling divs allowed, none for page structure (nav, headers, sections, footers). |
| 1.2 | Page passes HTML validation with no errors | Run the page through [W3C Validator](https://validator.w3.org/) or `npx html-validate`. Zero errors. |
| 1.3 | CSS layout uses no pixel values for spacing or sizing | Search all CSS files for `px`. Only allowed in borders (`1px solid`) and shadows. All spacing, sizing, and typography use `rem`, `em`, `clamp()`, `%`, or viewport units. |
| 1.4 | Layout works at 320px, 768px, and 1280px widths | Open DevTools → Device toolbar. Set width to each value. No horizontal scrollbar. No overlapping content. No text smaller than 16px equivalent. |
| 1.5 | TypeScript project compiles with `strict: true` and zero `any` | Run `npx tsc --noEmit`. Zero errors. `grep -r ": any" src/` returns zero results. |
| 1.6 | TypeScript transformer handles API errors gracefully | Disconnect network (DevTools → Network → Offline). Run the transformer. It must log a meaningful error message, not crash with an unhandled rejection. |
| 1.7 | Every interactive element is reachable and operable via keyboard alone | Tab through the entire page. Every link, button, and form field must receive visible focus and be activatable with Enter or Space. |
| 1.8 | Page has a logical heading hierarchy | Run `document.querySelectorAll('h1,h2,h3,h4,h5,h6')` in Console. Headings must descend in order (no h1→h3 skip). Exactly one `h1`. |
| 1.9 | All images have appropriate `alt` text | Run Lighthouse → Accessibility. "Image elements have [alt] attributes" must pass. Decorative images use `alt=""`. |
| 1.10 | Dev environment produces linting errors for common mistakes | Introduce a `var` declaration, an unused variable, and a `console.log`. Linter must flag all three. |

#### Validation Script

The student runs these checks after completing all exercises:

```bash
# 1. HTML validation
npx html-validate dist/index.html

# 2. No `any` in TypeScript
grep -rn ": any" src/ && echo "FAIL: found 'any'" || echo "PASS: no 'any' found"

# 3. TypeScript strict compilation
npx tsc --noEmit --strict

# 4. Lint check
npx eslint src/ --max-warnings=0   # or: npx biome check src/

# 5. Accessibility quick check (if using a live server)
npx pa11y http://localhost:3000

# 6. Search for px values in CSS (manual review)
grep -rn "[0-9]px" src/**/*.css | grep -v "border\|shadow\|1px"
```

---

### Stage 2: Component Architecture

**Goal**: Think in components — the universal building block.
**Prerequisites**: Stage 1 complete.

#### Content Outline

1. **What is a component?** — Input (props/data) → Output (UI). Encapsulation. Reusability. Framework-agnostic mental model.
2. **SOLID applied to components** — SRP (one reason to change), OCP (extend via composition), LSP (variants are substitutable), ISP (minimal prop interfaces), DIP (depend on abstractions).
3. **Composition over inheritance** — Children/slots, render props, compound components. Why `extends BaseComponent` fails.
4. **Props, slots, and component contracts** — Prop types as API contracts. Required vs optional. Default values. Event callbacks.
5. **Atomic Design** — Atoms → Molecules → Organisms → Templates → Pages. When it helps, when it causes bikeshedding.
6. **Compound components** — Shared implicit state via context. `<Select>`, `<Tabs>`, `<Accordion>` patterns.
7. **Hooks / Composables** — Extracting stateful logic. Composition of hooks. When HOCs still make sense.

#### Exercises

1. **Component Decomposition**: Given a mockup of a product listing page, identify and document every component (name, props, children, responsibility). Draw the component tree.
2. **Build a Component Library (3 levels)**: Build Button (atom), SearchBar (molecule), and ProductCard (organism). Each must accept props with TypeScript types, have sensible defaults, and be composable.
3. **Refactor a God Component**: Given a 400-line component that handles data fetching, filtering, sorting, pagination, and rendering — refactor it into separate components and hooks, each with a single responsibility.
4. **Compound Component**: Build a `<Tabs>` compound component where `<Tabs>`, `<TabList>`, `<Tab>`, and `<TabPanel>` share state implicitly.

#### Acceptance Criteria

| # | Criterion | How to verify |
|---|-----------|---------------|
| 2.1 | Component decomposition identifies at least 3 levels of nesting (atom/molecule/organism or equivalent) | Review the component tree document. Must show at least 3 distinct levels of composition. |
| 2.2 | Every component has a TypeScript interface for its props | `grep -rn "interface.*Props" src/components/` returns a result for each component file. |
| 2.3 | No component exceeds 150 lines (excluding imports and types) | `wc -l src/components/**/*.tsx` — no file exceeds 150 lines of JSX/logic. |
| 2.4 | No component accepts more than 10 props | Review each props interface. Max 10 properties per interface. If more are needed, the component likely violates SRP. |
| 2.5 | Refactored god component produces identical output to the original | Render both side-by-side (snapshot or visual diff). Behavior must be identical. |
| 2.6 | Each extracted hook is testable in isolation | Write one test per hook that runs without rendering a component. All tests pass. |
| 2.7 | Compound `<Tabs>` component manages focus with arrow keys | Render the Tabs. Press Tab to focus the tab list. Press Left/Right arrows to switch active tab. Focus ring must be visible on the active tab. |
| 2.8 | Compound `<Tabs>` children can be reordered without breaking | Move `<Tab>` and `<TabPanel>` elements to different positions. Component still works correctly. |
| 2.9 | Components are composable — Button works inside SearchBar, SearchBar works inside ProductCard | Render ProductCard containing SearchBar containing Button. No prop conflicts, no style leaks. |
| 2.10 | No component directly fetches data (separation of concerns) | `grep -rn "fetch\|axios\|useQuery" src/components/` returns zero results. Data fetching lives in hooks or services. |

---

### Stage 3: State & Data Flow

**Goal**: Master the data that drives the UI.
**Prerequisites**: Stage 2 complete.

#### Content Outline

1. **Local vs global state** — Decision tree: "Does another component need this?" If no → local. If yes → lift or share.
2. **Server state vs client state** — The paradigm shift. Why TanStack Query/SWR exist. Cache invalidation, refetching, optimistic updates.
3. **Unidirectional data flow** — State → View → Action → State. Why bidirectional bindings cause bugs.
4. **Derived/computed state** — Never store what you can calculate. `useMemo`, `computed()`, selectors.
5. **Immutability** — Why mutation breaks change detection. Spread, Immer, structural sharing.
6. **State machines** — XState for flows with >3 states. Impossible state elimination.
7. **Data fetching patterns** — Loading/error/success states. Skeleton screens. Empty states.

#### Exercises

1. **State Audit**: Given an app with all state in a single global store, identify which state is local, which is server, which is derived, and which belongs in the URL. Refactor.
2. **Server State Migration**: Replace manual `useEffect` + `useState` data fetching with TanStack Query (or framework equivalent). Add caching, error handling, and loading states.
3. **Multi-step Form with State Machine**: Build a checkout flow (cart → shipping → payment → confirmation) using XState. Each step has validation that must pass before advancing.
4. **URL State Sync**: Build a filterable, sortable, paginated list where all filter/sort/page state lives in the URL. Sharing the URL must reproduce the exact view.

#### Acceptance Criteria

| # | Criterion | How to verify |
|---|-----------|---------------|
| 3.1 | No server data stored in client state libraries (Zustand/Redux/Pinia) | `grep -rn "setState\|dispatch\|store.set" src/` — none of these update server-fetched data. Server data flows through TanStack Query / SWR / framework equivalent. |
| 3.2 | No duplicated derived state — no `useState` for values calculable from other state | Search for state variables. For each, ask: "Can this be computed from other state?" If yes → it must be a `useMemo`/`computed`/derived value, not stored state. |
| 3.3 | Every data-fetching call has explicit loading, error, and empty states | Navigate to each data-dependent view. For each: (1) throttle network to Slow 3G → loading skeleton/spinner must appear. (2) Block the API request → error message with retry option must appear. (3) Return empty array → empty state message must appear. |
| 3.4 | State machine makes impossible states impossible | In the checkout flow: try to advance from cart to payment (skipping shipping). Try to go back from confirmation to cart. The state machine must reject both transitions. |
| 3.5 | URL state is the source of truth for filters/sort/pagination | Copy the URL with active filters. Open it in an incognito window. The exact same view (filters, sort order, page number) must render. |
| 3.6 | Browser back button works correctly with URL state | Apply filters, change page, change sort. Press Back 3 times. Each press restores the previous state. |
| 3.7 | No stale closure bugs | Open the app. Rapidly click a counter button 10 times. The count must equal 10, not a lower number (which would indicate a stale closure). |
| 3.8 | Optimistic update rolls back on failure | Add an item (should appear immediately). Simulate a server error. The item must disappear and an error message must appear. |

---

### Stage 4: Usability & Design Principles

**Goal**: Build interfaces people actually want to use.
**Prerequisites**: Stage 3 complete.

#### Content Outline

1. **Nielsen's 10 Heuristics** — Each heuristic applied to web, with violation examples (before/after mockups).
2. **Fitts's Law & Hick's Law** — Target sizing, action placement, choice reduction.
3. **Gestalt Principles** — Proximity, similarity, closure, continuity, common region.
4. **Progressive Disclosure** — Show essential first. Max 2 disclosure levels.
5. **Cognitive Load Reduction** — Chunking, defaults, visual hierarchy, consistent patterns.
6. **Mobile-First & Responsive** — Base styles → enhancement. Content breakpoints, not device breakpoints.
7. **Form Design** — Labels, validation timing, error messaging, multi-step forms.

#### Exercises

1. **Heuristic Audit**: Given a mockup with 10 deliberate usability violations (one per heuristic), identify each violation, name the violated heuristic, and propose a fix.
2. **Responsive Dashboard**: Build a dashboard that works at mobile (single column, stacked cards), tablet (2-column grid), and desktop (sidebar + main content). No device-width breakpoints.
3. **Form Redesign**: Given a single-page form with 20 fields, redesign it using progressive disclosure (multi-step wizard), inline validation, and sensible defaults.
4. **Touch Target Audit**: Measure every interactive element on a mobile view. Flag and fix any target smaller than 44x44px.

#### Acceptance Criteria

| # | Criterion | How to verify |
|---|-----------|---------------|
| 4.1 | Student correctly identifies all 10 heuristic violations in the audit | Compare student's audit against the answer key. 10/10 identified, with correct heuristic named and actionable fix proposed. |
| 4.2 | Dashboard breakpoints are content-driven, not device-driven | Slowly resize the browser from 320px to 1920px. Layout must adapt smoothly at natural content break points. No jumps at 768px or 1024px specifically. |
| 4.3 | Dashboard is usable at every width between 320px and 1920px | At no width does content overflow, overlap, or become unreadable. |
| 4.4 | Form wizard shows progress and allows backward navigation | Complete step 1 and advance. A progress indicator shows "Step 2 of N." A back button returns to step 1 with all data preserved. |
| 4.5 | Form validates inline on blur, not on submit | Fill a field with invalid data and tab away. Error message appears immediately under the field. Do not submit the form. |
| 4.6 | Form submit button is disabled with visible explanation when invalid | With required fields empty, the submit button must be disabled. Hovering or focusing it must show which fields need attention. |
| 4.7 | Every touch target on mobile is at least 44x44px | In DevTools mobile view, use the "Measure" tool or run a script: `document.querySelectorAll('button,a,input,[role=button]').forEach(el => { const r = el.getBoundingClientRect(); if (r.width < 44 || r.height < 44) console.warn('Too small:', el, r.width, r.height) })`. Zero warnings. |
| 4.8 | No dark patterns present | Peer review: another person reviews the form flow and confirms no confirm-shaming, misdirection, hidden costs, or trick questions. |

---

### Stage 5: Performance

**Goal**: Ship fast, stay fast.
**Prerequisites**: Stage 4 complete.

#### Content Outline

1. **Core Web Vitals** — LCP (<2.5s), INP (<200ms), CLS (<0.1). What they measure and why they matter.
2. **RAIL Model** — Response, Animation, Idle, Load mental framework.
3. **Lazy Loading** — Route-based (automatic), component-level (`React.lazy`, `defineAsyncComponent`), image (`loading="lazy"`, NOT on LCP element).
4. **Code Splitting** — Route splitting, feature splitting, vendor splitting. When over-splitting hurts.
5. **Virtualization** — `@tanstack/virtual`, `react-window`. When to use (>100 items), trade-offs (a11y).
6. **Memoization** — When it helps, when it wastes memory, when it breaks silently (inline objects).
7. **Image Optimization** — WebP/AVIF, `srcset`, `sizes`, `fetchpriority="high"` for hero.
8. **Measuring** — Lighthouse vs real user metrics (CrUX), DevTools Performance panel, bundle analysis.

#### Exercises

1. **Performance Audit**: Run Lighthouse on a provided slow app. Document every finding, prioritize by impact, fix the top 5.
2. **Lazy Loading Implementation**: Add route-level code splitting and image lazy loading. Ensure hero image is NOT lazy-loaded.
3. **Virtualized List**: Build a list that renders 10,000 items without jank. Scroll must stay at 60fps.
4. **Bundle Analysis**: Run bundle analyzer on a provided project. Identify the 3 largest dependencies. Propose and implement at least one size reduction.

#### Acceptance Criteria

| # | Criterion | How to verify |
|---|-----------|---------------|
| 5.1 | Lighthouse Performance score >= 90 on mobile simulation | Run `npx lighthouse http://localhost:3000 --preset=perf --emulated-form-factor=mobile`. Score must be >= 90. |
| 5.2 | LCP < 2.5 seconds on throttled connection | DevTools → Performance → Start recording → Reload with "Slow 4G" throttling. LCP marker must appear before 2.5s. |
| 5.3 | CLS = 0 (no layout shifts) | DevTools → Performance → record a full page load. CLS must be 0.00. Alternatively: `new PerformanceObserver(l => l.getEntries().forEach(e => console.log('CLS:', e.value))).observe({type: 'layout-shift', buffered: true})`. |
| 5.4 | Hero/LCP image does NOT have `loading="lazy"` | Inspect the hero image in DevTools. It must not have `loading="lazy"`. It should have `fetchpriority="high"`. |
| 5.5 | Route-level code splitting produces separate chunks | Build the project. Check the output directory. Each route must have its own JS chunk (not everything in one bundle). |
| 5.6 | Virtualized list scrolls at 60fps with 10,000 items | DevTools → Performance → record while scrolling quickly. Frame rate must stay above 55fps. No frames over 16ms. |
| 5.7 | Bundle size reduced by at least 20% after optimization | Compare build output sizes before and after optimization. `ls -la dist/assets/*.js` — total JS size must be at least 20% smaller. |
| 5.8 | No `React.memo` / `useMemo` / `useCallback` without a measured justification | For each memoization usage, the student must document which re-render or computation they measured as expensive. "Might be slow" is not acceptable. |

---

### Stage 6: Security & Resilience

**Goal**: Protect users and handle failure gracefully.
**Prerequisites**: Stage 5 complete.

#### Content Outline

1. **XSS Prevention** — Framework auto-escaping. `dangerouslySetInnerHTML`/`v-html` are red flags. DOMPurify for when you must render HTML.
2. **CSRF** — SameSite cookies, anti-CSRF tokens, Origin/Referer validation.
3. **CSP** — Writing a real policy. Why `default-src *` is useless.
4. **Auth** — JWT storage (memory, not localStorage). OAuth + PKCE for SPAs. BFF pattern. Refresh token rotation.
5. **Input Validation** — Client for UX, server for security. Zod/Valibot for runtime type validation.
6. **Error Boundaries** — Strategic placement. Not at app root only. Not per-component.
7. **Graceful Degradation** — Fallback UI, stale data indicators, feature detection.
8. **Optimistic Updates** — When to use (low-risk), when not (payments). Rollback with notification.
9. **Retry** — Exponential backoff + jitter. Idempotency keys. Max retries. Visible retry state.

#### Exercises

1. **XSS Challenge**: Given an app with 5 XSS vulnerabilities (innerHTML, eval, URL injection, template injection, stored XSS), find and fix all 5.
2. **Error State Implementation**: For a data-driven page, implement all 4 UI states: loading (skeleton), success (data), error (message + retry button), empty (helpful empty state).
3. **Auth Flow**: Implement OAuth + PKCE login with access token in memory, refresh token in HttpOnly cookie, and automatic token refresh.
4. **Resilience Test**: Simulate network failure mid-operation. Verify optimistic rollback, error messages, and retry behavior all work correctly.

#### Acceptance Criteria

| # | Criterion | How to verify |
|---|-----------|---------------|
| 6.1 | Zero XSS vulnerabilities remain | Run a manual test: input `<img src=x onerror=alert(1)>` into every text input and user-facing field. No alert box must appear. Search codebase for `dangerouslySetInnerHTML`, `v-html`, `innerHTML`, `eval` — each occurrence must use DOMPurify or be justified. |
| 6.2 | No secrets in client-side bundle | Build the project. `grep -r "sk_\|api_key\|secret\|password\|private" dist/` must return zero results. |
| 6.3 | All 4 UI states implemented for every data-fetching view | (1) Throttle to Slow 3G → skeleton/spinner. (2) Block API → error + retry button. (3) Retry button works. (4) Return empty data → empty state with guidance. |
| 6.4 | Auth tokens not in localStorage or sessionStorage | In DevTools → Application → Local Storage and Session Storage. No JWTs, access tokens, or refresh tokens visible. |
| 6.5 | Failed optimistic update shows error and rolls back | Like an item. Block the API. The like must revert, and an error toast/message must appear. |
| 6.6 | Retry uses exponential backoff | In DevTools → Network, fail an API 3 times. The retry intervals must increase (e.g., ~1s, ~2s, ~4s), not be identical. |
| 6.7 | CSP header is present and not permissive | In DevTools → Network → Response headers for the HTML document. `Content-Security-Policy` must be present. Must NOT contain `*` or `unsafe-inline` for `script-src`. |
| 6.8 | Every form validates on both client and server | Submit a form with valid client-side data but invalid server-side data (bypass client validation via DevTools). Server must reject with a clear error. |

---

### Stage 7: Testing & Quality

**Goal**: Confidence in every deploy.
**Prerequisites**: Stage 6 complete.

#### Content Outline

1. **Testing Pyramid** — Many unit tests, some integration, few E2E. Why the inverse fails.
2. **Testing Library** — Test user behavior, not implementation. Query by role/label/text, not class/id.
3. **MSW** — Mock at the network level. Keep mocks honest with contract tests.
4. **Accessibility Testing** — axe-core in CI. Manual keyboard + screen reader test.
5. **Linting** — ESLint flat config or Biome. Automate what you can.
6. **CI Pipeline** — Fast unit → slower E2E. Fail fast. Parallelize.
7. **Code Review** — What to look for. How to give actionable feedback.

#### Exercises

1. **Test a Component**: Write tests for a `SearchBar` component using Testing Library. Test: renders, accepts input, calls onSearch on submit, shows error on empty submit. Zero DOM queries by class name or test ID.
2. **Test Data Fetching**: Write integration tests for a data-fetching hook/composable using MSW. Test: loading state, success state, error state, retry behavior.
3. **E2E Critical Path**: Write a Playwright test for the most critical user journey (e.g., login → search → view detail → add to cart → checkout).
4. **CI Pipeline Setup**: Configure a GitHub Actions pipeline that runs lint → unit tests → component tests → E2E (only if previous pass).

#### Acceptance Criteria

| # | Criterion | How to verify |
|---|-----------|---------------|
| 7.1 | All tests pass with zero `getByTestId` or DOM class queries | `grep -rn "getByTestId\|querySelector\|className" src/**/*.test.*` must return zero results. All queries use `getByRole`, `getByLabelText`, `getByText`, or `getByPlaceholderText`. |
| 7.2 | Test coverage >= 80% for business logic, no coverage worship for UI | Run `npx vitest --coverage`. `src/hooks/`, `src/services/`, `src/utils/` must have >= 80% line coverage. No target for `src/components/` — test behavior, not markup. |
| 7.3 | MSW mocks match the actual API contract | Run API contract validation: MSW handler response shapes must match the TypeScript API types. A type mismatch fails the build. |
| 7.4 | E2E test completes the critical path in under 30 seconds | Run `npx playwright test`. The critical path test must pass in < 30s. |
| 7.5 | CI pipeline fails on lint errors | Push a commit with an ESLint/Biome error. The pipeline must fail at the lint step, before running tests. |
| 7.6 | CI pipeline runs E2E only after unit tests pass | Review the GitHub Actions YAML. E2E job must have `needs: [unit-tests]` or equivalent. |
| 7.7 | Accessibility CI check catches violations | Introduce a `<button>` with no accessible name. axe-core or pa11y in CI must flag it and fail the build. |
| 7.8 | No tests mock implementation details | Review test files. No mocking of internal state, private methods, or hook internals. Only external dependencies (APIs via MSW, timers via `vi.useFakeTimers`) are mocked. |

---

### Stage 8: Architecture at Scale

**Goal**: Patterns for teams and large applications.
**Prerequisites**: Stage 7 complete.

#### Content Outline

1. **Folder Organization** — Feature-based, Feature-Sliced Design, domain-driven. Trade-offs of each.
2. **Clean Architecture in Frontend** — 4 layers: Presentation → Application → Domain → Infrastructure. When it's overkill.
3. **Design Systems** — Headless components (Radix, Ark UI), design tokens (W3C standard), shadcn/ui copy-paste model.
4. **API Patterns** — REST (public), tRPC (internal TS), GraphQL (BFF). Decision framework.
5. **Build Tools** — Vite configuration. Understanding what the bundler does.
6. **Meta-frameworks** — SSR, SSG, ISR, streaming. Choosing the right rendering strategy.
7. **Monorepos** — When they help, when they don't. Shared packages.

#### Exercises

1. **Feature Refactor**: Take a flat folder structure (everything in `components/`, `hooks/`, `services/`) and reorganize by feature. Ensure no circular cross-feature imports.
2. **Design System Extraction**: From an existing app, extract 5 reusable components into a design system package with design tokens for colors, spacing, and typography.
3. **API Layer**: Implement a type-safe API layer with tRPC (or equivalent). Backend type changes must produce frontend type errors at build time.
4. **Rendering Strategy Decision**: Given 3 different page types (blog post, user dashboard, e-commerce product listing), choose and implement the appropriate rendering strategy for each, with written justification.

#### Acceptance Criteria

| # | Criterion | How to verify |
|---|-----------|---------------|
| 8.1 | No circular cross-feature imports | Run `npx madge --circular src/`. Zero circular dependencies between feature directories. |
| 8.2 | Feature directory is self-contained | Delete a feature directory. The rest of the app must compile with only import errors pointing to the deleted feature's public API, not to internal files. |
| 8.3 | Design system components work without the parent app | The design system package builds independently (`cd packages/design-system && npm run build`). It exports components, tokens, and types. |
| 8.4 | Design tokens produce consistent theming | Change a color token value. Every component using that token must update. Verify visually across 3+ components. |
| 8.5 | API type safety catches breaking changes at build time | Change a backend response type (add/remove a field). Run `npx tsc --noEmit` on the frontend. It must produce a type error pointing to the consuming code. |
| 8.6 | Rendering strategy matches content type | Blog post: pre-rendered at build time (check for static HTML file). Dashboard: server-rendered on request (check for server response headers). Product listing: ISR with revalidation (check for cache headers). |
| 8.7 | Each rendering strategy justification references trade-offs | Written justification for each page type must mention at least: (1) how often data changes, (2) whether personalization is needed, (3) SEO requirements, (4) time-to-interactive impact. |
| 8.8 | Build produces separate chunks per feature | Run `npx vite build`. Output shows named chunks mapping to features, not a single monolithic bundle. |

---

## File Structure

```
frontend-developer/
  PLAN.md                                    # This file
  frontend-ecosystem-2026.md                 # Research: current ecosystem state
  frontend-principles-and-best-practices.md  # Research: principles + anti-patterns
  guide/
    README.md                                # Guide index and overview
    frontend-guide.pen                       # All mockups (Pencil file)
    stage-1-foundations/
      README.md                              # Chapter content + exercises + acceptance criteria
      mockups/                               # Exported images
    stage-2-component-architecture/
      README.md
      mockups/
    stage-3-state-and-data/
      README.md
      mockups/
    stage-4-usability-and-design/
      README.md
      mockups/
    stage-5-performance/
      README.md
      mockups/
    stage-6-security-and-resilience/
      README.md
      mockups/
    stage-7-testing-and-quality/
      README.md
      mockups/
    stage-8-architecture-at-scale/
      README.md
      mockups/
```

## Current Status

| Phase | Status | Notes |
|-------|--------|-------|
| Research: Ecosystem | Done | 572 lines, 12 sections, 60+ sources |
| Research: Principles | Done | 921 lines, 10 sections, 60+ sources |
| Anti-pattern audit | Done | 157 gaps identified, all addressed |
| Anti-pattern additions | Done | 23 subsections added across both docs |
| Plan with acceptance criteria | Done | This file |
| Stage directory structure | Done | 8 stage directories created |
| Guide README | Done | Overview + stage descriptions |
| Stage 1 chapter | Not started | |
| Stage 1 mockups | Not started | |
| Stages 2-8 | Not started | |

## Principles for Writing

1. **Show both paths**: Every concept gets "how to do it right" AND "how it goes wrong"
2. **Concrete over abstract**: Real code examples and real failure scenarios, not theoretical descriptions
3. **Framework-agnostic first**: Teach the principle, then show framework-specific mappings
4. **Progressive complexity**: Each stage assumes mastery of previous stages
5. **Visual + textual**: Mockups for spatial/design concepts, markdown for everything else
6. **Actionable exercises**: Not "read about X" but "build Y applying X"
7. **Measurable acceptance**: Every exercise has criteria the student can verify themselves
8. **Validation over trust**: Students run concrete checks, not self-assessments
