import { Item } from '../core';
import { Header } from './header';
/**
 * @class
 */
export declare class TopMenu {
    header: any;
    topMenu: any;
    toggleTopMenu: any;
    /**
     * @param {!Header} header
     */
    constructor(header: Header);
    /**
     * @private
     * @return {undefined}
     */
    private _init;
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
     * @return {!Item}
     */
    getContainer(): Item;
}
