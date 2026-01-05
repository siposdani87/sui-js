# Class: FileField

Defined in: [field/fileField.ts:13](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/fileField.ts#L13)

## Extends

- [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

## Constructors

### Constructor

> **new FileField**(`input`, `label`, `error`, `inputBlock`): `FileField`

Defined in: [field/fileField.ts:21](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/fileField.ts#L21)

#### Parameters

##### input

[`Knot`](Knot.md)\<`HTMLInputElement`\>

##### label

[`Knot`](Knot.md)

##### error

[`Knot`](Knot.md)

##### inputBlock

[`Knot`](Knot.md)

#### Returns

`FileField`

#### Overrides

[`BaseField`](BaseField.md).[`constructor`](BaseField.md#constructor)

## Properties

### actionContainerKnot

> **actionContainerKnot**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:16](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L16)

#### Inherited from

[`BaseField`](BaseField.md).[`actionContainerKnot`](BaseField.md#actioncontainerknot)

***

### defaultSrc

> **defaultSrc**: `string`

Defined in: [field/fileField.ts:16](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/fileField.ts#L16)

***

### disabled

> **disabled**: `boolean`

Defined in: [field/baseField.ts:17](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L17)

#### Inherited from

[`BaseField`](BaseField.md).[`disabled`](BaseField.md#disabled)

***

### error

> **error**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:11](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L11)

#### Inherited from

[`BaseField`](BaseField.md).[`error`](BaseField.md#error)

***

### errorTooltip

> **errorTooltip**: [`Tooltip`](Tooltip.md)

Defined in: [field/baseField.ts:14](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L14)

#### Inherited from

[`BaseField`](BaseField.md).[`errorTooltip`](BaseField.md#errortooltip)

***

### fileTypes

> **fileTypes**: `object`

Defined in: [field/fileField.ts:18](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/fileField.ts#L18)

#### Index Signature

\[`key`: `string`\]: \[`string`, `string`\]

***

### fileTypeSVG

> **fileTypeSVG**: `string`

Defined in: [field/fileField.ts:19](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/fileField.ts#L19)

***

### form?

> `optional` **form**: [`Form`](Form.md)

Defined in: [field/baseField.ts:13](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L13)

#### Inherited from

[`BaseField`](BaseField.md).[`form`](BaseField.md#form)

***

### imageTag

> **imageTag**: [`Knot`](Knot.md)

Defined in: [field/fileField.ts:14](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/fileField.ts#L14)

***

### infoContainerKnot

> **infoContainerKnot**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:15](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L15)

#### Inherited from

[`BaseField`](BaseField.md).[`infoContainerKnot`](BaseField.md#infocontainerknot)

***

### input

> **input**: [`Knot`](Knot.md)\<`HTMLInputElement`\>

Defined in: [field/baseField.ts:9](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L9)

#### Inherited from

[`BaseField`](BaseField.md).[`input`](BaseField.md#input)

***

### inputBlock

> **inputBlock**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:12](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L12)

#### Inherited from

[`BaseField`](BaseField.md).[`inputBlock`](BaseField.md#inputblock)

***

### label

> **label**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:10](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L10)

#### Inherited from

[`BaseField`](BaseField.md).[`label`](BaseField.md#label)

***

### removeButton

> **removeButton**: [`Knot`](Knot.md)

Defined in: [field/fileField.ts:17](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/fileField.ts#L17)

***

### valueSrc

> **valueSrc**: `string`

Defined in: [field/fileField.ts:15](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/fileField.ts#L15)

## Methods

### \_getAttributeName()

> `protected` **\_getAttributeName**(`inputName`): `string`

Defined in: [field/baseField.ts:77](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L77)

#### Parameters

##### inputName

`string`

#### Returns

`string`

#### Inherited from

[`BaseField`](BaseField.md).[`_getAttributeName`](BaseField.md#_getattributename)

***

### \_getLabelRequiredText()

> `protected` **\_getLabelRequiredText**(`labelText`): `string`

Defined in: [field/baseField.ts:282](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L282)

#### Parameters

##### labelText

`string`

#### Returns

`string`

#### Inherited from

[`BaseField`](BaseField.md).[`_getLabelRequiredText`](BaseField.md#_getlabelrequiredtext)

***

### \_setAdditionalLabel()

> `protected` **\_setAdditionalLabel**(`label`): `void`

Defined in: [field/baseField.ts:274](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L274)

#### Parameters

##### label

[`Knot`](Knot.md)\<`HTMLElement`\>

#### Returns

`void`

#### Inherited from

[`BaseField`](BaseField.md).[`_setAdditionalLabel`](BaseField.md#_setadditionallabel)

***

### checkValidity()

> **checkValidity**(`opt_force`, `opt_showMessage`): `void`

Defined in: [field/baseField.ts:100](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L100)

#### Parameters

##### opt\_force

`boolean` = `false`

##### opt\_showMessage

`boolean` = `true`

#### Returns

`void`

#### Inherited from

[`BaseField`](BaseField.md).[`checkValidity`](BaseField.md#checkvalidity)

***

### eventChange()

> **eventChange**(`value`, `previousValue`): `void`

Defined in: [field/baseField.ts:42](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L42)

#### Parameters

##### value

`any`

##### previousValue

`any`

#### Returns

`void`

#### Inherited from

[`BaseField`](BaseField.md).[`eventChange`](BaseField.md#eventchange)

***

### eventClick()

> **eventClick**(`knot`): `void`

Defined in: [field/baseField.ts:46](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L46)

#### Parameters

##### knot

[`Knot`](Knot.md)

#### Returns

`void`

#### Inherited from

[`BaseField`](BaseField.md).[`eventClick`](BaseField.md#eventclick)

***

### exists()

> **exists**(): `boolean`

Defined in: [field/baseField.ts:143](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L143)

#### Returns

`boolean`

#### Inherited from

[`BaseField`](BaseField.md).[`exists`](BaseField.md#exists)

***

### existsInput()

> **existsInput**(): `boolean`

Defined in: [field/baseField.ts:147](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L147)

#### Returns

`boolean`

#### Inherited from

[`BaseField`](BaseField.md).[`existsInput`](BaseField.md#existsinput)

***

### existsInputBlock()

> **existsInputBlock**(): `boolean`

Defined in: [field/baseField.ts:151](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L151)

#### Returns

`boolean`

#### Inherited from

[`BaseField`](BaseField.md).[`existsInputBlock`](BaseField.md#existsinputblock)

***

### get()

> **get**(`attribute`): `any`

Defined in: [field/baseField.ts:155](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L155)

#### Parameters

##### attribute

`string`

#### Returns

`any`

#### Inherited from

[`BaseField`](BaseField.md).[`get`](BaseField.md#get)

***

### getName()

> **getName**(): `string`

Defined in: [field/baseField.ts:67](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L67)

#### Returns

`string`

#### Inherited from

[`BaseField`](BaseField.md).[`getName`](BaseField.md#getname)

***

### getPreviousValue()

> **getPreviousValue**(): `any`

Defined in: [field/baseField.ts:62](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L62)

#### Returns

`any`

#### Inherited from

[`BaseField`](BaseField.md).[`getPreviousValue`](BaseField.md#getpreviousvalue)

***

### getValue()

> **getValue**(): `any`

Defined in: [field/baseField.ts:72](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L72)

#### Returns

`any`

#### Inherited from

[`BaseField`](BaseField.md).[`getValue`](BaseField.md#getvalue)

***

### hide()

> **hide**(): `void`

Defined in: [field/baseField.ts:210](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L210)

#### Returns

`void`

#### Inherited from

[`BaseField`](BaseField.md).[`hide`](BaseField.md#hide)

***

### isDisabled()

> **isDisabled**(): `boolean`

Defined in: [field/baseField.ts:178](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L178)

#### Returns

`boolean`

#### Inherited from

[`BaseField`](BaseField.md).[`isDisabled`](BaseField.md#isdisabled)

***

### isEnabled()

> **isEnabled**(): `boolean`

Defined in: [field/baseField.ts:174](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L174)

#### Returns

`boolean`

#### Inherited from

[`BaseField`](BaseField.md).[`isEnabled`](BaseField.md#isenabled)

***

### isRequired()

> **isRequired**(): `boolean`

Defined in: [field/baseField.ts:159](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L159)

#### Returns

`boolean`

#### Inherited from

[`BaseField`](BaseField.md).[`isRequired`](BaseField.md#isrequired)

***

### isValid()

> **isValid**(): `boolean`

Defined in: [field/baseField.ts:129](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L129)

#### Returns

`boolean`

#### Inherited from

[`BaseField`](BaseField.md).[`isValid`](BaseField.md#isvalid)

***

### isValidityValid()

> **isValidityValid**(): `boolean`

Defined in: [field/baseField.ts:123](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L123)

#### Returns

`boolean`

#### Inherited from

[`BaseField`](BaseField.md).[`isValidityValid`](BaseField.md#isvalidityvalid)

***

### isVisible()

> **isVisible**(): `boolean`

Defined in: [field/baseField.ts:192](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L192)

#### Returns

`boolean`

#### Inherited from

[`BaseField`](BaseField.md).[`isVisible`](BaseField.md#isvisible)

***

### modelChange()

> **modelChange**(`value`): `void`

Defined in: [field/baseField.ts:58](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L58)

#### Parameters

##### value

`any`

#### Returns

`void`

#### Inherited from

[`BaseField`](BaseField.md).[`modelChange`](BaseField.md#modelchange)

***

### refresh()

> **refresh**(): `void`

Defined in: [field/fileField.ts:169](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/fileField.ts#L169)

#### Returns

`void`

#### Overrides

[`BaseField`](BaseField.md).[`refresh`](BaseField.md#refresh)

***

### render()

> **render**(): `void`

Defined in: [field/fileField.ts:156](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/fileField.ts#L156)

#### Returns

`void`

#### Overrides

[`BaseField`](BaseField.md).[`render`](BaseField.md#render)

***

### setDisabled()

> **setDisabled**(`state`): `void`

Defined in: [field/baseField.ts:182](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L182)

#### Parameters

##### state

`boolean`

#### Returns

`void`

#### Inherited from

[`BaseField`](BaseField.md).[`setDisabled`](BaseField.md#setdisabled)

***

### setError()

> **setError**(`opt_message`, `opt_isCustomError`): `void`

Defined in: [field/baseField.ts:87](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L87)

#### Parameters

##### opt\_message

`string` = `''`

##### opt\_isCustomError

`boolean` = `false`

#### Returns

`void`

#### Inherited from

[`BaseField`](BaseField.md).[`setError`](BaseField.md#seterror)

***

### setLabel()

> **setLabel**(`text`): `void`

Defined in: [field/baseField.ts:216](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L216)

#### Parameters

##### text

`string`

#### Returns

`void`

#### Inherited from

[`BaseField`](BaseField.md).[`setLabel`](BaseField.md#setlabel)

***

### setRequired()

> **setRequired**(`state`): `void`

Defined in: [field/baseField.ts:163](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L163)

#### Parameters

##### state

`boolean`

#### Returns

`void`

#### Inherited from

[`BaseField`](BaseField.md).[`setRequired`](BaseField.md#setrequired)

***

### setValue()

> **setValue**(`value`): `void`

Defined in: [field/fileField.ts:226](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/fileField.ts#L226)

#### Parameters

##### value

`string` | `number` | `boolean` | `object` | `Function` | `any`[]

#### Returns

`void`

#### Overrides

[`BaseField`](BaseField.md).[`setValue`](BaseField.md#setvalue)

***

### setVisibility()

> **setVisibility**(`state`): `void`

Defined in: [field/baseField.ts:196](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L196)

#### Parameters

##### state

`boolean`

#### Returns

`void`

#### Inherited from

[`BaseField`](BaseField.md).[`setVisibility`](BaseField.md#setvisibility)

***

### show()

> **show**(): `void`

Defined in: [field/baseField.ts:204](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L204)

#### Returns

`void`

#### Inherited from

[`BaseField`](BaseField.md).[`show`](BaseField.md#show)
