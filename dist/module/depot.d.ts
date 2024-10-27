import { Objekt } from '../core/objekt';
export declare class Depot {
    type: 'LOCAL' | 'SESSION';
    options: Objekt;
    storage: Storage;
    constructor(type: 'LOCAL' | 'SESSION', opt_options?: object | undefined);
    private _setOptions;
    private _init;
    private _getPropertyName;
    private _getName;
    set(name: string, value: any, opt_expires?: string | number | boolean | Date): void;
    get(name: string): any;
    remove(name: string): void;
    clear(): void;
    private _checkExpires;
    private _isExpired;
    private _getExpiresDate;
    private _getExpires;
}
