# Supplemental Content: Components and State

Practical teaching material covering component fundamentals, API design, data fetching patterns, URL state, and form state management.

---

## Topic 1: What is a Component?

**Stage 2 — Framework-Agnostic Mental Model**

### Why This Matters

Every modern frontend framework — React, Vue, Angular, Svelte — is built on the same core abstraction: the component. Before you learn any framework, you need to understand what a component actually is. If you skip this, you'll write framework code without understanding why it's organized the way it is.

### A Component is a Function

Strip away every framework and a component is a function:

```
Input (data) → Output (UI)
```

You give it data. It returns a chunk of user interface. The same data always produces the same UI. That's it.

```js
// Pseudocode — no framework
function Greeting(props) {
  return `<h1>Hello, ${props.name}</h1>`;
}

Greeting({ name: "Alex" })  // → <h1>Hello, Alex</h1>
Greeting({ name: "Sam" })   // → <h1>Hello, Sam</h1>
```

This is the mental model you should carry into every framework you touch. React components are functions that return JSX. Vue single-file components have a `<template>` that renders based on reactive data. Angular components are classes whose templates render based on properties. Svelte `.svelte` files compile down to efficient update functions. Different syntax, same idea.

### Encapsulation

A component owns three things:

1. **Markup** — the HTML structure it produces
2. **Styles** — how it looks
3. **Behavior** — how it responds to interaction

These three concerns live together inside the component boundary. A `Button` component knows its own HTML structure, its own CSS, and what happens when you click it. Nothing outside the component should need to know those details.

```
┌─────────────────────────┐
│  Button Component       │
│                         │
│  Markup:   <button>     │
│  Styles:   .btn { ... } │
│  Behavior: onClick()    │
└─────────────────────────┘
```

This is encapsulation. The outside world interacts with the component through its public interface (props and events), not by reaching into its internals.

### Reusability

Because a component is a function of its data, you can reuse it with different inputs:

```js
// Same component, different data
<UserCard name="Alex"  role="Engineer" />
<UserCard name="Sam"   role="Designer" />
<UserCard name="Jordan" role="PM" />
```

You wrote `UserCard` once. You used it three times. Each instance is independent — its own data, its own state, its own lifecycle.

### Composition

Components contain other components. This is composition — the same principle from function composition, applied to UI.

```js
function App() {
  return (
    <Layout>
      <Header>
        <Logo />
        <Navigation />
      </Header>
      <Main>
        <Sidebar />
        <Content />
      </Main>
    </Layout>
  );
}
```

This reads like a table of contents for your UI. `App` contains `Layout`, which contains `Header` and `Main`, and so on. Each component is a self-contained piece that delegates to smaller pieces.

### The Component Tree

When you compose components, you get a tree:

```
          App
         /   \
     Header   Main
     /   \    /   \
  Logo  Nav  Sidebar  Content
                       /   \
                  ArticleList  Pagination
```

This tree mirrors the DOM tree the browser renders, but at a higher level of abstraction. Instead of thinking about `<div>` and `<span>`, you think about `Header` and `ArticleList`.

Data flows down this tree (parent to child via props). Events flow up (child to parent via callbacks). This one-way data flow is a convention shared across every major framework.

### Lifecycle

Components don't just render once. They go through a lifecycle:

1. **Mount** — the component appears in the UI for the first time. This is where you set up subscriptions, fetch data, or start timers.
2. **Update** — the component's data changes and it re-renders. This happens many times during the component's life.
3. **Unmount** — the component is removed from the UI. This is where you clean up: cancel network requests, remove event listeners, clear timers.

```
Mount → Update → Update → Update → ... → Unmount
```

Every framework gives you hooks into these phases:

| Phase   | React              | Vue               | Angular             | Svelte            |
|---------|--------------------|--------------------|---------------------|-------------------|
| Mount   | `useEffect(() => {}, [])` | `onMounted()`    | `ngOnInit()`        | `onMount()`       |
| Update  | `useEffect(() => {}, [dep])` | `watch()`     | `ngOnChanges()`     | `$:` reactive     |
| Unmount | `useEffect` return fn | `onUnmounted()`  | `ngOnDestroy()`     | `onDestroy()`     |

The syntax varies. The concept is universal.

### How This Maps to Frameworks

Here's the same `Greeting` component in four frameworks. Notice how they're all expressing the same idea.

**React** — a function returning JSX:
```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

**Vue** — a Single File Component:
```vue
<template>
  <h1>Hello, {{ name }}</h1>
</template>
<script setup>
defineProps({ name: String });
</script>
```

**Angular** — a class with decorator and template:
```typescript
@Component({
  selector: 'app-greeting',
  template: `<h1>Hello, {{ name }}</h1>`,
})
export class GreetingComponent {
  @Input() name: string;
}
```

**Svelte** — a `.svelte` file:
```svelte
<script>
  export let name;
</script>
<h1>Hello, {name}</h1>
```

Four syntaxes. One concept: data in, UI out.

### Common Pitfalls

**The mega-component.** A single component that renders an entire page — header, sidebar, content, footer, modals, and all. It has 500 lines, 30 state variables, and nobody wants to touch it. If you can't describe what a component does in one sentence, it's too big. Break it up.

**No clear boundary.** A component that reaches into a sibling's DOM to read or modify its state. If `Sidebar` needs to know what's selected in `Content`, that information should flow through their shared parent, not through direct DOM manipulation.

**Components that are just wrappers.** A `UserSection` that literally just renders `<div><UserList /></div>` with no additional logic, styling, or composition. Every component should earn its existence.

**Mixing abstraction levels.** A component that mixes raw `<div>` and `<span>` elements with high-level components like `<DataTable>` and `<Chart>` in the same return statement, making the template hard to scan. Keep components at a consistent level of abstraction.

### Key Takeaways

- A component is a function: data in, UI out. This mental model is universal across frameworks.
- Components encapsulate markup, styles, and behavior behind a public interface.
- Composition (components inside components) produces a tree. Data flows down, events flow up.
- Every component mounts, updates, and unmounts. Clean up what you set up.
- If you can't describe a component's purpose in one sentence, split it.

---

## Topic 2: Component API Design

**Stage 2 — Designing Good Component Interfaces**

### Why This Matters

A component's API is its contract with every developer who uses it — including your future self. A well-designed API makes the component easy to use correctly and hard to use incorrectly. A poorly designed API creates bugs, confusion, and "why does this prop exist?" comments in code reviews.

### Props as the Public API

Props define what the outside world can control. Everything else is internal. Think of a component like a TV remote: the buttons are the props. The circuitry inside is private.

```typescript
// The public API of an Avatar component
interface AvatarProps {
  src: string;         // Image URL
  alt: string;         // Accessibility text
  size?: "sm" | "md" | "lg";  // Display size
  fallback?: string;   // Initials if image fails
}
```

Every prop you add is a maintenance commitment. Keep the API surface small. Each prop should have a clear reason to exist.

### Required vs Optional Props

Required props are things the component cannot function without. Optional props have sensible defaults.

```typescript
interface ButtonProps {
  // Required — no sensible default exists
  children: React.ReactNode;
  onClick: () => void;

  // Optional — sensible defaults
  variant?: "primary" | "secondary" | "ghost";  // default: "primary"
  size?: "sm" | "md" | "lg";                    // default: "md"
  disabled?: boolean;                            // default: false
  type?: "button" | "submit" | "reset";          // default: "button"
}
```

The test: can a consumer use the component with just the required props and get a reasonable result?

```jsx
// This should work and look fine
<Button onClick={handleSave}>Save</Button>

// Optional props refine behavior
<Button onClick={handleSave} variant="secondary" size="lg">Save</Button>
```

If a consumer has to pass six props just to render something basic, your defaults are wrong.

### Typing Props with TypeScript

TypeScript is your first line of defense against misuse. Use it aggressively.

**Union types for variants** — not booleans:

```typescript
// Bad: boolean explosion
interface BadButtonProps {
  isPrimary?: boolean;
  isSecondary?: boolean;
  isGhost?: boolean;
  isDanger?: boolean;
}
// What happens if isPrimary AND isDanger are both true?

// Good: union type
interface ButtonProps {
  variant: "primary" | "secondary" | "ghost" | "danger";
}
// Exactly one variant. No ambiguity.
```

**Discriminated unions for conditional props:**

```typescript
// A modal that's either confirmable or informational
type ModalProps =
  | { type: "confirm"; onConfirm: () => void; onCancel: () => void }
  | { type: "info"; onClose: () => void };

// TypeScript enforces: if type is "confirm", onConfirm and onCancel are required.
// If type is "info", only onClose exists. You can't mix them.
```

**Generics for data-agnostic components:**

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

// Usage — TypeScript infers T from the items array
<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  keyExtractor={(user) => user.id}
/>
```

### Event Callbacks

Name callbacks with the `on` prefix: `onClick`, `onChange`, `onSubmit`, `onSelect`. This is a universal convention.

Pass relevant data in the callback argument. Don't make the consumer dig for it.

```typescript
// Bad: consumer has to extract the value themselves
interface BadSelectProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// Good: provide the meaningful value directly
interface SelectProps {
  onChange: (value: string) => void;
}

// Even better for complex components: include context
interface TableProps<T> {
  onRowClick: (item: T, index: number) => void;
  onSort: (column: string, direction: "asc" | "desc") => void;
}
```

### Children and Slots

Use children / slots when consumers need to control the content, not just the data.

```jsx
// Props approach: limited, rigid
<Card title="Settings" description="Manage your preferences" />

// Children approach: flexible, composable
<Card>
  <CardHeader>
    <h2>Settings</h2>
    <Badge>New</Badge>
  </CardHeader>
  <CardBody>
    <p>Manage your preferences</p>
    <SettingsForm />
  </CardBody>
</Card>
```

The rule of thumb: use **props** for data. Use **children / slots** for UI structure. If you find yourself passing JSX/HTML through a prop, that content should probably be children or a named slot.

Vue uses named slots explicitly:

```vue
<template>
  <div class="card">
    <header><slot name="header" /></header>
    <main><slot /></main>
    <footer><slot name="footer" /></footer>
  </div>
</template>
```

### Forwarding Attributes

Components often wrap a native HTML element. Forward unknown attributes to that element so consumers can add `id`, `aria-*`, `data-*`, or `className` without the component needing to know about every possible attribute.

```tsx
// React: spread rest props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

function Button({ variant = "primary", children, ...rest }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} {...rest}>
      {children}
    </button>
  );
}

// Consumer can now do:
<Button variant="primary" aria-label="Save document" data-testid="save-btn">
  Save
</Button>
```

Vue does this automatically with `v-bind="$attrs"` on the root element (or opt-in with `inheritAttrs: false` for manual control).

### Ref Forwarding

Sometimes a parent needs direct access to the underlying DOM element — for focus management, measurements, or third-party library integration. Expose this explicitly.

```tsx
// React: forwardRef
const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, ...rest }, ref) {
    return (
      <label>
        {label}
        <input ref={ref} {...rest} />
      </label>
    );
  }
);

// Parent can now focus the input
const inputRef = useRef<HTMLInputElement>(null);
<Input ref={inputRef} label="Email" />
inputRef.current?.focus();
```

Vue uses `defineExpose` to explicitly choose what the parent can access:

```vue
<script setup>
import { ref } from 'vue';
const inputEl = ref(null);
defineExpose({ focus: () => inputEl.value?.focus() });
</script>
```

### Controlled vs Uncontrolled Components

**Controlled:** the parent owns the state. The component reflects what it's told and reports changes.

```tsx
// Controlled — parent is the source of truth
function Parent() {
  const [value, setValue] = useState("");
  return <Input value={value} onChange={setValue} />;
}
```

**Uncontrolled:** the component manages its own internal state. The parent can read it on demand.

```tsx
// Uncontrolled — component is the source of truth
function Parent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = () => {
    console.log(inputRef.current?.value);
  };
  return <input ref={inputRef} defaultValue="" />;
}
```

| | Controlled | Uncontrolled |
|---|---|---|
| State lives in | Parent | Component |
| Predictability | High — one source of truth | Lower — state is hidden |
| Boilerplate | More — parent manages state | Less — component handles it |
| Best for | Forms with validation, synced UI | Simple inputs, third-party integration |

When building reusable components, support both patterns. Accept a `value` prop (controlled) and a `defaultValue` prop (uncontrolled). This is the pattern used by native HTML elements and well-designed component libraries.

### Common Pitfalls

**Boolean explosion.** Ten boolean props where only one should be active at a time. Use a union type instead of `isPrimary`, `isSecondary`, `isDanger`, `isGhost`. When two booleans are true simultaneously, behavior is undefined.

**Required props that should be optional.** If 90% of consumers pass the same value, that value should be the default. Don't make everyone write `<Button type="button">` when `"button"` is almost always what they want.

**Inconsistent callback signatures.** One callback passes the raw event, another passes just a value, another passes an object. Pick a convention and stick to it within a component library.

**Leaking internal state.** Exposing an `isInternallyLoading` prop or a `_cache` ref. If it's internal, it shouldn't be in the API. Prefixing with underscores doesn't make it private — removing it from the interface does.

**Props that fight each other.** `<Modal isOpen={true} isClosed={true} />`. These two props represent the same state. Pick one. This also applies to `disabled` + `loading` — if loading always implies disabled, don't make the consumer pass both.

### Key Takeaways

- Every prop is a maintenance commitment. Keep the surface area small with sensible defaults.
- Use TypeScript union types for variants, discriminated unions for conditional prop sets, and generics for data-agnostic components.
- Name callbacks `onAction`, pass meaningful data (not raw events), and keep signatures consistent.
- Support both controlled and uncontrolled patterns for input-like components.
- If a consumer has to read your source code to figure out how to use your component, the API has failed.

---

## Topic 3: Data Fetching UI Patterns

**Stage 3 — Handling the 4 States of Data**

### Why This Matters

Every view that depends on data from a server exists in one of four states: loading, success, error, or empty. If you don't handle all four explicitly, your users will see blank screens, confusing errors, or unresponsive interfaces. This is one of the most common sources of poor UX in web applications.

### The 4 States

Every data-dependent view must handle these states. No exceptions.

```typescript
type DataState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error }
  | { status: "empty" };
```

```tsx
function UserList() {
  const { status, data, error } = useUsers();

  switch (status) {
    case "loading": return <UserListSkeleton />;
    case "error":   return <ErrorMessage error={error} onRetry={refetch} />;
    case "empty":   return <EmptyState message="No users yet" action={<InviteButton />} />;
    case "success": return <List items={data} renderItem={UserRow} />;
  }
}
```

Model these states explicitly. Don't rely on implicit checks like `if (!data && !error)` — that's fragile and hard to reason about.

### Loading States

**Skeleton screens** — placeholder shapes that match the content layout. Use when the layout is predictable.

```css
.skeleton {
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

```jsx
function UserCardSkeleton() {
  return (
    <div className="user-card">
      <div className="skeleton" style={{ width: 48, height: 48, borderRadius: "50%" }} />
      <div className="skeleton" style={{ width: 120, height: 16 }} />
      <div className="skeleton" style={{ width: 80, height: 14 }} />
    </div>
  );
}
```

**Spinners** — use for small, unpredictable areas (a button submitting, a dropdown loading options).

**Progress bars** — use when you can measure progress (file uploads, multi-step processes).

| Loading type    | Use when                            |
|-----------------|--------------------------------------|
| Skeleton screen | Layout is predictable, content varies |
| Spinner         | Small area, unpredictable duration   |
| Progress bar    | Progress is measurable               |

Delay showing loading indicators for fast operations. If data arrives in under 200ms, showing a skeleton and then immediately replacing it creates a distracting flash.

```tsx
function useDelayedLoading(isLoading: boolean, delayMs = 200) {
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    if (!isLoading) { setShowLoading(false); return; }
    const timer = setTimeout(() => setShowLoading(true), delayMs);
    return () => clearTimeout(timer);
  }, [isLoading, delayMs]);
  return showLoading;
}
```

### Success State

The straightforward case — but don't overlook partial data. APIs sometimes return incomplete objects. Defend against missing fields.

```tsx
function UserProfile({ user }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email ?? "No email provided"}</p>
      {user.avatar ? <img src={user.avatar} alt="" /> : <AvatarPlaceholder />}
    </div>
  );
}
```

### Error States

Errors are not optional — they're a feature. A good error state tells the user what happened, whether it's temporary, and what they can do about it.

```tsx
function ErrorMessage({ error, onRetry }) {
  const message = getErrorMessage(error);
  return (
    <div role="alert" className="error-state">
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Try again</button>}
    </div>
  );
}

function getErrorMessage(error: Error): string {
  if (error instanceof NetworkError) {
    return "Unable to connect. Check your internet and try again.";
  }
  if (error instanceof AuthError) {
    return "Your session has expired. Please sign in again.";
  }
  if (error instanceof NotFoundError) {
    return "This content doesn't exist or has been removed.";
  }
  return "Something unexpected happened. Please try again.";
}
```

Distinguish error types and give actionable guidance:

| Error type   | User message                                | Recovery action         |
|--------------|---------------------------------------------|-------------------------|
| Network      | "Unable to connect. Check your internet."   | Retry button            |
| Auth (401)   | "Session expired."                          | Redirect to login       |
| Not found    | "This item no longer exists."               | Link back to list       |
| Server (500) | "We're having trouble. Try again shortly."  | Retry button + support link |
| Validation   | Specific field-level messages               | Highlight invalid fields |

### Empty States

An empty state is an opportunity. It tells users why there's nothing here and what they can do next.

```tsx
// Bad: nothing
<div></div>

// Bad: generic
<p>No data.</p>

// Good: helpful, actionable
function EmptyState({ title, description, action }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  );
}

<EmptyState
  title="No projects yet"
  description="Create your first project to get started."
  action={<button onClick={openNewProject}>Create Project</button>}
/>
```

Differentiate between "no data exists" and "no results match your filters":

```tsx
if (items.length === 0 && hasActiveFilters) {
  return <EmptyState
    title="No results found"
    description="Try adjusting your filters."
    action={<button onClick={clearFilters}>Clear filters</button>}
  />;
}
if (items.length === 0) {
  return <EmptyState
    title="No projects yet"
    description="Create your first project to get started."
    action={<button onClick={create}>Create Project</button>}
  />;
}
```

### Combining States: The Full Flow

A complete data-fetching flow handles transitions between states:

```
Initial render → Loading → Success
                        ↘ Error → Retry → Loading → Success
                                                  ↘ Error (show support link)
```

```tsx
function DataView() {
  const { data, error, isLoading, refetch, retryCount } = useData();

  if (isLoading) return <Skeleton />;

  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={retryCount < 3 ? refetch : undefined}
        showSupport={retryCount >= 3}
      />
    );
  }

  if (data.length === 0) return <EmptyState />;

  return <DataList items={data} />;
}
```

### Skeleton Screen Best Practices

Match the skeleton to the content layout to prevent layout shift:

```tsx
// The skeleton and the real content should occupy the same space
function ArticleSkeleton() {
  return (
    <article className="article">
      <div className="skeleton" style={{ width: "60%", height: 28 }} />
      <div className="skeleton" style={{ width: "30%", height: 14, marginTop: 8 }} />
      <div className="skeleton" style={{ width: "100%", height: 14, marginTop: 24 }} />
      <div className="skeleton" style={{ width: "100%", height: 14, marginTop: 4 }} />
      <div className="skeleton" style={{ width: "75%", height: 14, marginTop: 4 }} />
    </article>
  );
}
```

Use the same container, same spacing, same dimensions. When the real content loads, only the content changes — not the layout.

### Framework Patterns

**React Suspense** — declarative loading boundaries:

```tsx
<Suspense fallback={<UserListSkeleton />}>
  <UserList />
</Suspense>
```

**Vue `<Suspense>`** — similar concept:

```vue
<Suspense>
  <template #default><UserList /></template>
  <template #fallback><UserListSkeleton /></template>
</Suspense>
```

**Angular** — `@defer` with loading and error templates:

```html
@defer {
  <user-list />
} @loading {
  <user-list-skeleton />
} @error {
  <error-message />
}
```

### Common Pitfalls

**No loading state.** The page is blank for two seconds, then content appears. The user thinks the page is broken.

**Flash of loading.** Showing a spinner for 50ms on a fast connection creates a jarring flicker. Add a minimum delay before showing loading indicators (200–300ms).

**Empty catch blocks.** `catch (e) {}` — the error is swallowed, the user sees nothing, the developer has no debugging information. Always handle errors visibly.

**Full-page loading for partial data.** Only the comments section is loading, but the entire page shows a spinner. Scope loading states to the smallest relevant area.

**Error states with no recovery.** "Something went wrong." And then what? Always give the user a next step: retry, go back, contact support, refresh the page.

**Layout shift on load.** The skeleton is 200px tall, the real content is 400px. Everything below jumps. Match skeleton dimensions to real content dimensions.

### Key Takeaways

- Every data view has exactly four states: loading, success, error, empty. Handle all four explicitly.
- Use skeleton screens when the layout is predictable. Delay showing loading indicators for operations under 200ms.
- Error messages must tell the user what to do, not just what went wrong.
- Empty states are a design opportunity — guide users toward their next action.
- Scope loading and error states to the smallest relevant section of the page, not the entire view.

---

## Topic 4: URL State Management

**Stage 3 — The URL as a State Manager**

### Why This Matters

The URL is the most underused state manager in frontend development. It's built into the browser. It's shareable. It survives page refreshes. It supports back/forward navigation. It enables server-side rendering. And yet, most developers store filter state, search queries, and pagination in component state — which evaporates the moment someone shares a link or hits refresh.

### What Belongs in the URL

URL state is state that should survive a page share. Ask: "If someone copies this URL and sends it to a colleague, should they see the same view?"

**Yes — put it in the URL:**

| State type      | Example URL                                    |
|-----------------|------------------------------------------------|
| Search query    | `?q=typescript`                                |
| Filters         | `?status=active&role=admin`                    |
| Pagination      | `?page=3&pageSize=25`                          |
| Sort order      | `?sort=name&dir=asc`                           |
| Active tab      | `?tab=settings`                                |
| Selected item   | `/users/42` or `?selected=42`                  |
| View mode       | `?view=grid`                                   |

**No — keep it out of the URL:**

| State type            | Why not the URL                                    |
|-----------------------|----------------------------------------------------|
| Form input mid-typing | Changes too frequently, not shareable state         |
| Tooltip/dropdown open | Ephemeral UI state, irrelevant to another user      |
| Auth tokens           | Security risk — URLs are logged and shared          |
| Modal open/closed     | Usually ephemeral (though deep-linkable modals are an exception) |
| Scroll position       | Browser handles this automatically                  |

### The `URLSearchParams` API

You don't need a library. The browser has this built in.

```javascript
// Read parameters from the current URL
const params = new URLSearchParams(window.location.search);
const query = params.get("q");         // "typescript" or null
const page = Number(params.get("page")) || 1;
const tags = params.getAll("tag");     // ["react", "vue"]

// Build new parameters
const newParams = new URLSearchParams();
newParams.set("q", "typescript");
newParams.set("page", "3");
newParams.append("tag", "react");
newParams.append("tag", "vue");
console.log(newParams.toString()); // "q=typescript&page=3&tag=react&tag=vue"
```

```javascript
// Update the URL without a page reload
function setUrlParams(params: Record<string, string>) {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  });
  window.history.pushState({}, "", url);
}
```

### Framework Integration

**React Router — `useSearchParams`:**

```tsx
import { useSearchParams } from "react-router-dom";

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "all";
  const page = Number(searchParams.get("page")) || 1;

  const setCategory = (cat: string) => {
    setSearchParams((prev) => {
      prev.set("category", cat);
      prev.set("page", "1"); // Reset page on filter change
      return prev;
    });
  };

  return (/* render with category and page */);
}
```

**Vue Router — `route.query`:**

```vue
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();

const category = computed(() => route.query.category ?? 'all');
const page = computed(() => Number(route.query.page) || 1);

function setCategory(cat) {
  router.push({ query: { ...route.query, category: cat, page: '1' } });
}
</script>
```

**Angular — `ActivatedRoute`:**

```typescript
@Component({ /* ... */ })
export class ProductListComponent {
  category$ = this.route.queryParamMap.pipe(
    map(params => params.get('category') ?? 'all')
  );
  page$ = this.route.queryParamMap.pipe(
    map(params => Number(params.get('page')) || 1)
  );

  constructor(private route: ActivatedRoute, private router: Router) {}

  setCategory(cat: string) {
    this.router.navigate([], {
      queryParams: { category: cat, page: 1 },
      queryParamsHandling: 'merge',
    });
  }
}
```

### The URL as Single Source of Truth

This is the critical concept. The URL should not be a mirror of component state — it should be the source.

```tsx
// Wrong: state is the source, URL is a mirror
function SearchPage() {
  const [query, setQuery] = useState("");
  useEffect(() => {
    // Syncing state → URL is fragile, leads to race conditions
    setUrlParam("q", query);
  }, [query]);
}

// Right: URL is the source, component reads from it
function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const setQuery = (q: string) => {
    setSearchParams({ q }); // URL changes, component re-renders, done
  };
}
```

When the URL is the source, there's no syncing problem. The URL changes, the component reads the new value, the UI updates. One direction.

### Encoding Complex State

**Arrays:** Use repeated keys or comma separation.

```javascript
// Repeated keys (standard-compliant)
// ?tag=react&tag=vue → params.getAll("tag") → ["react", "vue"]

// Comma-separated (simpler URLs)
// ?tags=react,vue → params.get("tags").split(",") → ["react", "vue"]
```

**Default values:** Omit defaults from the URL to keep it clean.

```typescript
function buildSearchUrl(filters: Filters): string {
  const params = new URLSearchParams();
  // Only add non-default values
  if (filters.query) params.set("q", filters.query);
  if (filters.page > 1) params.set("page", String(filters.page));
  if (filters.sort !== "relevance") params.set("sort", filters.sort);
  return `?${params.toString()}`;
}
```

### Common Pitfalls

**Storing everything in the URL.** Form drafts, modal state, accordion open/closed — this bloats the URL and confuses users who share it.

**Ignoring URL state on initial render.** The page loads at `/products?category=electronics&page=3` but the component initializes with `category = "all"` and `page = 1`, ignoring the URL. Always read from the URL on mount.

```tsx
// Wrong: ignores URL on mount
const [page, setPage] = useState(1);

// Right: reads from URL on mount
const [searchParams] = useSearchParams();
const page = Number(searchParams.get("page")) || 1;
```

**Not encoding user input.** If a user searches for `price > 100 & sale`, that `&` will break your URL parameters. `URLSearchParams` handles encoding automatically — use it. Never concatenate URL strings manually.

```javascript
// Dangerous: manual string concatenation
const url = `/search?q=${userInput}`; // XSS risk, encoding bugs

// Safe: URLSearchParams handles encoding
const params = new URLSearchParams({ q: userInput });
const url = `/search?${params}`;
```

**Not resetting dependent state.** User is on page 5, changes the category filter, and the URL still says `page=5` — but the new category only has 2 pages. Reset pagination when filters change.

**Parameters that don't roundtrip.** If `parse(serialize(state)) !== state`, you'll have subtle bugs. Test that your URL encoding/decoding is lossless.

### Key Takeaways

- If state should survive a link share, it belongs in the URL. If not, it doesn't.
- The URL is the source of truth, not a mirror of component state. Read from it, don't sync to it.
- Use `URLSearchParams` for encoding — never concatenate URL strings with user input.
- Read URL state on initial render. Ignoring it is one of the most common bugs.
- Reset dependent state (like pagination) when independent state (like filters) changes.

---

## Topic 5: Form State Management

**Stage 3 — Forms as a Distinct Concern**

### Why This Matters

Forms are the most complex interactive pattern in frontend development. A search input has one state. A multi-step registration form has dozens: field values, validation errors, touched status, dirty status, submission state, server errors. Getting forms wrong means users lose data, see confusing errors, or submit invalid information. Forms deserve dedicated patterns because they combine multiple hard problems at once.

### Why Forms Are Special

A form is not just a collection of inputs. It has concerns that normal UI state does not:

| Concern           | What it means                                      |
|-------------------|----------------------------------------------------|
| **Values**        | Current data in each field                         |
| **Errors**        | Validation messages per field and/or for the whole form |
| **Touched**       | Has the user interacted with this field?           |
| **Dirty**         | Has the value changed from the initial value?      |
| **Submitting**    | Is the form currently being submitted?             |
| **Submit count**  | How many times has the user attempted to submit?   |

A typical `useState` call manages one value. Forms need coordinated state across all of these dimensions.

### Controlled vs Uncontrolled Forms

**Controlled forms** — React or framework state holds every field value. Every keystroke triggers a state update.

```tsx
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Log in</button>
    </form>
  );
}
```

Controlled: predictable, inspectable, easy to validate on every change. But verbose — every field needs its own state and handler.

**Uncontrolled forms** — the DOM holds the values. You read them on submit.

```tsx
function LoginForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // submit { email, password }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" defaultValue="" />
      <input name="password" type="password" />
      <button type="submit">Log in</button>
    </form>
  );
}
```

Uncontrolled: simple, less code, leverages the browser's built-in form handling. But harder to validate before submit, harder to conditionally enable/disable fields, harder to show real-time feedback.

| | Controlled | Uncontrolled |
|---|---|---|
| Code volume | More | Less |
| Real-time validation | Easy | Hard |
| Performance (many fields) | Can be slow (re-renders) | Better (no re-renders) |
| Read values at any time | Yes | Only on submit |
| Best for | Complex forms with validation | Simple forms, performance-critical |

### Form Libraries

For anything beyond a login form, use a form library. They solve the coordination problem.

**React Hook Form** — the current standard for React. Uncontrolled by default for performance, with opt-in controlled fields.

```tsx
import { useForm } from "react-hook-form";

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: "", name: "" },
  });

  const onSubmit = (data) => api.createUser(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: "Email is required" })} />
      {errors.email && <span>{errors.email.message}</span>}
      <input {...register("name", { required: "Name is required" })} />
      {errors.name && <span>{errors.name.message}</span>}
      <button type="submit">Sign up</button>
    </form>
  );
}
```

**VeeValidate** — form handling for Vue:

```vue
<script setup>
import { useForm } from 'vee-validate';

const { handleSubmit, defineField, errors } = useForm({
  initialValues: { email: '', name: '' },
});

const [email, emailAttrs] = defineField('email');
const [name, nameAttrs] = defineField('name');

const onSubmit = handleSubmit((values) => api.createUser(values));
</script>
```

**Angular Reactive Forms** — built into the framework:

```typescript
@Component({ /* ... */ })
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.form.valid) api.createUser(this.form.value);
  }
}
```

### Validation Strategies

When you validate matters as much as what you validate.

**On change** — validate on every keystroke. Immediate feedback but can be annoying ("Invalid email" while the user is still typing).

**On blur** — validate when the user leaves the field. Gives the user time to finish typing before showing errors. This is usually the best default.

**On submit** — validate when the form is submitted. Least intrusive but gives the latest feedback. Users might fill out an entire form before learning the first field was wrong.

The best UX is often a combination:

```
First validation: on blur (or on submit)
Subsequent validation: on change (clear the error as soon as the user fixes it)
```

```tsx
// React Hook Form supports this out of the box
const { register, handleSubmit, formState: { errors } } = useForm({
  mode: "onBlur",           // First validation on blur
  reValidateMode: "onChange" // After first error, re-validate on change
});
```

### Schema-Based Validation

Define your validation rules as a schema. Reuse it on client and server.

```typescript
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Must be at least 8 characters"),
  age: z.number().min(13, "Must be at least 13 years old"),
});

// Use on the client with React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";

const { register, handleSubmit } = useForm({
  resolver: zodResolver(signupSchema),
});

// Use on the server (same schema)
function handleSignup(body: unknown) {
  const result = signupSchema.safeParse(body);
  if (!result.success) return { errors: result.error.flatten() };
  createUser(result.data);
}
```

One schema definition. Two validation contexts. Zero drift between client and server rules.

**Zod, Yup, Valibot** — all serve this purpose. Zod has the strongest TypeScript integration and is the most common choice in modern projects. Valibot is the smallest (tree-shakable). Yup is the oldest and most battle-tested.

### Multi-Step Forms (Wizards)

Multi-step forms add complexity: preserving state across steps, validating per step, and letting users navigate back without losing data.

```tsx
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const updateFields = (fields: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  switch (step) {
    case 1: return <PersonalInfo data={formData} onUpdate={updateFields} onNext={next} />;
    case 2: return <Address data={formData} onUpdate={updateFields} onNext={next} onBack={back} />;
    case 3: return <Review data={formData} onSubmit={submitAll} onBack={back} />;
  }
}
```

Key rules for multi-step forms:

1. **Validate each step independently.** Don't let the user advance to step 2 with invalid step 1 data.
2. **Preserve state when navigating back.** Going back to step 1 should show the values they already entered.
3. **Show progress.** A step indicator ("Step 2 of 3") reduces anxiety and abandonment.
4. **Submit only at the end.** Don't hit the server on every step transition unless you need to (e.g., checking if an email is already registered).

### Form Submission

Handle submission as a state machine: idle, submitting, success, error.

```tsx
function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setStatus("submitting");
    try {
      await api.submitContact(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      // If the server returns field-level errors, apply them
      if (err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, message]) => {
          setError(field, { message });
        });
      }
    }
  };

  if (status === "success") {
    return <p>Thanks! We'll be in touch.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {status === "error" && <div role="alert">Submission failed. Please try again.</div>}
      {/* fields */}
      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
```

**Preventing double submission:** Disable the submit button while `status === "submitting"`. Never rely on the user not clicking twice.

**Server validation errors:** The server might reject data that passed client validation (e.g., "email already registered"). Map server errors back to specific fields.

### Field-Level vs Form-Level Errors

**Field-level errors** appear next to the field they relate to: "Email is required", "Password must be at least 8 characters". Use for validation issues tied to a specific input.

**Form-level errors** appear at the top or bottom of the form: "Unable to create account. Please try again." Use for submission failures, server errors, and cross-field validation issues ("End date must be after start date").

```tsx
<form>
  {/* Form-level error */}
  {formError && <div role="alert" className="form-error">{formError}</div>}

  {/* Field-level error */}
  <label>
    Email
    <input {...register("email")} aria-invalid={!!errors.email} />
    {errors.email && <span role="alert">{errors.email.message}</span>}
  </label>
</form>
```

### Common Pitfalls

**Validating on every keystroke from the start.** The user types "j" into the email field and immediately sees "Invalid email address." They know. They haven't finished typing. Validate on blur first, then re-validate on change after the first error appears.

**Validating only on submit.** The user fills out 15 fields, hits submit, and gets a wall of errors. Validate incrementally so errors are caught early.

**Client-side-only validation.** Client validation is a UX feature, not a security feature. An attacker can bypass your client entirely. Always validate on the server too — and use the same schema (Zod) for both.

**Losing form data on navigation.** The user fills out a long form, accidentally clicks a link, and loses everything. Warn them before navigating away from a dirty form.

```tsx
// React Router: warn on navigation away from dirty form
useEffect(() => {
  const handler = (e: BeforeUnloadEvent) => {
    if (isDirty) e.preventDefault();
  };
  window.addEventListener("beforeunload", handler);
  return () => window.removeEventListener("beforeunload", handler);
}, [isDirty]);
```

**Form state in a global store.** Putting form values in Redux/Zustand/Pinia is almost never necessary. Form state is local — it belongs in the component (or a form library). Global stores are for state that multiple unrelated components need to read.

**A single giant form component.** A 500-line component that renders all fields, handles all validation, manages all submission logic. Break it into field groups, extract validation to a schema, and separate submission logic into a custom hook or service.

### Key Takeaways

- Forms have unique concerns (values, errors, touched, dirty, submission status) that regular state management patterns don't address well. Use a form library for anything non-trivial.
- Validate on blur first, then re-validate on change after errors appear. This gives the best UX balance.
- Use schema-based validation (Zod) to share rules between client and server.
- Prevent double submission by disabling the button during submit. Handle server validation errors by mapping them back to fields.
- Form state is local. It almost never belongs in a global store.
