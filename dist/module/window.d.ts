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
    constructor(opt_options?: {});
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options?: {}): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initResizeEvent(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initScrollEvent(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initConnectionEvent(): void;
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    eventOffline(event: any): void;
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    eventOnline(event: any): void;
    /**
     * @param {number} width
     * @param {number} height
     * @param {!Event} event
     * @return {undefined}
     */
    eventResize(width: any, height: any, event: any): void;
    /**
     * @param {string} orientation
     * @param {number} width
     * @param {number} height
     * @param {!Event} event
     * @return {undefined}
     */
    eventOrientationChange(orientation: any, width: any, height: any, event: any): void;
    /**
     * @param {number} scrollTop
     * @param {!Event} event
     * @return {undefined}
     */
    eventScroll(scrollTop: any, event: any): void;
    /**
     * @private
     * @param {!Event} event
     * @return {undefined}
     */
    _resize(event: any): void;
    /**
     * @private
     * @param {!Event} event
     * @return {undefined}
     */
    _scroll(event: any): void;
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
    getOrientation(): "landscape" | "portrait";
    /**
     * @private
     * @return {undefined}
     */
    _initColorSchemeEvent(): void;
    /**
     * @param {string} colorScheme
     * @param {!Event} event
     * @return {undefined}
     */
    eventColorSchemeChange(colorScheme: any, event: any): void;
    /**
     * @param {string} type dark|light|no-preference
     * @return {boolean}
     */
    isColorScheme(type: any): boolean;
}
