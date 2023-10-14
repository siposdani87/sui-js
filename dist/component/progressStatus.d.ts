import { Knot } from '../core';
import { Objekt } from '../core/objekt';
export declare class ProgressStatus {
    progressStatusKnot: Knot;
    options: Objekt;
    iconKnot: Knot;
    textKnot: Knot;
    constructor(dom: Knot, opt_selector?: string | undefined, opt_options?: Object | undefined);
    private _setOptions;
    private _init;
    private _setStatus;
    setSuccess(text: string, opt_icon?: string | undefined): void;
    setInfo(text: string, opt_icon?: string | undefined): void;
    setWarning(text: string, opt_icon?: string | undefined): void;
    setError(text: string, opt_icon?: string | undefined): void;
}
