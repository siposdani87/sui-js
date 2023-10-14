export declare class Objekt<T extends Object = Object> {
    [key: string]: T[keyof T | any];
    constructor(opt_object?: T);
    merge(object: any): Objekt;
    private _convertObject;
    get<K>(attribute: string | undefined, opt_defaultValue?: K, opt_isSafe?: boolean | undefined): K;
    private _getByAttributes;
    private _setByAttributes;
    set<K>(attribute: string, value: K): void;
    setRaw<K>(attribute: string, value: K, opt_isSafe?: boolean | undefined): void;
    remove(attribute: string): void;
    clear(): void;
    private _removeByAttributes;
    each<K>(next: (value: K, key: string) => void, opt_properties?: Object | undefined, opt_attributes?: Array<string> | undefined): void;
    private _attributesToObject;
    copy(): Objekt;
    copyObject(): Object;
    isEmpty(): boolean;
    allowKeys(keys: Array<string>): Objekt;
    denyKeys(keys: Array<string>): Objekt;
    filterKeys(obj: Objekt, condition: (key: string) => boolean): Objekt;
}
