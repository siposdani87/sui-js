import { Knot } from '../core';
import { Objekt } from '../core/objekt';
export declare class Footer {
    options: Objekt;
    footerKnot: Knot;
    templateViewKnot: Knot;
    contentKnot: Knot;
    localesKnot: Knot;
    constructor(opt_options?: object | undefined);
    private _setOptions;
    private _init;
    show(): void;
    hide(): void;
    setContent(contentKnot: Knot): void;
    getLocalesContainer(): Knot;
    open(): void;
    close(): void;
    isOpened(): boolean;
    toogle(): void;
}
