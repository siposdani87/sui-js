# Class: Module

Defined in: [core/module.ts:46](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/module.ts#L46)

Base class for the application's revealing module pattern. Module manages
dependency injection, service lifecycle, and controller routing. It acts
as the central coordinator between [State](State.md) (routing), services
(long-lived modules), and controllers (per-route modules).

Services are registered via `add()` and initialized in topological
dependency order by `handleServices()`. Routes are wired through
`handleRoutes()`, which creates a [State](State.md) instance and connects
state change events to the controller enter/exit lifecycle.

Subclasses override the `event*` hook methods to integrate with the
application's UI layer (e.g., showing loaders, updating navigation,
rendering templates).

## Example

```ts
const module = new Module();

// Register services with their dependency injections
module.add('userService', ['http', 'config'], UserService);
module.add('authService', ['http', 'userService'], AuthService);

// Register a controller
module.add('dashboardCtrl', ['userService', 'dom'], DashboardController);

// Wire routes and start
module.handleRoutes(routes, routeOptions);
module.load(instances, injections);
module.handleServices(['userService', 'authService']);
```

## See

 - [State](State.md)
 - [Async](Async.md)
 - [Promize](Promize.md)

## Constructors

### Constructor

> **new Module**(): `Module`

Defined in: [core/module.ts:59](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/module.ts#L59)

Creates a new Module instance with an empty module registry and a
default no-op controller.

#### Returns

`Module`

## Methods

### add()

> **add**(`name`, `moduleInjections`, `moduleCallback`): `string`

Defined in: [core/module.ts:116](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/module.ts#L116)

Registers a named module (service or controller) with its dependency
injection list and constructor reference. The module is stored
internally and later instantiated by `handleServices()` or during
route-based controller initialization.

#### Parameters

##### name

`string`

Unique name identifying this module. Used as the key
    in the instances map after instantiation.

##### moduleInjections

`string`[]

Array of dependency names that will be
    resolved from the instances map and passed to the constructor.

##### moduleCallback

[`ClassRef`](../type-aliases/ClassRef.md)

The constructor function (class reference)
    to instantiate when resolving this module.

#### Returns

`string`

The registered module name.

#### Example

```ts
module.add('dashboardCtrl', ['http', 'config', 'dom'], DashboardController);
```

***

### eventAfterInit()

> **eventAfterInit**(): `void`

Defined in: [core/module.ts:494](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/module.ts#L494)

Overridable lifecycle hook called after all service initialization
calls have been queued but before they begin executing. Logs by
default; override to perform early setup tasks.

#### Returns

`void`

***

### eventControllerFailed()

> **eventControllerFailed**(): `void`

Defined in: [core/module.ts:420](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/module.ts#L420)

Overridable lifecycle hook called when no controller is found for
the current route. Logs by default; override to show error states.

#### Returns

`void`

***

### eventControllerLoaded()

> **eventControllerLoaded**(`dom`): `void`

Defined in: [core/module.ts:412](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/module.ts#L412)

Overridable lifecycle hook called when a controller has been
successfully loaded and its `enter()` method has completed.
Logs by default; override to integrate with the application UI.

#### Parameters

##### dom

[`Knot`](Knot.md)

The [Knot](Knot.md) DOM container rendered by the controller.

#### Returns

`void`

***

### eventDomChange()

> **eventDomChange**(`state`, `dom`): [`Promize`](Promize.md)\<`object`, `object`\>

Defined in: [core/module.ts:482](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/module.ts#L482)

Overridable lifecycle hook called when the DOM container is ready
for the new controller. Returns a [Promize](Promize.md) to allow
asynchronous operations (such as DOM preparation or cleanup)
before the controller is instantiated.

The default implementation resolves immediately. Override to
insert async logic before controller instantiation.

#### Parameters

##### state

[`Objekt`](Objekt.md)

The [Objekt](Objekt.md) representing the current state.

##### dom

[`Knot`](Knot.md)

The [Knot](Knot.md) DOM container for the controller.

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>

A [Promize](Promize.md) that must be resolved to continue
    controller initialization.

***

### eventModuleFailed()

> **eventModuleFailed**(`state`): `void`

Defined in: [core/module.ts:432](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/module.ts#L432)

Overridable lifecycle hook called when a module (template) fails
to load for the given state. Logs by default; override to display
error feedback to the user.

#### Parameters

##### state

[`Objekt`](Objekt.md)

The [Objekt](Objekt.md) representing the state whose
    module failed to load.

#### Returns

`void`

***

### eventModuleLoaded()

> **eventModuleLoaded**(`state`): `void`

Defined in: [core/module.ts:444](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/module.ts#L444)

Overridable lifecycle hook called when a module (template) has
been successfully loaded for the given state. Logs by default;
override to update navigation or page title.

#### Parameters

##### state

[`Objekt`](Objekt.md)

The [Objekt](Objekt.md) representing the state whose
    module was loaded.

#### Returns

`void`

***

### eventServiceFailed()

> **eventServiceFailed**(): `void`

Defined in: [core/module.ts:512](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/module.ts#L512)

Overridable lifecycle hook called when service initialization
fails. Logs by default; override to handle initialization errors
gracefully.

#### Returns

`void`

***

### eventServiceLoaded()

> **eventServiceLoaded**(): `void`

Defined in: [core/module.ts:503](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/module.ts#L503)

Overridable lifecycle hook called when all registered services
have been successfully initialized. Logs by default; override to
signal application readiness.

#### Returns

`void`

***

### eventStateChange()

> **eventStateChange**(`state`): [`Promize`](Promize.md)\<`object`, `object`\>

Defined in: [core/module.ts:461](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/module.ts#L461)

Overridable lifecycle hook called when the application state
changes. Returns a [Promize](Promize.md) to allow asynchronous operations
(such as transition animations or data prefetching) before the
controller lifecycle continues.

The default implementation resolves immediately. Override to
insert async logic before controller initialization.

#### Parameters

##### state

[`Objekt`](Objekt.md)

The [Objekt](Objekt.md) representing the new active state.

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>

A [Promize](Promize.md) that must be resolved to continue the
    state change lifecycle.

***

### getController()

> **getController**(): `object`

Defined in: [core/module.ts:95](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/module.ts#L95)

Returns the current controller object. The controller is the module
instance associated with the active route, exposing `enter()` and
`exit()` lifecycle methods.

#### Returns

`object`

The current controller object with enter/exit methods.

#### Example

```ts
const controller = module.getController();
```

***

### handleRoutes()

> **handleRoutes**(`routes`, `options`): `void`

Defined in: [core/module.ts:306](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/module.ts#L306)

Sets up the [State](State.md) instance with route definitions and wires
state change events to the controller lifecycle. When the state
changes, the previous controller's `exit()` method is called (if
applicable) before the new controller is initialized.

#### Parameters

##### routes

[`Route`](Route.md)[]

Array of [Route](Route.md) definitions mapping URL
    patterns to controllers and templates.

##### options

`object`

Configuration options passed to the [State](State.md)
    constructor (e.g., base URL, default route).

#### Returns

`void`

#### Example

```ts
module.handleRoutes([
    new Route('/dashboard', 'dashboardCtrl', 'dashboard.html'),
    new Route('/settings', 'settingsCtrl', 'settings.html'),
], { basePath: '/app' });
```

***

### handleServices()

> **handleServices**(`services`): `void`

Defined in: [core/module.ts:258](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/module.ts#L258)

Resolves and initializes services in topological order, respecting
their declared dependency injections. Each service is instantiated
and its `enter()` method (if present) is called via [Async](Async.md)
serial execution.

After all services are initialized, `eventServiceLoaded()` is fired
and `state.run()` is called to activate routing. If any service
fails to initialize, `eventServiceFailed()` is fired instead.

#### Parameters

##### services

`string`[]

Array of service names (as registered via `add()`)
    to initialize.

#### Returns

`void`

#### Example

```ts
module.handleServices(['http', 'eventBus', 'userService']);
```

***

### load()

> **load**(`instances`, `injections`): `void`

Defined in: [core/module.ts:80](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/module.ts#L80)

Receives the framework's shared instances map and injection name
mappings. This must be called before `handleServices()` so that
dependency resolution can look up framework-provided instances.

#### Parameters

##### instances

[`Instance`](../type-aliases/Instance.md)

The shared framework instances (services, config,
    DOM references, etc.) keyed by their canonical names.

##### injections

[`Injection`](../type-aliases/Injection.md)

Name mappings that allow modules to reference
    framework instances by alternate keys.

#### Returns

`void`

#### Example

```ts
module.load(app.getInstances(), app.getInjections());
```
