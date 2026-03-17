# Stage 1: Foundations Reference

> The platform before the framework. Every framework compiles down to HTML, CSS, and JavaScript. If you don't understand what happens at that layer, you will fight the framework instead of using it.

---

## 1. Semantic HTML & the DOM

### Why This Matters

HTML is not a formatting language. It is a **structural description** of your content. When you pick the right element, you get behavior for free: screen readers announce sections correctly, search engines understand your page hierarchy, and browsers apply sensible default styles. When you pick the wrong element, you spend hours reimplementing what the browser already provides.

### Document Structure

Every HTML document follows the same skeleton:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A brief summary of this page for search engines">
  <title>Page Title — Site Name</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <!-- All visible content goes here -->
</body>
</html>
```

What each piece does:

- **`<!DOCTYPE html>`** tells the browser to use standards mode, not quirks mode. Always include it.
- **`<html lang="en">`** declares the document language. Screen readers use this to pick the right pronunciation engine.
- **`<meta charset="UTF-8">`** must be the first element in `<head>`. Without it, characters outside ASCII may render as garbage.
- **`<meta name="viewport">`** makes the page responsive on mobile. Without it, phones render the page at a desktop width and shrink it down.
- **`<title>`** appears in the browser tab, bookmarks, and search results. Every page must have a unique, descriptive title.
- **`<meta name="description">`** is the snippet shown in search results. Keep it under 160 characters.

### Semantic Elements

Semantic elements describe **what the content is**, not how it looks. Here are the ones you will use constantly:

```html
<body>
  <header>
    <nav aria-label="Main">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h1>Article Title</h1>
      <time datetime="2026-03-17">March 17, 2026</time>
      <p>Article content...</p>

      <figure>
        <img src="chart.png" alt="Bar chart showing monthly revenue growth">
        <figcaption>Revenue grew 40% quarter over quarter.</figcaption>
      </figure>
    </article>

    <aside>
      <h2>Related Articles</h2>
      <ul>
        <li><a href="/post-2">Another post</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 My Company</p>
  </footer>
</body>
```

Element reference:

| Element | Purpose |
|---------|---------|
| `<header>` | Introductory content for its nearest sectioning ancestor (page or article) |
| `<nav>` | A group of navigation links. Add `aria-label` when you have multiple `<nav>` elements |
| `<main>` | The dominant content of the page. Only one per page |
| `<section>` | A thematic grouping of content, typically with a heading |
| `<article>` | Self-contained content that could stand alone (blog post, comment, product card) |
| `<aside>` | Content tangentially related to the surrounding content (sidebar, callout) |
| `<footer>` | Footer for its nearest sectioning ancestor |
| `<figure>` / `<figcaption>` | An image, diagram, or code snippet with an optional caption |
| `<time>` | A date or time. Use the `datetime` attribute for machine-readable format |
| `<mark>` | Highlighted text (search result match, for example) |
| `<details>` / `<summary>` | A native disclosure widget — click to expand/collapse. No JavaScript needed |

### The `<div>` vs Semantic Element Decision

Use this decision process:

1. **Does this content have a specific meaning?** (navigation, article, sidebar, header, footer) → Use the matching semantic element.
2. **Is this a thematic grouping with a heading?** → Use `<section>`.
3. **Is this self-contained content?** → Use `<article>`.
4. **Do I need a generic container purely for styling or layout?** → Use `<div>`.

The rule is simple: **`<div>` is the last resort, not the default.** A `<div>` tells the browser and assistive technology nothing about the content inside it. When you use `<nav>`, screen readers announce "navigation." When you use `<div>`, they announce nothing.

### Forms

Forms are where HTML gives you the most free behavior — if you use it correctly.

```html
<form action="/signup" method="post">
  <fieldset>
    <legend>Account Information</legend>

    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      autocomplete="email"
    >

    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      required
      minlength="8"
      maxlength="128"
    >
  </fieldset>

  <fieldset>
    <legend>Preferences</legend>

    <label for="age">Age</label>
    <input type="number" id="age" name="age" min="13" max="150">

    <label for="website">Website</label>
    <input
      type="url"
      id="website"
      name="website"
      pattern="https://.*"
      placeholder="https://example.com"
    >
  </fieldset>

  <button type="submit">Create Account</button>
</form>
```

Key concepts:

- **`<label>`** must be associated with its input via `for`/`id` match. Clicking the label focuses the input. Screen readers read the label when the input is focused.
- **`<fieldset>` / `<legend>`** groups related inputs and gives the group a visible, accessible name.
- **Native validation attributes** — `required`, `pattern`, `min`, `max`, `minlength`, `maxlength`, `type="email"` — give you client-side validation with zero JavaScript. The browser shows error messages, prevents submission, and highlights invalid fields automatically.
- **`autocomplete`** attributes tell the browser which saved data to suggest (e.g., `autocomplete="email"`, `autocomplete="new-password"`).
- **`<button type="submit">`** is the standard submit button inside a form. Never use `<div onclick>` for form submission.

Common `<input>` types and what they provide:

| Type | Provides |
|------|----------|
| `text` | Standard text input |
| `email` | Email keyboard on mobile, validates email format |
| `password` | Masks input, triggers password managers |
| `number` | Numeric keyboard on mobile, validates numeric input |
| `tel` | Phone keyboard on mobile |
| `url` | URL keyboard on mobile, validates URL format |
| `date` | Native date picker |
| `search` | Clear button, search keyboard on mobile |
| `checkbox` | Boolean toggle |
| `radio` | One-of-many selection (group by `name`) |

### The DOM Mental Model

The DOM (Document Object Model) is the browser's live representation of your HTML as a tree of objects. Every element becomes a **node** in this tree.

```
document
└── html
    ├── head
    │   ├── meta
    │   ├── title
    │   └── link
    └── body
        ├── header
        │   └── nav
        │       └── ul
        │           ├── li → a
        │           └── li → a
        ├── main
        │   └── article
        │       ├── h1
        │       └── p
        └── footer
            └── p
```

Relationships:

- **Parent**: the node directly above. `<ul>` is the parent of `<li>`.
- **Child**: a node directly below. `<li>` is a child of `<ul>`.
- **Sibling**: nodes that share the same parent. Two `<li>` elements inside the same `<ul>` are siblings.

The DOM is not your HTML source code. The browser parses HTML, error-corrects it, and constructs the DOM. JavaScript can modify the DOM at runtime — adding, removing, or changing nodes. When a framework "re-renders," it is updating the DOM tree (or a virtual representation of it).

### Common Pitfalls

**Div soup** — using `<div>` for everything:

```html
<!-- Bad: meaningless structure -->
<div class="header">
  <div class="nav">
    <div class="nav-item"><a href="/">Home</a></div>
  </div>
</div>

<!-- Good: semantic structure -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>
```

**Missing form labels** — inputs without associated labels:

```html
<!-- Bad: screen readers say "edit text, blank" -->
<input type="email" placeholder="Enter email">

<!-- Good: screen readers say "Email, edit text" -->
<label for="email">Email</label>
<input type="email" id="email">
```

**Skipping heading levels** — going from `<h1>` to `<h3>`:

```html
<!-- Bad: screen reader users navigate by heading level -->
<h1>Page Title</h1>
<h3>Section Title</h3>

<!-- Good: sequential heading hierarchy -->
<h1>Page Title</h1>
<h2>Section Title</h2>
```

**Table for layout** — using `<table>` to arrange page elements. Tables are for tabular data (rows and columns of related values). Use CSS Grid or Flexbox for layout.

**Span for structure** — using `<span>` where a block-level semantic element is needed. `<span>` is for inline text within a sentence, not for wrapping sections of content.

### Key Takeaways

- HTML describes content structure, not visual appearance. Pick elements by meaning, not by how they look.
- `<div>` is a styling container. Use it only when no semantic element fits.
- Native form elements give you validation, accessibility, and mobile keyboards for free. Use them.
- The DOM is a live tree of objects the browser builds from your HTML. JavaScript and frameworks manipulate this tree.
- Every `<input>` needs a `<label>`. Every page needs exactly one `<h1>`. Headings must descend sequentially.

---

## 2. CSS Box Model & Display

### Why This Matters

Every element on a web page is a rectangular box. The box model determines how big each box is, how much space it takes up, and how it interacts with neighboring boxes. Misunderstanding the box model is the most common source of "why is this 20px wider than I expected?" bugs.

### `content-box` vs `border-box`

By default, CSS uses `content-box`. When you set `width: 200px`, that 200px applies only to the content area. Padding and border are added *on top*:

```
content-box: total width = width + padding-left + padding-right + border-left + border-right
```

So `width: 200px` + `padding: 20px` + `border: 1px solid` = **242px** total. This is almost never what you want.

`border-box` includes padding and border *inside* the specified width:

```
border-box: total width = width (padding and border are subtracted from this)
```

Now `width: 200px` means 200px total, always. The content area shrinks to accommodate padding and border.

### The Universal Reset

Every modern project starts with this:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

This applies `border-box` to every element, including pseudo-elements. Without this, you will constantly fight unexpected sizing. Add it to the top of your CSS and never think about `content-box` again.

### Margin Collapse

Margin collapse is a CSS behavior where adjacent vertical margins combine into a single margin instead of stacking. It is the most misunderstood CSS behavior.

**When it happens:**

Adjacent siblings — the bottom margin of one element and the top margin of the next one collapse into whichever is larger:

```css
.box-a { margin-bottom: 20px; }
.box-b { margin-top: 30px; }
/* Gap between them: 30px, not 50px */
```

Parent-child — if a parent has no padding, border, or `overflow` setting, the child's top margin "escapes" and becomes the parent's top margin:

```css
/* The h1's margin-top collapses through the parent */
.parent { /* no padding or border */ }
.parent h1 { margin-top: 40px; }
/* The 40px appears ABOVE .parent, not inside it */
```

**When it does NOT happen:**

- Flex or grid children — margins never collapse inside a flex or grid container
- Elements with `overflow` set to anything other than `visible`
- Floated elements
- Absolutely positioned elements
- Elements separated by padding or border

The fix for the parent-child case: add `padding: 1px` (or any value) to the parent, use `overflow: auto`, or make the parent a flex/grid container.

### Display Modes

The `display` property controls how an element participates in layout:

**`block`** — takes the full available width, starts on a new line. `<div>`, `<p>`, `<h1>`-`<h6>`, `<section>`, `<article>` are block by default.

```css
.card {
  display: block;
  width: 300px; /* width and height are respected */
  padding: 16px; /* padding works on all sides */
}
```

**`inline`** — flows within text, takes only as much width as its content. `<span>`, `<a>`, `<strong>`, `<em>` are inline by default.

```css
.tag {
  display: inline;
  /* width and height are IGNORED */
  /* vertical padding/margin do NOT push other lines away */
  padding: 4px 8px; /* horizontal padding works, vertical padding overflows */
}
```

**`inline-block`** — flows inline like text but respects width, height, and vertical padding/margin. The best of both:

```css
.badge {
  display: inline-block;
  width: 80px; /* respected */
  padding: 4px 8px; /* all sides work correctly */
}
```

**`none` vs `visibility: hidden`**:

```css
.hidden-removed {
  display: none;
  /* Element is removed from the document flow entirely.
     Takes no space. Screen readers ignore it. */
}

.hidden-invisible {
  visibility: hidden;
  /* Element is invisible but still takes up space.
     Screen readers still see it. Layout is preserved. */
}
```

Use `display: none` to fully remove something. Use `visibility: hidden` when you need to preserve the layout space (e.g., preventing layout shift when toggling content).

### Width and Height Properties

```css
.container {
  width: 100%;          /* fill parent's content area */
  max-width: 1200px;    /* but never wider than 1200px */
  min-width: 320px;     /* and never narrower than 320px */

  min-height: 100vh;    /* at least full viewport height */
  /* Do NOT set a fixed height on content that can grow */
}
```

- **`width`** / **`height`**: set an explicit size
- **`max-width`** / **`max-height`**: set an upper bound (overrides `width` / `height`)
- **`min-width`** / **`min-height`**: set a lower bound (overrides `max-width` / `max-height`)

The priority order is: `min-*` wins over `max-*`, which wins over `width`/`height`.

### Stacking Context and `z-index`

`z-index` controls which elements appear on top of others — but it only works within a **stacking context**.

**When does `z-index` work?**

`z-index` has no effect on static-positioned elements. It only works on elements with `position` set to `relative`, `absolute`, `fixed`, or `sticky`. It also works on flex/grid children.

**What creates a new stacking context?**

A new stacking context is created by any of these:

- `position: relative/absolute/fixed/sticky` combined with a `z-index` value other than `auto`
- `opacity` less than `1`
- `transform`, `filter`, `perspective`, `clip-path` set to any value
- `isolation: isolate`

**Why this matters:** elements inside a stacking context can only compete for z-order *within* that context. A `z-index: 9999` inside a stacking context with `z-index: 1` will still appear behind a sibling with `z-index: 2`:

```css
/* Parent A creates stacking context at z-index: 1 */
.sidebar { position: relative; z-index: 1; }
.sidebar .tooltip { position: absolute; z-index: 9999; } /* trapped at level 1 */

/* Parent B at z-index: 2 covers everything in Parent A */
.main-content { position: relative; z-index: 2; }
```

The tooltip's 9999 is irrelevant — it cannot escape its parent's stacking context. The fix: restructure so the tooltip is not nested inside a lower stacking context, or use `isolation: isolate` deliberately.

### Common Pitfalls

**Using `px` for everything:**

```css
/* Bad: doesn't respect user's font size preferences */
.card { padding: 16px; font-size: 14px; margin-bottom: 24px; }

/* Good: scales with user preferences */
.card { padding: 1rem; font-size: 0.875rem; margin-bottom: 1.5rem; }
```

**`!important` chains** — using `!important` to win specificity fights:

```css
/* This spiral has no exit */
.button { color: blue !important; }
.button.primary { color: red !important; }
.nav .button.primary { color: green !important; }
```

If you need `!important`, it means your specificity architecture is broken. Fix the selectors, use CSS layers (`@layer`), or restructure your class naming.

**Setting explicit heights on content:**

```css
/* Bad: content overflows when text is longer than expected */
.card { height: 200px; }

/* Good: card grows with content, has a minimum size */
.card { min-height: 200px; }
```

**Overriding framework styles with specificity hacks:**

```css
/* Bad: fragile, breaks on framework updates */
body div.MuiButton-root.MuiButton-contained {
  background: blue;
}

/* Good: use the framework's theming API or CSS custom properties */
:root {
  --primary-color: blue;
}
```

### Key Takeaways

- Always use `box-sizing: border-box` globally. It makes `width` mean what you think it means.
- Margin collapse only happens vertically, only between block elements, and never inside flex/grid containers.
- `display: none` removes from flow; `visibility: hidden` hides but keeps the space.
- `z-index` only works on positioned elements and only competes within the same stacking context.
- Use `min-height` instead of `height` for content containers. Content grows; fixed heights overflow.

---

## 3. CSS Flexbox

### Why This Matters

Flexbox is the layout system for arranging items along a **single axis** — either a row or a column. Before Flexbox, centering an element vertically required hacks. Distributing space equally between items was painful. Flexbox solved all of this with a small, learnable set of properties.

### Container vs Items

Flexbox has two roles: the **flex container** (parent) and the **flex items** (direct children).

```css
.container {
  display: flex; /* This element is now a flex container */
}
```

Only the container's direct children become flex items. Grandchildren are not affected.

```html
<div class="container">     <!-- flex container -->
  <div class="item">A</div> <!-- flex item -->
  <div class="item">B</div> <!-- flex item -->
  <div class="item">        <!-- flex item -->
    <span>Not a flex item — this is a grandchild</span>
  </div>
</div>
```

### Main Axis vs Cross Axis

Flexbox operates on two axes:

- **Main axis**: the direction items flow. Horizontal by default (`flex-direction: row`).
- **Cross axis**: perpendicular to the main axis. Vertical by default.

```
flex-direction: row (default)
Main axis:  ← ─ ─ ─ ─ ─ ─ ─ →
Cross axis: ↑
             |
             ↓

flex-direction: column
Main axis:  ↑
             |
             ↓
Cross axis: ← ─ ─ ─ ─ ─ ─ ─ →
```

This distinction is critical: `justify-content` always controls the **main** axis. `align-items` always controls the **cross** axis. When you switch `flex-direction`, which axis is horizontal and which is vertical swaps.

### `flex-direction`

```css
.row         { flex-direction: row; }            /* left to right (default) */
.column      { flex-direction: column; }         /* top to bottom */
.row-rev     { flex-direction: row-reverse; }    /* right to left */
.col-rev     { flex-direction: column-reverse; }  /* bottom to top */
```

### `justify-content` (Main Axis)

Controls how items are distributed along the main axis:

```css
.container { display: flex; justify-content: flex-start; }
/* |A B C                    | */

.container { display: flex; justify-content: center; }
/* |         A B C           | */

.container { display: flex; justify-content: flex-end; }
/* |                    A B C| */

.container { display: flex; justify-content: space-between; }
/* |A         B         C| */

.container { display: flex; justify-content: space-around; }
/* |  A      B      C  | */
/* (equal space around each item — edges get half) */

.container { display: flex; justify-content: space-evenly; }
/* |   A     B     C   | */
/* (equal space everywhere, including edges) */
```

### `align-items` (Cross Axis)

Controls how items are positioned along the cross axis:

```css
.container { display: flex; align-items: stretch; }
/* Default. Items stretch to fill the container's cross-axis size. */

.container { display: flex; align-items: flex-start; }
/* Items align to the start of the cross axis (top for row). */

.container { display: flex; align-items: center; }
/* Items are vertically centered (for row direction). */

.container { display: flex; align-items: flex-end; }
/* Items align to the end of the cross axis (bottom for row). */

.container { display: flex; align-items: baseline; }
/* Items align by their text baseline. Useful for mixed font sizes. */
```

### `align-self`

Override `align-items` for a single item:

```css
.container { display: flex; align-items: flex-start; }
.special-item { align-self: center; } /* only this item is centered */
```

### `flex-wrap`

By default, all items squeeze onto one line, shrinking as needed:

```css
.container { display: flex; flex-wrap: nowrap; }  /* default: single line */
.container { display: flex; flex-wrap: wrap; }     /* items wrap to new lines */
```

With `wrap`, items move to the next line when they cannot fit. This is essential for responsive layouts.

### The `flex` Shorthand

The `flex` property on items controls how they grow, shrink, and their base size:

```css
.item { flex: 1; }
/* Shorthand for: flex-grow: 1; flex-shrink: 1; flex-basis: 0%; */
/* Item will grow to fill available space */
```

The three components:

- **`flex-grow`**: how much of the remaining space this item should take. `0` means don't grow. `1` means take an equal share. `2` means take double the share of `1` items.
- **`flex-shrink`**: how much this item should shrink when space is tight. `0` means don't shrink. `1` is the default.
- **`flex-basis`**: the starting size before growing or shrinking. Can be a length (`200px`, `30%`) or `auto` (use the item's content size or `width`).

```css
.sidebar { flex: 0 0 250px; }  /* don't grow, don't shrink, always 250px */
.content { flex: 1; }          /* take all remaining space */
```

### `gap`

Spacing between flex items without using margins:

```css
.container {
  display: flex;
  gap: 16px;       /* equal gap in all directions */
  /* or */
  gap: 16px 24px;  /* row-gap column-gap */
}
```

`gap` is cleaner than margins because it only applies *between* items, never on the outside edges.

### Common Patterns

**Centering on both axes** (the most famous Flexbox use case):

```css
.center-everything {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

**Navigation bar:**

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}
.nav-links { display: flex; gap: 1.5rem; }
```

**Card row that wraps:**

```css
.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.card { flex: 1 1 300px; } /* grow, shrink, minimum 300px */
```

**Sticky footer** (footer sticks to bottom even when content is short):

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main { flex: 1; } /* main grows to push footer down */
footer { /* stays at bottom naturally */ }
```

**Sidebar layout:**

```css
.layout {
  display: flex;
  gap: 2rem;
}
.sidebar { flex: 0 0 250px; }
.content { flex: 1; min-width: 0; } /* min-width: 0 prevents overflow */
```

### Common Pitfalls

**Nesting Flexbox 5 levels deep:**

```css
/* Bad: hard to debug, hard to maintain */
.page { display: flex; }
  .section { display: flex; }
    .row { display: flex; }
      .col { display: flex; }
        .item { display: flex; }
```

If you need deeply nested flex containers, your HTML structure is likely overcomplicated. Flatten it or use Grid for the outer layout.

**Using Flexbox for 2D layouts:**

```css
/* Bad: Flexbox for a grid of cards with aligned rows and columns */
.card-grid {
  display: flex;
  flex-wrap: wrap;
}
.card { width: calc(33.333% - 1rem); } /* manual math, fragile */

/* Good: Grid is designed for 2D */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}
```

**Confusing `flex-basis` and `width`:**

When `flex-direction` is `row`, `flex-basis` and `width` both set horizontal size. But `flex-basis` wins — it overrides `width` when both are set. When `flex-direction` is `column`, `flex-basis` controls **height**, not width. Use `flex-basis` in flex layouts, and `width`/`height` outside of them.

**Overflow with `flex: 1`:**

```css
/* Bug: long text in a flex child overflows the container */
.content { flex: 1; }

/* Fix: allow the flex item to shrink below its content size */
.content { flex: 1; min-width: 0; }
```

Flex items have an implicit `min-width: auto`, meaning they refuse to shrink below their content size. Set `min-width: 0` to override this.

### Key Takeaways

- `justify-content` controls the main axis; `align-items` controls the cross axis. Switching `flex-direction` swaps which physical direction each controls.
- `flex: 1` means "grow to fill available space." `flex: 0 0 250px` means "stay exactly 250px."
- Use `gap` instead of margins for spacing between flex items.
- Set `min-width: 0` on flex items that contain text or other content that might overflow.
- If you need items aligned in both rows AND columns, use Grid instead of Flexbox.

---

## 4. CSS Grid

### Why This Matters

CSS Grid is the layout system for **two-dimensional layouts** — controlling rows and columns simultaneously. Flexbox handles one axis at a time. Grid handles both. With Grid, you can build page layouts, card grids, and dashboards with less code, less math, and better responsiveness than any other CSS technique.

### Container vs Items

Like Flexbox, Grid has a container and items:

```css
.grid {
  display: grid;
}
```

Direct children of the grid container become grid items.

### Defining Columns and Rows

```css
.grid {
  display: grid;
  grid-template-columns: 200px 1fr 200px;  /* 3 columns */
  grid-template-rows: auto 1fr auto;        /* 3 rows */
}
```

This creates a 3-column, 3-row grid. The first and third columns are 200px wide. The middle column takes all remaining space (`1fr`). The rows are sized by content (`auto`) for the first and last, and the middle row fills the remaining height.

### The `fr` Unit

`fr` stands for "fraction of available space." It distributes remaining space proportionally:

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  /* First column: 25% of space
     Second column: 50% of space
     Third column: 25% of space */
}
```

`fr` is calculated *after* fixed-size columns and gaps are subtracted. So in `200px 1fr 1fr`, the two `1fr` columns split whatever is left after the 200px column and any gaps.

### `repeat()`

Avoid repetition:

```css
/* Instead of: */
grid-template-columns: 1fr 1fr 1fr 1fr;

/* Write: */
grid-template-columns: repeat(4, 1fr);
```

### `minmax()`

Set a size range for tracks:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  /* Each column is at least 200px, at most 1fr */
}
```

### `auto-fill` vs `auto-fit`

Both create as many columns as will fit. The difference is what happens with leftover space:

```css
/* auto-fill: creates empty tracks for leftover space */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

/* auto-fit: collapses empty tracks, existing items stretch to fill */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
```

With 3 items in a wide container:

- **`auto-fill`**: 3 items at 200px-ish width, empty track(s) fill the rest. Items do NOT stretch beyond their minimum.
- **`auto-fit`**: 3 items stretch to fill the entire container width. No empty tracks.

**Use `auto-fit`** when you want items to grow and fill available space (most common). **Use `auto-fill`** when you want items to maintain a consistent size regardless of container width.

### `gap`

```css
.grid {
  display: grid;
  gap: 1rem;              /* equal row and column gap */
  /* or */
  row-gap: 1rem;
  column-gap: 2rem;
}
```

### Placing Items

Items are placed automatically by default (in order, filling each row). You can place items explicitly:

```css
.header {
  grid-column: 1 / -1;  /* span all columns (1 to last) */
}

.sidebar {
  grid-column: 1 / 2;   /* first column */
  grid-row: 2 / 4;      /* span rows 2 and 3 */
}

.card {
  grid-column: span 2;  /* span 2 columns from current position */
}
```

Grid lines are numbered starting at 1. Negative numbers count from the end (`-1` is the last line).

### Named Grid Areas

The most readable way to define layouts:

```css
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  min-height: 100vh;
}

.page-header  { grid-area: header; }
.page-sidebar { grid-area: sidebar; }
.page-content { grid-area: content; }
.page-footer  { grid-area: footer; }
```

Each string in `grid-template-areas` represents one row. Each word represents one column in that row. Repeating a name spans the item across those columns/rows. Use `.` for empty cells.

### Implicit vs Explicit Grids

The **explicit grid** is what you define with `grid-template-columns` and `grid-template-rows`. If you have more items than cells, Grid creates new rows automatically — this is the **implicit grid**.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* Only columns defined. Rows are created implicitly. */
  grid-auto-rows: minmax(150px, auto);
  /* Control the size of implicitly created rows */
}
```

`grid-auto-rows` and `grid-auto-columns` control the size of tracks in the implicit grid.

### Common Patterns

**Holy grail layout:**

```css
.layout {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header  header"
    "left   content right"
    "footer footer  footer";
  min-height: 100vh;
  gap: 1rem;
}
```

**Responsive card grid (no media queries):**

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

This single declaration creates a responsive grid: 1 column on small screens, 2 on medium, 3+ on large. No breakpoints needed.

**Dashboard layout:**

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(150px, auto);
  gap: 1rem;
}
.widget-wide { grid-column: span 2; }
.widget-tall { grid-row: span 2; }
.widget-full { grid-column: 1 / -1; }
```

**Magazine-style layout:**

```css
.magazine {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  gap: 1rem;
}
.feature {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
```

### Flexbox vs Grid: When to Use Which

**One dimension (row OR column)** → Flexbox

```
Navigation bar: [Logo] [Home] [About] [Contact] [Login]
```

**Two dimensions (rows AND columns)** → Grid

```
┌──────────────────────────────────┐
│           Header                  │
├─────────┬────────────────────────┤
│ Sidebar │      Content            │
│         │                         │
├─────────┴────────────────────────┤
│           Footer                  │
└──────────────────────────────────┘
```

Both tools work together. Use Grid for the page layout and Flexbox for components within grid cells (e.g., a flex nav inside a grid header).

### Common Pitfalls

**Avoiding Grid because "Flexbox is simpler":**

Grid is not harder than Flexbox — it solves different problems. A responsive card grid in Flexbox requires manual width calculations and margin hacks. In Grid it is one line: `repeat(auto-fit, minmax(280px, 1fr))`.

**Hardcoding column counts:**

```css
/* Bad: breaks on small screens, requires media queries */
.grid { grid-template-columns: repeat(4, 1fr); }

/* Good: adapts automatically to any container width */
.grid { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
```

**Using Grid for simple single-axis layouts:**

```css
/* Overkill: Grid for a row of buttons */
.button-group {
  display: grid;
  grid-template-columns: repeat(3, auto);
}

/* Better: Flexbox for a row of items */
.button-group {
  display: flex;
  gap: 0.5rem;
}
```

**Forgetting `min-width: 0` or `min-height: 0`:**

Grid items, like flex items, have implicit minimums. Content can overflow grid cells if you don't account for this:

```css
/* Fix for text overflow in grid items */
.grid-item {
  min-width: 0;       /* allow shrinking below content width */
  overflow-wrap: break-word; /* break long words if needed */
}
```

### Key Takeaways

- `repeat(auto-fit, minmax(250px, 1fr))` is the most useful single line in CSS. It creates a fully responsive grid with zero media queries.
- Use `grid-template-areas` for page-level layouts — it reads like an ASCII art diagram of your page.
- `auto-fit` collapses empty tracks (items stretch). `auto-fill` keeps empty tracks (items maintain size).
- Use Grid for 2D layouts (page structure, card grids, dashboards). Use Flexbox for 1D layouts (nav bars, button groups, centering).
- Define explicit grids for the structure you know. Use `grid-auto-rows` to handle the implicit rows you don't.

---

## 5. JavaScript Essentials (ES2020+)

### Why This Matters

Modern JavaScript is the language you will write daily. Frameworks abstract some of it, but they cannot hide it — you need closures for hooks, destructuring for props, async/await for data fetching, and array methods for transforming data. Weak JavaScript fundamentals are the #1 predictor of struggling with frameworks.

### Modules: `import` / `export`

Modules are the foundation of code organization. Each file is a module with its own scope.

**Named exports** — export multiple values by name:

```js
// math.js
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// main.js
import { add, subtract } from './math.js';
```

**Default export** — one per module, imported with any name:

```js
// logger.js
export default function log(msg) { console.log(msg); }

// main.js
import log from './logger.js';
import myLogger from './logger.js'; // same thing, different name
```

**Re-exporting** — aggregate modules:

```js
// utils/index.js
export { add, subtract } from './math.js';
export { default as log } from './logger.js';
```

**Dynamic `import()`** — load modules on demand for code splitting:

```js
button.addEventListener('click', async () => {
  const { renderChart } = await import('./chart.js');
  renderChart(data);
});
```

Dynamic imports return a promise and are the basis for lazy loading in every framework.

### `let` / `const` vs `var`

`var` is function-scoped. `let` and `const` are block-scoped.

```js
if (true) {
  var x = 1;   // accessible outside the block
  let y = 2;   // only accessible inside this block
  const z = 3; // only accessible inside this block, cannot be reassigned
}
console.log(x); // 1
console.log(y); // ReferenceError
```

**Temporal dead zone**: `let` and `const` exist in their block from the start but cannot be accessed before their declaration line. Accessing them earlier throws a `ReferenceError`:

```js
console.log(name); // ReferenceError: Cannot access 'name' before initialization
let name = 'Alice';
```

`var` would silently return `undefined` here, which hides bugs. This is why `let`/`const` are better.

**Rule**: Use `const` by default. Use `let` when you need to reassign. Never use `var`.

### Destructuring

Extract values from objects and arrays into variables:

**Object destructuring:**

```js
const user = { name: 'Alice', age: 30, role: 'admin' };
const { name, age } = user;            // name = 'Alice', age = 30
const { role: userRole } = user;       // rename: userRole = 'admin'
const { city = 'Unknown' } = user;     // default: city = 'Unknown'
```

**Array destructuring:**

```js
const [first, second] = [10, 20, 30];    // first = 10, second = 20
const [, , third] = [10, 20, 30];        // skip elements: third = 30
const [head, ...rest] = [1, 2, 3, 4];    // head = 1, rest = [2, 3, 4]
```

**Nested destructuring:**

```js
const response = { data: { users: [{ name: 'Alice' }] } };
const { data: { users: [{ name }] } } = response;
// name = 'Alice'
```

Use nested destructuring sparingly — deeply nested patterns become hard to read.

**Function parameter destructuring:**

```js
function greet({ name, greeting = 'Hello' }) {
  return `${greeting}, ${name}!`;
}
greet({ name: 'Alice' }); // "Hello, Alice!"
```

### Spread and Rest

**Spread** (`...`) expands an iterable into individual elements:

```js
// Arrays
const a = [1, 2];
const b = [...a, 3, 4]; // [1, 2, 3, 4]

// Objects (shallow copy)
const original = { x: 1, y: 2 };
const copy = { ...original, y: 3 }; // { x: 1, y: 3 } — y overridden
```

**Rest** (`...`) collects remaining elements into an array or object:

```js
// Function parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

// Object rest
const { id, ...attrs } = { id: 1, name: 'Alice', age: 30 };
// id = 1, attrs = { name: 'Alice', age: 30 }
```

### Template Literals

String interpolation and multiline strings:

```js
const name = 'Alice';
const greeting = `Hello, ${name}!`;         // "Hello, Alice!"
const multiline = `
  First line
  Second line
`;
```

**Tagged templates** — functions that process template literals:

```js
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) =>
    result + str + (values[i] ? `<mark>${values[i]}</mark>` : ''), ''
  );
}
const query = 'flexbox';
highlight`Search results for ${query} in CSS`
// "Search results for <mark>flexbox</mark> in CSS"
```

Tagged templates are used by libraries like `styled-components` and `graphql-tag`.

### Optional Chaining (`?.`) and Nullish Coalescing (`??`)

**Optional chaining** safely accesses nested properties that might be `null` or `undefined`:

```js
const user = { address: { city: 'Paris' } };
const city = user.address?.city;     // 'Paris'
const zip = user.address?.zip;       // undefined (not an error)
const country = user.location?.country; // undefined (not an error)

// Works on methods and arrays too
const result = obj.method?.();       // calls method if it exists
const item = arr?.[0];               // accesses index if arr is not null
```

**Nullish coalescing** provides a default only for `null` or `undefined` (not for `0`, `''`, or `false`):

```js
const port = config.port ?? 3000;    // 3000 only if port is null/undefined
const port2 = config.port || 3000;   // 3000 if port is null, undefined, 0, '', or false

// This matters:
const count = 0;
count ?? 10;  // 0 — correct, 0 is a valid count
count || 10;  // 10 — wrong, treats 0 as falsy
```

**Rule**: Use `??` when `0`, `''`, or `false` are valid values. Use `||` only when all falsy values should trigger the default.

### `async` / `await`

Promises made readable:

```js
// Promise chain (harder to follow)
fetchUser(id)
  .then(user => fetchPosts(user.id))
  .then(posts => renderPosts(posts))
  .catch(err => showError(err));

// async/await (reads top-to-bottom)
async function loadUserPosts(id) {
  try {
    const user = await fetchUser(id);
    const posts = await fetchPosts(user.id);
    renderPosts(posts);
  } catch (err) {
    showError(err);
  }
}
```

**Parallel execution** — when requests are independent:

```js
// Bad: sequential — each waits for the previous
const user = await fetchUser(id);
const posts = await fetchPosts(id);
const comments = await fetchComments(id);

// Good: parallel — all start simultaneously
const [user, posts, comments] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
  fetchComments(id),
]);
```

**`Promise.all` vs `Promise.allSettled`**:

```js
// Promise.all: fails fast — if ANY promise rejects, the whole thing rejects
await Promise.all([fetchA(), fetchB(), fetchC()]);

// Promise.allSettled: waits for ALL promises, never rejects
const results = await Promise.allSettled([fetchA(), fetchB(), fetchC()]);
results.forEach(r => {
  if (r.status === 'fulfilled') console.log(r.value);
  if (r.status === 'rejected') console.log(r.reason);
});
```

Use `Promise.all` when you need all results to proceed. Use `Promise.allSettled` when some failures are acceptable (e.g., loading dashboard widgets independently).

### Array Methods

These methods return new arrays — they do not modify the original.

```js
const numbers = [1, 2, 3, 4, 5];

// map: transform each element
numbers.map(n => n * 2);               // [2, 4, 6, 8, 10]

// filter: keep elements that pass a test
numbers.filter(n => n > 3);            // [4, 5]

// find: first element that passes a test
numbers.find(n => n > 3);              // 4

// findIndex: index of first element that passes a test
numbers.findIndex(n => n > 3);         // 3

// some: does at least one element pass?
numbers.some(n => n > 4);              // true

// every: do all elements pass?
numbers.every(n => n > 0);             // true

// reduce: accumulate into a single value
numbers.reduce((sum, n) => sum + n, 0); // 15

// flat: flatten nested arrays
[[1, 2], [3, [4]]].flat();             // [1, 2, 3, [4]]
[[1, 2], [3, [4]]].flat(Infinity);     // [1, 2, 3, 4]

// flatMap: map then flatten one level
['hello world', 'foo bar'].flatMap(s => s.split(' '));
// ['hello', 'world', 'foo', 'bar']
```

**Chain them** for data transformations:

```js
const activeAdmins = users
  .filter(u => u.active)
  .filter(u => u.role === 'admin')
  .map(u => u.name);
```

### Closures

A closure is a function that remembers the variables from the scope where it was created, even after that scope has finished executing:

```js
function createCounter() {
  let count = 0;                  // this variable is "closed over"
  return {
    increment: () => ++count,
    getCount: () => count,
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2
```

The inner functions `increment` and `getCount` "close over" the `count` variable. Each call to `createCounter()` creates a new, independent `count`.

**The stale closure bug in React:**

```js
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // BUG: this closure captures the initial count (0) and never updates
      console.log(count); // always 0
      setCount(count + 1); // always sets to 1
    }, 1000);
    return () => clearInterval(id);
  }, []); // empty deps = effect runs once, closure is never refreshed
}
```

The fix — use the function form of `setState`:

```js
setCount(prev => prev + 1); // always uses the latest value
```

This is the most common React bug, and it stems from not understanding closures.

### The Event Loop

JavaScript is single-threaded. It executes code using a call stack and two queues:

1. **Call stack**: executes functions one at a time, synchronously.
2. **Microtask queue**: promises (`.then`, `await`), `queueMicrotask`. Processed after each call stack item, before the next macrotask.
3. **Task queue (macrotask queue)**: `setTimeout`, `setInterval`, DOM events. Processed one at a time, after the microtask queue is empty.

```js
console.log('1');                          // call stack

setTimeout(() => console.log('2'), 0);     // task queue

Promise.resolve().then(() => console.log('3')); // microtask queue

console.log('4');                          // call stack

// Output: 1, 4, 3, 2
```

Even `setTimeout(fn, 0)` is not instant. The callback goes to the task queue and waits until:
1. The current call stack is empty
2. All microtasks (promises) have been processed

This is why "zero-delay" timeouts still run after promise callbacks.

### `Map`, `Set`, `WeakMap`, `WeakSet`

**`Map`** — key-value pairs where keys can be any type (not just strings):

```js
const cache = new Map();
cache.set(userObj, 'cached-data');   // object as key — impossible with plain objects
cache.get(userObj);                  // 'cached-data'
cache.has(userObj);                  // true
cache.size;                         // 1
```

**`Set`** — a collection of unique values:

```js
const unique = new Set([1, 2, 2, 3, 3]);
[...unique]; // [1, 2, 3]

unique.add(4);
unique.has(2);    // true
unique.delete(2); // removes 2
```

**`WeakMap` / `WeakSet`** — same as Map/Set but keys (WeakMap) or values (WeakSet) are held weakly and garbage-collected when no other reference exists. Use them to associate metadata with objects without preventing garbage collection:

```js
const metadata = new WeakMap();
function process(element) {
  if (!metadata.has(element)) {
    metadata.set(element, { processed: true });
  }
}
// When `element` is removed from the DOM and dereferenced,
// the metadata entry is automatically garbage collected.
```

**When to use over plain objects/arrays:**

| Use case | Use |
|----------|-----|
| String-keyed simple lookups | Plain object `{}` |
| Non-string keys, frequent add/delete, need `.size` | `Map` |
| Deduplication | `Set` |
| Private metadata that shouldn't prevent GC | `WeakMap` |
| Tracking objects without memory leaks | `WeakSet` |

### Common Pitfalls

**Mutating function arguments:**

```js
// Bad: caller's object is modified unexpectedly
function addAdmin(users) {
  users.push({ name: 'Admin', role: 'admin' });
  return users;
}

// Good: return a new array
function addAdmin(users) {
  return [...users, { name: 'Admin', role: 'admin' }];
}
```

**Forgetting `await`:**

```js
// Bug: deleteUser returns a promise, doesn't actually wait
async function cleanup(userId) {
  deleteUser(userId);        // missing await — fire and forget
  console.log('Deleted');    // runs before deletion completes
}

// Fix:
async function cleanup(userId) {
  await deleteUser(userId);
  console.log('Deleted');
}
```

**`for...in` on arrays:**

```js
const arr = ['a', 'b', 'c'];

// Bad: for...in iterates over property KEYS (strings), includes prototype properties
for (const i in arr) { console.log(i); } // "0", "1", "2" (strings, not numbers)

// Good: for...of iterates over VALUES
for (const val of arr) { console.log(val); } // "a", "b", "c"

// Also good: array methods
arr.forEach(val => console.log(val));
```

**`==` vs `===`:**

```js
// == performs type coercion — surprising results
0 == '';       // true
0 == false;    // true
'' == false;   // true
null == undefined; // true

// === checks value AND type — predictable
0 === '';      // false
0 === false;   // false
```

Always use `===`. The only acceptable `==` is `value == null` to check for both `null` and `undefined` simultaneously, and even that is a stylistic choice.

**Callback hell (nesting `.then` chains):**

```js
// Bad: nested promises — just as bad as callback hell
fetchUser(id).then(user => {
  fetchPosts(user.id).then(posts => {
    fetchComments(posts[0].id).then(comments => {
      render(user, posts, comments);
    });
  });
});

// Good: flat async/await
async function loadData(id) {
  const user = await fetchUser(id);
  const posts = await fetchPosts(user.id);
  const comments = await fetchComments(posts[0].id);
  render(user, posts, comments);
}
```

**Using `var`:**

`var` is hoisted to the function scope and can be accessed before declaration (as `undefined`). This causes silent bugs. There is no reason to use `var` in modern JavaScript.

### Key Takeaways

- Use `const` by default, `let` when reassignment is needed, never `var`.
- Destructuring and spread are not syntax sugar — they are how you work with props, state, and API responses in every framework.
- `?.` and `??` eliminate defensive `if` chains. Use `??` instead of `||` when `0` or `''` are valid values.
- `async`/`await` is syntactic sugar over promises. Use `Promise.all` for parallel operations, `Promise.allSettled` when partial failure is acceptable.
- Closures capture variables by reference. In React hooks, this means stale values if your dependency array is wrong. Use the function form of `setState` when updating based on previous state.
