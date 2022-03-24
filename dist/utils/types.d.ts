import { Objekt } from '../core/objekt';
/**
 * @typedef {function(Element, Event)} Listener
 */
export declare type Listener = (this: Element, ev: Event) => any;
/**
 * @typedef {!Object} Params
 */
export declare type Params = {
    [key: string]: string;
};
/**
 * @typedef {(string|number)} Id
 */
export declare type Id = string | number;
/**
 * @typedef {{style: !Function, click: !Function}} Action
 */
export declare type Action = {
    style: (item: Objekt) => [string, string?, boolean?, boolean?];
    click: (item: Objekt) => void;
};
/**
 * @typedef {{url: string, size: [number, number], origin: [number, number], anchor: [number, number], coords: Array<number>}} IconOptions
 */
export declare type IconOptions = {
    url: string;
    size: [number, number];
    origin: [number, number];
    anchor: [number, number];
    coords: number[];
};
export declare type Injection = {
    [key: string]: string;
};
export declare type Instance = {
    [key: string]: any;
};
export declare type ClassRef = {
    new (...args: any[]): any;
};
/**
 * @typedef {{moduleInjections: Array<string>, moduleCallback: ClassRef}} Dependency
 */
export declare type Dependency = {
    moduleInjections: string[];
    moduleCallback: ClassRef;
};
