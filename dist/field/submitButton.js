import { sui } from '../utils/render';
import { BaseField } from './baseField';
/**
 * Form submit button with primary styling.
 *
 * @description Extends {@link BaseField} to render a raised primary button
 * used for form submission.
 *
 * @example
 * const submitButton = new SubmitButton(inputKnot);
 *
 * @see {@link BaseField}
 * @category Field
 */
export class SubmitButton extends BaseField {
    /**
     * Creates a new SubmitButton instance.
     *
     * @param {Knot<HTMLInputElement>} input The submit button input element.
     */
    constructor(input) {
        super(input);
        this._init();
    }
    /**
     * Sets the submit button name attribute.
     */
    _init() {
        this.input.setAttribute('name', 'submit');
    }
    /**
     * Renders the submit button with raised primary classes.
     */
    render() {
        this.input.addClass([
            'sui-button',
            'sui-button--raised',
            'sui-button--primary',
        ]);
        this.refresh();
    }
    /**
     * Refreshes the submit button component.
     */
    refresh() {
        sui(this.input);
    }
}
