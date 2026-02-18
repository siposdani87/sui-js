import { BaseField } from './baseField';
import { Knot } from '../core/knot';
import { Form } from '../component';
/**
 * @description Radio button group field with MDL styling. Manages a set of radio inputs sharing the same name,
 * handling checked state, disabled state, and label rendering across all buttons in the group.
 *
 * @example
 * const radioField = new RadiobuttonField(inputKnot, labelKnot, errorKnot, inputBlockKnot, form);
 * radioField.render();
 *
 * @see {@link BaseField}
 * @see {@link Form}
 *
 * @category Field
 */
export declare class RadiobuttonField extends BaseField<HTMLInputElement> {
    dataLabelKnot: Knot;
    spanLabel: Knot;
    /**
     * @description Creates a new RadiobuttonField instance.
     * @param {Knot<HTMLInputElement>} input - The radio input element.
     * @param {Knot} label - The label element.
     * @param {Knot} error - The error message element.
     * @param {Knot} inputBlock - The container block element.
     * @param {Form} form - The parent form instance used to query sibling radio inputs.
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot, form: Form);
    /**
     * @description Initializes the field by adding CSS class and attaching the change event listener.
     */
    private _init;
    /**
     * @description Handles radio button selection by notifying the model and marking sibling inputs as other-checked.
     */
    private _change;
    /**
     * @description Builds the MDL radio button layout with label, icon, and data-label elements.
     * @override
     */
    render(): void;
    /**
     * @description Updates the data-label text, manages the disabled state, and upgrades MDL components.
     * @override
     */
    refresh(): void;
    /**
     * @description Checks the radio button whose value attribute matches the given value and triggers a change event.
     * @param {object | Array<unknown> | boolean | number | string | null | undefined} value - The value to select.
     * @override
     */
    setValue(value: object | Array<unknown> | boolean | number | string | null | undefined): void;
    /**
     * @description Returns the value of the currently checked radio button in the group, or null if none is selected.
     * @returns {any} The type-cast value of the checked radio button.
     * @override
     */
    getValue(): any;
    /**
     * @description Sets the disabled state on all radio buttons in the group and their parent elements.
     * @param {boolean} state - True to disable, false to enable.
     * @override
     */
    setDisabled(state: boolean): void;
    /**
     * @description Returns true if any radio button in the group is disabled.
     * @returns {boolean}
     * @override
     */
    isDisabled(): boolean;
    /**
     * @description Queries the parent form for all radio inputs sharing the same name attribute.
     * @returns {Query<HTMLInputElement>}
     */
    private _getRadioButtonInputs;
    /**
     * @description Updates the span label text for this radio button option.
     * @param {string} text - The new label text.
     * @override
     */
    setLabel(text: string): void;
}
