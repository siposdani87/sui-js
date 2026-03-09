# Migration: google.maps.Marker → google.maps.marker.AdvancedMarkerElement

As of February 21st, 2024, `google.maps.Marker` is deprecated in favor of `google.maps.marker.AdvancedMarkerElement`.

## Scope: 4 source files + 3 test files

### Key API Differences

| Old (`Marker`) | New (`AdvancedMarkerElement`) |
|---|---|
| `new google.maps.Marker(opts)` | `new google.maps.marker.AdvancedMarkerElement(opts)` |
| `setPosition(latlng)` | `.position = latlng` |
| `setIcon(url/Icon)` / `setShape()` | `.content = HTMLElement` (e.g. `<img>`) |
| `setTitle(text)` | `.title = text` |
| `setMap(map)` | `.map = map` |
| `marker.addListener('click', cb)` | `marker.addEventListener('gmp-click', cb)` |
| `marker.addListener('drag', cb)` | `marker.addEventListener('gmp-drag', cb)` |
| `marker.addListener('dragend', cb)` | `marker.addEventListener('gmp-dragend', cb)` |
| `marker.addListener('dblclick', cb)` | `marker.element.addEventListener('dblclick', cb)` |
| `marker.addListener('rightclick', cb)` | `marker.element.addEventListener('contextmenu', cb)` |
| `draggable: true` | `gmpDraggable: true` |
| `getPosition()!.lat()` | `.position` (may be `LatLngLiteral`) |
| `clearInstanceListeners(marker)` | Track & remove individual listeners |
| `mapLabel.bindTo('position', marker)` | Manual position sync (not MVCObject) |
| No `mapId` needed | **Requires `mapId`** on the map |

---

## Changes Per File

### 1. `src/component/mapMarkerOps.ts` — Heaviest changes

**`MarkerIcon` type replacement:**
```typescript
// OLD
export type MarkerIcon = {
    icon: string | google.maps.Icon | google.maps.Symbol;
    shape: google.maps.MarkerShape;
};

// NEW
export type MarkerIcon = {
    content: HTMLElement;
};
```

**`setMarkerIcon()`**: Build an `<img>` element with CSS anchor offset instead of `google.maps.Icon`/`MarkerShape`:
```typescript
export const setMarkerIcon = (
    markerIcons: { [key: string]: MarkerIcon },
    name: string,
    iconOptions: IconOptions,
): void => {
    const img = document.createElement('img');
    img.src = iconOptions.url;
    img.width = iconOptions.size[0];
    img.height = iconOptions.size[1];
    img.style.display = 'block';
    const tx = -iconOptions.anchor[0];
    const ty = -iconOptions.anchor[1];
    img.style.transform = `translate(${tx}px, ${ty}px)`;

    markerIcons[name] = { content: img };
};
```

**`createMarker()`**: `new AdvancedMarkerElement()`, property assignments instead of setters.

**`updateMarker()`**: Property assignments, no `setOptions()`.

**`bindEventsToMarker()`**: DOM `addEventListener` with `gmp-click`/`gmp-drag`/`gmp-dragend` + `element.addEventListener` for `dblclick`/`contextmenu`.

**`unbindEventsToMarker()`**: Store listener refs in marker data, remove individually (replaces `clearInstanceListeners`).

**`createMapLabelByMarker()`**: Add `map` param, set position/map explicitly (no `bindTo` — AdvancedMarkerElement is not an MVCObject):
```typescript
export const createMapLabelByMarker = (
    marker: google.maps.marker.AdvancedMarkerElement,
    title: string,
    map: google.maps.Map,
): MapLabel => {
    const mapLabel = new MapLabel({
        text: title,
        strokeWeight: 2,
        position: marker.position,
    });
    mapLabel.setMap(map);
    return mapLabel;
};
```

### 2. `src/component/googleMap.ts` — Moderate changes

- Add `mapId: 'DEMO_MAP_ID'` to default options (required for AdvancedMarkerElement)
- Update all type refs `google.maps.Marker` → `google.maps.marker.AdvancedMarkerElement`
- `fitMarkerToMap`: `.position` instead of `getPosition()`
- `openInfoWindow`: `infoWindow.open({ map, anchor: marker })`
- `setMarkers`: map `draggable` → `gmpDraggable` for backward compat

### 3. `src/field/locationField.ts` — Minor changes

- Add `mapId` to embedded map options

### 4. `src/component/mapLabel.ts` — No class changes needed

Only the caller (`createMapLabelByMarker`) changes. The `bindTo` method remains available for other MVCObject uses (e.g., polygons).

---

## Event Binding Details

### Position helper for LatLng/LatLngLiteral normalization
```typescript
function getLatLng(
    pos: google.maps.LatLng | google.maps.LatLngLiteral,
): { lat: number; lng: number } {
    if ('lat' in pos && typeof pos.lat === 'function') {
        return { lat: (pos as google.maps.LatLng).lat(), lng: (pos as google.maps.LatLng).lng() };
    }
    return pos as { lat: number; lng: number };
}
```

### Listener tracking for cleanup
Store an array of `{ target, event, handler }` tuples in marker data under `_listeners`, and remove them individually in `unbindEventsToMarker()`.

---

## IconOptions Handling

The existing `IconOptions` type stays unchanged for backward compat:
```typescript
export type IconOptions = {
    url: string;           // → img.src
    size: [number, number]; // → img.width, img.height
    origin: [number, number]; // → ignored (sprite sheet offset, rarely used)
    anchor: [number, number]; // → CSS transform: translate(-x, -y)
    coords: number[];      // → dropped (no click polygon in AdvancedMarkerElement)
};
```

---

## Breaking Changes for Consumers

1. **`mapId` required** — Default `'DEMO_MAP_ID'` for dev; consumers should provide their own from Google Cloud Console for production.
2. **`MarkerIcon` type** — Changes from `{ icon, shape }` to `{ content: HTMLElement }`. Any consumer accessing `markerIcons` directly will break.
3. **`IconOptions.coords` ignored** — No click polygon concept in AdvancedMarkerElement. Field remains in type but has no effect.
4. **Event objects** — Callbacks for `markerClick`, `markerDoubleClick`, `markerRightClick`, `markerChanged` will receive standard DOM events instead of Google Maps events.
5. **`draggable` option** — Must use `gmpDraggable`. Internal backward-compat layer maps `draggable` → `gmpDraggable` in `setMarkers()`.

---

## Test Mock Changes

### `jest.setup.ts`
No changes needed — `@googlemaps/jest-mocks` `initialize()` already provides `google.maps.marker.AdvancedMarkerElement`.

### `src/component/mapMarkerOps.spec.ts`
- Replace `new google.maps.Marker()` with `new google.maps.marker.AdvancedMarkerElement()`
- Setter assertions (`setIcon`, `setShape`, `setTitle`, `setPosition`) → property checks (`content`, `title`, `position`)
- `setOptions` assertions → direct property checks
- `bindTo` assertions → verify `mapLabel.setMap()` called with map
- `clearInstanceListeners` → verify individual listeners removed
- `getPosition()` → `.position` property

### `src/component/googleMap.spec.ts`
- Type annotations `google.maps.Marker` → `google.maps.marker.AdvancedMarkerElement`
- Setter assertions → property checks
- `openInfoWindow`: verify `infoWindow.open({ map, anchor })` call
- Verify `mapId` in default options

### `src/field/locationField.spec.ts`
- Minimal changes — tests go through `GoogleMap`'s public API
- May need to verify `mapId` in map options

---

## Execution Strategy

**All at once** — The marker type permeates all dependent code; partial migration would break type consistency.

### Steps
1. Update `MarkerIcon` type and `setMarkerIcon()` in `mapMarkerOps.ts`
2. Update `createMapLabelByMarker()` signature (add `map` param)
3. Update `createMarker()`, `updateMarker()`, `removeMarker()`, `removeAllMarkers()`
4. Update `bindEventsToMarker()` and `unbindEventsToMarker()` with listener tracking
5. Update `googleMap.ts` (add `mapId`, update `fitMarkerToMap`, `openInfoWindow`, `setMarkers`, pass `map` to `createMapLabelByMarker`)
6. Update `locationField.ts` (add `mapId`)
7. Update all 3 spec files
8. Validate: `npx tsc --noEmit` + `npm run test`
