import { format, typeCast } from '../utils/operation';
import { BaseField } from './baseField';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { mdl } from '../utils/render';
export class RadiobuttonField extends BaseField {
    constructor(input, label, error, inputBlock, form) {
        super(input, label, error, inputBlock, form);
        this._init();
    }
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
    setValue(value) {
        if (this.input.getAttribute('value') === value) {
            this.input.getNode().checked = true;
            this.input.trigger('change');
        }
    }
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
    isDisabled() {
        let isDisabled = false;
        this._getRadioButtonInputs().each((radioButtonInput) => {
            if (radioButtonInput.getNode().disabled) {
                isDisabled = true;
            }
        });
        return isDisabled;
    }
    _getRadioButtonInputs() {
        const name = this.input.getAttribute('name');
        return new Query(format('input[name="{0}"]', [name]), this.form.formKnot);
    }
    setLabel(text) {
        if (this.spanLabel && !this.spanLabel.isEmpty()) {
            this.spanLabel.setHtml(text);
            this._setAdditionalLabel(this.spanLabel);
        }
    }
}
