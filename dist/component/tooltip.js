import { isNull, format } from '../utils/operation';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { generateId } from '../utils/coder';
import { mdl } from '../utils/render';
/**
 * https://www.getmdl.io/components/index.html#tooltips-section
 * @class
 */
export class Tooltip {
    /**
     * @param {!Knot} element
     * @param {string=} opt_position TOP|BOTTOM|LEFT|RIGHT
     */
    constructor(element, opt_position = 'TOP') {
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
    _initPositions(opt_position = '') {
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
    _init() {
        this._createTooltip();
    }
    /**
     * @param {string=} opt_message
     * @return {string}
     */
    _getMessage(opt_message = '') {
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
    _createTooltip() {
        let id = this.element.getId();
        if (isNull(id)) {
            id = generateId('tooltip');
            this.element.setId(id);
            this.element.addClass('has-tooltip');
        }
        const oldElement = new Query(format('[for="{0}"]', [id]), this.element).getKnot();
        oldElement.remove();
        const cssClasses = ['mdl-tooltip', this.positionCssClass];
        this.tooltip = new Knot('span');
        this.tooltip.addClass(cssClasses);
        this.tooltip.setFor(id);
        this.valid = this.element.insertAfter(this.tooltip);
    }
    /**
     * @param {string=} opt_message
     * @return {undefined}
     */
    render(opt_message) {
        const message = this._getMessage(opt_message);
        this.setMessage(message);
        this._handleAttributes();
    }
    /**
     * @private
     * @return {undefined}
     */
    _handleAttributes() {
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
    setMessage(opt_message = '') {
        if (opt_message) {
            this.tooltip.removeStyle(['display']);
            this.tooltip.setHtml(opt_message);
        }
        else {
            this.tooltip.setStyle({
                display: 'none',
            });
            this.tooltip.setHtml('');
        }
    }
    /**
     * @return {undefined}
     */
    open() {
        this.tooltip.addClass('is-active');
    }
    /**
     * @return {undefined}
     */
    close() {
        this.tooltip.removeClass('is-active');
    }
    /**
     * @return {boolean}
     */
    isOpen() {
        return this.tooltip.hasClass('is-active');
    }
    /**
     * @return {undefined}
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
}
