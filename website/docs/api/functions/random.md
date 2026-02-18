# Function: random()

> **random**(`min`, `max`, `opt_onlyFloat?`): `number`

Defined in: [utils/math.ts:231](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/math.ts#L231)

Generates a random number between `min` and `max`.

When `opt_onlyFloat` is `false` (default), produces a random integer in
the inclusive range `[min, max]`. When `true`, produces a continuous
floating-point value in the range `[min, max)`.

## Parameters

### min

`number`

The lower bound of the range (inclusive).

### max

`number`

The upper bound of the range (inclusive for integers,
    exclusive for floats).

### opt\_onlyFloat?

When `true`, returns a
    floating-point number instead of an integer. Defaults to `false`.

`boolean` | `undefined`

## Returns

`number`

A random number within the specified range.

## Examples

```ts
random(1, 10);
// An integer between 1 and 10 (inclusive)
```

```ts
random(0, 1, true);
// A float between 0 (inclusive) and 1 (exclusive)
```
