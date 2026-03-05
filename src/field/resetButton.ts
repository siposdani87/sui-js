import type { Knot } from '../core';
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
export class ResetButton extends BaseField<HTMLInputElement> {
    /**
     * Creates a new ResetButton instance.
     *
     * @param {Knot<HTMLInputElement>} input The reset button input element.
     */
    constructor(input: Knot<HTMLInputElement>) {
        super(input);
        this._init();
    }

    /**
     * Sets the reset button name attribute.
     */
    private _init(): void {
        this.input.setAttribute('name', 'reset');
    }

    /**
     * Renders the reset button with SUI classes.
     */
    override render(): void {
        this.input.addClass(['sui-button']);
        this.refresh();
    }

    /**
     * Refreshes the reset button component.
     */
    override refresh() {
        sui(this.input);
    }
}
