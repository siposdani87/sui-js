import { isNull, format } from '../utils/operation';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { generateId } from '../utils/coder';
import { mdl } from '../utils/render';

/**
 * @description MDL tooltip wrapper with directional positioning (TOP, BOTTOM, LEFT, RIGHT).
 * Reads tooltip text from the element's title or desc attribute.
 *
 * @example
 * const tooltip = new Tooltip(buttonKnot, 'BOTTOM');
 * tooltip.render('Click to submit');
 *
 * @see {@link Table} for table cells that use tooltips for header descriptions
 *
 * @category Component
 */
export class Tooltip {
    element: Knot;
    valid: boolean;
    positionCssClass!: string;
    tooltip!: Knot;

    /**
     * @description Creates a new Tooltip for the given element with directional positioning.
     * @param {Knot} element - The element to attach the tooltip to.
     * @param {string} [opt_position] - Tooltip direction: 'TOP', 'BOTTOM', 'LEFT', or 'RIGHT'.
     */
    constructor(element: Knot, opt_position: string | undefined = 'TOP') {
        this.element = element;
        this.valid = false;
        this._initPositions(opt_position);
        this._init();
    }

    /**
     * @description Maps the position string to the corresponding MDL CSS class.
     * @param {string} [opt_position] - Direction string.
     */
    private _initPositions(opt_position: string | undefined = ''): void {
        this.positionCssClass = 'mdl-tooltip--top';
        switch (opt_position) {
            case 'TOP':
                this.positionCssClass = 'mdl-tooltip--top';
                break;
            case 'BOTTOM':
                this.positionCssClass = 'mdl-tooltip--bottom';
                break;
            case 'LEFT':
                this.positionCssClass = 'mdl-tooltip--left';
                break;
            case 'RIGHT':
                this.positionCssClass = 'mdl-tooltip--right';
                break;
        }
    }

    /**
     * @description Creates the tooltip DOM element.
     */
    private _init(): void {
        this._createTooltip();
    }

    /**
     * @description Resolves the tooltip message from the provided string or the element's desc/title attributes.
     * @param {string} [opt_message] - Explicit message to use.
     * @returns {string} The resolved tooltip message.
     */
    private _getMessage(opt_message: string | undefined = ''): string {
        if (!opt_message) {
            opt_message = this.element.getAttribute('desc') || '';
            if (opt_message) {
                this.tooltip.addClass('mdl-tooltip--large');
            }
            opt_message = this.element.getAttribute('title') || opt_message;
        }
        return opt_message ?? '';
    }

    /**
     * @description Creates the tooltip span element, assigns an ID, and inserts it after the target element.
     */
    private _createTooltip(): void {
        let id = this.element.getId();
        if (isNull(id)) {
            id = generateId('tooltip');
            this.element.setId(id);
            this.element.addClass('has-tooltip');
        }
        const oldElement = new Query(
            format('[for="{0}"]', [id]),
            this.element,
        ).getKnot();
        oldElement.remove();

        const cssClasses = ['mdl-tooltip', this.positionCssClass];
        this.tooltip = new Knot('span');
        this.tooltip.addClass(cssClasses);
        this.tooltip.setFor(id);
        this.valid = this.element.insertAfter(this.tooltip);
    }

    /**
     * @description Renders the tooltip with the given or auto-detected message, and upgrades MDL components.
     * @param {string} [opt_message] - Optional explicit tooltip message.
     *
     * @example
     * tooltip.render('Helpful hint');
     */
    render(opt_message?: string | undefined): void {
        const message = this._getMessage(opt_message);
        this.setMessage(message);
        this._handleAttributes();
    }

    /**
     * @description Removes desc/title attributes from the element and upgrades the MDL tooltip.
     */
    private _handleAttributes(): void {
        if (this.valid) {
            this.element.removeAttribute('desc');
            this.element.removeAttribute('title');
            mdl(this.tooltip);
        }
    }

    /**
     * @description Sets the tooltip message content. Hides the tooltip when message is empty.
     * @param {string} [opt_message] - The message text to display.
     *
     * @example
     * tooltip.setMessage('Updated tooltip text');
     */
    setMessage(opt_message: string | undefined = ''): void {
        if (opt_message) {
            this.tooltip.removeStyle(['display']);
            this.tooltip.setHtml(opt_message);
        } else {
            this.tooltip.setStyle({
                display: 'none',
            });
            this.tooltip.setHtml('');
        }
    }

    /**
     * @description Programmatically opens the tooltip by adding the active CSS class.
     *
     * @example
     * tooltip.open();
     */
    open(): void {
        this.tooltip.addClass('is-active');
    }

    /**
     * @description Programmatically closes the tooltip by removing the active CSS class.
     *
     * @example
     * tooltip.close();
     */
    close(): void {
        this.tooltip.removeClass('is-active');
    }

    /**
     * @description Checks whether the tooltip is currently visible.
     * @returns {boolean} True if the tooltip is active.
     *
     * @example
     * if (tooltip.isOpen()) { tooltip.close(); }
     */
    isOpen(): boolean {
        return this.tooltip.hasClass('is-active');
    }

    /**
     * @description Toggles the tooltip between open and closed states.
     *
     * @example
     * tooltip.toggle();
     */
    toggle(): void {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }
}
