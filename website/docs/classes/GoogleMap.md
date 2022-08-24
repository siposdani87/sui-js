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
| `dom` | [`Item`](Item.md)<`HTMLElement`\> | `undefined` |
| `opt_selector` | `string` | `'.map'` |
| `opt_options` | `Object` | `{}` |

#### Defined in

[component/googleMap.ts:112](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L112)

## Properties

### heatmap

• **heatmap**: `HeatmapLayer`

#### Defined in

[component/googleMap.ts:106](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L106)

___

### heatmapOptions

• **heatmapOptions**: [`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:105](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L105)

___

### map

• **map**: `Map`

#### Defined in

[component/googleMap.ts:96](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L96)

___

### mapNode

• **mapNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/googleMap.ts:94](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L94)

___

### markerIcons

• **markerIcons**: `Object`

#### Index signature

▪ [key: `string`]: `MarkerIcon`

#### Defined in

[component/googleMap.ts:97](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L97)

___

### markerOptions

• **markerOptions**: [`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:104](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L104)

___

### markers

• **markers**: [`Collection`](Collection.md)<[`Objekt`](Objekt.md)\>

#### Defined in

[component/googleMap.ts:103](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L103)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:95](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L95)

___

### overlay

• **overlay**: `OverlayView`

#### Defined in

[component/googleMap.ts:100](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L100)

___

### polygonOptions

• **polygonOptions**: [`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:101](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L101)

___

### polygons

• **polygons**: [`Collection`](Collection.md)<[`Objekt`](Objekt.md)\>

#### Defined in

[component/googleMap.ts:102](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L102)

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

[component/googleMap.ts:593](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L593)

___

### \_bindEventsToMap

▸ `Private` **_bindEventsToMap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:209](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L209)

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

[component/googleMap.ts:934](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L934)

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

[component/googleMap.ts:395](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L395)

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

[component/googleMap.ts:453](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L453)

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

[component/googleMap.ts:487](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L487)

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

[component/googleMap.ts:1017](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L1017)

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

[component/googleMap.ts:345](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L345)

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

[component/googleMap.ts:608](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L608)

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

[component/googleMap.ts:693](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L693)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:183](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L183)

___

### \_initMap

▸ `Private` **_initMap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:196](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L196)

___

### \_initOverlay

▸ `Private` **_initOverlay**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:230](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L230)

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

[component/googleMap.ts:646](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L646)

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

[component/googleMap.ts:633](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L633)

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

[component/googleMap.ts:126](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L126)

___

### \_unbindEventsToMap

▸ `Private` **_unbindEventsToMap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:223](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L223)

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

[component/googleMap.ts:974](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L974)

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

[component/googleMap.ts:443](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L443)

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

[component/googleMap.ts:475](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L475)

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

[component/googleMap.ts:723](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L723)

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

[component/googleMap.ts:775](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L775)

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

[component/googleMap.ts:867](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L867)

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

[component/googleMap.ts:908](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L908)

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

[component/googleMap.ts:825](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L825)

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

[component/googleMap.ts:256](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L256)

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

[component/googleMap.ts:278](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L278)

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

[component/googleMap.ts:576](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L576)

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

[component/googleMap.ts:584](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L584)

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

[component/googleMap.ts:1119](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L1119)

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

[component/googleMap.ts:1093](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L1093)

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

[component/googleMap.ts:1101](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L1101)

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

[component/googleMap.ts:1109](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L1109)

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

[component/googleMap.ts:242](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L242)

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

[component/googleMap.ts:514](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L514)

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

[component/googleMap.ts:535](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L535)

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

[component/googleMap.ts:556](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L556)

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

[component/googleMap.ts:1065](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L1065)

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

[component/googleMap.ts:677](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L677)

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

[component/googleMap.ts:1222](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L1222)

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

[component/googleMap.ts:662](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L662)

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

[component/googleMap.ts:712](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L712)

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

[component/googleMap.ts:1239](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L1239)

___

### getMapType

▸ **getMapType**(): `string`

#### Returns

`string`

#### Defined in

[component/googleMap.ts:153](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L153)

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

[component/googleMap.ts:1030](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L1030)

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

[component/googleMap.ts:358](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L358)

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

[component/googleMap.ts:1080](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L1080)

___

### removeAllMarker

▸ **removeAllMarker**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:1051](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L1051)

___

### removeAllPolygon

▸ **removeAllPolygon**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:379](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L379)

___

### removeHeatmap

▸ **removeHeatmap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:792](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L792)

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

[component/googleMap.ts:1037](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L1037)

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

[component/googleMap.ts:365](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L365)

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

[component/googleMap.ts:1170](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L1170)

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

[component/googleMap.ts:1205](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L1205)

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

[component/googleMap.ts:169](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L169)

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

[component/googleMap.ts:748](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L748)

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

[component/googleMap.ts:160](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L160)

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

[component/googleMap.ts:1138](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L1138)

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

[component/googleMap.ts:736](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L736)

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

[component/googleMap.ts:801](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L801)

___

### triggerResize

▸ **triggerResize**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:1232](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L1232)

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

[component/googleMap.ts:987](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L987)

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

[component/googleMap.ts:317](https://github.com/siposdani87/sui-js/blob/78d3494/src/component/googleMap.ts#L317)
