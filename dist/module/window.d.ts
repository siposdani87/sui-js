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
    constructor(opt_options?: object | undefined);
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options?: object | undefined): void;
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
    _resize(event: Event): void;
    /**
     * @private
     * @param {!Event} event
     * @return {undefined}
     */
    _scroll(event: Event): void;
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
    _initColorSchemeEvent(): void;
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
