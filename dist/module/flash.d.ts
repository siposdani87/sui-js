import { Objekt } from '../core/objekt';
import { Item } from '../core';
/**
 * @class
 */
export declare class Flash {
    container: Item;
    options: Objekt;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: object | undefined);
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options?: object | undefined): void;
    /**
     * @param {string} type
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    _getFlashNode(type: string, message: string, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Item;
    /**
     * @param {!Item} flashNode
     * @param {?Function=} opt_closeCallback
     * @return {!Item}
     */
    _getCloseButton(flashNode: Item, opt_closeCallback?: (Function | null) | undefined): Item;
    /**
     * @param {string} type
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    _add(type: string, message: string, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Item;
    /**
     * @param {string=} opt_id
     */
    removeById(opt_id?: string | undefined): void;
    /**
     * @param {string} type
     * @param {?Function=} opt_closeCallback
     * @return {boolean}
     */
    _isClosable(type: string, opt_closeCallback?: (Function | null) | undefined): boolean;
    /**
     * @param {!Item} flash
     * @param {?Function=} opt_closeCallback
     * @return {undefined}
     */
    remove(flash: Item, opt_closeCallback?: (Function | null) | undefined): void;
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    addSuccess(message: string, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Item;
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    addInfo(message: string, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Item;
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    addWarning(message: string, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Item;
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    addError(message: string, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Item;
    /**
     * @param {{type: string, content: string, closable: boolean}} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item|null}
     */
    addMessage(message: {
        type: string;
        content: string;
        closable: boolean;
    }, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Item | null;
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    addDefault(message: string, opt_duration?: number | undefined, opt_closeCallback?: (Function | null) | undefined, opt_id?: string | undefined): Item;
}
