import { Objekt } from '../core/objekt';
import { Item } from '../core';
/**
 * @class
 */
export declare class Loader {
    options: Objekt;
    loader: Item;
    spinner: Item;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: Object | undefined);
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
     * @return {undefined}
     */
    show(): void;
    /**
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    hide(opt_force: boolean | undefined): void;
}
