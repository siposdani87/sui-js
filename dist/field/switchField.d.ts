import { Knot } from '../core/knot';
import { BaseCheckboxField } from './baseCheckboxField';
/**
 * MDL switch toggle field.
 *
 * @description Extends {@link BaseCheckboxField} to render a Material Design Lite
 * switch toggle with a span label and data label element.
 *
 * @example
 * const switchField = new SwitchField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 *
 * @see {@link BaseCheckboxField}
 * @category Field
 */
export declare class SwitchField extends BaseCheckboxField {
    /**
     * Creates a new SwitchField instance.
     *
     * @param {Knot<HTMLInputElement>} input The switch input element.
     * @param {Knot} label The label element associated with the switch.
     * @param {Knot} error The error message element.
     * @param {Knot} inputBlock The container block for the input.
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * Renders the switch with MDL classes, label span, and data label element.
     */
    render(): void;
}
