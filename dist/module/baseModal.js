import { isString, isNumber, noop, contain } from '../utils/operation';
import { Async } from '../core/async';
import { Query } from '../core/query';
/**
 * @class
 */
export class BaseModal {
    windowWidth;
    windowHeight;
    mainContainerNode;
    hasBlur;
    modal;
    btnMinimize;
    btnMaximize;
    btnClose;
    body;
    interval;
    modalTitle;
    modalBody;
    modalFooter;
    modalHeader;
    tooltip;
    eventOK;
    eventCancel;
    modalWindow;
    /**
     */
    constructor() { }
    /**
     * @protected
     * @return {undefined}
     */
    _initBase() {
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
    _initButtons() {
        this._initCloseButton();
        this._initMinimizeButton();
        this._initMaximizeButton();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initMinimizeButton() {
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
    _initMaximizeButton() {
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
    _initCloseButton() {
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
    isOpened() {
        return this.modal.hasClass('visible-flex');
    }
    /**
     * @private
     * @param {boolean=} opt_allowClose
     * @return {undefined}
     */
    _handleCloseButton(opt_allowClose = true) {
        if (this.btnClose) {
            if (opt_allowClose) {
                this.btnClose.removeClass('hidden');
            }
            else {
                this.btnClose.addClass('hidden');
            }
        }
    }
    /**
     * @param {boolean=} opt_allowClose
     * @return {undefined}
     */
    open(opt_allowClose = true) {
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
    close() {
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
    _setTitle(opt_title) {
        this.modalTitle.setHtml(opt_title);
        if ((isString(opt_title) && opt_title.length > 0) ||
            isNumber(opt_title)) {
            this.modalHeader.removeClass('hidden');
        }
        else {
            this.modalHeader.addClass('hidden');
        }
        this.tooltip.setMessage(opt_title);
    }
    /**
     * @protected
     * @return {undefined}
     */
    _reset() {
        this.eventOK = noop();
        this.eventCancel = noop();
    }
    /**
     * @protected
     * @return {undefined}
     */
    _actionOK() {
        const async = new Async();
        const calls = [this.eventOK.bind(this), this.close.bind(this)];
        async.serial(calls);
    }
    /**
     * @protected
     * @return {undefined}
     */
    _actionCancel() {
        const async = new Async();
        const calls = [this.eventCancel.bind(this), this.close.bind(this)];
        async.serial(calls);
    }
    /**
     * @private
     * @return {undefined}
     */
    _actionMinimize() { }
    /**
     * @private
     * @return {undefined}
     */
    _actionMaximize() { }
    /**
     * @param {number} width
     * @param {number} height
     * @return {undefined}
     */
    setSize(width, height) {
        this.windowWidth = width;
        this.windowHeight = height;
        this._handleCenterPosition();
    }
    /**
     * @private
     * @return {undefined}
     */
    _handleCenterPosition() {
        const style = this.modalWindow.getComputedStyle();
        let height = style.getPropertyValue('height');
        if (contain(height, 'px')) {
            height = parseInt(height.slice(0, -2), 10);
            if (height > this.windowHeight) {
                this.modal.removeClass('center');
            }
            else {
                this.modal.addClass('center');
            }
        }
        else {
            this.modal.addClass('center');
        }
    }
}
