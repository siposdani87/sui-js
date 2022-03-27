import { isNull, format } from '../utils/operation';
import { Item } from '../core/item';
import { Query } from '../core/query';
import { generateId } from '../utils/coder';
import { mdl } from '../utils/render';

/**
 * https://www.getmdl.io/components/index.html#tooltips-section
 * @class
 */
export class Tooltip {
    element: Item;
    valid: boolean;
    positionCssClass: string;
    tooltip: Item;
    /**
     * @param {!Item} element
     * @param {string=} opt_position TOP|BOTTOM|LEFT|RIGHT
     */
    constructor(element: Item, opt_position: string | undefined = 'TOP') {
        this.element = element;
        this.valid = false;
        this._initPositions(opt_position);
        this._init();
    }
    /**
     * @private
     * @param {string=} opt_position
     * @return {undefined}
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
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this._createTooltip();
    }
    /**
     * @param {string=} opt_message
     * @return {string}
     */
    private _getMessage(opt_message: string | undefined = ''): string {
        if (!opt_message) {
            opt_message = this.element.getAttribute('desc') || '';
            if (opt_message) {
                this.tooltip.addClass('mdl-tooltip--large');
            }
            opt_message = this.element.getAttribute('title') || opt_message;
        }
        return opt_message;
    }
    /**
     * @private
     * @return {undefined}
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
        ).getItem();
        oldElement.remove();

        const cssClasses = ['mdl-tooltip', this.positionCssClass];
        this.tooltip = new Item('span');
        this.tooltip.addClass(cssClasses);
        this.tooltip.setFor(id);
        this.valid = this.element.insertAfter(this.tooltip);
    }
    /**
     * @param {string=} opt_message
     * @return {undefined}
     */
    render(opt_message?: string | undefined): void {
        const message = this._getMessage(opt_message);
        this.setMessage(message);
        this._handleAttributes();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _handleAttributes(): void {
        if (this.valid) {
            this.element.removeAttribute('desc');
            this.element.removeAttribute('title');
            mdl(this.tooltip);
        }
    }
    /**
     * @param {string=} opt_message
     * @return {undefined}
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
     * @return {undefined}
     */
    open(): void {
        this.tooltip.addClass('is-active');
    }
    /**
     * @return {undefined}
     */
    close(): void {
        this.tooltip.removeClass('is-active');
    }
    /**
     * @return {boolean}
     */
    isOpen(): boolean {
        return this.tooltip.hasClass('is-active');
    }
    /**
     * @return {undefined}
     */
    toggle(): void {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }
}
