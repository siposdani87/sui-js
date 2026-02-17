# Function: merge()

> **merge**(`objA`, `objB`): `object` \| `undefined`

Defined in: [utils/operation.ts:59](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L59)

Recursively merges two plain objects, returning a new deep-copied object.

Properties from `objB` are merged into a deep copy of `objA`. When both
sides have a plain object for the same key, the merge recurses. Otherwise,
the value from `objB` overwrites the one from `objA`.

## Parameters

### objA

`Record`\<`string`, `any`\>

The base object to merge into.

### objB

`Record`\<`string`, `any`\>

The object whose properties take precedence.

## Returns

`object` \| `undefined`

A new merged object combining both inputs.

## Example

```ts
merge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 });
// { a: 1, b: { c: 2, d: 3 }, e: 4 }
```
