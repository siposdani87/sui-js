import { Knot } from '../core';
import { Collection } from '../core/collection';
import { Query } from '../core/query';
import { Popup } from './popup';

/**
 * @class
 */
export class PopupContainer {
    selector: string;
    container: Knot;
    /**
     * @param {string=} opt_selector
     */
    constructor(opt_selector: string | undefined = 'body') {
        this.selector = opt_selector;
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.container = new Query(this.selector).getKnot();
    }
    /**
     * @private
     * @param {!Function} type
     * @return {undefined}
     */
    private _initCollection(type: Function): void {
        window['popup_collection'] =
            window['popup_collection'] || new Collection([], type);
    }
    /**
     * @param {!Function} type
     * @param {!Popup} popup
     * @return {undefined}
     */
    push(type: Function, popup: Popup): void {
        this._initCollection(type);
        if (window['popup_collection']) {
            window['popup_collection'].push(popup);
        }
    }
    /**
     * @param {!Popup} popup
     * @return {undefined}
     */
    delete(popup: Popup): void {
        if (window['popup_collection']) {
            window['popup_collection'].delete(popup);
        }
    }
    /**
     * @return {undefined}
     */
    closeAll(): void {
        if (window['popup_collection']) {
            window['popup_collection'].each((popup) => {
                popup.close();
            });
        }
    }
    /**
     * @param {!Knot} popupKnot
     * @return {undefined}
     */
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
    /**
     * @param {!Knot} popupKnot
     * @return {undefined}
     */
    clearPosition(popupKnot: Knot): void {
        popupKnot.setStyle({
            top: 'auto',
            bottom: 'auto',
            left: 'auto',
            right: 'auto',
        });
    }
}
