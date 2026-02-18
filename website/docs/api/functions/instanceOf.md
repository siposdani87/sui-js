# Function: instanceOf()

> **instanceOf**\<`T`\>(`value`, `obj`): `boolean`

Defined in: [utils/operation.ts:375](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L375)

Generic `instanceof` wrapper.

Checks whether a value is an instance of the given constructor or class.

## Type Parameters

### T

`T`

## Parameters

### value

`any`

The value to check.

### obj

`T`

The constructor or class to test against.

## Returns

`boolean`

`true` if `value instanceof obj`.

## Example

```ts
instanceOf(new Date(), Date); // true
instanceOf('hello', String);  // false
```
