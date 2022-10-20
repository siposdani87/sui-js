import { Knot } from '../core';
import { Footer } from './footer';
/**
 * @class
 */
export declare class BottomMenu {
    footer: Footer;
    bottomMenu: Knot;
    /**
     * @param {!Footer} footer
     */
    constructor(footer: Footer);
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
