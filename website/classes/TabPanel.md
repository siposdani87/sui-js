# Class: TabPanel

Defined in: [component/tabPanel.ts:8](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/tabPanel.ts#L8)

## Constructors

### Constructor

> **new TabPanel**(`dom`, `opt_selector`, `opt_selectedTab`, `opt_defaultTab`): `TabPanel`

Defined in: [component/tabPanel.ts:15](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/tabPanel.ts#L15)

#### Parameters

##### dom

[`Knot`](Knot.md)

##### opt\_selector

`string` = `'.tab-panel'`

##### opt\_selectedTab

`string` = `''`

##### opt\_defaultTab

`string` = `''`

#### Returns

`TabPanel`

## Properties

### activeTab

> **activeTab**: `string`

Defined in: [component/tabPanel.ts:11](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/tabPanel.ts#L11)

***

### options

> **options**: `object`

Defined in: [component/tabPanel.ts:10](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/tabPanel.ts#L10)

#### default\_tab

> **default\_tab**: `string`

#### selected\_tab

> **selected\_tab**: `string`

***

### panels

> **panels**: [`Query`](Query.md)

Defined in: [component/tabPanel.ts:13](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/tabPanel.ts#L13)

***

### tabPanel

> **tabPanel**: [`Knot`](Knot.md)

Defined in: [component/tabPanel.ts:9](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/tabPanel.ts#L9)

***

### tabs

> **tabs**: [`Query`](Query.md)

Defined in: [component/tabPanel.ts:12](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/tabPanel.ts#L12)

## Methods

### eventChange()

> **eventChange**(`panelId`): `void`

Defined in: [component/tabPanel.ts:77](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/tabPanel.ts#L77)

#### Parameters

##### panelId

`string`

#### Returns

`void`

***

### getActive()

> **getActive**(): `string`

Defined in: [component/tabPanel.ts:99](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/tabPanel.ts#L99)

#### Returns

`string`

***

### setActive()

> **setActive**(`panelId`): [`Promize`](Promize.md)\<`object`, `object`\>

Defined in: [component/tabPanel.ts:81](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/tabPanel.ts#L81)

#### Parameters

##### panelId

`string`

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>
