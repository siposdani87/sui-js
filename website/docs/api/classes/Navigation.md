# Class: Navigation

Defined in: [component/navigation.ts:28](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L28)

Navigation link manager supporting icons, images, counters, and text links.

## Description

Builds and manages a collection of navigation items that can include
Material Design icons, SVG/bitmap images, numeric counters, or plain text labels.
Each item supports click actions, enable/disable states, active highlighting,
and show/hide visibility control.

## Example

```ts
const nav = new Navigation(http, {});
nav.add(new Objekt({ id: 'home', icon: 'home', title: 'Home', action: (href) => {} }));
nav.add(new Objekt({ id: 'profile', image: '/avatar.png', title: 'Profile', action: (href) => {} }));
nav.bindToContainer(containerKnot);
nav.setActive('home');
```

## See

 - [Collection](Collection.md)
 - [Objekt](Objekt.md)
 - [Http](Http.md)

## Constructors

### Constructor

> **new Navigation**(`opt_http?`, `opt_options?`): `Navigation`

Defined in: [component/navigation.ts:38](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L38)

#### Parameters

##### opt\_http?

[`Http`](Http.md)

Optional [Http](Http.md) instance used for fetching SVG images.

##### opt\_options?

Configuration options merged via [Objekt](Objekt.md).

`object` | `undefined`

#### Returns

`Navigation`

## Properties

### container

> **container**: [`Collection`](Collection.md)\<[`Objekt`](Objekt.md)\<`object`\>\>

Defined in: [component/navigation.ts:31](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L31)

***

### http?

> `optional` **http**: [`Http`](Http.md)

Defined in: [component/navigation.ts:29](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L29)

***

### linkKnotKey

> **linkKnotKey**: `string`

Defined in: [component/navigation.ts:32](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L32)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/navigation.ts:30](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L30)

## Methods

### add()

> **add**(`item`): `void`

Defined in: [component/navigation.ts:81](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L81)

Adds a navigation item, automatically selecting the appropriate type (image, icon, counter, or text).

#### Parameters

##### item

[`Objekt`](Objekt.md)

An [Objekt](Objekt.md) with properties: id, title, href, action, and optionally
    image, icon, counter, disabled.

#### Returns

`void`

#### Description

Inspects the item's properties to determine the rendering type:
image if 'image' is set, icon if 'icon' is set, counter if 'counter' is set,
otherwise falls back to plain text. Disables the item if the 'disabled' property is true.

#### Example

```ts
nav.add(new Objekt({
    id: 'settings',
    icon: 'settings',
    title: 'Settings',
    href: '/settings',
    action: (href) => router.navigate(href),
}));
```

***

### addCounter()

> **addCounter**(`id`, `counter`, `title`, `action`, `opt_href?`, `opt_data?`): `void`

Defined in: [component/navigation.ts:119](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L119)

Creates a navigation item with a numeric or text counter badge.

#### Parameters

##### id

`string`

Unique identifier for the item.

##### counter

`string`

The counter value to display.

##### title

Display label for the item, or null for no label.

`string` | `null`

##### action

`Function`

Click handler function receiving the href.

##### opt\_href?

Link URL (defaults to empty string).

`string` | `undefined`

##### opt\_data?

Additional data to associate with the item.

`object` | `undefined`

#### Returns

`void`

#### Example

```ts
nav.addCounter('notifications', '5', 'Alerts', (href) => {}, '/alerts');
```

***

### addIcon()

> **addIcon**(`id`, `icon`, `title`, `action`, `opt_href?`, `opt_data?`): `void`

Defined in: [component/navigation.ts:149](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L149)

Creates a navigation item with a Material Design icon.

#### Parameters

##### id

`string`

Unique identifier for the item.

##### icon

`string`

Material Design icon name (e.g. 'home', 'settings').

##### title

Display label for the item, or null for no label.

`string` | `null`

##### action

`Function`

Click handler function receiving the href.

##### opt\_href?

Link URL (defaults to empty string).

`string` | `undefined`

##### opt\_data?

Additional data to associate with the item.

`object` | `undefined`

#### Returns

`void`

#### Example

```ts
nav.addIcon('home', 'home', 'Home', (href) => {}, '/');
```

***

### addImage()

> **addImage**(`id`, `image`, `title`, `action`, `opt_href?`, `opt_data?`): `void`

Defined in: [component/navigation.ts:183](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L183)

Creates a navigation item with an image (SVG loaded via [Http](Http.md) or a bitmap img tag).

#### Parameters

##### id

`string`

Unique identifier for the item.

##### image

`string`

Image URL. SVG files are fetched and inlined; other formats use an img tag.

##### title

Display label for the item, or null for no label.

`string` | `null`

##### action

`Function`

Click handler function receiving the href.

##### opt\_href?

Link URL (defaults to empty string).

`string` | `undefined`

##### opt\_data?

Additional data to associate with the item.

`object` | `undefined`

#### Returns

`void`

#### Example

```ts
nav.addImage('logo', '/logo.svg', 'Home', (href) => {}, '/');
```

***

### addText()

> **addText**(`id`, `title`, `action`, `opt_href?`, `opt_data?`): `void`

Defined in: [component/navigation.ts:235](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L235)

Creates a navigation item with a plain text label only.

#### Parameters

##### id

`string`

Unique identifier for the item.

##### title

`string`

Display label for the item.

##### action

`Function`

Click handler function receiving the href.

##### opt\_href?

Link URL (defaults to empty string).

`string` | `undefined`

##### opt\_data?

Additional data to associate with the item.

`object` | `undefined`

#### Returns

`void`

#### Example

```ts
nav.addText('about', 'About Us', (href) => {}, '/about');
```

***

### bindToContainer()

> **bindToContainer**(`containerKnot`): `void`

Defined in: [component/navigation.ts:314](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L314)

Appends all navigation link knots to the specified container, replacing its children.

#### Parameters

##### containerKnot

[`Knot`](Knot.md)

The parent [Knot](Knot.md) to render navigation items into.

#### Returns

`void`

#### Example

```ts
nav.bindToContainer(new Query('.nav-container').getKnot());
```

***

### each()

> **each**(`next`): `void`

Defined in: [component/navigation.ts:300](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L300)

Iterates over all navigation items in the collection.

#### Parameters

##### next

`Function`

Callback invoked with each item [Objekt](Objekt.md).

#### Returns

`void`

#### Example

```ts
nav.each((item) => {
    console.log(item.get('id'), item.get('title'));
});
```

***

### hide()

> **hide**(`id`): `void`

Defined in: [component/navigation.ts:444](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L444)

Hides a navigation item and disables it.

#### Parameters

##### id

`string`

The item identifier to hide.

#### Returns

`void`

#### Example

```ts
nav.hide('admin');
```

***

### setActive()

> **setActive**(`id`): `void`

Defined in: [component/navigation.ts:392](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L392)

Sets the active state on matching navigation items by ID.

#### Parameters

##### id

`string`

The item identifier (or prefix) to activate.

#### Returns

`void`

#### Description

Marks items as active if their ID matches exactly, or if the item ID
ends with '.' and the given ID starts with that prefix (wildcard matching).

#### Example

```ts
nav.setActive('home');
nav.setActive('settings.general'); // also activates 'settings.' prefix items
```

***

### setAllInactive()

> **setAllInactive**(): `void`

Defined in: [component/navigation.ts:412](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L412)

Removes the active state from all navigation items.

#### Returns

`void`

#### Example

```ts
nav.setAllInactive();
```

***

### setDisabled()

> **setDisabled**(`id`): `void`

Defined in: [component/navigation.ts:330](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L330)

Disables a navigation item by ID, preventing click interactions.

#### Parameters

##### id

`string`

The item identifier to disable.

#### Returns

`void`

#### Example

```ts
nav.setDisabled('settings');
```

***

### setEnabled()

> **setEnabled**(`id`): `void`

Defined in: [component/navigation.ts:356](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L356)

Enables a navigation item by ID, restoring click interactions.

#### Parameters

##### id

`string`

The item identifier to enable.

#### Returns

`void`

#### Example

```ts
nav.setEnabled('settings');
```

***

### show()

> **show**(`id`): `void`

Defined in: [component/navigation.ts:427](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/navigation.ts#L427)

Shows a hidden navigation item and enables it.

#### Parameters

##### id

`string`

The item identifier to show.

#### Returns

`void`

#### Example

```ts
nav.show('admin');
```
