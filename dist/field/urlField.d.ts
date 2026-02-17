import { BaseField } from './baseField';
import { Knot } from '../core/knot';
/**
 * @description URL input field with optional protocol prefix display (e.g., "https://").
 *
 * @example
 * const urlField = new UrlField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 * urlField.render();
 *
 * @see {@link BaseField}
 *
 * @category Field
 */
export declare class UrlField extends BaseField<HTMLInputElement> {
    protocol: string;
    /**
     * @description Creates a new UrlField instance.
     * @param {Knot<HTMLInputElement>} input - The URL input element.
     * @param {Knot} label - The label element.
     * @param {Knot} error - The error message element.
     * @param {Knot} inputBlock - The container block element.
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * @description Initializes the field by reading the protocol data attribute and attaching input event listeners.
     */
    private _init;
    /**
     * @description Applies MDL textfield classes and renders the protocol prefix span if configured.
     * @override
     */
    render(): void;
    /**
     * @description Marks the field as invalid when required and empty, then upgrades MDL components.
     * @override
     */
    refresh(): void;
}
