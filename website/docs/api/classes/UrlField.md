# Class: UrlField

Defined in: [field/urlField.ts:16](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/urlField.ts#L16)

## Description

URL input field with optional protocol prefix display (e.g., "https://").

## Example

```ts
const urlField = new UrlField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
urlField.render();
```

## See

[BaseField](BaseField.md)

## Extends

- [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

## Constructors

### Constructor

> **new UrlField**(`input`, `label`, `error`, `inputBlock`): `UrlField`

Defined in: [field/urlField.ts:26](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/urlField.ts#L26)

#### Parameters

##### input

[`Knot`](Knot.md)\<`HTMLInputElement`\>

The URL input element.

##### label

[`Knot`](Knot.md)

The label element.

##### error

[`Knot`](Knot.md)

The error message element.

##### inputBlock

[`Knot`](Knot.md)

The container block element.

#### Returns

`UrlField`

#### Description

Creates a new UrlField instance.

#### Overrides

[`BaseField`](BaseField.md).[`constructor`](BaseField.md#constructor)

## Properties

### actionContainerKnot

> **actionContainerKnot**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:29](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L29)

#### Inherited from

[`BaseField`](BaseField.md).[`actionContainerKnot`](BaseField.md#actioncontainerknot)

***

### disabled

> **disabled**: `boolean`

Defined in: [field/baseField.ts:30](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L30)

#### Inherited from

[`BaseField`](BaseField.md).[`disabled`](BaseField.md#disabled)

***

### error

> **error**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:24](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L24)

#### Inherited from

[`BaseField`](BaseField.md).[`error`](BaseField.md#error)

***

### errorTooltip

> **errorTooltip**: [`Tooltip`](Tooltip.md)

Defined in: [field/baseField.ts:27](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L27)

#### Inherited from

[`BaseField`](BaseField.md).[`errorTooltip`](BaseField.md#errortooltip)

***

### form?

> `optional` **form**: [`Form`](Form.md)

Defined in: [field/baseField.ts:26](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L26)

#### Inherited from

[`BaseField`](BaseField.md).[`form`](BaseField.md#form)

***

### infoContainerKnot

> **infoContainerKnot**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:28](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L28)

#### Inherited from

[`BaseField`](BaseField.md).[`infoContainerKnot`](BaseField.md#infocontainerknot)

***

### input

> **input**: [`Knot`](Knot.md)\<`HTMLInputElement`\>

Defined in: [field/baseField.ts:22](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L22)

#### Inherited from

[`BaseField`](BaseField.md).[`input`](BaseField.md#input)

***

### inputBlock

> **inputBlock**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:25](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L25)

#### Inherited from

[`BaseField`](BaseField.md).[`inputBlock`](BaseField.md#inputblock)

***

### label

> **label**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:23](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/baseField.ts#L23)

#### Inherited from

[`BaseField`](BaseField.md).[`label`](BaseField.md#label)

***

### protocol

> **protocol**: `string`

Defined in: [field/urlField.ts:17](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/urlField.ts#L17)

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

#### Inherited from

[`BaseField`](BaseField.md).[`_getAttributeName`](BaseField.md#_getattributename)

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

#### Inherited from

[`BaseField`](BaseField.md).[`_getLabelRequiredText`](BaseField.md#_getlabelrequiredtext)

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

#### Inherited from

[`BaseField`](BaseField.md).[`_setAdditionalLabel`](BaseField.md#_setadditionallabel)

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

#### Inherited from

[`BaseField`](BaseField.md).[`checkValidity`](BaseField.md#checkvalidity)

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

#### Inherited from

[`BaseField`](BaseField.md).[`eventChange`](BaseField.md#eventchange)

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

#### Inherited from

[`BaseField`](BaseField.md).[`eventClick`](BaseField.md#eventclick)

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

#### Inherited from

[`BaseField`](BaseField.md).[`exists`](BaseField.md#exists)

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

#### Inherited from

[`BaseField`](BaseField.md).[`existsInput`](BaseField.md#existsinput)

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

#### Inherited from

[`BaseField`](BaseField.md).[`existsInputBlock`](BaseField.md#existsinputblock)

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

#### Inherited from

[`BaseField`](BaseField.md).[`get`](BaseField.md#get)

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

#### Inherited from

[`BaseField`](BaseField.md).[`getName`](BaseField.md#getname)

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

#### Inherited from

[`BaseField`](BaseField.md).[`getPreviousValue`](BaseField.md#getpreviousvalue)

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

#### Inherited from

[`BaseField`](BaseField.md).[`getValue`](BaseField.md#getvalue)

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

#### Inherited from

[`BaseField`](BaseField.md).[`hide`](BaseField.md#hide)

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

#### Inherited from

[`BaseField`](BaseField.md).[`isDisabled`](BaseField.md#isdisabled)

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

#### Inherited from

[`BaseField`](BaseField.md).[`isEnabled`](BaseField.md#isenabled)

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

#### Inherited from

[`BaseField`](BaseField.md).[`isRequired`](BaseField.md#isrequired)

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

#### Inherited from

[`BaseField`](BaseField.md).[`isValid`](BaseField.md#isvalid)

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

#### Inherited from

[`BaseField`](BaseField.md).[`isValidityValid`](BaseField.md#isvalidityvalid)

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

#### Inherited from

[`BaseField`](BaseField.md).[`isVisible`](BaseField.md#isvisible)

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

#### Inherited from

[`BaseField`](BaseField.md).[`modelChange`](BaseField.md#modelchange)

***

### refresh()

> **refresh**(): `void`

Defined in: [field/urlField.ts:86](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/urlField.ts#L86)

#### Returns

`void`

#### Description

Marks the field as invalid when required and empty, then upgrades MDL components.

#### Overrides

[`BaseField`](BaseField.md).[`refresh`](BaseField.md#refresh)

***

### render()

> **render**(): `void`

Defined in: [field/urlField.ts:61](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/field/urlField.ts#L61)

#### Returns

`void`

#### Description

Applies MDL textfield classes and renders the protocol prefix span if configured.

#### Overrides

[`BaseField`](BaseField.md).[`render`](BaseField.md#render)

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

#### Inherited from

[`BaseField`](BaseField.md).[`setDisabled`](BaseField.md#setdisabled)

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

#### Inherited from

[`BaseField`](BaseField.md).[`setError`](BaseField.md#seterror)

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

#### Inherited from

[`BaseField`](BaseField.md).[`setLabel`](BaseField.md#setlabel)

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

#### Inherited from

[`BaseField`](BaseField.md).[`setRequired`](BaseField.md#setrequired)

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

#### Inherited from

[`BaseField`](BaseField.md).[`setValue`](BaseField.md#setvalue)

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

#### Inherited from

[`BaseField`](BaseField.md).[`setVisibility`](BaseField.md#setvisibility)

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

#### Inherited from

[`BaseField`](BaseField.md).[`show`](BaseField.md#show)
