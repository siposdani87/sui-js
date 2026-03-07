# Style Improvement Plan — Simple, Modern Design

## Current State

Flat design with Material Design Lite heritage: deep purple/pink theme, MDL-style multi-layer shadows, compact 32px form fields, 3px border-radius, 0.2s transitions, CSS-only animations. Coherent but dated — the MDL influence (uppercase labels, heavy shadows, deep purple palette) gives it a 2015-era feel.

## Phase 1: Design Tokens & Theme Foundation — STARTED

**Files:** `core/_colors.scss`, `core/_variables.scss`, `core/_base.scss`

- [x] Add `bright()` / `dark()` functions to compute color variants from base color
- [x] Add light/dark scheme surface tokens (`$surface-light`, `$on-surface-light`, `$outline-light`, etc.)
- [x] Add CSS custom properties on `:root` for light scheme
- [x] Add `@media (prefers-color-scheme: dark)` automatic dark mode
- [x] Add `.dark-theme` class override for manual dark mode
- [ ] Modernize the color palette (shift primary/accent to modern tones)
- [ ] Soften the grey scale (tinted greys instead of pure neutral)
- [ ] Update spacing & sizing tokens
  - Increase base border-radius from `3px` to `8px`
  - Add radius scale: `$radius-sm: 4px`, `$radius-md: 8px`, `$radius-lg: 12px`, `$radius-full: 9999px`
  - Increase default component min-height from `32px` to `36px` or `40px`
  - Widen field padding from `2px 10px` to `8px 12px`
- [ ] Modern typography
  - Replace Verdana/Arial/Helvetica with system font stack
  - Use `font-weight: 600` instead of `300` for h1-h2
  - Remove UPPERCASE from labels, tabs, table headers
- [ ] Shadow modernization
  - Replace MDL dual-layer shadows with softer single-layer: `$shadow-sm`, `$shadow-md`, `$shadow-lg`
  - Reduce dialog overlay from 70% to 50% opacity
- [ ] Transition standardization: `$transition-fast: 150ms`, `$transition-base: 200ms`, `$transition-slow: 300ms`

## Phase 2: Core SUI Components

**Files:** `styles/sui/`

- [ ] **Buttons** (`_button.scss`)
  - Increase border-radius from `20px` pill to `8px` rounded rect
  - Soften hover: background lightening instead of black overlay
  - Remove uppercase text-transform, use `font-weight: 500` + normal case
  - Increase padding to `8px 16px`
- [ ] **Text fields** (`_textfield.scss`)
  - Increase border-radius from `3px` to `8px`
  - Add focus ring: `box-shadow: 0 0 0 3px rgba(primary, 0.1)`
  - Increase height from `32px` to `40px`
  - Widen padding from `2px 10px` to `8px 12px`
- [ ] **Checkboxes** (`_checkbox.scss`)
  - Increase size from `16px` to `18px`, border-radius from `2px` to `4px`
  - Add `:focus-visible` ring
- [ ] **Radio buttons** (`_radio.scss`)
  - Increase size from `16px` to `18px`
  - Add `:focus-visible` ring
- [ ] **Switch** (`_switch.scss`)
  - Increase track to `40px x 20px`, thumb to `24px`
  - Add subtle border on track
- [ ] **Tooltip** (`_tooltip.scss`)
  - Increase border-radius from `4px` to `6px`, add subtle shadow
  - Increase padding to `6px 10px`
- [ ] **Menu** (`_menu.scss`)
  - Increase border-radius from `4px` to `8px`
  - Replace MDL shadows with softer shadow tokens
  - Add `border-radius: 6px` to hover state items
- [ ] **Progress bar** (`_progress.scss`)
  - Increase height from `4px` to `6px`, add `border-radius: 3px`
- [ ] **Spinner** (`_spinner.scss`) — update to use modern design tokens
- [ ] **Slider** (`_slider.scss`)
  - Increase thumb to `20px`, add subtle shadow
  - Track `6px` height with rounded ends

## Phase 3: Component Styles

**Files:** `styles/component/`

- [ ] **Layout** (`_layout.scss`) — soften page header shadow, increase section spacing
- [ ] **Table** (`_table.scss`)
  - Remove uppercase from headers, use `font-weight: 600`
  - Increase cell padding from `5px 10px` to `12px 16px`
  - Add `border-radius: 8px` to table container
  - Soften row borders and stripe color
- [ ] **Popup** (`_popup.scss`) — increase border-radius to `8px`, softer shadow
- [ ] **Tab Panel** (`_tabPanel.scss`)
  - Remove uppercase, use `font-weight: 500`
  - Increase tab padding from `5px 10px` to `10px 16px`
  - Reduce bottom border from `4px` to `2px`
- [ ] **Card Collection** (`_cardCollection.scss`)
  - Increase border-radius from `5px` to `12px`
  - Shadow-only approach instead of border + shadow
- [ ] **Calendar/Clock/Time** — update to use new radius and shadow tokens

## Phase 4: Module Styles

**Files:** `styles/module/`

- [ ] **Header** (`_header.scss`) — soften shadow, consider lighter header option
- [ ] **Dialog** (`_dialog.scss`)
  - Increase border-radius from `3px` to `12px`
  - Soften shadow, reduce overlay opacity from 70% to 50%
- [ ] **Confirm** (`_confirm.scss`) — same treatment as dialog
- [ ] **Flash messages** (`_flash.scss`)
  - Increase border-radius from `3px` to `8px`
  - Replace border-top accent with left border or full tinted background
  - Soften shadow
- [ ] **Left Menu** (`_leftMenu.scss`) — softer shadow, increase item padding, rounded hover states
- [ ] **Footer** (`_footer.scss`) — align with updated color tokens

## Phase 5: Field Styles

**Files:** `styles/field/`

- [ ] **Select** (`_select.scss`) — apply new input sizing (40px, 8px radius, wider padding)
- [ ] **All other fields** — cascade new text field tokens (radius, padding, height, focus ring)

## Phase 6: Dark Theme Refresh

**Files:** all `*Dark.scss` files

- [ ] Update all dark theme files to use new CSS custom properties
- [ ] Softer contrasts, slightly elevated surfaces
- [ ] Tinted dark backgrounds instead of pure black

## Phase 7: Storybook Integration

**Package:** `@storybook/html` (vanilla TS/HTML, not React/Vue)

### Setup

- [ ] Install `@storybook/html` with `storybook init --type html`
- [ ] Configure Sass/SCSS support in Storybook webpack config
- [ ] Create `.storybook/preview.ts` to import `styles/sui.scss`
- [ ] Add dark mode toolbar toggle using the new CSS custom properties
- [ ] Add viewport addon for responsive testing

### Stories

- [ ] **Design tokens** — color palette, shadow scale, spacing scale, typography scale
- [ ] **SUI core** — button (all variants), textfield, checkbox, radio, switch, tooltip, menu, progress, spinner, slider
- [ ] **Fields** — select, color, datetime, location, file, number, range, tag, search
- [ ] **Components** — table, tab panel, card collection, popup, calendar, clock
- [ ] **Modules** — dialog, confirm, flash, header, left menu, footer

### Notes

- Components are vanilla TS classes with `Knot` DOM wrapper — stories need manual instantiation (`new Form(...)`, `new Table(...)`)
- `Application` DI dependencies need to be mocked for isolated stories
- Story `play()` functions can simulate interactions (click, fill, toggle)
- `a11y` addon runs axe-core per story (complements existing jest-axe tests)

### Deployment

- [ ] Add `build-storybook` npm script
- [ ] Multi-stage Dockerfile: Docusaurus (`/`) + Storybook (`/storybook/`)
- [ ] Add "Components" link in Docusaurus navbar pointing to `/storybook/`

### Visual Regression Testing

- [ ] Add Chromatic or Percy for automatic screenshot diff on PRs
- [ ] Baseline snapshots after each Phase completion

## Execution Order

| Order | Phase                | Effort  | Impact                            |
| ----- | -------------------- | ------- | --------------------------------- |
| 1st   | Phase 1 (tokens)     | Medium  | Foundation for everything else    |
| 2nd   | Phase 7 (Storybook)  | Medium  | Visual feedback for all phases    |
| 3rd   | Phase 2 (SUI core)   | Medium  | Highest visual impact             |
| 4th   | Phase 5 (fields)     | Low     | Cascades from Phase 2 tokens      |
| 5th   | Phase 3 (components) | Medium  | Tables, cards, tabs, popups       |
| 6th   | Phase 4 (modules)    | Medium  | Header, dialog, flash, menus      |
| 7th   | Phase 6 (dark theme) | Low-Med | Consistency pass                  |

## Key Principles

- No new dependencies for styles — pure SCSS changes
- No structural/HTML changes — only visual properties
- Backward compatible — all `!default` variables remain overridable
- Minimalist modern — clean and simple, not Material 3 or Tailwind
- CSS-only solutions — no JS changes needed
- Storybook for visual validation — every change visible immediately
