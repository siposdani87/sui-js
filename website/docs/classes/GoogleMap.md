---
id: "GoogleMap"
title: "Class: GoogleMap"
sidebar_label: "GoogleMap"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new GoogleMap**(`dom`, `opt_selector?`, `opt_options?`): [`GoogleMap`](GoogleMap.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dom` | [`Knot`](Knot.md)\<`HTMLElement`\> | `undefined` |
| `opt_selector` | `string` | `'.map'` |
| `opt_options` | `Object` | `{}` |

#### Returns

[`GoogleMap`](GoogleMap.md)

#### Defined in

[component/googleMap.ts:69](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L69)

## Properties

### heatmap

• **heatmap**: `HeatmapLayer`

#### Defined in

[component/googleMap.ts:67](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L67)

___

### heatmapOptions

• **heatmapOptions**: [`Objekt`](Objekt.md)\<`Object`\>

#### Defined in

[component/googleMap.ts:66](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L66)

___

### map

• **map**: `Map`

#### Defined in

[component/googleMap.ts:57](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L57)

___

### mapKnot

• **mapKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/googleMap.ts:55](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L55)

___

### markerIcons

• **markerIcons**: `Object`

#### Index signature

▪ [key: `string`]: `MarkerIcon`

#### Defined in

[component/googleMap.ts:58](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L58)

___

### markerOptions

• **markerOptions**: [`Objekt`](Objekt.md)\<`Object`\>

#### Defined in

[component/googleMap.ts:65](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L65)

___

### markers

• **markers**: [`Collection`](Collection.md)\<[`Objekt`](Objekt.md)\<`Object`\>\>

#### Defined in

[component/googleMap.ts:64](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L64)

___

### options

• **options**: [`Objekt`](Objekt.md)\<`Object`\>

#### Defined in

[component/googleMap.ts:56](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L56)

___

### overlay

• **overlay**: `OverlayView`

#### Defined in

[component/googleMap.ts:61](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L61)

___

### polygonOptions

• **polygonOptions**: [`Objekt`](Objekt.md)\<`Object`\>

#### Defined in

[component/googleMap.ts:62](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L62)

___

### polygons

• **polygons**: [`Collection`](Collection.md)\<[`Objekt`](Objekt.md)\<`Object`\>\>

#### Defined in

[component/googleMap.ts:63](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L63)

## Methods

### \_addPointsToPolygon

▸ **_addPointsToPolygon**(`polygonData`, `points`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md)\<`Object`\> |
| `points` | \{ `latitude`: `number` ; `longitude`: `number`  }[] |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:428](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L428)

___

### \_bindEventsToMap

▸ **_bindEventsToMap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:141](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L141)

___

### \_bindEventsToMarker

▸ **_bindEventsToMarker**(`marker`, `markerData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `marker` | `Marker` |
| `markerData` | [`Objekt`](Objekt.md)\<`Object`\> |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:692](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L692)

___

### \_bindEventsToPolygon

▸ **_bindEventsToPolygon**(`polygon`, `polygonData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygon` | `Polygon` |
| `polygonData` | [`Objekt`](Objekt.md)\<`Object`\> |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:280](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L280)

___

### \_bindEventsToPolygonPath

▸ **_bindEventsToPolygonPath**(`polygon`, `polygonData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygon` | `Polygon` |
| `polygonData` | [`Objekt`](Objekt.md)\<`Object`\> |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:329](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L329)

___

### \_callPolygonChangeEvent

▸ **_callPolygonChangeEvent**(`polygon`, `polygonData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygon` | `Polygon` |
| `polygonData` | [`Objekt`](Objekt.md)\<`Object`\> |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:354](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L354)

___

### \_cleanMarkerData

▸ **_cleanMarkerData**(`markerData`): [`Objekt`](Objekt.md)\<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `markerData` | `Object` |

#### Returns

[`Objekt`](Objekt.md)\<`Object`\>

#### Defined in

[component/googleMap.ts:760](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L760)

___

### \_cleanPolygonData

▸ **_cleanPolygonData**(`polygonData`): [`Objekt`](Objekt.md)\<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | `Object` |

#### Returns

[`Objekt`](Objekt.md)\<`Object`\>

#### Defined in

[component/googleMap.ts:243](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L243)

___

### \_convertPointsToPath

▸ **_convertPointsToPath**(`points`): `LatLng`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `points` | [`WeightLatLng`](../modules.md#weightlatlng)[] |

#### Returns

`LatLng`[]

#### Defined in

[component/googleMap.ts:439](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L439)

___

### \_getPointsFromPolygon

▸ **_getPointsFromPolygon**(`polygonData`): \{ `latitude`: `number` ; `longitude`: `number`  }[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md)\<`Object`\> |

#### Returns

\{ `latitude`: `number` ; `longitude`: `number`  }[]

#### Defined in

[component/googleMap.ts:504](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L504)

___

### \_init

▸ **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:121](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L121)

___

### \_initMap

▸ **_initMap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:131](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L131)

___

### \_initOverlay

▸ **_initOverlay**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:156](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L156)

___

### \_setBoundsByPath

▸ **_setBoundsByPath**(`polygonData`, `path`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md)\<`Object`\> |
| `path` | `LatLng`[] |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:467](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L467)

___

### \_setBoundsByPoints

▸ **_setBoundsByPoints**(`polygonData`, `points`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md)\<`Object`\> |
| `points` | \{ `latitude`: `number` ; `longitude`: `number`  }[] |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:459](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L459)

___

### \_setOptions

▸ **_setOptions**(`opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:79](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L79)

___

### \_unbindEventsToMap

▸ **_unbindEventsToMap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:152](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L152)

___

### \_unbindEventsToMarker

▸ **_unbindEventsToMarker**(`marker`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `marker` | `Marker` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:729](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L729)

___

### \_unbindEventsToPolygon

▸ **_unbindEventsToPolygon**(`polygon`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygon` | `Polygon` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:324](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L324)

___

### \_unbindEventsToPolygonPath

▸ **_unbindEventsToPolygonPath**(`polygon`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygon` | `Polygon` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:347](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L347)

___

### addPointToPolygon

▸ **addPointToPolygon**(`polygonData`, `latitude`, `longitude`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md)\<`Object`\> |
| `latitude` | `number` |
| `longitude` | `number` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:526](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L526)

___

### createHeatmap

▸ **createHeatmap**(`points`, `opt_heatmapOptions?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `points` | [`WeightLatLng`](../modules.md#weightlatlng)[] |
| `opt_heatmapOptions` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:568](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L568)

___

### createMarker

▸ **createMarker**(`id`, `title`, `iconName`, `latitude`, `longitude`, `opt_markerData?`, `opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |
| `title` | `string` |
| `iconName` | `string` |
| `latitude` | `number` |
| `longitude` | `number` |
| `opt_markerData` | `Object` |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:637](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L637)

___

### createMarkerByXY

▸ **createMarkerByXY**(`id`, `title`, `iconName`, `x`, `y`, `markerData?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |
| `title` | `string` |
| `iconName` | `string` |
| `x` | `number` |
| `y` | `number` |
| `markerData` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:670](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L670)

___

### createOrUpdateMarker

▸ **createOrUpdateMarker**(`id`, `title`, `iconName`, `latitude`, `longitude`, `opt_markerData?`, `opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |
| `title` | `string` |
| `iconName` | `string` |
| `latitude` | `number` |
| `longitude` | `number` |
| `opt_markerData` | `Object` |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:604](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L604)

___

### createOrUpdatePolygon

▸ **createOrUpdatePolygon**(`id`, `title`, `points`, `opt_polygonData?`, `opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |
| `title` | `string` |
| `points` | \{ `latitude`: `number` ; `longitude`: `number`  }[] |
| `opt_polygonData` | `Object` |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:171](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L171)

___

### createPolygon

▸ **createPolygon**(`id`, `title`, `points`, `opt_polygonData?`, `opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |
| `title` | `string` |
| `points` | \{ `latitude`: `number` ; `longitude`: `number`  }[] |
| `opt_polygonData` | `Object` |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:186](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L186)

___

### eventMapClick

▸ **eventMapClick**(`latitude`, `longitude`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `latitude` | `number` |
| `longitude` | `number` |
| `event` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:420](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L420)

___

### eventMapTypeChange

▸ **eventMapTypeChange**(`mapType`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapType` | `string` |
| `event` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:424](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L424)

___

### eventMarkerChanged

▸ **eventMarkerChanged**(`markerData`, `latitude`, `longitude`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `markerData` | [`Objekt`](Objekt.md)\<`Object`\> |
| `latitude` | `number` |
| `longitude` | `number` |
| `event` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:829](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L829)

___

### eventMarkerClick

▸ **eventMarkerClick**(`markerData`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `markerData` | [`Objekt`](Objekt.md)\<`Object`\> |
| `event` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:817](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L817)

___

### eventMarkerDoubleClick

▸ **eventMarkerDoubleClick**(`markerData`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `markerData` | [`Objekt`](Objekt.md)\<`Object`\> |
| `event` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:821](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L821)

___

### eventMarkerRightClick

▸ **eventMarkerRightClick**(`markerData`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `markerData` | [`Objekt`](Objekt.md)\<`Object`\> |
| `event` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:825](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L825)

___

### eventPolygonChanged

▸ **eventPolygonChanged**(`polygonData`, `points`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md)\<`Object`\> |
| `points` | \{ `latitude`: `number` ; `longitude`: `number`  }[] |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:164](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L164)

___

### eventPolygonClick

▸ **eventPolygonClick**(`polygonData`, `latitude`, `longitude`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md)\<`Object`\> |
| `latitude` | `number` |
| `longitude` | `number` |
| `event` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:375](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L375)

___

### eventPolygonDoubleClick

▸ **eventPolygonDoubleClick**(`polygonData`, `latitude`, `longitude`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md)\<`Object`\> |
| `latitude` | `number` |
| `longitude` | `number` |
| `event` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:390](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L390)

___

### eventPolygonRightClick

▸ **eventPolygonRightClick**(`polygonData`, `latitude`, `longitude`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md)\<`Object`\> |
| `latitude` | `number` |
| `longitude` | `number` |
| `event` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:405](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L405)

___

### fitMarkerToMap

▸ **fitMarkerToMap**(`markerId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `markerId` | `string` \| `number` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:797](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L797)

___

### fitPolygonToMap

▸ **fitPolygonToMap**(`polygonId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonId` | `string` \| `number` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:492](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L492)

___

### getCenter

▸ **getCenter**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `latitude` | `number` |
| `longitude` | `number` |

#### Defined in

[component/googleMap.ts:921](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L921)

___

### getCenterOfPolygon

▸ **getCenterOfPolygon**(`polygonData`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md)\<`Object`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `latitude` | `number` |
| `longitude` | `number` |

#### Defined in

[component/googleMap.ts:480](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L480)

___

### getComputeArea

▸ **getComputeArea**(`polygonData`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md)\<`Object`\> |

#### Returns

`number`

#### Defined in

[component/googleMap.ts:520](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L520)

___

### getDinamicRadius

▸ **getDinamicRadius**(`radiusPx`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `radiusPx` | `number` |

#### Returns

`number`

#### Defined in

[component/googleMap.ts:933](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L933)

___

### getMapType

▸ **getMapType**(): `string`

#### Returns

`string`

#### Defined in

[component/googleMap.ts:102](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L102)

___

### getMarker

▸ **getMarker**(`id`): [`Objekt`](Objekt.md)\<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |

#### Returns

[`Objekt`](Objekt.md)\<`Object`\>

#### Defined in

[component/googleMap.ts:770](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L770)

___

### getPolygon

▸ **getPolygon**(`id`): [`Objekt`](Objekt.md)\<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |

#### Returns

[`Objekt`](Objekt.md)\<`Object`\>

#### Defined in

[component/googleMap.ts:253](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L253)

___

### openInfoWindow

▸ **openInfoWindow**(`markerId`, `content`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `markerId` | `string` \| `number` |
| `content` | `string` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:808](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L808)

___

### removeAllMarker

▸ **removeAllMarker**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:786](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L786)

___

### removeAllPolygon

▸ **removeAllPolygon**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:269](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L269)

___

### removeHeatmap

▸ **removeHeatmap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:583](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L583)

___

### removeMarker

▸ **removeMarker**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:774](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L774)

___

### removePolygon

▸ **removePolygon**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:257](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L257)

___

### searchAddress

▸ **searchAddress**(`query`): [`Promize`](Promize.md)\<[\{ `address`: `string` ; `latitude`: `number` ; `longitude`: `number`  }[]], `void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |

#### Returns

[`Promize`](Promize.md)\<[\{ `address`: `string` ; `latitude`: `number` ; `longitude`: `number`  }[]], `void`\>

#### Defined in

[component/googleMap.ts:873](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L873)

___

### setCenter

▸ **setCenter**(`latitude`, `longitude`, `opt_boundCheck?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `latitude` | `number` | `undefined` |
| `longitude` | `number` | `undefined` |
| `opt_boundCheck` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:906](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L906)

___

### setCustomMapStyle

▸ **setCustomMapStyle**(`mapTypeId`, `mapTypeName`, `mapStyles`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapTypeId` | `string` |
| `mapTypeName` | `string` |
| `mapStyles` | `MapTypeStyle`[] |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:110](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L110)

___

### setHeatmap

▸ **setHeatmap**(`opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:545](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L545)

___

### setMapType

▸ **setMapType**(`mapTypeId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapTypeId` | `string` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:106](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L106)

___

### setMarkerIcon

▸ **setMarkerIcon**(`name`, `iconOptions`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `iconOptions` | [`IconOptions`](../modules.md#iconoptions) |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:844](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L844)

___

### setMarkers

▸ **setMarkers**(`opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:536](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L536)

___

### setPolygons

▸ **setPolygons**(`opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:589](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L589)

___

### triggerResize

▸ **triggerResize**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:929](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L929)

___

### updateMarker

▸ **updateMarker**(`id`, `title`, `iconName`, `latitude`, `longitude`, `opt_markerData?`, `opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |
| `title` | `string` |
| `iconName` | `string` |
| `latitude` | `number` |
| `longitude` | `number` |
| `opt_markerData` | `Object` |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:733](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L733)

___

### updatePolygon

▸ **updatePolygon**(`id`, `title`, `points`, `opt_polygonData?`, `opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |
| `title` | `string` |
| `points` | \{ `latitude`: `number` ; `longitude`: `number`  }[] |
| `opt_polygonData` | `Object` |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:218](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/googleMap.ts#L218)
