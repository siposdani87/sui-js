import { Collection } from '../core/collection';
import { Query } from '../core/query';
export class PopupContainer {
    constructor(opt_selector = 'body') {
        this.selector = opt_selector;
        this._init();
    }
    _init() {
        this.container = new Query(this.selector).getKnot();
    }
    _initCollection(type) {
        window['popup_collection'] =
            window['popup_collection'] || new Collection([], type);
    }
    push(type, popup) {
        this._initCollection(type);
        if (window['popup_collection']) {
            window['popup_collection'].push(popup);
        }
    }
    delete(popup) {
        if (window['popup_collection']) {
            window['popup_collection'].delete(popup);
        }
    }
    closeAll() {
        if (window['popup_collection']) {
            window['popup_collection'].each((popup) => {
                popup.close();
            });
        }
    }
    setPosition(popupKnot) {
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
    clearPosition(popupKnot) {
        popupKnot.setStyle({
            top: 'auto',
            bottom: 'auto',
            left: 'auto',
            right: 'auto',
        });
    }
}
