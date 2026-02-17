# Class: TabPanel

Defined in: [component/tabPanel.ts:23](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tabPanel.ts#L23)

## Description

Tab panel component that manages tab/panel activation with async change events.
Tabs are linked to panels by href attributes, and switching triggers an overridable
eventChange callback through the [Async](Async.md) serial pipeline.

## Example

```ts
const tabPanel = new TabPanel(containerKnot, '.tab-panel', 'details');
tabPanel.eventChange = (panelId) => loadContent(panelId);
tabPanel.setActive('settings');
```

## See

 - [Async](Async.md) for the async serial execution pipeline
 - [Deferred](Deferred.md) for the promise-like deferred object

## Constructors

### Constructor

> **new TabPanel**(`dom`, `opt_selector?`, `opt_selectedTab?`, `opt_defaultTab?`): `TabPanel`

Defined in: [component/tabPanel.ts:37](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tabPanel.ts#L37)

#### Parameters

##### dom

[`Knot`](Knot.md)

The parent DOM element.

##### opt\_selector?

`string` = `'.tab-panel'`

CSS selector for the tab panel container.

##### opt\_selectedTab?

`string` = `''`

ID of the initially selected tab.

##### opt\_defaultTab?

`string` = `''`

Fallback tab ID when no match is found.

#### Returns

`TabPanel`

#### Description

Creates a new TabPanel bound to a DOM container.

## Properties

### activeTab

> **activeTab**: `string`

Defined in: [component/tabPanel.ts:26](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tabPanel.ts#L26)

***

### options

> **options**: `object`

Defined in: [component/tabPanel.ts:25](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tabPanel.ts#L25)

#### default\_tab

> **default\_tab**: `string`

#### selected\_tab

> **selected\_tab**: `string`

***

### panels

> **panels**: [`Query`](Query.md)

Defined in: [component/tabPanel.ts:28](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tabPanel.ts#L28)

***

### tabPanel

> **tabPanel**: [`Knot`](Knot.md)

Defined in: [component/tabPanel.ts:24](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tabPanel.ts#L24)

***

### tabs

> **tabs**: [`Query`](Query.md)

Defined in: [component/tabPanel.ts:27](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tabPanel.ts#L27)

## Methods

### eventChange()

> **eventChange**(`panelId`): `void`

Defined in: [component/tabPanel.ts:119](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tabPanel.ts#L119)

#### Parameters

##### panelId

`string`

The ID of the newly active panel.

#### Returns

`void`

#### Description

Called when the active tab changes. Override to handle tab change events.

#### Example

```ts
tabPanel.eventChange = (panelId) => loadPanelContent(panelId);
```

***

### getActive()

> **getActive**(): `string`

Defined in: [component/tabPanel.ts:156](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tabPanel.ts#L156)

#### Returns

`string`

The active panel ID.

#### Description

Returns the ID of the currently active tab/panel.

#### Example

```ts
const activeId = tabPanel.getActive();
```

***

### setActive()

> **setActive**(`panelId`): [`Promize`](Promize.md)\<`object`, `object`\>

Defined in: [component/tabPanel.ts:131](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tabPanel.ts#L131)

#### Parameters

##### panelId

`string`

The panel ID to activate.

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>

A promise that resolves after the change event completes.

#### Description

Activates a tab/panel by ID and fires the eventChange callback asynchronously.

#### Example

```ts
tabPanel.setActive('settings').then(() => console.log('Tab changed'));
```
