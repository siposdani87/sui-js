import { typeCast } from '../utils/operation';
import { BaseField } from './baseField';
import { Query } from '../core/query';
import { Knot } from '../core/knot';
import { mdl } from '../utils/render';

/**
 * @class
 * @extends {BaseField}
 */
export class BaseCheckboxField extends BaseField<HTMLInputElement> {
    hiddenInput: Knot;
    spanLabel: Knot;
    dataLabelKnot: Knot;
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
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
     * @protected
     * @return {undefined}
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
     * @protected
     * @return {undefined}
     */
    protected _change(): void {
        const value = this.getValue();
        this.modelChange(value);
    }
    /**
     * @override
     * @return {*}
     */
    getValue(): any {
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
    setDisabled(state: boolean): void {
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
    /**
     * @override
     */
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
}
