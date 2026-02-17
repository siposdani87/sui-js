# Class: ProgressStatus

Defined in: [component/progressStatus.ts:16](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/progressStatus.ts#L16)

## Description

Status indicator component that displays success, info, warning, or error states
with configurable icon and text.

## Example

```ts
const status = new ProgressStatus(containerKnot, '.progress-status');
status.setSuccess('Upload complete', 'check_circle');
status.setError('Upload failed', 'error');
```

## Constructors

### Constructor

> **new ProgressStatus**(`dom`, `opt_selector?`, `opt_options?`): `ProgressStatus`

Defined in: [component/progressStatus.ts:28](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/progressStatus.ts#L28)

#### Parameters

##### dom

[`Knot`](Knot.md)

The parent DOM element.

##### opt\_selector?

`string` = `'.progress-status'`

CSS selector for the progress status element.

##### opt\_options?

`object` = `{}`

Configuration options (successStyle, infoStyle, warningStyle, errorStyle).

#### Returns

`ProgressStatus`

#### Description

Creates a new ProgressStatus bound to a DOM container.

## Properties

### iconKnot

> **iconKnot**: [`Knot`](Knot.md)

Defined in: [component/progressStatus.ts:19](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/progressStatus.ts#L19)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/progressStatus.ts:18](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/progressStatus.ts#L18)

***

### progressStatusKnot

> **progressStatusKnot**: [`Knot`](Knot.md)

Defined in: [component/progressStatus.ts:17](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/progressStatus.ts#L17)

***

### textKnot

> **textKnot**: [`Knot`](Knot.md)

Defined in: [component/progressStatus.ts:20](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/progressStatus.ts#L20)

## Methods

### setError()

> **setError**(`text`, `opt_icon?`): `void`

Defined in: [component/progressStatus.ts:128](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/progressStatus.ts#L128)

#### Parameters

##### text

`string`

The error message text.

##### opt\_icon?

`string` = `''`

Optional Material Design icon name.

#### Returns

`void`

#### Description

Sets the status to error state with the given text and optional icon.

#### Example

```ts
status.setError('Connection failed', 'error');
```

***

### setInfo()

> **setInfo**(`text`, `opt_icon?`): `void`

Defined in: [component/progressStatus.ts:104](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/progressStatus.ts#L104)

#### Parameters

##### text

`string`

The info message text.

##### opt\_icon?

`string` = `''`

Optional Material Design icon name.

#### Returns

`void`

#### Description

Sets the status to info state with the given text and optional icon.

#### Example

```ts
status.setInfo('Processing...', 'info');
```

***

### setSuccess()

> **setSuccess**(`text`, `opt_icon?`): `void`

Defined in: [component/progressStatus.ts:92](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/progressStatus.ts#L92)

#### Parameters

##### text

`string`

The success message text.

##### opt\_icon?

`string` = `''`

Optional Material Design icon name.

#### Returns

`void`

#### Description

Sets the status to success state with the given text and optional icon.

#### Example

```ts
status.setSuccess('Operation completed', 'check_circle');
```

***

### setWarning()

> **setWarning**(`text`, `opt_icon?`): `void`

Defined in: [component/progressStatus.ts:116](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/progressStatus.ts#L116)

#### Parameters

##### text

`string`

The warning message text.

##### opt\_icon?

`string` = `''`

Optional Material Design icon name.

#### Returns

`void`

#### Description

Sets the status to warning state with the given text and optional icon.

#### Example

```ts
status.setWarning('Disk space low', 'warning');
```
