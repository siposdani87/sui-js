import { mdl } from '../utils/operation';
import { Item } from '../core/item';
import { PopupContainer } from './popupContainer';
import { consoleInfo } from '../utils/log';

/**
 * @class
 */
export class Popup {
    content: Item;
    parent?: Item;
    withClose: boolean;
    popupContainer: PopupContainer;
    popupNode: Item;
    /**
     * @param {!Item} content
     * @param {!Item=} opt_parent
     * @param {boolean=} opt_withClose
     */
    constructor(content: Item, opt_parent: Item | undefined, opt_withClose: boolean | undefined = false) {
        this.content = content;
        this.parent = opt_parent;
        this.withClose = opt_withClose;
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init(): void {
        this.popupContainer = new PopupContainer();
        this._draw();
    }
    /**
     * @private
     * @return {undefined}
     */
    _draw(): void {
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
    _initCloseButton(): void {
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
    open(): void {
        this.popupContainer.closeAll();
        this.popupContainer.push(Popup, this);
        this.popupNode.removeClass('hidden');
        this.popupContainer.setPosition(this.popupNode);
    }
    /**
     * @return {undefined}
     */
    close(): void {
        this.popupContainer.delete(this);
        this.popupContainer.clearPosition(this.popupNode);
        this.popupNode.addClass('hidden');
        this.eventClose();
    }
    /**
     * @return {undefined}
     */
    eventClose(): void {
        consoleInfo('Popup.eventClose()');
    }
    /**
     * @return {undefined}
     */
    toggle(): void {
        if (this.isOpened()) {
            this.close();
        } else {
            this.open();
        }
    }
    /**
     * @return {boolean}
     */
    isOpened(): boolean {
        return !this.popupNode.hasClass('hidden');
    }
}
