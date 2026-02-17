# Class: Template

Defined in: [module/template.ts:43](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/template.ts#L43)

SPA template loader that fetches page content from the server via
[Http](Http.md) and inserts it into the view container. Supports
client-side caching based on `data-template-url` and `data-locale`
attributes to avoid redundant fetches during SPA navigation.

When `load()` is called, the template checks whether the requested
URL and locale match the currently loaded content. If they match
(and `opt_force` is false), the existing `.page-content` element is
returned immediately without an HTTP request. Otherwise, the content
is fetched from the server and inserted into the view container.

On error responses, the `.message` element is extracted from the
response and passed to the overridable `eventError()` hook.

## Example

```ts
const template = new Template(http, {
    selector: '.template-view',
    locale: 'en-US',
});

template.load('/pages/dashboard').then(
    (pageKnot) => {
        initDashboard(pageKnot);
    },
    (errorKnot) => {
        console.error('Page load failed');
    },
);
```

## See

 - [Http](Http.md)
 - [Knot](Knot.md)

## Constructors

### Constructor

> **new Template**(`http`, `opt_options?`): `Template`

Defined in: [module/template.ts:58](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/template.ts#L58)

Creates a new Template instance.

#### Parameters

##### http

[`Http`](Http.md)

The HTTP client used to fetch page templates from
    the server.

##### opt\_options?

Configuration options merged with defaults.
    Supported keys: `selector` (CSS selector for the view
    container, defaults to `'.template-view'`), `locale`
    (current locale string, defaults to `navigator.language`).

`object` | `undefined`

#### Returns

`Template`

## Properties

### http

> **http**: [`Http`](Http.md)

Defined in: [module/template.ts:44](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/template.ts#L44)

***

### options

> **options**: [`Objekt`](Objekt.md)\<\{ `locale`: `string`; `selector`: `string`; \}\>

Defined in: [module/template.ts:45](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/template.ts#L45)

***

### viewKnot

> **viewKnot**: [`Knot`](Knot.md)

Defined in: [module/template.ts:46](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/template.ts#L46)

## Methods

### \_spaNavigate()

> **\_spaNavigate**(`data`, `isError`): [`Knot`](Knot.md)

Defined in: [module/template.ts:166](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/template.ts#L166)

Extracts the `.page-content` element from the response DOM and
delegates to `_updateDOM()` for insertion or error handling.

#### Parameters

##### data

[`Knot`](Knot.md)

The raw response DOM from the HTTP request.

##### isError

`boolean`

Whether the response represents an error.

#### Returns

[`Knot`](Knot.md)

The extracted page content Knot.

***

### eventError()

> **eventError**(`message`): `void`

Defined in: [module/template.ts:221](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/template.ts#L221)

Overridable hook called when a template load results in an error.
The default implementation logs the error to the console. Override
this method to display error messages in the UI (e.g., via
[Flash](Flash.md)).

#### Parameters

##### message

An object containing the error `type` (CSS class)
    and `content` (error text) extracted from the response.

###### content

`string`

###### type

`string`

#### Returns

`void`

#### Example

```ts
template.eventError = (message) => {
    flash.addError(message.content);
};
```

***

### getViewKnot()

> **getViewKnot**(): [`Knot`](Knot.md)

Defined in: [module/template.ts:96](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/template.ts#L96)

Returns the main view container [Knot](Knot.md) where page content
is rendered.

#### Returns

[`Knot`](Knot.md)

The view container Knot element.

#### Example

```ts
const viewContainer = template.getViewKnot();
viewContainer.addClass('loading');
```

***

### load()

> **load**(`url`, `opt_force?`): [`Promize`](Promize.md)\<[`Knot`](Knot.md)\<`HTMLElement`\>, [`Knot`](Knot.md)\<`HTMLElement`\>\>

Defined in: [module/template.ts:132](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/template.ts#L132)

Loads page content from the given URL into the view container.

When `opt_force` is false (the default), the method first checks
the `data-template-url` and `data-locale` attributes on the view
container. If both match the requested URL and current locale, the
existing `.page-content` element is returned without making an
HTTP request.

Otherwise, an HTTP GET request is made to fetch the content. On
success, the response's `.page-content` element is extracted and
inserted into the view container. On failure, the error content is
passed to `eventError()`.

#### Parameters

##### url

`string`

The server endpoint URL to fetch the page template from.

##### opt\_force?

When true, bypasses the cache check and always
    fetches from the server. Defaults to false.

`boolean` | `undefined`

#### Returns

[`Promize`](Promize.md)\<[`Knot`](Knot.md)\<`HTMLElement`\>, [`Knot`](Knot.md)\<`HTMLElement`\>\>

A [Promize](Promize.md) that resolves with the page content
    [Knot](Knot.md) on success, or rejects with the error content
    Knot on failure.

#### Examples

```ts
template.load('/pages/settings').then((pageKnot) => {
    initSettingsPage(pageKnot);
});
```

```ts
// Force reload, bypassing the cache
template.load('/pages/settings', true).then((pageKnot) => {
    initSettingsPage(pageKnot);
});
```
