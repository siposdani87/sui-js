# Class: Browser

Defined in: [module/browser.ts:30](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L30)

Detects the current browser type and operating system from the
user-agent string and platform properties. Browser also checks for
the availability of required browser features (geolocation, history,
storage, console) and fires the [Browser.eventMissingFeatures](#eventmissingfeatures)
hook when any are absent.

OS detection covers macOS, iOS, Windows, Android, and Linux.
Browser detection covers Chrome, Firefox, Safari, Edge (legacy and
Chromium-based), Opera, Internet Explorer (10/11), and the broader
Webkit and Chromium engine families.

## Example

```ts
const browser = new Browser();
browser.detect(); // triggers eventMissingFeatures if needed

if (browser.isChrome()) {
    console.log('Running on Chrome');
}
if (browser.isMacOS()) {
    console.log('Running on macOS');
}
```

## See

[Application](Application.md)

## Constructors

### Constructor

> **new Browser**(): `Browser`

Defined in: [module/browser.ts:41](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L41)

Creates a new Browser instance and immediately detects the OS,
browser type, and missing features.

#### Returns

`Browser`

## Properties

### browsers

> **browsers**: `object`

Defined in: [module/browser.ts:32](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L32)

#### Index Signature

\[`key`: `string`\]: `boolean`

***

### features

> **features**: `string`[]

Defined in: [module/browser.ts:31](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L31)

***

### os

> **os**: `string` \| `null`

Defined in: [module/browser.ts:35](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L35)

## Methods

### detect()

> **detect**(): `void`

Defined in: [module/browser.ts:84](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L84)

Triggers the [Browser.eventMissingFeatures](#eventmissingfeatures) hook if one or
more required browser features are unavailable. Call this method
after construction to notify the application of missing capabilities.

#### Returns

`void`

#### Example

```ts
const browser = new Browser();
browser.detect();
```

***

### eventMissingFeatures()

> **eventMissingFeatures**(`features`): `void`

Defined in: [module/browser.ts:109](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L109)

Called by [Browser.detect](#detect) when one or more required browser
features are missing. Override this method to display a warning to
the user or degrade functionality gracefully.

#### Parameters

##### features

`any`[]

List of missing feature identifiers.

#### Returns

`void`

***

### isAndroid()

> **isAndroid**(): `boolean`

Defined in: [module/browser.ts:235](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L235)

Checks whether the detected operating system is Android.

#### Returns

`boolean`

True if the OS is Android.

#### Example

```ts
if (browser.isAndroid()) {
    // apply Android-specific behavior
}
```

***

### isChrome()

> **isChrome**(): `boolean`

Defined in: [module/browser.ts:342](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L342)

Checks whether the browser is Google Chrome (with Chrome Web Store
support, distinguishing it from other Chromium-based browsers).

#### Returns

`boolean`

True if the browser is Chrome.

#### Example

```ts
if (browser.isChrome()) {
    // apply Chrome-specific behavior
}
```

***

### isChromium()

> **isChromium**(): `boolean`

Defined in: [module/browser.ts:399](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L399)

Checks whether the browser is built on the Chromium engine
(includes Chrome, Chromium Edge, Opera, and other Chromium forks).

#### Returns

`boolean`

True if the browser is Chromium-based.

#### Example

```ts
if (browser.isChromium()) {
    // apply Chromium-specific behavior
}
```

***

### isChromiumEdge()

> **isChromiumEdge**(): `boolean`

Defined in: [module/browser.ts:313](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L313)

Checks whether the browser is Chromium-based Microsoft Edge.

#### Returns

`boolean`

True if the browser is Chromium Edge.

#### Example

```ts
if (browser.isChromiumEdge()) {
    // apply Chromium Edge-specific behavior
}
```

***

### isEdge()

> **isEdge**(): `boolean`

Defined in: [module/browser.ts:299](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L299)

Checks whether the browser is legacy Microsoft Edge (EdgeHTML engine).

#### Returns

`boolean`

True if the browser is legacy Edge.

#### Example

```ts
if (browser.isEdge()) {
    // apply Edge-specific behavior
}
```

***

### isFirefox()

> **isFirefox**(): `boolean`

Defined in: [module/browser.ts:327](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L327)

Checks whether the browser is Mozilla Firefox.

#### Returns

`boolean`

True if the browser is Firefox.

#### Example

```ts
if (browser.isFirefox()) {
    // apply Firefox-specific behavior
}
```

***

### isInternetExplorer()

> **isInternetExplorer**(`opt_version?`): `boolean`

Defined in: [module/browser.ts:271](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L271)

Checks whether the browser is any version of Internet Explorer.
When `opt_version` is provided, checks for that specific version
only (10 or 11). Without the argument, returns true for IE 10 or
earlier.

#### Parameters

##### opt\_version?

`number`

Specific IE version to check (10 or 11).

#### Returns

`boolean`

True if the browser matches the requested IE
    version or any IE version when unspecified.

#### Example

```ts
if (browser.isInternetExplorer()) {
    console.log('Internet Explorer detected');
}
if (browser.isInternetExplorer(11)) {
    console.log('IE 11 specifically');
}
```

***

### isIOS()

> **isIOS**(): `boolean`

Defined in: [module/browser.ts:207](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L207)

Checks whether the detected operating system is iOS.

#### Returns

`boolean`

True if the OS is iOS.

#### Example

```ts
if (browser.isIOS()) {
    // apply iOS-specific behavior
}
```

***

### isLinux()

> **isLinux**(): `boolean`

Defined in: [module/browser.ts:249](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L249)

Checks whether the detected operating system is Linux.

#### Returns

`boolean`

True if the OS is Linux.

#### Example

```ts
if (browser.isLinux()) {
    // apply Linux-specific behavior
}
```

***

### isMacOS()

> **isMacOS**(): `boolean`

Defined in: [module/browser.ts:193](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L193)

Checks whether the detected operating system is macOS.

#### Returns

`boolean`

True if the OS is macOS.

#### Example

```ts
if (browser.isMacOS()) {
    // apply macOS-specific behavior
}
```

***

### isOpera()

> **isOpera**(): `boolean`

Defined in: [module/browser.ts:356](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L356)

Checks whether the browser is Opera.

#### Returns

`boolean`

True if the browser is Opera.

#### Example

```ts
if (browser.isOpera()) {
    // apply Opera-specific behavior
}
```

***

### isSafari()

> **isSafari**(): `boolean`

Defined in: [module/browser.ts:370](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L370)

Checks whether the browser is Apple Safari.

#### Returns

`boolean`

True if the browser is Safari.

#### Example

```ts
if (browser.isSafari()) {
    // apply Safari-specific behavior
}
```

***

### isWebkit()

> **isWebkit**(): `boolean`

Defined in: [module/browser.ts:384](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L384)

Checks whether the browser uses the WebKit rendering engine.

#### Returns

`boolean`

True if the browser is WebKit-based.

#### Example

```ts
if (browser.isWebkit()) {
    // apply WebKit-specific styles
}
```

***

### isWindows()

> **isWindows**(): `boolean`

Defined in: [module/browser.ts:221](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/browser.ts#L221)

Checks whether the detected operating system is Windows.

#### Returns

`boolean`

True if the OS is Windows.

#### Example

```ts
if (browser.isWindows()) {
    // apply Windows-specific behavior
}
```
