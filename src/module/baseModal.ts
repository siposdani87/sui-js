import { isString, isNumber, noop, contain } from '../utils/operation';
import { Async } from '../core/async';
import { Query } from '../core/query';
import { Item } from '../core';
import { Tooltip } from '../component';

/**
 * @class
 */
export class BaseModal {
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
    protected _initBase(): void {
        this.windowWidth = 0;
        this.windowHeight = 0;

        this.mainContainerNode = new Query('.main-container').getItem();
        this.hasBlur = false;

        this._initButtons();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initButtons(): void {
        this._initCloseButton();
        this._initMinimizeButton();
        this._initMaximizeButton();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initMinimizeButton(): void {
        const btnMinimize = new Query('.minimize', this.modal).getItem();
        if (!btnMinimize.isEmpty()) {
            btnMinimize.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-button--icon',
            ]);
            btnMinimize.addEventListener('click', () => {
                this._actionMinimize();
            });
            this.btnMinimize = btnMinimize;
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initMaximizeButton(): void {
        const btnMaximize = new Query('.maximize', this.modal).getItem();
        if (!btnMaximize.isEmpty()) {
            btnMaximize.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-button--icon',
            ]);
            btnMaximize.addEventListener('click', () => {
                this._actionMaximize();
            });
            this.btnMaximize = btnMaximize;
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initCloseButton(): void {
        const btnClose = new Query('.close', this.modal).getItem();
        if (!btnClose.isEmpty()) {
            btnClose.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-button--icon',
            ]);
            btnClose.addEventListener('click', () => {
                this._actionCancel();
            });
            this.btnClose = btnClose;
        }
    }
    /**
     * @return {boolean}
     */
    isOpened(): boolean {
        return this.modal.hasClass('visible-flex');
    }
    /**
     * @private
     * @param {boolean=} opt_allowClose
     * @return {undefined}
     */
    private _handleCloseButton(
        opt_allowClose: boolean | undefined = true,
    ): void {
        if (this.btnClose) {
            if (opt_allowClose) {
                this.btnClose.removeClass('hidden');
            } else {
                this.btnClose.addClass('hidden');
            }
        }
    }
    /**
     * @param {boolean=} opt_allowClose
     * @return {undefined}
     */
    open(opt_allowClose: boolean | undefined = true): void {
        this.hasBlur = this.mainContainerNode.hasClass('blur');
        if (!this.hasBlur) {
            this.mainContainerNode.addClass('blur');
            this.body.addClass('overflow-hidden');
        }

        this.modal.addClass('visible-flex');
        this.modal.removeClass('hidden');

        this._handleCloseButton(opt_allowClose);

        this._handleCenterPosition();
        this.interval = setInterval(() => {
            this._handleCenterPosition();
        }, 1000);
    }
    /**
     * @return {undefined}
     */
    close(): void {
        clearInterval(this.interval);

        if (!this.hasBlur) {
            this.mainContainerNode.removeClass('blur');
            this.body.removeClass('overflow-hidden');
        }

        this.modal.addClass('hidden');
        this.modal.removeClass('visible-flex');

        this.modalTitle.removeChildren();
        this.modalBody.removeChildren();
        this.modalFooter.removeChildren();
    }
    /**
     * @protected
     * @param {string=} opt_title
     * @return {undefined}
     */
    protected _setTitle(opt_title: string | undefined): void {
        this.modalTitle.setHtml(opt_title);

        if (
            (isString(opt_title) && opt_title.length > 0) ||
            isNumber(opt_title)
        ) {
            this.modalHeader.removeClass('hidden');
        } else {
            this.modalHeader.addClass('hidden');
        }
        this.tooltip.setMessage(opt_title);
    }
    /**
     * @protected
     * @return {undefined}
     */
    protected _reset(): void {
        this.eventOK = noop();
        this.eventCancel = noop();
    }
    /**
     * @protected
     * @return {undefined}
     */
    protected _actionOK(): void {
        const async = new Async();
        const calls = [this.eventOK.bind(this), this.close.bind(this)];
        async.serial(calls);
    }
    /**
     * @protected
     * @return {undefined}
     */
    protected _actionCancel(): void {
        const async = new Async();
        const calls = [this.eventCancel.bind(this), this.close.bind(this)];
        async.serial(calls);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _actionMinimize(): void {
        // empty function
    }
    /**
     * @private
     * @return {undefined}
     */
    private _actionMaximize(): void {
        // empty function
    }
    /**
     * @param {number} width
     * @param {number} height
     * @return {undefined}
     */
    setSize(width: number, height: number): void {
        this.windowWidth = width;
        this.windowHeight = height;
        this._handleCenterPosition();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _handleCenterPosition(): void {
        const style = this.modalWindow.getComputedStyle();
        const styleHeight = style.getPropertyValue('height');
        if (contain(styleHeight, 'px')) {
            const height = parseInt(styleHeight.slice(0, -2), 10);
            if (height > this.windowHeight) {
                this.modal.removeClass('center');
            } else {
                this.modal.addClass('center');
            }
        } else {
            this.modal.addClass('center');
        }
    }
}
