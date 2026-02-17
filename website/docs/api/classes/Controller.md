# Class: Controller

Defined in: [common/controller.ts:22](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/common/controller.ts#L22)

Base controller class with `enter()` and `exit()` lifecycle hooks.

## Description

Controllers manage page-level logic and are instantiated by
the [Application](Application.md) router. Override `enter()` to set up the page
and `exit()` to tear down resources when navigating away.

## Example

```ts
class HomeController extends Controller {
    enter(): void {
        // Set up home page
    }
    exit(): void {
        // Clean up resources
    }
}
```

## See

 - [Application](Application.md)
 - [Module](Module.md)

## Constructors

### Constructor

> **new Controller**(): `Controller`

#### Returns

`Controller`

## Methods

### enter()

> **enter**(): `void`

Defined in: [common/controller.ts:26](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/common/controller.ts#L26)

Called when the controller becomes active. Override to initialize page logic.

#### Returns

`void`

***

### exit()

> **exit**(): `void`

Defined in: [common/controller.ts:33](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/common/controller.ts#L33)

Called when the controller is deactivated. Override to clean up resources.

#### Returns

`void`
