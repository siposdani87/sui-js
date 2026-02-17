# Type Alias: Dependency

> **Dependency** = `object`

Defined in: [utils/types.ts:237](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/types.ts#L237)

Module dependency descriptor for the DI system.

Pairs a list of injection token names with the constructor that
requires them. The DI container resolves each token in
`moduleInjections` and passes them as arguments to `moduleCallback`.

## Properties

### moduleCallback

> **moduleCallback**: [`ClassRef`](ClassRef.md)

Defined in: [utils/types.ts:241](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/types.ts#L241)

The module constructor to instantiate with the resolved dependencies.

***

### moduleInjections

> **moduleInjections**: `string`[]

Defined in: [utils/types.ts:239](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/types.ts#L239)

Ordered list of injection token names to resolve.
