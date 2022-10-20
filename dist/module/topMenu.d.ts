import { Knot } from '../core';
import { Header } from './header';
/**
 * @class
 */
export declare class TopMenu {
    header: Header;
    topMenu: Knot;
    toggleTopMenu: Knot;
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
     * @return {!Knot}
     */
    getContainer(): Knot;
}
