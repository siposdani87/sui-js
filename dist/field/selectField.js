import { isArray, eq, format, each, neq, inArray, clear, remove, mdl, } from '../utils/operation';
import { BaseField } from './baseField';
import { Popup } from '../component/popup';
import { Collection } from '../core/collection';
import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { generateId } from '../utils/coder';
/**
 * @class
 * @extends {BaseField}
 */
export class SelectField extends BaseField {
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
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
        this.containerNode = new Item('div');
        this._drawSearchInput();
        this.listNode = new Item('div');
        this.listNode.addClass('options-list');
        this.containerNode.appendChild(this.listNode);
        this.popup = new Popup(this.containerNode, this.inputBlock);
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
        this.options = /** @type {!Collection<!Objekt>} */ new Collection();
        const optionNodes = new Query('option', this.input);
        optionNodes.each((optionNode) => {
            const value = optionNode.getAttribute('value') || '';
            const image = optionNode.getAttribute('data-image') || '';
            const item = optionNode.getAttribute('data-item') || {};
            const text = optionNode.getText() || '';
            const option = new Objekt({
                id: value,
                name: text,
                image: image,
                item: item,
            });
            option.setRaw('option_node', optionNode);
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
        this.iconNode = new Item('a');
        this.iconNode.setAttribute('href', 'javascript:void(0)');
        this.iconNode.addClass(['material-icons', 'size-24', 'expander']);
        this.iconNode.setHtml('expand_more');
        this.iconNode.addEventListener('click', () => {
            if (this.isEnabled()) {
                this.open();
            }
        });
        this.actionContainerNode.appendChild(this.iconNode);
        this.refresh();
    }
    /**
     * @override
     * @return {undefined}
     */
    refresh() {
        const selectContainerNode = new Query('.select-container', this.inputBlock).getItem();
        selectContainerNode.remove();
        if (this.isDisabled()) {
            this.inputBlock.addClass('is-disabled');
        }
        else {
            this.inputBlock.removeClass('is-disabled');
        }
        this.selectContainerNode = new Item('div');
        this.selectContainerNode.addClass('select-container');
        this.selectContainerNode.addEventListener('click', () => {
            if (this.isEnabled()) {
                this.open();
            }
        });
        this.input.insertAfter(this.selectContainerNode);
        this.selectNode = new Item('div');
        this.selectNode.addClass('select-input');
        this.selectContainerNode.appendChild(this.selectNode);
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
        this._setSelectedIds(/** @type {!Array} */ this.ids);
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
        this.iconNode.setHtml('refresh');
        this.iconNode.addClass('rotate');
    }
    /**
     * @private
     * @return {undefined}
     */
    _hideLoader() {
        this.iconNode.setHtml('expand_more');
        this.iconNode.removeClass('rotate');
    }
    /**
     * @param {!Array<!Objekt>} items
     * @param {string=} opt_value
     * @param {string=} opt_name
     * @param {string=} opt_image
     * @return {undefined}
     */
    setOptions(items, opt_value = 'value', opt_name = 'name', opt_image = '') {
        const optionNodes = new Query('option', this.input);
        optionNodes.each((optionNode) => {
            if (optionNode.getAttribute('value')) {
                optionNode.remove();
            }
        });
        each(items, (item) => {
            const value = item.get(opt_value);
            const name = item.get(opt_name);
            let image = '';
            if (opt_image) {
                image = item.get(opt_image);
            }
            const optionNode = new Item('option');
            optionNode.setAttribute('value', value);
            optionNode.setAttribute('data-image', image);
            optionNode.setAttribute('data-item', item);
            optionNode.setHtml(name);
            this.input.appendChild(optionNode);
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
     * @param {!Array} ids
     * @return {undefined}
     * @private
     */
    _setMultipleTag(ids) {
        const options = [];
        each(ids, (id) => {
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
     * @param {!Array|string} tags
     */
    _setTags(tags) {
        if (!isArray(tags)) {
            tags = [tags];
        }
        this.selectNode.removeChildren();
        each(tags, (tag) => {
            const tagNode = new Item('div');
            tagNode.addClass('field-tag');
            tagNode.setHtml(tag.get('name'));
            if (this.isEnabled()) {
                tagNode.addEventListener('click', () => {
                    this.open();
                });
            }
            this.selectNode.appendChild(tagNode);
            const id = tag.get('id');
            if (neq(id, '') && this.isEnabled()) {
                const iconNode = new Item('a');
                iconNode.setAttribute('href', 'javascript:void(0)');
                iconNode.addClass(['material-icons', 'size-18', 'close']);
                iconNode.setHtml('close');
                iconNode.addEventListener('click', () => {
                    this._handleSelectedId(id);
                });
                tagNode.addClass('tag-with-action');
                tagNode.appendChild(iconNode);
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
            const optionNode = option.get('option_node');
            const node = optionNode.getNode();
            if (selected) {
                node.setAttribute('selected', 'selected');
            }
            else {
                node.removeAttribute('selected');
            }
            node.selected = selected;
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
            const optionNode = option.get('option_node');
            const node = optionNode.getNode();
            if (node.selected) {
                const id = option.get('id');
                ids.push(id);
            }
        });
        return ids.length === 0 ? [''] : ids;
    }
    /**
     * @param {number} id
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
     * @param {!Array} items
     * @return {undefined}
     */
    _drawItems(items) {
        this.listNode.removeChildren();
        const ids = this._getSelectedIds();
        each(items, (item) => {
            const id = item.get('id');
            const listItem = new Item('a');
            listItem.setAttribute('href', 'javascript:void(0)');
            if (inArray(ids, id)) {
                listItem.addClass('selected');
            }
            listItem.addEventListener('click', () => {
                this._handleSelectedId(id);
            });
            this.listNode.appendChild(listItem);
            const image = item.get('image');
            if (image) {
                const imageNode = new Item('img');
                imageNode.setAttribute('src', image);
                listItem.appendChild(imageNode);
            }
            const name = item.get('name');
            const nameNode = new Item('span');
            nameNode.setHtml(name);
            listItem.appendChild(nameNode);
        });
    }
    /**
     * @private
     * @return {undefined}
     */
    _drawSearchInput() {
        const searchParentNode = new Item('div');
        searchParentNode.addClass('search-box');
        this.containerNode.appendChild(searchParentNode);
        const searchNode = new Item('div');
        searchNode.addClass(['mdl-textfield', 'mdl-js-textfield']);
        searchNode.addEventListener('click', () => {
            // empty function
        });
        searchParentNode.appendChild(searchNode);
        const id = generateId('select');
        this.searchInputNode = new Item('input');
        this.searchInputNode.setId(id);
        this.searchInputNode.setAttribute('type', 'text');
        this.searchInputNode.addClass('mdl-textfield__input');
        this.searchInputNode.addEventListener('keyup', (input) => {
            const node = input.getNode();
            this._search(node.value);
            return true;
        });
        searchNode.appendChild(this.searchInputNode);
        const labelNode = new Item('label');
        labelNode.setFor(id);
        labelNode.addClass('mdl-textfield__label');
        searchNode.appendChild(labelNode);
        mdl(searchNode);
    }
    /**
     * @return {undefined}
     */
    open() {
        this._search(this.query);
        this.popup.open();
        this.searchInputNode.getNode().focus();
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
        this.searchInputNode.getNode().value = query;
        this.searchInputNode.set('value', query);
        const regExp = new RegExp(query, 'i');
        const items = [];
        this.options.each((option) => {
            const name = option.get('name');
            if (regExp.test(name)) {
                items.push(option);
            }
        });
        this._drawItems(items);
    }
}
