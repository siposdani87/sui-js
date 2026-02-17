# Function: copyToClipboard()

> **copyToClipboard**(`str`): `void`

Defined in: [utils/operation.ts:1077](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L1077)

Copies text to the system clipboard.

Creates a hidden `<textarea>` element, sets its value to the given string,
selects it, and executes the `copy` command. The temporary element is
removed after the operation.

## Parameters

### str

`string`

The text to copy to the clipboard.

## Returns

`void`
