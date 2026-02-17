# Function: isPureObject()

> **isPureObject**(`value`): `value is object`

Defined in: [utils/operation.ts:307](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L307)

Type guard that checks whether a value is a plain JavaScript object.

Unlike [isObject](isObject.md), this excludes `null`, `Date` instances, and arrays,
returning `true` only for plain object literals and `Object.create` results.

## Parameters

### value

`any`

The value to check.

## Returns

`value is object`

`true` if the value is a plain object.

## Example

```ts
isPureObject({ a: 1 }); // true
isPureObject([1, 2]);   // false
isPureObject(null);     // false
isPureObject(new Date); // false
```
