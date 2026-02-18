# Class: Application

Defined in: [component/application.ts:51](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/application.ts#L51)

## Description

Main entry point for the SUI-JS framework. Manages the dependency injection
container and initializes all framework modules and services.

## Example

```ts
const app = new Application(
    { app_id: 'my-app', locale: 'en-US', backend: '/api', production: true },
    { flash: 'flash' },
);
app.run(routes, ['authService']);
```

## See

 - [Module](Module.md) for the underlying module system
 - [Route](Route.md) for route configuration
 - [Instance](../type-aliases/Instance.md) for the full DI container interface

## Constructors

### Constructor

> **new Application**(`options`, `resources`): `Application`

Defined in: [component/application.ts:65](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/application.ts#L65)

#### Parameters

##### options

`object`

Configuration options merged with defaults (app_id, locale, backend, production, secret, theme_color).

##### resources

[`Injection`](../type-aliases/Injection.md)

Dependency injection map that binds token names to service identifiers.

#### Returns

`Application`

#### Description

Creates a new Application instance, merges options with defaults, and
initializes all framework modules.

## Properties

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/application.ts:52](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/application.ts#L52)

## Methods

### controller()

> **controller**(`name`, `moduleInjections`, `moduleCallback`): `string`

Defined in: [component/application.ts:673](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/application.ts#L673)

#### Parameters

##### name

`string`

Unique name for the controller.

##### moduleInjections

`string`[]

Array of dependency injection token names.

##### moduleCallback

[`ClassRef`](../type-aliases/ClassRef.md)

The controller class constructor.

#### Returns

`string`

The registered module name.

#### Description

Registers a controller module with the given name, dependencies, and constructor.

#### Example

```ts
app.controller('homeCtrl', ['http', 'template'], HomeController);
```

***

### getController()

> **getController**(): `object` \| `null`

Defined in: [component/application.ts:630](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/application.ts#L630)

#### Returns

`object` \| `null`

The active controller, or null if none is loaded.

#### Description

Returns the currently active controller instance.

#### Example

```ts
const ctrl = app.getController();
```

***

### getInstance()

> **getInstance**(`name`): `object` \| `null`

Defined in: [component/application.ts:618](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/application.ts#L618)

#### Parameters

##### name

keyof [`Instance`](../type-aliases/Instance.md)

The key identifying the service instance.

#### Returns

`object` \| `null`

The resolved service instance, or null if not found.

#### Description

Retrieves a service instance from the DI container by name.

#### Example

```ts
const http = app.getInstance('http');
```

***

### getLanguage()

> **getLanguage**(): `string`

Defined in: [component/application.ts:136](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/application.ts#L136)

#### Returns

`string`

The ISO 639-1 language code.

#### Description

Returns the language code extracted from the current locale (e.g., "en" from "en-US").

#### Example

```ts
const lang = app.getLanguage(); // 'en'
```

***

### getLocale()

> **getLocale**(): `string`

Defined in: [component/application.ts:150](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/application.ts#L150)

#### Returns

`string`

The BCP 47 locale string (e.g., "en-US").

#### Description

Returns the current locale, falling back to the configured default if none
is stored in local storage.

#### Example

```ts
const locale = app.getLocale(); // 'en-US'
```

***

### run()

> **run**(`routes`, `services`): `void`

Defined in: [component/application.ts:646](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/application.ts#L646)

#### Parameters

##### routes

[`Route`](Route.md)[]

Array of [Route](Route.md) definitions for the router.

##### services

`string`[]

Array of service names to initialize at startup.

#### Returns

`void`

#### Description

Starts the application by registering routes and loading services.

#### Example

```ts
app.run(
    [new Route('home', 'Home', '/', 'homeCtrl', '/templates/home.html')],
    ['authService', 'analyticsService'],
);
```

***

### service()

> **service**(`name`, `moduleInjections`, `moduleCallback`): `string`

Defined in: [component/application.ts:692](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/application.ts#L692)

#### Parameters

##### name

`string`

Unique name for the service.

##### moduleInjections

`string`[]

Array of dependency injection token names.

##### moduleCallback

[`ClassRef`](../type-aliases/ClassRef.md)

The service class constructor.

#### Returns

`string`

The registered module name.

#### Description

Registers a service module with the given name, dependencies, and constructor.

#### Example

```ts
app.service('authService', ['http', 'localDepot'], AuthService);
```

***

### setLocale()

> **setLocale**(`locale`): `void`

Defined in: [component/application.ts:166](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/application.ts#L166)

#### Parameters

##### locale

`string`

The BCP 47 locale string to set (e.g., "hu-HU").

#### Returns

`void`

#### Description

Sets the application locale and persists it to local storage.

#### Example

```ts
app.setLocale('hu-HU');
```

***

### setLocaleWithReload()

> **setLocaleWithReload**(`locale`): `void`

Defined in: [component/application.ts:179](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/application.ts#L179)

#### Parameters

##### locale

`string`

The BCP 47 locale string to set.

#### Returns

`void`

#### Description

Sets the application locale and reloads the current state to apply it.

#### Example

```ts
app.setLocaleWithReload('de-DE');
```

***

### setRootState()

> **setRootState**(`id`, `opt_params?`): `void`

Defined in: [component/application.ts:604](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/application.ts#L604)

#### Parameters

##### id

`string`

The route identifier to use as the root state.

##### opt\_params?

`object`

Optional route parameters.

#### Returns

`void`

#### Description

Sets the root (default) state that the router navigates to initially.

#### Example

```ts
app.setRootState('dashboard', { tab: 'overview' });
```
