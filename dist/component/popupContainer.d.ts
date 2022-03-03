/**
 * @class
 */
export declare class PopupContainer {
    selector: string;
    container: any;
    /**
     * @param {string=} opt_selector
     */
    constructor(opt_selector?: string);
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @private
     * @param {!Function} type
     * @return {undefined}
     */
    _initCollection(type: any): void;
    /**
     * @param {!Function} type
     * @param {!Popup} popup
     * @return {undefined}
     */
    push(type: any, popup: any): void;
    /**
     * @param {!Popup} popup
     * @return {undefined}
     */
    delete(popup: any): void;
    /**
     * @return {undefined}
     */
    closeAll(): void;
    /**
     * @param {!Item} popupNode
     * @return {undefined}
     */
    setPosition(popupNode: any): void;
    /**
     * @param {!Item} popupNode
     * @return {undefined}
     */
    clearPosition(popupNode: any): void;
}
