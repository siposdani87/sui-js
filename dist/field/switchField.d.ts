import { BaseCheckboxField } from './baseCheckboxField';
/**
 * SUI switch toggle field.
 *
 * @description Extends {@link BaseCheckboxField} to render a SUI
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
     * Renders the switch with SUI classes, label span, and data label element.
     */
    render(): void;
}
