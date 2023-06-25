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

[component/googleMap.ts:96](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L96)

## Properties

### heatmap

• **heatmap**: `HeatmapLayer`

#### Defined in

[component/googleMap.ts:90](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L90)

___

### heatmapOptions

• **heatmapOptions**: [`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:89](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L89)

___

### map

• **map**: `Map`

#### Defined in

[component/googleMap.ts:80](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L80)

___

### mapKnot

• **mapKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/googleMap.ts:78](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L78)

___

### markerIcons

• **markerIcons**: `Object`

#### Index signature

▪ [key: `string`]: `MarkerIcon`

#### Defined in

[component/googleMap.ts:81](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L81)

___

### markerOptions

• **markerOptions**: [`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:88](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L88)

___

### markers

• **markers**: [`Collection`](Collection.md)<[`Objekt`](Objekt.md)\>

#### Defined in

[component/googleMap.ts:87](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L87)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:79](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L79)

___

### overlay

• **overlay**: `OverlayView`

#### Defined in

[component/googleMap.ts:84](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L84)

___

### polygonOptions

• **polygonOptions**: [`Objekt`](Objekt.md)

#### Defined in

[component/googleMap.ts:85](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L85)

___

### polygons

• **polygons**: [`Collection`](Collection.md)<[`Objekt`](Objekt.md)\>

#### Defined in

[component/googleMap.ts:86](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L86)

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

[component/googleMap.ts:575](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L575)

___

### \_bindEventsToMap

▸ `Private` **_bindEventsToMap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:191](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L191)

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

[component/googleMap.ts:916](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L916)

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

[component/googleMap.ts:377](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L377)

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

[component/googleMap.ts:435](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L435)

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

[component/googleMap.ts:469](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L469)

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

[component/googleMap.ts:999](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L999)

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

[component/googleMap.ts:327](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L327)

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

[component/googleMap.ts:590](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L590)

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

[component/googleMap.ts:675](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L675)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:165](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L165)

___

### \_initMap

▸ `Private` **_initMap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:178](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L178)

___

### \_initOverlay

▸ `Private` **_initOverlay**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:212](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L212)

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

[component/googleMap.ts:628](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L628)

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

[component/googleMap.ts:615](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L615)

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

[component/googleMap.ts:110](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L110)

___

### \_unbindEventsToMap

▸ `Private` **_unbindEventsToMap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:205](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L205)

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

[component/googleMap.ts:956](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L956)

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

[component/googleMap.ts:425](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L425)

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

[component/googleMap.ts:457](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L457)

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

[component/googleMap.ts:705](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L705)

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

[component/googleMap.ts:757](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L757)

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

[component/googleMap.ts:849](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L849)

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

[component/googleMap.ts:890](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L890)

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

[component/googleMap.ts:807](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L807)

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

[component/googleMap.ts:238](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L238)

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

[component/googleMap.ts:260](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L260)

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

[component/googleMap.ts:558](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L558)

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

[component/googleMap.ts:566](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L566)

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

[component/googleMap.ts:1101](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L1101)

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

[component/googleMap.ts:1075](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L1075)

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

[component/googleMap.ts:1083](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L1083)

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

[component/googleMap.ts:1091](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L1091)

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

[component/googleMap.ts:224](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L224)

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

[component/googleMap.ts:496](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L496)

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

[component/googleMap.ts:517](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L517)

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

[component/googleMap.ts:538](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L538)

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

[component/googleMap.ts:1047](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L1047)

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

[component/googleMap.ts:659](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L659)

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

[component/googleMap.ts:1204](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L1204)

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

[component/googleMap.ts:644](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L644)

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

[component/googleMap.ts:694](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L694)

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

[component/googleMap.ts:1221](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L1221)

___

### getMapType

▸ **getMapType**(): `string`

#### Returns

`string`

#### Defined in

[component/googleMap.ts:135](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L135)

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

[component/googleMap.ts:1012](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L1012)

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

[component/googleMap.ts:340](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L340)

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

[component/googleMap.ts:1062](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L1062)

___

### removeAllMarker

▸ **removeAllMarker**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:1033](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L1033)

___

### removeAllPolygon

▸ **removeAllPolygon**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:361](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L361)

___

### removeHeatmap

▸ **removeHeatmap**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:774](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L774)

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

[component/googleMap.ts:1019](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L1019)

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

[component/googleMap.ts:347](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L347)

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

[component/googleMap.ts:1152](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L1152)

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

[component/googleMap.ts:1187](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L1187)

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

[component/googleMap.ts:151](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L151)

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

[component/googleMap.ts:730](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L730)

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

[component/googleMap.ts:142](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L142)

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

[component/googleMap.ts:1120](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L1120)

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

[component/googleMap.ts:718](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L718)

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

[component/googleMap.ts:783](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L783)

___

### triggerResize

▸ **triggerResize**(): `void`

#### Returns

`void`

#### Defined in

[component/googleMap.ts:1214](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L1214)

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

[component/googleMap.ts:969](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L969)

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

[component/googleMap.ts:299](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/googleMap.ts#L299)
