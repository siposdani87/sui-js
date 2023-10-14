import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { ProgressBar } from './progressBar';
/**
 * @class
 */
export declare class Style {
    progressBar: ProgressBar;
    options: Objekt;
    head: Knot;
    /**
     * @param {!ProgressBar} progressBar
     * @param {!Object=} opt_options
     */
    constructor(progressBar: ProgressBar, opt_options?: Object | undefined);
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
     * @param {string} id
     * @param {string} url
     * @param {!Object=} opt_params
     * @param {string=} opt_rel
     * @param {string=} opt_media
     * @return {!Promize}
     */
    load(id: string, url: string, opt_params?: Object, opt_rel?: string | undefined, opt_media?: string | undefined): import("..").Promize<boolean, boolean>;
    /**
     * @param {string} id
     * @return {undefined}
     */
    remove(id: string): void;
}
