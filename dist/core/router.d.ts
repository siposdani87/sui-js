export declare class Router {
    route: string;
    param: RegExp;
    escape: RegExp;
    paramNames: string[];
    regex: RegExp;
    constructor(opt_route?: string | undefined);
    private _init;
    stringify(opt_params?: object | undefined): string;
    getMatches(url: string): RegExpMatchArray;
    parse(url: string): object;
    private _parseParams;
}
