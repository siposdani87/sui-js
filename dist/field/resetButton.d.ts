import type { Knot } from '../core';
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
export declare class ResetButton extends BaseField<HTMLInputElement> {
    /**
     * Creates a new ResetButton instance.
     *
     * @param {Knot<HTMLInputElement>} input The reset button input element.
     */
    constructor(input: Knot<HTMLInputElement>);
    /**
     * Sets the reset button name attribute.
     */
    private _init;
    /**
     * Renders the reset button with SUI classes.
     */
    render(): void;
    /**
     * Refreshes the reset button component.
     */
    refresh(): void;
}
