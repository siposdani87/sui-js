import { BaseField } from './baseField';
import { Knot } from '../core/knot';
/**
 * @description Expandable search input field with clear button and enter key handling.
 *
 * @example
 * const searchField = new SearchField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 * searchField.on('enter', (value) => { console.log('Search:', value); });
 * searchField.render();
 *
 * @see {@link BaseField}
 *
 * @category Field
 */
export declare class SearchField extends BaseField<HTMLInputElement> {
    holderKnot: Knot;
    /**
     * @description Initializes keyup and change event listeners on the input.
     */
    protected _init(): void;
    /**
     * @description Builds the expandable SUI search field layout with icon, holder, label, and clear button.
     * @override
     */
    render(): void;
    /**
     * @description Marks the field as invalid when required and empty, then upgrades SUI components.
     * @override
     */
    refresh(): void;
    /**
     * @description Creates a clear button that resets the field value and triggers eventEnter.
     */
    private _initClearButton;
}
