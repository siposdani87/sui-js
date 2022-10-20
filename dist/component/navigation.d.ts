import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Http } from '../module';
/**
 * @class
 */
export declare class Navigation {
    http?: Http;
    options: Objekt;
    container: Collection<Objekt>;
    linkKnotKey: string;
    /**
     * @param {!Http=} opt_http
     * @param {!Object=} opt_options
     */
    constructor(opt_http?: Http, opt_options?: Object | undefined);
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions;
    /**
     * @private
     * @return {undefined}
     */
    private _init;
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
    private _setKnot;
    /**
     * @param {!Function} next
     * @return {undefined}
     */
    each(next: Function): void;
    /**
     * @param {!Knot} containerKnot
     * @return {undefined}
     */
    bindToContainer(containerKnot: Knot): void;
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
    private _disabled;
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
    private _enabled;
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
