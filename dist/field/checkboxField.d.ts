import { BaseCheckboxField } from './baseCheckboxField';
/**
 * SUI checkbox field with label and data label display.
 *
 * @description Extends {@link BaseCheckboxField} to render a SUI
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
     * Renders the checkbox with SUI classes, label span, and data label element.
     */
    render(): void;
}
