import { Item } from '../core/item';
/**
 * https://www.getmdl.io/components/index.html#tooltips-section
 * @class
 */
export declare class Tooltip {
    element: Item;
    valid: boolean;
    positionCssClass: string;
    tooltip: Item;
    /**
     * @param {!Item} element
     * @param {string=} opt_position TOP|BOTTOM|LEFT|RIGHT
     */
    constructor(element: Item, opt_position?: string | undefined);
    /**
     * @private
     * @param {string=} opt_position
     * @return {undefined}
     */
    _initPositions(opt_position?: string | undefined): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @param {string=} opt_message
     * @return {string}
     */
    _getMessage(opt_message?: string | undefined): string;
    /**
     * @private
     * @return {undefined}
     */
    _createTooltip(): void;
    /**
     * @param {string=} opt_message
     * @return {undefined}
     */
    render(opt_message?: string | undefined): void;
    /**
     * @private
     * @return {undefined}
     */
    _handleAttributes(): void;
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
