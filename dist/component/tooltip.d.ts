/**
 * https://www.getmdl.io/components/index.html#tooltips-section
 * @class
 */
export declare class Tooltip {
    element: any;
    valid: boolean;
    positionCssClass: string;
    tooltip: any;
    /**
     * @param {!Item} element
     * @param {string=} opt_position TOP|BOTTOM|LEFT|RIGHT
     */
    constructor(element: any, opt_position?: string);
    /**
     * @private
     * @param {string=} opt_position
     * @return {undefined}
     */
    _initPositions(opt_position?: string): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @param {string=} opt_message
     * @return {string}
     */
    _getMessage(opt_message?: string): string;
    /**
     * @private
     * @return {undefined}
     */
    _createTooltip(): void;
    /**
     * @param {string=} opt_message
     * @return {undefined}
     */
    render(opt_message?: any): void;
    /**
     * @private
     * @return {undefined}
     */
    _handleAttributes(): void;
    /**
     * @param {string=} opt_message
     * @return {undefined}
     */
    setMessage(opt_message?: string): void;
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
    isOpen(): any;
    /**
     * @return {undefined}
     */
    toggle(): void;
}
