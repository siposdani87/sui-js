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
    constructor(opt_options?: object | undefined);
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options?: object | undefined): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
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
