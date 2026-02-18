import { Deferred } from '../core/deferred';
import { consoleDebug, consoleError } from '../utils/log';
/**
 * Wrapper around the browser Geolocation API that provides both
 * one-shot position retrieval and continuous position watching. Uses
 * {@link Deferred} for promise-based single position requests and
 * dispatches position updates through overridable event methods.
 *
 * High accuracy is enabled by default, with a 5-second timeout and
 * infinite maximum cache age for position data.
 *
 * Override {@link eventChange} to handle successful position updates
 * and {@link eventError} to handle geolocation errors such as
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
 * geo.eventChange = (lat, lng, message) => {
 *     console.log(`Moved to: ${lat}, ${lng}`);
 * };
 * geo.setWatcher();
 *
 * // Stop watching
 * geo.clearWatcher();
 *
 * @see {@link Deferred}
 * @see {@link Promize}
 * @category Module
 */
export class GeoLocation {
    /**
     * Creates a new GeoLocation instance with default geolocation
     * options (high accuracy, 5-second timeout, infinite cache age).
     */
    constructor() {
        this._init();
    }
    /**
     * Initializes the geolocation options with defaults.
     */
    _init() {
        this.options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: Infinity,
        };
    }
    /**
     * Starts continuous position watching using the browser's
     * `watchPosition` API. Each successful position update triggers
     * {@link eventChange}, and errors trigger {@link eventError}.
     * The watcher ID is stored for later cancellation via
     * {@link clearWatcher}.
     *
     * @example
     * const geo = new GeoLocation();
     * geo.eventChange = (lat, lng, message) => {
     *     updateMap(lat, lng);
     * };
     * geo.setWatcher();
     */
    setWatcher() {
        this.watcherId = navigator.geolocation.watchPosition((position) => {
            this._handlePosition(position);
        }, (error) => {
            this._handleError(error);
        }, this.options);
    }
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
    getPosition() {
        const deferred = new Deferred();
        navigator.geolocation.getCurrentPosition((position) => {
            deferred.resolve([
                position.coords.latitude,
                position.coords.longitude,
            ]);
        }, (_error) => {
            deferred.reject([null, null]);
        }, this.options);
        return deferred.promise();
    }
    /**
     * Stops the continuous position watcher started by {@link setWatcher}.
     *
     * @example
     * geo.setWatcher();
     * // ... later
     * geo.clearWatcher();
     */
    clearWatcher() {
        navigator.geolocation.clearWatch(this.watcherId);
    }
    /**
     * Called when a new position is successfully obtained, either from
     * the watcher or the position handler. Override this method to
     * implement custom position update behavior.
     *
     * @param latitude The latitude coordinate in decimal degrees.
     * @param longitude The longitude coordinate in decimal degrees.
     * @param message A descriptive message about the position event.
     */
    eventChange(latitude, longitude, message) {
        consoleDebug('GeoLocation.eventChange()', latitude, longitude, message);
    }
    /**
     * Processes a successful geolocation position result and dispatches
     * to {@link eventChange}.
     *
     * @param position The native GeolocationPosition from the browser.
     */
    _handlePosition(position) {
        const message = 'User allowed the request for GeoLocation.';
        this.eventChange(position.coords.latitude, position.coords.longitude, message);
    }
    /**
     * Processes a geolocation error and dispatches a human-readable
     * message and error code to {@link eventError}.
     *
     * @param error The native GeolocationPositionError from the browser.
     */
    _handleError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.eventError('User denied the request for GeoLocation.', 'permission_denied');
                break;
            case error.POSITION_UNAVAILABLE:
                this.eventError('Location information is unavailable.', 'position_unavailable');
                break;
            case error.TIMEOUT:
                this.eventError('The request to get user location timed out.', 'timeout');
                break;
            default:
                this.eventError('An unknown error occurred.', 'unknown');
                break;
        }
    }
    /**
     * Called when a geolocation error occurs. Override this method to
     * implement custom error handling such as showing user notifications
     * or falling back to IP-based geolocation.
     *
     * @param message A human-readable description of the error.
     * @param code A machine-readable error code: `'permission_denied'`,
     *     `'position_unavailable'`, `'timeout'`, or `'unknown'`.
     */
    eventError(message, code) {
        consoleError('GeoLocation.eventError()', message, code);
    }
}
