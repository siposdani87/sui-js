import { format, typeCast } from '../utils/operation';
import { BaseField } from './baseField';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { Form } from '../component';
import { mdl } from '../utils/render';

/**
 * @class
 * @extends {BaseField}
 */
export class RadiobuttonField extends BaseField<HTMLInputElement> {
    dataLabelNode: Knot;
    spanLabel: Knot;
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
     * @param {!Form} form
     */
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
    /**
     * @private
     * @return {undefined}
     */
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
    /**
     * @private
     * @return {undefined}
     */
    private _change(): void {
        const value = this.input.getAttribute('value');
        this.modelChange(value);

        const name = this.input.getAttribute('name');
        const radioButtonInputs = new Query(
            format('input[name="{0}"]', [name]),
            this.form.formNode,
        );
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

        this.dataLabelNode = new Knot('span');
        this.dataLabelNode.addClass('field-label');
        this.label.insertBefore(this.dataLabelNode);

        this.refresh();
    }
    /**
     * @override
     */
    refresh() {
        const dataLabelText = this.label.getAttribute('data-label');
        if (dataLabelText) {
            const labelText = this._getLabelRequiredText(dataLabelText);
            this.dataLabelNode.setHtml(labelText);
        } else {
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
    setValue(
        value:
            | Object
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
    /**
     * @override
     * @return {*}
     */
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
    /**
     * @override
     * @param {boolean} state
     * @return {undefined}
     */
    setDisabled(state: boolean): void {
        this._getRadioButtonInputs().each((radioButtonInput) => {
            if (state) {
                radioButtonInput.setAttribute('disabled');
                radioButtonInput.getParentNode().addClass('is-disabled');
                radioButtonInput
                    .getParentNode()
                    .getParentNode()
                    .addClass('is-disabled');
            } else {
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
    isDisabled(): boolean {
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
    private _getRadioButtonInputs(): Query<HTMLInputElement> {
        const name = this.input.getAttribute('name');
        return new Query<HTMLInputElement>(
            format('input[name="{0}"]', [name]),
            this.form.formNode,
        );
    }
    /**
     * @override
     * @param {string} text
     * @return {undefined}
     */
    setLabel(text: string): void {
        if (this.spanLabel && !this.spanLabel.isEmpty()) {
            this.spanLabel.setHtml(text);
            this._setAdditionalLabel(this.spanLabel);
        }
    }
}
