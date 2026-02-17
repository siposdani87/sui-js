# Type Alias: TableCalculation\<T\>

> **TableCalculation**\<`T`\> = \{ \[key in string\]: (item: T, index: number, parentKnot: Knot) =\> Knot\[\] \| Knot \| string \}

Defined in: [component/table.ts:33](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L33)

## Type Parameters

### T

`T` = [`Objekt`](../classes/Objekt.md)

The row data type, defaults to [Objekt](../classes/Objekt.md).

## Description

Maps column names to calculation functions that produce cell content.
Each function receives the row item, its index, and the parent DOM node,
and returns one or more [Knot](../classes/Knot.md) elements or a plain string.
