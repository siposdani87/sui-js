import { BaseField } from './baseField';
import { Knot } from '../core/knot';
/**
 * @description Numeric input field with step up/down buttons and min/max value constraints.
 *
 * @example
 * const numberField = new NumberField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 * numberField.render();
 *
 * @see {@link BaseField}
 *
 * @category Field
 */
export declare class NumberField extends BaseField<HTMLInputElement> {
    /**
     * @description Creates a new NumberField instance.
     * @param {Knot<HTMLInputElement>} input - The numeric input element.
     * @param {Knot} label - The label element.
     * @param {Knot} error - The error message element.
     * @param {Knot} inputBlock - The container block element.
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * @description Initializes the field by adding CSS class, step buttons, and input event listeners.
     */
    private _init;
    /**
     * @description Creates step up and step down buttons in the action container.
     */
    private _initButtons;
    /**
     * @description Clamps the current value within the min/max bounds.
     */
    private _checkValue;
    /**
     * @description Returns the max attribute value or the default maximum (9999999999).
     * @returns {number}
     */
    private _getMax;
    /**
     * @description Returns the min attribute value or the default minimum (0).
     * @returns {number}
     */
    private _getMin;
    /**
     * @description Returns the step attribute value or the default step (1).
     * @returns {number}
     */
    private _getStep;
    /**
     * @description Applies MDL textfield classes to the input block, input, and label, then refreshes.
     * @override
     */
    render(): void;
    /**
     * @description Marks the field as invalid when required and empty, then upgrades MDL components.
     * @override
     */
    refresh(): void;
}
