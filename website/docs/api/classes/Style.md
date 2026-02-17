# Class: Style

Defined in: [module/style.ts:27](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/style.ts#L27)

Dynamic stylesheet loader that appends `<link>` tags to the document
`<head>`. Each stylesheet is identified by a unique ID; loading a
stylesheet that already exists (by ID) resolves immediately without
duplicating the tag.

The loader integrates with [ProgressBar](ProgressBar.md) to show and hide
progress during stylesheet loading.

## See

 - [ProgressBar](ProgressBar.md)
 - [Script](Script.md)

## Example

```ts
const style = new Style(progressBar);
style.load('theme-dark', '/css/dark-theme.css').then(() => {
    // Dark theme stylesheet is applied
});
```

## Constructors

### Constructor

> **new Style**(`progressBar`, `opt_options?`): `Style`

Defined in: [module/style.ts:40](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/style.ts#L40)

Creates a new Style loader instance.

#### Parameters

##### progressBar

[`ProgressBar`](ProgressBar.md)

The progress bar instance used to
    indicate loading activity.

##### opt\_options?

Optional configuration
    merged into defaults.

`object` | `undefined`

#### Returns

`Style`

## Properties

### head

> **head**: [`Knot`](Knot.md)

Defined in: [module/style.ts:30](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/style.ts#L30)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/style.ts:29](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/style.ts#L29)

***

### progressBar

> **progressBar**: [`ProgressBar`](ProgressBar.md)

Defined in: [module/style.ts:28](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/style.ts#L28)

## Methods

### load()

> **load**(`id`, `url`, `opt_params?`, `opt_rel?`, `opt_media?`): [`Promize`](Promize.md)\<`boolean`, `boolean`\>

Defined in: [module/style.ts:86](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/style.ts#L86)

Loads a CSS stylesheet by appending a `<link>` tag to the document
head. If a link with the given ID already exists in the DOM, the
returned promise resolves immediately without creating a duplicate.

#### Parameters

##### id

`string`

A unique identifier for the link element. Used
    both as the element ID and to check for existing stylesheets.

##### url

`string`

The URL of the CSS file to load.

##### opt\_params?

`object`

Optional query string
    parameters appended to the URL.

##### opt\_rel?

The `rel` attribute value
    for the link tag. Defaults to 'stylesheet'.

`string` | `undefined`

##### opt\_media?

The `media` attribute value
    for the link tag. Defaults to 'all'.

`string` | `undefined`

#### Returns

[`Promize`](Promize.md)\<`boolean`, `boolean`\>

A promise that resolves with `true` when the
    stylesheet loads successfully, or rejects with `false` on error.

#### Example

```ts
style.load('print-css', '/css/print.css', {}, 'stylesheet', 'print');
```

***

### remove()

> **remove**(`id`): `void`

Defined in: [module/style.ts:131](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/style.ts#L131)

Removes a previously loaded stylesheet element from the DOM by its
ID. If no element with the given ID exists or the element is empty,
this method does nothing.

#### Parameters

##### id

`string`

The ID of the link element to remove.

#### Returns

`void`

#### Example

```ts
style.remove('theme-dark');
```
