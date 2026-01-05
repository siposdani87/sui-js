---
id: "Application"
title: "Class: Application"
sidebar_label: "Application"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Application**(`options`, `resources`): [`Application`](Application.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `object` |
| `resources` | [`Injection`](../#injection) |

#### Returns

[`Application`](Application.md)

#### Defined in

[component/application.ts:74](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/application.ts#L74)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)\<`object`\>

#### Defined in

[component/application.ts:35](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/application.ts#L35)

## Methods

### controller

▸ **controller**(`name`, `moduleInjections`, `moduleCallback`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `moduleInjections` | `string`[] |
| `moduleCallback` | [`ClassRef`](../#classref) |

#### Returns

`string`

#### Defined in

[component/application.ts:496](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/application.ts#L496)

___

### getController

▸ **getController**(): `object`

#### Returns

`object`

#### Defined in

[component/application.ts:476](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/application.ts#L476)

___

### getInstance

▸ **getInstance**(`name`): `object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | keyof [`Instance`](../#instance) |

#### Returns

`object`

#### Defined in

[component/application.ts:472](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/application.ts#L472)

___

### getLanguage

▸ **getLanguage**(): `string`

#### Returns

`string`

#### Defined in

[component/application.ts:129](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/application.ts#L129)

___

### getLocale

▸ **getLocale**(): `string`

#### Returns

`string`

#### Defined in

[component/application.ts:134](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/application.ts#L134)

___

### run

▸ **run**(`routes`, `services`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `routes` | [`Route`](Route.md)[] |
| `services` | `string`[] |

#### Returns

`void`

#### Defined in

[component/application.ts:480](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/application.ts#L480)

___

### service

▸ **service**(`name`, `moduleInjections`, `moduleCallback`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `moduleInjections` | `string`[] |
| `moduleCallback` | [`ClassRef`](../#classref) |

#### Returns

`string`

#### Defined in

[component/application.ts:504](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/application.ts#L504)

___

### setLocale

▸ **setLocale**(`locale`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `locale` | `string` |

#### Returns

`void`

#### Defined in

[component/application.ts:142](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/application.ts#L142)

___

### setLocaleWithReload

▸ **setLocaleWithReload**(`locale`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `locale` | `string` |

#### Returns

`void`

#### Defined in

[component/application.ts:147](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/application.ts#L147)

___

### setRootState

▸ **setRootState**(`id`, `opt_params?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `opt_params?` | `object` |

#### Returns

`void`

#### Defined in

[component/application.ts:467](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/application.ts#L467)
