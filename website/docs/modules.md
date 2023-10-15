---
id: "modules"
title: "@siposdani87/sui-js"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [Application](classes/Application.md)
- [Async](classes/Async.md)
- [AutoCompleteField](classes/AutoCompleteField.md)
- [BaseCheckboxField](classes/BaseCheckboxField.md)
- [BaseField](classes/BaseField.md)
- [BaseModal](classes/BaseModal.md)
- [BottomMenu](classes/BottomMenu.md)
- [Browser](classes/Browser.md)
- [Button](classes/Button.md)
- [Calendar](classes/Calendar.md)
- [Canvas](classes/Canvas.md)
- [CardCollection](classes/CardCollection.md)
- [Carousel](classes/Carousel.md)
- [CheckboxField](classes/CheckboxField.md)
- [Clock](classes/Clock.md)
- [Collection](classes/Collection.md)
- [ColorField](classes/ColorField.md)
- [Confirm](classes/Confirm.md)
- [ContentHandler](classes/ContentHandler.md)
- [Controller](classes/Controller.md)
- [Cookie](classes/Cookie.md)
- [DateTime](classes/DateTime.md)
- [DateTimeField](classes/DateTimeField.md)
- [DateTimeRangeField](classes/DateTimeRangeField.md)
- [Day](classes/Day.md)
- [Deferred](classes/Deferred.md)
- [Depot](classes/Depot.md)
- [Dialog](classes/Dialog.md)
- [Dropdown](classes/Dropdown.md)
- [EventBus](classes/EventBus.md)
- [FileField](classes/FileField.md)
- [Flash](classes/Flash.md)
- [Footer](classes/Footer.md)
- [Form](classes/Form.md)
- [GeoLocation](classes/GeoLocation.md)
- [GoogleMap](classes/GoogleMap.md)
- [Header](classes/Header.md)
- [Helper](classes/Helper.md)
- [HiddenField](classes/HiddenField.md)
- [Http](classes/Http.md)
- [IconToggleField](classes/IconToggleField.md)
- [Knot](classes/Knot.md)
- [LeftMenu](classes/LeftMenu.md)
- [Loader](classes/Loader.md)
- [LocationField](classes/LocationField.md)
- [Module](classes/Module.md)
- [Month](classes/Month.md)
- [NavBar](classes/NavBar.md)
- [Navigation](classes/Navigation.md)
- [NumberField](classes/NumberField.md)
- [Objekt](classes/Objekt.md)
- [Page](classes/Page.md)
- [Pager](classes/Pager.md)
- [Popup](classes/Popup.md)
- [PopupContainer](classes/PopupContainer.md)
- [ProgressBar](classes/ProgressBar.md)
- [ProgressStatus](classes/ProgressStatus.md)
- [Promize](classes/Promize.md)
- [Query](classes/Query.md)
- [RadiobuttonField](classes/RadiobuttonField.md)
- [RangeField](classes/RangeField.md)
- [ResetButton](classes/ResetButton.md)
- [Route](classes/Route.md)
- [Router](classes/Router.md)
- [Scheduler](classes/Scheduler.md)
- [Screen](classes/Screen.md)
- [Script](classes/Script.md)
- [SearchField](classes/SearchField.md)
- [SelectField](classes/SelectField.md)
- [Service](classes/Service.md)
- [State](classes/State.md)
- [Style](classes/Style.md)
- [SubmitButton](classes/SubmitButton.md)
- [SwitchField](classes/SwitchField.md)
- [TabPanel](classes/TabPanel.md)
- [Table](classes/Table.md)
- [Template](classes/Template.md)
- [TextField](classes/TextField.md)
- [TextareaField](classes/TextareaField.md)
- [Time](classes/Time.md)
- [Tooltip](classes/Tooltip.md)
- [TopMenu](classes/TopMenu.md)
- [UrlField](classes/UrlField.md)
- [Viewer](classes/Viewer.md)
- [Waiter](classes/Waiter.md)
- [Xhr](classes/Xhr.md)
- [Year](classes/Year.md)

## Type Aliases

### Action

Ƭ **Action**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `click` | (`item`: [`Objekt`](classes/Objekt.md)) => `void` |
| `style` | (`item`: [`Objekt`](classes/Objekt.md)) => [`string`, string?, boolean?, boolean?] |

#### Defined in

[utils/types.ts:40](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/types.ts#L40)

___

### ClassRef

Ƭ **ClassRef**: (...`args`: `any`[]) => `any`

#### Type declaration

• **new ClassRef**(`...args`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`any`

#### Defined in

[utils/types.ts:94](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/types.ts#L94)

___

### Dependency

Ƭ **Dependency**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `moduleCallback` | [`ClassRef`](modules.md#classref) |
| `moduleInjections` | `string`[] |

#### Defined in

[utils/types.ts:96](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/types.ts#L96)

___

### IconOptions

Ƭ **IconOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `anchor` | [`number`, `number`] |
| `coords` | `number`[] |
| `origin` | [`number`, `number`] |
| `size` | [`number`, `number`] |
| `url` | `string` |

#### Defined in

[utils/types.ts:45](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/types.ts#L45)

___

### Id

Ƭ **Id**: `string` \| `number`

#### Defined in

[utils/types.ts:38](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/types.ts#L38)

___

### Injection

Ƭ **Injection**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[utils/types.ts:53](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/types.ts#L53)

___

### Instance

Ƭ **Instance**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `app` | [`Application`](classes/Application.md) |
| `bottomMenu` | [`BottomMenu`](classes/BottomMenu.md) |
| `browser` | [`Browser`](classes/Browser.md) |
| `config` | [`Objekt`](classes/Objekt.md) |
| `confirm` | [`Confirm`](classes/Confirm.md) |
| `console` | `Console` |
| `cookie` | [`Cookie`](classes/Cookie.md) |
| `dialog` | [`Dialog`](classes/Dialog.md) |
| `dom` | [`Knot`](classes/Knot.md) |
| `eventBus` | [`EventBus`](classes/EventBus.md) |
| `flash` | [`Flash`](classes/Flash.md) |
| `footer` | [`Footer`](classes/Footer.md) |
| `geoLocation` | [`GeoLocation`](classes/GeoLocation.md) |
| `header` | [`Header`](classes/Header.md) |
| `helper` | [`Helper`](classes/Helper.md) |
| `http` | [`Http`](classes/Http.md) |
| `instances` | [`Instance`](modules.md#instance) |
| `leftMenu` | [`LeftMenu`](classes/LeftMenu.md) |
| `loader` | [`Loader`](classes/Loader.md) |
| `localDepot` | [`Depot`](classes/Depot.md) |
| `navBar` | [`NavBar`](classes/NavBar.md) |
| `page` | [`Page`](classes/Page.md) |
| `progressBar` | [`ProgressBar`](classes/ProgressBar.md) |
| `scheduler` | [`Scheduler`](classes/Scheduler.md) |
| `screen` | [`Screen`](classes/Screen.md) |
| `script` | [`Script`](classes/Script.md) |
| `sessionDepot` | [`Depot`](classes/Depot.md) |
| `state` | [`State`](classes/State.md) |
| `style` | [`Style`](classes/Style.md) |
| `template` | [`Template`](classes/Template.md) |
| `topMenu` | [`TopMenu`](classes/TopMenu.md) |
| `viewer` | [`Viewer`](classes/Viewer.md) |

#### Defined in

[utils/types.ts:59](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/types.ts#L59)

___

### InstanceKey

Ƭ **InstanceKey**: keyof [`Instance`](modules.md#instance)

#### Defined in

[utils/types.ts:57](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/types.ts#L57)

___

### LatLng

Ƭ **LatLng**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `latitude` | `number` |
| `longitude` | `number` |

#### Defined in

[component/googleMap.ts:22](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/googleMap.ts#L22)

___

### Listener

Ƭ **Listener**: (`this`: `Element`, `ev`: `Event`) => `any`

#### Type declaration

▸ (`this`, `ev`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Element` |
| `ev` | `Event` |

##### Returns

`any`

#### Defined in

[utils/types.ts:32](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/types.ts#L32)

___

### Params

Ƭ **Params**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[utils/types.ts:34](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/types.ts#L34)

___

### TableCalculation

Ƭ **TableCalculation**<`T`\>: { [key in string]: Function }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`Objekt`](classes/Objekt.md) |

#### Defined in

[component/table.ts:24](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L24)

___

### WeightLatLng

Ƭ **WeightLatLng**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `latitude` | `number` |
| `longitude` | `number` |
| `weight?` | `number` |

#### Defined in

[component/googleMap.ts:16](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/googleMap.ts#L16)

## Variables

### DateIO

• `Const` **DateIO**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addDays` | (`date`: `Date`, `amount`: `number`) => `Date` |
| `addHours` | (`date`: `Date`, `amount`: `number`) => `Date` |
| `addMinutes` | (`date`: `Date`, `amount`: `number`) => `Date` |
| `addMonths` | (`date`: `Date`, `amount`: `number`) => `Date` |
| `addYears` | (`date`: `Date`, `amount`: `number`) => `Date` |
| `endOfMonth` | (`date`: `Date`) => `Date` |
| `format` | (`date`: `Date`, `formatString?`: `string`) => `string` |
| `getDate` | (`date`: `Date`) => `number` |
| `getDay` | (`date`: `Date`) => `number` |
| `getDaysInMonth` | (`date`: `Date`) => `number` |
| `getHours` | (`date`: `Date`) => `number` |
| `getISOWeek` | (`date`: `Date`) => `number` |
| `getMinutes` | (`date`: `Date`) => `number` |
| `getMonth` | (`date`: `Date`) => `number` |
| `getWeek` | (`date`: `Date`) => `number` |
| `getYear` | (`date`: `Date`) => `number` |
| `isAfter` | (`date`: `Date`, `dateToCompare`: `Date`) => `boolean` |
| `isBefore` | (`date`: `Date`, `dateToCompare`: `Date`) => `boolean` |
| `parse` | (`dateString`: `string`, `formatString?`: `string`) => `Date` |
| `setDate` | (`date`: `Date`, `day`: `number`) => `Date` |
| `setHours` | (`date`: `Date`, `hours`: `number`) => `Date` |
| `setMinutes` | (`date`: `Date`, `minutes`: `number`) => `Date` |
| `setMonth` | (`date`: `Date`, `month`: `number`) => `Date` |
| `setYear` | (`date`: `Date`, `years`: `number`) => `Date` |
| `startOfWeek` | (`date`: `Date`) => `Date` |
| `subDays` | (`date`: `Date`, `amount`: `number`) => `Date` |
| `subHours` | (`date`: `Date`, `amount`: `number`) => `Date` |
| `subMinutes` | (`date`: `Date`, `amount`: `number`) => `Date` |
| `subMonths` | (`date`: `Date`, `amount`: `number`) => `Date` |
| `subYears` | (`date`: `Date`, `amount`: `number`) => `Date` |

#### Defined in

[utils/dateio.ts:59](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/dateio.ts#L59)

___

### coreResources

• `Const` **coreResources**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `app` | `string` |
| `bottomMenu` | `string` |
| `browser` | `string` |
| `config` | `string` |
| `confirm` | `string` |
| `console` | `string` |
| `cookie` | `string` |
| `dialog` | `string` |
| `dom` | `string` |
| `eventBus` | `string` |
| `flash` | `string` |
| `footer` | `string` |
| `geoLocation` | `string` |
| `header` | `string` |
| `helper` | `string` |
| `http` | `string` |
| `instances` | `string` |
| `leftMenu` | `string` |
| `loader` | `string` |
| `localDepot` | `string` |
| `navBar` | `string` |
| `page` | `string` |
| `progressBar` | `string` |
| `scheduler` | `string` |
| `screen` | `string` |
| `script` | `string` |
| `sessionDepot` | `string` |
| `state` | `string` |
| `style` | `string` |
| `template` | `string` |
| `topMenu` | `string` |
| `viewer` | `string` |

#### Defined in

[common/config.ts:7](https://github.com/siposdani87/sui-js/blob/ad456a5/src/common/config.ts#L7)

___

### releaseMode

• **releaseMode**: `boolean` = `true`

#### Defined in

[common/config.ts:1](https://github.com/siposdani87/sui-js/blob/ad456a5/src/common/config.ts#L1)

## Functions

### FormField

▸ **FormField**(`inputBlock`, `form`): [`BaseField`](classes/BaseField.md)<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputBlock` | [`Knot`](classes/Knot.md)<`HTMLElement` \| `HTMLInputElement`\> |
| `form` | [`Form`](classes/Form.md) |

#### Returns

[`BaseField`](classes/BaseField.md)<`HTMLInputElement`\>

#### Defined in

[component/formField.ts:27](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/formField.ts#L27)

___

### capitalize

▸ **capitalize**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[utils/operation.ts:284](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L284)

___

### ceil

▸ **ceil**(`value`, `exp`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `exp` | `number` |

#### Returns

`number`

#### Defined in

[utils/math.ts:84](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/math.ts#L84)

___

### clear

▸ **clear**<`T`\>(`items`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `Object` \| `T`[] |

#### Returns

`void`

#### Defined in

[utils/operation.ts:167](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L167)

___

### clearArray

▸ **clearArray**<`T`\>(`items`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `T`[] |

#### Returns

`void`

#### Defined in

[utils/operation.ts:175](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L175)

___

### clearObject

▸ **clearObject**(`items`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `Object` |

#### Returns

`void`

#### Defined in

[utils/operation.ts:179](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L179)

___

### colorContrast

▸ **colorContrast**(`hexColor`, `opt_diff?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `hexColor` | `string` | `undefined` |
| `opt_diff` | `number` | `0.5` |

#### Returns

`string`

#### Defined in

[utils/color.ts:141](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/color.ts#L141)

___

### colorContrastYIQ

▸ **colorContrastYIQ**(`hexColor`, `opt_lightColor?`, `opt_darkColor?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `hexColor` | `string` | `undefined` |
| `opt_lightColor` | `string` | `'#FEFEFE'` |
| `opt_darkColor` | `string` | `'#252525'` |

#### Returns

`string`

#### Defined in

[utils/color.ts:131](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/color.ts#L131)

___

### consoleAssert

▸ **consoleAssert**(`condition`, `...data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | `boolean` |
| `...data` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/log.ts:29](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/log.ts#L29)

___

### consoleDebug

▸ **consoleDebug**(`...message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...message` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/log.ts:25](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/log.ts#L25)

___

### consoleError

▸ **consoleError**(`...message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...message` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/log.ts:21](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/log.ts#L21)

___

### consoleInfo

▸ **consoleInfo**(`...message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...message` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/log.ts:9](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/log.ts#L9)

___

### consoleLog

▸ **consoleLog**(`...message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...message` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/log.ts:3](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/log.ts#L3)

___

### consoleWarn

▸ **consoleWarn**(`...message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...message` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/log.ts:15](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/log.ts#L15)

___

### contain

▸ **contain**(`str`, `subStr`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `subStr` | `string` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:190](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L190)

___

### convertHEXToHSV

▸ **convertHEXToHSV**(`hexColor`): [h: number, s: number, v: number]

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexColor` | `string` |

#### Returns

[h: number, s: number, v: number]

#### Defined in

[utils/color.ts:55](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/color.ts#L55)

___

### convertHEXToRGB

▸ **convertHEXToRGB**(`hexColor`): [r: number, g: number, b: number]

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexColor` | `string` |

#### Returns

[r: number, g: number, b: number]

#### Defined in

[utils/color.ts:62](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/color.ts#L62)

___

### convertHSVToHEX

▸ **convertHSVToHEX**(`h`, `s`, `v`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `h` | `number` |
| `s` | `number` |
| `v` | `number` |

#### Returns

`string`

#### Defined in

[utils/color.ts:126](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/color.ts#L126)

___

### convertHSVToRGB

▸ **convertHSVToRGB**(`h`, `s`, `v`): [r: number, g: number, b: number]

#### Parameters

| Name | Type |
| :------ | :------ |
| `h` | `number` |
| `s` | `number` |
| `v` | `number` |

#### Returns

[r: number, g: number, b: number]

#### Defined in

[utils/color.ts:72](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/color.ts#L72)

___

### convertRGBToHEX

▸ **convertRGBToHEX**(`red`, `green`, `blue`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `red` | `number` |
| `green` | `number` |
| `blue` | `number` |

#### Returns

`string`

#### Defined in

[utils/color.ts:38](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/color.ts#L38)

___

### convertRGBToHSV

▸ **convertRGBToHSV**(`red`, `green`, `blue`): [`number`, `number`, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `red` | `number` |
| `green` | `number` |
| `blue` | `number` |

#### Returns

[`number`, `number`, `number`]

#### Defined in

[utils/color.ts:3](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/color.ts#L3)

___

### convertToISOFormat

▸ **convertToISOFormat**(`formatString`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `formatString` | `string` |

#### Returns

`string`

#### Defined in

[utils/dateio.ts:55](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/dateio.ts#L55)

___

### copy

▸ **copy**<`T`\>(`items`): `Object` \| `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `Object` \| `T`[] |

#### Returns

`Object` \| `T`[]

#### Defined in

[utils/operation.ts:223](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L223)

___

### copyArray

▸ **copyArray**<`T`\>(`items`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `T`[] |

#### Returns

`T`[]

#### Defined in

[utils/operation.ts:235](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L235)

___

### copyObject

▸ **copyObject**(`item`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `Object` |

#### Returns

`Object`

#### Defined in

[utils/operation.ts:249](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L249)

___

### copyToClipboard

▸ **copyToClipboard**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Defined in

[utils/operation.ts:417](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L417)

___

### debounce

▸ **debounce**(`func`, `opt_wait?`, `opt_immediate?`): (`this`: `Window`, `ev`: `Event`) => `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `func` | (`ev`: `Event`) => `void` | `undefined` |
| `opt_wait` | `number` | `250` |
| `opt_immediate` | `boolean` | `false` |

#### Returns

`fn`

▸ (`this`, `ev`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Window` |
| `ev` | `Event` |

##### Returns

`void`

#### Defined in

[utils/operation.ts:366](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L366)

___

### decodeBase64

▸ **decodeBase64**(`encodedText`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `encodedText` | `string` |

#### Returns

`string`

#### Defined in

[utils/coder.ts:11](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/coder.ts#L11)

___

### decrypt

▸ **decrypt**(`item`, `passPhrase`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `string` |
| `passPhrase` | `string` |

#### Returns

`any`

#### Defined in

[utils/coder.ts:21](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/coder.ts#L21)

___

### each

▸ **each**<`T`\>(`items`, `next`, `opt_start?`, `opt_end?`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `Object` \| `T`[] |
| `next` | (`item`: `any`, `key`: `string` \| `number`) => `void` |
| `opt_start?` | `number` |
| `opt_end?` | `number` |

#### Returns

`void`

#### Defined in

[utils/operation.ts:114](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L114)

___

### eachArray

▸ **eachArray**<`T`\>(`items`, `next`, `opt_start?`, `opt_end?`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `T`[] |
| `next` | (`item`: `T`, `index`: `number`) => `void` |
| `opt_start?` | `number` |
| `opt_end?` | `number` |

#### Returns

`void`

#### Defined in

[utils/operation.ts:127](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L127)

___

### eachObject

▸ **eachObject**(`object`, `next`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` |
| `next` | (`value`: `any`, `key`: `string`) => `void` |

#### Returns

`void`

#### Defined in

[utils/operation.ts:140](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L140)

___

### encodeBase64

▸ **encodeBase64**(`text`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`string`

#### Defined in

[utils/coder.ts:6](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/coder.ts#L6)

___

### encrypt

▸ **encrypt**(`value`, `passPhrase`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `passPhrase` | `string` |

#### Returns

`string`

#### Defined in

[utils/coder.ts:16](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/coder.ts#L16)

___

### eq

▸ **eq**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `unknown` |
| `b` | `unknown` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:59](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L59)

___

### floor

▸ **floor**(`value`, `exp`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `exp` | `number` |

#### Returns

`number`

#### Defined in

[utils/math.ts:81](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/math.ts#L81)

___

### format

▸ **format**<`T`\>(`str`, `opt_params?`, `opt_prefix?`, `opt_postfix?`): `string`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `str` | `string` | `undefined` |
| `opt_params` | `Object` \| `T`[] | `null` |
| `opt_prefix` | `string` | `'\\{'` |
| `opt_postfix` | `string` | `'\\}'` |

#### Returns

`string`

#### Defined in

[utils/operation.ts:40](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L40)

___

### generateId

▸ **generateId**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[utils/coder.ts:32](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/coder.ts#L32)

___

### getExtensionName

▸ **getExtensionName**(`url`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`string`

#### Defined in

[utils/operation.ts:407](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L407)

___

### getQueryString

▸ **getQueryString**(`opt_params?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_params?` | `Object` |

#### Returns

`string`

#### Defined in

[utils/operation.ts:393](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L393)

___

### gt

▸ **gt**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `unknown` |
| `b` | `unknown` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:63](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L63)

___

### gte

▸ **gte**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `unknown` |
| `b` | `unknown` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:65](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L65)

___

### guid

▸ **guid**(): `string`

#### Returns

`string`

#### Defined in

[utils/coder.ts:28](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/coder.ts#L28)

___

### inArray

▸ **inArray**<`T`\>(`items`, `item`): `boolean`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `T`[] |
| `item` | `T` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:187](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L187)

___

### inContainArray

▸ **inContainArray**(`items`, `item`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `string`[] |
| `item` | `string` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:193](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L193)

___

### instanceOf

▸ **instanceOf**<`T`\>(`value`, `obj`): `boolean`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `obj` | `T` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:111](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L111)

___

### is

▸ **is**(`value`, `type`): value is string

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `type` | `string` |

#### Returns

value is string

#### Defined in

[utils/operation.ts:108](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L108)

___

### isArray

▸ **isArray**<`T`\>(`value`): value is T[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is T[]

#### Defined in

[utils/operation.ts:71](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L71)

___

### isDate

▸ **isDate**(`value`): value is Date

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is Date

#### Defined in

[utils/operation.ts:98](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L98)

___

### isEmpty

▸ **isEmpty**<`T`\>(`items`): `boolean`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `Object` \| `T`[] |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:263](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L263)

___

### isFloat

▸ **isFloat**(`value`): value is number

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is number

#### Defined in

[utils/operation.ts:87](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L87)

___

### isFunction

▸ **isFunction**(`value`): value is Function

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is Function

#### Defined in

[utils/operation.ts:74](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L74)

___

### isInfinity

▸ **isInfinity**(`value`): value is number

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is number

#### Defined in

[utils/operation.ts:102](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L102)

___

### isInteger

▸ **isInteger**(`value`): value is number

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is number

#### Defined in

[utils/operation.ts:90](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L90)

___

### isNull

▸ **isNull**(`value`): value is null

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is null

#### Defined in

[utils/operation.ts:100](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L100)

___

### isNumber

▸ **isNumber**(`value`): value is number

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is number

#### Defined in

[utils/operation.ts:79](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L79)

___

### isObject

▸ **isObject**(`value`): value is Object

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is Object

#### Defined in

[utils/operation.ts:93](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L93)

___

### isPureObject

▸ **isPureObject**(`value`): value is Object

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is Object

#### Defined in

[utils/operation.ts:95](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L95)

___

### isSame

▸ **isSame**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |
| `b` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:201](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L201)

___

### isString

▸ **isString**(`value`): value is string

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is string

#### Defined in

[utils/operation.ts:77](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L77)

___

### isUndefined

▸ **isUndefined**(`value`): value is undefined

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is undefined

#### Defined in

[utils/operation.ts:105](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L105)

___

### list

▸ **list**<`T`\>(`args`, `callback`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `T`[] |
| `callback` | (...`rest`: `T`[]) => `void` |

#### Returns

`void`

#### Defined in

[utils/operation.ts:277](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L277)

___

### lt

▸ **lt**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `unknown` |
| `b` | `unknown` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:67](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L67)

___

### lte

▸ **lte**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `unknown` |
| `b` | `unknown` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:69](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L69)

___

### md5

▸ **md5**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[utils/coder.ts:26](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/coder.ts#L26)

___

### mdl

▸ **mdl**(`opt_node?`, `opt_forceDowngrade?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_node?` | `HTMLElement` \| [`Knot`](classes/Knot.md)<`HTMLElement`\> | `undefined` |
| `opt_forceDowngrade` | `boolean` | `true` |

#### Returns

`void`

#### Defined in

[utils/render.ts:5](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/render.ts#L5)

___

### merge

▸ **merge**(`objA`, `objB`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objA` | `Object` |
| `objB` | `Object` |

#### Returns

`Object`

#### Defined in

[utils/operation.ts:26](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L26)

___

### neq

▸ **neq**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `unknown` |
| `b` | `unknown` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:61](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L61)

___

### noop

▸ **noop**<`T`\>(`opt_result?`): () => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_result?` | `T` |

#### Returns

`fn`

▸ (): `T`

##### Returns

`T`

#### Defined in

[utils/operation.ts:54](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L54)

___

### normalize

▸ **normalize**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[utils/operation.ts:414](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L414)

___

### parseInputBlock

▸ **parseInputBlock**(`inputBlock`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputBlock` | [`Knot`](classes/Knot.md)<`HTMLElement` \| `HTMLInputElement`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `error` | [`Knot`](classes/Knot.md)<`HTMLElement`\> |
| `input` | [`Knot`](classes/Knot.md)<`HTMLInputElement`\> |
| `label` | [`Knot`](classes/Knot.md)<`HTMLElement`\> |

#### Defined in

[component/formField.ts:36](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/formField.ts#L36)

___

### pluck

▸ **pluck**<`T`, `K`\>(`items`, `attribute`): `T`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends [`Objekt`](classes/Objekt.md)<`Object`, `K`\> = [`Objekt`](classes/Objekt.md)<`Object`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `K`[] |
| `attribute` | `string` |

#### Returns

`T`[]

#### Defined in

[utils/operation.ts:287](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L287)

___

### pluckKeys

▸ **pluckKeys**(`obj`, `condition`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |
| `condition` | (`value`: `any`, `key`: `string`) => `boolean` |

#### Returns

`string`[]

#### Defined in

[utils/operation.ts:300](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L300)

___

### random

▸ **random**(`min`, `max`, `opt_onlyFloat?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `min` | `number` | `undefined` |
| `max` | `number` | `undefined` |
| `opt_onlyFloat` | `boolean` | `false` |

#### Returns

`number`

#### Defined in

[utils/math.ts:87](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/math.ts#L87)

___

### readableCurrency

▸ **readableCurrency**(`price`, `opt_delimiter?`, `opt_separator?`, `opt_precision?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `price` | `number` | `undefined` |
| `opt_delimiter` | `string` | `' '` |
| `opt_separator` | `string` | `','` |
| `opt_precision` | `number` | `0` |

#### Returns

`string`

#### Defined in

[utils/math.ts:1](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/math.ts#L1)

___

### readableNumber

▸ **readableNumber**(`num`, `opt_around?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `num` | `number` | `undefined` |
| `opt_around` | `boolean` | `false` |

#### Returns

`string`

#### Defined in

[utils/math.ts:27](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/math.ts#L27)

___

### remove

▸ **remove**<`T`\>(`items`, `item`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `T`[] |
| `item` | `T` |

#### Returns

`void`

#### Defined in

[utils/operation.ts:216](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L216)

___

### round

▸ **round**(`value`, `exp`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `exp` | `number` |

#### Returns

`number`

#### Defined in

[utils/math.ts:78](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/math.ts#L78)

___

### scrollIntoView

▸ **scrollIntoView**(`selector`, `opt_behavior?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `selector` | `string` | `undefined` |
| `opt_behavior` | `ScrollBehavior` | `'smooth'` |

#### Returns

`void`

#### Defined in

[utils/operation.ts:357](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L357)

___

### scrollTo

▸ **scrollTo**(`x`, `y`, `opt_duration?`, `opt_step?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `x` | `number` | `undefined` |
| `y` | `number` | `undefined` |
| `opt_duration` | `number` | `500` |
| `opt_step` | `number` | `20` |

#### Returns

`void`

#### Defined in

[utils/operation.ts:315](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L315)

___

### scrollToElement

▸ **scrollToElement**(`selector`, `opt_duration?`, `opt_step?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `selector` | `string` | `undefined` |
| `opt_duration` | `number` | `500` |
| `opt_step` | `number` | `20` |

#### Returns

`void`

#### Defined in

[utils/operation.ts:345](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L345)

___

### setDateIOLocale

▸ **setDateIOLocale**(`newLocale`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newLocale` | `string` |

#### Returns

`void`

#### Defined in

[utils/dateio.ts:51](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/dateio.ts#L51)

___

### setReleaseMode

▸ **setReleaseMode**(`mode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | `boolean` |

#### Returns

`void`

#### Defined in

[common/config.ts:3](https://github.com/siposdani87/sui-js/blob/ad456a5/src/common/config.ts#L3)

___

### sleepEach

▸ **sleepEach**(`next`, `i`, `length`, `duration`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | (`_index`: `number`) => `void` |
| `i` | `number` |
| `length` | `number` |
| `duration` | `number` |

#### Returns

`void`

#### Defined in

[utils/operation.ts:151](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L151)

___

### typeCast

▸ **typeCast**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`any`

#### Defined in

[utils/operation.ts:3](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L3)

___

### urlWithQueryString

▸ **urlWithQueryString**(`url`, `opt_params?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_params?` | `Object` |

#### Returns

`string`

#### Defined in

[utils/operation.ts:384](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/operation.ts#L384)

___

### uuid

▸ **uuid**(): `string`

#### Returns

`string`

#### Defined in

[utils/coder.ts:34](https://github.com/siposdani87/sui-js/blob/ad456a5/src/utils/coder.ts#L34)
