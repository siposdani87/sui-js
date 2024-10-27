import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { ProgressBar } from './progressBar';
export declare class Style {
    progressBar: ProgressBar;
    options: Objekt;
    head: Knot;
    constructor(progressBar: ProgressBar, opt_options?: object | undefined);
    private _setOptions;
    private _init;
    load(id: string, url: string, opt_params?: object, opt_rel?: string | undefined, opt_media?: string | undefined): import("..").Promize<boolean, boolean>;
    remove(id: string): void;
}
