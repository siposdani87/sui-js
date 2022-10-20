import { Knot } from '../core';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Header {
    options: Objekt;
    headerKnot: Knot;
    leftMenuButton: Knot;
    topMenuButton: Knot;
    brandKnot: Knot;
    brandKnotImage: Knot;
    brandKnotTitle: Knot;
    mainContainerKnot: Knot;
    templateViewKnot: Knot;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: Object | undefined);
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions;
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @return {undefined}
     */
    eventLogoClick(): void;
    /**
     * @param {string} title
     * @return {undefined}
     */
    setTitle(title: string): void;
    /**
     * @param {string} url
     * @return {undefined}
     */
    setUrl(url: string): void;
    /**
     * @param {string} imagePath
     * @return {undefined}
     */
    setImage(imagePath: string): void;
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
