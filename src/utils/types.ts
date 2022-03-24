import { Objekt } from "../core/objekt";

/**
 * @typedef {function(Element, Event)} Listener
 */
export type Listener = (this: Element, ev: Event) => any;

/**
 * @typedef {!Object} Params
 */
export type Params = {
    [key: string]: string;
};

/**
 * @typedef {(string|number)} Id
 */
export type Id = string | number;
 
/**
 * @typedef {{style: !Function, click: !Function}} Action
 */
export type Action = {
    style: (item: Objekt) => [string, string?, boolean?, boolean?];
    click: (item: Objekt) => void;
}

/**
 * @typedef {{url: string, size: [number, number], origin: [number, number], anchor: [number, number], coords: Array<number>}} IconOptions
 */
export type IconOptions = {
    url: string;
    size: [number, number];
    origin: [number, number];
    anchor: [number, number];
    coords: number[];
}

export type Injection = {
    [key: string]: string;
}

export type Instance = {
    [key: string]: any;
}

export type ClassRef = { new(...args: any[]) };

/**
 * @typedef {{moduleInjections: Array<string>, moduleCallback: ClassRef}} Dependency
 */
export type Dependency = {
    moduleInjections: string[];
    moduleCallback: ClassRef;
};
