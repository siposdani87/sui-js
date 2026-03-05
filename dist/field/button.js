import { sui } from '../utils/render';
import { BaseField } from './baseField';
/**
 * Generic button with click event support.
 *
 * @description Extends {@link BaseField} to render a raised accent button. Click events are forwarded through the `eventClick` handler.
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
     * Renders the button with raised accent classes and attaches the click listener.
     */
    render() {
        this.input.addClass([
            'sui-button',
            'sui-button--raised',
            'sui-button--accent',
        ]);
        this.input.addEventListener('click', (knot) => {
            this.eventClick(knot);
        });
        this.refresh();
    }
    /**
     * Refreshes the button component.
     */
    refresh() {
        sui(this.input);
    }
}
