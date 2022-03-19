import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
import { ProgressBar } from './progressBar';
import { Promize } from '../core';
/**
 * @class
 */
export declare class Style {
    progressBar: ProgressBar;
    options: Objekt;
    head: Item;
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
    _setOptions(opt_options?: Object | undefined): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @param {string} id
     * @param {string} url
     * @param {!Object=} opt_params
     * @param {string=} opt_rel
     * @param {string=} opt_media
     * @return {!Promize}
     */
    load(id: string, url: string, opt_params?: Object, opt_rel?: string | undefined, opt_media?: string | undefined): Promize;
    /**
     * @param {string} id
     * @return {undefined}
     */
    remove(id: string): void;
}
