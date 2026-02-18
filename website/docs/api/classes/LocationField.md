# Class: LocationField

Defined in: [field/locationField.ts:25](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/locationField.ts#L25)

Location picker field with an embedded [GoogleMap](GoogleMap.md), geocoding search,
and manual latitude/longitude inputs.  The user can search for an address,
click the map, or drag a marker to set the location.

## Example

```ts
const input = new Query<HTMLInputElement>('input.location', formKnot).getKnot();
const field = new LocationField(input, label, error, inputBlock);
field.render();
field.eventSearch = (address) => field.search(address);
```

## See

 - [BaseField](BaseField.md)
 - [GoogleMap](GoogleMap.md)

## Extends

- [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

## Constructors

### Constructor

> **new LocationField**(`input`, `label`, `error`, `inputBlock`): `LocationField`

Defined in: [field/locationField.ts:47](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/locationField.ts#L47)

#### Parameters

##### input

[`Knot`](Knot.md)\<`HTMLInputElement`\>

The underlying `<input>` element wrapped in a [Knot](Knot.md).

##### label

[`Knot`](Knot.md)

The associated label element.

##### error

[`Knot`](Knot.md)

The element used to display validation errors.

##### inputBlock

[`Knot`](Knot.md)

The block-level container wrapping the entire field.

#### Returns

`LocationField`

#### Overrides

[`BaseField`](BaseField.md).[`constructor`](BaseField.md#constructor)

## Properties

### actionContainerKnot

> **actionContainerKnot**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:29](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L29)

#### Inherited from

[`BaseField`](BaseField.md).[`actionContainerKnot`](BaseField.md#actioncontainerknot)

***

### advancedButton

> **advancedButton**: [`Knot`](Knot.md)

Defined in: [field/locationField.ts:29](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/locationField.ts#L29)

Button element that toggles the advanced lat/lng inputs.

***

### advancedKnot

> **advancedKnot**: [`Knot`](Knot.md)

Defined in: [field/locationField.ts:35](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/locationField.ts#L35)

Container for the advanced latitude/longitude input elements.

***

### disabled

> **disabled**: `boolean`

Defined in: [field/baseField.ts:30](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L30)

#### Inherited from

[`BaseField`](BaseField.md).[`disabled`](BaseField.md#disabled)

***

### error

> **error**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:24](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L24)

#### Inherited from

[`BaseField`](BaseField.md).[`error`](BaseField.md#error)

***

### errorTooltip

> **errorTooltip**: [`Tooltip`](Tooltip.md)

Defined in: [field/baseField.ts:27](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L27)

#### Inherited from

[`BaseField`](BaseField.md).[`errorTooltip`](BaseField.md#errortooltip)

***

### form?

> `optional` **form**: [`Form`](Form.md)

Defined in: [field/baseField.ts:26](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L26)

#### Inherited from

[`BaseField`](BaseField.md).[`form`](BaseField.md#form)

***

### icon

> **icon**: [`IconOptions`](../type-aliases/IconOptions.md)

Defined in: [field/locationField.ts:27](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/locationField.ts#L27)

Icon options for the map marker, read from the input's `data-icon` attribute.

***

### infoContainerKnot

> **infoContainerKnot**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:28](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L28)

#### Inherited from

[`BaseField`](BaseField.md).[`infoContainerKnot`](BaseField.md#infocontainerknot)

***

### input

> **input**: [`Knot`](Knot.md)\<`HTMLInputElement`\>

Defined in: [field/baseField.ts:22](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L22)

#### Inherited from

[`BaseField`](BaseField.md).[`input`](BaseField.md#input)

***

### inputBlock

> **inputBlock**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:25](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L25)

#### Inherited from

[`BaseField`](BaseField.md).[`inputBlock`](BaseField.md#inputblock)

***

### label

> **label**: [`Knot`](Knot.md)

Defined in: [field/baseField.ts:23](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L23)

#### Inherited from

[`BaseField`](BaseField.md).[`label`](BaseField.md#label)

***

### latitudeInput

> **latitudeInput**: [`Knot`](Knot.md)\<`HTMLInputElement`\>

Defined in: [field/locationField.ts:37](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/locationField.ts#L37)

Text input for manual latitude entry.

***

### longitudeInput

> **longitudeInput**: [`Knot`](Knot.md)\<`HTMLInputElement`\>

Defined in: [field/locationField.ts:39](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/locationField.ts#L39)

Text input for manual longitude entry.

***

### map

> **map**: [`GoogleMap`](GoogleMap.md)

Defined in: [field/locationField.ts:31](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/locationField.ts#L31)

Embedded [GoogleMap](GoogleMap.md) instance for location selection.

***

### mapLockKnot

> **mapLockKnot**: [`Knot`](Knot.md)

Defined in: [field/locationField.ts:33](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/locationField.ts#L33)

Overlay element that prevents map interaction when the field is disabled.

## Methods

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

[`BaseField`](BaseField.md).[`_getAttributeName`](BaseField.md#_getattributename)

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

[`BaseField`](BaseField.md).[`_getLabelRequiredText`](BaseField.md#_getlabelrequiredtext)

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

[`BaseField`](BaseField.md).[`_setAdditionalLabel`](BaseField.md#_setadditionallabel)

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

[`BaseField`](BaseField.md).[`checkValidity`](BaseField.md#checkvalidity)

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

[`BaseField`](BaseField.md).[`eventChange`](BaseField.md#eventchange)

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

[`BaseField`](BaseField.md).[`eventClick`](BaseField.md#eventclick)

***

### eventSearch()

> **eventSearch**(`address`): `void`

Defined in: [field/locationField.ts:448](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/locationField.ts#L448)

Overridable event callback invoked when the user triggers an address
search via Enter key or the search button.

#### Parameters

##### address

`string`

The address string entered by the user.

#### Returns

`void`

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

[`BaseField`](BaseField.md).[`exists`](BaseField.md#exists)

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

[`BaseField`](BaseField.md).[`existsInput`](BaseField.md#existsinput)

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

[`BaseField`](BaseField.md).[`existsInputBlock`](BaseField.md#existsinputblock)

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

[`BaseField`](BaseField.md).[`get`](BaseField.md#get)

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

[`BaseField`](BaseField.md).[`getName`](BaseField.md#getname)

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

[`BaseField`](BaseField.md).[`getPreviousValue`](BaseField.md#getpreviousvalue)

***

### getValue()

> **getValue**(): `any`

Defined in: [field/locationField.ts:437](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/locationField.ts#L437)

Returns the current location object stored in the input's data attribute.

#### Returns

`any`

The location object with `address`, `latitude`, and `longitude`.

#### Overrides

[`BaseField`](BaseField.md).[`getValue`](BaseField.md#getvalue)

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

[`BaseField`](BaseField.md).[`hide`](BaseField.md#hide)

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

[`BaseField`](BaseField.md).[`isDisabled`](BaseField.md#isdisabled)

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

[`BaseField`](BaseField.md).[`isEnabled`](BaseField.md#isenabled)

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

[`BaseField`](BaseField.md).[`isRequired`](BaseField.md#isrequired)

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

[`BaseField`](BaseField.md).[`isValid`](BaseField.md#isvalid)

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

[`BaseField`](BaseField.md).[`isValidityValid`](BaseField.md#isvalidityvalid)

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

[`BaseField`](BaseField.md).[`isVisible`](BaseField.md#isvisible)

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

[`BaseField`](BaseField.md).[`modelChange`](BaseField.md#modelchange)

***

### refresh()

> **refresh**(): `void`

Defined in: [field/locationField.ts:184](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/locationField.ts#L184)

Toggles the map lock overlay based on the disabled state and upgrades
MDL components.

#### Returns

`void`

#### Overrides

[`BaseField`](BaseField.md).[`refresh`](BaseField.md#refresh)

***

### render()

> **render**(): `void`

Defined in: [field/locationField.ts:160](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/locationField.ts#L160)

Applies MDL text-field classes, renders the advanced inputs, map, and
default value, then refreshes the visual state.

#### Returns

`void`

#### Overrides

[`BaseField`](BaseField.md).[`render`](BaseField.md#render)

***

### search()

> **search**(`address`): `void`

Defined in: [field/locationField.ts:137](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/locationField.ts#L137)

Geocodes the given address using the embedded map and updates the
field value with the first result.

#### Parameters

##### address

`string`

The address string to geocode.

#### Returns

`void`

#### Example

```ts
locationField.search('Budapest, Hungary');
```

***

### setCustomMapStyle()

> **setCustomMapStyle**(`mapTypeId`, `mapTypeName`, `mapStyles`): `void`

Defined in: [field/locationField.ts:331](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/locationField.ts#L331)

Applies a custom styled map type to the embedded map.

#### Parameters

##### mapTypeId

`string`

Unique identifier for the custom map type.

##### mapTypeName

`string`

Display name shown in the map type selector.

##### mapStyles

(`MapTypeStyle` \| `null`)[]

Array of Google Maps style rules.

#### Returns

`void`

#### Example

```ts
locationField.setCustomMapStyle('dark', 'Dark Mode', darkStyles);
```

***

### setDisabled()

> **setDisabled**(`state`): `void`

Defined in: [field/baseField.ts:371](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L371)

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

[`BaseField`](BaseField.md).[`setError`](BaseField.md#seterror)

***

### setLabel()

> **setLabel**(`text`): `void`

Defined in: [field/baseField.ts:435](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/baseField.ts#L435)

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

### setMapType()

> **setMapType**(`mapTypeId`): `void`

Defined in: [field/locationField.ts:317](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/locationField.ts#L317)

Changes the map type (e.g. satellite, terrain) on the embedded map.

#### Parameters

##### mapTypeId

`string`

The Google Maps map type identifier.

#### Returns

`void`

#### Example

```ts
locationField.setMapType('satellite');
```

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

[`BaseField`](BaseField.md).[`setRequired`](BaseField.md#setrequired)

***

### setValue()

> **setValue**(`value`): `void`

Defined in: [field/locationField.ts:394](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/locationField.ts#L394)

Sets the location value, updates the advanced inputs, repositions the
map center and marker, and triggers a change event.

#### Parameters

##### value

A location object with `address`, `latitude`, and `longitude` keys.

`string` | `number` | `boolean` | `object` | `Function` | `any`[] | `null` | `undefined`

#### Returns

`void`

#### Overrides

[`BaseField`](BaseField.md).[`setValue`](BaseField.md#setvalue)

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

[`BaseField`](BaseField.md).[`setVisibility`](BaseField.md#setvisibility)

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

[`BaseField`](BaseField.md).[`show`](BaseField.md#show)

***

### updatePosition()

> **updatePosition**(`latitude`, `longitude`): `void`

Defined in: [field/locationField.ts:367](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/field/locationField.ts#L367)

Updates the stored latitude/longitude and refreshes the marker.

#### Parameters

##### latitude

The new latitude, or `null` to clear.

`number` | `null`

##### longitude

The new longitude, or `null` to clear.

`number` | `null`

#### Returns

`void`

#### Example

```ts
locationField.updatePosition(47.4979, 19.0402);
```
