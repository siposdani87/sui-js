import { Knot } from '../core/knot';
import { PopupContainer } from './popupContainer';
import { consoleDebug } from '../utils/log';
import { mdl } from '../utils/render';
/**
 * @description Toggleable popup overlay that attaches content to a parent element.
 * Supports optional close button and integrates with the global {@link PopupContainer}
 * for lifecycle management.
 *
 * @example
 * const popup = new Popup(contentKnot, parentKnot, true);
 * popup.eventClose = () => console.log('Popup closed');
 * popup.toggle();
 *
 * @see {@link PopupContainer} for global popup lifecycle management
 *
 * @category Component
 */
export class Popup {
    /**
     * @description Creates a new Popup with content attached to a parent element.
     * @param {Knot} content - The content to display inside the popup.
     * @param {Knot} parent - The parent element the popup is attached to.
     * @param {boolean} [opt_withClose] - Whether to show a close button.
     */
    constructor(content, parent, opt_withClose = false) {
        this.content = content;
        this.parent = parent;
        this.withClose = opt_withClose;
        this._init();
    }
    /**
     * @description Initializes the popup container and draws the popup DOM.
     */
    _init() {
        this.popupContainer = new PopupContainer();
        this._draw();
    }
    /**
     * @description Creates the popup DOM structure and appends it to the parent element.
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
     * @description Adds an MDL close button to the popup when withClose is enabled.
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
     * @description Opens the popup, closing all other popups first, and positions it within the container.
     *
     * @example
     * popup.open();
     */
    open() {
        this.popupContainer.closeAll();
        this.popupContainer.push(Popup, this);
        this.popupKnot.removeClass('hidden');
        this.popupContainer.setPosition(this.popupKnot);
    }
    /**
     * @description Closes the popup, removes it from the container, and fires the eventClose callback.
     *
     * @example
     * popup.close();
     */
    close() {
        this.popupContainer.delete(this);
        this.popupContainer.clearPosition(this.popupKnot);
        this.popupKnot.addClass('hidden');
        this.eventClose();
    }
    /**
     * @description Called when the popup is closed. Override to handle close events.
     *
     * @example
     * popup.eventClose = () => cleanup();
     */
    eventClose() {
        consoleDebug('Popup.eventClose()');
    }
    /**
     * @description Toggles the popup between open and closed states.
     *
     * @example
     * button.addEventListener('click', () => popup.toggle());
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
     * @description Checks whether the popup is currently open.
     * @returns {boolean} True if the popup is visible.
     *
     * @example
     * if (popup.isOpened()) { popup.close(); }
     */
    isOpened() {
        return !this.popupKnot.hasClass('hidden');
    }
}
