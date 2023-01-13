---
id: "GoogleMap"
title: "Class: GoogleMap"
sidebar_label: "GoogleMap"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new GoogleMap**(`dom`, `opt_selector?`, `opt_options?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dom` | [`Knot`](Knot.md)<`HTMLElement`\> | `undefined` |
| `opt_selector` | `string` | `'.map'` |
| `opt_options` | `Object` | `{}` |

#### Defined in

[component/googleMap.ts:96](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L96)

## Properties

### heatmap

• **heatmap**: `HeatmapLayer`

#### Defined in

[component/googleMap.ts:90](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L90)

___

### heatmapOptions

• **heatmapOptions**: [`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:89](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L89)

___

### map

• **map**: `Map`

#### Defined in

[component/googleMap.ts:80](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L80)

___

### mapKnot

• **mapKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/googleMap.ts:78](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L78)

___

### markerIcons

• **markerIcons**: `Object`

#### Index signature

▪ [key: `string`]: `MarkerIcon`

#### Defined in

[component/googleMap.ts:81](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L81)

___

### markerOptions

• **markerOptions**: [`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:88](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L88)

___

### markers

• **markers**: [`Collection`](Collection.md)<[`Objekt`](Objekt.md)\>

#### Defined in

[component/googleMap.ts:87](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L87)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:79](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L79)

___

### overlay

• **overlay**: `OverlayView`

#### Defined in

[component/googleMap.ts:84](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L84)

___

### polygonOptions

• **polygonOptions**: [`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:85](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L85)

___

### polygons

• **polygons**: [`Collection`](Collection.md)<[`Objekt`](Objekt.md)\>

#### Defined in

[component/googleMap.ts:86](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L86)

## Methods

### \_addPointsToPolygon

▸ `Private` **_addPointsToPolygon**(`polygonData`, `points`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md) |
| `points` | { `latitude`: `number` ; `longitude`: `number`  }[] |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:577](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L577)

___

### \_bindEventsToMap

▸ `Private` **_bindEventsToMap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:193](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L193)

___

### \_bindEventsToMarker

▸ `Private` **_bindEventsToMarker**(`marker`, `markerData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `marker` | `Marker` |
| `markerData` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:918](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L918)

___

### \_bindEventsToPolygon

▸ `Private` **_bindEventsToPolygon**(`polygon`, `polygonData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygon` | `Polygon` |
| `polygonData` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:379](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L379)

___

### \_bindEventsToPolygonPath

▸ `Private` **_bindEventsToPolygonPath**(`polygon`, `polygonData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygon` | `Polygon` |
| `polygonData` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:437](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L437)

___

### \_callPolygonChangeEvent

▸ `Private` **_callPolygonChangeEvent**(`polygon`, `polygonData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygon` | `Polygon` |
| `polygonData` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:471](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L471)

___

### \_cleanMarkerData

▸ `Private` **_cleanMarkerData**(`markerData`): [`Objekt`](Objekt.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `markerData` | `Object` |

#### Returns

[`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:1001](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L1001)

___

### \_cleanPolygonData

▸ `Private` **_cleanPolygonData**(`polygonData`): [`Objekt`](Objekt.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | `Object` |

#### Returns

[`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:329](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L329)

___

### \_convertPointsToPath

▸ `Private` **_convertPointsToPath**(`points`): `LatLng`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `points` | [`WeightLatLng`](../modules.md#weightlatlng)[] |

#### Returns

`LatLng`[]

#### Defined in

[component/googleMap.ts:592](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L592)

___

### \_getPointsFromPolygon

▸ `Private` **_getPointsFromPolygon**(`polygonData`): { `latitude`: `number` ; `longitude`: `number`  }[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md) |

#### Returns

{ `latitude`: `number` ; `longitude`: `number`  }[]

#### Defined in

[component/googleMap.ts:677](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L677)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:167](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L167)

___

### \_initMap

▸ `Private` **_initMap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:180](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L180)

___

### \_initOverlay

▸ `Private` **_initOverlay**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:214](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L214)

___

### \_setBoundsByPath

▸ `Private` **_setBoundsByPath**(`polygonData`, `path`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md) |
| `path` | `LatLng`[] |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:630](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L630)

___

### \_setBoundsByPoints

▸ `Private` **_setBoundsByPoints**(`polygonData`, `points`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md) |
| `points` | { `latitude`: `number` ; `longitude`: `number`  }[] |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:617](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L617)

___

### \_setOptions

▸ `Private` **_setOptions**(`opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:110](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L110)

___

### \_unbindEventsToMap

▸ `Private` **_unbindEventsToMap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:207](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L207)

___

### \_unbindEventsToMarker

▸ `Private` **_unbindEventsToMarker**(`marker`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `marker` | `Marker` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:958](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L958)

___

### \_unbindEventsToPolygon

▸ `Private` **_unbindEventsToPolygon**(`polygon`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygon` | `Polygon` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:427](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L427)

___

### \_unbindEventsToPolygonPath

▸ `Private` **_unbindEventsToPolygonPath**(`polygon`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygon` | `Polygon` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:459](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L459)

___

### addPointToPolygon

▸ **addPointToPolygon**(`polygonData`, `latitude`, `longitude`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md) |
| `latitude` | `number` |
| `longitude` | `number` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:707](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L707)

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

[component/googleMap.ts:759](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L759)

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

[component/googleMap.ts:851](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L851)

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

[component/googleMap.ts:892](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L892)

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

[component/googleMap.ts:809](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L809)

___

### createOrUpdatePolygon

▸ **createOrUpdatePolygon**(`id`, `title`, `points`, `opt_polygonData?`, `opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |
| `title` | `string` |
| `points` | { `latitude`: `number` ; `longitude`: `number`  }[] |
| `opt_polygonData` | `Object` |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:240](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L240)

___

### createPolygon

▸ **createPolygon**(`id`, `title`, `points`, `opt_polygonData?`, `opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |
| `title` | `string` |
| `points` | { `latitude`: `number` ; `longitude`: `number`  }[] |
| `opt_polygonData` | `Object` |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:262](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L262)

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

[component/googleMap.ts:560](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L560)

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

[component/googleMap.ts:568](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L568)

___

### eventMarkerChanged

▸ **eventMarkerChanged**(`markerData`, `latitude`, `longitude`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `markerData` | [`Objekt`](Objekt.md) |
| `latitude` | `number` |
| `longitude` | `number` |
| `event` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:1103](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L1103)

___

### eventMarkerClick

▸ **eventMarkerClick**(`markerData`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `markerData` | [`Objekt`](Objekt.md) |
| `event` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:1077](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L1077)

___

### eventMarkerDoubleClick

▸ **eventMarkerDoubleClick**(`markerData`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `markerData` | [`Objekt`](Objekt.md) |
| `event` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:1085](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L1085)

___

### eventMarkerRightClick

▸ **eventMarkerRightClick**(`markerData`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `markerData` | [`Objekt`](Objekt.md) |
| `event` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:1093](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L1093)

___

### eventPolygonChanged

▸ **eventPolygonChanged**(`polygonData`, `points`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md) |
| `points` | { `latitude`: `number` ; `longitude`: `number`  }[] |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:226](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L226)

___

### eventPolygonClick

▸ **eventPolygonClick**(`polygonData`, `latitude`, `longitude`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md) |
| `latitude` | `number` |
| `longitude` | `number` |
| `event` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:498](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L498)

___

### eventPolygonDoubleClick

▸ **eventPolygonDoubleClick**(`polygonData`, `latitude`, `longitude`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md) |
| `latitude` | `number` |
| `longitude` | `number` |
| `event` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:519](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L519)

___

### eventPolygonRightClick

▸ **eventPolygonRightClick**(`polygonData`, `latitude`, `longitude`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md) |
| `latitude` | `number` |
| `longitude` | `number` |
| `event` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:540](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L540)

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

[component/googleMap.ts:1049](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L1049)

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

[component/googleMap.ts:661](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L661)

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

[component/googleMap.ts:1206](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L1206)

___

### getCenterOfPolygon

▸ **getCenterOfPolygon**(`polygonData`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `latitude` | `number` |
| `longitude` | `number` |

#### Defined in

[component/googleMap.ts:646](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L646)

___

### getComputeArea

▸ **getComputeArea**(`polygonData`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygonData` | [`Objekt`](Objekt.md) |

#### Returns

`number`

#### Defined in

[component/googleMap.ts:696](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L696)

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

[component/googleMap.ts:1223](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L1223)

___

### getMapType

▸ **getMapType**(): `string`

#### Returns

`string`

#### Defined in

[component/googleMap.ts:137](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L137)

___

### getMarker

▸ **getMarker**(`id`): [`Objekt`](Objekt.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |

#### Returns

[`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:1014](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L1014)

___

### getPolygon

▸ **getPolygon**(`id`): [`Objekt`](Objekt.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |

#### Returns

[`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:342](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L342)

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

[component/googleMap.ts:1064](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L1064)

___

### removeAllMarker

▸ **removeAllMarker**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:1035](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L1035)

___

### removeAllPolygon

▸ **removeAllPolygon**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:363](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L363)

___

### removeHeatmap

▸ **removeHeatmap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:776](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L776)

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

[component/googleMap.ts:1021](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L1021)

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

[component/googleMap.ts:349](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L349)

___

### searchAddress

▸ **searchAddress**(`query`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[component/googleMap.ts:1154](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L1154)

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

[component/googleMap.ts:1189](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L1189)

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

[component/googleMap.ts:153](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L153)

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

[component/googleMap.ts:732](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L732)

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

[component/googleMap.ts:144](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L144)

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

[component/googleMap.ts:1122](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L1122)

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

[component/googleMap.ts:720](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L720)

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

[component/googleMap.ts:785](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L785)

___

### triggerResize

▸ **triggerResize**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:1216](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L1216)

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

[component/googleMap.ts:971](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L971)

___

### updatePolygon

▸ **updatePolygon**(`id`, `title`, `points`, `opt_polygonData?`, `opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |
| `title` | `string` |
| `points` | { `latitude`: `number` ; `longitude`: `number`  }[] |
| `opt_polygonData` | `Object` |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[component/googleMap.ts:301](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/googleMap.ts#L301)
