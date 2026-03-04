# MDL to Pure Custom CSS/SCSS Migration Plan

## Context

SUI-JS depends on Material Design Lite (MDL) v1.3.0, which has been unmaintained since 2019. MDL provides both CSS styling (`.mdl-*` classes) and JavaScript component behaviors (`componentHandler.upgradeElement()`, `MaterialSlider`, `MaterialProgress`, etc.). The goal is to remove both MDL JS and CSS dependencies, replacing them with pure custom SCSS and minimal custom JS, while keeping Material Icons.

**Current coupling:** ~25 TS files use MDL JS, ~33 SCSS files reference `.mdl-*` classes (204 occurrences), 24 SCSS files in `styles/mdl/` are pure MDL overrides. ~60% of the codebase has zero MDL dependency.

## Naming Convention

All `.mdl-*` classes become `.sui-*` classes. MDL JS marker classes (`mdl-js-*`) are removed entirely. State classes (`is-active`, `is-checked`, `is-focused`, `is-dirty`, `is-disabled`, `is-invalid`) stay unchanged.

## Phase 0: Infrastructure

**Goal:** Set up the replacement framework without changing existing behavior.

1. Add `sui()` function alongside `mdl()` in `src/utils/render.ts` — initially a no-op, will gain behaviors in later phases
2. Create `styles/sui/` directory with stub SCSS files for each component
3. Create `styles/_sui.scss` index file importing all stubs
4. Add `@use 'sui'` to `styles/sui.scss` alongside existing `@use 'mdl'`

**Files:** `src/utils/render.ts`, `styles/sui.scss`, `styles/_sui.scss`, new `styles/sui/*.scss` stubs

## Phase 1: Buttons

**Risk:** LOW | **MDL JS behavior:** Ripple effect only

Replace all `.mdl-button*` classes with `.sui-button*` and remove `mdl()` calls. Ripple implemented as CSS `::after` animation on `:active`.

**TS files (9):** `src/field/button.ts`, `submitButton.ts`, `resetButton.ts`, `src/module/flash.ts`, `confirm.ts`, `dialog.ts`, `helper.ts`, `src/component/pager.ts`, `popup.ts`

**SCSS:** Port `styles/mdl/_button.scss` + `_buttonDark.scss` → `styles/sui/_button.scss` + `_buttonDark.scss`. Update refs in `styles/component/_layout.scss`, `_cardCollection.scss`, `styles/field/_search.scss`

## Phase 2: Text Fields

**Risk:** LOW-MEDIUM | **MDL JS behavior:** Floating labels (`is-dirty`, `is-focused` state classes)

Replace `.mdl-textfield*` with `.sui-textfield*`. Add focus/blur listeners in `sui()` to toggle `is-focused`/`is-dirty` on the container (replaces `MaterialTextfield` JS). Use CSS `:placeholder-shown` where possible.

**TS files (9):** `src/field/textField.ts`, `numberField.ts`, `urlField.ts`, `searchField.ts`, `textareaField.ts`, `locationField.ts`, `fileField.ts`, `selectField.ts`, `src/component/table.ts`

**SCSS:** Port `styles/mdl/_textfield.scss`, `_textfieldDark.scss`, `_label.scss`, `_labelDark.scss`, `_error.scss`, `_errorDark.scss` → `styles/sui/`. Update refs in `styles/field/_search.scss`, `_textarea.scss`, `_file.scss`, `_datetimeRange.scss`

## Phase 3: Checkbox, Radio, Switch, Icon Toggle

**Risk:** LOW | **MDL JS behavior:** Creates internal DOM elements (`__box-outline`, `__tick-outline`, `__track`, `__thumb`)

Replace with pure CSS using `::before`/`::after` pseudo-elements on labels + `:checked` selector. No JS DOM creation needed.

**TS files (5):** `src/field/checkboxField.ts`, `radiobuttonField.ts`, `switchField.ts`, `iconToggleField.ts`, `baseCheckboxField.ts`

**SCSS:** Port 8 MDL files (`_checkbox.scss`, `_radio.scss`, `_switch.scss`, `_iconToggle.scss` + dark variants) → `styles/sui/`

## Phase 4: Tooltip

**Risk:** MEDIUM | **MDL JS behavior:** Positioning relative to `for` target, show/hide on hover

Replace `.mdl-tooltip*` with `.sui-tooltip*`. Custom JS: use `getBoundingClientRect()` for positioning, `mouseenter`/`mouseleave` listeners for show/hide.

**TS files (2):** `src/component/tooltip.ts`, `src/module/helper.ts` (`_setTooltip()`)

**SCSS:** Port `styles/mdl/_tooltip.scss` → `styles/sui/_tooltip.scss`

## Phase 5: Dropdown / Menu

**Risk:** MEDIUM | **MDL JS behavior:** Menu toggle, click-outside close

Replace `.mdl-menu*` with `.sui-menu*`. Custom JS: click listener on trigger toggles `.is-visible`, document click-outside listener closes menu.

**TS files (1):** `src/component/dropdown.ts`

**SCSS:** Port `styles/mdl/_menu.scss` → `styles/sui/_menu.scss`

## Phase 6: Progress Bar & Spinner

**Risk:** MEDIUM-HIGH | **Deepest MDL coupling**

**ProgressBar** (`src/module/progressBar.ts`): Currently accesses `node['MaterialProgress'].setProgress()/.setBuffer()` and listens for `mdl-componentupgraded` event. Replace with direct DOM: create inner `<div class="sui-progress__bar">` and `<div class="sui-progress__buffer">`, set `width` style for progress values. Remove async event waiting pattern.

**Loader** (`src/module/loader.ts`): Replace `.mdl-spinner` with `.sui-spinner` using CSS `border` + `@keyframes` rotation.

**TS files (2):** `src/module/progressBar.ts` (major rewrite), `src/module/loader.ts`

**SCSS:** Port `styles/mdl/_progress.scss`, `_progressDark.scss`, `_spinner.scss` → `styles/sui/`

## Phase 7: Range Slider

**Risk:** MEDIUM | **MDL JS behavior:** `MaterialSlider.change(value)` API

Replace `.mdl-slider*` with `.sui-slider*`. Style native `<input type="range">` using `::-webkit-slider-thumb`, `::-moz-range-thumb` pseudo-elements. Replace `MaterialSlider.change(value)` with native `input.value = value; input.dispatchEvent(new Event('input'))`.

**TS files (1):** `src/field/rangeField.ts`

**SCSS:** Port `styles/mdl/_slider.scss` → `styles/sui/_slider.scss`. Update `styles/field/_range.scss`, `_rangeDark.scss`

## Phase 8: Cleanup & Finalization

1. **Remove `mdl()` function** from `src/utils/render.ts` — verify zero remaining callers with grep
2. **Remove remaining `mdl()` calls** in: `src/component/cardCollection.ts`, `table.ts`, `src/module/dialog.ts`
3. **Delete `styles/mdl/`** directory (all 24 files) — move `_materialIcons.scss` to `styles/sui/`
4. **Delete `styles/_mdl.scss`**, update `styles/sui.scss` to use only `@use 'sui'`
5. **Remove dependencies** from `package.json`: `material-design-lite`, `@types/material-design-lite`
6. **Update `jest.setup.ts`**: remove `window['componentHandler']` mock
7. **Update `CLAUDE.md`**: remove MDL references, update architecture description
8. **Run `npm uninstall material-design-lite @types/material-design-lite`**

## Custom JS Behaviors Summary

| MDL Behavior | Replacement | Complexity |
|---|---|---|
| Floating labels | CSS `:placeholder-shown` + JS focus/blur listeners | Low |
| Ripple effect | CSS `::after` + `@keyframes` on `:active` | Low |
| Checkbox/Radio/Switch visuals | CSS `::before`/`::after` + `:checked` selector | Low |
| Range slider value | Native `input.value` + `dispatchEvent` | Trivial |
| Progress bar | Direct `width` style on inner divs | Trivial |
| Spinner | CSS `border` + `@keyframes rotate` | Low |
| Tooltip positioning | `getBoundingClientRect()` + absolute positioning | Medium |
| Menu toggle | Click listener + document click-outside | Low |
| `componentHandler` | Remove entirely | Trivial |

## Verification

After each phase:
- `npx tsc --noEmit` — types pass
- `npm run test` — all 1,315+ tests pass
- `npm run lint` — no lint errors
- `npm run dev` — visual inspection in browser at `:4000`
- `grep -r "mdl-" src/` — verify no remaining MDL refs for migrated component
