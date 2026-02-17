# Function: format()

> **format**\<`T`\>(`str`, `opt_params?`, `opt_prefix?`, `opt_postfix?`): `string`

Defined in: [utils/operation.ts:99](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L99)

Template string formatter that replaces token placeholders with values.

Replaces `{key}` tokens in the input string with corresponding values from
the params object or array. The delimiter characters around keys are
configurable via `opt_prefix` and `opt_postfix` (regex patterns).

## Type Parameters

### T

`T`

## Parameters

### str

`string`

The template string containing `{key}` placeholders.

### opt\_params?

An object or array
    providing replacement values. Object keys or array indices serve as token names.

`object` | `T`[] | `null` | `undefined`

### opt\_prefix?

Regex pattern for the opening delimiter.
    Defaults to `'\\{'`.

`string` | `undefined`

### opt\_postfix?

Regex pattern for the closing delimiter.
    Defaults to `'\\}'`.

`string` | `undefined`

## Returns

`string`

The formatted string with all matched tokens replaced.

## Example

```ts
format('Hello {name}!', { name: 'World' });
// 'Hello World!'

format('{0} + {1} = {2}', [1, 2, 3]);
// '1 + 2 = 3'

format('Hello <name>', { name: 'World' }, '<', '>');
// 'Hello World'
```
