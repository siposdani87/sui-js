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
    isOpened(): boolean;
    /**
     * @private
     * @param {boolean=} opt_allowClose
     * @return {undefined}
     */
    _handleCloseButton(opt_allowClose?: boolean | undefined): void;
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
    _setTitle(opt_title: string | undefined): void;
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
    setSize(width: number, height: number): void;
    /**
     * @private
     * @return {undefined}
     */
    _handleCenterPosition(): void;
}
