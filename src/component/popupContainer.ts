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
     * @param {!Knot} popupNode
     * @return {undefined}
     */
    setPosition(popupNode: Knot): void {
        // const containerNode = this.container.getNode();
        // const top = containerNode.offsetHeight - containerNode.scrollHeight;
        // const absoluteTop = top === 0 ? 'auto' : top + 'px';
        // let left = containerNode.offsetWidth - containerNode.scrollWidth;
        // let absoluteLeft = left === 0 ? 'auto' : left + 'px';
        popupNode.setStyle({
            // 'top': 0, // absoluteTop,
            left: 0, // absoluteLeft
        });
    }
    /**
     * @param {!Knot} popupNode
     * @return {undefined}
     */
    clearPosition(popupNode: Knot): void {
        popupNode.setStyle({
            top: 'auto',
            bottom: 'auto',
            left: 'auto',
            right: 'auto',
        });
    }
}
