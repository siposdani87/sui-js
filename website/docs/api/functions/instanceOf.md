# Function: instanceOf()

> **instanceOf**\<`T`\>(`value`, `obj`): `boolean`

Defined in: [utils/operation.ts:375](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L375)

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
