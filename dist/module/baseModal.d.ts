import { Item } from '../core';
import { Tooltip } from '../component';
/**
 * @class
 */
export declare class BaseModal {
    windowWidth: number;
    windowHeight: number;
    mainContainerNode: Item;
    hasBlur: boolean;
    modal: Item;
    btnMinimize: Item;
    btnMaximize: Item;
    btnClose: Item;
    body: Item;
    interval: number;
    modalTitle: Item;
    modalBody: Item;
    modalFooter: Item;
    modalHeader: Item;
    tooltip: Tooltip;
    eventOK: () => void;
    eventCancel: () => void;
    modalWindow: Item;
    /**
     * @protected
     * @return {undefined}
     */
    protected _initBase(): void;
    /**
     * @private
     * @return {undefined}
     */
    private _initButtons;
    /**
     * @private
     * @return {undefined}
     */
    private _initMinimizeButton;
    /**
     * @private
     * @return {undefined}
     */
    private _initMaximizeButton;
    /**
     * @private
     * @return {undefined}
     */
    private _initCloseButton;
    /**
     * @return {boolean}
     */
    isOpened(): boolean;
    /**
     * @private
     * @param {boolean=} opt_allowClose
     * @return {undefined}
     */
    private _handleCloseButton;
    /**
     * @param {boolean=} opt_allowClose
     * @return {undefined}
     */
    open(opt_allowClose?: boolean | undefined): void;
    /**
     * @return {undefined}
     */
    close(): void;
    /**
     * @protected
     * @param {string=} opt_title
     * @return {undefined}
     */
    protected _setTitle(opt_title: string | undefined): void;
    /**
     * @protected
     * @return {undefined}
     */
    protected _reset(): void;
    /**
     * @protected
     * @return {undefined}
     */
    protected _actionOK(): void;
    /**
     * @protected
     * @return {undefined}
     */
    protected _actionCancel(): void;
    /**
     * @private
     * @return {undefined}
     */
    private _actionMinimize;
    /**
     * @private
     * @return {undefined}
     */
    private _actionMaximize;
    /**
     * @param {number} width
     * @param {number} height
     * @return {undefined}
     */
    setSize(width: number, height: number): void;
    /**
     * @private
     * @return {undefined}
     */
    private _handleCenterPosition;
}
