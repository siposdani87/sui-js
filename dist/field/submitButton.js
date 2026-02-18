import { mdl } from '../utils/render';
import { BaseField } from './baseField';
/**
 * Form submit button with MDL primary styling.
 *
 * @description Extends {@link BaseField} to render a Material Design Lite raised
 * primary button used for form submission.
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
     * Renders the submit button with MDL raised primary classes.
     */
    render() {
        this.input.addClass([
            'mdl-button',
            'mdl-js-button',
            'mdl-button--raised',
            'mdl-js-ripple-effect',
            'mdl-button--primary',
        ]);
        this.refresh();
    }
    /**
     * Refreshes the MDL submit button component.
     */
    refresh() {
        mdl(this.input);
    }
}
