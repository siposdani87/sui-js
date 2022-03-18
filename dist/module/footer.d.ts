import { Item } from '../core';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Footer {
    options: Objekt;
    footerNode: Item;
    templateViewNode: Item;
    contentNode: Item;
    localesNode: Item;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: Object | undefined);
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options?: Object | undefined): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @return {undefined}
     */
    show(): void;
    /**
     * @return {undefined}
     */
    hide(): void;
    /**
     * @param {!Item} contentNode
     * @return {undefined}
     */
    setContent(contentNode: Item): void;
    /**
     * @return {!Item}
     */
    getLocalesContainer(): Item;
    /**
     * @return {undefined}
     */
    open(): void;
    /**
     * @return {undefined}
     */
    close(): void;
    /**
     * @return {boolean}
     */
    isOpened(): boolean;
    /**
     * @return {undefined}
     */
    toogle(): void;
}
