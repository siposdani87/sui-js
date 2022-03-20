/**
 * @class
 */
export declare class Router {
    route: string;
    param: RegExp;
    escape: RegExp;
    paramNames: string[];
    regex: RegExp;
    /**
     * @param {string=} opt_route
     */
    constructor(opt_route?: string | undefined);
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @param {!Object=} opt_params
     * @return {string}
     */
    stringify(opt_params?: Object | undefined): string;
    /**
     * @param {string} url
     * @return {?RegExpMatchArray}
     */
    getMatches(url: string): RegExpMatchArray;
    /**
     * @param {string} url
     * @return {!Object}
     */
    parse(url: string): Object;
    /**
     * @private
     * @param {string} url
     * @return {!Params}
     */
    private _parseParams;
}
