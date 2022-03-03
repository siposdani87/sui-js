import { Item } from '../core/item';
import { PopupContainer } from './popupContainer';
/**
 * @class
 */
export declare class Popup {
    content: any;
    parent: any;
    withClose: boolean;
    popupContainer: PopupContainer;
    popupNode: Item;
    /**
     * @param {!Item} content
     * @param {!Item=} opt_parent
     * @param {boolean=} opt_withClose
     */
    constructor(content: any, opt_parent: any, opt_withClose?: boolean);
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @private
     * @return {undefined}
     */
    _draw(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initCloseButton(): void;
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
