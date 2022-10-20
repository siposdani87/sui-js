import { Knot } from '../core';
/**
 * @class
 */
export declare class BaseModal {
    windowWidth: number;
    windowHeight: number;
    mainContainerNode: Knot;
    hasBlur: boolean;
    modal: Knot;
    btnMinimize: Knot;
    btnMaximize: Knot;
    btnClose: Knot;
    body: Knot;
    interval: number;
    modalTitle: Knot;
    modalBody: Knot;
    modalFooter: Knot;
    modalHeader: Knot;
    eventOK: () => void;
    eventCancel: () => void;
    modalWindow: Knot;
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
