# Class: Dropdown

Defined in: [component/dropdown.ts:21](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/dropdown.ts#L21)

## Description

MDL-based dropdown action menu that renders a "more" icon button with
a list of context actions for a data item.

## Example

```ts
const dropdown = new Dropdown(containerKnot);
dropdown.setActions(actions, item);
```

## See

[Table](Table.md) for table rows that use dropdowns for row actions

## Constructors

### Constructor

> **new Dropdown**(`element`, `opt_options?`): `Dropdown`

Defined in: [component/dropdown.ts:35](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/dropdown.ts#L35)

#### Parameters

##### element

[`Knot`](Knot.md)

The container element for the dropdown.

##### opt\_options?

`object` = `{}`

Configuration options (id).

#### Returns

`Dropdown`

#### Description

Creates a new Dropdown attached to the given element.

## Properties

### actions

> **actions**: [`Action`](../type-aliases/Action.md)[]

Defined in: [component/dropdown.ts:25](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/dropdown.ts#L25)

***

### buttonKnot

> **buttonKnot**: [`Knot`](Knot.md)

Defined in: [component/dropdown.ts:27](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/dropdown.ts#L27)

***

### collection

> **collection**: [`Collection`](Collection.md)\<[`Objekt`](Objekt.md)\<`object`\>\>

Defined in: [component/dropdown.ts:24](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/dropdown.ts#L24)

***

### dropdown

> **dropdown**: [`Knot`](Knot.md)

Defined in: [component/dropdown.ts:22](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/dropdown.ts#L22)

***

### item

> **item**: [`Objekt`](Objekt.md)\<`object`\> \| `null`

Defined in: [component/dropdown.ts:26](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/dropdown.ts#L26)

***

### menuKnot

> **menuKnot**: [`Knot`](Knot.md)

Defined in: [component/dropdown.ts:28](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/dropdown.ts#L28)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/dropdown.ts:23](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/dropdown.ts#L23)

## Methods

### setActions()

> **setActions**(`actions`, `item`): `void`

Defined in: [component/dropdown.ts:109](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/dropdown.ts#L109)

#### Parameters

##### actions

[`Action`](../type-aliases/Action.md)[]

Array of action definitions with style and click callbacks.

##### item

[`Objekt`](Objekt.md)

The data item the actions apply to.

#### Returns

`void`

#### Description

Populates the dropdown menu with actions for the given data item.

#### Example

```ts
dropdown.setActions([
    { style: (item) => ['edit', 'Edit', false, false], click: (item) => edit(item) },
], item);
```
