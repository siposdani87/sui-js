import { Knot } from '../core/knot';
import { PopupContainer } from './popupContainer';
import { Emitter } from '../core/emitter';
import { sui } from '../utils/render';

/**
 * Toggleable popup overlay that attaches content to a parent element.
 * Supports optional close button and integrates with the global {@link PopupContainer}
 * for lifecycle management.
 *
 * @example
 * const popup = new Popup(contentKnot, parentKnot, true);
 * popup.on('close', () => console.log('Popup closed'));
 * popup.toggle();
 *
 * @see {@link PopupContainer} for global popup lifecycle management
 *
 * @category Component
 */
export class Popup extends Emitter {
    content: Knot;
    parent?: Knot;
    withClose: boolean;
    popupContainer!: PopupContainer;
    popupKnot!: Knot;

    /**
     * Creates a new Popup with content attached to a parent element.
     * @param {Knot} content - The content to display inside the popup.
     * @param {Knot} parent - The parent element the popup is attached to.
     * @param {boolean} [opt_withClose] - Whether to show a close button.
     */
    constructor(
        content: Knot,
        parent: Knot,
        opt_withClose: boolean | undefined = false,
    ) {
        super();
        this.content = content;
        this.parent = parent;
        this.withClose = opt_withClose;
        this._init();
    }

    /**
     * Initializes the popup container and draws the popup DOM.
     */
    private _init(): void {
        this.popupContainer = new PopupContainer();
        this._draw();
    }

    /**
     * Creates the popup DOM structure and appends it to the parent element.
     */
    private _draw(): void {
        this.popupKnot = new Knot('div');
        this.popupKnot.addClass(['popup', 'hidden']);

        this.parent!.addClass('popup-parent');
        this.parent!.appendChild(this.popupKnot);

        this.popupKnot.appendChild(this.content);

        this._initCloseButton();
    }

    /**
     * Adds a close button to the popup when withClose is enabled.
     */
    private _initCloseButton(): void {
        if (this.withClose) {
            const btnClose = new Knot<HTMLButtonElement>('button');
            btnClose.setAttribute('type', 'button');
            btnClose.addClass(['close', 'sui-button', 'sui-button--icon']);
            btnClose.addEventListener('click', () => {
                this.close();
            });
            this.popupKnot.appendChild(btnClose);

            const iconKnot = new Knot('em');
            iconKnot.addClass('material-icons');
            iconKnot.setHtml('close');
            btnClose.appendChild(iconKnot);

            sui(btnClose);
        }
    }

    /**
     * Opens the popup, closing all other popups first, and positions it within the container.
     *
     * @example
     * popup.open();
     */
    open(): void {
        this.popupContainer.closeAll();
        this.popupContainer.push(Popup, this);
        this.popupKnot.removeClass('hidden');
        this.popupContainer.setPosition(this.popupKnot);
    }

    /**
     * Closes the popup, removes it from the container, and fires the eventClose callback.
     *
     * @example
     * popup.close();
     */
    close(): void {
        this.popupContainer.delete(this);
        this.popupContainer.clearPosition(this.popupKnot);
        this.popupKnot.addClass('hidden');
        this.emit('close');
    }

    /**
     * Toggles the popup between open and closed states.
     *
     * @example
     * button.addEventListener('click', () => popup.toggle());
     */
    toggle(): void {
        if (this.isOpened()) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Checks whether the popup is currently open.
     * @returns {boolean} True if the popup is visible.
     *
     * @example
     * if (popup.isOpened()) { popup.close(); }
     */
    isOpened(): boolean {
        return !this.popupKnot.hasClass('hidden');
    }
}
