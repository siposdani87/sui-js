import { Item } from '../core/item';
import { PopupContainer } from './popupContainer';
/**
 * @class
 */
export declare class Popup {
    content: Item;
    parent?: Item;
    withClose: boolean;
    popupContainer: PopupContainer;
    popupNode: Item;
    /**
     * @param {!Item} content
     * @param {!Item=} opt_parent
     * @param {boolean=} opt_withClose
     */
    constructor(content: Item, opt_parent: Item | undefined, opt_withClose?: boolean | undefined);
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @private
     * @return {undefined}
     */
    private _draw;
    /**
     * @private
     * @return {undefined}
     */
    private _initCloseButton;
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
    eventClose(): void;
    /**
     * @return {undefined}
     */
    toggle(): void;
    /**
     * @return {boolean}
     */
    isOpened(): boolean;
}
