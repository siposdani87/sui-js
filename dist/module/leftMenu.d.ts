import { Item } from '../core';
/**
 * @class
 */
export declare class LeftMenu {
    body: Item;
    mainContainerNode: Item;
    leftMenu: Item;
    mainMenu: Item;
    subMenu: Item;
    mainMenuContainer: Item;
    subMenuContainer: Item;
    mainMenuTitle: Item;
    subMenuTitle: Item;
    /**
     */
    constructor();
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
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
     * @return {!Item}
     */
    getMainContainer(): Item;
    /**
     * @return {!Item}
     */
    getSubContainer(): Item;
}
