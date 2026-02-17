import { typeCast } from '../utils/operation';
import { BaseField } from './baseField';
import { Query } from '../core/query';
import { Knot } from '../core/knot';
import { mdl } from '../utils/render';

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
export class BaseCheckboxField extends BaseField<HTMLInputElement> {
    hiddenInput!: Knot;
    spanLabel!: Knot;
    dataLabelKnot!: Knot;

    /**
     * @description Creates a new BaseCheckboxField instance.
     * @param {Knot<HTMLInputElement>} input - The checkbox input element wrapped in a Knot.
     * @param {Knot} label - The label element wrapped in a Knot.
     * @param {Knot} error - The error element wrapped in a Knot.
     * @param {Knot} inputBlock - The input block container wrapped in a Knot.
     */
    constructor(
        input: Knot<HTMLInputElement>,
        label: Knot,
        error: Knot,
        inputBlock: Knot,
    ) {
        super(input, label, error, inputBlock);
        this._init();
    }

    /**
     * @description Initializes the checkbox field by locating the hidden input and binding the change event.
     */
    protected _init(): void {
        this.hiddenInput = new Query(
            'input[type=hidden]',
            this.inputBlock,
        ).getKnot();
        this.inputBlock.addClass('checkbox-field');

        this.input.addEventListener('change', () => {
            this._change();
            return true;
        });
    }

    /**
     * @description Handles the change event by reading the current value and notifying the model.
     */
    protected _change(): void {
        const value = this.getValue();
        this.modelChange(value);
    }

    /**
     * @description Returns the field's value based on the checked state. Returns the input value if checked, or the hidden input value if unchecked.
     * @returns {*} The type-cast value of the checked or hidden input.
     */
    override getValue(): any {
        const checked = this.input.getNode().checked;
        let value = this.hiddenInput.getAttribute('value');
        if (checked) {
            value = this.input.getAttribute('value');
        }
        return typeCast(value);
    }

    /**
     * @description Sets the field's checked state by comparing the value against the input's value attribute.
     * @param {object | Function | Array<any> | boolean | number | string | null | undefined} value - The value to set.
     */
    override setValue(
        value:
            | object
            | Function
            | Array<any>
            | boolean
            | number
            | string
            | null
            | undefined,
    ): void {
        const currentValue = typeCast(this.input.getAttribute('value'));
        this.input.getNode().checked = currentValue === value;
        if (!this.input.getNode().checked) {
            this.input.removeAttribute('checked');
        }
        this.input.trigger('change');
    }

    /**
     * @description Sets the disabled state, updating both the input and the label/input block styling.
     * @param {boolean} state - True to disable the field, false to enable it.
     */
    override setDisabled(state: boolean): void {
        if (state) {
            this.input.setAttribute('disabled');
            this.label.addClass('is-disabled');
            this.inputBlock.addClass('is-disabled');
        } else {
            this.input.removeAttribute('disabled');
            this.label.removeClass('is-disabled');
            this.inputBlock.removeClass('is-disabled');
        }
        this.input.getNode().disabled = state;
        this.checkValidity(true, false);
    }

    /**
     * @description Sets the label text on the span label element instead of the main label.
     * @param {string} text - The new label text.
     */
    override setLabel(text: string): void {
        if (this.spanLabel && !this.spanLabel.isEmpty()) {
            this.spanLabel.setHtml(text);
            this._setAdditionalLabel(this.spanLabel);
        }
    }

    /**
     * @description Refreshes the field's visual state by updating the data label text and MDL styling.
     */
    override refresh() {
        const dataLabelText = this.label.getAttribute('data-label');
        if (dataLabelText) {
            const labelText = this._getLabelRequiredText(dataLabelText);
            this.dataLabelKnot.setHtml(labelText);
        } else {
            this.dataLabelKnot.setHtml('');
        }
        if (this.isDisabled()) {
            this.inputBlock.addClass('is-disabled');
        }

        mdl(this.label, false);
    }
}
