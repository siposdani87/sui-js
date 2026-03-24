# Remaining Tasks — Post v2.0.3

Consolidated from all plan files. Only incomplete items included.

## P1 — High Priority

### 1. AdvancedMarkerElement Migration

**Source:** `ADVANCED_MARKER_MIGRATION.md`

Migrate deprecated `google.maps.Marker` → `google.maps.marker.AdvancedMarkerElement`. Google deprecated the old API on Feb 21, 2024.

**Scope:** 5 source files + spec files

| File | Change |
| ---- | ------ |
| `src/component/mapMarkerOps.ts` (273 LOC) | Heaviest: `MarkerIcon` type, `setMarkerIcon()`, `createMarker()`, `updateMarker()`, event binding with DOM `addEventListener` |
| `src/component/googleMap.ts` (929 LOC) | Add `mapId`, update type refs, property access instead of getters |
| `src/component/mapPolygonOps.ts` (390 LOC) | Update marker references used in polygon operations |
| `src/field/locationField.ts` (429 LOC) | Add `mapId` to embedded map options |
| `src/component/mapLabel.ts` (283 LOC) | No changes (caller changes only) |

**Breaking changes:** `mapId` required, `MarkerIcon` type changes, `gmpDraggable` replaces `draggable`, DOM events instead of Google Maps events.

**Strategy:** All at once — partial migration breaks type consistency.

### 2. Code-Split Google Maps

**Source:** `IMPROVEMENT_PLAN.md` §2

Make Google Maps module lazy/optional via dynamic import. Currently the largest component (~1,875 LOC across 4 files: `googleMap.ts`, `mapMarkerOps.ts`, `mapPolygonOps.ts`, `mapLabel.ts`).

**Impact:** ~15-20 KB savings for non-map users.

**Note:** Best done after the AdvancedMarkerElement migration (#1) to avoid migrating twice.

## P2 — Medium Priority

### 3. Expand Accessibility (ARIA + jest-axe)

**Source:** `IMPROVEMENT_PLAN.md` §1, §7

| Item | Description |
| ---- | ----------- |
| Expand jest-axe tests | Add axe tests for Table, Dialog, Confirm, SelectField, DateTimeField, ColorField |
| `aria-label` on icon buttons | Icon-only buttons from Helper lack accessible labels |
| `aria-controls` on menu toggles | Dropdown button should reference its menu panel |
| ARIA on Table component | Add `role`, `aria-sort`, `aria-label` for interactive tables |

### 4. Migration Guide v1.x→v2.0

**Source:** `IMPROVEMENT_PLAN.md` §9

Document breaking changes: `fabButton`/`iconButton` separation, label auto-capitalization, DOMParser migration, CSS custom property changes, `@description` removal.

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

## Recommended Execution Order

```
1. AdvancedMarkerElement migration  (P1, breaking change, deprecated API)
2. Code-split Google Maps           (P1, depends on #1, bundle size win)
3. Expand ARIA + jest-axe           (P2, accessibility compliance)
4. Migration guide v1.x→v2.0       (P2, user documentation)
5. Visual regression testing        (P2, requires Playwright)
6. Fetch API enhancements           (P3, as needed)
7. Modern CSS / TS / tooling        (P3, as browser support matures)
```

## Active Plan Files

| File | Status |
| ---- | ------ |
| `IMPROVEMENT_PLAN.md` | ~96% complete (remaining P1/P2/P3 items listed above) |
| `ADVANCED_MARKER_MIGRATION.md` | ⏳ Not started (task #1 above) |

Completed plan files (removed): `MODERNIZATION_PRIORITY.md`, `AUTOMATIC_DI_PLAN.md`, `NATIVE_PROMISE_MIGRATION_PLAN.md`, `FETCH_MIGRATION_PLAN.md`, `STYLE_IMPROVEMENT_PLAN.md`, `EXAMPLE_EXPANSION_PLAN.md`.
