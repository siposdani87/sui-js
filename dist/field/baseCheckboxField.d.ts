import { BaseField } from './baseField';
import { Knot } from '../core/knot';
/**
 * @description Base class for checkbox-like fields (checkbox, switch, icon toggle).
 * Extends {@link BaseField} with checked state handling and hidden input support.
 * @category Field
 * @example
 * // Typically extended by concrete checkbox field classes:
 * const checkbox = new CheckboxField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 * checkbox.setValue(true);
 * @see {@link CheckboxField}
 * @see {@link SwitchField}
 * @see {@link IconToggleField}
 */
export declare class BaseCheckboxField extends BaseField<HTMLInputElement> {
    hiddenInput: Knot;
    spanLabel: Knot;
    dataLabelKnot: Knot;
    /**
     * @description Creates a new BaseCheckboxField instance.
     * @param {Knot<HTMLInputElement>} input - The checkbox input element wrapped in a Knot.
     * @param {Knot} label - The label element wrapped in a Knot.
     * @param {Knot} error - The error element wrapped in a Knot.
     * @param {Knot} inputBlock - The input block container wrapped in a Knot.
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * @description Initializes the checkbox field by locating the hidden input and binding the change event.
     */
    protected _init(): void;
    /**
     * @description Handles the change event by reading the current value and notifying the model.
     */
    protected _change(): void;
    /**
     * @description Returns the field's value based on the checked state. Returns the input value if checked, or the hidden input value if unchecked.
     * @returns {*} The type-cast value of the checked or hidden input.
     */
    getValue(): any;
    /**
     * @description Sets the field's checked state by comparing the value against the input's value attribute.
     * @param {object | Function | Array<any> | boolean | number | string | null | undefined} value - The value to set.
     */
    setValue(value: object | Function | Array<any> | boolean | number | string | null | undefined): void;
    /**
     * @description Sets the disabled state, updating both the input and the label/input block styling.
     * @param {boolean} state - True to disable the field, false to enable it.
     */
    setDisabled(state: boolean): void;
    /**
     * @description Sets the label text on the span label element instead of the main label.
     * @param {string} text - The new label text.
     */
    setLabel(text: string): void;
    /**
     * @description Refreshes the field's visual state by updating the data label text and MDL styling.
     */
    refresh(): void;
}
