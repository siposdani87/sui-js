# Type Alias: Instance

> **Instance** = `object`

Defined in: [utils/types.ts:140](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L140)

The framework's dependency injection container interface.

Lists every injectable service managed by [Application](../classes/Application.md). Modules
and components receive resolved instances of these services through
constructor injection.

## Properties

### app

> **app**: [`Application`](../classes/Application.md)

Defined in: [utils/types.ts:142](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L142)

The main [Application](../classes/Application.md) instance.

***

### bottomMenu

> **bottomMenu**: [`BottomMenu`](../classes/BottomMenu.md)

Defined in: [utils/types.ts:170](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L170)

[BottomMenu](../classes/BottomMenu.md) navigation component.

***

### browser

> **browser**: [`Browser`](../classes/Browser.md)

Defined in: [utils/types.ts:194](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L194)

[Browser](../classes/Browser.md) module for user-agent and capability detection.

***

### config

> **config**: [`Objekt`](../classes/Objekt.md)

Defined in: [utils/types.ts:144](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L144)

Global configuration [Objekt](../classes/Objekt.md).

***

### confirm

> **confirm**: [`Confirm`](../classes/Confirm.md)

Defined in: [utils/types.ts:158](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L158)

[Confirm](../classes/Confirm.md) service for confirmation dialogs.

***

### console

> **console**: `Console`

Defined in: [utils/types.ts:204](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L204)

Native browser `Console` object.

***

### cookie

> **cookie**: [`Cookie`](../classes/Cookie.md)

Defined in: [utils/types.ts:188](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L188)

[Cookie](../classes/Cookie.md) module for browser cookie management.

***

### dialog

> **dialog**: [`Dialog`](../classes/Dialog.md)

Defined in: [utils/types.ts:156](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L156)

[Dialog](../classes/Dialog.md) service for modal windows.

***

### dom

> **dom**: [`Knot`](../classes/Knot.md)

Defined in: [utils/types.ts:180](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L180)

Root DOM [Knot](../classes/Knot.md) element.

***

### eventBus

> **eventBus**: [`EventBus`](../classes/EventBus.md)

Defined in: [utils/types.ts:146](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L146)

Publish/subscribe [EventBus](../classes/EventBus.md) for cross-module communication.

***

### flash

> **flash**: [`Flash`](../classes/Flash.md)

Defined in: [utils/types.ts:152](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L152)

[Flash](../classes/Flash.md) message service for transient notifications.

***

### footer

> **footer**: [`Footer`](../classes/Footer.md)

Defined in: [utils/types.ts:168](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L168)

[Footer](../classes/Footer.md) component managing the page footer.

***

### geoLocation

> **geoLocation**: [`GeoLocation`](../classes/GeoLocation.md)

Defined in: [utils/types.ts:200](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L200)

[GeoLocation](../classes/GeoLocation.md) module for browser geolocation access.

***

### header

> **header**: [`Header`](../classes/Header.md)

Defined in: [utils/types.ts:162](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L162)

[Header](../classes/Header.md) component managing the page header.

***

### helper

> **helper**: [`Helper`](../classes/Helper.md)

Defined in: [utils/types.ts:186](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L186)

[Helper](../classes/Helper.md) module providing miscellaneous DOM utilities.

***

### http

> **http**: [`Http`](../classes/Http.md)

Defined in: [utils/types.ts:150](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L150)

[Http](../classes/Http.md) client for XHR requests.

***

### instances

> **instances**: `Instance`

Defined in: [utils/types.ts:202](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L202)

Self-reference to the full Instance container.

***

### leftMenu

> **leftMenu**: [`LeftMenu`](../classes/LeftMenu.md)

Defined in: [utils/types.ts:166](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L166)

[LeftMenu](../classes/LeftMenu.md) drawer navigation component.

***

### loader

> **loader**: [`Loader`](../classes/Loader.md)

Defined in: [utils/types.ts:196](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L196)

[Loader](../classes/Loader.md) module for showing/hiding loading indicators.

***

### localDepot

> **localDepot**: [`Depot`](../classes/Depot.md)

Defined in: [utils/types.ts:190](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L190)

[Depot](../classes/Depot.md) backed by `localStorage` for persistent storage.

***

### navBar

> **navBar**: [`NavBar`](../classes/NavBar.md)

Defined in: [utils/types.ts:172](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L172)

[NavBar](../classes/NavBar.md) breadcrumb/tab navigation component.

***

### page

> **page**: [`Page`](../classes/Page.md)

Defined in: [utils/types.ts:182](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L182)

[Page](../classes/Page.md) module managing page-level DOM containers.

***

### progressBar

> **progressBar**: [`ProgressBar`](../classes/ProgressBar.md)

Defined in: [utils/types.ts:198](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L198)

[ProgressBar](../classes/ProgressBar.md) module for linear progress indication.

***

### scheduler

> **scheduler**: [`Scheduler`](../classes/Scheduler.md)

Defined in: [utils/types.ts:148](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L148)

[Scheduler](../classes/Scheduler.md) for deferred and periodic tasks.

***

### screen

> **screen**: [`Screen`](../classes/Screen.md)

Defined in: [utils/types.ts:184](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L184)

[Screen](../classes/Screen.md) module for viewport and orientation detection.

***

### script

> **script**: [`Script`](../classes/Script.md)

Defined in: [utils/types.ts:174](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L174)

[Script](../classes/Script.md) loader for dynamic script injection.

***

### sessionDepot

> **sessionDepot**: [`Depot`](../classes/Depot.md)

Defined in: [utils/types.ts:192](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L192)

[Depot](../classes/Depot.md) backed by `sessionStorage` for session-scoped storage.

***

### state

> **state**: [`State`](../classes/State.md)

Defined in: [utils/types.ts:178](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L178)

[State](../classes/State.md) manager handling routing and state transitions.

***

### style

> **style**: [`Style`](../classes/Style.md)

Defined in: [utils/types.ts:176](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L176)

[Style](../classes/Style.md) loader for dynamic stylesheet injection.

***

### template

> **template**: [`Template`](../classes/Template.md)

Defined in: [utils/types.ts:154](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L154)

[Template](../classes/Template.md) rendering engine.

***

### topMenu

> **topMenu**: [`TopMenu`](../classes/TopMenu.md)

Defined in: [utils/types.ts:164](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L164)

[TopMenu](../classes/TopMenu.md) navigation component.

***

### viewer

> **viewer**: [`Viewer`](../classes/Viewer.md)

Defined in: [utils/types.ts:160](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/types.ts#L160)

[Viewer](../classes/Viewer.md) service for image/content previews.
