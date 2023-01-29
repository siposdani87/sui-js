import { Objekt } from '../core/objekt';
import { Knot } from '../core';
/**
 * @class
 */
export declare class Flash {
    container: Knot;
    options: Objekt;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: Object | undefined);
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions;
    /**
     * @param {string} type
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Knot}
     */
    private _getFlashKnot;
    /**
     * @param {!Knot} flashKnot
     * @param {?Function=} opt_closeCallback
     * @return {!Knot}
     */
    private _getCloseButton;
    /**
     * @param {string} type
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Knot}
     */
    private _add;
    /**
     * @param {string=} opt_id
     */
    removeById(opt_id?: string | undefined): void;
    /**
     * @param {string} type
     * @param {?Function=} opt_closeCallback
     * @return {boolean}
     */
    private _isClosable;
    /**
     * @param {!Knot} flash
     * @param {?Function=} opt_closeCallback
     * @return {undefined}
     */
    remove(flash: Knot, opt_closeCallback?: (Function | null) | undefined): void;
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Knot}
     */
    addSuccess(message: string, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Knot;
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Knot}
     */
    addInfo(message: string, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Knot;
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Knot}
     */
    addWarning(message: string, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Knot;
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Knot}
     */
    addError(message: string, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Knot;
    /**
     * @param {{type: string, content: string, closable: boolean}} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Knot|null}
     */
    addMessage(message: {
        type: string;
        content: string;
        closable?: boolean;
    }, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Knot | null;
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Knot}
     */
    addDefault(message: string, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Knot;
}
