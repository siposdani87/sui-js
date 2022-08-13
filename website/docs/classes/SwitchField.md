---
id: "SwitchField"
title: "Class: SwitchField"
sidebar_label: "SwitchField"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`BaseCheckboxField`](BaseCheckboxField.md)

  ↳ **`SwitchField`**

## Constructors

### constructor

• **new SwitchField**(`input`, `label`, `error`, `inputBlock`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Item`](Item.md)<`HTMLInputElement`\> |
| `label` | [`Item`](Item.md)<`HTMLElement`\> |
| `error` | [`Item`](Item.md)<`HTMLElement`\> |
| `inputBlock` | [`Item`](Item.md)<`HTMLElement`\> |

#### Overrides

[BaseCheckboxField](BaseCheckboxField.md).[constructor](BaseCheckboxField.md#constructor)

#### Defined in

[field/switchField.ts:15](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/switchField.ts#lines-15)

## Properties

### actionContainerNode

• **actionContainerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[actionContainerNode](BaseCheckboxField.md#actioncontainernode)

#### Defined in

[field/baseField.ts:20](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-20)

___

### dataLabelNode

• **dataLabelNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[dataLabelNode](BaseCheckboxField.md#datalabelnode)

#### Defined in

[field/baseCheckboxField.ts:14](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseCheckboxField.ts#lines-14)

___

### disabled

• **disabled**: `boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[disabled](BaseCheckboxField.md#disabled)

#### Defined in

[field/baseField.ts:21](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-21)

___

### error

• **error**: [`Item`](Item.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[error](BaseCheckboxField.md#error)

#### Defined in

[field/baseField.ts:15](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-15)

___

### errorTooltip

• **errorTooltip**: [`Tooltip`](Tooltip.md)

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[errorTooltip](BaseCheckboxField.md#errortooltip)

#### Defined in

[field/baseField.ts:18](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-18)

___

### form

• `Optional` **form**: [`Form`](Form.md)

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[form](BaseCheckboxField.md#form)

#### Defined in

[field/baseField.ts:17](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-17)

___

### hiddenInput

• **hiddenInput**: [`Item`](Item.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[hiddenInput](BaseCheckboxField.md#hiddeninput)

#### Defined in

[field/baseCheckboxField.ts:12](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseCheckboxField.ts#lines-12)

___

### infoContainerNode

• **infoContainerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[infoContainerNode](BaseCheckboxField.md#infocontainernode)

#### Defined in

[field/baseField.ts:19](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-19)

___

### input

• **input**: [`Item`](Item.md)<`HTMLInputElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[input](BaseCheckboxField.md#input)

#### Defined in

[field/baseField.ts:13](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-13)

___

### inputBlock

• **inputBlock**: [`Item`](Item.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[inputBlock](BaseCheckboxField.md#inputblock)

#### Defined in

[field/baseField.ts:16](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-16)

___

### label

• **label**: [`Item`](Item.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[label](BaseCheckboxField.md#label)

#### Defined in

[field/baseField.ts:14](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-14)

___

### spanLabel

• **spanLabel**: [`Item`](Item.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[spanLabel](BaseCheckboxField.md#spanlabel)

#### Defined in

[field/baseCheckboxField.ts:13](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseCheckboxField.ts#lines-13)

## Methods

### \_change

▸ `Protected` **_change**(): `void`

#### Returns

`void`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[_change](BaseCheckboxField.md#_change)

#### Defined in

[field/baseCheckboxField.ts:50](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseCheckboxField.ts#lines-50)

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

[BaseCheckboxField](BaseCheckboxField.md).[_getAttributeName](BaseCheckboxField.md#_getattributename)

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

[BaseCheckboxField](BaseCheckboxField.md).[_getLabelRequiredText](BaseCheckboxField.md#_getlabelrequiredtext)

#### Defined in

[field/baseField.ts:382](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-382)

___

### \_init

▸ `Protected` **_init**(): `void`

#### Returns

`void`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[_init](BaseCheckboxField.md#_init)

#### Defined in

[field/baseCheckboxField.ts:34](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseCheckboxField.ts#lines-34)

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

[BaseCheckboxField](BaseCheckboxField.md).[_setAdditionalLabel](BaseCheckboxField.md#_setadditionallabel)

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

[BaseCheckboxField](BaseCheckboxField.md).[checkValidity](BaseCheckboxField.md#checkvalidity)

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

[BaseCheckboxField](BaseCheckboxField.md).[eventChange](BaseCheckboxField.md#eventchange)

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

[BaseCheckboxField](BaseCheckboxField.md).[eventClick](BaseCheckboxField.md#eventclick)

#### Defined in

[field/baseField.ts:62](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-62)

___

### exists

▸ **exists**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[exists](BaseCheckboxField.md#exists)

#### Defined in

[field/baseField.ts:194](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-194)

___

### existsInput

▸ **existsInput**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[existsInput](BaseCheckboxField.md#existsinput)

#### Defined in

[field/baseField.ts:200](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-200)

___

### existsInputBlock

▸ **existsInputBlock**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[existsInputBlock](BaseCheckboxField.md#existsinputblock)

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

[BaseCheckboxField](BaseCheckboxField.md).[get](BaseCheckboxField.md#get)

#### Defined in

[field/baseField.ts:213](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-213)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[getName](BaseCheckboxField.md#getname)

#### Defined in

[field/baseField.ts:93](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-93)

___

### getPreviousValue

▸ **getPreviousValue**(): `any`

#### Returns

`any`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[getPreviousValue](BaseCheckboxField.md#getpreviousvalue)

#### Defined in

[field/baseField.ts:86](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-86)

___

### getValue

▸ **getValue**(): `any`

#### Returns

`any`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[getValue](BaseCheckboxField.md#getvalue)

#### Defined in

[field/baseCheckboxField.ts:58](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseCheckboxField.ts#lines-58)

___

### hide

▸ **hide**(): `void`

#### Returns

`void`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[hide](BaseCheckboxField.md#hide)

#### Defined in

[field/baseField.ts:289](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-289)

___

### isDisabled

▸ **isDisabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[isDisabled](BaseCheckboxField.md#isdisabled)

#### Defined in

[field/baseField.ts:245](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-245)

___

### isEnabled

▸ **isEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[isEnabled](BaseCheckboxField.md#isenabled)

#### Defined in

[field/baseField.ts:239](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-239)

___

### isRequired

▸ **isRequired**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[isRequired](BaseCheckboxField.md#isrequired)

#### Defined in

[field/baseField.ts:219](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-219)

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[isValid](BaseCheckboxField.md#isvalid)

#### Defined in

[field/baseField.ts:172](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-172)

___

### isValidityValid

▸ **isValidityValid**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[isValidityValid](BaseCheckboxField.md#isvalidityvalid)

#### Defined in

[field/baseField.ts:165](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-165)

___

### isVisible

▸ **isVisible**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[isVisible](BaseCheckboxField.md#isvisible)

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

[BaseCheckboxField](BaseCheckboxField.md).[modelChange](BaseCheckboxField.md#modelchange)

#### Defined in

[field/baseField.ts:80](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-80)

___

### refresh

▸ **refresh**(): `void`

#### Returns

`void`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[refresh](BaseCheckboxField.md#refresh)

#### Defined in

[field/baseCheckboxField.ts:121](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseCheckboxField.ts#lines-121)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Overrides

[BaseCheckboxField](BaseCheckboxField.md).[render](BaseCheckboxField.md#render)

#### Defined in

[field/switchField.ts:27](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/switchField.ts#lines-27)

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

[BaseCheckboxField](BaseCheckboxField.md).[setDisabled](BaseCheckboxField.md#setdisabled)

#### Defined in

[field/baseCheckboxField.ts:94](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseCheckboxField.ts#lines-94)

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

[BaseCheckboxField](BaseCheckboxField.md).[setError](BaseCheckboxField.md#seterror)

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

[BaseCheckboxField](BaseCheckboxField.md).[setLabel](BaseCheckboxField.md#setlabel)

#### Defined in

[field/baseCheckboxField.ts:112](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseCheckboxField.ts#lines-112)

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

[BaseCheckboxField](BaseCheckboxField.md).[setRequired](BaseCheckboxField.md#setrequired)

#### Defined in

[field/baseField.ts:226](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-226)

___

### setValue

▸ **setValue**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` \| `boolean` \| `Object` \| `Function` \| `any`[] |

#### Returns

`void`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[setValue](BaseCheckboxField.md#setvalue)

#### Defined in

[field/baseCheckboxField.ts:71](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseCheckboxField.ts#lines-71)

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

[BaseCheckboxField](BaseCheckboxField.md).[setVisibility](BaseCheckboxField.md#setvisibility)

#### Defined in

[field/baseField.ts:271](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-271)

___

### show

▸ **show**(): `void`

#### Returns

`void`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[show](BaseCheckboxField.md#show)

#### Defined in

[field/baseField.ts:281](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-281)
