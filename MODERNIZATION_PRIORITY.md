# Modernization Priority List

## Priority Order

| Priority | Plan | Risk | Effort | Rationale |
|----------|------|------|--------|-----------|
| **1** | **Automatic DI** | Low | Small (4 files) | Purely additive, fully backward-compatible. No behavioral changes — just makes the injection array optional. Smallest blast radius, immediate DX improvement. |
| **2** | **Native Promise in Promize** | Medium | Small (1-2 files) | Isolated to `Promize` internals, public API unchanged. But the synchronous to microtask timing change is a real risk — any code relying on sync callback execution after `resolve()` will break subtly. Tests should catch it, but needs careful verification. |
| **3** | **Fetch Migration** | Medium-High | Large (6+ files, 200+ tests rewritten) | Biggest scope — rewrites `Xhr` internals, introduces `HttpResponse` type, and requires rewriting ~212 tests with a new mock infrastructure. Also fixes the 2xx bug. Should be done after Native Promise since Fetch naturally uses `async/await` internally, and having Promize backed by native Promise simplifies the integration. |
| **4** | **Style Modernization** | Low | Large (90+ SCSS files) | Pure SCSS changes, no JS impact. Modernizes visual design from MDL-era to clean, minimal look. Includes computed color variants, CSS custom properties for light/dark scheme, updated tokens (radius, shadows, spacing, typography). |
| **5** | **Storybook** | Low | Medium | `@storybook/html` for visual component catalog. Enables live playground, dark mode toggle, responsive testing, and visual regression testing. Deployed alongside Docusaurus at `/storybook/`. |

## Key Dependencies

- **Native Promise (2) should come before Fetch (3)** — the Fetch plan notes it uses `async/await` internally and pipes results into Promize. If Promize is already backed by native Promise, the interaction is cleaner and avoids potential timing pitfalls with the current synchronous Promize + async fetch.
- **Style tokens (4) should come before Storybook stories (5)** — Storybook stories should showcase the modernized design, not the old MDL styles. Token foundation (Phase 1) is the minimum prerequisite.
- **Priorities 1-3 (JS) and 4-5 (styles) are independent** — they can be worked on in parallel since they touch different parts of the codebase.

## Detailed Plans

- `AUTOMATIC_DI_PLAN.md` — Auto-detect dependencies via `static inject`
- `NATIVE_PROMISE_MIGRATION_PLAN.md` — Replace Promize internals with native Promise
- `FETCH_MIGRATION_PLAN.md` — Replace XMLHttpRequest with fetch API
- `STYLE_IMPROVEMENT_PLAN.md` — Modern design tokens, component styles, light/dark scheme, Storybook integration
