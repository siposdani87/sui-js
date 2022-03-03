import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Footer {
    options: Objekt;
    footerNode: any;
    templateViewNode: any;
    contentNode: any;
    localesNode: any;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: {});
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options?: {}): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @return {undefined}
     */
    show(): void;
    /**
     * @return {undefined}
     */
    hide(): void;
    /**
     * @param {!Item} contentNode
     * @return {undefined}
     */
    setContent(contentNode: any): void;
    /**
     * @return {!Item}
     */
    getLocalesContainer(): any;
    /**
     * @return {undefined}
     */
    open(): void;
    /**
     * @return {undefined}
     */
    close(): void;
    /**
     * @return {boolean}
     */
    isOpened(): any;
    /**
     * @return {undefined}
     */
    toogle(): void;
}
