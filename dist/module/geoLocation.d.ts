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
    _init(): void;
    /**
     * @return {undefined}
     */
    setWatcher(): void;
    /**
     * @return {!Promize}
     */
    getPosition(): import("..").Promize;
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
    eventChange(latitude: any, longitude: any, message: any): void;
    /**
     * @private
     * @param {!Object} position
     * @return {undefined}
     */
    _handlePosition(position: any): void;
    /**
     * @private
     * @param {!Object} error
     * @return {undefined}
     */
    _handleError(error: any): void;
    /**
     * @param {string} message
     * @param {string} code
     * @return {undefined}
     */
    eventError(message: any, code: any): void;
}
