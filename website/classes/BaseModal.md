# Class: BaseModal

Defined in: [module/baseModal.ts:6](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L6)

## Extended by

- [`Confirm`](Confirm.md)
- [`Dialog`](Dialog.md)
- [`Viewer`](Viewer.md)

## Constructors

### Constructor

> **new BaseModal**(): `BaseModal`

#### Returns

`BaseModal`

## Properties

### body

> **body**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:15](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L15)

***

### btnClose

> **btnClose**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:14](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L14)

***

### btnMaximize

> **btnMaximize**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:13](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L13)

***

### btnMinimize

> **btnMinimize**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:12](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L12)

***

### eventCancel()

> **eventCancel**: () => `void`

Defined in: [module/baseModal.ts:22](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L22)

#### Returns

`void`

***

### eventOK()

> **eventOK**: () => `void`

Defined in: [module/baseModal.ts:21](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L21)

#### Returns

`void`

***

### hasBlur

> **hasBlur**: `boolean`

Defined in: [module/baseModal.ts:10](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L10)

***

### interval

> **interval**: `number`

Defined in: [module/baseModal.ts:16](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L16)

***

### mainContainerKnot

> **mainContainerKnot**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:9](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L9)

***

### modal

> **modal**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:11](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L11)

***

### modalBody

> **modalBody**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:18](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L18)

***

### modalFooter

> **modalFooter**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:19](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L19)

***

### modalHeader

> **modalHeader**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:20](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L20)

***

### modalTitle

> **modalTitle**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:17](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L17)

***

### modalWindow

> **modalWindow**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:23](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L23)

***

### windowHeight

> **windowHeight**: `number`

Defined in: [module/baseModal.ts:8](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L8)

***

### windowWidth

> **windowWidth**: `number`

Defined in: [module/baseModal.ts:7](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L7)

## Methods

### \_actionCancel()

> `protected` **\_actionCancel**(): `void`

Defined in: [module/baseModal.ts:160](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L160)

#### Returns

`void`

***

### \_actionOK()

> `protected` **\_actionOK**(): `void`

Defined in: [module/baseModal.ts:154](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L154)

#### Returns

`void`

***

### \_initBase()

> `protected` **\_initBase**(): `void`

Defined in: [module/baseModal.ts:25](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L25)

#### Returns

`void`

***

### \_reset()

> `protected` **\_reset**(): `void`

Defined in: [module/baseModal.ts:149](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L149)

#### Returns

`void`

***

### \_setTitle()

> `protected` **\_setTitle**(`opt_title`): `void`

Defined in: [module/baseModal.ts:136](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L136)

#### Parameters

##### opt\_title

`string`

#### Returns

`void`

***

### close()

> **close**(): `void`

Defined in: [module/baseModal.ts:120](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L120)

#### Returns

`void`

***

### isOpened()

> **isOpened**(): `boolean`

Defined in: [module/baseModal.ts:86](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L86)

#### Returns

`boolean`

***

### open()

> **open**(`opt_allowClose`): `void`

Defined in: [module/baseModal.ts:102](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L102)

#### Parameters

##### opt\_allowClose

`boolean` = `true`

#### Returns

`void`

***

### setSize()

> **setSize**(`width`, `height`): `void`

Defined in: [module/baseModal.ts:174](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/baseModal.ts#L174)

#### Parameters

##### width

`number`

##### height

`number`

#### Returns

`void`
