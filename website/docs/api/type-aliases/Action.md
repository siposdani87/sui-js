# Type Alias: Action

> **Action** = `object`

Defined in: [utils/types.ts:82](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L82)

Action descriptor for table rows and card collection items.

Defines the visual appearance and click behavior of an action button.
The `style` callback returns a tuple of CSS class, optional icon name,
and optional visibility/disabled flags. The `click` callback is invoked
when the action is triggered.

## Properties

### click()

> **click**: (`item`) => `void`

Defined in: [utils/types.ts:86](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L86)

Handler invoked when the action is clicked for the given item.

#### Parameters

##### item

[`Objekt`](../classes/Objekt.md)

#### Returns

`void`

***

### style()

> **style**: (`item`) => \[`string`, `string`?, `boolean`?, `boolean`?\]

Defined in: [utils/types.ts:84](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L84)

Returns `[cssClass, iconName?, isVisible?, isDisabled?]` for the given item.

#### Parameters

##### item

[`Objekt`](../classes/Objekt.md)

#### Returns

\[`string`, `string`?, `boolean`?, `boolean`?\]
