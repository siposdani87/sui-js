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
 * @class
 * @extends {BaseField}
 */
export class SelectField extends BaseField {
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
     */
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
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
     * @return {boolean}
     */
    isMultiple() {
        return this.input.hasAttribute('multiple');
    }
    /**
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
     */
    _initChangeEvent() {
        this.input.addEventListener('change', () => {
            this._change();
            return true;
        });
    }
    /**
     * @private
     * @return {undefined}
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
     * @override
     * @return {undefined}
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
     * @override
     * @return {undefined}
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
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value) {
        this.ids = value;
        if (!isArray(value)) {
            this.ids = [value];
        }
        this._setSelectedIds(this.ids);
    }
    /**
     * @override
     * @return {*}
     */
    getValue() {
        let ids = this._getSelectedIds();
        ids = ids.filter((id) => {
            return !eq(id, '');
        });
        return this.isMultiple() ? ids : ids[0] || null;
    }
    /**
     * @param {string=} opt_attribute
     * @return {*}
     */
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
     * @return {undefined}
     */
    showLoader() {
        this.iconKnot.setHtml('refresh');
        this.iconKnot.addClass('rotate');
    }
    /**
     * @private
     * @return {undefined}
     */
    _hideLoader() {
        this.iconKnot.setHtml('expand_more');
        this.iconKnot.removeClass('rotate');
    }
    /**
     * @param {!Array<!Objekt>} items
     * @param {string=} opt_value
     * @param {string=} opt_name
     * @param {string=} opt_image
     * @return {undefined}
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
     * @private
     * @return {undefined}
     */
    _change() {
        const ids = this._getSelectedIds();
        this._setSelectTags(ids);
        const value = this.getValue();
        this.modelChange(value);
    }
    /**
     * @private
     * @param {!Array} ids
     * @return {undefined}
     */
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
     * @param {string} id
     * @return {undefined}
     * @private
     */
    _setSimpleTag(id) {
        const option = this.options.findById(id);
        this._setTags(option);
    }
    /**
     * @param {!Array<string>} ids
     * @return {undefined}
     * @private
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
     * @private
     * @param {!Array<Objekt>|Objekt} tags
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
     * @private
     * @param {!Array} ids
     * @return {undefined}
     */
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
     * @private
     * @return {!Array}
     */
    _getSelectedIds() {
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
     * @param {string} id
     * @return {undefined}
     * @private
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
     * @private
     * @param {!Array<Objekt>} items
     * @return {undefined}
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
     * @private
     * @return {undefined}
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
     * @return {undefined}
     */
    open() {
        this._search(this.query);
        this.popup.open();
        this.searchInputKnot.getNode().focus();
    }
    /**
     * @return {undefined}
     */
    close() {
        this.popup.close();
    }
    /**
     * @private
     * @param {string} query
     * @return {undefined}
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
