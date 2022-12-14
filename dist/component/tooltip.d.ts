import { Knot } from '../core/knot';
/**
 * https://www.getmdl.io/components/index.html#tooltips-section
 * @class
 */
export declare class Tooltip {
    element: Knot;
    valid: boolean;
    positionCssClass: string;
    tooltip: Knot;
    /**
     * @param {!Knot} element
     * @param {string=} opt_position TOP|BOTTOM|LEFT|RIGHT
     */
    constructor(element: Knot, opt_position?: string | undefined);
    /**
     * @private
     * @param {string=} opt_position
     * @return {undefined}
     */
    private _initPositions;
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @param {string=} opt_message
     * @return {string}
     */
    private _getMessage;
    /**
     * @private
     * @return {undefined}
     */
    private _createTooltip;
    /**
     * @param {string=} opt_message
     * @return {undefined}
     */
    render(opt_message?: string | undefined): void;
    /**
     * @private
     * @return {undefined}
     */
    private _handleAttributes;
    /**
     * @param {string=} opt_message
     * @return {undefined}
     */
    setMessage(opt_message?: string | undefined): void;
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
    isOpen(): boolean;
    /**
     * @return {undefined}
     */
    toggle(): void;
}
