import { typeCast } from '../utils/operation';
import { BaseField } from './baseField';
import { Query } from '../core/query';
import { mdl } from '../utils/render';
export class BaseCheckboxField extends BaseField {
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
        this._init();
    }
    _init() {
        this.hiddenInput = new Query('input[type=hidden]', this.inputBlock).getKnot();
        this.inputBlock.addClass('checkbox-field');
        this.input.addEventListener('change', () => {
            this._change();
            return true;
        });
    }
    _change() {
        const value = this.getValue();
        this.modelChange(value);
    }
    getValue() {
        const checked = this.input.getNode().checked;
        let value = this.hiddenInput.getAttribute('value');
        if (checked) {
            value = this.input.getAttribute('value');
        }
        return typeCast(value);
    }
    setValue(value) {
        const currentValue = typeCast(this.input.getAttribute('value'));
        this.input.getNode().checked = currentValue === value;
        if (!this.input.getNode().checked) {
            this.input.removeAttribute('checked');
        }
        this.input.trigger('change');
    }
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
    setLabel(text) {
        if (this.spanLabel && !this.spanLabel.isEmpty()) {
            this.spanLabel.setHtml(text);
            this._setAdditionalLabel(this.spanLabel);
        }
    }
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
}
