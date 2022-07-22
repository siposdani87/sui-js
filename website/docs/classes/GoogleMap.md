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

[component/googleMap.ts:112](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-112)

## Properties

### heatmap

• **heatmap**: `HeatmapLayer`

#### Defined in

[component/googleMap.ts:106](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-106)

___

### heatmapOptions

• **heatmapOptions**: [`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:105](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-105)

___

### map

• **map**: `Map`

#### Defined in

[component/googleMap.ts:96](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-96)

___

### mapNode

• **mapNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/googleMap.ts:94](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-94)

___

### markerIcons

• **markerIcons**: `Object`

#### Index signature

▪ [key: `string`]: `MarkerIcon`

#### Defined in

[component/googleMap.ts:97](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-97)

___

### markerOptions

• **markerOptions**: [`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:104](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-104)

___

### markers

• **markers**: [`Collection`](Collection.md)<[`Objekt`](Objekt.md)\>

#### Defined in

[component/googleMap.ts:103](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-103)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:95](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-95)

___

### overlay

• **overlay**: `OverlayView`

#### Defined in

[component/googleMap.ts:100](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-100)

___

### polygonOptions

• **polygonOptions**: [`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:101](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-101)

___

### polygons

• **polygons**: [`Collection`](Collection.md)<[`Objekt`](Objekt.md)\>

#### Defined in

[component/googleMap.ts:102](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-102)

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

[component/googleMap.ts:593](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-593)

___

### \_bindEventsToMap

▸ `Private` **_bindEventsToMap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:209](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-209)

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

[component/googleMap.ts:934](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-934)

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

[component/googleMap.ts:395](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-395)

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

[component/googleMap.ts:453](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-453)

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

[component/googleMap.ts:487](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-487)

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

[component/googleMap.ts:1017](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-1017)

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

[component/googleMap.ts:345](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-345)

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

[component/googleMap.ts:608](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-608)

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

[component/googleMap.ts:693](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-693)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:183](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-183)

___

### \_initMap

▸ `Private` **_initMap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:196](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-196)

___

### \_initOverlay

▸ `Private` **_initOverlay**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:230](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-230)

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

[component/googleMap.ts:646](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-646)

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

[component/googleMap.ts:633](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-633)

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

[component/googleMap.ts:126](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-126)

___

### \_unbindEventsToMap

▸ `Private` **_unbindEventsToMap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:223](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-223)

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

[component/googleMap.ts:974](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-974)

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

[component/googleMap.ts:443](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-443)

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

[component/googleMap.ts:475](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-475)

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

[component/googleMap.ts:723](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-723)

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

[component/googleMap.ts:775](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-775)

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

[component/googleMap.ts:867](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-867)

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

[component/googleMap.ts:908](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-908)

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

[component/googleMap.ts:825](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-825)

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

[component/googleMap.ts:256](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-256)

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

[component/googleMap.ts:278](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-278)

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

[component/googleMap.ts:576](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-576)

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

[component/googleMap.ts:584](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-584)

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

[component/googleMap.ts:1119](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-1119)

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

[component/googleMap.ts:1093](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-1093)

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

[component/googleMap.ts:1101](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-1101)

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

[component/googleMap.ts:1109](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-1109)

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

[component/googleMap.ts:242](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-242)

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

[component/googleMap.ts:514](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-514)

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

[component/googleMap.ts:535](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-535)

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

[component/googleMap.ts:556](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-556)

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

[component/googleMap.ts:1065](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-1065)

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

[component/googleMap.ts:677](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-677)

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

[component/googleMap.ts:1222](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-1222)

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

[component/googleMap.ts:662](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-662)

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

[component/googleMap.ts:712](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-712)

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

[component/googleMap.ts:1239](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-1239)

___

### getMapType

▸ **getMapType**(): `string`

#### Returns

`string`

#### Defined in

[component/googleMap.ts:153](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-153)

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

[component/googleMap.ts:1030](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-1030)

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

[component/googleMap.ts:358](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-358)

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

[component/googleMap.ts:1080](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-1080)

___

### removeAllMarker

▸ **removeAllMarker**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:1051](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-1051)

___

### removeAllPolygon

▸ **removeAllPolygon**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:379](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-379)

___

### removeHeatmap

▸ **removeHeatmap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:792](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-792)

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

[component/googleMap.ts:1037](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-1037)

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

[component/googleMap.ts:365](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-365)

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

[component/googleMap.ts:1170](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-1170)

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

[component/googleMap.ts:1205](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-1205)

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

[component/googleMap.ts:169](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-169)

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

[component/googleMap.ts:748](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-748)

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

[component/googleMap.ts:160](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-160)

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

[component/googleMap.ts:1138](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-1138)

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

[component/googleMap.ts:736](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-736)

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

[component/googleMap.ts:801](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-801)

___

### triggerResize

▸ **triggerResize**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:1232](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-1232)

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

[component/googleMap.ts:987](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-987)

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

[component/googleMap.ts:317](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/googleMap.ts#lines-317)
