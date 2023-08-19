import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Action } from '../utils';
/**
 * @class
 */
export declare class Dropdown {
    dropdown: Knot;
    options: Objekt;
    collection: Collection<Objekt>;
    actions: Action[];
    item: Objekt;
    buttonKnot: Knot;
    menuKnot: Knot;
    /**
     * @param {!Knot} element
     * @param {!Object=} opt_options
     */
    constructor(element: Knot, opt_options?: Object | undefined);
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
     * @private
     * @return {undefined}
     */
    private _appendButton;
    /**
     * @private
     * @return {undefined}
     */
    private _appendMenu;
    /**
     * @param {!Array<Action>} actions
     * @param {!Objekt} item
     * @return {undefined}
     */
    setActions(actions: Array<Action>, item: Objekt): void;
    /**
     * @private
     * @return {undefined}
     */
    private _renderMenu;
}
