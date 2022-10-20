import { Knot } from '../core/knot';
import { PopupContainer } from './popupContainer';
/**
 * @class
 */
export declare class Popup {
    content: Knot;
    parent?: Knot;
    withClose: boolean;
    popupContainer: PopupContainer;
    popupKnot: Knot;
    /**
     * @param {!Knot} content
     * @param {!Knot} parent
     * @param {boolean=} opt_withClose
     */
    constructor(content: Knot, parent: Knot, opt_withClose?: boolean | undefined);
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
