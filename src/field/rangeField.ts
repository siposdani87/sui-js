import { BaseField } from './baseField';
import { Tooltip } from '../component/tooltip';
import { Query } from '../core/query';
import { Item } from '../core';
import { mdl } from '../utils/render';

/**
 * @class
 * @extends {BaseField}
 */
export class RangeField extends BaseField {
    tooltip: Tooltip;
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(input: Item, label: Item, error: Item, inputBlock: Item) {
        super(input, label, error, inputBlock);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init(): void {
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

        const containerNode = new Query(
            '.mdl-slider__container',
            this.inputBlock,
        ).getItem();
        const value = /** @type {string} */(this).getValue();
        this.tooltip = new Tooltip(containerNode);
        this.tooltip.render(value);
    }
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value: Object | Function | Array<any> | boolean | number | string | null | undefined): void {
        const inputNode = this.input.getNode();
        inputNode['MaterialSlider']['change'](value);
        this.tooltip.render(value as string);
    }
}
