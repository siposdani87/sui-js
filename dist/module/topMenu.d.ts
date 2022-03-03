/**
 * @class
 */
export declare class TopMenu {
    header: any;
    topMenu: any;
    toggleTopMenu: any;
    /**
     * @param {!Header} header
     */
    constructor(header: any);
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
