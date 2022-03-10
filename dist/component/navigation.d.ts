import { Collection } from '../core/collection';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Navigation {
    http: any;
    options: Objekt;
    container: Collection<Objekt>;
    linkNodeKey: string;
    /**
     * @param {!Http=} opt_http
     * @param {!Object=} opt_options
     */
    constructor(opt_http: any, opt_options?: {});
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options?: {}): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @param {!Objekt} item
     * @return {undefined}
     */
    add(item: any): void;
    /**
     * @param {string} id
     * @param {string} counter
     * @param {?string} title
     * @param {!Function} action
     * @param {string=} opt_href
     * @param {!Object=} opt_data
     * @return {undefined}
     */
    addCounter(id: any, counter: any, title: any, action: any, opt_href?: string, opt_data?: {}): void;
    /**
     * @param {string} id
     * @param {string} icon
     * @param {?string} title
     * @param {!Function} action
     * @param {string=} opt_href
     * @param {!Object=} opt_data
     * @return {undefined}
     */
    addIcon(id: any, icon: any, title: any, action: any, opt_href?: string, opt_data?: {}): void;
    /**
     * @param {string} id
     * @param {string} image
     * @param {?string} title
     * @param {!Function} action
     * @param {string=} opt_href
     * @param {!Object=} opt_data
     * @return {undefined}
     */
    addImage(id: any, image: any, title: any, action: any, opt_href?: string, opt_data?: {}): void;
    /**
     * @param {string} id
     * @param {string} title
     * @param {!Function} action
     * @param {string=} opt_href
     * @param {!Object=} opt_data
     * @return {undefined}
     */
    addText(id: any, title: any, action: any, opt_href?: string, opt_data?: {}): void;
    /**
     * @private
     * @param {string} id
     * @param {?string} title
     * @param {!Function} action
     * @param {string=} opt_href
     * @param {!Object=} opt_data
     * @return {!Objekt}
     */
    _setItem(id: any, title: any, action: any, opt_href?: string, opt_data?: {}): Objekt;
    /**
     * @param {!Function} next
     * @return {undefined}
     */
    each(next: any): void;
    /**
     * @param {!Item} containerNode
     * @return {undefined}
     */
    bindToContainer(containerNode: any): void;
    /**
     * @param {string} id
     * @return {undefined}
     */
    setDisabled(id: any): void;
    /**
     * @private
     * @param {!Objekt} item
     * @return {undefined}
     */
    _disabled(item: any): void;
    /**
     * @param {string} id
     * @return {undefined}
     */
    setEnabled(id: any): void;
    /**
     * @private
     * @param {!Objekt} item
     * @return {undefined}
     */
    _enabled(item: any): void;
    /**
     * @param {string} id
     * @return {undefined}
     */
    setActive(id: any): void;
    /**
     * @return {undefined}
     */
    setAllInactive(): void;
    /**
     * @param {string} id
     * @return {undefined}
     */
    show(id: any): void;
    /**
     * @param {string} id
     * @return {undefined}
     */
    hide(id: any): void;
}
