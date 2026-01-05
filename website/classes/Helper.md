# Class: Helper

Defined in: [module/helper.ts:8](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/helper.ts#L8)

## Constructors

### Constructor

> **new Helper**(): `Helper`

#### Returns

`Helper`

## Methods

### button()

> **button**(`selector`, `dom`, `callback`, `opt_description`, `opt_allowAccess`, `opt_cssClasses`): [`Knot`](Knot.md)

Defined in: [module/helper.ts:141](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/helper.ts#L141)

#### Parameters

##### selector

`string`

##### dom

[`Knot`](Knot.md)

##### callback

(`id`, `button`) => `void`

##### opt\_description

`string` = `''`

##### opt\_allowAccess

`boolean` = `true`

##### opt\_cssClasses

`string`[] = `...`

#### Returns

[`Knot`](Knot.md)

***

### buttonElement()

> **buttonElement**(`buttonKnot`, `opt_callback?`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): `void`

Defined in: [module/helper.ts:160](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/helper.ts#L160)

#### Parameters

##### buttonKnot

[`Knot`](Knot.md)

##### opt\_callback?

(`id`, `button`) => `void`

##### opt\_description?

`string` = `''`

##### opt\_allowAccess?

`boolean` = `true`

##### opt\_cssClasses?

`string`[] = `...`

#### Returns

`void`

***

### createButton()

> **createButton**(`name`, `callback`, `opt_description`, `opt_allowAccess`, `opt_cssClasses`): [`Knot`](Knot.md)

Defined in: [module/helper.ts:104](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/helper.ts#L104)

#### Parameters

##### name

`string`

##### callback

(`id`, `button`) => `void`

##### opt\_description

`string` = `''`

##### opt\_allowAccess

`boolean` = `true`

##### opt\_cssClasses

`string`[] = `...`

#### Returns

[`Knot`](Knot.md)

***

### createIconButton()

> **createIconButton**(`iconName`, `callback`, `opt_description`, `opt_allowAccess`, `opt_cssClasses`): [`Knot`](Knot.md)

Defined in: [module/helper.ts:197](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/helper.ts#L197)

#### Parameters

##### iconName

`string`

##### callback

(`id`, `button`) => `void`

##### opt\_description

`string` = `''`

##### opt\_allowAccess

`boolean` = `true`

##### opt\_cssClasses

`string`[] = `...`

#### Returns

[`Knot`](Knot.md)

***

### createLink()

> **createLink**(`name`, `opt_callback`, `opt_href`, `opt_description`, `opt_allowAccess`, `opt_cssClasses`): [`Knot`](Knot.md)

Defined in: [module/helper.ts:9](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/helper.ts#L9)

#### Parameters

##### name

`string`

##### opt\_callback

(`href`, `linkKnot`) => `void`

##### opt\_href

`string` = `'javascript:void(0)'`

##### opt\_description

`string` = `''`

##### opt\_allowAccess

`boolean` = `true`

##### opt\_cssClasses

`string`[] = `...`

#### Returns

[`Knot`](Knot.md)

***

### iconButton()

> **iconButton**(`selector`, `dom`, `callback`, `opt_description`, `opt_allowAccess`, `opt_cssClasses`): [`Knot`](Knot.md)

Defined in: [module/helper.ts:241](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/helper.ts#L241)

#### Parameters

##### selector

`string`

##### dom

[`Knot`](Knot.md)

##### callback

(`id`, `button`) => `void`

##### opt\_description

`string` = `''`

##### opt\_allowAccess

`boolean` = `true`

##### opt\_cssClasses

`string`[] = `...`

#### Returns

[`Knot`](Knot.md)

***

### iconButtonElement()

> **iconButtonElement**(`buttonKnot`, `opt_callback?`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): `void`

Defined in: [module/helper.ts:264](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/helper.ts#L264)

#### Parameters

##### buttonKnot

[`Knot`](Knot.md)

##### opt\_callback?

(`id`, `button`) => `void`

##### opt\_description?

`string` = `''`

##### opt\_allowAccess?

`boolean` = `true`

##### opt\_cssClasses?

`string`[] = `...`

#### Returns

`void`

***

### link()

> **link**(`selector`, `dom`, `opt_callback`, `opt_href`, `opt_description`, `opt_allowAccess`, `opt_cssClasses`): [`Knot`](Knot.md)

Defined in: [module/helper.ts:49](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/helper.ts#L49)

#### Parameters

##### selector

`string`

##### dom

[`Knot`](Knot.md)

##### opt\_callback

(`href`, `linkKnot`) => `void`

##### opt\_href

`string` = `''`

##### opt\_description

`string` = `''`

##### opt\_allowAccess

`boolean` = `true`

##### opt\_cssClasses

`string`[] = `[]`

#### Returns

[`Knot`](Knot.md)

***

### linkElement()

> **linkElement**(`linkKnot`, `opt_callback`, `opt_href`, `opt_description`, `opt_allowAccess`, `opt_cssClasses`): `void`

Defined in: [module/helper.ts:70](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/helper.ts#L70)

#### Parameters

##### linkKnot

[`Knot`](Knot.md)

##### opt\_callback

(`href`, `linkKnot`) => `void`

##### opt\_href

`string` = `''`

##### opt\_description

`string` = `''`

##### opt\_allowAccess

`boolean` = `true`

##### opt\_cssClasses

`string`[] = `[]`

#### Returns

`void`

***

### multipleButton()

> **multipleButton**(`selector`, `dom`, `opt_callback?`, `opt_cssClasses?`): `void`

Defined in: [module/helper.ts:123](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/helper.ts#L123)

#### Parameters

##### selector

`string`

##### dom

[`Knot`](Knot.md)

##### opt\_callback?

(`id`, `button`) => `void`

##### opt\_cssClasses?

`string`[] = `...`

#### Returns

`void`

***

### multipleIconButton()

> **multipleIconButton**(`selector`, `dom`, `opt_cssClasses`): `void`

Defined in: [module/helper.ts:220](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/helper.ts#L220)

#### Parameters

##### selector

`string`

##### dom

[`Knot`](Knot.md)

##### opt\_cssClasses

`string`[] = `...`

#### Returns

`void`

***

### multipleLink()

> **multipleLink**(`selector`, `dom`, `opt_callback`, `opt_cssClasses`): `void`

Defined in: [module/helper.ts:30](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/helper.ts#L30)

#### Parameters

##### selector

`string`

##### dom

[`Knot`](Knot.md)

##### opt\_callback

(`href`, `linkKnot`) => `void`

##### opt\_cssClasses

`string`[] = `[]`

#### Returns

`void`

***

### setGravatar()

> **setGravatar**(`imageKnot`, `defaultImageUrl`, `email`, `opt_size`, `opt_rating`): `void`

Defined in: [module/helper.ts:324](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/helper.ts#L324)

#### Parameters

##### imageKnot

[`Knot`](Knot.md)

##### defaultImageUrl

`string`

##### email

`string`

##### opt\_size

`number` = `500`

##### opt\_rating

`string` = `'g'`

#### Returns

`void`
