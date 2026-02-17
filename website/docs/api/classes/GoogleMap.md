# Class: GoogleMap

Defined in: [component/googleMap.ts:97](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L97)

Google Maps wrapper with support for markers, polygons, heatmaps, geocoding, and custom map styles.

## Description

Provides a high-level API over the Google Maps JavaScript API. Manages
collections of markers and polygons with associated MapLabel overlays,
heatmap visualization, address geocoding, and custom map styling.

## Example

```ts
const googleMap = new GoogleMap(containerKnot, '.map', {
    center: { lat: 47.6, lng: 17.53 },
    zoom: 10,
});
googleMap.setMarkerIcon('default', iconOptions);
googleMap.createMarker('m1', 'My Marker', 'default', 47.6, 17.53);
```

## See

 - MapLabel
 - [Collection](Collection.md)
 - [Objekt](Objekt.md)
 - [Deferred](Deferred.md)

## Constructors

### Constructor

> **new GoogleMap**(`dom`, `opt_selector?`, `opt_options?`): `GoogleMap`

Defined in: [component/googleMap.ts:117](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L117)

#### Parameters

##### dom

[`Knot`](Knot.md)

The parent DOM wrapper [Knot](Knot.md).

##### opt\_selector?

CSS selector for the map container element.

`string` | `undefined`

##### opt\_options?

Google Maps configuration options merged with defaults.

`object` | `undefined`

#### Returns

`GoogleMap`

## Properties

### heatmap

> **heatmap**: `HeatmapLayer`

Defined in: [component/googleMap.ts:110](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L110)

***

### heatmapOptions

> **heatmapOptions**: [`Objekt`](Objekt.md)

Defined in: [component/googleMap.ts:109](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L109)

***

### map

> **map**: `Map`

Defined in: [component/googleMap.ts:100](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L100)

***

### mapKnot

> **mapKnot**: [`Knot`](Knot.md)

Defined in: [component/googleMap.ts:98](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L98)

***

### markerIcons

> **markerIcons**: `object`

Defined in: [component/googleMap.ts:101](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L101)

#### Index Signature

\[`key`: `string`\]: `MarkerIcon`

***

### markerOptions

> **markerOptions**: [`Objekt`](Objekt.md)

Defined in: [component/googleMap.ts:108](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L108)

***

### markers

> **markers**: [`Collection`](Collection.md)\<[`Objekt`](Objekt.md)\<`object`\>\>

Defined in: [component/googleMap.ts:107](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L107)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/googleMap.ts:99](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L99)

***

### overlay

> **overlay**: `OverlayView`

Defined in: [component/googleMap.ts:104](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L104)

***

### polygonOptions

> **polygonOptions**: [`Objekt`](Objekt.md)

Defined in: [component/googleMap.ts:105](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L105)

***

### polygons

> **polygons**: [`Collection`](Collection.md)\<[`Objekt`](Objekt.md)\<`object`\>\>

Defined in: [component/googleMap.ts:106](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L106)

## Methods

### addPointToPolygon()

> **addPointToPolygon**(`polygonData`, `latitude`, `longitude`): `void`

Defined in: [component/googleMap.ts:819](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L819)

Appends a vertex to an existing polygon's path.

#### Parameters

##### polygonData

[`Objekt`](Objekt.md)

The polygon data object.

##### latitude

`number`

Latitude of the new vertex.

##### longitude

`number`

Longitude of the new vertex.

#### Returns

`void`

#### Example

```ts
googleMap.addPointToPolygon(polygonData, 47.65, 17.55);
```

***

### createHeatmap()

> **createHeatmap**(`points`, `opt_heatmapOptions?`): `void`

Defined in: [component/googleMap.ts:890](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L890)

Creates a heatmap layer on the map from weighted coordinate data.

#### Parameters

##### points

[`WeightLatLng`](../type-aliases/WeightLatLng.md)[]

Array of weighted geographic coordinates.

##### opt\_heatmapOptions?

Additional heatmap options to merge.

`object` | `undefined`

#### Returns

`void`

#### Example

```ts
googleMap.setHeatmap();
googleMap.createHeatmap([
    { latitude: 47.6, longitude: 17.5, weight: 3 },
    { latitude: 47.7, longitude: 17.6, weight: 1 },
]);
```

***

### createMarker()

> **createMarker**(`id`, `title`, `iconName`, `latitude`, `longitude`, `opt_markerData?`, `opt_options?`): `void`

Defined in: [component/googleMap.ts:1001](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L1001)

Creates a new marker on the map with an associated MapLabel.

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

Unique identifier for the marker.

##### title

`string`

Display label for the marker.

##### iconName

`string`

Name of a registered marker icon (see [setMarkerIcon](#setmarkericon)).

##### latitude

`number`

Latitude position.

##### longitude

`number`

Longitude position.

##### opt\_markerData?

Additional data to associate with the marker.

`object` | `undefined`

##### opt\_options?

Google Maps Marker options.

`object` | `undefined`

#### Returns

`void`

#### Example

```ts
googleMap.createMarker('m1', 'Home', 'default', 47.6, 17.5);
```

***

### createMarkerByXY()

> **createMarkerByXY**(`id`, `title`, `iconName`, `x`, `y`, `markerData?`): `void`

Defined in: [component/googleMap.ts:1047](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L1047)

Creates a marker from pixel coordinates, converting them to geographic coordinates.

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

Unique identifier for the marker.

##### title

`string`

Display label for the marker.

##### iconName

`string`

Name of a registered marker icon.

##### x

`number`

Horizontal pixel coordinate on the map container.

##### y

`number`

Vertical pixel coordinate on the map container.

##### markerData?

Additional data to associate with the marker.

`object` | `undefined`

#### Returns

`void`

#### Example

```ts
googleMap.createMarkerByXY('m2', 'Dropped', 'default', 150, 200);
```

***

### createOrUpdateMarker()

> **createOrUpdateMarker**(`id`, `title`, `iconName`, `latitude`, `longitude`, `opt_markerData?`, `opt_options?`): `void`

Defined in: [component/googleMap.ts:954](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L954)

Creates a new marker or updates an existing one identified by ID.

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

Unique identifier for the marker.

##### title

`string`

Display label for the marker.

##### iconName

`string`

Name of a registered marker icon.

##### latitude

`number`

Latitude position.

##### longitude

`number`

Longitude position.

##### opt\_markerData?

Additional data to associate with the marker.

`object` | `undefined`

##### opt\_options?

Google Maps Marker options.

`object` | `undefined`

#### Returns

`void`

#### Example

```ts
googleMap.createOrUpdateMarker('m1', 'Location', 'default', 47.6, 17.5);
```

***

### createOrUpdatePolygon()

> **createOrUpdatePolygon**(`id`, `title`, `points`, `opt_polygonData?`, `opt_options?`): `void`

Defined in: [component/googleMap.ts:287](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L287)

Creates a new polygon or updates an existing one identified by ID.

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

Unique identifier for the polygon.

##### title

`string`

Display label for the polygon.

##### points

`object`[]

Array of vertex coordinates forming the polygon.

##### opt\_polygonData?

Additional data to associate with the polygon.

`object` | `undefined`

##### opt\_options?

Google Maps Polygon style options.

`object` | `undefined`

#### Returns

`void`

#### Example

```ts
googleMap.createOrUpdatePolygon('p1', 'Area', [
    { latitude: 47.6, longitude: 17.5 },
    { latitude: 47.7, longitude: 17.6 },
    { latitude: 47.5, longitude: 17.7 },
]);
```

***

### createPolygon()

> **createPolygon**(`id`, `title`, `points`, `opt_polygonData?`, `opt_options?`): `void`

Defined in: [component/googleMap.ts:318](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L318)

Creates a new polygon on the map with a label at its center.

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

Unique identifier for the polygon.

##### title

`string`

Display label for the polygon.

##### points

`object`[]

Array of vertex coordinates forming the polygon.

##### opt\_polygonData?

Additional data to associate with the polygon.

`object` | `undefined`

##### opt\_options?

Google Maps Polygon style options.

`object` | `undefined`

#### Returns

`void`

#### Example

```ts
googleMap.createPolygon('p1', 'Field', [
    { latitude: 47.6, longitude: 17.5 },
    { latitude: 47.7, longitude: 17.6 },
    { latitude: 47.5, longitude: 17.7 },
]);
```

***

### eventMapClick()

> **eventMapClick**(`latitude`, `longitude`, `event`): `void`

Defined in: [component/googleMap.ts:646](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L646)

Called when the map is clicked. Override to handle map clicks.

#### Parameters

##### latitude

`number`

Click latitude coordinate.

##### longitude

`number`

Click longitude coordinate.

##### event

`object`

The native map event.

#### Returns

`void`

***

### eventMapTypeChange()

> **eventMapTypeChange**(`mapType`, `event`): `void`

Defined in: [component/googleMap.ts:655](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L655)

Called when the map type changes. Override to handle map type changes.

#### Parameters

##### mapType

`string`

The new map type identifier.

##### event

`object`

The native map event.

#### Returns

`void`

***

### eventMarkerChanged()

> **eventMarkerChanged**(`markerData`, `latitude`, `longitude`, `event`): `void`

Defined in: [component/googleMap.ts:1296](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L1296)

Called when a marker is dragged to a new position. Override to handle marker moves.

#### Parameters

##### markerData

[`Objekt`](Objekt.md)

The marker data object (without internal properties).

##### latitude

`number`

New latitude after drag.

##### longitude

`number`

New longitude after drag.

##### event

`object`

The native map event.

#### Returns

`void`

***

### eventMarkerClick()

> **eventMarkerClick**(`markerData`, `event`): `void`

Defined in: [component/googleMap.ts:1267](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L1267)

Called when a marker is clicked. Override to handle marker clicks.

#### Parameters

##### markerData

[`Objekt`](Objekt.md)

The marker data object (without internal properties).

##### event

`object`

The native map event.

#### Returns

`void`

***

### eventMarkerDoubleClick()

> **eventMarkerDoubleClick**(`markerData`, `event`): `void`

Defined in: [component/googleMap.ts:1276](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L1276)

Called when a marker is double-clicked. Override to handle marker double-clicks.

#### Parameters

##### markerData

[`Objekt`](Objekt.md)

The marker data object (without internal properties).

##### event

`object`

The native map event.

#### Returns

`void`

***

### eventMarkerRightClick()

> **eventMarkerRightClick**(`markerData`, `event`): `void`

Defined in: [component/googleMap.ts:1285](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L1285)

Called when a marker is right-clicked. Override to handle marker right-clicks.

#### Parameters

##### markerData

[`Objekt`](Objekt.md)

The marker data object (without internal properties).

##### event

`object`

The native map event.

#### Returns

`void`

***

### eventPolygonChanged()

> **eventPolygonChanged**(`polygonData`, `points`): `void`

Defined in: [component/googleMap.ts:264](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L264)

Called when a polygon's path changes. Override to handle polygon edits.

#### Parameters

##### polygonData

[`Objekt`](Objekt.md)

The polygon data object (without internal properties).

##### points

`object`[]

The updated array of polygon vertex coordinates.

#### Returns

`void`

***

### eventPolygonClick()

> **eventPolygonClick**(`polygonData`, `latitude`, `longitude`, `event`): `void`

Defined in: [component/googleMap.ts:581](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L581)

Called when a polygon is clicked. Override to handle polygon clicks.

#### Parameters

##### polygonData

[`Objekt`](Objekt.md)

The polygon data object (without internal properties).

##### latitude

`number`

Click latitude coordinate.

##### longitude

`number`

Click longitude coordinate.

##### event

`object`

The native map event.

#### Returns

`void`

***

### eventPolygonDoubleClick()

> **eventPolygonDoubleClick**(`polygonData`, `latitude`, `longitude`, `event`): `void`

Defined in: [component/googleMap.ts:603](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L603)

Called when a polygon is double-clicked. Override to handle polygon double-clicks.

#### Parameters

##### polygonData

[`Objekt`](Objekt.md)

The polygon data object (without internal properties).

##### latitude

`number`

Double-click latitude coordinate.

##### longitude

`number`

Double-click longitude coordinate.

##### event

`object`

The native map event.

#### Returns

`void`

***

### eventPolygonRightClick()

> **eventPolygonRightClick**(`polygonData`, `latitude`, `longitude`, `event`): `void`

Defined in: [component/googleMap.ts:625](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L625)

Called when a polygon is right-clicked. Override to handle polygon right-clicks.

#### Parameters

##### polygonData

[`Objekt`](Objekt.md)

The polygon data object (without internal properties).

##### latitude

`number`

Right-click latitude coordinate.

##### longitude

`number`

Right-click longitude coordinate.

##### event

`object`

The native map event.

#### Returns

`void`

***

### fitMarkerToMap()

> **fitMarkerToMap**(`markerId`): `void`

Defined in: [component/googleMap.ts:1233](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L1233)

Centers the map on a specific marker's position.

#### Parameters

##### markerId

The marker identifier to center on.

`string` | `number`

#### Returns

`void`

#### Example

```ts
googleMap.fitMarkerToMap('m1');
```

***

### fitPolygonToMap()

> **fitPolygonToMap**(`polygonId`): `void`

Defined in: [component/googleMap.ts:761](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L761)

Pans and zooms the map to fit a polygon's bounds.

#### Parameters

##### polygonId

The polygon identifier to fit.

`string` | `number`

#### Returns

`void`

#### Example

```ts
googleMap.fitPolygonToMap('p1');
```

***

### getCenter()

> **getCenter**(): `object`

Defined in: [component/googleMap.ts:1435](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L1435)

Returns the current center coordinates of the map.

#### Returns

`object`

An object with latitude and longitude of the map center.

##### latitude

> **latitude**: `number`

##### longitude

> **longitude**: `number`

#### Example

```ts
const center = googleMap.getCenter();
// { latitude: 47.6, longitude: 17.5 }
```

***

### getCenterOfPolygon()

> **getCenterOfPolygon**(`polygonData`): `object`

Defined in: [component/googleMap.ts:741](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L741)

Returns the geographic center of a polygon's bounding box.

#### Parameters

##### polygonData

[`Objekt`](Objekt.md)

The polygon data object containing stored bounds.

#### Returns

`object`

An object with latitude and longitude of the center.

##### latitude

> **latitude**: `number`

##### longitude

> **longitude**: `number`

#### Example

```ts
const center = googleMap.getCenterOfPolygon(polygonData);
// { latitude: 47.6, longitude: 17.5 }
```

***

### getComputeArea()

> **getComputeArea**(`polygonData`): `number`

Defined in: [component/googleMap.ts:803](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L803)

Computes the area of a polygon in square meters using spherical geometry.

#### Parameters

##### polygonData

[`Objekt`](Objekt.md)

The polygon data object.

#### Returns

`number`

The computed area in square meters.

#### Example

```ts
const area = googleMap.getComputeArea(polygonData);
```

***

### getDinamicRadius()

> **getDinamicRadius**(`radiusPx`): `number`

Defined in: [component/googleMap.ts:1462](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L1462)

Converts a pixel radius to a geographic distance in meters based on the current zoom and projection.

#### Parameters

##### radiusPx

`number`

Radius in pixels.

#### Returns

`number`

The equivalent distance in meters.

#### Example

```ts
const meters = googleMap.getDinamicRadius(50);
```

***

### getMapType()

> **getMapType**(): `string`

Defined in: [component/googleMap.ts:162](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L162)

Returns the current map type identifier (e.g. terrain, satellite).

#### Returns

`string`

The active map type ID string.

#### Example

```ts
const mapType = googleMap.getMapType();
```

***

### getMarker()

> **getMarker**(`id`): [`Objekt`](Objekt.md)\<`object`\> \| `null`

Defined in: [component/googleMap.ts:1184](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L1184)

Retrieves a marker data object by its identifier.

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

The marker identifier.

#### Returns

[`Objekt`](Objekt.md)\<`object`\> \| `null`

The marker data [Objekt](Objekt.md), or null if not found.

#### Example

```ts
const marker = googleMap.getMarker('m1');
```

***

### getPolygon()

> **getPolygon**(`id`): [`Objekt`](Objekt.md)\<`object`\> \| `null`

Defined in: [component/googleMap.ts:415](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L415)

Retrieves a polygon data object by its identifier.

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

The polygon identifier.

#### Returns

[`Objekt`](Objekt.md)\<`object`\> \| `null`

The polygon data [Objekt](Objekt.md), or null if not found.

#### Example

```ts
const polygon = googleMap.getPolygon('p1');
```

***

### openInfoWindow()

> **openInfoWindow**(`markerId`, `content`): `void`

Defined in: [component/googleMap.ts:1253](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L1253)

Opens an info window above a marker with HTML content.

#### Parameters

##### markerId

The marker identifier to attach the info window to.

`string` | `number`

##### content

`string`

HTML content string for the info window.

#### Returns

`void`

#### Example

```ts
googleMap.openInfoWindow('m1', '<h3>Details</h3><p>More info</p>');
```

***

### removeAllMarker()

> **removeAllMarker**(): `void`

Defined in: [component/googleMap.ts:1214](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L1214)

Removes all markers and their labels from the map.

#### Returns

`void`

#### Example

```ts
googleMap.removeAllMarker();
```

***

### removeAllPolygon()

> **removeAllPolygon**(): `void`

Defined in: [component/googleMap.ts:445](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L445)

Removes all polygons and their labels from the map.

#### Returns

`void`

#### Example

```ts
googleMap.removeAllPolygon();
```

***

### removeHeatmap()

> **removeHeatmap**(): `void`

Defined in: [component/googleMap.ts:911](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L911)

Removes the current heatmap layer from the map.

#### Returns

`void`

#### Example

```ts
googleMap.removeHeatmap();
```

***

### removeMarker()

> **removeMarker**(`id`): `void`

Defined in: [component/googleMap.ts:1196](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L1196)

Removes a marker and its label from the map.

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

The marker identifier to remove.

#### Returns

`void`

#### Example

```ts
googleMap.removeMarker('m1');
```

***

### removePolygon()

> **removePolygon**(`id`): `void`

Defined in: [component/googleMap.ts:427](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L427)

Removes a polygon and its label from the map.

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

The polygon identifier to remove.

#### Returns

`void`

#### Example

```ts
googleMap.removePolygon('p1');
```

***

### searchAddress()

> **searchAddress**(`query`): [`Promize`](Promize.md)\<\[`object`[]\], `void`\>

Defined in: [component/googleMap.ts:1366](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L1366)

Geocodes an address query and returns matching locations.

#### Parameters

##### query

`string`

The address string to search for.

#### Returns

[`Promize`](Promize.md)\<\[`object`[]\], `void`\>

A [Deferred](Deferred.md) promise resolving with an array of address/coordinate results.

#### Example

```ts
googleMap.searchAddress('Budapest').then(([results]) => {
    results.forEach((r) => console.log(r.address, r.latitude, r.longitude));
});
```

***

### setCenter()

> **setCenter**(`latitude`, `longitude`, `opt_boundCheck?`): `void`

Defined in: [component/googleMap.ts:1411](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L1411)

Sets the map center to the specified coordinates.

#### Parameters

##### latitude

`number`

Center latitude.

##### longitude

`number`

Center longitude.

##### opt\_boundCheck?

When true, only re-centers if the position is outside the current viewport.

`boolean` | `undefined`

#### Returns

`void`

#### Example

```ts
googleMap.setCenter(47.6, 17.5);
googleMap.setCenter(47.6, 17.5, true); // only if out of bounds
```

***

### setCustomMapStyle()

> **setCustomMapStyle**(`mapTypeId`, `mapTypeName`, `mapStyles`): `void`

Defined in: [component/googleMap.ts:190](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L190)

Registers a custom styled map type on the map instance.

#### Parameters

##### mapTypeId

`string`

Unique identifier for the custom map type.

##### mapTypeName

`string`

Display name for the custom map type.

##### mapStyles

(`MapTypeStyle` \| `null`)[]

Array of Google Maps style definitions.

#### Returns

`void`

#### Example

```ts
googleMap.setCustomMapStyle('custom', 'Custom Style', [
    { featureType: 'water', stylers: [{ color: '#0000ff' }] },
]);
```

***

### setHeatmap()

> **setHeatmap**(`opt_options?`): `void`

Defined in: [component/googleMap.ts:854](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L854)

Initializes the heatmap configuration with default gradient and options.

#### Parameters

##### opt\_options?

Heatmap options to merge with defaults.

`object` | `undefined`

#### Returns

`void`

#### Example

```ts
googleMap.setHeatmap({ opacity: 0.8, radius: 20 });
```

***

### setMapType()

> **setMapType**(`mapTypeId`): `void`

Defined in: [component/googleMap.ts:174](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L174)

Sets the map type to display.

#### Parameters

##### mapTypeId

`string`

The map type identifier to set (e.g. 'terrain', 'satellite').

#### Returns

`void`

#### Example

```ts
googleMap.setMapType('satellite');
```

***

### setMarkerIcon()

> **setMarkerIcon**(`name`, `iconOptions`): `void`

Defined in: [component/googleMap.ts:1326](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L1326)

Registers a named marker icon configuration for use with marker creation.

#### Parameters

##### name

`string`

Unique name to reference this icon.

##### iconOptions

[`IconOptions`](../type-aliases/IconOptions.md)

Icon configuration including URL, size, origin, anchor, and coords.

#### Returns

`void`

#### Example

```ts
googleMap.setMarkerIcon('default', {
    url: '/icons/marker.png',
    size: [32, 32],
    origin: [0, 0],
    anchor: [16, 32],
    coords: [16, 0, 32, 32, 0, 32],
});
```

***

### setMarkers()

> **setMarkers**(`opt_options?`): `void`

Defined in: [component/googleMap.ts:837](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L837)

Initializes or resets the marker [Collection](Collection.md) and default marker options.

#### Parameters

##### opt\_options?

Default marker options merged into all new markers.

`object` | `undefined`

#### Returns

`void`

#### Example

```ts
googleMap.setMarkers({ draggable: true });
```

***

### setPolygons()

> **setPolygons**(`opt_options?`): `void`

Defined in: [component/googleMap.ts:925](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L925)

Initializes or resets the polygon [Collection](Collection.md) and default polygon options.

#### Parameters

##### opt\_options?

Default polygon style options merged into all new polygons.

`object` | `undefined`

#### Returns

`void`

#### Example

```ts
googleMap.setPolygons({ fillColor: '#00FF00', editable: true });
```

***

### triggerResize()

> **triggerResize**(): `void`

Defined in: [component/googleMap.ts:1449](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L1449)

Triggers a map resize event, useful after the map container size changes.

#### Returns

`void`

#### Example

```ts
googleMap.triggerResize();
```

***

### updateMarker()

> **updateMarker**(`id`, `title`, `iconName`, `latitude`, `longitude`, `opt_markerData?`, `opt_options?`): `void`

Defined in: [component/googleMap.ts:1133](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L1133)

Updates an existing marker's data, icon, title, and position.

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

The marker identifier to update.

##### title

`string`

Updated display label.

##### iconName

`string`

Updated icon name from registered marker icons.

##### latitude

`number`

Updated latitude position.

##### longitude

`number`

Updated longitude position.

##### opt\_markerData?

Updated data to merge into the marker.

`object` | `undefined`

##### opt\_options?

Updated Google Maps Marker options.

`object` | `undefined`

#### Returns

`void`

#### Example

```ts
googleMap.updateMarker('m1', 'New Title', 'default', 47.65, 17.55);
```

***

### updatePolygon()

> **updatePolygon**(`id`, `title`, `points`, `opt_polygonData?`, `opt_options?`): `void`

Defined in: [component/googleMap.ts:366](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/googleMap.ts#L366)

Updates an existing polygon's data, path, and label.

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

The polygon identifier to update.

##### title

`string`

Updated display label.

##### points

`object`[]

Updated array of vertex coordinates.

##### opt\_polygonData?

Updated data to merge into the polygon.

`object` | `undefined`

##### opt\_options?

Updated Google Maps Polygon style options.

`object` | `undefined`

#### Returns

`void`

#### Example

```ts
googleMap.updatePolygon('p1', 'Updated Field', [
    { latitude: 47.61, longitude: 17.51 },
    { latitude: 47.71, longitude: 17.61 },
    { latitude: 47.51, longitude: 17.71 },
]);
```
