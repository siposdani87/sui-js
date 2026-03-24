# Remaining Tasks — Post v2.0.3

Consolidated from all plan files. Only incomplete items included.

## P1 — High Priority

### 1. Code-Split Google Maps

**Source:** `IMPROVEMENT_PLAN.md` §2

Make Google Maps module lazy/optional via dynamic import. Currently the largest component (~1,875 LOC across 4 files: `googleMap.ts`, `mapMarkerOps.ts`, `mapPolygonOps.ts`, `mapLabel.ts`).

**Impact:** ~15-20 KB savings for non-map users.

**Note:** AdvancedMarkerElement migration is complete — ready to implement.

## P2 — Medium Priority

### 2. Expand Accessibility (ARIA + jest-axe)

**Source:** `IMPROVEMENT_PLAN.md` §1, §7

| Item | Description |
| ---- | ----------- |
| Expand jest-axe tests | Add axe tests for Table, Dialog, Confirm, SelectField, DateTimeField, ColorField |
| `aria-label` on icon buttons | Icon-only buttons from Helper lack accessible labels |
| `aria-controls` on menu toggles | Dropdown button should reference its menu panel |
| ARIA on Table component | Add `role`, `aria-sort`, `aria-label` for interactive tables |

### 3. Audit and Improve JSDoc/TypeDoc

**Source:** `IMPROVEMENT_PLAN.md` §9

Review all classes, methods, and functions for missing, outdated, or incomplete JSDoc. Ensure `@param`, `@returns`, `@example` tags are accurate and complete. Fix TypeDoc warnings. Verify generated API docs render correctly on Docusaurus.

### 4. Migration Guide v1.x→v2.0

**Source:** `IMPROVEMENT_PLAN.md` §9

Document breaking changes: `fabButton`/`iconButton` separation, label auto-capitalization, DOMParser migration, CSS custom property changes, `@description` removal, old explicit DI injection array removed (only `static inject` auto-detection).

### 5. Visual Regression Testing

**Source:** `IMPROVEMENT_PLAN.md` §11

Screenshot comparison for UI components. Requires new dependency (e.g., Playwright).

### 6. Release Blog Posts v2.0.x

**Source:** `IMPROVEMENT_PLAN.md` §9

Document v2.0.0, v2.0.1, v2.0.2, v2.0.3 releases on Docusaurus blog.

## P3 — Low Priority / Deferred

### 7. Fetch API Enhancements

**Source:** `FETCH_MIGRATION_PLAN.md` — Future Enhancements

| Enhancement | Description |
| ----------- | ----------- |
| AbortController | Add `abort()` method to Xhr using `AbortController` |
| Timeout | Pass `AbortSignal.timeout(ms)` to fetch |
| FormData / file upload | Detect `FormData` body, skip serialization |
| Streaming | Use `response.body` ReadableStream for large downloads |

### 8. Modern CSS Features

**Source:** `IMPROVEMENT_PLAN.md` §3, §5, §6

| Feature | Description |
| ------- | ----------- |
| CSS `@layer` | Better cascade control for style isolation |
| Container queries (`@container`) | Component-level responsive design |
| CSS `@starting-style` | Modern entry animations without JS |

### 9. TypeScript & Architecture Improvements

**Source:** `IMPROVEMENT_PLAN.md` §4

| Item | Description |
| ---- | ----------- |
| Branded types | Nominal types for IDs, URLs, coordinates — domain safety |
| `EventTarget` API | Replace custom EventBus pub/sub with native browser API |

---

## Completed

- ~~CHANGELOG automation~~ — commitlint + husky + conventional-changelog
- ~~Blog posts~~ — architecture-decisions + modernization-journey posts
- ~~Replace hardcoded colors~~ — CSS custom properties in select, menu, button, spinner, slider (v2.0.2)
- ~~Remove `@description` JSDoc tags~~ — 473 occurrences for TypeDoc compatibility (v2.0.3)
- ~~DOMParser migration~~ — navigation, dialog, template (v2.0.2)
- ~~fabButton/iconButton separation~~ — Helper refactored (v2.0.2)
- ~~Label auto-capitalization~~ — `_capitalizeFirst()` in baseField (v2.0.2)
- ~~Shared `parseHtml` utility~~ — extracted to `domOps.ts` with reused DOMParser instance
- ~~Remove old explicit DI handlers~~ — `string[]` injection array overload removed from Module/Application
- ~~Error absolute positioning~~ — `.sui-textfield__error` position: absolute
- ~~AdvancedMarkerElement migration~~ — `google.maps.Marker` → `AdvancedMarkerElement`, `MarkerIcon` HTMLElement content, DOM events, `mapId` support, `data-map-id` on locationField

## Recommended Execution Order

```
1. Code-split Google Maps           (P1, bundle size win)
2. Expand ARIA + jest-axe           (P2, accessibility compliance)
3. Audit and improve JSDoc/TypeDoc  (P2, API documentation quality)
4. Migration guide v1.x→v2.0       (P2, user documentation)
5. Visual regression testing        (P2, requires Playwright)
6. Fetch API enhancements           (P3, as needed)
7. Modern CSS / TS / tooling        (P3, as browser support matures)
```

## Active Plan Files

| File | Status |
| ---- | ------ |
| `IMPROVEMENT_PLAN.md` | ~96% complete (remaining P1/P2/P3 items listed above) |
| `ADVANCED_MARKER_MIGRATION.md` | ✅ Complete |

Completed plan files (removed): `MODERNIZATION_PRIORITY.md`, `AUTOMATIC_DI_PLAN.md`, `NATIVE_PROMISE_MIGRATION_PLAN.md`, `FETCH_MIGRATION_PLAN.md`, `STYLE_IMPROVEMENT_PLAN.md`, `EXAMPLE_EXPANSION_PLAN.md`.
