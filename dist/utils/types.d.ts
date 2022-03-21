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
    style: (item: Object) => [string, string, boolean?, boolean?];
    click: (item: Object) => void;
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
