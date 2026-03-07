import type { Knot } from '../core';
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
export declare class SubmitButton extends BaseField<HTMLInputElement> {
    /**
     * Creates a new SubmitButton instance.
     *
     * @param {Knot<HTMLInputElement>} input The submit button input element.
     */
    constructor(input: Knot<HTMLInputElement>);
    /**
     * Sets the submit button name attribute.
     */
    protected _init(): void;
    /**
     * Renders the submit button with raised primary classes.
     */
    render(): void;
    /**
     * Refreshes the submit button component.
     */
    refresh(): void;
}
