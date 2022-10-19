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
- [BaseTest](classes/BaseTest.md)
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
- [CollectionTest](classes/CollectionTest.md)
- [ColorField](classes/ColorField.md)
- [Confirm](classes/Confirm.md)
- [ContentHandler](classes/ContentHandler.md)
- [Cookie](classes/Cookie.md)
- [DateTime](classes/DateTime.md)
- [DateTimeField](classes/DateTimeField.md)
- [DateTimeRangeField](classes/DateTimeRangeField.md)
- [Day](classes/Day.md)
- [Deferred](classes/Deferred.md)
- [DeferredTest](classes/DeferredTest.md)
- [Dialog](classes/Dialog.md)
- [Document](classes/Document.md)
- [Dropdown](classes/Dropdown.md)
- [Event](classes/Event.md)
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
- [Item](classes/Item.md)
- [ItemTest](classes/ItemTest.md)
- [LeftMenu](classes/LeftMenu.md)
- [Loader](classes/Loader.md)
- [LocationField](classes/LocationField.md)
- [Module](classes/Module.md)
- [Month](classes/Month.md)
- [NavBar](classes/NavBar.md)
- [Navigation](classes/Navigation.md)
- [NumberField](classes/NumberField.md)
- [Objekt](classes/Objekt.md)
- [ObjektTest](classes/ObjektTest.md)
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
- [Script](classes/Script.md)
- [SearchField](classes/SearchField.md)
- [SelectField](classes/SelectField.md)
- [ServiceWorker](classes/ServiceWorker.md)
- [State](classes/State.md)
- [Storage](classes/Storage.md)
- [Style](classes/Style.md)
- [SubmitButton](classes/SubmitButton.md)
- [SwitchField](classes/SwitchField.md)
- [TabPanel](classes/TabPanel.md)
- [Table](classes/Table.md)
- [Template](classes/Template.md)
- [TestRunner](classes/TestRunner.md)
- [TextField](classes/TextField.md)
- [TextareaField](classes/TextareaField.md)
- [Time](classes/Time.md)
- [Tooltip](classes/Tooltip.md)
- [TopMenu](classes/TopMenu.md)
- [UrlField](classes/UrlField.md)
- [Viewer](classes/Viewer.md)
- [Waiter](classes/Waiter.md)
- [Window](classes/Window.md)
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

[utils/types.ts:23](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/types.ts#L23)

___

### ClassRef

Ƭ **ClassRef**: (...`args`: `any`[]) => `any`

#### Type declaration

• **new ClassRef**(...`args`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`any`

#### Defined in

[utils/types.ts:47](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/types.ts#L47)

___

### Dependency

Ƭ **Dependency**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `moduleCallback` | [`ClassRef`](modules.md#classref) |
| `moduleInjections` | `string`[] |

#### Defined in

[utils/types.ts:52](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/types.ts#L52)

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

[utils/types.ts:31](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/types.ts#L31)

___

### Id

Ƭ **Id**: `string` \| `number`

#### Defined in

[utils/types.ts:18](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/types.ts#L18)

___

### Injection

Ƭ **Injection**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[utils/types.ts:39](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/types.ts#L39)

___

### Instance

Ƭ **Instance**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[utils/types.ts:43](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/types.ts#L43)

___

### LatLng

Ƭ **LatLng**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `latitude` | `number` |
| `longitude` | `number` |

#### Defined in

[component/googleMap.ts:31](https://github.com/siposdani87/sui-js/blob/8315555/src/component/googleMap.ts#L31)

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

[utils/types.ts:6](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/types.ts#L6)

___

### Params

Ƭ **Params**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[utils/types.ts:11](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/types.ts#L11)

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

[component/googleMap.ts:22](https://github.com/siposdani87/sui-js/blob/8315555/src/component/googleMap.ts#L22)

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

[utils/dateio.ts:59](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/dateio.ts#L59)

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
| `document` | `string` |
| `dom` | `string` |
| `event` | `string` |
| `flash` | `string` |
| `footer` | `string` |
| `geoLocation` | `string` |
| `header` | `string` |
| `helper` | `string` |
| `http` | `string` |
| `instances` | `string` |
| `leftMenu` | `string` |
| `loader` | `string` |
| `localStorage` | `string` |
| `navBar` | `string` |
| `progressBar` | `string` |
| `scheduler` | `string` |
| `script` | `string` |
| `serviceWorker` | `string` |
| `sessionStorage` | `string` |
| `state` | `string` |
| `style` | `string` |
| `template` | `string` |
| `topMenu` | `string` |
| `viewer` | `string` |
| `window` | `string` |

#### Defined in

[common/config.ts:11](https://github.com/siposdani87/sui-js/blob/8315555/src/common/config.ts#L11)

___

### releaseMode

• **releaseMode**: `boolean` = `true`

#### Defined in

[common/config.ts:3](https://github.com/siposdani87/sui-js/blob/8315555/src/common/config.ts#L3)

## Functions

### FormField

▸ **FormField**(`inputBlock`, `form`): [`BaseField`](classes/BaseField.md)<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputBlock` | [`Item`](classes/Item.md)<`HTMLElement` \| `HTMLInputElement`\> |
| `form` | [`Form`](classes/Form.md) |

#### Returns

[`BaseField`](classes/BaseField.md)<`HTMLInputElement`\>

#### Defined in

[component/formField.ts:34](https://github.com/siposdani87/sui-js/blob/8315555/src/component/formField.ts#L34)

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

[utils/operation.ts:438](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L438)

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

[utils/math.ts:125](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/math.ts#L125)

___

### clear

▸ **clear**(`items`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `Object` \| `any`[] |

#### Returns

`void`

#### Defined in

[utils/operation.ts:280](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L280)

___

### clearArray

▸ **clearArray**(`items`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/operation.ts:292](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L292)

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

[utils/operation.ts:300](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L300)

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

[utils/color.ts:184](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/color.ts#L184)

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

[utils/color.ts:169](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/color.ts#L169)

___

### consoleAssert

▸ **consoleAssert**(`condition`, ...`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | `boolean` |
| `...data` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/log.ts:48](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/log.ts#L48)

___

### consoleDebug

▸ **consoleDebug**(...`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...message` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/log.ts:40](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/log.ts#L40)

___

### consoleError

▸ **consoleError**(...`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...message` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/log.ts:33](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/log.ts#L33)

___

### consoleInfo

▸ **consoleInfo**(...`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...message` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/log.ts:15](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/log.ts#L15)

___

### consoleLog

▸ **consoleLog**(...`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...message` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/log.ts:6](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/log.ts#L6)

___

### consoleWarn

▸ **consoleWarn**(...`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...message` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/log.ts:24](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/log.ts#L24)

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

[utils/operation.ts:321](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L321)

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

[utils/color.ts:71](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/color.ts#L71)

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

[utils/color.ts:82](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/color.ts#L82)

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

[utils/color.ts:158](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/color.ts#L158)

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

[utils/color.ts:98](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/color.ts#L98)

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

[utils/color.ts:50](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/color.ts#L50)

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

[utils/color.ts:9](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/color.ts#L9)

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

[utils/dateio.ts:55](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/dateio.ts#L55)

___

### copy

▸ **copy**(`items`): `Object` \| `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `Object` \| `any`[] |

#### Returns

`Object` \| `any`[]

#### Defined in

[utils/operation.ts:373](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L373)

___

### copyArray

▸ **copyArray**(`items`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `any`[] |

#### Returns

`any`[]

#### Defined in

[utils/operation.ts:389](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L389)

___

### copyObject

▸ **copyObject**(`items`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `Object` |

#### Returns

`Object`

#### Defined in

[utils/operation.ts:398](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L398)

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

[utils/operation.ts:623](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L623)

___

### debounce

▸ **debounce**(`func`, `opt_wait?`, `opt_immediate?`): (`this`: `Window`, `ev`: `Event`) => `any`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `func` | `Function` | `undefined` |
| `opt_wait` | `number` | `250` |
| `opt_immediate` | `boolean` | `false` |

#### Returns

`fn`

▸ (`this`, `ev`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Window` |
| `ev` | `Event` |

##### Returns

`any`

#### Defined in

[utils/operation.ts:551](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L551)

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

[utils/coder.ts:19](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/coder.ts#L19)

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

[utils/coder.ts:39](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/coder.ts#L39)

___

### each

▸ **each**(`items`, `next`, `opt_start?`, `opt_end?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `object` \| `any`[] |
| `next` | `Function` |
| `opt_start?` | `number` |
| `opt_end?` | `number` |

#### Returns

`void`

#### Defined in

[utils/operation.ts:207](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L207)

___

### eachArray

▸ **eachArray**(`items`, `next`, `opt_start?`, `opt_end?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `any`[] |
| `next` | `Function` |
| `opt_start?` | `number` |
| `opt_end?` | `number` |

#### Returns

`void`

#### Defined in

[utils/operation.ts:227](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L227)

___

### eachObject

▸ **eachObject**(`object`, `next`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `next` | `Function` |

#### Returns

`void`

#### Defined in

[utils/operation.ts:245](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L245)

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

[utils/coder.ts:10](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/coder.ts#L10)

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

[utils/coder.ts:29](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/coder.ts#L29)

___

### eq

▸ **eq**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |
| `b` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:82](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L82)

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

[utils/math.ts:115](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/math.ts#L115)

___

### format

▸ **format**(`str`, `opt_params?`, `opt_prefix?`, `opt_postfix?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `str` | `string` | `undefined` |
| `opt_params` | `object` \| `any`[] | `null` |
| `opt_prefix` | `string` | `'\\{'` |
| `opt_postfix` | `string` | `'\\}'` |

#### Returns

`string`

#### Defined in

[utils/operation.ts:54](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L54)

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

[utils/coder.ts:63](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/coder.ts#L63)

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

[utils/operation.ts:605](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L605)

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

[utils/operation.ts:587](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L587)

___

### gt

▸ **gt**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |
| `b` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:96](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L96)

___

### gte

▸ **gte**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |
| `b` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:103](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L103)

___

### guid

▸ **guid**(): `string`

i6wolnd42rjg2nor7xdg5akv4p
https://github.com/LiosK/UUID.js

#### Returns

`string`

#### Defined in

[utils/coder.ts:55](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/coder.ts#L55)

___

### inArray

▸ **inArray**(`items`, `item`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `any`[] |
| `item` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:313](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L313)

___

### inContainArray

▸ **inContainArray**(`items`, `item`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `any`[] |
| `item` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:329](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L329)

___

### instanceOf

▸ **instanceOf**(`value`, `obj`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `obj` | `Object` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:197](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L197)

___

### is

▸ **is**(`value`, `type`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:190](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L190)

___

### isArray

▸ **isArray**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:123](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L123)

___

### isDate

▸ **isDate**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:171](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L171)

___

### isEmpty

▸ **isEmpty**(`items`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `Object` \| `any`[] |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:410](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L410)

___

### isFloat

▸ **isFloat**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:153](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L153)

___

### isFunction

▸ **isFunction**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:129](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L129)

___

### isInteger

▸ **isInteger**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:159](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L159)

___

### isNull

▸ **isNull**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:177](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L177)

___

### isNumber

▸ **isNumber**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:141](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L141)

___

### isObject

▸ **isObject**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:165](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L165)

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

[utils/operation.ts:342](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L342)

___

### isString

▸ **isString**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:135](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L135)

___

### isUndefined

▸ **isUndefined**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:183](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L183)

___

### list

▸ **list**(`args`, `callback`): `void`

**`Deprecated`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `any`[] |
| `callback` | `Function` |

#### Returns

`void`

#### Defined in

[utils/operation.ts:430](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L430)

___

### lt

▸ **lt**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |
| `b` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:110](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L110)

___

### lte

▸ **lte**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |
| `b` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:117](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L117)

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

[utils/coder.ts:48](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/coder.ts#L48)

___

### mdl

▸ **mdl**(`opt_node?`, `opt_forceDowngrade?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_node?` | `HTMLElement` \| [`Item`](classes/Item.md)<`HTMLElement`\> | `undefined` |
| `opt_forceDowngrade` | `boolean` | `true` |

#### Returns

`void`

#### Defined in

[utils/render.ts:11](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/render.ts#L11)

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

[utils/operation.ts:33](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L33)

___

### neq

▸ **neq**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |
| `b` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/operation.ts:89](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L89)

___

### noop

▸ **noop**(`opt_result?`): () => `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_result?` | `any` |

#### Returns

`fn`

▸ (): `any`

##### Returns

`any`

#### Defined in

[utils/operation.ts:72](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L72)

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

[utils/operation.ts:616](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L616)

___

### parseInputBlock

▸ **parseInputBlock**(`inputBlock`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputBlock` | [`Item`](classes/Item.md)<`HTMLElement` \| `HTMLInputElement`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `error` | [`Item`](classes/Item.md)<`HTMLElement`\> |
| `input` | [`Item`](classes/Item.md)<`HTMLInputElement`\> |
| `label` | [`Item`](classes/Item.md)<`HTMLElement`\> |

#### Defined in

[component/formField.ts:47](https://github.com/siposdani87/sui-js/blob/8315555/src/component/formField.ts#L47)

___

### pluck

▸ **pluck**(`items`, `attribute`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `any`[] |
| `attribute` | `string` |

#### Returns

`any`[]

#### Defined in

[utils/operation.ts:446](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L446)

___

### pluckKeys

▸ **pluckKeys**(`obj`, `condition`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |
| `condition` | (`_value`: `any`, `_key`: `string`) => `any` |

#### Returns

`any`[]

#### Defined in

[utils/operation.ts:460](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L460)

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

[utils/math.ts:134](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/math.ts#L134)

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

[utils/math.ts:8](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/math.ts#L8)

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

[utils/math.ts:39](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/math.ts#L39)

___

### remove

▸ **remove**(`items`, `item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `any`[] |
| `item` | `any` |

#### Returns

`void`

#### Defined in

[utils/operation.ts:362](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L362)

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

[utils/math.ts:105](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/math.ts#L105)

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

[utils/operation.ts:536](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L536)

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

[utils/operation.ts:481](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L481)

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

[utils/operation.ts:519](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L519)

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

[utils/dateio.ts:51](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/dateio.ts#L51)

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

[common/config.ts:5](https://github.com/siposdani87/sui-js/blob/8315555/src/common/config.ts#L5)

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

[utils/operation.ts:260](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L260)

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

[utils/operation.ts:5](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L5)

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

[utils/operation.ts:574](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/operation.ts#L574)

___

### uuid

▸ **uuid**(): `string`

778c4858-5a37-42c3-90e5-f9e4113fb97b
https://github.com/LiosK/UUID.js

#### Returns

`string`

#### Defined in

[utils/coder.ts:70](https://github.com/siposdani87/sui-js/blob/8315555/src/utils/coder.ts#L70)
