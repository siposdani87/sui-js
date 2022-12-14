import { Deferred } from '../core/deferred';
import { consoleWarn } from '../utils/log';
/**
 * @class
 */
export class GeoLocation {
    /**
     */
    constructor() {
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: Infinity,
        };
    }
    /**
     * @return {undefined}
     */
    setWatcher() {
        this.watcherId = navigator.geolocation.watchPosition((position) => {
            this._handlePosition(position);
        }, (error) => {
            this._handleError(error);
        }, this.options);
    }
    /**
     * @return {!Promize}
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
     * @return {undefined}
     */
    clearWatcher() {
        navigator.geolocation.clearWatch(this.watcherId);
    }
    /**
     * @param {number} latitude
     * @param {number} longitude
     * @param {string} message
     * @return {undefined}
     */
    eventChange(latitude, longitude, message) {
        consoleWarn('GeoLocation.eventChange()', latitude, longitude, message);
    }
    /**
     * @private
     * @param {!GeolocationPosition} position
     * @return {undefined}
     */
    _handlePosition(position) {
        const message = 'User allowed the request for GeoLocation.';
        this.eventChange(position.coords.latitude, position.coords.longitude, message);
    }
    /**
     * @private
     * @param {!GeolocationPositionError} error
     * @return {undefined}
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
     * @param {string} message
     * @param {string} code
     * @return {undefined}
     */
    eventError(message, code) {
        consoleWarn('GeoLocation.eventError()', message, code);
    }
}
