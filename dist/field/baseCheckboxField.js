import { typeCast, mdl } from '../utils/operation';
import { BaseField } from './baseField';
import { Query } from '../core/query';
/**
 * @class
 * @extends {BaseField}
 */
export class BaseCheckboxField extends BaseField {
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
        this._init();
    }
    /**
     * @protected
     * @return {undefined}
     */
    _init() {
        this.hiddenInput = new Query('input[type=hidden]', this.inputBlock).getItem();
        this.inputBlock.addClass('checkbox-field');
        this.input.addEventListener('change', () => {
            this._change();
            return true;
        });
    }
    /**
     * @protected
     * @return {undefined}
     */
    _change() {
        const value = this.getValue();
        this.modelChange(value);
    }
    /**
     * @override
     * @return {*}
     */
    getValue() {
        const checked = this.input.getNode().checked;
        let value = this.hiddenInput.getAttribute('value');
        if (checked) {
            value = this.input.getAttribute('value');
        }
        return typeCast(value);
    }
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value) {
        const currentValue = typeCast(this.input.getAttribute('value'));
        this.input.getNode().checked = currentValue === value;
        if (!this.input.getNode().checked) {
            this.input.removeAttribute('checked');
        }
        this.input.trigger('change');
    }
    /**
     * @override
     * @param {boolean} state
     * @return {undefined}
     */
    setDisabled(state) {
        if (state) {
            this.input.setAttribute('disabled');
            this.label.addClass('is-disabled');
            this.inputBlock.addClass('is-disabled');
        }
        else {
            this.input.removeAttribute('disabled');
            this.label.removeClass('is-disabled');
            this.inputBlock.removeClass('is-disabled');
        }
        this.input.getNode().disabled = state;
        this.checkValidity(true, false);
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
    /**
     * @override
     */
    refresh() {
        const dataLabelText = 
        /** @type {string} */ (this).label.getAttribute('data-label');
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
}
