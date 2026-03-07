import { Emitter } from '../core/emitter';
/**
 * Wrapper around the browser Geolocation API that provides both
 * one-shot position retrieval and continuous position watching. Uses
 * {@link Deferred} for promise-based single position requests and
 * dispatches position updates through emitted events.
 *
 * High accuracy is enabled by default, with a 5-second timeout and
 * infinite maximum cache age for position data.
 *
 * Register handlers with `on('change', ...)` for successful position
 * updates and `on('error', ...)` for geolocation errors such as
 * permission denial, unavailable position, or timeouts.
 *
 * @example
 * const geo = new GeoLocation();
 *
 * // One-shot position request
 * geo.getPosition().then(
 *     ([lat, lng]) => console.log(`Position: ${lat}, ${lng}`),
 *     () => console.error('Failed to get position'),
 * );
 *
 * // Continuous watching
 * geo.on('change', (lat, lng, message) => {
 *     console.log(`Moved to: ${lat}, ${lng}`);
 * });
 * geo.setWatcher();
 *
 * // Stop watching
 * geo.clearWatcher();
 *
 * @see {@link Deferred}
 * @see {@link Promize}
 * @see {@link Emitter}
 * @category Module
 */
export declare class GeoLocation extends Emitter {
    options: {
        enableHighAccuracy: boolean;
        timeout: number;
        maximumAge: number;
    };
    watcherId: number;
    /**
     * Creates a new GeoLocation instance with default geolocation
     * options (high accuracy, 5-second timeout, infinite cache age).
     */
    constructor();
    /**
     * Initializes the geolocation options with defaults.
     */
    private _init;
    /**
     * Starts continuous position watching using the browser's
     * `watchPosition` API. Each successful position update triggers
     * the `'change'` event, and errors emit the `'error'` event.
     * The watcher ID is stored for later cancellation via
     * {@link clearWatcher}.
     *
     * @example
     * const geo = new GeoLocation();
     * geo.on('change', (lat, lng, message) => {
     *     updateMap(lat, lng);
     * });
     * geo.setWatcher();
     */
    setWatcher(): void;
    /**
     * Requests the device's current position as a one-shot query.
     * Returns a {@link Promize} that resolves with a `[latitude, longitude]`
     * tuple on success, or rejects with `[null, null]` on failure.
     *
     * @returns A {@link Promize} resolving to a `[number, number]` tuple
     *     of latitude and longitude coordinates.
     *
     * @example
     * const geo = new GeoLocation();
     * geo.getPosition().then(
     *     ([lat, lng]) => console.log(`Latitude: ${lat}, Longitude: ${lng}`),
     *     ([lat, lng]) => console.error('Position unavailable'),
     * );
     */
    getPosition(): import("..").Promize<[number, number], [null, null]>;
    /**
     * Stops the continuous position watcher started by {@link setWatcher}.
     *
     * @example
     * geo.setWatcher();
     * // ... later
     * geo.clearWatcher();
     */
    clearWatcher(): void;
    /**
     * Processes a successful geolocation position result and emits
     * the `'change'` event.
     *
     * @param position The native GeolocationPosition from the browser.
     */
    private _handlePosition;
    /**
     * Processes a geolocation error and dispatches a human-readable
     * message and error code via the `'error'` event.
     *
     * @param error The native GeolocationPositionError from the browser.
     */
    private _handleError;
}
