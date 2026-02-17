# Function: inContainArray()

> **inContainArray**(`items`, `item`): `boolean`

Defined in: [utils/operation.ts:593](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L593)

Checks whether any element in a string array contains the given substring.

Iterates through the array and returns `true` as soon as an element is
found that contains the given substring (via [contain](contain.md)).

## Parameters

### items

`string`[]

The array of strings to search through.

### item

`string`

The substring to look for within each element.

## Returns

`boolean`

`true` if at least one element contains the substring.

## Example

```ts
inContainArray(['application/json', 'text/html'], 'json'); // true
inContainArray(['text/html', 'text/plain'], 'json');       // false
```
