# Type Alias: IconOptions

> **IconOptions** = `object`

Defined in: [utils/types.ts:97](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L97)

Google Maps marker icon configuration.

Specifies the image URL, dimensions, sprite origin, anchor point,
and clickable region coordinates for a custom map marker icon.

## Properties

### anchor

> **anchor**: \[`number`, `number`\]

Defined in: [utils/types.ts:105](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L105)

Anchor point relative to the icon as `[x, y]` in pixels.

***

### coords

> **coords**: `number`[]

Defined in: [utils/types.ts:107](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L107)

Array of pixel coordinates defining the clickable polygon region.

***

### origin

> **origin**: \[`number`, `number`\]

Defined in: [utils/types.ts:103](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L103)

Sprite sheet origin as `[x, y]` in pixels.

***

### size

> **size**: \[`number`, `number`\]

Defined in: [utils/types.ts:101](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L101)

Width and height of the icon in pixels as `[width, height]`.

***

### url

> **url**: `string`

Defined in: [utils/types.ts:99](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L99)

URL of the icon image.
