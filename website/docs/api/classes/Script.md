# Class: Script

Defined in: [module/script.ts:29](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/script.ts#L29)

Dynamic script loader that appends `<script>` tags to the document
`<head>`. Each script is identified by a unique ID; loading a script
that already exists (by ID) resolves immediately without duplicating
the tag.

The loader integrates with [ProgressBar](ProgressBar.md) to show and hide
progress during script loading.

## See

 - [ProgressBar](ProgressBar.md)
 - [Style](Style.md)

## Example

```ts
const script = new Script(progressBar);
script.load('google-maps', 'https://maps.googleapis.com/maps/api/js', {
    key: 'API_KEY',
}).then(() => {
    // Google Maps API is ready
});
```

## Constructors

### Constructor

> **new Script**(`progressBar`, `opt_options?`): `Script`

Defined in: [module/script.ts:42](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/script.ts#L42)

Creates a new Script loader instance.

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

`Script`

## Properties

### head

> **head**: [`Knot`](Knot.md)

Defined in: [module/script.ts:32](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/script.ts#L32)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/script.ts:31](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/script.ts#L31)

***

### progressBar

> **progressBar**: [`ProgressBar`](ProgressBar.md)

Defined in: [module/script.ts:30](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/script.ts#L30)

## Methods

### load()

> **load**(`id`, `url`, `opt_params?`, `opt_async?`, `opt_defer?`): [`Promize`](Promize.md)\<`object`, `object`\>

Defined in: [module/script.ts:88](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/script.ts#L88)

Loads a JavaScript file by appending a `<script>` tag to the document
head. If a script with the given ID already exists in the DOM, the
returned promise resolves immediately without creating a duplicate.

#### Parameters

##### id

`string`

A unique identifier for the script element. Used
    both as the element ID and to check for existing scripts.

##### url

`string`

The URL of the JavaScript file to load.

##### opt\_params?

`object`

Optional query string
    parameters appended to the URL.

##### opt\_async?

When true, sets the `async`
    attribute on the script tag.

`boolean` | `undefined`

##### opt\_defer?

When true, sets the `defer`
    attribute on the script tag.

`boolean` | `undefined`

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>

A promise that resolves when the script loads
    successfully, or rejects on error.

#### Example

```ts
script.load('analytics', '/js/analytics.js', { v: '2' }, true);
```

***

### remove()

> **remove**(`id`): `void`

Defined in: [module/script.ts:138](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/script.ts#L138)

Removes a previously loaded script element from the DOM by its ID.
If no element with the given ID exists or the element is empty,
this method does nothing.

#### Parameters

##### id

`string`

The ID of the script element to remove.

#### Returns

`void`

#### Example

```ts
script.remove('analytics');
```
