# Class: Knot\<T\>

Defined in: [core/knot.ts:18](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L18)

## Type Parameters

### T

`T` *extends* `HTMLElement` = `HTMLElement`

## Constructors

### Constructor

> **new Knot**\<`T`\>(`node`, `opt_parentKnot?`): `Knot`\<`T`\>

Defined in: [core/knot.ts:23](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L23)

#### Parameters

##### node

`string` | `HTMLElement` | `T`

##### opt\_parentKnot?

`Knot`\<`HTMLElement`\>

#### Returns

`Knot`\<`T`\>

## Properties

### listenerStoreKey

> **listenerStoreKey**: `string`

Defined in: [core/knot.ts:21](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L21)

***

### node

> **node**: `T`

Defined in: [core/knot.ts:19](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L19)

***

### parentKnot

> **parentKnot**: `Knot`\<`HTMLElement`\>

Defined in: [core/knot.ts:20](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L20)

## Methods

### addClass()

> **addClass**(`cssClasses`): `void`

Defined in: [core/knot.ts:111](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L111)

#### Parameters

##### cssClasses

`string` | `string`[]

#### Returns

`void`

***

### addEventListener()

> **addEventListener**(`eventName`, `opt_callback?`): `Function`

Defined in: [core/knot.ts:187](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L187)

#### Parameters

##### eventName

`string`

##### opt\_callback?

(`knot`, `event`) => `any`

#### Returns

`Function`

***

### afterChild()

> **afterChild**(`knot`): `boolean`

Defined in: [core/knot.ts:304](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L304)

#### Parameters

##### knot

`Knot`

#### Returns

`boolean`

***

### appendChild()

> **appendChild**(`knot`): `void`

Defined in: [core/knot.ts:256](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L256)

#### Parameters

##### knot

`Knot`

#### Returns

`void`

***

### beforeChild()

> **beforeChild**(`knot`): `boolean`

Defined in: [core/knot.ts:292](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L292)

#### Parameters

##### knot

`Knot`

#### Returns

`boolean`

***

### createElement()

> **createElement**\<`K`\>(`tagName`): `Knot`\<`K`\>

Defined in: [core/knot.ts:249](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L249)

#### Type Parameters

##### K

`K` *extends* `HTMLElement` = `HTMLElement`

#### Parameters

##### tagName

`string`

#### Returns

`Knot`\<`K`\>

***

### dispatchEvent()

> **dispatchEvent**(`event`): `void`

Defined in: [core/knot.ts:239](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L239)

#### Parameters

##### event

`Event`

#### Returns

`void`

***

### exists()

> **exists**(): `boolean`

Defined in: [core/knot.ts:438](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L438)

#### Returns

`boolean`

***

### get()

> **get**(`attribute`): `any`

Defined in: [core/knot.ts:59](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L59)

#### Parameters

##### attribute

`string`

#### Returns

`any`

***

### getAttribute()

> **getAttribute**(`attribute`): `any`

Defined in: [core/knot.ts:167](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L167)

#### Parameters

##### attribute

`string`

#### Returns

`any`

***

### getClasses()

> **getClasses**(): `string`[]

Defined in: [core/knot.ts:131](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L131)

#### Returns

`string`[]

***

### getComputedStyle()

> **getComputedStyle**(): `CSSStyleDeclaration`

Defined in: [core/knot.ts:414](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L414)

#### Returns

`CSSStyleDeclaration`

***

### getData()

> **getData**(`name`): `any`

Defined in: [core/knot.ts:379](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L379)

#### Parameters

##### name

`string`

#### Returns

`any`

***

### getFor()

> **getFor**(): `string`

Defined in: [core/knot.ts:87](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L87)

#### Returns

`string`

***

### getHtml()

> **getHtml**(`opt_isInner`): `string`

Defined in: [core/knot.ts:354](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L354)

#### Parameters

##### opt\_isInner

`boolean` = `false`

#### Returns

`string`

***

### getId()

> **getId**(): `string`

Defined in: [core/knot.ts:74](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L74)

#### Returns

`string`

***

### getNextSibling()

> **getNextSibling**(): `Knot`

Defined in: [core/knot.ts:344](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L344)

#### Returns

`Knot`

***

### getNode()

> **getNode**(): `T`

Defined in: [core/knot.ts:66](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L66)

#### Returns

`T`

***

### getParentKnot()

> **getParentKnot**(): `Knot`\<`HTMLElement`\>

Defined in: [core/knot.ts:397](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L397)

#### Returns

`Knot`\<`HTMLElement`\>

***

### getStyle()

> **getStyle**(): `CSSStyleDeclaration`

Defined in: [core/knot.ts:418](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L418)

#### Returns

`CSSStyleDeclaration`

***

### getTagName()

> **getTagName**(): `string`

Defined in: [core/knot.ts:70](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L70)

#### Returns

`string`

***

### getText()

> **getText**(): `string`

Defined in: [core/knot.ts:365](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L365)

#### Returns

`string`

***

### hasAttribute()

> **hasAttribute**(`attribute`): `boolean`

Defined in: [core/knot.ts:183](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L183)

#### Parameters

##### attribute

`string`

#### Returns

`boolean`

***

### hasChildren()

> **hasChildren**(): `boolean`

Defined in: [core/knot.ts:266](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L266)

#### Returns

`boolean`

***

### hasClass()

> **hasClass**(`cssClass`): `boolean`

Defined in: [core/knot.ts:94](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L94)

#### Parameters

##### cssClass

`string`

#### Returns

`boolean`

***

### insert()

> **insert**(`knot`): `void`

Defined in: [core/knot.ts:287](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L287)

#### Parameters

##### knot

`Knot`

#### Returns

`void`

***

### insertAfter()

> **insertAfter**(`knot`): `boolean`

Defined in: [core/knot.ts:322](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L322)

#### Parameters

##### knot

`Knot`

#### Returns

`boolean`

***

### insertBefore()

> **insertBefore**(`knot`): `boolean`

Defined in: [core/knot.ts:313](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L313)

#### Parameters

##### knot

`Knot`

#### Returns

`boolean`

***

### isEmpty()

> **isEmpty**(): `boolean`

Defined in: [core/knot.ts:434](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L434)

#### Returns

`boolean`

***

### merge()

> **merge**(`properties`): `void`

Defined in: [core/knot.ts:53](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L53)

#### Parameters

##### properties

`object`

#### Returns

`void`

***

### remove()

> **remove**(): `void`

Defined in: [core/knot.ts:280](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L280)

#### Returns

`void`

***

### removeAttribute()

> **removeAttribute**(`attribute`): `void`

Defined in: [core/knot.ts:179](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L179)

#### Parameters

##### attribute

`string`

#### Returns

`void`

***

### removeChild()

> **removeChild**(`knot`): `void`

Defined in: [core/knot.ts:270](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L270)

#### Parameters

##### knot

`Knot`

#### Returns

`void`

***

### removeChildren()

> **removeChildren**(): `void`

Defined in: [core/knot.ts:260](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L260)

#### Returns

`void`

***

### removeClass()

> **removeClass**(`cssClasses`): `void`

Defined in: [core/knot.ts:119](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L119)

#### Parameters

##### cssClasses

`string` | `string`[]

#### Returns

`void`

***

### removeData()

> **removeData**(`name`): `void`

Defined in: [core/knot.ts:390](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L390)

#### Parameters

##### name

`string`

#### Returns

`void`

***

### removeEventListener()

> **removeEventListener**(`eventName`, `listener`): `void`

Defined in: [core/knot.ts:225](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L225)

#### Parameters

##### eventName

keyof `GlobalEventHandlersEventMap`

##### listener

[`Listener`](../type-aliases/Listener.md)

#### Returns

`void`

***

### removeEventListeners()

> **removeEventListeners**(`eventName`): `void`

Defined in: [core/knot.ts:232](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L232)

#### Parameters

##### eventName

keyof `GlobalEventHandlersEventMap`

#### Returns

`void`

***

### removeStyle()

> **removeStyle**(`properties`): `void`

Defined in: [core/knot.ts:428](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L428)

#### Parameters

##### properties

`any`[]

#### Returns

`void`

***

### replaceChild()

> **replaceChild**(`knot`): `boolean`

Defined in: [core/knot.ts:335](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L335)

#### Parameters

##### knot

`Knot`

#### Returns

`boolean`

***

### set()

> **set**(`attribute`, `value`): `void`

Defined in: [core/knot.ts:45](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L45)

#### Parameters

##### attribute

`string`

##### value

`string` | `number` | `boolean`

#### Returns

`void`

***

### setAttribute()

> **setAttribute**(`attribute`, `opt_value?`): `void`

Defined in: [core/knot.ts:135](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L135)

#### Parameters

##### attribute

`string`

##### opt\_value?

`string` | `number` | `boolean` | `object` | `Function` | `any`[]

#### Returns

`void`

***

### setData()

> **setData**(`name`, `value`): `void`

Defined in: [core/knot.ts:369](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L369)

#### Parameters

##### name

`string`

##### value

`any`

#### Returns

`void`

***

### setFor()

> **setFor**(`htmlFor`): `void`

Defined in: [core/knot.ts:82](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L82)

#### Parameters

##### htmlFor

`string` | `number` | `boolean`

#### Returns

`void`

***

### setHtml()

> **setHtml**(`text`): `void`

Defined in: [core/knot.ts:350](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L350)

#### Parameters

##### text

`string`

#### Returns

`void`

***

### setId()

> **setId**(`id`): `void`

Defined in: [core/knot.ts:78](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L78)

#### Parameters

##### id

`string` | `number` | `boolean`

#### Returns

`void`

***

### setParentKnot()

> **setParentKnot**(`parentKnot`): `void`

Defined in: [core/knot.ts:41](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L41)

#### Parameters

##### parentKnot

`Knot`\<`HTMLElement`\>

#### Returns

`void`

***

### setStyle()

> **setStyle**(`properties`): `void`

Defined in: [core/knot.ts:422](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L422)

#### Parameters

##### properties

`object`

#### Returns

`void`

***

### setText()

> **setText**(`text`): `void`

Defined in: [core/knot.ts:361](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L361)

#### Parameters

##### text

`string`

#### Returns

`void`

***

### toggleClass()

> **toggleClass**(`cssClasses`): `void`

Defined in: [core/knot.ts:125](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L125)

#### Parameters

##### cssClasses

`string` | `string`[]

#### Returns

`void`

***

### toString()

> **toString**(`opt_isRoot`): `string`

Defined in: [core/knot.ts:442](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L442)

#### Parameters

##### opt\_isRoot

`boolean` = `true`

#### Returns

`string`

***

### trigger()

> **trigger**(`eventName`): `void`

Defined in: [core/knot.ts:243](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/knot.ts#L243)

#### Parameters

##### eventName

`string`

#### Returns

`void`
