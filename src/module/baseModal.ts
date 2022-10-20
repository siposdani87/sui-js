import { isString, isNumber, noop, contain } from '../utils/operation';
import { Async } from '../core/async';
import { Query } from '../core/query';
import { Knot } from '../core';

/**
 * @class
 */
export class BaseModal {
    windowWidth: number;
    windowHeight: number;
    mainContainerKnot: Knot;
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
    protected _initBase(): void {
        this.windowWidth = 0;
        this.windowHeight = 0;

        this.mainContainerKnot = new Query('.main-container').getKnot();
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
        const btnMinimize = new Query('.minimize', this.modal).getKnot();
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
        const btnMaximize = new Query('.maximize', this.modal).getKnot();
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
        const btnClose = new Query('.close', this.modal).getKnot();
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
        this.hasBlur = this.mainContainerKnot.hasClass('blur');
        if (!this.hasBlur) {
            this.mainContainerKnot.addClass('blur');
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
            this.mainContainerKnot.removeClass('blur');
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
