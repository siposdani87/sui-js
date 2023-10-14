import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { ProgressBar } from './progressBar';
export declare class Script {
    progressBar: ProgressBar;
    options: Objekt;
    head: Knot;
    constructor(progressBar: ProgressBar, opt_options?: Object | undefined);
    private _setOptions;
    private _init;
    load(id: string, url: string, opt_params?: Object, opt_async?: boolean | undefined, opt_defer?: boolean | undefined): import("..").Promize<Object, Object>;
    remove(id: string): void;
}
