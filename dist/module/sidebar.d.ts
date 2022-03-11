import { Item } from '../core';
/**
 * @class
 */
export declare class Sidebar {
    selector: string;
    sidebar: Item;
    button: Item;
    /**
     * @param {string} selector
     */
    constructor(selector: string);
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
    isOpened(): boolean;
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
    setButtonPosition(scrollTop: number, windowHeight: number): void;
}
