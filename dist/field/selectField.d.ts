import { BaseField } from './baseField';
import { Popup } from '../component/popup';
import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
/**
 * @description Custom select/dropdown field with search, single/multiple selection, and tag display.
 * Extends {@link BaseField} with popup-based option selection.
 * @category Field
 * @example
 * const selectField = new SelectField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 * selectField.render();
 * selectField.setOptions(items, 'id', 'label');
 * selectField.setValue('option1');
 * @see {@link BaseField}
 * @see {@link Popup}
 * @see {@link Collection}
 */
export declare class SelectField extends BaseField<HTMLInputElement> {
    query: string;
    ids: string[];
    containerKnot: Knot;
    listKnot: Knot;
    popup: Popup;
    options: Collection<Objekt>;
    iconKnot: Knot;
    selectContainerKnot: Knot;
    selectKnot: Knot;
    searchInputKnot: Knot<HTMLInputElement>;
    /**
     * @description Creates a new SelectField instance.
     * @param {Knot<HTMLInputElement>} input - The select input element wrapped in a Knot.
     * @param {Knot} label - The label element wrapped in a Knot.
     * @param {Knot} error - The error element wrapped in a Knot.
     * @param {Knot} inputBlock - The input block container wrapped in a Knot.
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * @description Initializes the select field by hiding the native input, setting up options, events, and the popup.
     */
    private _init;
    /**
     * @description Checks whether the select field allows multiple selections.
     * @returns {boolean} True if the input has a multiple attribute.
     * @example
     * if (selectField.isMultiple()) {
     *     console.log('Multiple selections allowed');
     * }
     */
    isMultiple(): boolean;
    /**
     * @description Initializes the popup container with a search input and options list.
     */
    private _initPopup;
    /**
     * @description Binds the change event listener on the native input element.
     */
    private _initChangeEvent;
    /**
     * @description Parses option elements from the native input and populates the options collection.
     */
    private _initOptions;
    /**
     * @description Renders the select field by adding the label class, creating the expander icon, and refreshing the display.
     */
    render(): void;
    /**
     * @description Refreshes the select field by rebuilding the select container and updating the displayed tags.
     */
    refresh(): void;
    /**
     * @description Sets the selected value(s) by updating the selected state of the underlying option elements.
     * @param {object | Function | Array<any> | boolean | number | string | null | undefined} value - The value or array of values to select.
     */
    setValue(value: object | Function | Array<any> | boolean | number | string | null | undefined): void;
    /**
     * @description Returns the selected value(s). Returns a single value for single-select or an array for multi-select.
     * @returns {*} The selected value(s), or null if nothing is selected.
     */
    getValue(): any;
    /**
     * @description Returns the selected option object or a specific attribute from its associated item data.
     * @param {string} [opt_attribute] - An optional attribute path to retrieve from the option's item data.
     * @returns {*} The option object, the attribute value, or the raw value if no option is found.
     * @example
     * const option = selectField.getOptionValue();
     * const label = selectField.getOptionValue('label');
     */
    getOptionValue(opt_attribute?: string): any;
    /**
     * @description Shows a loading spinner on the expander icon to indicate options are being loaded.
     * @example
     * selectField.showLoader();
     * fetchOptions().then((items) => {
     *     selectField.setOptions(items);
     * });
     */
    showLoader(): void;
    /**
     * @description Hides the loading spinner and restores the expander icon.
     */
    private _hideLoader;
    /**
     * @description Replaces the current options with new items and refreshes the field.
     * @param {Array<Objekt>} items - The new option items to set.
     * @param {string} [opt_value='value'] - The attribute name to use as the option value.
     * @param {string} [opt_name='name'] - The attribute name to use as the option display text.
     * @param {string} [opt_image=''] - The attribute name to use as the option image URL.
     * @example
     * const items = [new Objekt({ value: '1', name: 'Option 1' })];
     * selectField.setOptions(items, 'value', 'name');
     */
    setOptions(items: Array<Objekt>, opt_value?: string | undefined, opt_name?: string | undefined, opt_image?: string | undefined): void;
    /**
     * @description Handles the change event by updating tags and notifying the model.
     */
    private _change;
    /**
     * @description Renders the selected tags in the select container based on the given IDs.
     * @param {Array<any>} ids - The selected option IDs.
     */
    private _setSelectTags;
    /**
     * @description Renders a single tag for single-select mode.
     * @param {string} id - The selected option ID.
     */
    private _setSimpleTag;
    /**
     * @description Renders multiple tags for multi-select mode.
     * @param {Array<string>} ids - The selected option IDs.
     */
    private _setMultipleTag;
    /**
     * @description Renders tag elements in the select knot with optional close buttons for enabled fields.
     * @param {Array<Objekt> | Objekt} tags - The option(s) to render as tags.
     */
    private _setTags;
    /**
     * @description Updates the selected attribute on option elements matching the given IDs.
     * @param {Array<any>} ids - The IDs to mark as selected.
     */
    private _setSelectedIds;
    /**
     * @description Collects the IDs of all currently selected options.
     * @returns {Array<any>} The selected IDs, or [''] if none are selected.
     */
    private _getSelectedIds;
    /**
     * @description Toggles the selection of an option by ID, handling both single and multiple selection modes.
     * @param {string} id - The option ID to toggle.
     */
    private _handleSelectedId;
    /**
     * @description Draws the option list knots in the popup, highlighting currently selected items.
     * @param {Array<Objekt>} items - The option items to render.
     */
    private _drawKnots;
    /**
     * @description Creates the search input box inside the popup container for filtering options.
     */
    private _drawSearchInput;
    /**
     * @description Opens the select popup, executing the current search query and focusing the search input.
     * @example
     * selectField.open();
     */
    open(): void;
    /**
     * @description Closes the select popup.
     * @example
     * selectField.close();
     */
    close(): void;
    /**
     * @description Filters the options by a search query and redraws the option list.
     * @param {string} query - The search query string.
     */
    private _search;
}
