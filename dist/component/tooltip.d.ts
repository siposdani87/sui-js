import { Knot } from '../core/knot';
/**
 * @description SUI tooltip with directional positioning (TOP, BOTTOM, LEFT, RIGHT).
 * Reads tooltip text from the element's title or desc attribute.
 * Handles show/hide on mouseenter/mouseleave with CSS positioning.
 *
 * @example
 * const tooltip = new Tooltip(buttonKnot, 'BOTTOM');
 * tooltip.render('Click to submit');
 *
 * @see {@link Table} for table cells that use tooltips for header descriptions
 *
 * @category Component
 */
export declare class Tooltip {
    element: Knot;
    valid: boolean;
    positionCssClass: string;
    tooltip: Knot;
    private _position;
    /**
     * @description Creates a new Tooltip for the given element with directional positioning.
     * @param {Knot} element - The element to attach the tooltip to.
     * @param {string} [opt_position] - Tooltip direction: 'TOP', 'BOTTOM', 'LEFT', or 'RIGHT'.
     */
    constructor(element: Knot, opt_position?: string | undefined);
    /**
     * @description Maps the position string to the corresponding SUI CSS class.
     * @param {string} [opt_position] - Direction string.
     */
    private _initPositions;
    /**
     * @description Creates the tooltip DOM element.
     */
    private _init;
    /**
     * @description Resolves the tooltip message from the provided string or the element's desc/title attributes.
     * @param {string} [opt_message] - Explicit message to use.
     * @returns {string} The resolved tooltip message.
     */
    private _getMessage;
    /**
     * @description Creates the tooltip span element, assigns an ID, and inserts it after the target element.
     */
    private _createTooltip;
    /**
     * @description Renders the tooltip with the given or auto-detected message, and binds hover events.
     * @param {string} [opt_message] - Optional explicit tooltip message.
     *
     * @example
     * tooltip.render('Helpful hint');
     */
    render(opt_message?: string | undefined): void;
    /**
     * @description Removes desc/title attributes from the element and binds hover events for show/hide.
     */
    private _handleAttributes;
    /**
     * @description Binds mouseenter/mouseleave events on the target element to show/hide the tooltip.
     */
    private _bindHoverEvents;
    /**
     * @description Sets the tooltip message content. Hides the tooltip when message is empty.
     * @param {string} [opt_message] - The message text to display.
     *
     * @example
     * tooltip.setMessage('Updated tooltip text');
     */
    setMessage(opt_message?: string | undefined): void;
    /**
     * @description Calculates and applies the tooltip position relative to the target element.
     */
    private _updatePosition;
    /**
     * @description Programmatically opens the tooltip by adding the active CSS class.
     *
     * @example
     * tooltip.open();
     */
    open(): void;
    /**
     * @description Programmatically closes the tooltip by removing the active CSS class.
     *
     * @example
     * tooltip.close();
     */
    close(): void;
    /**
     * @description Checks whether the tooltip is currently visible.
     * @returns {boolean} True if the tooltip is active.
     *
     * @example
     * if (tooltip.isOpen()) { tooltip.close(); }
     */
    isOpen(): boolean;
    /**
     * @description Toggles the tooltip between open and closed states.
     *
     * @example
     * tooltip.toggle();
     */
    toggle(): void;
}
