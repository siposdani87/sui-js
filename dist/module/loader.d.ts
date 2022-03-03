import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Loader {
    options: Objekt;
    loader: any;
    spinner: any;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: {});
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
     * @return {undefined}
     */
    show(): void;
    /**
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    hide(opt_force: any): void;
}
