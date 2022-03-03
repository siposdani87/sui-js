/**
 * @class
 */
export declare class Flash {
    container: any;
    options: any;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: {});
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
    _setOptions(opt_options?: {}): void;
    /**
     * @param {string} type
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    _getFlashNode(type: any, message: any, opt_duration?: number, opt_closeCallback?: any, opt_id?: string): any;
    /**
     * @param {!Item} flashNode
     * @param {?Function=} opt_closeCallback
     * @return {!Item}
     */
    _getCloseButton(flashNode: any, opt_closeCallback?: any): any;
    /**
     * @param {string} type
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    _add(type: any, message: any, opt_duration?: number, opt_closeCallback?: any, opt_id?: string): any;
    /**
     * @param {string=} opt_id
     */
    removeById(opt_id?: string): void;
    /**
     * @param {string} type
     * @param {?Function=} opt_closeCallback
     * @return {boolean}
     */
    _isClosable(type: any, opt_closeCallback?: any): boolean;
    /**
     * @param {!Item} flash
     * @param {?Function=} opt_closeCallback
     * @return {undefined}
     */
    remove(flash: any, opt_closeCallback?: any): void;
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    addSuccess(message: any, opt_duration?: number, opt_closeCallback?: any, opt_id?: string): any;
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    addInfo(message: any, opt_duration?: number, opt_closeCallback?: any, opt_id?: string): any;
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    addWarning(message: any, opt_duration?: number, opt_closeCallback?: any, opt_id?: string): any;
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    addError(message: any, opt_duration?: number, opt_closeCallback?: any, opt_id?: string): any;
    /**
     * @param {{type: string, content: string, closable: boolean}} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item|null}
     */
    addMessage(message: any, opt_duration?: number, opt_closeCallback?: any, opt_id?: string): any;
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    addDefault(message: any, opt_duration?: number, opt_closeCallback?: any, opt_id?: string): any;
}
