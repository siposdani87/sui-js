import { BaseField } from '../field/baseField';
import { Knot } from '../core/knot';
import { Form } from './form';
/**
 * @description Factory function that detects an input element's type and creates the
 * appropriate {@link BaseField} subclass instance. Supports all standard HTML input types
 * plus custom data-type attributes for location, switch, and icon-toggle fields.
 *
 * @param {Knot} inputBlock - The input block DOM element (may be the input itself or its wrapper div).
 * @param {Form} form - The parent form instance, used for radio button grouping.
 * @returns {BaseField | null} The created field instance, or null if the input type is unrecognized.
 *
 * @example
 * const field = FormField(inputBlockKnot, formInstance);
 * if (field) { field.render(); }
 *
 * @see {@link Form} for the form component that uses this factory
 * @see {@link BaseField} for the base class all fields extend
 *
 * @category Component
 */
export declare const FormField: (inputBlock: Knot<HTMLInputElement | HTMLElement>, form: Form) => BaseField<HTMLInputElement> | null;
/**
 * @description Extracts the input, label, and error elements from a form input block.
 * Handles both raw input elements and wrapper div structures, creating error spans as needed.
 *
 * @param {Knot} inputBlock - The input block DOM element to parse.
 * @returns {{ input: Knot, label: Knot | undefined, error: Knot | undefined }} The extracted input, label, and error elements.
 *
 * @example
 * const { input, label, error } = parseInputBlock(inputBlockKnot);
 *
 * @see {@link FormField} for the factory that calls this function
 *
 * @category Component
 */
export declare const parseInputBlock: (inputBlock: Knot<HTMLInputElement | HTMLElement>) => {
    input: Knot<HTMLInputElement>;
    label: Knot | undefined;
    error: Knot | undefined;
};
