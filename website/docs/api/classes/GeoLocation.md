# Class: GeoLocation

Defined in: [module/geoLocation.ts:39](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/geoLocation.ts#L39)

Wrapper around the browser Geolocation API that provides both
one-shot position retrieval and continuous position watching. Uses
[Deferred](Deferred.md) for promise-based single position requests and
dispatches position updates through overridable event methods.

High accuracy is enabled by default, with a 5-second timeout and
infinite maximum cache age for position data.

Override [eventChange](#eventchange) to handle successful position updates
and [eventError](#eventerror) to handle geolocation errors such as
permission denial, unavailable position, or timeouts.

## Example

```ts
const geo = new GeoLocation();

// One-shot position request
geo.getPosition().then(
    ([lat, lng]) => console.log(`Position: ${lat}, ${lng}`),
    () => console.error('Failed to get position'),
);

// Continuous watching
geo.eventChange = (lat, lng, message) => {
    console.log(`Moved to: ${lat}, ${lng}`);
};
geo.setWatcher();

// Stop watching
geo.clearWatcher();
```

## See

 - [Deferred](Deferred.md)
 - [Promize](Promize.md)

## Constructors

### Constructor

> **new GeoLocation**(): `GeoLocation`

Defined in: [module/geoLocation.ts:51](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/geoLocation.ts#L51)

Creates a new GeoLocation instance with default geolocation
options (high accuracy, 5-second timeout, infinite cache age).

#### Returns

`GeoLocation`

## Properties

### options

> **options**: `object`

Defined in: [module/geoLocation.ts:40](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/geoLocation.ts#L40)

#### enableHighAccuracy

> **enableHighAccuracy**: `boolean`

#### maximumAge

> **maximumAge**: `number`

#### timeout

> **timeout**: `number`

***

### watcherId

> **watcherId**: `number`

Defined in: [module/geoLocation.ts:45](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/geoLocation.ts#L45)

## Methods

### clearWatcher()

> **clearWatcher**(): `void`

Defined in: [module/geoLocation.ts:132](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/geoLocation.ts#L132)

Stops the continuous position watcher started by [setWatcher](#setwatcher).

#### Returns

`void`

#### Example

```ts
geo.setWatcher();
// ... later
geo.clearWatcher();
```

***

### eventChange()

> **eventChange**(`latitude`, `longitude`, `message`): `void`

Defined in: [module/geoLocation.ts:145](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/geoLocation.ts#L145)

Called when a new position is successfully obtained, either from
the watcher or the position handler. Override this method to
implement custom position update behavior.

#### Parameters

##### latitude

`number`

The latitude coordinate in decimal degrees.

##### longitude

`number`

The longitude coordinate in decimal degrees.

##### message

`string`

A descriptive message about the position event.

#### Returns

`void`

***

### eventError()

> **eventError**(`message`, `code`): `void`

Defined in: [module/geoLocation.ts:205](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/geoLocation.ts#L205)

Called when a geolocation error occurs. Override this method to
implement custom error handling such as showing user notifications
or falling back to IP-based geolocation.

#### Parameters

##### message

`string`

A human-readable description of the error.

##### code

`string`

A machine-readable error code: `'permission_denied'`,
    `'position_unavailable'`, `'timeout'`, or `'unknown'`.

#### Returns

`void`

***

### getPosition()

> **getPosition**(): [`Promize`](Promize.md)\<\[`number`, `number`\], \[`null`, `null`\]\>

Defined in: [module/geoLocation.ts:107](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/geoLocation.ts#L107)

Requests the device's current position as a one-shot query.
Returns a [Promize](Promize.md) that resolves with a `[latitude, longitude]`
tuple on success, or rejects with `[null, null]` on failure.

#### Returns

[`Promize`](Promize.md)\<\[`number`, `number`\], \[`null`, `null`\]\>

A [Promize](Promize.md) resolving to a `[number, number]` tuple
    of latitude and longitude coordinates.

#### Example

```ts
const geo = new GeoLocation();
geo.getPosition().then(
    ([lat, lng]) => console.log(`Latitude: ${lat}, Longitude: ${lng}`),
    ([lat, lng]) => console.error('Position unavailable'),
);
```

***

### setWatcher()

> **setWatcher**(): `void`

Defined in: [module/geoLocation.ts:80](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/geoLocation.ts#L80)

Starts continuous position watching using the browser's
`watchPosition` API. Each successful position update triggers
[eventChange](#eventchange), and errors trigger [eventError](#eventerror).
The watcher ID is stored for later cancellation via
[clearWatcher](#clearwatcher).

#### Returns

`void`

#### Example

```ts
const geo = new GeoLocation();
geo.eventChange = (lat, lng, message) => {
    updateMap(lat, lng);
};
geo.setWatcher();
```
