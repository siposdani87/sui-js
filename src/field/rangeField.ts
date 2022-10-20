import { BaseField } from './baseField';
import { Tooltip } from '../component/tooltip';
// import { Query } from '../core/query';
import { Knot } from '../core';
import { mdl } from '../utils/render';

/**
 * @class
 * @extends {BaseField}
 */
export class RangeField extends BaseField<HTMLInputElement> {
    tooltip: Tooltip;
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
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.inputBlock.addClass('range-field');

        this.input.addEventListener('input', (input) => {
            const inputNode = input.getNode();
            this.input.setAttribute('value', inputNode.value);
            this.tooltip.setMessage(inputNode.value);
            this.modelChange(inputNode.value);
        });
    }
    /**
     * @override
     * @return {undefined}
     */
    render(): void {
        this.inputBlock.addClass([
            'mdl-textfield',
            'mdl-js-textfield',
            'mdl-sliderfield',
        ]);

        this.input.addClass(['mdl-slider', 'mdl-js-slider']);

        if (this.label && this.label.exists()) {
            this.label.addClass('mdl-textfield__label');
        }

        this.refresh();
    }
    /**
     * @override
     */
    refresh() {
        if (this.isRequired() && this.getValue() === '') {
            this.inputBlock.addClass('is-invalid');
        }

        mdl(this.input);

        if (this.isDisabled()) {
            this.inputBlock.addClass('is-disabled');
        } else {
            this.inputBlock.removeClass('is-disabled');
        }

        // TODO: check the tooltip
        /* const containerKnot = new Query(
            '.mdl-slider__container',
            this.inputBlock,
        ).getKnot(); */
        const value = this.getValue();
        this.tooltip = new Tooltip(this.inputBlock);
        this.tooltip.render(value);
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
        const inputKnot = this.input.getNode();
        inputKnot['MaterialSlider']['change'](value);
        this.tooltip.render(value as string);
    }
}
