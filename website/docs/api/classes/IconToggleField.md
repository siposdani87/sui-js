# Class: IconToggleField

Defined in: [field/iconToggleField.ts:21](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/iconToggleField.ts#L21)

Icon-based toggle field with checked and unchecked icon states.

## Description

Extends [BaseCheckboxField](BaseCheckboxField.md) to render a Material Design Lite
icon toggle that switches between two Material Icons based on the checked state.
The checked and unchecked icons are read from `data-checked` and `data-unchecked`
attributes on the input element.

## Example

```ts
// Input element should have data-checked and data-unchecked attributes:
// <input type="checkbox" data-checked="visibility" data-unchecked="visibility_off" />
const iconToggle = new IconToggleField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
```

## See

[BaseCheckboxField](BaseCheckboxField.md)

## Extends

- [`BaseCheckboxField`](BaseCheckboxField.md)

## Constructors

### Constructor

> **new IconToggleField**(`input`, `label`, `error`, `inputBlock`): `IconToggleField`

Defined in: [field/iconToggleField.ts:37](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/iconToggleField.ts#L37)

Creates a new IconToggleField instance.

#### Parameters

##### input

[`Knot`](Knot.md)\<`HTMLInputElement`\>

The checkbox input element with icon data attributes.

##### label

[`Knot`](Knot.md)

The label element associated with the toggle.

##### error

[`Knot`](Knot.md)

The error message element.

##### inputBlock

[`Knot`](Knot.md)

The container block for the input.

#### Returns

`IconToggleField`

#### Overrides

[`BaseCheckboxField`](BaseCheckboxField.md).[`constructor`](BaseCheckboxField.md#constructor)

## Properties

### actionContainerKnot

> **actionContainerKnot**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:29](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L29)

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`actionContainerKnot`](BaseCheckboxField.md#actioncontainerknot)

***

### checkedIcon

> **checkedIcon**: `string`

Defined in: [field/iconToggleField.ts:23](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/iconToggleField.ts#L23)

#### Description

The Material Icon name shown when the toggle is checked.

***

### dataLabelKnot

> **dataLabelKnot**: [`Knot`](Knot.md)

Defined in: [field/baseCheckboxField.ts:22](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseCheckboxField.ts#L22)

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`dataLabelKnot`](BaseCheckboxField.md#datalabelknot)

***

### disabled

> **disabled**: `boolean`

Defined in: [field/baseField.ts:30](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L30)

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`disabled`](BaseCheckboxField.md#disabled)

***

### error

> **error**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:24](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L24)

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`error`](BaseCheckboxField.md#error)

***

### errorTooltip

> **errorTooltip**: [`Tooltip`](Tooltip.md)

Defined in: [field/baseField.ts:27](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L27)

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`errorTooltip`](BaseCheckboxField.md#errortooltip)

***

### form?

> `optional` **form**: [`Form`](Form.md)

Defined in: [field/baseField.ts:26](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L26)

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`form`](BaseCheckboxField.md#form)

***

### hiddenInput

> **hiddenInput**: [`Knot`](Knot.md)

Defined in: [field/baseCheckboxField.ts:20](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseCheckboxField.ts#L20)

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`hiddenInput`](BaseCheckboxField.md#hiddeninput)

***

### icon

> **icon**: [`Knot`](Knot.md)

Defined in: [field/iconToggleField.ts:27](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/iconToggleField.ts#L27)

#### Description

The icon element rendered inside the toggle label.

***

### infoContainerKnot

> **infoContainerKnot**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:28](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L28)

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`infoContainerKnot`](BaseCheckboxField.md#infocontainerknot)

***

### input

> **input**: [`Knot`](Knot.md)\<`HTMLInputElement`\>

Defined in: [field/baseField.ts:22](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L22)

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`input`](BaseCheckboxField.md#input)

***

### inputBlock

> **inputBlock**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:25](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L25)

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`inputBlock`](BaseCheckboxField.md#inputblock)

***

### label

> **label**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:23](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L23)

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`label`](BaseCheckboxField.md#label)

***

### spanLabel

> **spanLabel**: [`Knot`](Knot.md)

Defined in: [field/baseCheckboxField.ts:21](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseCheckboxField.ts#L21)

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`spanLabel`](BaseCheckboxField.md#spanlabel)

***

### uncheckedIcon

> **uncheckedIcon**: `string`

Defined in: [field/iconToggleField.ts:25](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/iconToggleField.ts#L25)

#### Description

The Material Icon name shown when the toggle is unchecked.

## Methods

### \_change()

> `protected` **\_change**(): `void`

Defined in: [field/iconToggleField.ts:89](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/iconToggleField.ts#L89)

Handles the change event by updating the displayed icon and notifying the model.

#### Returns

`void`

#### Overrides

[`BaseCheckboxField`](BaseCheckboxField.md).[`_change`](BaseCheckboxField.md#_change)

***

### \_getAttributeName()

> `protected` **\_getAttributeName**(`inputName`): `string`

Defined in: [field/baseField.ts:157](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L157)

#### Parameters

##### inputName

`string`

The raw input name attribute value.

#### Returns

`string`

The name converted to dot notation.

#### Description

Converts an HTML input name attribute to dot notation by replacing brackets.

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`_getAttributeName`](BaseCheckboxField.md#_getattributename)

***

### \_getLabelRequiredText()

> `protected` **\_getLabelRequiredText**(`labelText`): `string`

Defined in: [field/baseField.ts:520](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L520)

#### Parameters

##### labelText

`string`

The current label text.

#### Returns

`string`

The label text with or without the required postfix.

#### Description

Appends or removes the required asterisk (*) postfix from the label text.

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`_getLabelRequiredText`](BaseCheckboxField.md#_getlabelrequiredtext)

***

### \_init()

> `protected` **\_init**(): `void`

Defined in: [field/baseCheckboxField.ts:44](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseCheckboxField.ts#L44)

#### Returns

`void`

#### Description

Initializes the checkbox field by locating the hidden input and binding the change event.

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`_init`](BaseCheckboxField.md#_init)

***

### \_setAdditionalLabel()

> `protected` **\_setAdditionalLabel**(`label`): `void`

Defined in: [field/baseField.ts:507](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L507)

#### Parameters

##### label

The label knot to update.

[`Knot`](Knot.md)\<`HTMLElement`\> | `undefined`

#### Returns

`void`

#### Description

Updates the label text with a required indicator and sets up the info tooltip.

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`_setAdditionalLabel`](BaseCheckboxField.md#_setadditionallabel)

***

### checkValidity()

> **checkValidity**(`opt_force?`, `opt_showMessage?`): `void`

Defined in: [field/baseField.ts:196](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L196)

#### Parameters

##### opt\_force?

`boolean` = `false`

Whether to force visual validity updates on the input block.

##### opt\_showMessage?

`boolean` = `true`

Whether to display the validation error message.

#### Returns

`void`

#### Description

Checks the field's validity and optionally displays the validation message.

#### Example

```ts
field.checkValidity();
field.checkValidity(true, false); // force visual update, suppress message
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`checkValidity`](BaseCheckboxField.md#checkvalidity)

***

### eventChange()

> **eventChange**(`value`, `previousValue`): `void`

Defined in: [field/baseField.ts:72](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L72)

#### Parameters

##### value

`any`

The new field value.

##### previousValue

`any`

The previous field value.

#### Returns

`void`

#### Description

Called when the field value changes. Override in subclasses to handle change events.

#### Example

```ts
field.eventChange = (value, previousValue) => {
    console.log('Changed from', previousValue, 'to', value);
};
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`eventChange`](BaseCheckboxField.md#eventchange)

***

### eventClick()

> **eventClick**(`knot`): `void`

Defined in: [field/baseField.ts:84](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L84)

#### Parameters

##### knot

[`Knot`](Knot.md)

The clicked knot element.

#### Returns

`void`

#### Description

Called when the field is clicked. Override in subclasses to handle click events.

#### Example

```ts
field.eventClick = (knot) => {
    console.log('Field clicked', knot);
};
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`eventClick`](BaseCheckboxField.md#eventclick)

***

### exists()

> **exists**(): `boolean`

Defined in: [field/baseField.ts:273](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L273)

#### Returns

`boolean`

True if the field exists.

#### Description

Checks whether the field exists in the DOM (either the input block or the input itself).

#### Example

```ts
if (field.exists()) {
    field.render();
}
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`exists`](BaseCheckboxField.md#exists)

***

### existsInput()

> **existsInput**(): `boolean`

Defined in: [field/baseField.ts:285](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L285)

#### Returns

`boolean`

True if the input element exists.

#### Description

Checks whether the input element exists in the DOM.

#### Example

```ts
if (field.existsInput()) {
    field.setValue('value');
}
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`existsInput`](BaseCheckboxField.md#existsinput)

***

### existsInputBlock()

> **existsInputBlock**(): `boolean`

Defined in: [field/baseField.ts:297](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L297)

#### Returns

`boolean`

True if the input block exists.

#### Description

Checks whether the input block container exists in the DOM.

#### Example

```ts
if (field.existsInputBlock()) {
    field.show();
}
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`existsInputBlock`](BaseCheckboxField.md#existsinputblock)

***

### get()

> **get**(`attribute`): `any`

Defined in: [field/baseField.ts:308](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L308)

#### Parameters

##### attribute

`string`

The attribute name to retrieve.

#### Returns

`any`

The attribute value.

#### Description

Gets an attribute value from the underlying input element.

#### Example

```ts
const type = field.get('type'); // 'text'
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`get`](BaseCheckboxField.md#get)

***

### getName()

> **getName**(): `string`

Defined in: [field/baseField.ts:136](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L136)

#### Returns

`string`

The field name in dot notation (e.g., 'user.address.city').

#### Description

Returns the field's name derived from the input's name attribute, converted to dot notation.

#### Example

```ts
// For input with name="user[address][city]"
const name = field.getName(); // 'user.address.city'
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`getName`](BaseCheckboxField.md#getname)

***

### getPreviousValue()

> **getPreviousValue**(): `any`

Defined in: [field/baseField.ts:124](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L124)

#### Returns

`any`

The previous field value, or undefined by default.

#### Description

Returns the previous value of the field before the last change. Override in subclasses to track value history.

#### Example

```ts
const prev = field.getPreviousValue();
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`getPreviousValue`](BaseCheckboxField.md#getpreviousvalue)

***

### getValue()

> **getValue**(): `any`

Defined in: [field/baseCheckboxField.ts:69](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseCheckboxField.ts#L69)

#### Returns

`any`

The type-cast value of the checked or hidden input.

#### Description

Returns the field's value based on the checked state. Returns the input value if checked, or the hidden input value if unchecked.

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`getValue`](BaseCheckboxField.md#getvalue)

***

### hide()

> **hide**(): `void`

Defined in: [field/baseField.ts:423](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L423)

#### Returns

`void`

#### Description

Hides the field if it is currently visible.

#### Example

```ts
field.hide();
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`hide`](BaseCheckboxField.md#hide)

***

### isDisabled()

> **isDisabled**(): `boolean`

Defined in: [field/baseField.ts:361](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L361)

#### Returns

`boolean`

True if the field is disabled.

#### Description

Checks whether the field is disabled.

#### Example

```ts
if (field.isDisabled()) {
    console.log('Field is disabled');
}
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`isDisabled`](BaseCheckboxField.md#isdisabled)

***

### isEnabled()

> **isEnabled**(): `boolean`

Defined in: [field/baseField.ts:349](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L349)

#### Returns

`boolean`

True if the field is enabled (not disabled).

#### Description

Checks whether the field is enabled.

#### Example

```ts
if (field.isEnabled()) {
    field.setValue('enabled');
}
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`isEnabled`](BaseCheckboxField.md#isenabled)

***

### isRequired()

> **isRequired**(): `boolean`

Defined in: [field/baseField.ts:320](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L320)

#### Returns

`boolean`

True if the field is required.

#### Description

Checks whether the field is required.

#### Example

```ts
if (field.isRequired()) {
    console.log('This field must be filled');
}
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`isRequired`](BaseCheckboxField.md#isrequired)

***

### isValid()

> **isValid**(): `boolean`

Defined in: [field/baseField.ts:241](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L241)

#### Returns

`boolean`

True if the field is valid.

#### Description

Checks whether the field is valid. By default delegates to [isValidityValid](#isvalidityvalid). Override for custom validation logic.

#### Example

```ts
if (field.isValid()) {
    form.submit();
}
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`isValid`](BaseCheckboxField.md#isvalid)

***

### isValidityValid()

> **isValidityValid**(): `boolean`

Defined in: [field/baseField.ts:227](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L227)

#### Returns

`boolean`

True if the input's validity.valid property is true.

#### Description

Checks whether the input element's native validity state is valid.

#### Example

```ts
if (field.isValidityValid()) {
    console.log('Native validation passed');
}
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`isValidityValid`](BaseCheckboxField.md#isvalidityvalid)

***

### isVisible()

> **isVisible**(): `boolean`

Defined in: [field/baseField.ts:389](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L389)

#### Returns

`boolean`

True if the field is visible.

#### Description

Checks whether the field is visible (not hidden).

#### Example

```ts
if (field.isVisible()) {
    console.log('Field is shown');
}
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`isVisible`](BaseCheckboxField.md#isvisible)

***

### modelChange()

> **modelChange**(`value`): `void`

Defined in: [field/baseField.ts:114](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L114)

#### Parameters

##### value

`any`

The new model value.

#### Returns

`void`

#### Description

Called when the model value changes. Override to synchronize the field with an external data model.

#### Example

```ts
field.modelChange = (value) => {
    model.set(field.getName(), value);
};
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`modelChange`](BaseCheckboxField.md#modelchange)

***

### refresh()

> **refresh**(): `void`

Defined in: [field/baseCheckboxField.ts:133](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseCheckboxField.ts#L133)

#### Returns

`void`

#### Description

Refreshes the field's visual state by updating the data label text and MDL styling.

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`refresh`](BaseCheckboxField.md#refresh)

***

### render()

> **render**(): `void`

Defined in: [field/iconToggleField.ts:49](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/iconToggleField.ts#L49)

Renders the icon toggle with MDL classes, icon element, and label span.

#### Returns

`void`

#### Overrides

[`BaseCheckboxField`](BaseCheckboxField.md).[`render`](BaseCheckboxField.md#render)

***

### setDisabled()

> **setDisabled**(`state`): `void`

Defined in: [field/baseCheckboxField.ts:105](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseCheckboxField.ts#L105)

#### Parameters

##### state

`boolean`

True to disable the field, false to enable it.

#### Returns

`void`

#### Description

Sets the disabled state, updating both the input and the label/input block styling.

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`setDisabled`](BaseCheckboxField.md#setdisabled)

***

### setError()

> **setError**(`opt_message?`, `opt_isCustomError?`): `void`

Defined in: [field/baseField.ts:175](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L175)

#### Parameters

##### opt\_message?

`string` = `''`

The error message to display, or empty string to clear.

##### opt\_isCustomError?

`boolean` = `false`

Whether this is a custom (server-side) error.

#### Returns

`void`

#### Description

Sets or clears the validation error message on the field.

#### Example

```ts
field.setError('This field is required');
field.setError(''); // clears the error
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`setError`](BaseCheckboxField.md#seterror)

***

### setLabel()

> **setLabel**(`text`): `void`

Defined in: [field/baseCheckboxField.ts:123](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseCheckboxField.ts#L123)

#### Parameters

##### text

`string`

The new label text.

#### Returns

`void`

#### Description

Sets the label text on the span label element instead of the main label.

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`setLabel`](BaseCheckboxField.md#setlabel)

***

### setRequired()

> **setRequired**(`state`): `void`

Defined in: [field/baseField.ts:330](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L330)

#### Parameters

##### state

`boolean`

True to make the field required, false to make it optional.

#### Returns

`void`

#### Description

Sets the required state of the field, updates validation, and refreshes the label.

#### Example

```ts
field.setRequired(true);
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`setRequired`](BaseCheckboxField.md#setrequired)

***

### setValue()

> **setValue**(`value`): `void`

Defined in: [field/iconToggleField.ts:104](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/iconToggleField.ts#L104)

Sets the toggle value and updates the displayed icon accordingly.

#### Parameters

##### value

The value to set.

`string` | `number` | `boolean` | `object` | `Function` | `any`[] | `null` | `undefined`

#### Returns

`void`

#### Overrides

[`BaseCheckboxField`](BaseCheckboxField.md).[`setValue`](BaseCheckboxField.md#setvalue)

***

### setVisibility()

> **setVisibility**(`state`): `void`

Defined in: [field/baseField.ts:399](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L399)

#### Parameters

##### state

`boolean`

True to show the field, false to hide it.

#### Returns

`void`

#### Description

Sets the visibility of the field.

#### Example

```ts
field.setVisibility(false); // hides the field
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`setVisibility`](BaseCheckboxField.md#setvisibility)

***

### show()

> **show**(): `void`

Defined in: [field/baseField.ts:412](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L412)

#### Returns

`void`

#### Description

Shows the field if it is currently hidden.

#### Example

```ts
field.show();
```

#### Inherited from

[`BaseCheckboxField`](BaseCheckboxField.md).[`show`](BaseCheckboxField.md#show)
