# Function: mdl()

> **mdl**(`node`, `opt_forceDowngrade?`): `void`

Defined in: [utils/render.ts:44](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/render.ts#L44)

Triggers a Material Design Lite component upgrade on a DOM element.

If `opt_forceDowngrade` is `true` (the default), any existing MDL
components on the element are downgraded first, allowing clean
re-initialization. When `node` is falsy the entire DOM is upgraded
via `componentHandler.upgradeDom()`.

Accepts either a [Knot](../classes/Knot.md) wrapper or a raw `HTMLElement`.

## Parameters

### node

The element to upgrade. Pass a [Knot](../classes/Knot.md) instance or
  a raw `HTMLElement`. If falsy, the entire document is upgraded.

`HTMLElement` | [`Knot`](../classes/Knot.md)\<`HTMLElement`\>

### opt\_forceDowngrade?

`boolean` = `true`

When `true`, downgrades existing MDL
  components before upgrading. Defaults to `true`.

## Returns

`void`

## Examples

```ts
// Upgrade a Knot element with forced downgrade
mdl(myKnot);
```

```ts
// Upgrade without downgrading first
mdl(myKnot, false);
```

```ts
// Upgrade the entire DOM
mdl(null);
```
