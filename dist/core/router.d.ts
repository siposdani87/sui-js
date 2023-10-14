export declare class Router {
    route: string;
    param: RegExp;
    escape: RegExp;
    paramNames: string[];
    regex: RegExp;
    constructor(opt_route?: string | undefined);
    private _init;
    stringify(opt_params?: Object | undefined): string;
    getMatches(url: string): RegExpMatchArray;
    parse(url: string): Object;
    private _parseParams;
}
