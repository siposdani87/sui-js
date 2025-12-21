# Class: BaseField\<T\>

Defined in: [field/baseField.ts:8](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L8)

## Extended by

- [`AutoCompleteField`](AutoCompleteField.md)
- [`BaseCheckboxField`](BaseCheckboxField.md)
- [`Button`](Button.md)
- [`ColorField`](ColorField.md)
- [`DateTimeField`](DateTimeField.md)
- [`DateTimeRangeField`](DateTimeRangeField.md)
- [`FileField`](FileField.md)
- [`HiddenField`](HiddenField.md)
- [`LocationField`](LocationField.md)
- [`NumberField`](NumberField.md)
- [`RadiobuttonField`](RadiobuttonField.md)
- [`RangeField`](RangeField.md)
- [`ResetButton`](ResetButton.md)
- [`SearchField`](SearchField.md)
- [`SelectField`](SelectField.md)
- [`SubmitButton`](SubmitButton.md)
- [`TextareaField`](TextareaField.md)
- [`TextField`](TextField.md)
- [`UrlField`](UrlField.md)

## Type Parameters

### T

`T` *extends* `HTMLInputElement`

## Constructors

### Constructor

> **new BaseField**\<`T`\>(`input`, `opt_label?`, `opt_error?`, `opt_inputBlock?`, `opt_form?`): `BaseField`\<`T`\>

Defined in: [field/baseField.ts:19](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L19)

#### Parameters

##### input

[`Knot`](Knot.md)\<`T`\>

##### opt\_label?

[`Knot`](Knot.md)\<`HTMLElement`\>

##### opt\_error?

[`Knot`](Knot.md)\<`HTMLElement`\>

##### opt\_inputBlock?

[`Knot`](Knot.md)\<`HTMLElement`\>

##### opt\_form?

[`Form`](Form.md)

#### Returns

`BaseField`\<`T`\>

## Properties

### actionContainerKnot

> **actionContainerKnot**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:16](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L16)

***

### disabled

> **disabled**: `boolean`

Defined in: [field/baseField.ts:17](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L17)

***

### error

> **error**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:11](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L11)

***

### errorTooltip

> **errorTooltip**: [`Tooltip`](Tooltip.md)

Defined in: [field/baseField.ts:14](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L14)

***

### form?

> `optional` **form**: [`Form`](Form.md)

Defined in: [field/baseField.ts:13](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L13)

***

### infoContainerKnot

> **infoContainerKnot**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:15](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L15)

***

### input

> **input**: [`Knot`](Knot.md)\<`T`\>

Defined in: [field/baseField.ts:9](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L9)

***

### inputBlock

> **inputBlock**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:12](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L12)

***

### label

> **label**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:10](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L10)

## Methods

### \_getAttributeName()

> `protected` **\_getAttributeName**(`inputName`): `string`

Defined in: [field/baseField.ts:77](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L77)

#### Parameters

##### inputName

`string`

#### Returns

`string`

***

### \_getLabelRequiredText()

> `protected` **\_getLabelRequiredText**(`labelText`): `string`

Defined in: [field/baseField.ts:282](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L282)

#### Parameters

##### labelText

`string`

#### Returns

`string`

***

### \_setAdditionalLabel()

> `protected` **\_setAdditionalLabel**(`label`): `void`

Defined in: [field/baseField.ts:274](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L274)

#### Parameters

##### label

[`Knot`](Knot.md)\<`HTMLElement`\>

#### Returns

`void`

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

***

### eventClick()

> **eventClick**(`knot`): `void`

Defined in: [field/baseField.ts:46](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L46)

#### Parameters

##### knot

[`Knot`](Knot.md)

#### Returns

`void`

***

### exists()

> **exists**(): `boolean`

Defined in: [field/baseField.ts:143](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L143)

#### Returns

`boolean`

***

### existsInput()

> **existsInput**(): `boolean`

Defined in: [field/baseField.ts:147](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L147)

#### Returns

`boolean`

***

### existsInputBlock()

> **existsInputBlock**(): `boolean`

Defined in: [field/baseField.ts:151](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L151)

#### Returns

`boolean`

***

### get()

> **get**(`attribute`): `any`

Defined in: [field/baseField.ts:155](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L155)

#### Parameters

##### attribute

`string`

#### Returns

`any`

***

### getName()

> **getName**(): `string`

Defined in: [field/baseField.ts:67](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L67)

#### Returns

`string`

***

### getPreviousValue()

> **getPreviousValue**(): `any`

Defined in: [field/baseField.ts:62](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L62)

#### Returns

`any`

***

### getValue()

> **getValue**(): `any`

Defined in: [field/baseField.ts:72](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L72)

#### Returns

`any`

***

### hide()

> **hide**(): `void`

Defined in: [field/baseField.ts:210](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L210)

#### Returns

`void`

***

### isDisabled()

> **isDisabled**(): `boolean`

Defined in: [field/baseField.ts:178](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L178)

#### Returns

`boolean`

***

### isEnabled()

> **isEnabled**(): `boolean`

Defined in: [field/baseField.ts:174](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L174)

#### Returns

`boolean`

***

### isRequired()

> **isRequired**(): `boolean`

Defined in: [field/baseField.ts:159](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L159)

#### Returns

`boolean`

***

### isValid()

> **isValid**(): `boolean`

Defined in: [field/baseField.ts:129](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L129)

#### Returns

`boolean`

***

### isValidityValid()

> **isValidityValid**(): `boolean`

Defined in: [field/baseField.ts:123](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L123)

#### Returns

`boolean`

***

### isVisible()

> **isVisible**(): `boolean`

Defined in: [field/baseField.ts:192](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L192)

#### Returns

`boolean`

***

### modelChange()

> **modelChange**(`value`): `void`

Defined in: [field/baseField.ts:58](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L58)

#### Parameters

##### value

`any`

#### Returns

`void`

***

### refresh()

> **refresh**(): `void`

Defined in: [field/baseField.ts:54](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L54)

#### Returns

`void`

***

### render()

> **render**(): `void`

Defined in: [field/baseField.ts:50](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L50)

#### Returns

`void`

***

### setDisabled()

> **setDisabled**(`state`): `void`

Defined in: [field/baseField.ts:182](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L182)

#### Parameters

##### state

`boolean`

#### Returns

`void`

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

***

### setLabel()

> **setLabel**(`text`): `void`

Defined in: [field/baseField.ts:216](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L216)

#### Parameters

##### text

`string`

#### Returns

`void`

***

### setRequired()

> **setRequired**(`state`): `void`

Defined in: [field/baseField.ts:163](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L163)

#### Parameters

##### state

`boolean`

#### Returns

`void`

***

### setValue()

> **setValue**(`value?`): `void`

Defined in: [field/baseField.ts:137](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L137)

#### Parameters

##### value?

`any`

#### Returns

`void`

***

### setVisibility()

> **setVisibility**(`state`): `void`

Defined in: [field/baseField.ts:196](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L196)

#### Parameters

##### state

`boolean`

#### Returns

`void`

***

### show()

> **show**(): `void`

Defined in: [field/baseField.ts:204](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/field/baseField.ts#L204)

#### Returns

`void`
