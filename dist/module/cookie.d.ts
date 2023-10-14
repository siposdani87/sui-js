import { Objekt } from '../core/objekt';
export declare class Cookie {
    options: Objekt;
    constructor(opt_options?: Object | undefined);
    private _setOptions;
    private _getPropertyName;
    private _getName;
    set(name: string, value: string, opt_expires?: any, opt_path?: string | undefined, opt_domain?: string | undefined, opt_secure?: boolean | undefined): void;
    get(name: string): any;
    remove(name: string, opt_path?: string | undefined, opt_domain?: string | undefined, opt_secure?: boolean | undefined): void;
    hasKey(name: string): boolean;
    getKeys(): Array<string>;
    clear(): void;
}
