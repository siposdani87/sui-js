import { Objekt } from '../core/objekt';
import { Knot } from '../core';
export declare class Flash {
    container: Knot;
    options: Objekt;
    constructor(opt_options?: Object | undefined);
    private _init;
    private _setOptions;
    private _getFlashKnot;
    private _getCloseButton;
    private _add;
    removeById(opt_id?: string | undefined): void;
    private _isClosable;
    remove(flash: Knot, opt_closeCallback?: (Function | null) | undefined): void;
    addSuccess(message: string, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Knot;
    addInfo(message: string, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Knot;
    addWarning(message: string, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Knot;
    addError(message: string, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Knot;
    addMessage(message: {
        type: string;
        content: string;
        closable?: boolean;
    }, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Knot | null;
    addDefault(message: string, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Knot;
}
