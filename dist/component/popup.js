import { Knot } from '../core/knot';
import { PopupContainer } from './popupContainer';
import { consoleDebug } from '../utils/log';
import { mdl } from '../utils/render';
export class Popup {
    constructor(content, parent, opt_withClose = false) {
        this.content = content;
        this.parent = parent;
        this.withClose = opt_withClose;
        this._init();
    }
    _init() {
        this.popupContainer = new PopupContainer();
        this._draw();
    }
    _draw() {
        this.popupKnot = new Knot('div');
        this.popupKnot.addClass(['popup', 'hidden']);
        this.parent.addClass('popup-parent');
        this.parent.appendChild(this.popupKnot);
        this.popupKnot.appendChild(this.content);
        this._initCloseButton();
    }
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
    open() {
        this.popupContainer.closeAll();
        this.popupContainer.push(Popup, this);
        this.popupKnot.removeClass('hidden');
        this.popupContainer.setPosition(this.popupKnot);
    }
    close() {
        this.popupContainer.delete(this);
        this.popupContainer.clearPosition(this.popupKnot);
        this.popupKnot.addClass('hidden');
        this.eventClose();
    }
    eventClose() {
        consoleDebug('Popup.eventClose()');
    }
    toggle() {
        if (this.isOpened()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    isOpened() {
        return !this.popupKnot.hasClass('hidden');
    }
}
