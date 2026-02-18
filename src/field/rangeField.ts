import { BaseField } from './baseField';
import { Tooltip } from '../component/tooltip';
// import { Query } from '../core/query';
import { Knot } from '../core';
import { mdl } from '../utils/render';

/**
 * @description MDL slider/range input field with a tooltip displaying the current value.
 *
 * @example
 * const rangeField = new RangeField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 * rangeField.render();
 *
 * @see {@link BaseField}
 * @see {@link Tooltip}
 *
 * @category Field
 */
export class RangeField extends BaseField<HTMLInputElement> {
    tooltip!: Tooltip;

    /**
     * @description Creates a new RangeField instance.
     * @param {Knot<HTMLInputElement>} input - The range input element.
     * @param {Knot} label - The label element.
     * @param {Knot} error - The error message element.
     * @param {Knot} inputBlock - The container block element.
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
     * @description Initializes the field by adding CSS class and attaching the input event listener that updates the tooltip.
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
     * @description Applies MDL slider classes to the input block and input element, then refreshes.
     * @override
     */
    override render(): void {
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
     * @description Validates the field, upgrades MDL components, manages the disabled state, and renders the value tooltip.
     * @override
     */
    override refresh() {
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
     * @description Sets the slider value via the MDL MaterialSlider API and updates the tooltip display.
     * @param {object | Array<unknown> | boolean | number | string | null | undefined} value - The value to set.
     * @override
     */
    override setValue(
        value:
            | object
            | Array<unknown>
            | boolean
            | number
            | string
            | null
            | undefined,
    ): void {
        const inputKnot = this.input.getNode();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (inputKnot as any)['MaterialSlider']['change'](value);
        this.tooltip.render(value as string);
    }
}
