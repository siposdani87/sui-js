import { BaseField } from './baseField';
import { Knot } from '../core/knot';
/**
 * @description Expandable search input field with clear button and enter key handling.
 *
 * @example
 * const searchField = new SearchField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 * searchField.eventEnter = (value) => { console.log('Search:', value); };
 * searchField.render();
 *
 * @see {@link BaseField}
 *
 * @category Field
 */
export declare class SearchField extends BaseField<HTMLInputElement> {
    holderKnot: Knot;
    /**
     * @description Creates a new SearchField instance.
     * @param {Knot<HTMLInputElement>} input - The search input element.
     * @param {Knot} label - The label element.
     * @param {Knot} error - The error message element.
     * @param {Knot} inputBlock - The container block element.
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * @description Initializes keyup and change event listeners on the input.
     */
    private _init;
    /**
     * @description Builds the expandable MDL search field layout with icon, holder, label, and clear button.
     * @override
     */
    render(): void;
    /**
     * @description Marks the field as invalid when required and empty, then upgrades MDL components.
     * @override
     */
    refresh(): void;
    /**
     * @description Creates a clear button that resets the field value and triggers eventEnter.
     */
    private _initClearButton;
    /**
     * @description Called when the user presses Enter or clears the search field. Override to handle search submission.
     * @param {string} value - The current search input value.
     */
    eventEnter(value: string): void;
}
