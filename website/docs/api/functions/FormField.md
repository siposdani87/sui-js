# Function: FormField()

> **FormField**(`inputBlock`, `form`): [`BaseField`](../classes/BaseField.md)\<`HTMLInputElement`\> \| `null`

Defined in: [component/formField.ts:45](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/formField.ts#L45)

## Parameters

### inputBlock

[`Knot`](../classes/Knot.md)\<`HTMLElement` \| `HTMLInputElement`\>

The input block DOM element (may be the input itself or its wrapper div).

### form

[`Form`](../classes/Form.md)

The parent form instance, used for radio button grouping.

## Returns

[`BaseField`](../classes/BaseField.md)\<`HTMLInputElement`\> \| `null`

The created field instance, or null if the input type is unrecognized.

## Description

Factory function that detects an input element's type and creates the
appropriate [BaseField](../classes/BaseField.md) subclass instance. Supports all standard HTML input types
plus custom data-type attributes for location, switch, and icon-toggle fields.

## Example

```ts
const field = FormField(inputBlockKnot, formInstance);
if (field) { field.render(); }
```

## See

 - [Form](../classes/Form.md) for the form component that uses this factory
 - [BaseField](../classes/BaseField.md) for the base class all fields extend
