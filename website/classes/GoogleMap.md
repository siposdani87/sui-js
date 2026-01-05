# Class: GoogleMap

Defined in: [component/googleMap.ts:54](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L54)

## Constructors

### Constructor

> **new GoogleMap**(`dom`, `opt_selector`, `opt_options`): `GoogleMap`

Defined in: [component/googleMap.ts:69](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L69)

#### Parameters

##### dom

[`Knot`](Knot.md)

##### opt\_selector

`string` = `'.map'`

##### opt\_options

`object` = `{}`

#### Returns

`GoogleMap`

## Properties

### heatmap

> **heatmap**: `HeatmapLayer`

Defined in: [component/googleMap.ts:67](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L67)

***

### heatmapOptions

> **heatmapOptions**: [`Objekt`](Objekt.md)

Defined in: [component/googleMap.ts:66](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L66)

***

### map

> **map**: `Map`

Defined in: [component/googleMap.ts:57](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L57)

***

### mapKnot

> **mapKnot**: [`Knot`](Knot.md)

Defined in: [component/googleMap.ts:55](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L55)

***

### markerIcons

> **markerIcons**: `object`

Defined in: [component/googleMap.ts:58](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L58)

#### Index Signature

\[`key`: `string`\]: `MarkerIcon`

***

### markerOptions

> **markerOptions**: [`Objekt`](Objekt.md)

Defined in: [component/googleMap.ts:65](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L65)

***

### markers

> **markers**: [`Collection`](Collection.md)\<[`Objekt`](Objekt.md)\<`object`\>\>

Defined in: [component/googleMap.ts:64](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L64)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/googleMap.ts:56](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L56)

***

### overlay

> **overlay**: `OverlayView`

Defined in: [component/googleMap.ts:61](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L61)

***

### polygonOptions

> **polygonOptions**: [`Objekt`](Objekt.md)

Defined in: [component/googleMap.ts:62](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L62)

***

### polygons

> **polygons**: [`Collection`](Collection.md)\<[`Objekt`](Objekt.md)\<`object`\>\>

Defined in: [component/googleMap.ts:63](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L63)

## Methods

### addPointToPolygon()

> **addPointToPolygon**(`polygonData`, `latitude`, `longitude`): `void`

Defined in: [component/googleMap.ts:526](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L526)

#### Parameters

##### polygonData

[`Objekt`](Objekt.md)

##### latitude

`number`

##### longitude

`number`

#### Returns

`void`

***

### createHeatmap()

> **createHeatmap**(`points`, `opt_heatmapOptions`): `void`

Defined in: [component/googleMap.ts:568](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L568)

#### Parameters

##### points

[`WeightLatLng`](../type-aliases/WeightLatLng.md)[]

##### opt\_heatmapOptions

`object` = `{}`

#### Returns

`void`

***

### createMarker()

> **createMarker**(`id`, `title`, `iconName`, `latitude`, `longitude`, `opt_markerData`, `opt_options`): `void`

Defined in: [component/googleMap.ts:637](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L637)

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

##### title

`string`

##### iconName

`string`

##### latitude

`number`

##### longitude

`number`

##### opt\_markerData

`object` = `{}`

##### opt\_options

`object` = `{}`

#### Returns

`void`

***

### createMarkerByXY()

> **createMarkerByXY**(`id`, `title`, `iconName`, `x`, `y`, `markerData`): `void`

Defined in: [component/googleMap.ts:670](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L670)

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

##### title

`string`

##### iconName

`string`

##### x

`number`

##### y

`number`

##### markerData

`object` = `{}`

#### Returns

`void`

***

### createOrUpdateMarker()

> **createOrUpdateMarker**(`id`, `title`, `iconName`, `latitude`, `longitude`, `opt_markerData`, `opt_options`): `void`

Defined in: [component/googleMap.ts:604](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L604)

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

##### title

`string`

##### iconName

`string`

##### latitude

`number`

##### longitude

`number`

##### opt\_markerData

`object` = `{}`

##### opt\_options

`object` = `{}`

#### Returns

`void`

***

### createOrUpdatePolygon()

> **createOrUpdatePolygon**(`id`, `title`, `points`, `opt_polygonData`, `opt_options`): `void`

Defined in: [component/googleMap.ts:171](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L171)

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

##### title

`string`

##### points

`object`[]

##### opt\_polygonData

`object` = `{}`

##### opt\_options

`object` = `{}`

#### Returns

`void`

***

### createPolygon()

> **createPolygon**(`id`, `title`, `points`, `opt_polygonData`, `opt_options`): `void`

Defined in: [component/googleMap.ts:186](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L186)

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

##### title

`string`

##### points

`object`[]

##### opt\_polygonData

`object` = `{}`

##### opt\_options

`object` = `{}`

#### Returns

`void`

***

### eventMapClick()

> **eventMapClick**(`latitude`, `longitude`, `event`): `void`

Defined in: [component/googleMap.ts:420](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L420)

#### Parameters

##### latitude

`number`

##### longitude

`number`

##### event

`object`

#### Returns

`void`

***

### eventMapTypeChange()

> **eventMapTypeChange**(`mapType`, `event`): `void`

Defined in: [component/googleMap.ts:424](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L424)

#### Parameters

##### mapType

`string`

##### event

`object`

#### Returns

`void`

***

### eventMarkerChanged()

> **eventMarkerChanged**(`markerData`, `latitude`, `longitude`, `event`): `void`

Defined in: [component/googleMap.ts:829](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L829)

#### Parameters

##### markerData

[`Objekt`](Objekt.md)

##### latitude

`number`

##### longitude

`number`

##### event

`object`

#### Returns

`void`

***

### eventMarkerClick()

> **eventMarkerClick**(`markerData`, `event`): `void`

Defined in: [component/googleMap.ts:817](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L817)

#### Parameters

##### markerData

[`Objekt`](Objekt.md)

##### event

`object`

#### Returns

`void`

***

### eventMarkerDoubleClick()

> **eventMarkerDoubleClick**(`markerData`, `event`): `void`

Defined in: [component/googleMap.ts:821](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L821)

#### Parameters

##### markerData

[`Objekt`](Objekt.md)

##### event

`object`

#### Returns

`void`

***

### eventMarkerRightClick()

> **eventMarkerRightClick**(`markerData`, `event`): `void`

Defined in: [component/googleMap.ts:825](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L825)

#### Parameters

##### markerData

[`Objekt`](Objekt.md)

##### event

`object`

#### Returns

`void`

***

### eventPolygonChanged()

> **eventPolygonChanged**(`polygonData`, `points`): `void`

Defined in: [component/googleMap.ts:164](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L164)

#### Parameters

##### polygonData

[`Objekt`](Objekt.md)

##### points

`object`[]

#### Returns

`void`

***

### eventPolygonClick()

> **eventPolygonClick**(`polygonData`, `latitude`, `longitude`, `event`): `void`

Defined in: [component/googleMap.ts:375](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L375)

#### Parameters

##### polygonData

[`Objekt`](Objekt.md)

##### latitude

`number`

##### longitude

`number`

##### event

`object`

#### Returns

`void`

***

### eventPolygonDoubleClick()

> **eventPolygonDoubleClick**(`polygonData`, `latitude`, `longitude`, `event`): `void`

Defined in: [component/googleMap.ts:390](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L390)

#### Parameters

##### polygonData

[`Objekt`](Objekt.md)

##### latitude

`number`

##### longitude

`number`

##### event

`object`

#### Returns

`void`

***

### eventPolygonRightClick()

> **eventPolygonRightClick**(`polygonData`, `latitude`, `longitude`, `event`): `void`

Defined in: [component/googleMap.ts:405](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L405)

#### Parameters

##### polygonData

[`Objekt`](Objekt.md)

##### latitude

`number`

##### longitude

`number`

##### event

`object`

#### Returns

`void`

***

### fitMarkerToMap()

> **fitMarkerToMap**(`markerId`): `void`

Defined in: [component/googleMap.ts:797](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L797)

#### Parameters

##### markerId

`string` | `number`

#### Returns

`void`

***

### fitPolygonToMap()

> **fitPolygonToMap**(`polygonId`): `void`

Defined in: [component/googleMap.ts:492](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L492)

#### Parameters

##### polygonId

`string` | `number`

#### Returns

`void`

***

### getCenter()

> **getCenter**(): `object`

Defined in: [component/googleMap.ts:921](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L921)

#### Returns

`object`

##### latitude

> **latitude**: `number`

##### longitude

> **longitude**: `number`

***

### getCenterOfPolygon()

> **getCenterOfPolygon**(`polygonData`): `object`

Defined in: [component/googleMap.ts:480](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L480)

#### Parameters

##### polygonData

[`Objekt`](Objekt.md)

#### Returns

`object`

##### latitude

> **latitude**: `number`

##### longitude

> **longitude**: `number`

***

### getComputeArea()

> **getComputeArea**(`polygonData`): `number`

Defined in: [component/googleMap.ts:520](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L520)

#### Parameters

##### polygonData

[`Objekt`](Objekt.md)

#### Returns

`number`

***

### getDinamicRadius()

> **getDinamicRadius**(`radiusPx`): `number`

Defined in: [component/googleMap.ts:933](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L933)

#### Parameters

##### radiusPx

`number`

#### Returns

`number`

***

### getMapType()

> **getMapType**(): `string`

Defined in: [component/googleMap.ts:102](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L102)

#### Returns

`string`

***

### getMarker()

> **getMarker**(`id`): [`Objekt`](Objekt.md)

Defined in: [component/googleMap.ts:770](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L770)

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

#### Returns

[`Objekt`](Objekt.md)

***

### getPolygon()

> **getPolygon**(`id`): [`Objekt`](Objekt.md)

Defined in: [component/googleMap.ts:253](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L253)

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

#### Returns

[`Objekt`](Objekt.md)

***

### openInfoWindow()

> **openInfoWindow**(`markerId`, `content`): `void`

Defined in: [component/googleMap.ts:808](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L808)

#### Parameters

##### markerId

`string` | `number`

##### content

`string`

#### Returns

`void`

***

### removeAllMarker()

> **removeAllMarker**(): `void`

Defined in: [component/googleMap.ts:786](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L786)

#### Returns

`void`

***

### removeAllPolygon()

> **removeAllPolygon**(): `void`

Defined in: [component/googleMap.ts:269](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L269)

#### Returns

`void`

***

### removeHeatmap()

> **removeHeatmap**(): `void`

Defined in: [component/googleMap.ts:583](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L583)

#### Returns

`void`

***

### removeMarker()

> **removeMarker**(`id`): `void`

Defined in: [component/googleMap.ts:774](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L774)

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

#### Returns

`void`

***

### removePolygon()

> **removePolygon**(`id`): `void`

Defined in: [component/googleMap.ts:257](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L257)

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

#### Returns

`void`

***

### searchAddress()

> **searchAddress**(`query`): [`Promize`](Promize.md)\<\[`object`[]\], `void`\>

Defined in: [component/googleMap.ts:873](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L873)

#### Parameters

##### query

`string`

#### Returns

[`Promize`](Promize.md)\<\[`object`[]\], `void`\>

***

### setCenter()

> **setCenter**(`latitude`, `longitude`, `opt_boundCheck`): `void`

Defined in: [component/googleMap.ts:906](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L906)

#### Parameters

##### latitude

`number`

##### longitude

`number`

##### opt\_boundCheck

`boolean` = `false`

#### Returns

`void`

***

### setCustomMapStyle()

> **setCustomMapStyle**(`mapTypeId`, `mapTypeName`, `mapStyles`): `void`

Defined in: [component/googleMap.ts:110](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L110)

#### Parameters

##### mapTypeId

`string`

##### mapTypeName

`string`

##### mapStyles

`MapTypeStyle`[]

#### Returns

`void`

***

### setHeatmap()

> **setHeatmap**(`opt_options`): `void`

Defined in: [component/googleMap.ts:545](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L545)

#### Parameters

##### opt\_options

`object` = `{}`

#### Returns

`void`

***

### setMapType()

> **setMapType**(`mapTypeId`): `void`

Defined in: [component/googleMap.ts:106](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L106)

#### Parameters

##### mapTypeId

`string`

#### Returns

`void`

***

### setMarkerIcon()

> **setMarkerIcon**(`name`, `iconOptions`): `void`

Defined in: [component/googleMap.ts:844](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L844)

#### Parameters

##### name

`string`

##### iconOptions

[`IconOptions`](../type-aliases/IconOptions.md)

#### Returns

`void`

***

### setMarkers()

> **setMarkers**(`opt_options`): `void`

Defined in: [component/googleMap.ts:536](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L536)

#### Parameters

##### opt\_options

`object` = `{}`

#### Returns

`void`

***

### setPolygons()

> **setPolygons**(`opt_options`): `void`

Defined in: [component/googleMap.ts:589](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L589)

#### Parameters

##### opt\_options

`object` = `{}`

#### Returns

`void`

***

### triggerResize()

> **triggerResize**(): `void`

Defined in: [component/googleMap.ts:929](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L929)

#### Returns

`void`

***

### updateMarker()

> **updateMarker**(`id`, `title`, `iconName`, `latitude`, `longitude`, `opt_markerData`, `opt_options`): `void`

Defined in: [component/googleMap.ts:733](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L733)

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

##### title

`string`

##### iconName

`string`

##### latitude

`number`

##### longitude

`number`

##### opt\_markerData

`object` = `{}`

##### opt\_options

`object` = `{}`

#### Returns

`void`

***

### updatePolygon()

> **updatePolygon**(`id`, `title`, `points`, `opt_polygonData`, `opt_options`): `void`

Defined in: [component/googleMap.ts:218](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/googleMap.ts#L218)

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

##### title

`string`

##### points

`object`[]

##### opt\_polygonData

`object` = `{}`

##### opt\_options

`object` = `{}`

#### Returns

`void`
