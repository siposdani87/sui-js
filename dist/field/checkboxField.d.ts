import { Knot } from '../core/knot';
import { BaseCheckboxField } from './baseCheckboxField';
/**
 * MDL checkbox field with label and data label display.
 *
 * @description Extends {@link BaseCheckboxField} to render a Material Design Lite
 * checkbox input with a span label and a separate data label element.
 *
 * @example
 * const checkboxField = new CheckboxField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 *
 * @see {@link BaseCheckboxField}
 * @category Field
 */
export declare class CheckboxField extends BaseCheckboxField {
    /**
     * Creates a new CheckboxField instance.
     *
     * @param {Knot<HTMLInputElement>} input The checkbox input element.
     * @param {Knot} label The label element associated with the checkbox.
     * @param {Knot} error The error message element.
     * @param {Knot} inputBlock The container block for the input.
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * Renders the checkbox with MDL classes, label span, and data label element.
     */
    render(): void;
}
