import { Knot } from '../core/knot';
import { PopupContainer } from './popupContainer';
import { consoleDebug } from '../utils/log';
import { mdl } from '../utils/render';

export class Popup {
    content: Knot;
    parent?: Knot;
    withClose: boolean;
    popupContainer: PopupContainer;
    popupKnot: Knot;

    constructor(
        content: Knot,
        parent: Knot,
        opt_withClose: boolean | undefined = false,
    ) {
        this.content = content;
        this.parent = parent;
        this.withClose = opt_withClose;
        this._init();
    }

    private _init(): void {
        this.popupContainer = new PopupContainer();
        this._draw();
    }

    private _draw(): void {
        this.popupKnot = new Knot('div');
        this.popupKnot.addClass(['popup', 'hidden']);

        this.parent.addClass('popup-parent');
        this.parent.appendChild(this.popupKnot);

        this.popupKnot.appendChild(this.content);

        this._initCloseButton();
    }

    private _initCloseButton(): void {
        if (this.withClose) {
            const btnClose = new Knot<HTMLButtonElement>('button');
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

    open(): void {
        this.popupContainer.closeAll();
        this.popupContainer.push(Popup, this);
        this.popupKnot.removeClass('hidden');
        this.popupContainer.setPosition(this.popupKnot);
    }

    close(): void {
        this.popupContainer.delete(this);
        this.popupContainer.clearPosition(this.popupKnot);
        this.popupKnot.addClass('hidden');
        this.eventClose();
    }

    eventClose(): void {
        consoleDebug('Popup.eventClose()');
    }

    toggle(): void {
        if (this.isOpened()) {
            this.close();
        } else {
            this.open();
        }
    }

    isOpened(): boolean {
        return !this.popupKnot.hasClass('hidden');
    }
}
