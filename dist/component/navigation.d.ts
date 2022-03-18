import { Collection } from '../core/collection';
import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
import { Http } from '../module';
/**
 * @class
 */
export declare class Navigation {
    http: Http;
    options: Objekt;
    container: Collection<Objekt>;
    linkNodeKey: string;
    /**
     * @param {!Http=} opt_http
     * @param {!Object=} opt_options
     */
    constructor(opt_http: Http | undefined, opt_options?: Object | undefined);
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options?: Object | undefined): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @param {!Objekt} item
     * @return {undefined}
     */
    add(item: Objekt): void;
    /**
     * @param {string} id
     * @param {string} counter
     * @param {?string} title
     * @param {!Function} action
     * @param {string=} opt_href
     * @param {!Object=} opt_data
     * @return {undefined}
     */
    addCounter(id: string, counter: string, title: string | null, action: Function, opt_href?: string | undefined, opt_data?: Object | undefined): void;
    /**
     * @param {string} id
     * @param {string} icon
     * @param {?string} title
     * @param {!Function} action
     * @param {string=} opt_href
     * @param {!Object=} opt_data
     * @return {undefined}
     */
    addIcon(id: string, icon: string, title: string | null, action: Function, opt_href?: string | undefined, opt_data?: Object | undefined): void;
    /**
     * @param {string} id
     * @param {string} image
     * @param {?string} title
     * @param {!Function} action
     * @param {string=} opt_href
     * @param {!Object=} opt_data
     * @return {undefined}
     */
    addImage(id: string, image: string, title: string | null, action: Function, opt_href?: string | undefined, opt_data?: Object | undefined): void;
    /**
     * @param {string} id
     * @param {string} title
     * @param {!Function} action
     * @param {string=} opt_href
     * @param {!Object=} opt_data
     * @return {undefined}
     */
    addText(id: string, title: string, action: Function, opt_href?: string | undefined, opt_data?: Object | undefined): void;
    /**
     * @private
     * @param {string} id
     * @param {?string} title
     * @param {!Function} action
     * @param {string=} opt_href
     * @param {!Object=} opt_data
     * @return {!Objekt}
     */
    _setItem(id: string, title: string | null, action: Function, opt_href?: string | undefined, opt_data?: Object | undefined): Objekt;
    /**
     * @param {!Function} next
     * @return {undefined}
     */
    each(next: Function): void;
    /**
     * @param {!Item} containerNode
     * @return {undefined}
     */
    bindToContainer(containerNode: Item): void;
    /**
     * @param {string} id
     * @return {undefined}
     */
    setDisabled(id: string): void;
    /**
     * @private
     * @param {!Objekt} item
     * @return {undefined}
     */
    _disabled(item: Objekt): void;
    /**
     * @param {string} id
     * @return {undefined}
     */
    setEnabled(id: string): void;
    /**
     * @private
     * @param {!Objekt} item
     * @return {undefined}
     */
    _enabled(item: Objekt): void;
    /**
     * @param {string} id
     * @return {undefined}
     */
    setActive(id: string): void;
    /**
     * @return {undefined}
     */
    setAllInactive(): void;
    /**
     * @param {string} id
     * @return {undefined}
     */
    show(id: string): void;
    /**
     * @param {string} id
     * @return {undefined}
     */
    hide(id: string): void;
}
