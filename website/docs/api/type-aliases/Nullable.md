# Type Alias: Nullable\<T\>

> **Nullable**\<`T`\> = `T` \| `null`

Defined in: [utils/types.ts:216](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L216)

Helper type that adds `null` to a type union.

Use this to explicitly mark values that may be absent rather than
relying on implicit `undefined`.

## Type Parameters

### T

`T`

The base type.
