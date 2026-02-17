import { format, typeCast } from '../utils/operation';
import { BaseField } from './baseField';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { mdl } from '../utils/render';
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
export class RadiobuttonField extends BaseField {
    /**
     * @description Creates a new RadiobuttonField instance.
     * @param {Knot<HTMLInputElement>} input - The radio input element.
     * @param {Knot} label - The label element.
     * @param {Knot} error - The error message element.
     * @param {Knot} inputBlock - The container block element.
     * @param {Form} form - The parent form instance used to query sibling radio inputs.
     */
    constructor(input, label, error, inputBlock, form) {
        super(input, label, error, inputBlock, form);
        this._init();
    }
    /**
     * @description Initializes the field by adding CSS class and attaching the change event listener.
     */
    _init() {
        this.inputBlock.addClass('radiobutton-field');
        /* this.label.addEventListener('click', () => {
        this._change();
    });*/
        this.input.addEventListener('change', () => {
            this._change();
            return true;
        });
    }
    /**
     * @description Handles radio button selection by notifying the model and marking sibling inputs as other-checked.
     */
    _change() {
        const value = this.input.getAttribute('value');
        this.modelChange(value);
        const name = this.input.getAttribute('name');
        const radioButtonInputs = new Query(format('input[name="{0}"]', [name]), this.form.formKnot);
        radioButtonInputs.each((radioButtonInput) => {
            const labelKnot = radioButtonInput.getParentKnot();
            labelKnot.addClass('is-other-checked');
            const inputBlockKnot = labelKnot.getParentKnot();
            inputBlockKnot.removeClass('is-invalid');
        });
    }
    /**
     * @description Builds the MDL radio button layout with label, icon, and data-label elements.
     * @override
     */
    render() {
        this.label.addClass([
            'mdl-radio',
            'mdl-js-radio',
            'mdl-js-ripple-effect',
        ]);
        const id = this.input.getId();
        this.label.setFor(id);
        const labelText = this.label.getHtml(true);
        const spanLabel = new Knot('span');
        spanLabel.addClass('mdl-radio__label');
        spanLabel.setHtml(labelText);
        this.input.addClass('mdl-radio__button');
        this.label.insert(this.input);
        this.label.appendChild(spanLabel);
        this.dataLabelKnot = new Knot('span');
        this.dataLabelKnot.addClass('field-label');
        this.label.insertBefore(this.dataLabelKnot);
        this.refresh();
    }
    /**
     * @description Updates the data-label text, manages the disabled state, and upgrades MDL components.
     * @override
     */
    refresh() {
        const dataLabelText = this.label.getAttribute('data-label');
        if (dataLabelText) {
            const labelText = this._getLabelRequiredText(dataLabelText);
            this.dataLabelKnot.setHtml(labelText);
        }
        else {
            this.dataLabelKnot.setHtml('');
        }
        if (this.isDisabled()) {
            this.inputBlock.addClass('is-disabled');
        }
        mdl(this.label, false);
    }
    /**
     * @description Checks the radio button whose value attribute matches the given value and triggers a change event.
     * @param {object | Function | Array<any> | boolean | number | string | null | undefined} value - The value to select.
     * @override
     */
    setValue(value) {
        if (this.input.getAttribute('value') === value) {
            this.input.getNode().checked = true;
            this.input.trigger('change');
        }
    }
    /**
     * @description Returns the value of the currently checked radio button in the group, or null if none is selected.
     * @returns {any} The type-cast value of the checked radio button.
     * @override
     */
    getValue() {
        let value = null;
        this._getRadioButtonInputs().each((radioButtonInput) => {
            const checked = radioButtonInput.getNode().checked;
            if (checked) {
                value = radioButtonInput.getAttribute('value');
            }
        });
        return typeCast(value);
    }
    /**
     * @description Sets the disabled state on all radio buttons in the group and their parent elements.
     * @param {boolean} state - True to disable, false to enable.
     * @override
     */
    setDisabled(state) {
        this._getRadioButtonInputs().each((radioButtonInput) => {
            if (state) {
                radioButtonInput.setAttribute('disabled');
                radioButtonInput.getParentKnot().addClass('is-disabled');
                radioButtonInput
                    .getParentKnot()
                    .getParentKnot()
                    .addClass('is-disabled');
            }
            else {
                radioButtonInput.removeAttribute('disabled');
                radioButtonInput.getParentKnot().removeClass('is-disabled');
                radioButtonInput
                    .getParentKnot()
                    .getParentKnot()
                    .removeClass('is-disabled');
            }
            radioButtonInput.getNode().disabled = state;
        });
        this.checkValidity(true, false);
    }
    /**
     * @description Returns true if any radio button in the group is disabled.
     * @returns {boolean}
     * @override
     */
    isDisabled() {
        let isDisabled = false;
        this._getRadioButtonInputs().each((radioButtonInput) => {
            if (radioButtonInput.getNode().disabled) {
                isDisabled = true;
            }
        });
        return isDisabled;
    }
    /**
     * @description Queries the parent form for all radio inputs sharing the same name attribute.
     * @returns {Query<HTMLInputElement>}
     */
    _getRadioButtonInputs() {
        const name = this.input.getAttribute('name');
        return new Query(format('input[name="{0}"]', [name]), this.form.formKnot);
    }
    /**
     * @description Updates the span label text for this radio button option.
     * @param {string} text - The new label text.
     * @override
     */
    setLabel(text) {
        if (this.spanLabel && !this.spanLabel.isEmpty()) {
            this.spanLabel.setHtml(text);
            this._setAdditionalLabel(this.spanLabel);
        }
    }
}
