# Class: ProgressStatus

Defined in: [component/progressStatus.ts:5](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/progressStatus.ts#L5)

## Constructors

### Constructor

> **new ProgressStatus**(`dom`, `opt_selector`, `opt_options`): `ProgressStatus`

Defined in: [component/progressStatus.ts:11](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/progressStatus.ts#L11)

#### Parameters

##### dom

[`Knot`](Knot.md)

##### opt\_selector

`string` = `'.progress-status'`

##### opt\_options

`object` = `{}`

#### Returns

`ProgressStatus`

## Properties

### iconKnot

> **iconKnot**: [`Knot`](Knot.md)

Defined in: [component/progressStatus.ts:8](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/progressStatus.ts#L8)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/progressStatus.ts:7](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/progressStatus.ts#L7)

***

### progressStatusKnot

> **progressStatusKnot**: [`Knot`](Knot.md)

Defined in: [component/progressStatus.ts:6](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/progressStatus.ts#L6)

***

### textKnot

> **textKnot**: [`Knot`](Knot.md)

Defined in: [component/progressStatus.ts:9](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/progressStatus.ts#L9)

## Methods

### setError()

> **setError**(`text`, `opt_icon`): `void`

Defined in: [component/progressStatus.ts:66](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/progressStatus.ts#L66)

#### Parameters

##### text

`string`

##### opt\_icon

`string` = `''`

#### Returns

`void`

***

### setInfo()

> **setInfo**(`text`, `opt_icon`): `void`

Defined in: [component/progressStatus.ts:58](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/progressStatus.ts#L58)

#### Parameters

##### text

`string`

##### opt\_icon

`string` = `''`

#### Returns

`void`

***

### setSuccess()

> **setSuccess**(`text`, `opt_icon`): `void`

Defined in: [component/progressStatus.ts:54](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/progressStatus.ts#L54)

#### Parameters

##### text

`string`

##### opt\_icon

`string` = `''`

#### Returns

`void`

***

### setWarning()

> **setWarning**(`text`, `opt_icon`): `void`

Defined in: [component/progressStatus.ts:62](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/progressStatus.ts#L62)

#### Parameters

##### text

`string`

##### opt\_icon

`string` = `''`

#### Returns

`void`
