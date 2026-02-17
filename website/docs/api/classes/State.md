# Class: State

Defined in: [core/state.ts:38](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L38)

Manages application state via URL-based routing using the browser
History API. State maintains a collection of [Route](Route.md) definitions,
matches the current URL against those routes using [Router](Router.md), and
triggers state change notifications when navigation occurs.

State supports both hash-based (`#/path`) and path-based (`/path`)
routing, auto-detecting the mode from the `<base href>` tag. It
integrates with `window.history` for pushState/replaceState navigation
and handles browser back/forward via the `popstate` event.

The [eventChange](#eventchange) method is designed to be overridden by subclasses
(such as [Module](Module.md)) to react to state transitions.

## Example

```ts
const routes = [
    new Route('home', 'Home', '/', 'HomeController'),
    new Route('user', 'User Profile', '/users/:id', 'UserController'),
];

const state = new State(routes, { root: { id: 'home' } });
state.go('user', { id: 42 });
state.getParam('id'); // 42
```

## See

 - [Router](Router.md)
 - [Route](Route.md)
 - [Module](Module.md)

## Constructors

### Constructor

> **new State**(`routes`, `opt_options?`): `State`

Defined in: [core/state.ts:55](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L55)

Creates a new State instance with the given route definitions and
options. Initializes the base path, parses the current URL, and
sets up the `popstate` event listener for browser navigation.

#### Parameters

##### routes

[`Route`](Route.md)[]

Array of [Route](Route.md) objects defining the
    application's available routes.

##### opt\_options?

Configuration options. Supports `root.id` and
    `root.params` to define the fallback root route.

`object` | `undefined`

#### Returns

`State`

## Properties

### basePath

> **basePath**: `string`

Defined in: [core/state.ts:42](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L42)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [core/state.ts:43](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L43)

***

### routes

> **routes**: [`Collection`](Collection.md)\<[`Route`](Route.md)\>

Defined in: [core/state.ts:41](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L41)

## Methods

### back()

> **back**(): `void`

Defined in: [core/state.ts:512](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L512)

Navigates one step back in browser history.

#### Returns

`void`

#### Example

```ts
state.back();
```

***

### eventChange()

> **eventChange**(`currentState`, `previousState`, `opt_force?`): `void`

Defined in: [core/state.ts:558](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L558)

Called when the application state changes due to navigation. This
is a hook method intended to be overridden by subclasses (such as
[Module](Module.md)) to respond to route transitions. The default
implementation logs the state change to the console.

#### Parameters

##### currentState

[`Objekt`](Objekt.md)

The newly active route state as an [Objekt](Objekt.md).

##### previousState

[`Objekt`](Objekt.md)

The previously active route state as an
    [Objekt](Objekt.md).

##### opt\_force?

Whether the change was forced (e.g., navigating
    to the same route).

`boolean` | `undefined`

#### Returns

`void`

***

### forward()

> **forward**(): `void`

Defined in: [core/state.ts:542](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L542)

Navigates one step forward in browser history.

#### Returns

`void`

#### Example

```ts
state.forward();
```

***

### getCurrent()

> **getCurrent**\<`T`\>(`opt_attribute?`, `opt_defaultValue?`): `T`

Defined in: [core/state.ts:317](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L317)

Retrieves the current route state or a specific attribute from it.
When called without arguments, returns the full current state as
an [Objekt](Objekt.md). When called with an attribute path, returns that
nested value.

#### Type Parameters

##### T

`T`

#### Parameters

##### opt\_attribute?

`string`

Dot-notation path to a specific attribute
    within the current state (e.g., `'params.id'`).

##### opt\_defaultValue?

`T`

Default value returned when the attribute
    does not exist.

#### Returns

`T`

The full current state or the requested attribute value.

#### Example

```ts
const currentRoute = state.getCurrent<Objekt>();
const routeId = state.getCurrent<string>('id');
```

***

### getParam()

> **getParam**\<`T`\>(`name`, `opt_defaultValue?`): `T`

Defined in: [core/state.ts:625](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L625)

Retrieves a single parameter value from the current route by name.
Returns the default value if the parameter does not exist.

#### Type Parameters

##### T

`T` = `string`

#### Parameters

##### name

`string`

The parameter name to retrieve.

##### opt\_defaultValue?

`any`

Value returned when the parameter is not set.

#### Returns

`T`

The parameter value, automatically type-cast.

#### Example

```ts
const userId = state.getParam<number>('id');
const page = state.getParam<number>('page', 1);
```

***

### getParams()

> **getParams**(): [`Objekt`](Objekt.md)

Defined in: [core/state.ts:610](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L610)

Returns all parameters of the current route as an [Objekt](Objekt.md).

#### Returns

[`Objekt`](Objekt.md)

The current route's parameters, or an empty [Objekt](Objekt.md)
    if no parameters are set.

#### Example

```ts
const params = state.getParams();
console.log(params.get('id'));
```

***

### getPrevious()

> **getPrevious**\<`T`\>(`opt_attribute?`, `opt_defaultValue?`): `T`

Defined in: [core/state.ts:335](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L335)

Retrieves the previous route state or a specific attribute from it.
Works identically to [getCurrent](#getcurrent) but returns the state that
was active before the last navigation.

#### Type Parameters

##### T

`T`

#### Parameters

##### opt\_attribute?

`string`

Dot-notation path to a specific attribute
    within the previous state.

##### opt\_defaultValue?

`T`

Default value returned when the attribute
    does not exist.

#### Returns

`T`

The full previous state or the requested attribute value.

#### Example

```ts
const previousRoute = state.getPrevious<Objekt>();
const previousId = state.getPrevious<string>('id');
```

***

### getRoot()

> **getRoot**(): `any`[]

Defined in: [core/state.ts:662](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L662)

Returns the configured root route ID and parameters as a
two-element array.

#### Returns

`any`[]

An array of `[rootId, rootParams]` from the options.

#### Example

```ts
const [rootId, rootParams] = state.getRoot();
```

***

### go()

> **go**(`id`, `opt_params?`, `opt_overwrite?`, `opt_force?`): `void`

Defined in: [core/state.ts:365](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L365)

Navigates to a route by its ID or by a direct URL path. When given
a route ID, resolves the URL from the registered routes and
substitutes the provided parameters. When given a path starting
with `#` or `/`, parses it directly against registered routes.

Pushes a new browser history entry by default, or replaces the
current entry when `opt_overwrite` is `true`.

#### Parameters

##### id

`string`

Route identifier string, or a URL path starting with
    `#` or `/`.

##### opt\_params?

`object`

Parameters to substitute into the route pattern.

##### opt\_overwrite?

When `true`, replaces the current history
    entry instead of pushing a new one.

`boolean` | `undefined`

##### opt\_force?

When `true`, forces the state change event even
    if navigating to the same route.

`boolean` | `undefined`

#### Returns

`void`

#### Example

```ts
// Navigate by route ID with parameters
state.go('user', { id: 42 });

// Navigate by URL path
state.go('/users/42');

// Replace current history entry
state.go('home', {}, true);
```

***

### goBack()

> **goBack**(`id`, `opt_params?`, `opt_overwrite?`, `opt_force?`): `void`

Defined in: [core/state.ts:493](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L493)

Navigates to a fallback route if browser history is empty, otherwise
goes back one step in history. Useful for "back" buttons that need
a guaranteed destination.

#### Parameters

##### id

`string`

Fallback route ID to navigate to if history is empty.

##### opt\_params?

`object`

Parameters for the fallback route.

##### opt\_overwrite?

When `true`, replaces the current history entry
    (only used for the fallback navigation).

`boolean` | `undefined`

##### opt\_force?

When `true`, forces the state change event
    (only used for the fallback navigation).

`boolean` | `undefined`

#### Returns

`void`

#### Example

```ts
// Go back in history, or navigate to 'dashboard' if no history
state.goBack('dashboard', { tab: 'overview' });
```

***

### goRoot()

> **goRoot**(`opt_overwrite?`, `opt_force?`): `void`

Defined in: [core/state.ts:466](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L466)

Navigates to the configured root route. The root route ID and
parameters are defined in the constructor options.

#### Parameters

##### opt\_overwrite?

When `true`, replaces the current history entry.

`boolean` | `undefined`

##### opt\_force?

When `true`, forces the state change event.

`boolean` | `undefined`

#### Returns

`void`

#### Example

```ts
state.goRoot(); // Navigate to the root/home route
```

***

### goState()

> **goState**(`state`, `opt_overwrite?`, `opt_force?`): `void`

Defined in: [core/state.ts:449](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L449)

Navigates to a route using an existing [Route](Route.md) object. Extracts
the route's ID and parameters and delegates to [go](#go).

#### Parameters

##### state

[`Route`](Route.md)

The [Route](Route.md) object to navigate to.

##### opt\_overwrite?

When `true`, replaces the current history entry.

`boolean` | `undefined`

##### opt\_force?

When `true`, forces the state change event.

`boolean` | `undefined`

#### Returns

`void`

#### Example

```ts
const route = state.routes.findById('dashboard');
state.goState(route);
```

***

### redirect()

> **redirect**(`url`, `opt_inTab?`): `void`

Defined in: [core/state.ts:528](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L528)

Performs a full page navigation to the given URL. Unlike [go](#go),
this does not use the History API and causes a complete page load.
Optionally opens the URL in a new browser tab.

#### Parameters

##### url

`string`

The full URL to navigate to.

##### opt\_inTab?

When `true`, opens the URL in a new tab instead
    of navigating the current window.

`boolean` | `undefined`

#### Returns

`void`

#### Example

```ts
state.redirect('https://example.com');
state.redirect('https://docs.example.com', true); // New tab
```

***

### refresh()

> **refresh**(`opt_force?`): `void`

Defined in: [core/state.ts:650](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L650)

Re-triggers the [eventChange](#eventchange) callback for the current state
without navigating. Useful for forcing a view re-render.

#### Parameters

##### opt\_force?

When `true`, forces the event even if the state
    has not changed.

`boolean` | `undefined`

#### Returns

`void`

#### Example

```ts
state.refresh();       // Re-trigger with default behavior
state.refresh(true);   // Force re-trigger
```

***

### reload()

> **reload**(): `void`

Defined in: [core/state.ts:636](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L636)

Performs a full page reload, discarding all client-side state.

#### Returns

`void`

#### Example

```ts
state.reload();
```

***

### resolveUrl()

> **resolveUrl**(`id`, `opt_params?`): `string`

Defined in: [core/state.ts:433](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L433)

Builds a full navigable URL for a route ID and parameters, including
the routing prefix (hash or path-based). Useful for generating
`href` values for links.

#### Parameters

##### id

`string`

Route identifier to resolve.

##### opt\_params?

`object`

Parameters to substitute into the route pattern.

#### Returns

`string`

The fully resolved URL string including the routing prefix.

#### Example

```ts
const href = state.resolveUrl('user', { id: 42 });
// '/#/users/42' (hash mode) or '/users/42' (path mode)
```

***

### run()

> **run**(): `void`

Defined in: [core/state.ts:166](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L166)

Triggers the initial state change after construction. Call this
method to begin routing and notify listeners of the current state.

#### Returns

`void`

#### Example

```ts
const state = new State(routes);
state.run(); // Fires eventChange with the initial route
```

***

### setParam()

> **setParam**(`name`, `value`): `void`

Defined in: [core/state.ts:594](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L594)

Sets a single URL parameter on the current route and re-navigates
with the updated parameters (replacing the current history entry).

#### Parameters

##### name

`string`

The parameter name to set.

##### value

`any`

The parameter value to assign.

#### Returns

`void`

#### Example

```ts
state.setParam('page', 3);
```

***

### setParams()

> **setParams**(`properties`): `void`

Defined in: [core/state.ts:579](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/state.ts#L579)

Sets multiple URL parameters at once on the current route. Each
key-value pair is applied individually via [setParam](#setparam).

#### Parameters

##### properties

`object`

An object of parameter names and values to set.

#### Returns

`void`

#### Example

```ts
state.setParams({ page: 2, sort: 'name' });
```
