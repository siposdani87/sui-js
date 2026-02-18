import { BaseField } from './baseField';
import { Tooltip } from '../component/tooltip';
import { Knot } from '../core';
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
export declare class RangeField extends BaseField<HTMLInputElement> {
    tooltip: Tooltip;
    /**
     * @description Creates a new RangeField instance.
     * @param {Knot<HTMLInputElement>} input - The range input element.
     * @param {Knot} label - The label element.
     * @param {Knot} error - The error message element.
     * @param {Knot} inputBlock - The container block element.
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * @description Initializes the field by adding CSS class and attaching the input event listener that updates the tooltip.
     */
    private _init;
    /**
     * @description Applies MDL slider classes to the input block and input element, then refreshes.
     * @override
     */
    render(): void;
    /**
     * @description Validates the field, upgrades MDL components, manages the disabled state, and renders the value tooltip.
     * @override
     */
    refresh(): void;
    /**
     * @description Sets the slider value via the MDL MaterialSlider API and updates the tooltip display.
     * @param {object | Array<unknown> | boolean | number | string | null | undefined} value - The value to set.
     * @override
     */
    setValue(value: object | Array<unknown> | boolean | number | string | null | undefined): void;
}
