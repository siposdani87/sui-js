/**
 * @class
 */
export declare class Sidebar {
    selector: any;
    sidebar: any;
    button: any;
    /**
     * @param {string} selector
     */
    constructor(selector: any);
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @return {undefined}
     */
    toggle(): void;
    /**
     * @return {boolean}
     */
    isOpened(): any;
    /**
     * @return {undefined}
     */
    open(): void;
    /**
     * @return {undefined}
     */
    close(): void;
    /**
     * @return {undefined}
     */
    show(): void;
    /**
     * @return {undefined}
     */
    hide(): void;
    /**
     * @param {number} scrollTop
     * @param {number} windowHeight
     * @return {undefined}
     */
    setButtonPosition(scrollTop: any, windowHeight: any): void;
}
