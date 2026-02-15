# Plan: AI/LLM-Friendly Documentation via Docusaurus

## Context

The existing Docusaurus v3 site (`website/`) auto-generates API docs via TypeDoc, but the output is **nearly useless for AI/LLM consumption**: no method descriptions, no examples, no conceptual context — just bare type signatures. The source code has virtually zero JSDoc. This plan adds rich JSDoc to all ~100 source files and builds structured conceptual documentation optimized for AI readability.

---

## Two Tracks

### Track 1: JSDoc Enhancement (source code, ~100 files)

Add `@description`, `@param`, `@returns`, `@example`, `@see`, `@category` to all public classes/methods. TypeDoc automatically picks these up and generates enriched docs.

**JSDoc standard — every class gets:**
- Description paragraph (what it does, why it exists)
- `@example` with realistic code snippet
- `@see` linking related classes
- `@category Core|Component|Module|Field|Utility`

**Every public method gets:**
- Description paragraph
- `@param` with meaningful description (not just type)
- `@returns` with description
- `@example` for non-trivial methods

**Phased by priority:**

| Phase | Directory | Files | ~Public APIs |
|-------|-----------|-------|-------------|
| 1 | `src/core/` | 10 | ~200 (Knot alone has 45+) |
| 2 | `src/utils/` | 8 | ~100 |
| 3 | `src/module/` | 27 | ~150 |
| 4 | `src/component/` | 29 | ~200 |
| 5 | `src/field/` + `src/common/` | 27 | ~100 |

**Before/after example (`src/module/http.ts`):**

Before:
```typescript
get(url: string, opt_params?: object, opt_headers?: object) {
    const xhr = this._createXhrRequest();
    return this._getPromise(xhr.get(url, opt_params, opt_headers));
}
```

After:
```typescript
/**
 * Sends an HTTP GET request to the specified URL.
 *
 * @param url - The endpoint URL. Relative paths are prepended with the configured `backend` base URL.
 * @param opt_params - Optional query string parameters appended to the URL.
 * @param opt_headers - Optional custom request headers.
 * @returns A {@link Promize} resolving with `[Objekt, string]` (response body, filename) or rejecting with the same tuple.
 *
 * @example
 * ```typescript
 * http.get('/api/users', { page: 1 }).then(
 *   (response, filename) => console.log(response.get('users')),
 *   (error) => console.error(error.get('message')),
 * );
 * ```
 *
 * @category Module
 */
get(url: string, opt_params?: object, opt_headers?: object) {
```

### Track 2: Docusaurus Site Enhancement

#### A. TypeDoc config improvements (`website/docusaurus.config.js`)
- Move generated docs to `docs/api/` subdirectory
- Enable `categorizeByGroup`, `categoryOrder`, `groupOrder`, `sort` options
- Better navigation structure

#### B. Sidebar restructuring (`website/sidebars.js`)
Replace flat alphabetical list with categorized sidebar:
```
Guides/
  Getting Started
  Architecture
  Application Setup
  HTTP Requests
  State & Routing
  Forms & Fields
  Event System
  DOM Manipulation
  Storage
API Reference/
  Core/ (Objekt, Knot, Query, Collection, State, ...)
  Components/ (Application, Form, Table, Calendar, ...)
  Modules/ (Http, EventBus, Dialog, Cookie, Depot, ...)
  Fields/ (BaseField, TextField, SelectField, ...)
  Utilities/
Reference/
  Class Hierarchy
  Glossary
```

#### C. Hand-written conceptual docs (~11 new files in `website/docs/`)

| File | Content |
|------|---------|
| `guides/getting-started.md` | Install, setup, "Hello World" |
| `guides/architecture.md` | Layer diagram, DI system, constructor pattern, lifecycle |
| `guides/application-setup.md` | Application config, coreResources, controllers/services |
| `guides/http-requests.md` | Http usage, auth, request lifecycle, error handling |
| `guides/state-routing.md` | Routes, State.go(), URL params, navigation |
| `guides/forms-fields.md` | Form class, field types, validation |
| `guides/event-system.md` | EventBus pub/sub, lifecycle events |
| `guides/dom-manipulation.md` | Knot/Query API, comparison to jQuery |
| `guides/storage.md` | Depot (localStorage/sessionStorage), Cookie |
| `reference/class-hierarchy.md` | Full inheritance tree (with Mermaid diagram) |
| `reference/glossary.md` | Framework terminology definitions |

All guide pages use structured frontmatter with `description`, `keywords`, `sidebar_position`.

#### D. AI/LLM-specific features

1. **`llms.txt` / `llms-full.txt`** — Add `docusaurus-plugin-llms` to auto-generate these at site root, or create static files manually following the [llmstxt.org](https://llmstxt.org/) spec
2. **Structured frontmatter** — Every page gets `description` and `keywords` for AI indexing
3. **Cross-references** — All JSDoc uses `{@link ClassName}` for machine-parseable links
4. **Mermaid diagrams** — Install `@docusaurus/theme-mermaid` for class hierarchy visualization

#### E. Navbar/footer updates (`website/docusaurus.config.js`)
- Add "Guides" and "API Reference" navbar items
- Update footer links to include guide pages

---

## Implementation Order (Both Tracks in Parallel)

**Stream A — JSDoc (source code):**
```
Phase 1 (core/) --> Phase 2 (utils/) --> Phase 3 (module/) --> Phase 4 (component/) --> Phase 5 (field/)
```

**Stream B — Docusaurus site (in parallel with Stream A):**
```
Phase 6 (TypeDoc config) + Phase 7 (Sidebar) --> Phase 8 (Guides) --> Phase 9 (AI features) --> Phase 10 (Navbar/footer)
```

Both streams converge after Phase 5 + Phase 10. Each JSDoc phase triggers a TypeDoc rebuild to verify enriched output.

**JSDoc depth: Full** — every public method gets `@description` + `@param` + `@returns` + `@example` + `@see` where applicable.

---

## Verification

After each phase:
1. `npm run lint` passes
2. `npm run test` passes (no functional changes)
3. `cd website && npm run build` succeeds
4. Spot-check 3-5 generated class pages for descriptions and examples
5. Sidebar renders with categories
6. `llms.txt` accessible at site root
7. Algolia re-indexes new content on deploy

---

## Key Files

- `src/core/objekt.ts` — Foundational class; JSDoc template for all others
- `src/component/application.ts` — DI container; essential for architecture guide
- `src/module/http.ts` — Primary before/after JSDoc example
- `website/docusaurus.config.js` — TypeDoc plugin, llms plugin, navbar, metadata
- `website/sidebars.js` — Sidebar restructuring
