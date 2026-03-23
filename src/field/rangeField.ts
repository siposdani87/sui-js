import { BaseField } from './baseField';
import { Tooltip } from '../component/tooltip';

/**
 * Range slider input field with a tooltip displaying the current value.
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
     * Initializes the field by adding CSS class and attaching the input event listener that updates the tooltip.
     */
    protected override _init(): void {
        this.inputBlock.addClass('range-field');

        this.input.addEventListener('input', (input) => {
            const inputNode = input.getNode();
            this.input.setAttribute('value', inputNode.value);
            this.tooltip.setMessage(inputNode.value);
            this.modelChange(inputNode.value);
        });
    }

    /**
     * Applies SUI slider classes to the input block and input element, then refreshes.
     * @override
     */
    override render(): void {
        this._renderTextField(
            ['sui-textfield', 'sui-sliderfield'],
            ['sui-slider'],
        );
        this.refresh();
    }

    /**
     * Validates the field, manages the disabled state, and renders the value tooltip.
     * @override
     */
    override refresh() {
        if (this.isRequired() && this.getValue() === '') {
            this.inputBlock.addClass('is-invalid');
        }

        if (this.isDisabled()) {
            this.inputBlock.addClass('is-disabled');
        } else {
            this.inputBlock.removeClass('is-disabled');
        }

        const value = this.getValue();
        this.tooltip = new Tooltip(this.inputBlock);
        this.tooltip.render(value);
    }

    /**
     * Sets the slider value natively and updates the tooltip display.
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
        const inputNode = this.input.getNode();
        inputNode.value = String(value ?? '');
        inputNode.dispatchEvent(new Event('input'));
        this.tooltip.render(value as string);
    }
}
