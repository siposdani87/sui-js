# Class: PopupContainer

Defined in: [component/popupContainer.ts:18](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/popupContainer.ts#L18)

## Description

Global popup lifecycle manager that tracks all open popups via a window-level
collection. Handles positioning and bulk close operations.

## Example

```ts
const container = new PopupContainer();
container.closeAll();
```

## See

[Popup](Popup.md) for individual popup instances

## Constructors

### Constructor

> **new PopupContainer**(`opt_selector?`): `PopupContainer`

Defined in: [component/popupContainer.ts:26](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/popupContainer.ts#L26)

#### Parameters

##### opt\_selector?

`string` = `'body'`

CSS selector for the container element.

#### Returns

`PopupContainer`

#### Description

Creates a new PopupContainer bound to a DOM container element.

## Properties

### container

> **container**: [`Knot`](Knot.md)

Defined in: [component/popupContainer.ts:20](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/popupContainer.ts#L20)

***

### selector

> **selector**: `string`

Defined in: [component/popupContainer.ts:19](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/popupContainer.ts#L19)

## Methods

### clearPosition()

> **clearPosition**(`popupKnot`): `void`

Defined in: [component/popupContainer.ts:115](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/popupContainer.ts#L115)

#### Parameters

##### popupKnot

[`Knot`](Knot.md)

The popup DOM element to reset.

#### Returns

`void`

#### Description

Resets all CSS positioning properties of a popup element to auto.

#### Example

```ts
container.clearPosition(popupKnot);
```

***

### closeAll()

> **closeAll**(): `void`

Defined in: [component/popupContainer.ts:81](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/popupContainer.ts#L81)

#### Returns

`void`

#### Description

Closes all currently open popups in the global collection.

#### Example

```ts
container.closeAll();
```

***

### delete()

> **delete**(`popup`): `void`

Defined in: [component/popupContainer.ts:69](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/popupContainer.ts#L69)

#### Parameters

##### popup

[`Popup`](Popup.md)

The popup instance to remove.

#### Returns

`void`

#### Description

Removes a popup from the global collection.

#### Example

```ts
container.delete(popupInstance);
```

***

### push()

> **push**(`type`, `popup`): `void`

Defined in: [component/popupContainer.ts:55](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/popupContainer.ts#L55)

#### Parameters

##### type

`Function`

The popup constructor type.

##### popup

[`Popup`](Popup.md)

The popup instance to register.

#### Returns

`void`

#### Description

Registers a popup in the global collection.

#### Example

```ts
container.push(Popup, popupInstance);
```

***

### setPosition()

> **setPosition**(`popupKnot`): `void`

Defined in: [component/popupContainer.ts:96](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/popupContainer.ts#L96)

#### Parameters

##### popupKnot

[`Knot`](Knot.md)

The popup DOM element to position.

#### Returns

`void`

#### Description

Sets the CSS position of a popup element within the container.

#### Example

```ts
container.setPosition(popupKnot);
```
