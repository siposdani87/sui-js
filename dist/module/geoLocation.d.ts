import { Promize } from '../core';
/**
 * @class
 */
export declare class GeoLocation {
    options: {
        enableHighAccuracy: boolean;
        timeout: number;
        maximumAge: number;
    };
    watcherId: number;
    /**
     */
    constructor();
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @return {undefined}
     */
    setWatcher(): void;
    /**
     * @return {!Promize}
     */
    getPosition(): Promize;
    /**
     * @return {undefined}
     */
    clearWatcher(): void;
    /**
     * @param {number} latitude
     * @param {number} longitude
     * @param {string} message
     * @return {undefined}
     */
    eventChange(latitude: number, longitude: number, message: string): void;
    /**
     * @private
     * @param {!GeolocationPosition} position
     * @return {undefined}
     */
    private _handlePosition;
    /**
     * @private
     * @param {!GeolocationPositionError} error
     * @return {undefined}
     */
    private _handleError;
    /**
     * @param {string} message
     * @param {string} code
     * @return {undefined}
     */
    eventError(message: string, code: string): void;
}
