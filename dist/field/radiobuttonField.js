import { format, typeCast } from '../utils/operation';
import { BaseField } from './baseField';
import { Item } from '../core/item';
import { Query } from '../core/query';
import { mdl } from '../utils/render';
/**
 * @class
 * @extends {BaseField}
 */
export class RadiobuttonField extends BaseField {
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     * @param {!Form} form
     */
    constructor(input, label, error, inputBlock, form) {
        super(input, label, error, inputBlock, form);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
     */
    _change() {
        const value = this.input.getAttribute('value');
        this.modelChange(value);
        const name = this.input.getAttribute('name');
        const radioButtonInputs = new Query(format('input[name="{0}"]', [name]), this.form.formNode);
        radioButtonInputs.each((radioButtonInput) => {
            const labelNode = radioButtonInput.getParentNode();
            labelNode.addClass('is-other-checked');
            const inputBlockNode = labelNode.getParentNode();
            inputBlockNode.removeClass('is-invalid');
        });
    }
    /**
     * @override
     * @return {undefined}
     */
    render() {
        this.label.addClass([
            'mdl-radio',
            'mdl-js-radio',
            'mdl-js-ripple-effect',
        ]);
        const id = this.input.getId();
        this.label.setFor(/** @type {string} */ id);
        const labelText = this.label.getHtml(true);
        const spanLabel = new Item('span');
        spanLabel.addClass('mdl-radio__label');
        spanLabel.setHtml(labelText);
        this.input.addClass('mdl-radio__button');
        this.label.insert(this.input);
        this.label.appendChild(spanLabel);
        this.dataLabelNode = new Item('span');
        this.dataLabelNode.addClass('field-label');
        this.label.insertBefore(this.dataLabelNode);
        this.refresh();
    }
    /**
     * @override
     */
    refresh() {
        const dataLabelText = 
        /** @type {string} */ this.label.getAttribute('data-label');
        if (dataLabelText) {
            const labelText = this._getLabelRequiredText(dataLabelText);
            this.dataLabelNode.setHtml(labelText);
        }
        else {
            this.dataLabelNode.setHtml('');
        }
        if (this.isDisabled()) {
            this.inputBlock.addClass('is-disabled');
        }
        mdl(this.label, false);
    }
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value) {
        if (this.input.getAttribute('value') === value) {
            this.input.getNode().checked = true;
            this.input.trigger('change');
        }
    }
    /**
     * @override
     * @return {*}
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
     * @override
     * @param {boolean} state
     * @return {undefined}
     */
    setDisabled(state) {
        this._getRadioButtonInputs().each((radioButtonInput) => {
            if (state) {
                radioButtonInput.setAttribute('disabled');
                radioButtonInput.getParentNode().addClass('is-disabled');
                radioButtonInput
                    .getParentNode()
                    .getParentNode()
                    .addClass('is-disabled');
            }
            else {
                radioButtonInput.removeAttribute('disabled');
                radioButtonInput.getParentNode().removeClass('is-disabled');
                radioButtonInput
                    .getParentNode()
                    .getParentNode()
                    .removeClass('is-disabled');
            }
            radioButtonInput.getNode().disabled = state;
        });
        this.checkValidity(true, false);
    }
    /**
     * @override
     * @return {boolean}
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
     * @return {!Query}
     */
    _getRadioButtonInputs() {
        const name = this.input.getAttribute('name');
        return new Query(format('input[name="{0}"]', [name]), this.form.formNode);
    }
    /**
     * @override
     * @param {string} text
     * @return {undefined}
     */
    setLabel(text) {
        if (this.spanLabel && !this.spanLabel.isEmpty()) {
            this.spanLabel.setHtml(text);
            this._setAdditionalLabel(this.spanLabel);
        }
    }
}
