import { format, typeCast } from '../utils/operation';
import { BaseField } from './baseField';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { Form } from '../component';
import { mdl } from '../utils/render';

export class RadiobuttonField extends BaseField<HTMLInputElement> {
    dataLabelKnot: Knot;
    spanLabel: Knot;

    constructor(
        input: Knot<HTMLInputElement>,
        label: Knot,
        error: Knot,
        inputBlock: Knot,
        form: Form,
    ) {
        super(input, label, error, inputBlock, form);
        this._init();
    }

    private _init(): void {
        this.inputBlock.addClass('radiobutton-field');

        /* this.label.addEventListener('click', () => {
        this._change();
    });*/
        this.input.addEventListener('change', () => {
            this._change();
            return true;
        });
    }

    private _change(): void {
        const value = this.input.getAttribute('value');
        this.modelChange(value);

        const name = this.input.getAttribute('name');
        const radioButtonInputs = new Query(
            format('input[name="{0}"]', [name]),
            this.form.formKnot,
        );
        radioButtonInputs.each((radioButtonInput) => {
            const labelKnot = radioButtonInput.getParentKnot();
            labelKnot.addClass('is-other-checked');
            const inputBlockKnot = labelKnot.getParentKnot();
            inputBlockKnot.removeClass('is-invalid');
        });
    }

    render(): void {
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
        } else {
            this.dataLabelKnot.setHtml('');
        }
        if (this.isDisabled()) {
            this.inputBlock.addClass('is-disabled');
        }

        mdl(this.label, false);
    }

    setValue(
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
        if (this.input.getAttribute('value') === value) {
            this.input.getNode().checked = true;
            this.input.trigger('change');
        }
    }

    getValue(): any {
        let value = null;
        this._getRadioButtonInputs().each((radioButtonInput) => {
            const checked = radioButtonInput.getNode().checked;
            if (checked) {
                value = radioButtonInput.getAttribute('value');
            }
        });
        return typeCast(value);
    }

    setDisabled(state: boolean): void {
        this._getRadioButtonInputs().each((radioButtonInput) => {
            if (state) {
                radioButtonInput.setAttribute('disabled');
                radioButtonInput.getParentKnot().addClass('is-disabled');
                radioButtonInput
                    .getParentKnot()
                    .getParentKnot()
                    .addClass('is-disabled');
            } else {
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

    isDisabled(): boolean {
        let isDisabled = false;
        this._getRadioButtonInputs().each((radioButtonInput) => {
            if (radioButtonInput.getNode().disabled) {
                isDisabled = true;
            }
        });
        return isDisabled;
    }

    private _getRadioButtonInputs(): Query<HTMLInputElement> {
        const name = this.input.getAttribute('name');
        return new Query<HTMLInputElement>(
            format('input[name="{0}"]', [name]),
            this.form.formKnot,
        );
    }

    setLabel(text: string): void {
        if (this.spanLabel && !this.spanLabel.isEmpty()) {
            this.spanLabel.setHtml(text);
            this._setAdditionalLabel(this.spanLabel);
        }
    }
}
