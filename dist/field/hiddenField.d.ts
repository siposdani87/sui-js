import { Knot } from '../core';
import { BaseField } from './baseField';
/**
 * Hidden form input field with no visible rendering.
 *
 * @description Extends {@link BaseField} to provide a hidden input that participates
 * in form data without rendering any visible UI. Changes to the hidden input
 * value are propagated through the model change mechanism.
 *
 * @example
 * const hiddenField = new HiddenField(inputKnot);
 *
 * @see {@link BaseField}
 * @category Field
 */
export declare class HiddenField extends BaseField<HTMLInputElement> {
    /**
     * Creates a new HiddenField instance.
     *
     * @param {Knot<HTMLInputElement>} input The hidden input element.
     */
    constructor(input: Knot<HTMLInputElement>);
    /**
     * Initializes the change event listener on the hidden input.
     */
    private _init;
    /**
     * No-op render since the field is hidden.
     */
    render(): void;
    /**
     * No-op refresh since the field is hidden.
     */
    refresh(): void;
}
