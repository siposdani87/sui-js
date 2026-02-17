# Function: eachObject()

> **eachObject**(`object`, `next`): `void`

Defined in: [utils/operation.ts:465](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L465)

Iterates over an object's own enumerable properties, invoking a callback
for each property.

Only processes properties that belong directly to the object (via
`hasOwnProperty`), skipping inherited properties from the prototype chain.

## Parameters

### object

`Record`\<`string`, `any`\>

The object to iterate over.

### next

(`value`, `key`) => `void`

Callback invoked with
    each property value and its key.

## Returns

`void`

## Example

```ts
eachObject({ x: 10, y: 20 }, (value, key) => {
    console.log(key, value);
});
// 'x' 10
// 'y' 20
```
