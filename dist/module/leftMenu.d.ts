import { Knot } from '../core';
/**
 * @class
 */
export declare class LeftMenu {
    body: Knot;
    mainContainerKnot: Knot;
    leftMenu: Knot;
    mainMenu: Knot;
    subMenu: Knot;
    mainMenuContainer: Knot;
    subMenuContainer: Knot;
    mainMenuTitle: Knot;
    subMenuTitle: Knot;
    /**
     */
    constructor();
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @private
     */
    _initEvents(): void;
    /**
     * @param {string=} opt_title
     * @return {undefined}
     */
    open(opt_title?: string | undefined): void;
    /**
     * @return {undefined}
     */
    close(): void;
    /**
     * @param {string=} opt_title
     * @return {undefined}
     */
    openSubMenu(opt_title?: string | undefined): void;
    /**
     * @return {undefined}
     */
    closeSubMenu(): void;
    /**
     * @return {!Knot}
     */
    getMainContainer(): Knot;
    /**
     * @return {!Knot}
     */
    getSubContainer(): Knot;
}
