# Function: getExtensionName()

> **getExtensionName**(`url`): `string`

Defined in: [utils/operation.ts:1044](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L1044)

Extracts the file extension from a URL.

Strips any query string before extracting the extension. Returns the
portion of the URL after the last `.` character.

## Parameters

### url

`string`

The URL or file path to extract the extension from.

## Returns

`string`

The file extension without the leading dot, or an empty
    string if no extension is found.

## Example

```ts
getExtensionName('https://example.com/image.png?v=2'); // 'png'
getExtensionName('document.pdf');                       // 'pdf'
getExtensionName('no-extension');                       // ''
```
