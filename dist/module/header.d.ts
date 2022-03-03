import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Header {
    options: Objekt;
    headerNode: any;
    leftMenuButton: any;
    topMenuButton: any;
    brandNode: any;
    brandNodeImage: any;
    brandNodeTitle: any;
    mainContainerNode: any;
    templateViewNode: any;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: {});
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @return {undefined}
     */
    eventLogoClick(): void;
    /**
     * @param {string} title
     * @return {undefined}
     */
    setTitle(title: any): void;
    /**
     * @param {string} url
     * @return {undefined}
     */
    setUrl(url: any): void;
    /**
     * @param {string} imagePath
     * @return {undefined}
     */
    setImage(imagePath: any): void;
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
     * @return {undefined}
     */
    showLeftMenuButton(): void;
    /**
     * @return {undefined}
     */
    hideLeftMenuButton(): void;
    /**
     * @return {undefined}
     */
    showTopMenuButton(): void;
    /**
     * @return {undefined}
     */
    hideTopMenuButton(): void;
}
