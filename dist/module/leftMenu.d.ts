/**
 * @class
 */
export declare class LeftMenu {
    body: any;
    mainContainerNode: any;
    leftMenu: any;
    mainMenu: any;
    subMenu: any;
    mainMenuContainer: any;
    subMenuContainer: any;
    mainMenuTitle: any;
    subMenuTitle: any;
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
    open(opt_title?: string): void;
    /**
     * @return {undefined}
     */
    close(): void;
    /**
     * @param {string=} opt_title
     * @return {undefined}
     */
    openSubMenu(opt_title?: string): void;
    /**
     * @return {undefined}
     */
    closeSubMenu(): void;
    /**
     * @return {!Item}
     */
    getMainContainer(): any;
    /**
     * @return {!Item}
     */
    getSubContainer(): any;
}
