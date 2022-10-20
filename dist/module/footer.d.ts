import { Knot } from '../core';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Footer {
    options: Objekt;
    footerNode: Knot;
    templateViewNode: Knot;
    contentNode: Knot;
    localesNode: Knot;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: Object | undefined);
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions;
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @return {undefined}
     */
    show(): void;
    /**
     * @return {undefined}
     */
    hide(): void;
    /**
     * @param {!Knot} contentNode
     * @return {undefined}
     */
    setContent(contentNode: Knot): void;
    /**
     * @return {!Knot}
     */
    getLocalesContainer(): Knot;
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
    isOpened(): boolean;
    /**
     * @return {undefined}
     */
    toogle(): void;
}
