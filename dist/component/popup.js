import { Knot } from '../core/knot';
import { PopupContainer } from './popupContainer';
import { consoleDebug } from '../utils/log';
import { mdl } from '../utils/render';
/**
 * @class
 */
export class Popup {
    /**
     * @param {!Knot} content
     * @param {!Knot} parent
     * @param {boolean=} opt_withClose
     */
    constructor(content, parent, opt_withClose = false) {
        this.content = content;
        this.parent = parent;
        this.withClose = opt_withClose;
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.popupContainer = new PopupContainer();
        this._draw();
    }
    /**
     * @private
     * @return {undefined}
     */
    _draw() {
        this.popupKnot = new Knot('div');
        this.popupKnot.addClass(['popup', 'hidden']);
        this.parent.addClass('popup-parent');
        this.parent.appendChild(this.popupKnot);
        this.popupKnot.appendChild(this.content);
        this._initCloseButton();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initCloseButton() {
        if (this.withClose) {
            const btnClose = new Knot('button');
            btnClose.setAttribute('type', 'button');
            btnClose.addClass([
                'close',
                'mdl-button',
                'mdl-js-button',
                'mdl-button--icon',
            ]);
            btnClose.addEventListener('click', () => {
                this.close();
            });
            this.popupKnot.appendChild(btnClose);
            const iconKnot = new Knot('em');
            iconKnot.addClass('material-icons');
            iconKnot.setHtml('close');
            btnClose.appendChild(iconKnot);
            mdl(btnClose);
        }
    }
    /**
     * @return {undefined}
     */
    open() {
        this.popupContainer.closeAll();
        this.popupContainer.push(Popup, this);
        this.popupKnot.removeClass('hidden');
        this.popupContainer.setPosition(this.popupKnot);
    }
    /**
     * @return {undefined}
     */
    close() {
        this.popupContainer.delete(this);
        this.popupContainer.clearPosition(this.popupKnot);
        this.popupKnot.addClass('hidden');
        this.eventClose();
    }
    /**
     * @return {undefined}
     */
    eventClose() {
        consoleDebug('Popup.eventClose()');
    }
    /**
     * @return {undefined}
     */
    toggle() {
        if (this.isOpened()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * @return {boolean}
     */
    isOpened() {
        return !this.popupKnot.hasClass('hidden');
    }
}
