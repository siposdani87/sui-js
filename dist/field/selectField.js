import { isArray, eq, format, neq, inArray, clear, remove, eachArray, } from '../utils/operation';
import { BaseField } from './baseField';
import { Popup } from '../component/popup';
import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { generateId } from '../utils/coder';
import { mdl } from '../utils/render';
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
export class SelectField extends BaseField {
    /**
     * @description Creates a new SelectField instance.
     * @param {Knot<HTMLInputElement>} input - The select input element wrapped in a Knot.
     * @param {Knot} label - The label element wrapped in a Knot.
     * @param {Knot} error - The error element wrapped in a Knot.
     * @param {Knot} inputBlock - The input block container wrapped in a Knot.
     */
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
        this._init();
    }
    /**
     * @description Initializes the select field by hiding the native input, setting up options, events, and the popup.
     */
    _init() {
        this.input.addClass('hidden');
        this.inputBlock.addClass('select-field');
        this.query = '';
        this.ids = [];
        this._initOptions();
        this._initChangeEvent();
        this._initPopup();
    }
    /**
     * @description Checks whether the select field allows multiple selections.
     * @returns {boolean} True if the input has a multiple attribute.
     * @example
     * if (selectField.isMultiple()) {
     *     console.log('Multiple selections allowed');
     * }
     */
    isMultiple() {
        return this.input.hasAttribute('multiple');
    }
    /**
     * @description Initializes the popup container with a search input and options list.
     */
    _initPopup() {
        this.containerKnot = new Knot('div');
        this._drawSearchInput();
        this.listKnot = new Knot('div');
        this.listKnot.addClass('options-list');
        this.containerKnot.appendChild(this.listKnot);
        this.popup = new Popup(this.containerKnot, this.inputBlock);
    }
    /**
     * @description Binds the change event listener on the native input element.
     */
    _initChangeEvent() {
        this.input.addEventListener('change', () => {
            this._change();
            return true;
        });
    }
    /**
     * @description Parses option elements from the native input and populates the options collection.
     */
    _initOptions() {
        this.options = new Collection();
        const optionKnots = new Query('option', this.input);
        optionKnots.each((optionKnot) => {
            const value = optionKnot.getAttribute('value') || '';
            const image = optionKnot.getAttribute('data-image') || '';
            const item = optionKnot.getAttribute('data-item') || {};
            const text = optionKnot.getText() || '';
            const option = new Objekt({
                id: value,
                name: text,
                image: image,
                item: item,
            });
            option.setRaw('option_node', optionKnot);
            this.options.push(option);
        });
    }
    /**
     * @description Renders the select field by adding the label class, creating the expander icon, and refreshing the display.
     */
    render() {
        if (this.label && this.label.exists()) {
            this.label.addClass('field-label');
        }
        this.iconKnot = new Knot('a');
        this.iconKnot.setAttribute('href', 'javascript:void(0)');
        this.iconKnot.addClass(['material-icons', 'size-24', 'expander']);
        this.iconKnot.setHtml('expand_more');
        this.iconKnot.addEventListener('click', () => {
            if (this.isEnabled()) {
                this.open();
            }
        });
        this.actionContainerKnot.appendChild(this.iconKnot);
        this.refresh();
    }
    /**
     * @description Refreshes the select field by rebuilding the select container and updating the displayed tags.
     */
    refresh() {
        const selectContainerKnot = new Query('.select-container', this.inputBlock).getKnot();
        selectContainerKnot.remove();
        if (this.isDisabled()) {
            this.inputBlock.addClass('is-disabled');
        }
        else {
            this.inputBlock.removeClass('is-disabled');
        }
        this.selectContainerKnot = new Knot('div');
        this.selectContainerKnot.addClass('select-container');
        this.selectContainerKnot.addEventListener('click', () => {
            if (this.isEnabled()) {
                this.open();
            }
        });
        this.input.insertAfter(this.selectContainerKnot);
        this.selectKnot = new Knot('div');
        this.selectKnot.addClass('select-input');
        this.selectContainerKnot.appendChild(this.selectKnot);
        const ids = this._getSelectedIds();
        this._setSelectTags(ids);
    }
    /**
     * @description Sets the selected value(s) by updating the selected state of the underlying option elements.
     * @param {object | Array<unknown> | boolean | number | string | null | undefined} value - The value or array of values to select.
     */
    setValue(value) {
        this.ids = value;
        if (!isArray(value)) {
            this.ids = [value];
        }
        this._setSelectedIds(this.ids);
    }
    /**
     * @description Returns the selected value(s). Returns a single value for single-select or an array for multi-select.
     * @returns {*} The selected value(s), or null if nothing is selected.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getValue() {
        let ids = this._getSelectedIds();
        ids = ids.filter((id) => {
            return !eq(id, '');
        });
        return this.isMultiple() ? ids : ids[0] || null;
    }
    /**
     * @description Returns the selected option object or a specific attribute from its associated item data.
     * @param {string} [opt_attribute] - An optional attribute path to retrieve from the option's item data.
     * @returns {*} The option object, the attribute value, or the raw value if no option is found.
     * @example
     * const option = selectField.getOptionValue();
     * const label = selectField.getOptionValue('label');
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getOptionValue(opt_attribute) {
        const value = this.getValue();
        if (value) {
            const option = this.options.findById(value);
            return opt_attribute
                ? option.get(format('item.{0}', [opt_attribute]))
                : option;
        }
        return value;
    }
    /**
     * @description Shows a loading spinner on the expander icon to indicate options are being loaded.
     * @example
     * selectField.showLoader();
     * fetchOptions().then((items) => {
     *     selectField.setOptions(items);
     * });
     */
    showLoader() {
        this.iconKnot.setHtml('refresh');
        this.iconKnot.addClass('rotate');
    }
    /**
     * @description Hides the loading spinner and restores the expander icon.
     */
    _hideLoader() {
        this.iconKnot.setHtml('expand_more');
        this.iconKnot.removeClass('rotate');
    }
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
    setOptions(items, opt_value = 'value', opt_name = 'name', opt_image = '') {
        const optionKnots = new Query('option', this.input);
        optionKnots.each((optionKnot) => {
            if (optionKnot.getAttribute('value')) {
                optionKnot.remove();
            }
        });
        eachArray(items, (item) => {
            const value = item.get(opt_value);
            const name = item.get(opt_name);
            let image = '';
            if (opt_image) {
                image = item.get(opt_image);
            }
            const optionKnot = new Knot('option');
            optionKnot.setAttribute('value', value);
            optionKnot.setAttribute('data-image', image);
            optionKnot.setAttribute('data-item', item);
            optionKnot.setHtml(name);
            this.input.appendChild(optionKnot);
        });
        this._initOptions();
        this._hideLoader();
        this.setValue(this.ids);
    }
    /**
     * @description Handles the change event by updating tags and notifying the model.
     */
    _change() {
        const ids = this._getSelectedIds();
        this._setSelectTags(ids);
        const value = this.getValue();
        this.modelChange(value);
    }
    /**
     * @description Renders the selected tags in the select container based on the given IDs.
     * @param {Array<any>} ids - The selected option IDs.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _setSelectTags(ids) {
        if (this.isRequired() && ids.length === 1 && ids[0] === '') {
            this.inputBlock.addClass('is-invalid');
        }
        if (this.isMultiple()) {
            this._setMultipleTag(ids);
        }
        else {
            this._setSimpleTag(ids[0]);
        }
    }
    /**
     * @description Renders a single tag for single-select mode.
     * @param {string} id - The selected option ID.
     */
    _setSimpleTag(id) {
        const option = this.options.findById(id);
        this._setTags(option);
    }
    /**
     * @description Renders multiple tags for multi-select mode.
     * @param {Array<string>} ids - The selected option IDs.
     */
    _setMultipleTag(ids) {
        const options = [];
        eachArray(ids, (id) => {
            const option = this.options.findById(id);
            if (option) {
                options.push(option);
            }
        });
        if (neq(options.length, 0)) {
            this._setTags(options);
        }
        else if (this.isRequired()) {
            const option = this.options.get(0);
            this._setTags(option);
        }
        else if (eq(ids.length, 0)) {
            this._setTags([]);
        }
    }
    /**
     * @description Renders tag elements in the select knot with optional close buttons for enabled fields.
     * @param {Array<Objekt> | Objekt} tags - The option(s) to render as tags.
     */
    _setTags(tags) {
        if (!isArray(tags)) {
            tags = [tags];
        }
        this.selectKnot.removeChildren();
        eachArray(tags, (tag) => {
            const tagKnot = new Knot('div');
            tagKnot.addClass('field-tag');
            tagKnot.setHtml(tag.get('name'));
            if (this.isEnabled()) {
                tagKnot.addEventListener('click', () => {
                    this.open();
                });
            }
            this.selectKnot.appendChild(tagKnot);
            const id = tag.get('id');
            if (neq(id, '') && this.isEnabled()) {
                const iconKnot = new Knot('a');
                iconKnot.setAttribute('href', 'javascript:void(0)');
                iconKnot.addClass(['material-icons', 'size-18', 'close']);
                iconKnot.setHtml('close');
                iconKnot.addEventListener('click', () => {
                    this._handleSelectedId(id);
                });
                tagKnot.addClass('tag-with-action');
                tagKnot.appendChild(iconKnot);
            }
        });
    }
    /**
     * @description Updates the selected attribute on option elements matching the given IDs.
     * @param {Array<any>} ids - The IDs to mark as selected.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _setSelectedIds(ids) {
        this.options.each((option) => {
            const id = option.get('id');
            const selected = inArray(ids, id);
            const optionKnot = option.get('option_node');
            const optionNode = optionKnot.getNode();
            if (selected) {
                optionNode.setAttribute('selected', 'selected');
            }
            else {
                optionNode.removeAttribute('selected');
            }
            optionNode.selected = selected;
        });
        this._change();
    }
    /**
     * @description Collects the IDs of all currently selected options.
     * @returns {Array<any>} The selected IDs, or [''] if none are selected.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _getSelectedIds() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ids = [];
        this.options.each((option) => {
            const optionKnot = option.get('option_node');
            const optionNode = optionKnot.getNode();
            if (optionNode.selected) {
                const id = option.get('id');
                ids.push(id);
            }
        });
        return ids.length === 0 ? [''] : ids;
    }
    /**
     * @description Toggles the selection of an option by ID, handling both single and multiple selection modes.
     * @param {string} id - The option ID to toggle.
     */
    _handleSelectedId(id) {
        let ids = this._getSelectedIds();
        if (this.isMultiple()) {
            if (eq(id, '') || eq(ids[0], '')) {
                clear(ids);
            }
            if (inArray(ids, id)) {
                remove(ids, id);
            }
            else {
                ids.push(id);
            }
            if (ids.length === 0) {
                ids = [''];
            }
        }
        else {
            if (inArray(ids, id)) {
                ids = [''];
            }
            else {
                ids = [id];
            }
        }
        this.query = '';
        this._setSelectedIds(ids);
        this.close();
    }
    /**
     * @description Draws the option list knots in the popup, highlighting currently selected items.
     * @param {Array<Objekt>} items - The option items to render.
     */
    _drawKnots(items) {
        this.listKnot.removeChildren();
        const ids = this._getSelectedIds();
        eachArray(items, (item) => {
            const id = item.get('id');
            const listKnot = new Knot('a');
            listKnot.setAttribute('href', 'javascript:void(0)');
            if (inArray(ids, id)) {
                listKnot.addClass('selected');
            }
            listKnot.addEventListener('click', () => {
                this._handleSelectedId(id);
            });
            this.listKnot.appendChild(listKnot);
            const image = item.get('image');
            if (image) {
                const imageKnot = new Knot('img');
                imageKnot.setAttribute('src', image);
                listKnot.appendChild(imageKnot);
            }
            const name = item.get('name');
            const nameKnot = new Knot('span');
            nameKnot.setHtml(name);
            listKnot.appendChild(nameKnot);
        });
    }
    /**
     * @description Creates the search input box inside the popup container for filtering options.
     */
    _drawSearchInput() {
        const searchParentKnot = new Knot('div');
        searchParentKnot.addClass('search-box');
        this.containerKnot.appendChild(searchParentKnot);
        const searchKnot = new Knot('div');
        searchKnot.addClass(['mdl-textfield', 'mdl-js-textfield']);
        searchKnot.addEventListener('click', () => {
            // empty function
        });
        searchParentKnot.appendChild(searchKnot);
        const id = generateId('select');
        this.searchInputKnot = new Knot('input');
        this.searchInputKnot.setId(id);
        this.searchInputKnot.setAttribute('type', 'text');
        this.searchInputKnot.addClass('mdl-textfield__input');
        this.searchInputKnot.addEventListener('keyup', (input) => {
            const inputNode = input.getNode();
            this._search(inputNode.value);
            return true;
        });
        searchKnot.appendChild(this.searchInputKnot);
        const labelKnot = new Knot('label');
        labelKnot.setFor(id);
        labelKnot.addClass('mdl-textfield__label');
        searchKnot.appendChild(labelKnot);
        mdl(searchKnot);
    }
    /**
     * @description Opens the select popup, executing the current search query and focusing the search input.
     * @example
     * selectField.open();
     */
    open() {
        this._search(this.query);
        this.popup.open();
        this.searchInputKnot.getNode().focus();
    }
    /**
     * @description Closes the select popup.
     * @example
     * selectField.close();
     */
    close() {
        this.popup.close();
    }
    /**
     * @description Filters the options by a search query and redraws the option list.
     * @param {string} query - The search query string.
     */
    _search(query) {
        this.query = query;
        this.searchInputKnot.getNode().value = query;
        this.searchInputKnot.set('value', query);
        const regExp = new RegExp(query, 'i');
        const items = [];
        this.options.each((option) => {
            const name = option.get('name');
            if (regExp.test(name)) {
                items.push(option);
            }
        });
        this._drawKnots(items);
    }
}
