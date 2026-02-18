# Function: parseInputBlock()

> **parseInputBlock**(`inputBlock`): `object`

Defined in: [component/formField.ts:68](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/formField.ts#L68)

## Parameters

### inputBlock

[`Knot`](../classes/Knot.md)\<`HTMLElement` \| `HTMLInputElement`\>

The input block DOM element to parse.

## Returns

`object`

The extracted input, label, and error elements.

### error

> **error**: [`Knot`](../classes/Knot.md)\<`HTMLElement`\> \| `undefined`

### input

> **input**: [`Knot`](../classes/Knot.md)\<`HTMLInputElement`\>

### label

> **label**: [`Knot`](../classes/Knot.md)\<`HTMLElement`\> \| `undefined`

## Description

Extracts the input, label, and error elements from a form input block.
Handles both raw input elements and wrapper div structures, creating error spans as needed.

## Example

```ts
const { input, label, error } = parseInputBlock(inputBlockKnot);
```

## See

[FormField](FormField.md) for the factory that calls this function
