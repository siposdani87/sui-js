# Class: BaseField\<T\>

Defined in: [field/baseField.ts:21](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L21)

## Description

Abstract base class for all form fields. Handles validation, labeling,
visibility, enable/disable state, and error display.

## Example

```ts
// Typically extended by concrete field classes:
const textField = new TextField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
textField.setValue('Hello');
textField.checkValidity();
```

## See

 - [Form](Form.md)
 - [Tooltip](Tooltip.md)
 - [Knot](Knot.md)

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

Defined in: [field/baseField.ts:40](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L40)

#### Parameters

##### input

[`Knot`](Knot.md)\<`T`\>

The input element wrapped in a Knot.

##### opt\_label?

[`Knot`](Knot.md)\<`HTMLElement`\>

The label element wrapped in a Knot.

##### opt\_error?

[`Knot`](Knot.md)\<`HTMLElement`\>

The error element wrapped in a Knot.

##### opt\_inputBlock?

[`Knot`](Knot.md)\<`HTMLElement`\>

The input block container wrapped in a Knot.

##### opt\_form?

[`Form`](Form.md)

The parent form instance.

#### Returns

`BaseField`\<`T`\>

#### Description

Creates a new BaseField instance with the given input, label, error, and input block knots.

## Properties

### actionContainerKnot

> **actionContainerKnot**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:29](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L29)

***

### disabled

> **disabled**: `boolean`

Defined in: [field/baseField.ts:30](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L30)

***

### error

> **error**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:24](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L24)

***

### errorTooltip

> **errorTooltip**: [`Tooltip`](Tooltip.md)

Defined in: [field/baseField.ts:27](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L27)

***

### form?

> `optional` **form**: [`Form`](Form.md)

Defined in: [field/baseField.ts:26](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L26)

***

### infoContainerKnot

> **infoContainerKnot**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:28](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L28)

***

### input

> **input**: [`Knot`](Knot.md)\<`T`\>

Defined in: [field/baseField.ts:22](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L22)

***

### inputBlock

> **inputBlock**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:25](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L25)

***

### label

> **label**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:23](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L23)

## Methods

### \_getAttributeName()

> `protected` **\_getAttributeName**(`inputName`): `string`

Defined in: [field/baseField.ts:157](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L157)

#### Parameters

##### inputName

`string`

The raw input name attribute value.

#### Returns

`string`

The name converted to dot notation.

#### Description

Converts an HTML input name attribute to dot notation by replacing brackets.

***

### \_getLabelRequiredText()

> `protected` **\_getLabelRequiredText**(`labelText`): `string`

Defined in: [field/baseField.ts:520](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L520)

#### Parameters

##### labelText

`string`

The current label text.

#### Returns

`string`

The label text with or without the required postfix.

#### Description

Appends or removes the required asterisk (*) postfix from the label text.

***

### \_setAdditionalLabel()

> `protected` **\_setAdditionalLabel**(`label`): `void`

Defined in: [field/baseField.ts:507](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L507)

#### Parameters

##### label

The label knot to update.

[`Knot`](Knot.md)\<`HTMLElement`\> | `undefined`

#### Returns

`void`

#### Description

Updates the label text with a required indicator and sets up the info tooltip.

***

### checkValidity()

> **checkValidity**(`opt_force?`, `opt_showMessage?`): `void`

Defined in: [field/baseField.ts:196](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L196)

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

***

### eventChange()

> **eventChange**(`value`, `previousValue`): `void`

Defined in: [field/baseField.ts:72](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L72)

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

***

### eventClick()

> **eventClick**(`knot`): `void`

Defined in: [field/baseField.ts:84](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L84)

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

***

### exists()

> **exists**(): `boolean`

Defined in: [field/baseField.ts:273](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L273)

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

***

### existsInput()

> **existsInput**(): `boolean`

Defined in: [field/baseField.ts:285](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L285)

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

***

### existsInputBlock()

> **existsInputBlock**(): `boolean`

Defined in: [field/baseField.ts:297](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L297)

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

***

### get()

> **get**(`attribute`): `any`

Defined in: [field/baseField.ts:308](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L308)

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

***

### getName()

> **getName**(): `string`

Defined in: [field/baseField.ts:136](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L136)

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

***

### getPreviousValue()

> **getPreviousValue**(): `any`

Defined in: [field/baseField.ts:124](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L124)

#### Returns

`any`

The previous field value, or undefined by default.

#### Description

Returns the previous value of the field before the last change. Override in subclasses to track value history.

#### Example

```ts
const prev = field.getPreviousValue();
```

***

### getValue()

> **getValue**(): `any`

Defined in: [field/baseField.ts:147](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L147)

#### Returns

`any`

The type-cast field value.

#### Description

Returns the current value of the field, type-cast from the input's string value.

#### Example

```ts
const value = field.getValue();
```

***

### hide()

> **hide**(): `void`

Defined in: [field/baseField.ts:423](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L423)

#### Returns

`void`

#### Description

Hides the field if it is currently visible.

#### Example

```ts
field.hide();
```

***

### isDisabled()

> **isDisabled**(): `boolean`

Defined in: [field/baseField.ts:361](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L361)

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

***

### isEnabled()

> **isEnabled**(): `boolean`

Defined in: [field/baseField.ts:349](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L349)

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

***

### isRequired()

> **isRequired**(): `boolean`

Defined in: [field/baseField.ts:320](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L320)

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

***

### isValid()

> **isValid**(): `boolean`

Defined in: [field/baseField.ts:241](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L241)

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

***

### isValidityValid()

> **isValidityValid**(): `boolean`

Defined in: [field/baseField.ts:227](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L227)

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

***

### isVisible()

> **isVisible**(): `boolean`

Defined in: [field/baseField.ts:389](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L389)

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

***

### modelChange()

> **modelChange**(`value`): `void`

Defined in: [field/baseField.ts:114](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L114)

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

***

### refresh()

> **refresh**(): `void`

Defined in: [field/baseField.ts:102](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L102)

#### Returns

`void`

#### Description

Refreshes the field's visual state. Override in subclasses to update styling or re-apply MDL upgrades.

#### Example

```ts
field.refresh();
```

***

### render()

> **render**(): `void`

Defined in: [field/baseField.ts:93](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L93)

#### Returns

`void`

#### Description

Renders the field's DOM structure and applies MDL styling. Override in subclasses to provide specific rendering.

#### Example

```ts
field.render();
```

***

### setDisabled()

> **setDisabled**(`state`): `void`

Defined in: [field/baseField.ts:371](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L371)

#### Parameters

##### state

`boolean`

True to disable the field, false to enable it.

#### Returns

`void`

#### Description

Sets the disabled state of the field and updates validation.

#### Example

```ts
field.setDisabled(true);
```

***

### setError()

> **setError**(`opt_message?`, `opt_isCustomError?`): `void`

Defined in: [field/baseField.ts:175](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L175)

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

***

### setLabel()

> **setLabel**(`text`): `void`

Defined in: [field/baseField.ts:435](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L435)

#### Parameters

##### text

`string`

The new label text.

#### Returns

`void`

#### Description

Sets the label text and updates the additional label (required indicator, info tooltip).

#### Example

```ts
field.setLabel('Email Address');
```

***

### setRequired()

> **setRequired**(`state`): `void`

Defined in: [field/baseField.ts:330](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L330)

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

***

### setValue()

> **setValue**(`value?`): `void`

Defined in: [field/baseField.ts:259](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L259)

#### Parameters

##### value?

`any`

The value to set.

#### Returns

`void`

#### Description

Sets the field's value on the underlying input element and triggers a change event.

#### Example

```ts
field.setValue('new value');
```

***

### setVisibility()

> **setVisibility**(`state`): `void`

Defined in: [field/baseField.ts:399](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L399)

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

***

### show()

> **show**(): `void`

Defined in: [field/baseField.ts:412](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L412)

#### Returns

`void`

#### Description

Shows the field if it is currently hidden.

#### Example

```ts
field.show();
```
