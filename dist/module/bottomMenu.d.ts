/**
 * @class
 */
export declare class BottomMenu {
    footer: any;
    bottomMenu: any;
    /**
     * @param {!Footer} footer
     */
    constructor(footer: any);
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @return {undefined}
     */
    toggle(): void;
    /**
     * @return {boolean}
     */
    isOpened(): any;
    /**
     * @return {undefined}
     */
    open(): void;
    /**
     * @return {undefined}
     */
    close(): void;
    /**
     * @return {!Item}
     */
    getContainer(): any;
}
