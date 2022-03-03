/**
 * @class
 */
export declare class BaseModal {
    windowWidth: number;
    windowHeight: number;
    mainContainerNode: any;
    hasBlur: boolean;
    modal: any;
    btnMinimize: any;
    btnMaximize: any;
    btnClose: any;
    body: any;
    interval: any;
    modalTitle: any;
    modalBody: any;
    modalFooter: any;
    modalHeader: any;
    tooltip: any;
    eventOK: () => any;
    eventCancel: () => any;
    modalWindow: any;
    /**
     */
    constructor();
    /**
     * @protected
     * @return {undefined}
     */
    _initBase(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initButtons(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initMinimizeButton(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initMaximizeButton(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initCloseButton(): void;
    /**
     * @return {boolean}
     */
    isOpened(): any;
    /**
     * @private
     * @param {boolean=} opt_allowClose
     * @return {undefined}
     */
    _handleCloseButton(opt_allowClose?: boolean): void;
    /**
     * @param {boolean=} opt_allowClose
     * @return {undefined}
     */
    open(opt_allowClose?: boolean): void;
    /**
     * @return {undefined}
     */
    close(): void;
    /**
     * @protected
     * @param {string=} opt_title
     * @return {undefined}
     */
    _setTitle(opt_title: any): void;
    /**
     * @protected
     * @return {undefined}
     */
    _reset(): void;
    /**
     * @protected
     * @return {undefined}
     */
    _actionOK(): void;
    /**
     * @protected
     * @return {undefined}
     */
    _actionCancel(): void;
    /**
     * @private
     * @return {undefined}
     */
    _actionMinimize(): void;
    /**
     * @private
     * @return {undefined}
     */
    _actionMaximize(): void;
    /**
     * @param {number} width
     * @param {number} height
     * @return {undefined}
     */
    setSize(width: any, height: any): void;
    /**
     * @private
     * @return {undefined}
     */
    _handleCenterPosition(): void;
}
