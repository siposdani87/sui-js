import type { Knot } from '../core';
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
export class SubmitButton extends BaseField<HTMLInputElement> {
    /**
     * Creates a new SubmitButton instance.
     *
     * @param {Knot<HTMLInputElement>} input The submit button input element.
     */
    constructor(input: Knot<HTMLInputElement>) {
        super(input);
    }

    /**
     * Sets the submit button name attribute.
     */
    protected override _init(): void {
        this.input.setAttribute('name', 'submit');
    }

    /**
     * Renders the submit button with raised primary classes.
     */
    override render(): void {
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
    override refresh() {
        sui(this.input);
    }
}
