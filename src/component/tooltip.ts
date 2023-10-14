import { isNull, format } from '../utils/operation';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { generateId } from '../utils/coder';
import { mdl } from '../utils/render';

export class Tooltip {
    element: Knot;
    valid: boolean;
    positionCssClass: string;
    tooltip: Knot;

    constructor(element: Knot, opt_position: string | undefined = 'TOP') {
        this.element = element;
        this.valid = false;
        this._initPositions(opt_position);
        this._init();
    }

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

    private _init(): void {
        this._createTooltip();
    }

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

    render(opt_message?: string | undefined): void {
        const message = this._getMessage(opt_message);
        this.setMessage(message);
        this._handleAttributes();
    }

    private _handleAttributes(): void {
        if (this.valid) {
            this.element.removeAttribute('desc');
            this.element.removeAttribute('title');
            mdl(this.tooltip);
        }
    }

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

    open(): void {
        this.tooltip.addClass('is-active');
    }

    close(): void {
        this.tooltip.removeClass('is-active');
    }

    isOpen(): boolean {
        return this.tooltip.hasClass('is-active');
    }

    toggle(): void {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }
}
