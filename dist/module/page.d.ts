import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
export declare class Page {
    options: Objekt;
    document: Document;
    constructor(opt_options?: Object | undefined);
    private _setOptions;
    private _init;
    setTitle(title: string): void;
    eventClick(target: Knot, event: Event): void;
    mailTo(email: string, opt_subject?: string | undefined): void;
}
