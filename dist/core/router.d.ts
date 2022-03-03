/**
 * @class
 */
export declare class Router {
    route: string;
    param: RegExp;
    escape: RegExp;
    paramNames: any[];
    regex: any;
    /**
     * @param {string=} opt_route
     */
    constructor(opt_route?: string);
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @param {!Object=} opt_params
     * @return {string}
     */
    stringify(opt_params?: {}): string;
    /**
     * @param {string} url
     * @return {?Array}
     */
    getMatches(url: any): any;
    /**
     * @param {string} url
     * @return {!Object}
     */
    parse(url: any): {};
    /**
     * @private
     * @param {string} url
     * @return {!Object}
     */
    _parseParams(url: any): {};
}
