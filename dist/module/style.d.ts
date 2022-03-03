import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Style {
    progressBar: any;
    options: Objekt;
    head: any;
    /**
     * @param {!ProgressBar} progressBar
     * @param {!Object=} opt_options
     */
    constructor(progressBar: any, opt_options?: {});
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
     * @param {string} id
     * @param {string} url
     * @param {!Object=} opt_params
     * @param {string=} opt_rel
     * @param {string=} opt_media
     * @return {!Promize}
     */
    load(id: any, url: any, opt_params: any, opt_rel?: string, opt_media?: string): import("..").Promize;
    /**
     * @param {string} id
     * @return {undefined}
     */
    remove(id: any): void;
}
