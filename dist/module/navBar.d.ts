import { Knot } from '../core';
/**
 * @class
 */
export declare class NavBar {
    navBarHeader: Knot;
    navBar: Knot;
    toggleNavBarIcon: Knot;
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
     * @return {undefined}
     */
    showShadow(): void;
    /**
     * @return {undefined}
     */
    hideShadow(): void;
    /**
     * @return {!Knot}
     */
    getContainer(): Knot;
}
