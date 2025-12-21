# Class: ProgressBar

Defined in: [module/progressBar.ts:14](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L14)

## Constructors

### Constructor

> **new ProgressBar**(`dialog`, `confirm`, `opt_options`): `ProgressBar`

Defined in: [module/progressBar.ts:30](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L30)

#### Parameters

##### dialog

[`Dialog`](Dialog.md)

##### confirm

[`Confirm`](Confirm.md)

##### opt\_options

`object` = `{}`

#### Returns

`ProgressBar`

## Properties

### async

> **async**: [`Async`](Async.md)

Defined in: [module/progressBar.ts:22](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L22)

***

### bufferValue

> **bufferValue**: `number`

Defined in: [module/progressBar.ts:28](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L28)

***

### confirm

> **confirm**: [`Confirm`](Confirm.md)

Defined in: [module/progressBar.ts:16](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L16)

***

### dialog

> **dialog**: [`Dialog`](Dialog.md)

Defined in: [module/progressBar.ts:15](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L15)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/progressBar.ts:17](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L17)

***

### processConfirm

> **processConfirm**: `ProcessBar`

Defined in: [module/progressBar.ts:26](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L26)

***

### processContainer

> **processContainer**: `ProcessBar`

Defined in: [module/progressBar.ts:23](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L23)

***

### processDialog

> **processDialog**: `ProcessBar`

Defined in: [module/progressBar.ts:25](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L25)

***

### processHeader

> **processHeader**: `ProcessBar`

Defined in: [module/progressBar.ts:24](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L24)

***

### progressBarConfirm

> **progressBarConfirm**: [`Knot`](Knot.md)

Defined in: [module/progressBar.ts:21](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L21)

***

### progressBarContainer

> **progressBarContainer**: [`Knot`](Knot.md)

Defined in: [module/progressBar.ts:18](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L18)

***

### progressBarDialog

> **progressBarDialog**: [`Knot`](Knot.md)

Defined in: [module/progressBar.ts:20](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L20)

***

### progressBarHeader

> **progressBarHeader**: [`Knot`](Knot.md)

Defined in: [module/progressBar.ts:19](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L19)

***

### progressValue

> **progressValue**: `number`

Defined in: [module/progressBar.ts:27](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L27)

## Methods

### hide()

> **hide**(`opt_force?`): `void`

Defined in: [module/progressBar.ts:268](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L268)

#### Parameters

##### opt\_force?

`boolean`

#### Returns

`void`

***

### lock()

> **lock**(): `void`

Defined in: [module/progressBar.ts:291](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L291)

#### Returns

`void`

***

### setBuffer()

> **setBuffer**(`value`): `void`

Defined in: [module/progressBar.ts:242](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L242)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### setProgress()

> **setProgress**(`value`): `void`

Defined in: [module/progressBar.ts:216](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L216)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### show()

> **show**(): `void`

Defined in: [module/progressBar.ts:165](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L165)

#### Returns

`void`

***

### unlock()

> **unlock**(): `void`

Defined in: [module/progressBar.ts:295](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/progressBar.ts#L295)

#### Returns

`void`
