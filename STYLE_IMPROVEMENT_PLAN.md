# Style Improvement Plan — Simple, Modern Design

## Current State

Modern flat design with clean indigo/orange theme, system font stack, soft single-layer shadows, 8px border-radius, focus rings, and CSS custom properties for light/dark scheme. Phases 1–5 complete. Phase 6 (dark theme refresh) and Phase 7 (example page) remain.

## Phase 1: Design Tokens & Theme Foundation — COMPLETE

**Files:** `core/_colors.scss`, `core/_variables.scss`, `core/_base.scss`

- [x] Add `bright()` / `dark()` functions to compute color variants from base color
- [x] Add light/dark scheme surface tokens (`$surface-light`, `$on-surface-light`, `$outline-light`, etc.)
- [x] Add CSS custom properties on `:root` for light scheme
- [x] Add `@media (prefers-color-scheme: dark)` automatic dark mode
- [x] Add `.dark-theme` class override for manual dark mode
- [x] Modernize the color palette (primary: indigo, accent: orange)
- [x] Soften the grey scale (blue-tinted greys)
- [x] Update spacing & sizing tokens
  - Add radius scale: `$radius-sm: 4px`, `$radius-md: 8px`, `$radius-lg: 12px`, `$radius-full: 9999px`
  - Increase default component min-height from `32px` to `40px`
  - Widen field padding from `2px 10px` to `8px 12px`
- [x] Modern typography
  - Replace Verdana/Arial/Helvetica with system font stack
  - Use `font-weight: 600` instead of `300` for h1-h2
  - Remove UPPERCASE from labels, tabs, table headers
- [x] Shadow modernization
  - Replace MDL dual-layer shadows with softer single-layer: `$shadow-sm`, `$shadow-md`, `$shadow-lg`
  - Reduce dialog overlay from 70% to 50% opacity
- [x] Transition standardization: `$transition-fast: 150ms`, `$transition-base: 200ms`, `$transition-slow: 300ms`

## Phase 2: Core SUI Components — COMPLETE

**Files:** `styles/sui/`

- [x] **Buttons** (`_button.scss`)
  - Border-radius from `20px` pill to `8px` rounded rect
  - Remove uppercase text-transform
  - Padding `8px 16px`, shadow tokens
- [x] **Text fields** (`_textfield.scss`)
  - Border-radius `8px`, focus ring, height `40px`, padding `8px 12px`
- [x] **Checkboxes** (`_checkbox.scss`)
  - Size `18px`, border-radius `4px`, `:focus-visible` ring
- [x] **Radio buttons** (`_radio.scss`)
  - Size `18px`, `:focus-visible` ring
- [x] **Switch** (`_switch.scss`)
  - Track `40px x 20px`, thumb `24px`, subtle border
- [x] **Tooltip** (`_tooltip.scss`)
  - Border-radius `6px`, shadow, padding `6px 10px`
- [x] **Menu** (`_menu.scss`)
  - Border-radius `8px`, soft shadow, rounded hover items
- [x] **Progress bar** (`_progress.scss`)
  - Height `6px`, border-radius `3px`
- [x] **Spinner** (`_spinner.scss`) — shadow tokens
- [x] **Slider** (`_slider.scss`)
  - Thumb `20px` with shadow, track `6px` with rounded ends

## Phase 3: Component Styles — COMPLETE

**Files:** `styles/component/`

- [x] **Table** (`_table.scss`)
  - Remove uppercase from headers, use `font-weight: 600`
  - Cell padding `12px 16px`
- [x] **Popup** (`_popup.scss`) — border-radius `8px`, soft shadow
- [x] **Tab Panel** (`_tabPanel.scss`)
  - Remove uppercase, `font-weight: 500`
  - Tab padding `10px 16px`, border `2px`
- [x] **Card Collection** (`_cardCollection.scss`)
  - Border-radius `12px`, shadow-only approach

## Phase 4: Module Styles — COMPLETE

**Files:** `styles/module/`

- [x] **Header** (`_header.scss`) — soft shadow token
- [x] **Dialog** (`_dialog.scss`)
  - Border-radius `12px`, soft shadow, overlay 50% opacity
- [x] **Confirm** (`_confirm.scss`) — same treatment as dialog
- [x] **Flash messages** (`_flash.scss`)
  - Border-radius `8px`, left border accent, soft shadow
- [x] **Left Menu** (`_leftMenu.scss`) — soft shadow token

## Phase 5: Field Styles — COMPLETE

**Files:** `styles/field/`

- [x] **Select** (`_select.scss`) — new input sizing (40px, 8px radius, wider padding)
- [x] **All other fields** — cascade new tokens (radius, padding, height)
  - `_datetime.scss`, `_datetimeRange.scss`, `_location.scss`, `_url.scss`, `_tag.scss`

## Phase 6: Dark Theme Refresh

**Files:** all `*Dark.scss` files

- [x] Updated flash dark and popup dark to use shadow tokens
- [ ] Update remaining dark theme files to use new CSS custom properties
- [ ] Softer contrasts, slightly elevated surfaces
- [ ] Tinted dark backgrounds instead of pure black

## Phase 7: Example Page Expansion

**Files:** `example/index.html`, `example/index.js`

### Cleanup

- [ ] Remove `material-design-lite` dependency from `example/node_modules`
- [ ] Remove MDL script/css references from `example/index.html`
- [ ] Update `example/package.json` — only keep `normalize.css`

### Component Showcase Sections

- [ ] **Design tokens** — color palette swatches, shadow scale, spacing scale, typography samples
- [ ] **SUI core** — button variants (flat, raised, FAB, icon), textfield states, checkbox, radio, switch, tooltip, menu, progress, spinner, slider
- [ ] **Fields** — select, color, datetime, datetime-range, location, file, number, range, tag, search, url, textarea
- [ ] **Components** — table, tab panel, card collection, popup, calendar, clock
- [ ] **Modules** — dialog, confirm, flash messages (trigger buttons)
- [ ] **Dark/light toggle** — use CSS custom properties for live theme switching

### Notes

- Viewable with `npm run dev` (serves on `:4000`)
- No new dependencies needed
- Each section acts as visual regression check during style changes
- Link from Docusaurus to `/example/` for live component demos

## Execution Order

| Order | Phase                | Status   | Impact                            |
| ----- | -------------------- | -------- | --------------------------------- |
| 1st   | Phase 1 (tokens)     | COMPLETE | Foundation for everything else    |
| 2nd   | Phase 2 (SUI core)   | COMPLETE | Highest visual impact             |
| 3rd   | Phase 5 (fields)     | COMPLETE | Cascades from Phase 2 tokens      |
| 4th   | Phase 3 (components) | COMPLETE | Tables, cards, tabs, popups       |
| 5th   | Phase 4 (modules)    | COMPLETE | Header, dialog, flash, menus      |
| 6th   | Phase 6 (dark theme) | Partial  | Consistency pass                  |
| 7th   | Phase 7 (example)    | Pending  | Visual showcase                   |

## Key Principles

- No new dependencies — pure SCSS changes + example HTML
- No structural/HTML changes in production code — only visual properties
- Backward compatible — all `!default` variables remain overridable
- Minimalist modern — clean and simple, not Material 3 or Tailwind
- CSS-only solutions — no JS changes needed
- Example page for visual validation — every change visible with `npm run dev`
