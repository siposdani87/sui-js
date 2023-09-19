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

[utils/types.ts:52](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/types.ts#L52)

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

[utils/types.ts:109](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/types.ts#L109)

___

### Dependency

Ƭ **Dependency**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `moduleCallback` | [`ClassRef`](modules.md#classref) |
| `moduleInjections` | `string`[] |

#### Defined in

[utils/types.ts:114](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/types.ts#L114)

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

[utils/types.ts:60](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/types.ts#L60)

___

### Id

Ƭ **Id**: `string` \| `number`

#### Defined in

[utils/types.ts:47](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/types.ts#L47)

___

### Injection

Ƭ **Injection**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[utils/types.ts:68](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/types.ts#L68)

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

[utils/types.ts:74](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/types.ts#L74)

___

### InstanceKey

Ƭ **InstanceKey**: keyof [`Instance`](modules.md#instance)

#### Defined in

[utils/types.ts:72](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/types.ts#L72)

___

### LatLng

Ƭ **LatLng**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `latitude` | `number` |
| `longitude` | `number` |

#### Defined in

[component/googleMap.ts:31](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/googleMap.ts#L31)

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

[utils/types.ts:35](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/types.ts#L35)

___

### Params

Ƭ **Params**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[utils/types.ts:40](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/types.ts#L40)

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

[component/googleMap.ts:22](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/googleMap.ts#L22)

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

[utils/dateio.ts:59](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/dateio.ts#L59)

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

[common/config.ts:11](https://github.com/siposdani87/sui-js/blob/4b75724/src/common/config.ts#L11)

___

### releaseMode

• **releaseMode**: `boolean` = `true`

#### Defined in

[common/config.ts:3](https://github.com/siposdani87/sui-js/blob/4b75724/src/common/config.ts#L3)

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

[component/formField.ts:34](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/formField.ts#L34)

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

[utils/operation.ts:495](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L495)

___

### ceil

▸ **ceil**(`value`, `exp`): `number`

Decimal ceil

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `exp` | `number` |

#### Returns

`number`

#### Defined in

[utils/math.ts:125](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/math.ts#L125)

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

[utils/operation.ts:312](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L312)

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

[utils/operation.ts:325](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L325)

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

[utils/operation.ts:333](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L333)

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

[utils/color.ts:184](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/color.ts#L184)

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

[utils/color.ts:169](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/color.ts#L169)

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

[utils/log.ts:48](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/log.ts#L48)

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

[utils/log.ts:40](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/log.ts#L40)

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

[utils/log.ts:33](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/log.ts#L33)

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

[utils/log.ts:15](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/log.ts#L15)

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

[utils/log.ts:6](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/log.ts#L6)

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

[utils/log.ts:24](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/log.ts#L24)

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

[utils/operation.ts:355](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L355)

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

[utils/color.ts:71](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/color.ts#L71)

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

[utils/color.ts:82](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/color.ts#L82)

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

[utils/color.ts:158](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/color.ts#L158)

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

[utils/color.ts:98](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/color.ts#L98)

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

[utils/color.ts:50](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/color.ts#L50)

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

[utils/color.ts:9](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/color.ts#L9)

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

[utils/dateio.ts:55](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/dateio.ts#L55)

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

[utils/operation.ts:409](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L409)

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

[utils/operation.ts:426](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L426)

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

[utils/operation.ts:444](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L444)

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

[utils/operation.ts:684](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L684)

___

### debounce

▸ **debounce**(`func`, `opt_wait?`, `opt_immediate?`): (`this`: `Window`, `ev`: `Event`) => `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `func` | `Function` | `undefined` |
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

[utils/operation.ts:612](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L612)

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

[utils/coder.ts:19](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/coder.ts#L19)

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

[utils/coder.ts:39](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/coder.ts#L39)

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

[utils/operation.ts:234](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L234)

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

[utils/operation.ts:255](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L255)

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

[utils/operation.ts:273](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L273)

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

[utils/coder.ts:10](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/coder.ts#L10)

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

[utils/coder.ts:29](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/coder.ts#L29)

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

[utils/operation.ts:86](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L86)

___

### floor

▸ **floor**(`value`, `exp`): `number`

Decimal floor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `exp` | `number` |

#### Returns

`number`

#### Defined in

[utils/math.ts:115](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/math.ts#L115)

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

[utils/operation.ts:57](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L57)

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

[utils/coder.ts:63](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/coder.ts#L63)

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

[utils/operation.ts:666](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L666)

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

[utils/operation.ts:648](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L648)

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

[utils/operation.ts:100](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L100)

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

[utils/operation.ts:107](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L107)

___

### guid

▸ **guid**(): `string`

i6wolnd42rjg2nor7xdg5akv4p
https://github.com/LiosK/UUID.js

#### Returns

`string`

#### Defined in

[utils/coder.ts:55](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/coder.ts#L55)

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

[utils/operation.ts:347](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L347)

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

[utils/operation.ts:363](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L363)

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

[utils/operation.ts:223](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L223)

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

[utils/operation.ts:214](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L214)

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

[utils/operation.ts:128](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L128)

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

[utils/operation.ts:187](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L187)

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

[utils/operation.ts:463](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L463)

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

[utils/operation.ts:160](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L160)

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

[utils/operation.ts:135](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L135)

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

[utils/operation.ts:199](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L199)

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

[utils/operation.ts:167](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L167)

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

[utils/operation.ts:193](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L193)

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

[utils/operation.ts:148](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L148)

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

[utils/operation.ts:174](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L174)

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

[utils/operation.ts:180](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L180)

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

[utils/operation.ts:376](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L376)

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

[utils/operation.ts:142](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L142)

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

[utils/operation.ts:206](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L206)

___

### list

▸ **list**<`T`\>(`args`, `callback`): `void`

**`Deprecated`**

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

[utils/operation.ts:484](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L484)

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

[utils/operation.ts:114](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L114)

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

[utils/operation.ts:121](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L121)

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

[utils/coder.ts:48](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/coder.ts#L48)

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

[utils/render.ts:10](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/render.ts#L10)

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

[utils/operation.ts:35](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L35)

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

[utils/operation.ts:93](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L93)

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

[utils/operation.ts:76](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L76)

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

[utils/operation.ts:677](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L677)

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

[component/formField.ts:47](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/formField.ts#L47)

___

### pluck

▸ **pluck**<`T`\>(`items`, `attribute`): `T`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Objekt`](classes/Objekt.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `T`[] |
| `attribute` | `string` |

#### Returns

`T`[]

#### Defined in

[utils/operation.ts:504](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L504)

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

[utils/operation.ts:521](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L521)

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

[utils/math.ts:134](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/math.ts#L134)

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

[utils/math.ts:8](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/math.ts#L8)

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

[utils/math.ts:39](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/math.ts#L39)

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

[utils/operation.ts:397](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L397)

___

### round

▸ **round**(`value`, `exp`): `number`

Decimal round

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `exp` | `number` |

#### Returns

`number`

#### Defined in

[utils/math.ts:105](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/math.ts#L105)

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

[utils/operation.ts:597](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L597)

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

[utils/operation.ts:542](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L542)

___

### scrollToElement

▸ **scrollToElement**(`selector`, `opt_duration?`, `opt_step?`): `void`

**`Deprecated`**

**`Use`**

scrollIntoView

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `selector` | `string` | `undefined` |
| `opt_duration` | `number` | `500` |
| `opt_step` | `number` | `20` |

#### Returns

`void`

#### Defined in

[utils/operation.ts:580](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L580)

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

[utils/dateio.ts:51](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/dateio.ts#L51)

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

[common/config.ts:5](https://github.com/siposdani87/sui-js/blob/4b75724/src/common/config.ts#L5)

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

[utils/operation.ts:291](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L291)

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

[utils/operation.ts:7](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L7)

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

[utils/operation.ts:635](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/operation.ts#L635)

___

### uuid

▸ **uuid**(): `string`

778c4858-5a37-42c3-90e5-f9e4113fb97b
https://github.com/LiosK/UUID.js

#### Returns

`string`

#### Defined in

[utils/coder.ts:70](https://github.com/siposdani87/sui-js/blob/4b75724/src/utils/coder.ts#L70)
