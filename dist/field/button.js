import { mdl } from '../utils/render';
import { BaseField } from './baseField';
/**
 * Generic button with click event support.
 *
 * @description Extends {@link BaseField} to render a Material Design Lite raised
 * accent button. Click events are forwarded through the `eventClick` handler.
 *
 * @example
 * const button = new Button(inputKnot);
 *
 * @see {@link BaseField}
 * @category Field
 */
export class Button extends BaseField {
    /**
     * Creates a new Button instance.
     *
     * @param {Knot<HTMLInputElement>} input The button input element.
     */
    constructor(input) {
        super(input);
        this._init();
    }
    /**
     * Sets the button name attribute.
     */
    _init() {
        this.input.setAttribute('name', 'button');
    }
    /**
     * Renders the button with MDL raised accent classes and attaches the click listener.
     */
    render() {
        this.input.addClass([
            'mdl-button',
            'mdl-js-button',
            'mdl-button--raised',
            'mdl-js-ripple-effect',
            'mdl-button--accent',
        ]);
        this.input.addEventListener('click', (knot) => {
            this.eventClick(knot);
        });
        this.refresh();
    }
    /**
     * Refreshes the MDL button component.
     */
    refresh() {
        mdl(this.input);
    }
}
