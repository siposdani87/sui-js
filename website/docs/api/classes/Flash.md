# Class: Flash

Defined in: [module/flash.ts:50](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/flash.ts#L50)

Flash message notification system for displaying temporary, styled
messages to the user. Supports multiple message types (`'success'`,
`'info'`, `'warning'`, `'error'`, `'default'`) with configurable
auto-dismiss duration and close behavior.

Messages are categorized as either closable or non-closable based on
the `closableTypes` option (defaults to `['error']`). Closable messages
display an explicit close button and remain visible until the user
dismisses them. Non-closable messages auto-dismiss after the configured
duration and can be clicked anywhere to dismiss early.

Setting `opt_duration` to `Infinity` prevents both auto-dismiss and
the close button from appearing, creating a persistent notification.

Each flash message can be assigned a custom `opt_id` for later
programmatic removal via `removeById()`. When a new message is added
with an existing ID, the previous message with that ID is removed
first.

## Examples

```ts
const flash = new Flash({ duration: 5000 });

flash.addSuccess('Item saved successfully.');
flash.addError('Failed to save item.', 0, () => {
    retryOperation();
});
```

```ts
// Add a message from a server response object
flash.addMessage({ type: 'warning', content: 'Session expiring soon.' });
```

```ts
// Remove a specific flash by ID
flash.addInfo('Uploading...', Infinity, null, 'upload-progress');
// Later, when upload completes:
flash.removeById('upload-progress');
```

## See

 - [Knot](Knot.md)
 - [Objekt](Objekt.md)

## Constructors

### Constructor

> **new Flash**(`opt_options?`): `Flash`

Defined in: [module/flash.ts:64](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/flash.ts#L64)

Creates a new Flash instance.

#### Parameters

##### opt\_options?

Configuration options merged with defaults.
    Supported keys: `id` (CSS selector for the flash container,
    defaults to `'#flashes'`), `duration` (auto-dismiss time in
    milliseconds for non-closable messages, defaults to `4000`),
    `closableTypes` (array of message types that show a close
    button, defaults to `['error']`).

`object` | `undefined`

#### Returns

`Flash`

## Properties

### container

> **container**: [`Knot`](Knot.md)

Defined in: [module/flash.ts:51](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/flash.ts#L51)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/flash.ts:52](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/flash.ts#L52)

## Methods

### addDefault()

> **addDefault**(`message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Knot`](Knot.md)

Defined in: [module/flash.ts:454](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/flash.ts#L454)

Adds a default-type flash message with no special styling.

#### Parameters

##### message

`string`

The HTML content of the flash message.

##### opt\_duration?

Auto-dismiss duration in milliseconds. When 0,
    the default duration from options is used.

`number` | `undefined`

##### opt\_closeCallback?

Callback invoked when the flash is closed.

`Function` | `null` | `undefined`

##### opt\_id?

Custom identifier for deduplication and programmatic
    removal.

`string` | `undefined`

#### Returns

[`Knot`](Knot.md)

The created flash Knot element.

#### Example

```ts
flash.addDefault('Action completed.');
```

***

### addError()

> **addError**(`message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Knot`](Knot.md)

Defined in: [module/flash.ts:374](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/flash.ts#L374)

Adds an error-type flash message. Error messages are closable by
default (they display a close button and do not auto-dismiss).

#### Parameters

##### message

`string`

The HTML content of the flash message.

##### opt\_duration?

Auto-dismiss duration in milliseconds. When 0,
    the default duration from options is used.

`number` | `undefined`

##### opt\_closeCallback?

Callback invoked when the flash is closed.

`Function` | `null` | `undefined`

##### opt\_id?

Custom identifier for deduplication and programmatic
    removal.

`string` | `undefined`

#### Returns

[`Knot`](Knot.md)

The created flash Knot element.

#### Examples

```ts
flash.addError('Failed to save changes. Please try again.');
```

```ts
// Error with a retry callback
flash.addError('Connection lost.', 0, () => {
    reconnect();
});
```

***

### addInfo()

> **addInfo**(`message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Knot`](Knot.md)

Defined in: [module/flash.ts:309](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/flash.ts#L309)

Adds an info-type flash message.

#### Parameters

##### message

`string`

The HTML content of the flash message.

##### opt\_duration?

Auto-dismiss duration in milliseconds. When 0,
    the default duration from options is used.

`number` | `undefined`

##### opt\_closeCallback?

Callback invoked when the flash is closed.

`Function` | `null` | `undefined`

##### opt\_id?

Custom identifier for deduplication and programmatic
    removal.

`string` | `undefined`

#### Returns

[`Knot`](Knot.md)

The created flash Knot element.

#### Example

```ts
flash.addInfo('New version available.');
```

***

### addMessage()

> **addMessage**(`message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Knot`](Knot.md)\<`HTMLElement`\> \| `null`

Defined in: [module/flash.ts:421](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/flash.ts#L421)

Adds a flash message from a structured message object. The object
must contain `type` and `content` properties. When the `closable`
property is true, the message uses a no-op close callback to
force closable behavior regardless of its type.

#### Parameters

##### message

The message object with `type` (flash type string),
    `content` (HTML message text), and optional `closable` flag.

###### closable?

`boolean`

###### content

`string`

###### type

`string`

##### opt\_duration?

Auto-dismiss duration in milliseconds. When 0,
    the default duration from options is used.

`number` | `undefined`

##### opt\_closeCallback?

Callback invoked when the flash is closed.
    Overridden by a no-op when `message.closable` is true.

`Function` | `null` | `undefined`

##### opt\_id?

Custom identifier for deduplication and programmatic
    removal.

`string` | `undefined`

#### Returns

[`Knot`](Knot.md)\<`HTMLElement`\> \| `null`

The created flash Knot element, or null if the message
    parameter is not a valid plain object.

#### Examples

```ts
// From a server response
flash.addMessage({
    type: 'success',
    content: 'Operation completed.',
});
```

```ts
// Closable message regardless of type
flash.addMessage({
    type: 'info',
    content: 'Please review the changes.',
    closable: true,
});
```

***

### addSuccess()

> **addSuccess**(`message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Knot`](Knot.md)

Defined in: [module/flash.ts:280](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/flash.ts#L280)

Adds a success-type flash message.

#### Parameters

##### message

`string`

The HTML content of the flash message.

##### opt\_duration?

Auto-dismiss duration in milliseconds. When 0,
    the default duration from options is used.

`number` | `undefined`

##### opt\_closeCallback?

Callback invoked when the flash is closed.

`Function` | `null` | `undefined`

##### opt\_id?

Custom identifier for deduplication and programmatic
    removal.

`string` | `undefined`

#### Returns

[`Knot`](Knot.md)

The created flash Knot element.

#### Example

```ts
flash.addSuccess('Profile updated successfully.');
```

***

### addWarning()

> **addWarning**(`message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Knot`](Knot.md)

Defined in: [module/flash.ts:338](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/flash.ts#L338)

Adds a warning-type flash message.

#### Parameters

##### message

`string`

The HTML content of the flash message.

##### opt\_duration?

Auto-dismiss duration in milliseconds. When 0,
    the default duration from options is used.

`number` | `undefined`

##### opt\_closeCallback?

Callback invoked when the flash is closed.

`Function` | `null` | `undefined`

##### opt\_id?

Custom identifier for deduplication and programmatic
    removal.

`string` | `undefined`

#### Returns

[`Knot`](Knot.md)

The created flash Knot element.

#### Example

```ts
flash.addWarning('Disk space is running low.');
```

***

### remove()

> **remove**(`flash`, `opt_closeCallback?`): `void`

Defined in: [module/flash.ts:256](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/flash.ts#L256)

Removes a flash message from the container and invokes the
optional close callback.

#### Parameters

##### flash

[`Knot`](Knot.md)

The flash Knot element to remove.

##### opt\_closeCallback?

Optional callback to invoke before
    removing the element.

`Function` | `null` | `undefined`

#### Returns

`void`

#### Example

```ts
const flashKnot = flash.addInfo('Processing...');
// Later, remove it programmatically:
flash.remove(flashKnot);
```

***

### removeById()

> **removeById**(`opt_id?`): `void`

Defined in: [module/flash.ts:214](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/flash.ts#L214)

Removes all flash messages with the given data-id attribute from
the container.

#### Parameters

##### opt\_id?

The data-id value of the flash messages to remove.
    When empty, no action is taken.

`string` | `undefined`

#### Returns

`void`

#### Example

```ts
flash.removeById('upload-progress');
```
