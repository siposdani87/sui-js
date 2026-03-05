import { sui } from '../utils/render';
import { BaseField } from './baseField';
/**
 * Form reset button.
 *
 * @description Extends {@link BaseField} to render a button used for resetting
 * form fields to their default values.
 *
 * @example
 * const resetButton = new ResetButton(inputKnot);
 *
 * @see {@link BaseField}
 * @category Field
 */
export class ResetButton extends BaseField {
    /**
     * Creates a new ResetButton instance.
     *
     * @param {Knot<HTMLInputElement>} input The reset button input element.
     */
    constructor(input) {
        super(input);
        this._init();
    }
    /**
     * Sets the reset button name attribute.
     */
    _init() {
        this.input.setAttribute('name', 'reset');
    }
    /**
     * Renders the reset button with SUI classes.
     */
    render() {
        this.input.addClass(['sui-button']);
        this.refresh();
    }
    /**
     * Refreshes the reset button component.
     */
    refresh() {
        sui(this.input);
    }
}
