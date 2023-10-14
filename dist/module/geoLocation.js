import { Deferred } from '../core/deferred';
import { consoleDebug, consoleError } from '../utils/log';
export class GeoLocation {
    constructor() {
        this._init();
    }
    _init() {
        this.options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: Infinity,
        };
    }
    setWatcher() {
        this.watcherId = navigator.geolocation.watchPosition((position) => {
            this._handlePosition(position);
        }, (error) => {
            this._handleError(error);
        }, this.options);
    }
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
    clearWatcher() {
        navigator.geolocation.clearWatch(this.watcherId);
    }
    eventChange(latitude, longitude, message) {
        consoleDebug('GeoLocation.eventChange()', latitude, longitude, message);
    }
    _handlePosition(position) {
        const message = 'User allowed the request for GeoLocation.';
        this.eventChange(position.coords.latitude, position.coords.longitude, message);
    }
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
    eventError(message, code) {
        consoleError('GeoLocation.eventError()', message, code);
    }
}
