import { Item } from '../core/item';
import { PopupContainer } from './popupContainer';
import { consoleInfo } from '../utils/log';
import { mdl } from '../utils/render';
/**
 * @class
 */
export class Popup {
    /**
     * @param {!Item} content
     * @param {!Item} parent
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
        this.popupNode = new Item('div');
        this.popupNode.addClass(['popup', 'hidden']);
        this.parent.addClass('popup-parent');
        this.parent.appendChild(this.popupNode);
        this.popupNode.appendChild(this.content);
        this._initCloseButton();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initCloseButton() {
        if (this.withClose) {
            const btnClose = new Item('button');
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
            this.popupNode.appendChild(btnClose);
            const iconNode = new Item('em');
            iconNode.addClass('material-icons');
            iconNode.setHtml('close');
            btnClose.appendChild(iconNode);
            mdl(btnClose);
        }
    }
    /**
     * @return {undefined}
     */
    open() {
        this.popupContainer.closeAll();
        this.popupContainer.push(Popup, this);
        this.popupNode.removeClass('hidden');
        this.popupContainer.setPosition(this.popupNode);
    }
    /**
     * @return {undefined}
     */
    close() {
        this.popupContainer.delete(this);
        this.popupContainer.clearPosition(this.popupNode);
        this.popupNode.addClass('hidden');
        this.eventClose();
    }
    /**
     * @return {undefined}
     */
    eventClose() {
        consoleInfo('Popup.eventClose()');
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
        return !this.popupNode.hasClass('hidden');
    }
}
