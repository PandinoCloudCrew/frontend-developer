# Software Development Principles & Usability Best Practices for Frontend Development

> Comprehensive, framework-agnostic reference covering SOLID, component design, state management, usability, performance, security, accessibility, and more. Compiled March 2026 from authoritative and current sources.

---

## Table of Contents

1. [SOLID Principles in Frontend](#1-solid-principles-in-frontend)
   - 1.1 [Single Responsibility Principle (SRP)](#11-single-responsibility-principle-srp)
   - 1.2 [Open/Closed Principle (OCP)](#12-openclosed-principle-ocp)
   - 1.3 [Liskov Substitution Principle (LSP)](#13-liskov-substitution-principle-lsp)
   - 1.4 [Interface Segregation Principle (ISP)](#14-interface-segregation-principle-isp)
   - 1.5 [Dependency Inversion Principle (DIP)](#15-dependency-inversion-principle-dip)
   - [Common Pitfalls & Anti-patterns](#common-pitfalls--anti-patterns)
2. [Component Design Principles](#2-component-design-principles)
   - 2.1 [Composition Over Inheritance](#21-composition-over-inheritance)
   - 2.2 [Container/Presentational Pattern](#22-containerpresentational-pattern-and-its-evolution)
   - 2.3 [Compound Components](#23-compound-components)
   - 2.4 [Render Props / Slots Pattern](#24-render-props--slots-pattern)
   - 2.5 [Higher-Order Components vs. Hooks/Composables](#25-higher-order-components-vs-hookscomposables)
   - 2.6 [Atomic Design](#26-atomic-design)
   - [Common Pitfalls & Anti-patterns](#common-pitfalls--anti-patterns-1)
3. [Separation of Concerns in Frontend](#3-separation-of-concerns-in-frontend)
   - 3.1 [UI Logic vs. Business Logic vs. Data Fetching](#31-ui-logic-vs-business-logic-vs-data-fetching)
   - 3.2 [Custom Hooks/Composables as the Universal Abstraction](#32-custom-hookscomposables-as-the-universal-abstraction)
   - 3.3 [Service Layer Patterns](#33-service-layer-patterns)
   - [Common Pitfalls & Anti-patterns](#common-pitfalls--anti-patterns-2)
4. [State Management Principles](#4-state-management-principles)
   - 4.1 [Local vs. Global State](#41-local-vs-global-state)
   - 4.2 [Server State vs. Client State](#42-server-state-vs-client-state)
   - 4.3 [Derived/Computed State](#43-derivedcomputed-state)
   - 4.4 [State Machines (XState)](#44-state-machines-xstate)
   - 4.5 [Unidirectional Data Flow](#45-unidirectional-data-flow)
   - 4.6 [Immutability](#46-immutability)
   - [Common Pitfalls & Anti-patterns](#common-pitfalls--anti-patterns-3)
5. [Usability Principles](#5-usability-principles)
   - 5.1 [Nielsen's 10 Heuristics Applied to Web](#51-nielsens-10-heuristics-applied-to-web)
   - 5.2 [Fitts's Law](#52-fittss-law)
   - 5.3 [Hick's Law](#53-hicks-law)
   - 5.4 [Gestalt Principles in UI](#54-gestalt-principles-in-ui)
   - 5.5 [Progressive Disclosure](#55-progressive-disclosure)
   - 5.6 [Cognitive Load Reduction](#56-cognitive-load-reduction)
   - 5.7 [Mobile-First Design](#57-mobile-first-design)
   - 5.8 [Responsive Design Principles](#58-responsive-design-principles)
   - [Common Pitfalls & Anti-patterns](#common-pitfalls--anti-patterns-4)
6. [Performance Principles](#6-performance-principles)
   - 6.1 [RAIL Model](#61-rail-model)
   - 6.2 [Lazy Loading Strategies](#62-lazy-loading-strategies)
   - 6.3 [Virtualization](#63-virtualization)
   - 6.4 [Memoization and When to Use It](#64-memoization-and-when-to-use-it)
   - 6.5 [Bundle Optimization](#65-bundle-optimization)
   - [Common Pitfalls & Anti-patterns](#common-pitfalls--anti-patterns-5)
7. [Error Handling Patterns](#7-error-handling-patterns)
   - 7.1 [Error Boundaries](#71-error-boundaries)
   - 7.2 [Graceful Degradation](#72-graceful-degradation)
   - 7.3 [Optimistic Updates](#73-optimistic-updates)
   - 7.4 [Retry Strategies](#74-retry-strategies)
   - [Common Pitfalls & Anti-patterns](#common-pitfalls--anti-patterns-6)
8. [Security in Frontend](#8-security-in-frontend)
   - 8.1 [XSS Prevention](#81-xss-prevention)
   - 8.2 [CSRF Protection](#82-csrf-protection)
   - 8.3 [Content Security Policy (CSP)](#83-content-security-policy-csp)
   - 8.4 [Input Sanitization](#84-input-sanitization)
   - 8.5 [Secure Authentication Patterns](#85-secure-authentication-patterns)
   - [Common Pitfalls & Anti-patterns](#common-pitfalls--anti-patterns-7)
9. [Clean Code in Frontend](#9-clean-code-in-frontend)
   - 9.1 [Naming Conventions](#91-naming-conventions)
   - 9.2 [File/Folder Organization Patterns](#92-filefolder-organization-patterns)
   - 9.3 [Code Splitting Strategies](#93-code-splitting-strategies)
   - 9.4 [DRY vs. WET in Components](#94-dry-vs-wet-in-components)
   - [Common Pitfalls & Anti-patterns](#common-pitfalls--anti-patterns-8)
10. [Accessibility as a Principle](#10-accessibility-as-a-principle)
    - 10.1 [Semantic HTML First](#101-semantic-html-first)
    - 10.2 [ARIA When Needed](#102-aria-when-needed)
    - 10.3 [Keyboard Navigation](#103-keyboard-navigation)
    - 10.4 [Focus Management](#104-focus-management)
    - 10.5 [Screen Reader Considerations](#105-screen-reader-considerations)
    - [Common Pitfalls & Anti-patterns](#common-pitfalls--anti-patterns-9)
11. [Summary of Key Themes](#summary-of-key-themes)
12. [Sources](#sources)

---

## 1. SOLID Principles in Frontend

Though originally formulated for object-oriented programming, the SOLID principles translate remarkably well to component-based frontend architectures. Apply them where complexity justifies the structure -- not everywhere reflexively -- starting with components that are complex, frequently modified, or widely reused.

### 1.1 Single Responsibility Principle (SRP)

**Definition:** A component should have one reason to change -- it should do one thing and do it well.

**Frontend Application:**
- Each component handles exactly one concern: rendering a form, displaying a card, managing a modal.
- Separate UI rendering from data fetching and business logic. A `UserProfile` component renders the profile; a `useUserProfile` hook fetches and manages the data.
- If a component file exceeds ~200 lines or handles multiple unrelated concerns, it likely violates SRP.
- Applies equally to hooks/composables: `useFormValidation` should validate forms, not also manage API calls.

**Practical Guidance:**
- Ask: "What is the single reason this component would need to change?"
- Extract side effects (API calls, subscriptions, timers) into custom hooks or services.
- Split "god components" into smaller, focused sub-components.

### 1.2 Open/Closed Principle (OCP)

**Definition:** Software entities should be open for extension but closed for modification.

**Frontend Application:**
- Use **composition** to extend components rather than modifying their internals. A `Card` component accepts `children`, `header`, and `footer` slots/props rather than having conditional logic for every card variant.
- **Render props and slot patterns** allow consumers to inject custom rendering behavior without touching the base component.
- Design component APIs with sensible defaults that can be overridden via props.
- Configuration objects and strategy patterns allow behavioral extension without source changes.

**Practical Guidance:**
- Favor `children` and render props over boolean flags that multiply internal branches.
- Use the compound component pattern (see Section 2) to allow composition of new behaviors.
- Design component libraries where new variants are created by composing existing primitives, not by adding `if/else` chains.

### 1.3 Liskov Substitution Principle (LSP)

**Definition:** Derived types must be substitutable for their base types without altering correctness.

**Frontend Application:**
- Component variants (`ArticleCard`, `FeaturedArticleCard`, `CompactArticleCard`) should all implement the same core interface. Anywhere that accepts an `ArticleCard` should accept any variant without breaking.
- LSP functions as an unwritten **contract** between components, functions, and hooks: extending or modifying something must not break existing behavior.
- Derived components must support the same props, methods, and expected behaviors as the base component, while potentially adding additional features.

**Practical Guidance:**
- When creating specialized versions of a component, ensure they accept (at minimum) the same props as the base.
- TypeScript/generics help enforce this: extend the base props interface rather than creating an unrelated one.
- Wrapper components should forward all relevant props and refs to the underlying component.
- Test substitutability: replace a base component with a derived one in existing usage sites; nothing should break.

### 1.4 Interface Segregation Principle (ISP)

**Definition:** Clients should not be forced to depend on interfaces they do not use.

**Frontend Application:**
- Keep prop interfaces minimal and focused. An `ArticleCard` only requires article data and optional handlers -- it should not know about filters, pagination, or loading states.
- Avoid "mega-props" objects that force consumers to provide irrelevant data.
- Split large component APIs into smaller, composable pieces.

**Practical Guidance:**
- If a component accepts more than 7-10 props, consider whether it is doing too much (SRP violation) or whether props should be grouped into logical sub-interfaces.
- Use TypeScript's `Pick`, `Omit`, and intersection types to create focused prop interfaces from shared base types.
- Prefer multiple small hooks over one monolithic hook with many return values.

### 1.5 Dependency Inversion Principle (DIP)

**Definition:** High-level modules should not depend on low-level modules; both should depend on abstractions.

**Frontend Application:**
- A user list component should not contain logic to fetch users directly. Instead, it depends on an abstract hook like `useUsers()` or receives users via props/state management.
- Framework-specific implementations across React, Vue, and Angular:
  - **React:** Dependencies wired via props, hooks, and Context. A `Login` component depends on an `authService` abstraction, not a specific API method.
  - **Vue:** `provide()` and `inject()` pass dependencies down the component tree.
  - **Angular:** `@Injectable()` services with hierarchical injectors; the most mature DI system in frontend.
- Replacing a low-level `axios` request with `fetch` or adding a caching layer with SWR/TanStack Query should not require refactoring the consumer component.

**Practical Guidance:**
- Define service interfaces (TypeScript interfaces or duck-typed contracts) that components depend on.
- Use React Context, Vue's provide/inject, or Angular's DI to inject implementations.
- This makes testing dramatically easier: inject mocks instead of mocking HTTP libraries globally.
- Libraries like `@wroud/di` (with `@wroud/di-react`) provide reflection-free IoC containers for JavaScript.

### Common Pitfalls & Anti-patterns

- **Over-engineering SOLID in simple apps.** Applying DIP with full interface-implementation-factory layers for a single API endpoint creates indirection with no benefit. SOLID is a tool for managing complexity -- if the complexity is not there, neither should the structure be.
- **SRP taken to extremes: nano-components.** Splitting a component into `ButtonWrapper`, `ButtonLabel`, `ButtonIcon`, and `ButtonClickHandler` makes the code harder to follow than a single, moderately-sized `Button` component. SRP means one *reason to change*, not one *line of code*.
- **OCP used to justify premature generalization.** Building an extensible plugin architecture for a card component before a second variant exists wastes effort. You cannot design the right extension points without knowing what the actual extensions will be. Wait for at least two concrete use cases.
- **Cargo-culting service layers.** Creating `IUserRepository` + `UserRepositoryImpl` + `UserRepositoryFactory` to wrap a single `fetch('/api/users')` call adds three files of boilerplate with no testability or flexibility gain. Abstract when you have a reason to swap implementations, not before.
- **LSP violations through partial interface implementation.** A component variant that accepts a prop from its base interface but silently ignores it violates substitutability. If `CompactArticleCard` accepts `onExpand` but never calls it, consumers are misled and bugs will follow.
- **ISP violation through "options bag" props.** Passing a single `options` object that bundles unrelated concerns (pagination config, theme overrides, analytics hooks) forces consumers to know about -- and potentially provide -- properties they do not use. Split into focused, composable prop groups.

---

## 2. Component Design Principles

### 2.1 Composition Over Inheritance

**Core Principle:** Build complex UI from small, reusable pieces composed together, rather than through class hierarchies.

- In frontend, inheritance of components leads to rigid hierarchies that are hard to refactor.
- Composition via `children`, slots, render props, and hooks allows flexible assembly of UI and behavior.
- Every major framework endorses composition: React's explicit recommendation, Vue's slots and Composition API, Angular's content projection, Svelte's slots.

### 2.2 Container/Presentational Pattern (and Its Evolution)

**Classic Pattern:**
- **Container (Smart) Components:** Concerned with *how things work*. Handle data fetching, state management, and side effects. Provide data and callbacks to presentational components.
- **Presentational (Dumb) Components:** Concerned with *how things look*. Receive everything via props. Purely render UI. Easy to test and reuse.

**Evolution (2025):**
- With hooks (React) and composables (Vue 3), the rigid boundary between container and presentational components has blurred.
- Custom hooks encapsulate the "container" logic, making separate container components often unnecessary.
- **Still valuable in enterprise-scale applications:** Keeping logic separate from UI enables teams to swap UIs without touching underlying logic, simplifies testing (presentational components are pure), and aids reusability.
- **Guideline:** Do not force this structure on every component. Use it where the separation provides clear benefits -- typically in complex features with significant data/logic requirements.

### 2.3 Compound Components

**Pattern:** Multiple components share implicit state through context, forming a cohesive unit where the parent manages state and children consume it.

```
<Select>
  <Select.Trigger />
  <Select.Options>
    <Select.Option value="a">Option A</Select.Option>
    <Select.Option value="b">Option B</Select.Option>
  </Select.Options>
</Select>
```

- Used extensively by component libraries like Radix UI, Headless UI, and Reach UI.
- Provides flexibility: consumers control structure and rendering while the compound component manages behavior.
- Complements Atomic Design by enabling flexible, customizable components within a structured hierarchy.

### 2.4 Render Props / Slots Pattern

- **Render Props (React):** A component accepts a function as a prop that returns JSX, delegating rendering decisions to the consumer while managing state internally.
- **Slots (Vue/Svelte/Web Components):** Named and scoped slots allow parent components to inject content into specific areas of a child component, with the child providing data to the slot.
- Both patterns enable the Open/Closed Principle: base components can be extended without modification.
- **Modern status:** While hooks have replaced many render prop use cases, render props remain useful for components where the rendering delegation pattern is the primary concern (e.g., headless UI libraries, virtualized lists).

### 2.5 Higher-Order Components vs. Hooks/Composables

**HOC Era (Legacy):**
- HOCs wrap components to inject props or behavior (e.g., `withAuth`, `withTheme`).
- Problems: wrapper hell (deeply nested component trees), prop collision, difficult debugging, obscured component hierarchy.

**Modern Era -- Hooks and Composables:**
- **React Hooks / Vue Composables / Svelte Stores:** Encapsulate reusable stateful logic without wrapping components.
- Hooks compose linearly (no nesting), are explicit about their dependencies, and are easier to type with TypeScript.
- Custom hooks have largely replaced HOCs and many render prop use cases.
- **When HOCs still apply:** Cross-cutting concerns that need to wrap the component itself (e.g., error boundaries, providers, layout wrappers).

### 2.6 Atomic Design

**Brad Frost's Five Levels:**

| Level | Description | Examples |
|-------|-------------|----------|
| **Atoms** | Basic UI building blocks | Button, Input, Icon, Label |
| **Molecules** | Groups of atoms functioning together | Search bar (input + button), Form field (label + input + error) |
| **Organisms** | Complex UI sections composed of molecules | Navigation bar, Product card grid, Registration form |
| **Templates** | Page-level layouts without real data | Dashboard layout, Article page layout |
| **Pages** | Templates populated with real content | Actual dashboard with live data |

**2025 Perspective:**
- For **UI-heavy projects with little business complexity**, Atomic Design works well as an organizational methodology.
- For **complex applications with significant business logic**, methodologies like **Feature-Sliced Design** or **Modular Architecture** are better suited because they organize by business domain rather than just UI granularity.
- Atomic Design and Compound Components are complementary -- Atomic Design provides structure and hierarchy, while Compound Components enhance flexibility.
- Many teams use a hybrid: Atomic Design for the shared design system/component library, feature-based organization for application code.

### Common Pitfalls & Anti-patterns

- **God components disguised as "containers."** A container component with 15 hooks, 40 props, and 500 lines of orchestration logic is not a container -- it is a god object. Break it into smaller composable pieces, each managing a focused concern.
- **Compound component overuse.** When a simple component with 3 props (`label`, `value`, `onChange`) would suffice, forcing a compound pattern (`<Field><Field.Label /><Field.Input /><Field.Error /></Field>`) adds API surface and cognitive overhead for no flexibility gain. Use compound components when consumers genuinely need structural control.
- **Prop drilling panic.** Jumping to Context or global state the moment you pass a prop through two levels is premature. Try component composition first: pass entire components as children or props to skip intermediate layers. Context has re-render costs and hides data flow.
- **Atomic Design level ambiguity causing bikeshedding.** Teams lose hours debating whether a component is a "molecule" or an "organism." If the classification is not obvious, the distinction is not adding value. Use Atomic Design as a loose mental model, not a rigid taxonomy.
- **Render props creating callback hell.** Deeply nested render functions (`<Auth>{user => <Data user={user}>{data => <Theme>{theme => ...}</Theme>}</Data>}</Auth>`) are unreadable. If you have more than one level of render prop nesting, refactor to hooks.
- **Premature abstraction of "reusable" components.** Building a fully generic, configurable `<DataTable>` before understanding all the actual table variants leads to a wrong abstraction that every consumer fights against. Build the concrete versions first, then extract what is genuinely shared.

---

## 3. Separation of Concerns in Frontend

### 3.1 UI Logic vs. Business Logic vs. Data Fetching

Modern frontend architecture benefits from clear layering:

| Layer | Responsibility | Example |
|-------|---------------|---------|
| **UI/Presentation** | Rendering, styling, user interaction, animation | React components, Vue templates, CSS |
| **Business Logic** | Domain rules, validation, computation, transformations | Pure functions, domain models, validation schemas |
| **Data/Infrastructure** | API calls, caching, persistence, external service communication | Fetch wrappers, API clients, storage adapters |

**Key Insight:** Business logic should be **framework-agnostic** -- pure functions and classes that can be tested independently and potentially shared across platforms (web, mobile, server).

### 3.2 Custom Hooks/Composables as the Universal Abstraction

Custom hooks (React), composables (Vue 3), and reactive stores (Svelte) have emerged as the dominant abstraction for separating concerns:

- **Encapsulation:** A `useCheckout()` hook contains all checkout-related state, validation, and API orchestration. The component just calls it and renders.
- **Composability:** Hooks compose with other hooks. `useCheckout` can internally use `useCart`, `usePayment`, and `useShipping`.
- **Testability:** Hooks can be tested in isolation from the UI.
- **Reusability:** The same hook works in different visual contexts.

**Recommended Architecture:**
```
src/
  components/        # Purely presentational code
  hooks/ (or composables/)  # Stateful UI logic
  use-cases/         # Framework-agnostic business logic
  services/          # API clients, external integrations
  lib/               # Integration points, utilities
```

### 3.3 Service Layer Patterns

**Clean Architecture / Hexagonal Architecture in Frontend:**
- **Domain Layer:** Framework-agnostic models and pure business logic functions.
- **Application Layer (Use Cases):** Orchestrates domain logic and service calls.
- **Infrastructure Layer:** API clients, storage adapters, third-party integrations. Swapping an API provider only touches this layer.
- **Presentation Layer:** Components and hooks that consume the application layer.

**Dependency Inversion in the Service Layer:**
- Components depend on hooks, hooks depend on use-case abstractions, use cases depend on service port interfaces.
- Concrete implementations (axios adapter, fetch adapter) are injected, not imported directly.

**Backend for Frontend (BFF) Pattern:**
- An intermediary server layer aggregates microservice calls, simplifying the frontend's data-fetching logic.
- Provides a single API tailored to frontend needs, reducing client-side complexity.

**Four-Layer Frontend Architecture (emerging pattern):**
1. Presentation (components)
2. Application (hooks/composables orchestrating use cases)
3. Domain (business rules, models)
4. Infrastructure (APIs, storage, external SDKs)

### Common Pitfalls & Anti-patterns

- **Over-layering / architecture astronautics.** Implementing a full four-layer Clean Architecture with ports, adapters, use-case interactors, and domain models for a five-screen CRUD app is pure overhead. Match architectural complexity to application complexity.
- **Service layers that are pure pass-through.** A `UserService` that calls `UserRepository.getUser()` and returns the result unchanged adds a file, an import, and a mental indirection hop for zero value. Add a service layer when it actually orchestrates, transforms, or enforces business rules.
- **Hooks/composables becoming god objects.** A 500-line `useCheckout` hook managing 15 pieces of state, 8 side effects, and 6 derived values is a god component in disguise. Decompose it into focused, composable hooks (`useCartItems`, `useShipping`, `usePayment`).
- **Framework-agnostic purity taken too far.** Abstracting every React-specific API behind a framework-agnostic interface when you only target one platform (and have no plans to change) adds complexity without benefit. Write framework-agnostic *business logic*; let UI integration code use the framework idiomatically.
- **BFF pattern without justification.** Adding a Backend for Frontend layer introduces a separate deployment unit, a second codebase to maintain, and an extra network hop of latency. Only adopt BFF when you genuinely need to aggregate multiple microservices, handle auth token exchange, or tailor data shapes that the backend team cannot provide.
- **Scattering colocated concerns across directories.** Placing a component in `components/`, its hook in `hooks/`, its types in `types/`, and its tests in `__tests__/` when they always change together forces developers to touch four directories for every modification. Colocate files that change together.

---

## 4. State Management Principles

### 4.1 Local vs. Global State

| Aspect | Local State | Global State |
|--------|------------|--------------|
| **Scope** | Single component or small subtree | Entire app or large feature area |
| **Examples** | Form input values, toggle states, UI animations | Authenticated user, theme, shopping cart |
| **Tools** | `useState`, `ref()`, component state | Redux, Zustand, Pinia, NgRx, Svelte stores |
| **Guideline** | Default to local; lift only when needed | Use sparingly; only for truly shared state |

**Modern Principle (2026):** Most of the time you do not need a "state management library" at all. The days of putting everything into Redux are over. Break your state into different concerns -- this yields better solutions than any "generic" state management library.

### 4.2 Server State vs. Client State

One of the biggest paradigm shifts in recent years: **server data and UI state are fundamentally different concerns**.

| Aspect | Server State | Client State |
|--------|-------------|--------------|
| **Nature** | Asynchronous, shared, potentially stale | Synchronous, local, always current |
| **Concerns** | Caching, deduplication, invalidation, retries, pagination, optimistic updates | UI toggles, form state, navigation |
| **Tools** | TanStack Query, SWR, RTK Query, Apollo Client | useState, Zustand, Jotai, Pinia, Signals |

**Key Insight:** Data-fetching libraries like TanStack Query or SWR solve caching, deduplication, invalidation, retries, pagination, and optimistic updates out of the box. Treating server data with a generic state manager (like vanilla Redux) duplicates work that these libraries handle better.

### 4.3 Derived/Computed State

**Principle:** Never store state that can be computed from other state. Derive it.

- **React:** `useMemo` for expensive computations; plain variables in render for cheap ones.
- **Vue:** `computed()` properties automatically track dependencies and cache results.
- **Angular:** Computed Signals (`computed()`) derive state declaratively. NgRx Signal Store combines NgRx structure with Signal performance.
- **Svelte:** Reactive declarations (`$:`) derive state automatically.
- **Libraries:** Jotai's atoms and selectors create graph-based derived state. Recoil pioneered this pattern.

**Benefit:** Eliminates state synchronization bugs. One source of truth, many derived views.

### 4.4 State Machines (XState)

**Principle:** Model complex state transitions explicitly to avoid invalid states.

- State machines enumerate every possible state and the transitions between them.
- **XState** provides state machines and statecharts for explicit, testable flows.
- Particularly valuable for: multi-step forms, authentication flows, complex UI interactions (drag-and-drop), payment processes.
- Events serve as the source of truth; state transitions are pure functions; side effects are declared, not embedded.

**When to Use:**
- When a feature has more than 3-4 states with non-trivial transitions.
- When "impossible states" are a recurring bug source (e.g., a form that is both "submitting" and "editing").
- When you need a visual diagram of the state flow for communication with non-developers.

### 4.5 Unidirectional Data Flow

**Principle:** Data flows in one direction: from state, through the view, to actions that update state.

```
State --> View --> User Action --> State Update --> State --> View ...
```

- Enforced by centralizing state and ensuring updates occur in a linear, controlled manner.
- Core to Redux/Flux architecture, Angular's component tree, and Vue's props-down/events-up pattern.
- **Benefits:** Predictable behavior, easier debugging (time-travel debugging), clear data provenance.
- All major frameworks enforce or strongly encourage this: React's one-way data binding, Angular's unidirectional data flow checks, Vue's props-down/events-up.

### 4.6 Immutability

**Principle:** State objects must not be directly mutated. Every change creates a new copy.

- Enables change detection (React's re-render optimization, Redux's shallow equality checks).
- Makes state changes explicit and auditable.
- Simplifies debugging: compare previous and next state objects.
- **Tools:** Immer (structural sharing for ergonomic immutable updates), native spread operators, `Object.freeze()` for development-time enforcement.
- Angular Signals and Vue's reactivity system handle this internally, but the principle still applies at the architectural level.

### Common Pitfalls & Anti-patterns

- **Derived state chains becoming circular or stale.** When A derives B, B derives C, C derives D, and D somehow influences A, you get cascading re-renders and subtle staleness bugs. Keep derivation graphs acyclic and shallow. If a chain has more than two levels, reconsider the state shape.
- **`useMemo` with incorrect dependency arrays.** Missing a dependency silently returns stale cached values; including an unstable reference (inline object, unsaved function) defeats memoization entirely. Lint rules (`react-hooks/exhaustive-deps`) exist for a reason -- do not suppress them without a clear justification.
- **State machine overkill.** Reaching for XState to manage a boolean toggle or a two-state loading flag adds significant learning curve and boilerplate for something `useState(false)` handles perfectly. State machines earn their weight for flows with 4+ states and non-trivial transitions.
- **Immutability performance traps.** Spreading large objects on every frame (`{...bigObject, x: newX}`) at 60fps creates garbage collection pressure. For animation-frequency updates, use mutable refs or dedicated animation libraries (Framer Motion, GSAP) that bypass React's render cycle.
- **URL state neglected.** Filters, pagination, sort order, and active tabs belong in the URL so users can share, bookmark, and use browser back/forward. Storing these only in component state breaks fundamental web expectations.
- **Unidirectional flow violated by `useRef` mutations.** Mutating a ref's `.current` value to store state that affects rendering without triggering a re-render creates invisible state that the UI does not reflect. Refs are for values that do *not* affect output; for everything else, use state.
- **"Just put it in the store" anti-pattern.** Form input values, modal open/close booleans, and ephemeral UI state do not belong in global state. Global stores should hold data that is genuinely shared across distant parts of the application. Local state is the default.

---

## 5. Usability Principles

### 5.1 Nielsen's 10 Heuristics Applied to Web

Jakob Nielsen's 10 usability heuristics remain the most widely referenced framework for evaluating interface design:

| # | Heuristic | Web Application |
|---|-----------|-----------------|
| 1 | **Visibility of System Status** | Loading indicators, progress bars, toast notifications, save confirmations |
| 2 | **Match Between System and Real World** | Use familiar terminology, natural language labels, intuitive iconography |
| 3 | **User Control and Freedom** | Undo/redo, clear "back" navigation, easy-to-dismiss modals, "Cancel" buttons |
| 4 | **Consistency and Standards** | Follow platform conventions, consistent component behavior, predictable navigation |
| 5 | **Error Prevention** | Confirmations for destructive actions, input constraints, disabled buttons for invalid states |
| 6 | **Recognition Rather Than Recall** | Visible navigation, recent searches, autocomplete, contextual help |
| 7 | **Flexibility and Efficiency of Use** | Keyboard shortcuts, customizable dashboards, quick actions for power users |
| 8 | **Aesthetic and Minimalist Design** | Remove unnecessary elements, clear visual hierarchy, focused content |
| 9 | **Help Users Recognize, Diagnose, and Recover from Errors** | Clear error messages with remediation steps, inline validation, highlighted problem fields |
| 10 | **Help and Documentation** | Searchable help, onboarding tours, contextual tooltips |

### 5.2 Fitts's Law

**The time to acquire a target is a function of the distance to and size of the target.**

- **Make clickable targets large enough** -- minimum 44x44px for touch targets (Apple HIG), 48x48dp (Material Design).
- **Place frequently-used actions within easy reach** -- primary actions in the thumb zone on mobile, near the current focus area on desktop.
- **Reduce distance** between related actions (e.g., a "Save" button near the form it saves).
- Especially critical for mobile design where precise interactions are challenging.
- **Edge and corner advantage:** Buttons at screen edges or corners are effectively infinitely deep targets (the cursor stops at the edge), making them faster to acquire.

### 5.3 Hick's Law

**The time to make a decision increases with the number and complexity of choices.**

- **Reduce choices:** Group related options, use progressive disclosure, limit visible navigation items.
- **Simplify navigation** by categorizing and chunking options.
- **Decision aids:** Recommend defaults, highlight popular choices, provide comparison tools.
- **Search and filter** as alternatives to scanning long lists.

### 5.4 Gestalt Principles in UI

Gestalt psychology principles describe how humans naturally perceive and group visual elements:

| Principle | Application in UI |
|-----------|-------------------|
| **Proximity** | Group related items close together (form labels near inputs, related actions together) |
| **Similarity** | Consistent styling for similar elements (all links one color, all buttons one shape) |
| **Closure** | Users complete incomplete shapes (progress indicators, card layouts with clipped content) |
| **Continuity** | Align elements to create visual flow (grids, timelines, breadcrumbs) |
| **Common Region** | Use borders, backgrounds, or cards to group related content |
| **Figure/Ground** | Clear contrast between primary content and background; modal overlays |

### 5.5 Progressive Disclosure

**Reveal information and options only when they are needed, keeping interfaces clean and focused.**

- Main interface shows essential actions; secondary content is accessible through tabs, expandable sections, or modal windows.
- **Limit disclosure levels to fewer than three.** If a design requires more, reorganize the content.
- Common implementations: accordion sections, "Show more" links, wizard/step-by-step flows, expandable menus.
- Reduces cognitive overload by presenting only the most relevant data at each step.
- Especially important on mobile where screen real estate is limited.

### 5.6 Cognitive Load Reduction

- **Chunk information:** Break long forms into logical steps, paginate long lists, group related settings.
- **Sensible defaults:** Pre-fill forms with intelligent defaults to reduce required decisions.
- **Visual hierarchy:** Use size, color, contrast, and spacing to guide attention to what matters most.
- **Consistent patterns:** Once users learn an interaction pattern, reuse it across the application.
- **Eliminate unnecessary decisions:** Auto-detect when possible (timezone, locale, currency).

### 5.7 Mobile-First Design

**Design for the smallest, most constrained viewport first, then progressively enhance for larger screens.**

- Forces prioritization of essential content and features.
- CSS: write base styles for mobile, then use `min-width` media queries to add complexity for larger screens.
- Touch targets: minimum 44x44px, with adequate spacing between interactive elements.
- Navigation: hamburger menus for secondary navigation, but keep critical navigation visible.
- Performance: mobile networks are slower; optimize assets and defer non-essential loading.

### 5.8 Responsive Design Principles

- **Fluid layouts:** Use relative units (%, vw, vh, rem, em) and CSS Grid/Flexbox over fixed pixel widths.
- **Breakpoints based on content, not devices.** Add breakpoints where the layout breaks, not at arbitrary device widths.
- **Responsive images:** `srcset`, `<picture>`, and CSS `object-fit` for appropriate image sizing.
- **Container queries (modern CSS):** Style components based on their container's size, not the viewport -- enabling truly modular responsive components.
- **Typography:** Fluid type scales using `clamp()` for smooth scaling across viewports.

### Common Pitfalls & Anti-patterns

- **Dark patterns.** Confirm-shaming ("No thanks, I don't want to save money"), forced continuity (auto-enrolling trials without clear cancellation), hidden costs revealed at checkout, and misdirection (visually emphasizing the option that benefits the business, not the user) erode trust and may violate regulations. Design for the user's benefit, not against them.
- **Progressive disclosure hiding critical features.** If users cannot find a feature because it is buried behind three levels of disclosure, the feature effectively does not exist. Progressively disclose *secondary* options, not primary workflows. User research and analytics should validate what belongs at each level.
- **Mobile-first that ignores desktop.** Designing for 375px first is good practice, but shipping a single-column layout on a 27-inch monitor wastes screen real estate and frustrates desktop users. Mobile-first means *start* with mobile, then *enhance* for larger viewports -- not stop at mobile.
- **Toast notification fatigue.** Showing a toast for every minor action ("Settings saved," "Item added," "Profile updated") trains users to ignore all notifications, including important ones. Reserve toasts for outcomes that are uncertain, asynchronous, or require attention. For expected, synchronous results, subtle inline confirmation is sufficient.
- **Misapplying Fitts's Law to justify massive buttons everywhere.** Fitts's Law describes *relative* target acquisition time, not an instruction to make every element oversized. Enormous buttons crowd out content, break visual hierarchy, and do not improve usability when there is no precision challenge.
- **Hick's Law used to remove features instead of organizing them.** Reducing choices does not mean deleting features users need. It means grouping, categorizing, providing defaults, and using progressive disclosure to manage complexity without sacrificing capability.
- **Inconsistency disguised as creativity.** Custom scrollbars, non-standard form controls, novel navigation patterns, and reimagined checkboxes force users to relearn interactions they already know. Platform conventions exist because users have already learned them. Deviate only when the UX gain clearly outweighs the learning cost.
- **Responsive breakpoints based on specific device widths.** Breakpoints at 375px, 768px, and 1024px target today's popular devices but break on tomorrow's. Set breakpoints where *your content* breaks, not where current devices happen to measure.

---

## 6. Performance Principles

### 6.1 RAIL Model

Google's user-centric performance model. While the industry has shifted toward Core Web Vitals as the primary measurement standard, RAIL remains a valuable mental framework:

| Metric | Target | Description |
|--------|--------|-------------|
| **Response** | < 100ms | Respond to user input (clicks, taps, key presses) within 100ms |
| **Animation** | < 16ms per frame | Produce each frame in under 16ms for 60fps animations |
| **Idle** | < 50ms chunks | Use idle time for deferred work; keep individual tasks under 50ms to remain responsive |
| **Load** | < 1000ms | Deliver interactive content within 1 second on mid-range mobile devices |

**Core Web Vitals (current measurement standard):**
- **LCP (Largest Contentful Paint):** < 2.5 seconds
- **INP (Interaction to Next Paint):** < 200ms
- **CLS (Cumulative Layout Shift):** < 0.1

### 6.2 Lazy Loading Strategies

- **Route-based code splitting:** Load code for each route/page only when the user navigates to it. Supported natively by all major frameworks and bundlers.
- **Component-level lazy loading:** `React.lazy()`, Vue's `defineAsyncComponent()`, Angular's lazy-loaded modules.
- **Image lazy loading:** Native `loading="lazy"` attribute, Intersection Observer for custom implementations.
- **Below-the-fold content:** Defer loading of content not visible in the initial viewport.
- **Prioritize the critical rendering path:** Load what is needed for the initial view first; defer everything else to idle time.

### 6.3 Virtualization

**Render only visible items in the viewport** for large lists and tables.

- Dramatically reduces DOM nodes (from potentially thousands to tens).
- Libraries: `react-window`, `react-virtualized`, `@tanstack/virtual`, Vue Virtual Scroller, Angular CDK Virtual Scroll.
- **When to use:** Lists exceeding ~100 items, data tables, infinite scroll feeds.
- **Trade-offs:** Adds complexity, may affect accessibility (screen readers cannot see off-screen items), requires fixed or estimable item heights for best performance.

### 6.4 Memoization and When to Use It

**Memoization caches the result of expensive computations or prevents unnecessary re-renders.**

- **React:** `React.memo()` for component memoization, `useMemo` for computed values, `useCallback` for stable function references.
- **Vue:** Computed properties are automatically memoized. `v-memo` for template-level memoization.
- **Angular:** `OnPush` change detection strategy, pure pipes.

**When to Use:**
- Expensive calculations that would re-run on every render.
- Components that receive complex props and render large subtrees.
- Stable callback references needed for child component optimization or effect dependencies.

**When NOT to Use:**
- Simple calculations (the memoization overhead exceeds the computation cost).
- Components that re-render infrequently anyway.
- Premature optimization -- profile first, then memoize proven bottlenecks.

### 6.5 Bundle Optimization

- **Tree shaking:** Import only what you use. Modern bundlers (Vite, webpack 5, Rollup, esbuild) eliminate unused exports.
- **Code splitting:** Route-based and dynamic `import()` to create smaller initial bundles.
- **Dependency analysis:** Regularly audit bundle size with tools like `webpack-bundle-analyzer`, `source-map-explorer`, or Vite's built-in analysis.
- **Externalize large dependencies:** Consider CDN-hosted versions of large, stable libraries.
- **Modern syntax targets:** Ship ES2020+ to modern browsers (smaller output), with legacy bundles only for browsers that need them.
- **Compression:** Brotli (preferred) or gzip for all text-based assets.
- Bundle size directly impacts First Contentful Paint (FCP) and Largest Contentful Paint (LCP).

### Common Pitfalls & Anti-patterns

- **Premature optimization.** Spending hours optimizing a render path that accounts for 1% of total render time while ignoring the unoptimized 60% is wasted effort. Profile first with browser DevTools, React Profiler, or framework-specific tools. Optimize the measured bottleneck, not the suspected one.
- **`React.memo()` everywhere with broken memoization.** Wrapping every component in `React.memo()` while passing inline objects (`style={{ color: 'red' }}`), inline functions (`onClick={() => ...}`), or new arrays as props silently defeats memoization on every render. The component re-renders anyway, but now with the added overhead of a shallow comparison. Stabilize references before memoizing.
- **Premature code splitting.** Lazy-loading a 5KB component introduces a loading state, a network round trip, and layout shift -- costs that exceed the bytes saved. Code-split at meaningful boundaries (routes, heavy features like charting libraries) where the chunk is large enough to justify the trade-off.
- **`loading="lazy"` on hero/LCP images.** Applying lazy loading to the largest image in the initial viewport *delays* the Largest Contentful Paint because the browser waits until the image enters the viewport intersection before fetching. Eagerly load above-the-fold images; lazy-load only below-the-fold content.
- **Tree shaking broken by CommonJS or side-effectful barrel files.** A barrel file (`index.ts`) that re-exports everything from a package forces the bundler to include the entire package if *any* export is used. CommonJS (`require`) is not statically analyzable and defeats tree shaking entirely. Use ES modules and mark packages as `sideEffects: false` in `package.json`.
- **Over-splitting vendor bundles to CDNs.** Loading libraries from third-party CDNs introduces a single point of failure (CDN outage breaks your app), negates HTTP/2 multiplexing gains, and modern browsers partition caches by origin so cross-site caching no longer works. Self-host and bundle your dependencies.
- **CLS from lazy-loaded components without skeleton placeholders.** Lazy-loading a component that pushes content down when it appears causes Cumulative Layout Shift. Reserve the space with a skeleton, placeholder, or explicit dimensions before the component loads.

---

## 7. Error Handling Patterns

### 7.1 Error Boundaries

- **React Error Boundaries:** Class components (or libraries like `react-error-boundary`) that catch JavaScript errors anywhere in their child component tree, log them, and display a fallback UI instead of crashing the entire application.
- **Strategic placement:** Place error boundaries around independent feature areas so a failure in one area (e.g., a date-picker in a booking flow) does not take down the entire page.
- **Vue:** `errorCaptured` lifecycle hook and `onErrorCaptured` Composition API.
- **Angular:** Global `ErrorHandler` class for centralized error handling.
- **Svelte:** Does not have built-in error boundaries; use try-catch in load functions and `{#await}` blocks.

### 7.2 Graceful Degradation

- When a feature fails, **reduce functionality rather than crashing entirely**.
- If an API call fails, display cached data with a stale-data indicator rather than an empty screen.
- If a third-party widget fails to load, show a fallback or hide the widget rather than breaking the page.
- **Feature detection** (not browser detection): check if an API/feature is available before using it, and provide alternatives when it is not.
- Progressive enhancement is the complementary approach: start with a baseline experience, then enhance for capable environments.

### 7.3 Optimistic Updates

- **Immediately update the UI** as if the operation succeeded, then confirm with the server in the background.
- If the server operation fails, **automatically rollback** the UI to the previous state and notify the user.
- Common use cases: liking/favoriting, adding to cart, toggling settings, sending messages.
- **Critical rule:** Only use optimistic updates for operations that are very likely to succeed. For risky operations (payments, bookings), use loading states instead.
- TanStack Query, SWR, and Apollo Client have built-in support for optimistic updates with automatic rollback.

### 7.4 Retry Strategies

- **Exponential backoff:** Wait an exponentially increasing amount of time between retries (e.g., 1s, 2s, 4s, 8s) to avoid overwhelming a struggling service.
- **Jitter:** Add random variation (typically plus or minus 20%) to backoff intervals to prevent "thundering herd" problems where all clients retry simultaneously.
- **Limit retries:** Typically 3-5 attempts before giving up and showing an error.
- **Idempotency is critical:** Only retry idempotent operations (GET, read operations). For non-idempotent operations (payments, orders), use idempotency keys so the backend can protect against duplicates.
- TanStack Query and SWR have configurable retry strategies built in.

### Common Pitfalls & Anti-patterns

- **Swallowing errors silently.** Empty `catch` blocks (`catch (e) {}`) or `console.log`-only catches hide failures from users and developers alike. Every caught error should either be surfaced to the user, reported to an error tracking service, or have a documented reason for being intentionally ignored.
- **Error boundaries hiding bugs during development.** A friendly "Something went wrong" fallback in development masks the actual error and stack trace, slowing debugging. Configure error boundaries to show full error details in development and friendly fallbacks only in production.
- **Generic error messages for every failure.** Showing "Something went wrong" for a network timeout, a validation failure, and a 403 Forbidden gives users no path to resolution. Map error types to specific, actionable messages: "Connection lost -- check your network," "You don't have permission to view this," etc.
- **Retry without user visibility.** Silently retrying a failed POST request can cause duplicate side effects (double charges, duplicate submissions). Make retries visible to the user, or ensure the operation is idempotent before retrying automatically.
- **Optimistic update rollback without notification.** The UI shows a "like" succeeded, then silently reverts it seconds later when the server rejects the request. Users lose trust when actions appear to succeed then quietly undo themselves. Always notify users when a rollback occurs.
- **Catching errors at the wrong granularity.** A single error boundary at the app root means any failure in any component replaces the entire application with a fallback. Conversely, wrapping every small component is excessive. Place boundaries around independent feature areas so a failure in one section does not take down unrelated sections.
- **Unhandled promise rejections in `useEffect`.** Async functions inside `useEffect` that lack `.catch()` handling or try/catch wrappers produce unhandled promise rejections. These are silent in many environments and can leave the UI in an inconsistent state. Always handle the error path of every async operation.

---

## 8. Security in Frontend

### 8.1 XSS Prevention

**Cross-Site Scripting (XSS) remains one of the most prevalent web vulnerabilities.**

- **Framework auto-escaping:** React, Vue, Angular, and Svelte automatically escape data rendered in templates/JSX. This is your first line of defense.
- **Dangerous APIs to avoid:** React's `dangerouslySetInnerHTML`, Vue's `v-html`, Angular's `bypassSecurityTrust*`, and any direct `innerHTML` manipulation. When unavoidable, sanitize with DOMPurify.
- **Never trust user input:** Validate and sanitize on both client and server.
- **Avoid `eval()`, `new Function()`, and inline event handlers** constructed from user data.

### 8.2 CSRF Protection

- **Anti-CSRF tokens:** Include a unique, unpredictable token with every state-changing request; validate on the server.
- **SameSite cookies:** Set `SameSite=Strict` or `SameSite=Lax` on session cookies to prevent cross-site request inclusion.
- **Validate Origin and Referer headers** on the server for state-changing requests.
- **Framework support:** Use built-in CSRF protection if available (Angular includes it by default with `HttpClient`).

### 8.3 Content Security Policy (CSP)

- A strong CSP restricts what scripts, styles, images, and connections are allowed on your page.
- Even if malicious code is injected, CSP can prevent it from running or exfiltrating data.
- **Start restrictive, then loosen as needed.** Begin with `default-src 'self'` and add specific allowances.
- Avoid `'unsafe-inline'` and `'unsafe-eval'` where possible; use nonce-based or hash-based approaches for inline scripts when necessary.
- CSP reporting endpoints help monitor and detect violations in production.

### 8.4 Input Sanitization

- **Input validation:** Ensure user-submitted data conforms to expected formats, types, and constraints before processing.
- **Sanitization:** Clean or neutralize data, removing potentially malicious characters or code snippets.
- **Defense in depth:** Sanitize on the client for immediate feedback, but **always validate and sanitize on the server** -- client-side validation is easily bypassed.
- Use established libraries (DOMPurify, validator.js) rather than custom regex for sanitization.

### 8.5 Secure Authentication Patterns

**Token Storage:**
- **Never** store JWTs or sensitive tokens in `localStorage` (vulnerable to XSS).
- **Recommended:** Store refresh tokens in `HttpOnly`, `Secure`, `SameSite` cookies. Store access tokens in memory (JavaScript variables) only.
- Use short-lived access tokens (e.g., 15 minutes) with refresh token rotation.

**OAuth 2.0 for SPAs:**
- Use the **Authorization Code Grant with PKCE** (Proof Key for Code Exchange) -- the current recommended flow for browser-based applications.
- Use the `state` parameter to protect against CSRF and authorization code swap attacks.
- The **Backend for Frontend (BFF) pattern** provides the strongest security: a server-side component handles tokens, and the SPA uses HTTP-only session cookies to communicate with its BFF.

**General Principles:**
- Implement HTTPS everywhere.
- Enforce secure cookie attributes: `HttpOnly`, `Secure`, `SameSite`.
- Apply the principle of least privilege to API scopes and permissions.
- Log authentication events for auditing.

### Common Pitfalls & Anti-patterns

- **Client-side-only validation as security.** Form validation in JavaScript is a UX convenience, not a security measure. Any validation in the browser can be bypassed with DevTools, curl, or a modified request. All security-critical validation (auth, authorization, input sanitization, business rules) must happen on the server.
- **Security theater.** A Content Security Policy set to `default-src *` blocks nothing. HTTPS with secrets in query parameters logs those secrets in browser history, server logs, and referrer headers. These measures create a false sense of security while providing no actual protection. Audit security configurations for real effectiveness.
- **Exposing API keys and secrets in frontend bundles.** Any value embedded in JavaScript shipped to the browser is visible to every user via DevTools or source maps. API keys, internal endpoints, and secrets must live on the server. Use environment-specific server-side proxies for sensitive integrations.
- **CORS misconfiguration.** Setting `Access-Control-Allow-Origin: *` on authenticated API endpoints allows any website to make credentialed requests to your API. Allowlist specific, trusted origins. For authenticated endpoints, `*` is never appropriate.
- **Sensitive data in client-side state.** Full user records, payment details, or internal IDs stored in Redux/Zustand/Pinia are visible through browser DevTools. Minimize sensitive data in client state; fetch it on demand and do not persist it longer than needed.
- **Third-party scripts with full DOM and cookie access.** Analytics, chat widgets, and ad scripts loaded via `<script>` tags have the same privileges as your own code -- they can read the DOM, access cookies, and exfiltrate data. Audit third-party scripts, use CSP to constrain them, load them with `async`/`defer`, and consider sandboxing with iframes where possible.
- **Clickjacking without X-Frame-Options or CSP frame-ancestors.** Without `X-Frame-Options: DENY` (or `Content-Security-Policy: frame-ancestors 'none'`), your application can be embedded in a malicious iframe and users can be tricked into clicking hidden elements. Set frame restriction headers on all authenticated pages.
- **Open redirect vulnerabilities from unvalidated URL parameters.** Redirecting users to a URL taken from a query parameter (`?redirect=https://evil.com`) without validation enables phishing attacks. Validate redirect URLs against an allowlist of trusted domains or restrict to relative paths.

---

## 9. Clean Code in Frontend

### 9.1 Naming Conventions

| Entity | Convention | Examples |
|--------|-----------|----------|
| **Components** | PascalCase | `UserProfile`, `NavigationBar`, `ProductCard` |
| **Files (component)** | Match the component name | `UserProfile.tsx`, `NavigationBar.vue` |
| **Hooks/Composables** | camelCase with `use` prefix | `useAuth`, `useFormValidation`, `useDebounce` |
| **Variables/functions** | camelCase | `userName`, `totalAmount`, `handleClick` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_BASE_URL` |
| **CSS classes** | kebab-case or BEM | `nav-bar`, `card__title--active` |
| **TypeScript interfaces/types** | PascalCase (no `I` prefix in modern TS) | `UserProfile`, `CartItem`, `ApiResponse` |
| **Boolean props/variables** | `is`, `has`, `should`, `can` prefix | `isLoading`, `hasError`, `canSubmit` |
| **Event handlers** | `handle` or `on` prefix | `handleClick`, `onSubmit`, `handleChange` |

**Key Rules:**
- Avoid generic names like `index.ts`, `styles.css`, `utils.ts` even if it is the only file in a directory.
- Names should reveal intent: `getUserById` not `getData`, `isAuthenticated` not `flag`.
- Be consistent within a project -- consistency matters more than any specific convention.

### 9.2 File/Folder Organization Patterns

**Feature-Based (Recommended for Applications):**
```
src/
  features/
    auth/
      components/
      hooks/
      services/
      types/
      auth.routes.ts
    checkout/
      components/
      hooks/
      services/
      types/
      checkout.routes.ts
  shared/
    components/
    hooks/
    utils/
    types/
```

**Feature-Sliced Design (FSD):**
```
src/
  app/        # App-wide setup, providers, routing
  pages/      # Page-level components (compose features)
  widgets/    # Large composite UI blocks
  features/   # User interactions (add-to-cart, login)
  entities/   # Business entities (user, product, order)
  shared/     # Reusable utilities, UI kit, API clients
```

**Domain-Driven:**
```
src/
  domains/
    user/
    product/
    order/
  infrastructure/
    api/
    storage/
  presentation/
    components/
    layouts/
```

**Practical Guidelines:**
- Limit directory nesting to 3-4 levels maximum.
- Colocate related files (component + styles + tests + types) in the same directory.
- Index files for public API: each feature exports only what other features need to consume.
- A file should be findable by its name alone.

### 9.3 Code Splitting Strategies

- **Route-based splitting:** The most impactful and lowest-effort approach. Each page/route is a separate bundle.
- **Feature-based splitting:** Large features (e.g., admin dashboard, analytics) loaded only when accessed.
- **Component-level splitting:** Heavy components (charts, rich text editors, maps) loaded on demand.
- **Library splitting:** Vendor libraries in separate chunks for better caching (they change less frequently than application code).
- **Prefetching:** Speculatively load bundles for likely-next navigation targets (e.g., preload the product detail page bundle when hovering over a product link).

### 9.4 DRY vs. WET in Components

**DRY (Don't Repeat Yourself):**
- Every piece of knowledge should have a single, unambiguous, authoritative representation.
- Reduces the surface area for bugs when logic needs to change.

**WET (Write Everything Twice) / AHA (Avoid Hasty Abstractions):**
- Challenges overzealous DRY by embracing mindful duplication to avoid premature, fragile abstractions.
- **The Rule of Three:** Abstract code when you see the same pattern three times, not before. Two instances of similar code is a coincidence; three is a pattern.

**Frontend-Specific Guidance:**
- **Premature abstraction is worse than duplication.** A wrong abstraction forces all consumers to work around it, whereas duplicated code can be independently evolved.
- Extract shared components only when the pattern is stable and well-understood.
- It is acceptable to have two similar-looking components that serve different business domains, because they are likely to diverge over time.
- Shared utilities and hooks (validation, formatting, API calls) are usually safe to DRY up early.
- UI components that look similar but belong to different features should remain separate until proven to be truly identical.

### Common Pitfalls & Anti-patterns

- **Over-DRYing across feature boundaries.** Extracting a shared `<Card>` component used by both "Products" and "User Profiles" couples two unrelated features. When Products needs a layout change, User Profiles breaks. Duplication between features is often healthier than premature shared abstractions. DRY within a feature; tolerate WET across features until the pattern is proven stable.
- **Barrel file proliferation defeating tree shaking and slowing tooling.** An `index.ts` that re-exports everything from a directory forces bundlers to parse every module in the directory even if only one export is used. It also slows IDE auto-import, TypeScript compilation, and test runners. Use barrel files sparingly and only for true public APIs.
- **Folder structure as bureaucracy.** Creating `components/`, `hooks/`, `services/`, `types/`, `utils/`, and `__tests__/` directories for a feature with one component, one hook, and one test produces 6 files across 4+ directories. Colocate small features in a single directory; add structure when the feature grows to justify it.
- **Naming conventions without automated enforcement.** Agreeing on `camelCase` for variables and `PascalCase` for components in a meeting is meaningless if no linter rule enforces it. Within weeks, drift creeps in. Use ESLint rules (`naming-convention` in `@typescript-eslint`), Prettier for formatting, and commit hooks to enforce conventions automatically.
- **Code splitting without loading states.** A user clicks a link, the lazy chunk loads, and nothing visually happens for 1-3 seconds. Always pair code-split points with a loading indicator (spinner, skeleton, or progress bar) so users know the app is responding.
- **YAGNI violations: building for hypothetical requirements.** Implementing a plugin system, multi-tenancy support, or internationalization infrastructure for a single-tenant, English-only MVP wastes development time and adds complexity. Build what is needed now; refactor when -- and only when -- the requirement materializes.
- **30 files named `index.ts`.** When every directory exports through `index.ts`, git blame shows a wall of identically-named files, stack traces are unreadable ("Error in index.ts at line 42" -- which one?), and editor tabs are indistinguishable. Name files after what they contain: `UserProfile.tsx`, `useAuth.ts`, `cartService.ts`.

---

## 10. Accessibility as a Principle

### 10.1 Semantic HTML First

**The single most impactful thing you can do for accessibility is use the correct HTML elements.**

- Semantic elements carry implicit meaning, keyboard behavior, and screen reader announcements:
  - `<button>` is focusable, activated with Enter/Space, announced as "button."
  - `<nav>` creates a navigation landmark.
  - `<main>`, `<header>`, `<footer>`, `<aside>` create document landmarks.
  - `<h1>`-`<h6>` create a navigable heading structure.
  - `<table>`, `<th>`, `<td>` create accessible data tables.
- **Native elements provide behavior for free.** A `<div>` with an `onClick` handler is not a button -- it lacks keyboard support, focus management, and screen reader semantics.
- **Rule:** Exhaust native HTML options before reaching for ARIA or JavaScript-based solutions.

### 10.2 ARIA When Needed

**The First Rule of ARIA:** "If you can use a native HTML element with the semantics and behavior you require already built in, instead of re-purposing an element and adding ARIA, then do so."

- WebAim's million-page study found that **pages with ARIA present averaged 41% more detected errors** than those without ARIA. More ARIA does not mean more accessible -- misused ARIA actively harms accessibility.
- **When ARIA is appropriate:**
  - Custom widgets with no native HTML equivalent (tab panels, tree views, comboboxes).
  - Live regions (`aria-live`) to announce dynamic content changes.
  - Labeling relationships (`aria-labelledby`, `aria-describedby`) when visible labels are insufficient.
  - State communication (`aria-expanded`, `aria-selected`, `aria-disabled`) for custom interactive elements.

### 10.3 Keyboard Navigation

**Every interactive element must be operable with a keyboard alone** -- this is a hard requirement for WCAG Level A.

- **Tab order:** Follows DOM order by default. Use logical source order rather than CSS-based visual reordering.
- **Interactive elements:** All must be reachable via Tab and operable with Enter, Space, Escape, and arrow keys as appropriate.
- **Avoid positive `tabindex`:** Only use `tabindex="0"` (add to tab order) and `tabindex="-1"` (programmatically focusable but not in tab order). Never use `tabindex="1"` or higher.
- **Skip links:** Provide a "Skip to main content" link as the first focusable element.
- **Custom widgets:** Follow WAI-ARIA Authoring Practices for keyboard interaction patterns (e.g., arrow keys within tab panels, Escape to close modals).

### 10.4 Focus Management

- **Modal dialogs:** When opened, move focus into the modal. Trap focus within the modal while open. When closed, return focus to the triggering element.
- **Route changes (SPAs):** Manage focus on navigation. Move focus to the new page's main heading or main content region.
- **Dynamic content:** When content is added or removed, ensure focus is not lost. If a focused element is removed, move focus to a logical successor.
- **Focus indicators:** Never remove focus outlines (`outline: none`) without providing an equally visible alternative. Use `:focus-visible` for keyboard-only focus styles.

### 10.5 Screen Reader Considerations

- **Alt text for images:** Descriptive for informational images, empty `alt=""` for decorative images.
- **Form labels:** Every input must have an associated `<label>` (using `for`/`id` or wrapping).
- **Error announcements:** Use `aria-live="assertive"` or `role="alert"` for error messages so they are announced immediately.
- **Heading structure:** Maintain a logical heading hierarchy (do not skip levels). Screen reader users navigate by headings more than any other method.
- **Link text:** Avoid "click here" and "read more." Links should make sense out of context.
- **Testing:** Test with actual screen readers (VoiceOver on macOS, NVDA on Windows, TalkBack on Android). Automated tools catch only ~30% of accessibility issues.

**Testing First Steps:**
1. Unplug your mouse and try to use the entire application with only a keyboard.
2. If you cannot complete every task with Tab, Enter, Space, Escape, and arrow keys, you have a problem.
3. Run automated tools (axe, Lighthouse) for quick wins, then test manually with a screen reader.

### Common Pitfalls & Anti-patterns

- **Accessibility overlays as a fix.** Products like AccessiBe, UserWay, and similar overlay widgets do not fix underlying accessibility issues. They often interfere with real assistive technology, create false legal confidence, and have been widely criticized by the disability community. Fix the source code; do not layer a widget on top.
- **Redundant ARIA on native elements.** Adding `role="button"` to a `<button>`, `role="link"` to an `<a href>`, or `role="navigation"` to a `<nav>` is unnecessary noise. Native HTML elements already carry these semantics. Redundant ARIA adds maintenance burden and risks creating conflicting information if the role drifts from the element's actual behavior.
- **Meaningless accessible names.** `aria-label="button"`, `aria-label="icon"`, or `aria-label="link"` tells a screen reader user nothing useful. Accessible names must describe *what the element does*: `aria-label="Close dialog"`, `aria-label="Search products"`, `aria-label="Remove item from cart"`.
- **Color as the only state indicator.** Using red vs. green to indicate errors vs. success fails for approximately 8% of men (and 0.5% of women) who have color vision deficiency. WCAG 1.4.1 requires that color is not the sole visual means of conveying information. Supplement with icons, text labels, patterns, or other non-color indicators.
- **Automated testing treated as sufficient.** A Lighthouse score of 100 or zero axe violations does not mean your application is accessible. Automated tools catch only about 30% of WCAG issues. They cannot detect logical heading order problems, poor focus management, misleading alt text, or unusable keyboard interactions. Automated checks are the starting point, not the finish line.
- **Excessive visually-hidden text cluttering screen reader experience.** Adding long blocks of screen-reader-only text to "explain" the interface creates a verbose, frustrating experience for screen reader users. Use concise, targeted labeling. If the UI needs lengthy explanation for assistive technology, the UI design itself likely needs improvement.
- **Animations triggering vestibular disorders.** Parallax scrolling, auto-playing animations, zooming transitions, and continuous motion can cause nausea, dizziness, and disorientation for people with vestibular disorders. Respect the `prefers-reduced-motion` media query: reduce or eliminate motion when the user has requested it. This is a WCAG 2.1 Level AAA criterion (2.3.3) but widely recommended at all levels.
- **Disabled buttons without explanation.** A grayed-out submit button with no indication of *why* it is disabled leaves all users guessing and screen reader users completely blocked. Provide a visible hint (tooltip, inline text) explaining what must be completed before the action becomes available, or keep the button enabled and show validation errors on activation.

---

## Summary of Key Themes

1. **Separation is the foundation:** Separate UI from logic, client state from server state, business rules from infrastructure. This principle appears across SOLID, component design, state management, and architecture.

2. **Composition over configuration:** Prefer composing small, focused pieces over configuring large, monolithic ones. This applies to components, hooks, state management, and even CSS.

3. **Abstractions should be earned, not imposed:** Apply the Rule of Three before abstracting. Premature abstraction (over-DRYing) is worse than duplication.

4. **User-centric design is non-negotiable:** Usability heuristics, accessibility, performance, and error handling are not optional polish -- they are core quality attributes that must be designed in from the start.

5. **Security is a layered defense:** No single measure suffices. Combine framework auto-escaping, CSP, secure token management, input validation, and HTTPS.

6. **Framework-agnostic thinking pays dividends:** Business logic, validation rules, and domain models should be pure functions that work independently of React, Vue, Angular, or Svelte. Only the presentation and integration layers should be framework-specific.

---

## Sources

### SOLID Principles in Frontend
- [SOLID Principle for Front End - Medium](https://medium.com/@syazantri/solid-principle-for-front-end-85e2a2d2be40)
- [Things About SOLID & KISS Principles No One Tells You - JavaScript in Plain English](https://javascript.plainenglish.io/things-about-solid-kiss-principles-no-one-tells-you-and-why-they-matter-in-frontend-fb300a3f1f72)
- [Understanding SOLID Principles in Frontend Development - DEV Community](https://dev.to/debugdiariesbyswethap/understanding-solid-principles-in-frontend-development-with-react-examples-7ao)
- [Frontend Masters: SOLID Principles in React / React Native - Java Code Geeks](https://www.javacodegeeks.com/2026/01/frontend-masters-solid-principles-in-react-react-native.html)
- [When S.O.L.I.D Met Frontend Components - Medium](https://medium.com/@shirihaim/when-s-o-l-i-d-met-frontend-components-9f897a2e07b4)
- [Liskov Substitution Principle in React - CreoWis](https://www.creowis.com/blog/liskov-substitution-principle-in-react)
- [Dependency Inversion or Dependency Injection in React - Delivery Hero](https://deliveryhero.jobs/blog/dependency-inversion-or-dependency-injection-in-react-that-is-the-question/)
- [Dependency Inversion Principle (DIP) in React - CreoWis](https://www.creowis.com/blog/dependency-inversion-principle-dip-in-react)
- [Dependency Injection in React - LogRocket](https://blog.logrocket.com/dependency-injection-react/)

### Component Design Principles
- [Atomic Design and Its Relevance in Frontend in 2025 - DEV Community](https://dev.to/m_midas/atomic-design-and-its-relevance-in-frontend-in-2025-32e9)
- [Atomic Design Methodology - Brad Frost](https://atomicdesign.bradfrost.com/chapter-2/)
- [Building a Component Library: Integrating Atomic Design and Compound Components - Medium](https://iamrajatsingh.medium.com/building-a-component-library-integrating-atomic-design-and-the-compound-component-pattern-5ee9b1a1a8df)
- [Scalable React Component Patterns: From Atomic Design to Compound Components - DEV Community](https://dev.to/vishw-patel/scalable-react-component-patterns-from-atomic-design-to-compound-components-13l7)
- [Component Architecture That Scales: Atomic Design in 2025 - Medium](https://robertcelt95.medium.com/component-architecture-that-scales-atomic-design-in-2025-f0a91ca91abb)
- [Container/Presentational Pattern - patterns.dev](https://www.patterns.dev/react/presentational-container-pattern/)
- [The Evolution of React Design Patterns: From HOCs to Hooks - DEV Community](https://dev.to/samabaasi/the-evolution-of-react-design-patterns-from-hocs-to-hooks-and-custom-hooks-44a)
- [Container Vs Presentational Components: Still Relevant In 2025?](https://allinsightlab.com/container-vs-presentational-components-still-relevant-in-2025/)

### Separation of Concerns
- [Separation of Concerns with React Hooks - Felix Gerschau](https://felixgerschau.com/react-hooks-separation-of-concerns/)
- [7 Frontend Design Patterns - Feature-Sliced Design](https://feature-sliced.design/blog/frontend-design-patterns)
- [React Architecture: Business Logic Separation - Profy.dev](https://profy.dev/article/react-architecture-business-logic-and-dependency-injection)
- [Decoupling Business Logic from UI with Custom React Hooks - eMoosavi](https://www.emoosavi.com/blog/decoupling-business-logic-from-ui-with-custom-react-hooks)
- [Modularizing React Applications - Martin Fowler](https://martinfowler.com/articles/modularizing-react-apps.html)
- [Clean Architecture in Front-End Development - DEV Community](https://dev.to/miasalazar/clean-architecture-in-front-end-development-523n)
- [Exploring 4-Layer Frontend Architecture - DEV Community](https://dev.to/ahr_dev/exploring-4-layer-frontend-architecture-a-practical-guide-362b)

### State Management
- [State Management in 2026: Modern Frontend Guide](https://www.elearningsolutions.co.in/state-management-in-2026-2/)
- [React State Management in 2025: What You Actually Need - developerway.com](https://www.developerway.com/posts/react-state-management-2025)
- [State Management Trends in React 2025 - Makers' Den](https://makersden.io/blog/react-state-management-in-2025)
- [State Management 2025: React, Server State, URL State - Medium](https://medium.com/@QuarkAndCode/state-management-2025-react-server-state-url-state-dapr-agent-sync-d8a1f6c59288)
- [MVVM with Unidirectional Data Flow - Medium](https://medium.com/@b9915034/mvvm-with-unidirectional-data-flow-improving-state-management-651ae73b1fd1)
- [Frontend Architectures 2025: Modularity, Performance, and Scalability](https://blog.madrigan.com/en/blog/202512041139/)

### Usability Principles
- [The 21 Laws of UX: A Comprehensive Guide - Looppanel](https://www.looppanel.com/blog/laws-of-ux)
- [31 Laws of UX and Design Principles (2025) - UXness](https://www.uxness.in/2024/03/12-laws-of-ux-designing-with-principles.html)
- [Nielsen's Heuristics - The Decision Lab](https://thedecisionlab.com/reference-guide/design/nielsens-heuristics)
- [What is Fitts's Law? Complete 2025 Guide - CareerFoundry](https://careerfoundry.com/en/blog/ui-design/what-is-fittss-law/)
- [What is Progressive Disclosure? - IxDF (2026)](https://ixdf.org/literature/topics/progressive-disclosure)
- [Progressive Disclosure in UX Design - LogRocket](https://blog.logrocket.com/ux-design/progressive-disclosure-ux-types-use-cases/)
- [Mobile-First Responsive Design Best Practices 2025 - Groto](https://www.letsgroto.com/blog/mobile-first-responsive-design-best-practices)

### Performance
- [RAIL Performance Model - web.dev](https://web.dev/rail/)
- [RAIL Performance Model - KeyCDN](https://www.keycdn.com/blog/rail-performance-model)
- [React Performance Optimization: 15 Best Practices for 2025 - DEV Community](https://dev.to/alex_bobes/react-performance-optimization-15-best-practices-for-2025-17l9)
- [Optimizing React Performance: Virtualization, Lazy Loading, and Memoization - Medium](https://medium.com/@bilalazam751/optimizing-react-performance-virtualization-lazy-loading-and-memoization-9a402006c5e8)

### Error Handling
- [Designing a Resilient UI: Handling Failures Gracefully - DEV Community](https://dev.to/istealersn_dev/designing-a-resilient-ui-handling-failures-gracefully-in-frontend-applications-1p9l)
- [Designing Resilient Frontend Systems - Medium](https://beyondthecode.medium.com/designing-resilient-frontend-systems-handling-failures-gracefully-10c3c3a2d1b4)
- [Graceful Degradation - Mailchimp](https://mailchimp.com/resources/graceful-degradation/)

### Security
- [Front-End Security Best Practices - SecureFlag](https://blog.secureflag.com/2025/11/17/front-end-security-best-practices/)
- [Modern Frontend Security: Beyond XSS and CSRF in 2025 - Capture The Bug](https://capturethebug.xyz/Blogs/Modern-Frontend-Security-Protecting-Your-Application-Beyond-XSS-and-CSRF-in-2025)
- [CSRF Prevention - OWASP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [OAuth for Single Page Applications - Curity](https://curity.io/resources/learn/spa-best-practices/)
- [Securing SPAs: Authentication & Authorization Best Practices - SecureCodeCards](https://securecodecards.com/articles/securing-single-page-applications-authentication-authorization-best-practices)
- [Security Threats in SPAs - WorkOS](https://workos.com/blog/security-threats-in-spas-and-how-to-defend-against-them)

### Clean Code
- [Frontend Coding Conventions - PostHog Handbook](https://posthog.com/handbook/engineering/conventions/frontend-coding)
- [Naming Conventions: The Foundation of Clean Code - DEV Community](https://dev.to/sathishskdev/part-1-naming-conventions-the-foundation-of-clean-code-51ng)
- [Writing Clean Code in Front-end: KISS, DRY, YAGNI, and Beyond - DEV Community](https://dev.to/miasalazar/writing-clean-code-in-front-end-kiss-dry-yaign-and-beyond-54ok)
- [Principles of Clean Frontend Code: DRY, KISS, and SOLID - Code With Seb](https://www.codewithseb.com/blog/principles-of-clean-frontend-code-dry-kiss-solid)
- [Stop Trying to Be So DRY, Write Everything Twice - DEV Community](https://dev.to/wuz/stop-trying-to-be-so-dry-instead-write-everything-twice-wet-5g33)

### Accessibility
- [Web Accessibility: ARIA and Semantic HTML - Grizzly Peak Software](https://www.grizzlypeaksoftware.com/library/web-accessibility-aria-and-semantic-html-qaad5qe6)
- [ARIA - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [ARIA Accessibility: Best Practices - Accessibility Checker](https://www.accessibilitychecker.org/blog/aria-accessibility/)
- [WAI-ARIA Overview - W3C](https://www.w3.org/WAI/standards-guidelines/aria/)
- [ARIA Labels for Web Accessibility: 2025 Implementation Guide - AllAccessible](https://www.allaccessible.org/blog/implementing-aria-labels-for-web-accessibility)
- [ARIA and HTML - web.dev](https://web.dev/learn/accessibility/aria-html)
