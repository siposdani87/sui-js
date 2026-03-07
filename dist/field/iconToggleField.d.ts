import { Knot } from '../core/knot';
import { BaseCheckboxField } from './baseCheckboxField';
/**
 * Icon-based toggle field with checked and unchecked icon states.
 *
 * @description Extends {@link BaseCheckboxField} to render a SUI
 * icon toggle that switches between two Material Icons based on the checked state.
 * The checked and unchecked icons are read from `data-checked` and `data-unchecked`
 * attributes on the input element.
 *
 * @example
 * // Input element should have data-checked and data-unchecked attributes:
 * // <input type="checkbox" data-checked="visibility" data-unchecked="visibility_off" />
 * const iconToggle = new IconToggleField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 *
 * @see {@link BaseCheckboxField}
 * @category Field
 */
export declare class IconToggleField extends BaseCheckboxField {
    /** @description The Material Icon name shown when the toggle is checked. */
    checkedIcon: string;
    /** @description The Material Icon name shown when the toggle is unchecked. */
    uncheckedIcon: string;
    /** @description The icon element rendered inside the toggle label. */
    icon: Knot;
    /**
     * Renders the icon toggle with SUI classes, icon element, and label span.
     */
    render(): void;
    /**
     * Handles the change event by updating the displayed icon and notifying the model.
     */
    protected _change(): void;
    /**
     * Sets the toggle value and updates the displayed icon accordingly.
     *
     * @param {object | Array<unknown> | boolean | number | string | null | undefined} value The value to set.
     */
    setValue(value: object | Array<unknown> | boolean | number | string | null | undefined): void;
}
