import { Knot } from '../core';
import { Collection } from '../core/collection';
import { Query } from '../core/query';
import { Popup } from './popup';

export class PopupContainer {
    selector: string;
    container!: Knot;

    constructor(opt_selector: string | undefined = 'body') {
        this.selector = opt_selector;
        this._init();
    }

    private _init(): void {
        this.container = new Query(this.selector).getKnot();
    }

    private _initCollection(type: Function): void {
        (window as any)['popup_collection'] =
            (window as any)['popup_collection'] || new Collection([], type);
    }

    push(type: Function, popup: Popup): void {
        this._initCollection(type);
        if ((window as any)['popup_collection']) {
            (window as any)['popup_collection'].push(popup);
        }
    }

    delete(popup: Popup): void {
        if ((window as any)['popup_collection']) {
            (window as any)['popup_collection'].delete(popup);
        }
    }

    closeAll(): void {
        if ((window as any)['popup_collection']) {
            (window as any)['popup_collection'].each((popup: Popup) => {
                popup.close();
            });
        }
    }

    setPosition(popupKnot: Knot): void {
        // const containerKnot = this.container.getKnot();
        // const top = containerKnot.offsetHeight - containerKnot.scrollHeight;
        // const absoluteTop = top === 0 ? 'auto' : top + 'px';
        // let left = containerKnot.offsetWidth - containerKnot.scrollWidth;
        // let absoluteLeft = left === 0 ? 'auto' : left + 'px';
        popupKnot.setStyle({
            // 'top': 0, // absoluteTop,
            left: 0, // absoluteLeft
        });
    }

    clearPosition(popupKnot: Knot): void {
        popupKnot.setStyle({
            top: 'auto',
            bottom: 'auto',
            left: 'auto',
            right: 'auto',
        });
    }
}
