import { Knot } from '../core';
import { BaseField } from './baseField';
/**
 * @description Standard text input field with Material Design Lite styling.
 * Extends {@link BaseField} with keyup and change event handling.
 * @category Field
 * @example
 * const textField = new TextField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 * textField.render();
 * textField.setValue('Hello world');
 * @see {@link BaseField}
 */
export declare class TextField extends BaseField<HTMLInputElement> {
    /**
     * @description Creates a new TextField instance.
     * @param {Knot<HTMLInputElement>} input - The text input element wrapped in a Knot.
     * @param {Knot} label - The label element wrapped in a Knot.
     * @param {Knot} error - The error element wrapped in a Knot.
     * @param {Knot} inputBlock - The input block container wrapped in a Knot.
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * @description Initializes the text field by adding the CSS class and binding keyup and change events.
     */
    private _init;
    /**
     * @description Renders the text field by applying MDL text field classes to the input block, input, and label.
     */
    render(): void;
    /**
     * @description Refreshes the text field by updating the invalid state and re-applying MDL upgrades.
     */
    refresh(): void;
    /**
     * @description Returns the raw string value of the input element without type-casting.
     * @returns {*} The input element's current value.
     */
    getValue(): any;
}
