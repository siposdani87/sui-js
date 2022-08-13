---
id: "NumberField"
title: "Class: NumberField"
sidebar_label: "NumberField"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`BaseField`](BaseField.md)<`HTMLInputElement`\>

  ↳ **`NumberField`**

## Constructors

### constructor

• **new NumberField**(`input`, `label`, `error`, `inputBlock`)

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

[field/numberField.ts:17](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/numberField.ts#lines-17)

## Properties

### actionContainerNode

• **actionContainerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[actionContainerNode](BaseField.md#actioncontainernode)

#### Defined in

[field/baseField.ts:20](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-20)

___

### disabled

• **disabled**: `boolean`

#### Inherited from

[BaseField](BaseField.md).[disabled](BaseField.md#disabled)

#### Defined in

[field/baseField.ts:21](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-21)

___

### error

• **error**: [`Item`](Item.md)<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[error](BaseField.md#error)

#### Defined in

[field/baseField.ts:15](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-15)

___

### errorTooltip

• **errorTooltip**: [`Tooltip`](Tooltip.md)

#### Inherited from

[BaseField](BaseField.md).[errorTooltip](BaseField.md#errortooltip)

#### Defined in

[field/baseField.ts:18](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-18)

___

### form

• `Optional` **form**: [`Form`](Form.md)

#### Inherited from

[BaseField](BaseField.md).[form](BaseField.md#form)

#### Defined in

[field/baseField.ts:17](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-17)

___

### infoContainerNode

• **infoContainerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[infoContainerNode](BaseField.md#infocontainernode)

#### Defined in

[field/baseField.ts:19](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-19)

___

### input

• **input**: [`Item`](Item.md)<`HTMLInputElement`\>

#### Inherited from

[BaseField](BaseField.md).[input](BaseField.md#input)

#### Defined in

[field/baseField.ts:13](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-13)

___

### inputBlock

• **inputBlock**: [`Item`](Item.md)<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[inputBlock](BaseField.md#inputblock)

#### Defined in

[field/baseField.ts:16](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-16)

___

### label

• **label**: [`Item`](Item.md)<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[label](BaseField.md#label)

#### Defined in

[field/baseField.ts:14](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-14)

## Methods

### \_checkValue

▸ `Private` **_checkValue**(): `void`

#### Returns

`void`

#### Defined in

[field/numberField.ts:88](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/numberField.ts#lines-88)

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

[field/baseField.ts:109](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-109)

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

[field/baseField.ts:382](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-382)

___

### \_getMax

▸ `Private` **_getMax**(): `number`

#### Returns

`number`

#### Defined in

[field/numberField.ts:103](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/numberField.ts#lines-103)

___

### \_getMin

▸ `Private` **_getMin**(): `number`

#### Returns

`number`

#### Defined in

[field/numberField.ts:111](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/numberField.ts#lines-111)

___

### \_getStep

▸ `Private` **_getStep**(): `number`

#### Returns

`number`

#### Defined in

[field/numberField.ts:119](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/numberField.ts#lines-119)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[field/numberField.ts:30](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/numberField.ts#lines-30)

___

### \_initButtons

▸ `Private` **_initButtons**(): `void`

#### Returns

`void`

#### Defined in

[field/numberField.ts:53](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/numberField.ts#lines-53)

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

[field/baseField.ts:370](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-370)

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

[field/baseField.ts:140](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-140)

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

[field/baseField.ts:55](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-55)

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

[field/baseField.ts:62](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-62)

___

### exists

▸ **exists**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[exists](BaseField.md#exists)

#### Defined in

[field/baseField.ts:194](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-194)

___

### existsInput

▸ **existsInput**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[existsInput](BaseField.md#existsinput)

#### Defined in

[field/baseField.ts:200](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-200)

___

### existsInputBlock

▸ **existsInputBlock**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[existsInputBlock](BaseField.md#existsinputblock)

#### Defined in

[field/baseField.ts:206](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-206)

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

[field/baseField.ts:213](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-213)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Inherited from

[BaseField](BaseField.md).[getName](BaseField.md#getname)

#### Defined in

[field/baseField.ts:93](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-93)

___

### getPreviousValue

▸ **getPreviousValue**(): `any`

#### Returns

`any`

#### Inherited from

[BaseField](BaseField.md).[getPreviousValue](BaseField.md#getpreviousvalue)

#### Defined in

[field/baseField.ts:86](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-86)

___

### getValue

▸ **getValue**(): `any`

#### Returns

`any`

#### Inherited from

[BaseField](BaseField.md).[getValue](BaseField.md#getvalue)

#### Defined in

[field/baseField.ts:100](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-100)

___

### hide

▸ **hide**(): `void`

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[hide](BaseField.md#hide)

#### Defined in

[field/baseField.ts:289](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-289)

___

### isDisabled

▸ **isDisabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isDisabled](BaseField.md#isdisabled)

#### Defined in

[field/baseField.ts:245](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-245)

___

### isEnabled

▸ **isEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isEnabled](BaseField.md#isenabled)

#### Defined in

[field/baseField.ts:239](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-239)

___

### isRequired

▸ **isRequired**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isRequired](BaseField.md#isrequired)

#### Defined in

[field/baseField.ts:219](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-219)

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isValid](BaseField.md#isvalid)

#### Defined in

[field/baseField.ts:172](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-172)

___

### isValidityValid

▸ **isValidityValid**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isValidityValid](BaseField.md#isvalidityvalid)

#### Defined in

[field/baseField.ts:165](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-165)

___

### isVisible

▸ **isVisible**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isVisible](BaseField.md#isvisible)

#### Defined in

[field/baseField.ts:264](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-264)

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

[field/baseField.ts:80](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-80)

___

### refresh

▸ **refresh**(): `void`

#### Returns

`void`

#### Overrides

[BaseField](BaseField.md).[refresh](BaseField.md#refresh)

#### Defined in

[field/numberField.ts:142](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/numberField.ts#lines-142)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Overrides

[BaseField](BaseField.md).[render](BaseField.md#render)

#### Defined in

[field/numberField.ts:127](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/numberField.ts#lines-127)

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

[field/baseField.ts:252](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-252)

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

[field/baseField.ts:123](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-123)

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

[field/baseField.ts:298](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-298)

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

[field/baseField.ts:226](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-226)

___

### setValue

▸ **setValue**(`value?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[setValue](BaseField.md#setvalue)

#### Defined in

[field/baseField.ts:186](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-186)

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

[field/baseField.ts:271](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-271)

___

### show

▸ **show**(): `void`

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[show](BaseField.md#show)

#### Defined in

[field/baseField.ts:281](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-281)
