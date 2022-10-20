import { Knot } from '../core';
import { Popup } from './popup';
/**
 * @class
 */
export declare class PopupContainer {
    selector: string;
    container: Knot;
    /**
     * @param {string=} opt_selector
     */
    constructor(opt_selector?: string | undefined);
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @private
     * @param {!Function} type
     * @return {undefined}
     */
    private _initCollection;
    /**
     * @param {!Function} type
     * @param {!Popup} popup
     * @return {undefined}
     */
    push(type: Function, popup: Popup): void;
    /**
     * @param {!Popup} popup
     * @return {undefined}
     */
    delete(popup: Popup): void;
    /**
     * @return {undefined}
     */
    closeAll(): void;
    /**
     * @param {!Knot} popupKnot
     * @return {undefined}
     */
    setPosition(popupKnot: Knot): void;
    /**
     * @param {!Knot} popupKnot
     * @return {undefined}
     */
    clearPosition(popupKnot: Knot): void;
}
