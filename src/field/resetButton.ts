import { Knot } from '../core';
import { mdl } from '../utils/render';
import { BaseField } from './baseField';

/**
 * Form reset button with MDL styling.
 *
 * @description Extends {@link BaseField} to render a Material Design Lite button
 * used for resetting form fields to their default values.
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
     * Renders the reset button with MDL classes.
     */
    override render(): void {
        this.input.addClass([
            'mdl-button',
            'mdl-js-button',
            'mdl-js-ripple-effect',
        ]);
        this.refresh();
    }

    /**
     * Refreshes the MDL reset button component.
     */
    override refresh() {
        mdl(this.input);
    }
}
