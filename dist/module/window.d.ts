import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Window {
    options: Objekt;
    window: globalThis.Window & typeof globalThis;
    document: Document;
    orientation: string;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: Object | undefined);
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions;
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @private
     * @return {undefined}
     */
    private _initResizeEvent;
    /**
     * @private
     * @return {undefined}
     */
    private _initScrollEvent;
    /**
     * @private
     * @return {undefined}
     */
    private _initConnectionEvent;
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    eventOffline(event: Event): void;
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    eventOnline(event: Event): void;
    /**
     * @param {number} width
     * @param {number} height
     * @param {!Event} event
     * @return {undefined}
     */
    eventResize(width: number, height: number, event: Event): void;
    /**
     * @param {string} orientation
     * @param {number} width
     * @param {number} height
     * @param {!Event} event
     * @return {undefined}
     */
    eventOrientationChange(orientation: string, width: number, height: number, event: Event): void;
    /**
     * @param {number} scrollTop
     * @param {!Event} event
     * @return {undefined}
     */
    eventScroll(scrollTop: number, event: Event): void;
    /**
     * @private
     * @param {!Event} event
     * @return {undefined}
     */
    private _resize;
    /**
     * @private
     * @param {!Event} event
     * @return {undefined}
     */
    private _scroll;
    /**
     * @return {number}
     */
    getScrollTop(): number;
    /**
     * @return {number}
     */
    getWidth(): number;
    /**
     * @return {number}
     */
    getHeight(): number;
    /**
     * @return {string} landscape|portrait
     */
    getOrientation(): string;
    /**
     * @private
     * @return {undefined}
     */
    private _initColorSchemeEvent;
    /**
     * @param {string} colorScheme
     * @param {!Event} event
     * @return {undefined}
     */
    eventColorSchemeChange(colorScheme: string, event: Event): void;
    /**
     * @param {string} type dark|light|no-preference
     * @return {boolean}
     */
    isColorScheme(type: string): boolean;
}
