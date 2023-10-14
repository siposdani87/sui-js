import { Deferred } from '../core/deferred';
import { consoleDebug, consoleError } from '../utils/log';

/**
 * @class
 */
export class GeoLocation {
    options: {
        enableHighAccuracy: boolean;
        timeout: number;
        maximumAge: number;
    };
    watcherId: number;
    /**
     */
    constructor() {
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: Infinity,
        };
    }
    /**
     * @return {undefined}
     */
    setWatcher(): void {
        this.watcherId = navigator.geolocation.watchPosition(
            (position) => {
                this._handlePosition(position);
            },
            (error) => {
                this._handleError(error);
            },
            this.options,
        );
    }
    /**
     * @return {!Promize}
     */
    getPosition() {
        const deferred = new Deferred<[number, number], [null, null]>();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                deferred.resolve([
                    position.coords.latitude,
                    position.coords.longitude,
                ]);
            },
            (_error) => {
                deferred.reject([null, null]);
            },
            this.options,
        );
        return deferred.promise();
    }
    /**
     * @return {undefined}
     */
    clearWatcher(): void {
        navigator.geolocation.clearWatch(this.watcherId);
    }
    /**
     * @param {number} latitude
     * @param {number} longitude
     * @param {string} message
     * @return {undefined}
     */
    eventChange(latitude: number, longitude: number, message: string): void {
        consoleDebug('GeoLocation.eventChange()', latitude, longitude, message);
    }
    /**
     * @private
     * @param {!GeolocationPosition} position
     * @return {undefined}
     */
    private _handlePosition(position: GeolocationPosition): void {
        const message = 'User allowed the request for GeoLocation.';
        this.eventChange(
            position.coords.latitude,
            position.coords.longitude,
            message,
        );
    }
    /**
     * @private
     * @param {!GeolocationPositionError} error
     * @return {undefined}
     */
    private _handleError(error: GeolocationPositionError): void {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.eventError(
                    'User denied the request for GeoLocation.',
                    'permission_denied',
                );
                break;
            case error.POSITION_UNAVAILABLE:
                this.eventError(
                    'Location information is unavailable.',
                    'position_unavailable',
                );
                break;
            case error.TIMEOUT:
                this.eventError(
                    'The request to get user location timed out.',
                    'timeout',
                );
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
    eventError(message: string, code: string): void {
        consoleError('GeoLocation.eventError()', message, code);
    }
}
