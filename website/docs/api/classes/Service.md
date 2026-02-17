# Class: Service

Defined in: [common/service.ts:19](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/common/service.ts#L19)

Base service class with an `enter()` lifecycle hook.

## Description

Services provide shared business logic and are managed by
the [Application](Application.md) dependency injection container. Override `enter()`
to initialize the service when it is first activated.

## Example

```ts
class AuthService extends Service {
    enter(): void {
        // Initialize authentication state
    }
}
```

## See

 - [Application](Application.md)
 - [Module](Module.md)

## Constructors

### Constructor

> **new Service**(): `Service`

#### Returns

`Service`

## Methods

### enter()

> **enter**(): `void`

Defined in: [common/service.ts:23](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/common/service.ts#L23)

Called when the service is activated. Override to perform initialization.

#### Returns

`void`
