import { Objekt } from '../core/objekt';
import { Knot } from '../core';
export declare class Loader {
    options: Objekt;
    loader: Knot;
    spinner: Knot;
    constructor(opt_options?: object | undefined);
    private _setOptions;
    private _init;
    show(): void;
    hide(opt_force?: boolean | undefined): void;
}
