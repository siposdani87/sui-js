---
id: "SelectField"
title: "Class: SelectField"
sidebar_label: "SelectField"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`BaseField`](BaseField.md)<`HTMLInputElement`\>

  ↳ **`SelectField`**

## Constructors

### constructor

• **new SelectField**(`input`, `label`, `error`, `inputBlock`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Item`](Item.md)<`HTMLInputElement`\> |
| `label` | [`Item`](Item.md)<`HTMLElement`\> |
| `error` | [`Item`](Item.md)<`HTMLElement`\> |
| `inputBlock` | [`Item`](Item.md)<`HTMLElement`\> |

#### Overrides

[BaseField](BaseField.md).[constructor](BaseField.md#constructor)

#### Defined in

[field/selectField.ts:41](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L41)

## Properties

### actionContainerNode

• **actionContainerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[actionContainerNode](BaseField.md#actioncontainernode)

#### Defined in

[field/baseField.ts:20](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L20)

___

### containerNode

• **containerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[field/selectField.ts:27](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L27)

___

### disabled

• **disabled**: `boolean`

#### Inherited from

[BaseField](BaseField.md).[disabled](BaseField.md#disabled)

#### Defined in

[field/baseField.ts:21](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L21)

___

### error

• **error**: [`Item`](Item.md)<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[error](BaseField.md#error)

#### Defined in

[field/baseField.ts:15](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L15)

___

### errorTooltip

• **errorTooltip**: [`Tooltip`](Tooltip.md)

#### Inherited from

[BaseField](BaseField.md).[errorTooltip](BaseField.md#errortooltip)

#### Defined in

[field/baseField.ts:18](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L18)

___

### form

• `Optional` **form**: [`Form`](Form.md)

#### Inherited from

[BaseField](BaseField.md).[form](BaseField.md#form)

#### Defined in

[field/baseField.ts:17](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L17)

___

### iconNode

• **iconNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[field/selectField.ts:31](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L31)

___

### ids

• **ids**: `string`[]

#### Defined in

[field/selectField.ts:26](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L26)

___

### infoContainerNode

• **infoContainerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[infoContainerNode](BaseField.md#infocontainernode)

#### Defined in

[field/baseField.ts:19](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L19)

___

### input

• **input**: [`Item`](Item.md)<`HTMLInputElement`\>

#### Inherited from

[BaseField](BaseField.md).[input](BaseField.md#input)

#### Defined in

[field/baseField.ts:13](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L13)

___

### inputBlock

• **inputBlock**: [`Item`](Item.md)<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[inputBlock](BaseField.md#inputblock)

#### Defined in

[field/baseField.ts:16](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L16)

___

### label

• **label**: [`Item`](Item.md)<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[label](BaseField.md#label)

#### Defined in

[field/baseField.ts:14](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L14)

___

### listNode

• **listNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[field/selectField.ts:28](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L28)

___

### options

• **options**: [`Collection`](Collection.md)<[`Objekt`](Objekt.md)\>

#### Defined in

[field/selectField.ts:30](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L30)

___

### popup

• **popup**: [`Popup`](Popup.md)

#### Defined in

[field/selectField.ts:29](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L29)

___

### query

• **query**: `string`

#### Defined in

[field/selectField.ts:25](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L25)

___

### searchInputNode

• **searchInputNode**: [`Item`](Item.md)<`HTMLInputElement`\>

#### Defined in

[field/selectField.ts:34](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L34)

___

### selectContainerNode

• **selectContainerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[field/selectField.ts:32](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L32)

___

### selectNode

• **selectNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[field/selectField.ts:33](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L33)

## Methods

### \_change

▸ `Private` **_change**(): `void`

#### Returns

`void`

#### Defined in

[field/selectField.ts:277](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L277)

___

### \_drawItems

▸ `Private` **_drawItems**(`items`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `any`[] |

#### Returns

`void`

#### Defined in

[field/selectField.ts:437](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L437)

___

### \_drawSearchInput

▸ `Private` **_drawSearchInput**(): `void`

#### Returns

`void`

#### Defined in

[field/selectField.ts:469](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L469)

___

### \_getAttributeName

▸ `Protected` **_getAttributeName**(`inputName`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputName` | `string` |

#### Returns

`string`

#### Inherited from

[BaseField](BaseField.md).[_getAttributeName](BaseField.md#_getattributename)

#### Defined in

[field/baseField.ts:109](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L109)

___

### \_getLabelRequiredText

▸ `Protected` **_getLabelRequiredText**(`labelText`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `labelText` | `string` |

#### Returns

`string`

#### Inherited from

[BaseField](BaseField.md).[_getLabelRequiredText](BaseField.md#_getlabelrequiredtext)

#### Defined in

[field/baseField.ts:382](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L382)

___

### \_getSelectedIds

▸ `Private` **_getSelectedIds**(): `any`[]

#### Returns

`any`[]

#### Defined in

[field/selectField.ts:389](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L389)

___

### \_handleSelectedId

▸ `Private` **_handleSelectedId**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

`void`

#### Defined in

[field/selectField.ts:407](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L407)

___

### \_hideLoader

▸ `Private` **_hideLoader**(): `void`

#### Returns

`void`

#### Defined in

[field/selectField.ts:230](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L230)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[field/selectField.ts:54](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L54)

___

### \_initChangeEvent

▸ `Private` **_initChangeEvent**(): `void`

#### Returns

`void`

#### Defined in

[field/selectField.ts:88](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L88)

___

### \_initOptions

▸ `Private` **_initOptions**(): `void`

#### Returns

`void`

#### Defined in

[field/selectField.ts:98](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L98)

___

### \_initPopup

▸ `Private` **_initPopup**(): `void`

#### Returns

`void`

#### Defined in

[field/selectField.ts:74](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L74)

___

### \_search

▸ `Private` **_search**(`query`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |

#### Returns

`void`

#### Defined in

[field/selectField.ts:520](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L520)

___

### \_setAdditionalLabel

▸ `Protected` **_setAdditionalLabel**(`label`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[_setAdditionalLabel](BaseField.md#_setadditionallabel)

#### Defined in

[field/baseField.ts:370](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L370)

___

### \_setMultipleTag

▸ `Private` **_setMultipleTag**(`ids`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `string`[] |

#### Returns

`void`

#### Defined in

[field/selectField.ts:312](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L312)

___

### \_setSelectTags

▸ `Private` **_setSelectTags**(`ids`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `any`[] |

#### Returns

`void`

#### Defined in

[field/selectField.ts:288](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L288)

___

### \_setSelectedIds

▸ `Private` **_setSelectedIds**(`ids`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `any`[] |

#### Returns

`void`

#### Defined in

[field/selectField.ts:369](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L369)

___

### \_setSimpleTag

▸ `Private` **_setSimpleTag**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`void`

#### Defined in

[field/selectField.ts:303](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L303)

___

### \_setTags

▸ `Private` **_setTags**(`tags`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tags` | [`Objekt`](Objekt.md) \| [`Objekt`](Objekt.md)[] |

#### Returns

`void`

#### Defined in

[field/selectField.ts:333](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L333)

___

### checkValidity

▸ **checkValidity**(`opt_force?`, `opt_showMessage?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_force` | `boolean` | `false` |
| `opt_showMessage` | `boolean` | `true` |

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[checkValidity](BaseField.md#checkvalidity)

#### Defined in

[field/baseField.ts:140](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L140)

___

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[field/selectField.ts:512](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L512)

___

### eventChange

▸ **eventChange**(`value`, `previousValue`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `previousValue` | `any` |

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[eventChange](BaseField.md#eventchange)

#### Defined in

[field/baseField.ts:55](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L55)

___

### eventClick

▸ **eventClick**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[eventClick](BaseField.md#eventclick)

#### Defined in

[field/baseField.ts:62](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L62)

___

### exists

▸ **exists**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[exists](BaseField.md#exists)

#### Defined in

[field/baseField.ts:194](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L194)

___

### existsInput

▸ **existsInput**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[existsInput](BaseField.md#existsinput)

#### Defined in

[field/baseField.ts:200](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L200)

___

### existsInputBlock

▸ **existsInputBlock**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[existsInputBlock](BaseField.md#existsinputblock)

#### Defined in

[field/baseField.ts:206](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L206)

___

### get

▸ **get**(`attribute`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |

#### Returns

`any`

#### Inherited from

[BaseField](BaseField.md).[get](BaseField.md#get)

#### Defined in

[field/baseField.ts:213](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L213)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Inherited from

[BaseField](BaseField.md).[getName](BaseField.md#getname)

#### Defined in

[field/baseField.ts:93](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L93)

___

### getOptionValue

▸ **getOptionValue**(`opt_attribute?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_attribute?` | `string` |

#### Returns

`any`

#### Defined in

[field/selectField.ts:209](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L209)

___

### getPreviousValue

▸ **getPreviousValue**(): `any`

#### Returns

`any`

#### Inherited from

[BaseField](BaseField.md).[getPreviousValue](BaseField.md#getpreviousvalue)

#### Defined in

[field/baseField.ts:86](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L86)

___

### getValue

▸ **getValue**(): `any`

#### Returns

`any`

#### Overrides

[BaseField](BaseField.md).[getValue](BaseField.md#getvalue)

#### Defined in

[field/selectField.ts:198](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L198)

___

### hide

▸ **hide**(): `void`

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[hide](BaseField.md#hide)

#### Defined in

[field/baseField.ts:289](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L289)

___

### isDisabled

▸ **isDisabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isDisabled](BaseField.md#isdisabled)

#### Defined in

[field/baseField.ts:245](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L245)

___

### isEnabled

▸ **isEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isEnabled](BaseField.md#isenabled)

#### Defined in

[field/baseField.ts:239](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L239)

___

### isMultiple

▸ **isMultiple**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/selectField.ts:67](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L67)

___

### isRequired

▸ **isRequired**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isRequired](BaseField.md#isrequired)

#### Defined in

[field/baseField.ts:219](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L219)

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isValid](BaseField.md#isvalid)

#### Defined in

[field/baseField.ts:172](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L172)

___

### isValidityValid

▸ **isValidityValid**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isValidityValid](BaseField.md#isvalidityvalid)

#### Defined in

[field/baseField.ts:165](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L165)

___

### isVisible

▸ **isVisible**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isVisible](BaseField.md#isvisible)

#### Defined in

[field/baseField.ts:264](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L264)

___

### modelChange

▸ **modelChange**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[modelChange](BaseField.md#modelchange)

#### Defined in

[field/baseField.ts:80](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L80)

___

### open

▸ **open**(): `void`

#### Returns

`void`

#### Defined in

[field/selectField.ts:504](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L504)

___

### refresh

▸ **refresh**(): `void`

#### Returns

`void`

#### Overrides

[BaseField](BaseField.md).[refresh](BaseField.md#refresh)

#### Defined in

[field/selectField.ts:143](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L143)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Overrides

[BaseField](BaseField.md).[render](BaseField.md#render)

#### Defined in

[field/selectField.ts:121](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L121)

___

### setDisabled

▸ **setDisabled**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `boolean` |

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[setDisabled](BaseField.md#setdisabled)

#### Defined in

[field/baseField.ts:252](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L252)

___

### setError

▸ **setError**(`opt_message?`, `opt_isCustomError?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_message` | `string` | `''` |
| `opt_isCustomError` | `boolean` | `false` |

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[setError](BaseField.md#seterror)

#### Defined in

[field/baseField.ts:123](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L123)

___

### setLabel

▸ **setLabel**(`text`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[setLabel](BaseField.md#setlabel)

#### Defined in

[field/baseField.ts:298](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L298)

___

### setOptions

▸ **setOptions**(`items`, `opt_value?`, `opt_name?`, `opt_image?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `items` | [`Objekt`](Objekt.md)[] | `undefined` |
| `opt_value` | `string` | `'value'` |
| `opt_name` | `string` | `'name'` |
| `opt_image` | `string` | `''` |

#### Returns

`void`

#### Defined in

[field/selectField.ts:241](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L241)

___

### setRequired

▸ **setRequired**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `boolean` |

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[setRequired](BaseField.md#setrequired)

#### Defined in

[field/baseField.ts:226](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L226)

___

### setValue

▸ **setValue**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` \| `boolean` \| `Object` \| `Function` \| `any`[] |

#### Returns

`void`

#### Overrides

[BaseField](BaseField.md).[setValue](BaseField.md#setvalue)

#### Defined in

[field/selectField.ts:177](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L177)

___

### setVisibility

▸ **setVisibility**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `boolean` |

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[setVisibility](BaseField.md#setvisibility)

#### Defined in

[field/baseField.ts:271](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L271)

___

### show

▸ **show**(): `void`

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[show](BaseField.md#show)

#### Defined in

[field/baseField.ts:281](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/baseField.ts#L281)

___

### showLoader

▸ **showLoader**(): `void`

#### Returns

`void`

#### Defined in

[field/selectField.ts:222](https://github.com/siposdani87/sui-js/blob/78d3494/src/field/selectField.ts#L222)
