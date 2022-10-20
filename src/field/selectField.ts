import {
    isArray,
    eq,
    format,
    each,
    neq,
    inArray,
    clear,
    remove,
} from '../utils/operation';
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
export class SelectField extends BaseField<HTMLInputElement> {
    query: string;
    ids: string[];
    containerNode: Knot;
    listNode: Knot;
    popup: Popup;
    options: Collection<Objekt>;
    iconNode: Knot;
    selectContainerNode: Knot;
    selectNode: Knot;
    searchInputNode: Knot<HTMLInputElement>;
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
     */
    constructor(
        input: Knot<HTMLInputElement>,
        label: Knot,
        error: Knot,
        inputBlock: Knot,
    ) {
        super(input, label, error, inputBlock);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
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
    isMultiple(): boolean {
        return this.input.hasAttribute('multiple');
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initPopup(): void {
        this.containerNode = new Knot('div');
        this._drawSearchInput();

        this.listNode = new Knot('div');
        this.listNode.addClass('options-list');
        this.containerNode.appendChild(this.listNode);

        this.popup = new Popup(this.containerNode, this.inputBlock);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initChangeEvent(): void {
        this.input.addEventListener('change', () => {
            this._change();
            return true;
        });
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initOptions(): void {
        this.options = new Collection();

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
    render(): void {
        if (this.label && this.label.exists()) {
            this.label.addClass('field-label');
        }

        this.iconNode = new Knot('a');
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
    refresh(): void {
        const selectContainerNode = new Query(
            '.select-container',
            this.inputBlock,
        ).getKnot();
        selectContainerNode.remove();

        if (this.isDisabled()) {
            this.inputBlock.addClass('is-disabled');
        } else {
            this.inputBlock.removeClass('is-disabled');
        }

        this.selectContainerNode = new Knot('div');
        this.selectContainerNode.addClass('select-container');
        this.selectContainerNode.addEventListener('click', () => {
            if (this.isEnabled()) {
                this.open();
            }
        });
        this.input.insertAfter(this.selectContainerNode);

        this.selectNode = new Knot('div');
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
    setValue(
        value:
            | Object
            | Function
            | Array<any>
            | boolean
            | number
            | string
            | null
            | undefined,
    ): void {
        this.ids = value as string[];
        if (!isArray(value)) {
            this.ids = [value as string];
        }
        this._setSelectedIds(this.ids);
    }
    /**
     * @override
     * @return {*}
     */
    getValue(): any {
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
    getOptionValue(opt_attribute?: string): any {
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
    showLoader(): void {
        this.iconNode.setHtml('refresh');
        this.iconNode.addClass('rotate');
    }
    /**
     * @private
     * @return {undefined}
     */
    private _hideLoader(): void {
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
    setOptions(
        items: Array<Objekt>,
        opt_value: string | undefined = 'value',
        opt_name: string | undefined = 'name',
        opt_image: string | undefined = '',
    ): void {
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
            const optionNode = new Knot('option');
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
    private _change(): void {
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
    private _setSelectTags(ids: Array<any>): void {
        if (this.isRequired() && ids.length === 1 && ids[0] === '') {
            this.inputBlock.addClass('is-invalid');
        }
        if (this.isMultiple()) {
            this._setMultipleTag(ids);
        } else {
            this._setSimpleTag(ids[0]);
        }
    }
    /**
     * @param {string} id
     * @return {undefined}
     * @private
     */
    private _setSimpleTag(id: string): void {
        const option = this.options.findById(id);
        this._setTags(option);
    }
    /**
     * @param {!Array<string>} ids
     * @return {undefined}
     * @private
     */
    private _setMultipleTag(ids: Array<string>): void {
        const options = [];
        each(ids, (id) => {
            const option = this.options.findById(id);
            if (option) {
                options.push(option);
            }
        });
        if (neq(options.length, 0)) {
            this._setTags(options);
        } else if (this.isRequired()) {
            const option = this.options.get(0);
            this._setTags(option);
        } else if (eq(ids.length, 0)) {
            this._setTags([]);
        }
    }
    /**
     * @private
     * @param {!Array<Objekt>|Objekt} tags
     */
    _setTags(tags: Array<Objekt> | Objekt) {
        if (!isArray(tags)) {
            tags = [tags as Objekt];
        }
        this.selectNode.removeChildren();

        each(tags, (tag) => {
            const tagNode = new Knot('div');
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
                const iconNode = new Knot('a');
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
    private _setSelectedIds(ids: Array<any>): void {
        this.options.each((option) => {
            const id = option.get('id');
            const selected = inArray(ids, id);
            const optionNode =
                option.get<Knot<HTMLOptionElement>>('option_node');
            const node = optionNode.getNode();
            if (selected) {
                node.setAttribute('selected', 'selected');
            } else {
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
    private _getSelectedIds(): Array<any> {
        const ids = [];
        this.options.each((option) => {
            const optionNode =
                option.get<Knot<HTMLOptionElement>>('option_node');
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
    private _handleSelectedId(id: number): void {
        let ids = this._getSelectedIds();
        if (this.isMultiple()) {
            if (eq(id, '') || eq(ids[0], '')) {
                clear(ids);
            }
            if (inArray(ids, id)) {
                remove(ids, id);
            } else {
                ids.push(id);
            }
            if (ids.length === 0) {
                ids = [''];
            }
        } else {
            if (inArray(ids, id)) {
                ids = [''];
            } else {
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
    private _drawKnots(items: Array<any>): void {
        this.listNode.removeChildren();
        const ids = this._getSelectedIds();
        each(items, (item) => {
            const id = item.get('id');
            const listKnot = new Knot('a');
            listKnot.setAttribute('href', 'javascript:void(0)');
            if (inArray(ids, id)) {
                listKnot.addClass('selected');
            }
            listKnot.addEventListener('click', () => {
                this._handleSelectedId(id);
            });
            this.listNode.appendChild(listKnot);

            const image = item.get('image');
            if (image) {
                const imageNode = new Knot('img');
                imageNode.setAttribute('src', image);
                listKnot.appendChild(imageNode);
            }

            const name = item.get('name');
            const nameNode = new Knot('span');
            nameNode.setHtml(name);
            listKnot.appendChild(nameNode);
        });
    }
    /**
     * @private
     * @return {undefined}
     */
    private _drawSearchInput(): void {
        const searchParentNode = new Knot('div');
        searchParentNode.addClass('search-box');
        this.containerNode.appendChild(searchParentNode);

        const searchNode = new Knot('div');
        searchNode.addClass(['mdl-textfield', 'mdl-js-textfield']);
        searchNode.addEventListener('click', () => {
            // empty function
        });
        searchParentNode.appendChild(searchNode);

        const id = generateId('select');

        this.searchInputNode = new Knot<HTMLInputElement>('input');
        this.searchInputNode.setId(id);
        this.searchInputNode.setAttribute('type', 'text');
        this.searchInputNode.addClass('mdl-textfield__input');
        this.searchInputNode.addEventListener('keyup', (input) => {
            const node = input.getNode();
            this._search(node.value);
            return true;
        });
        searchNode.appendChild(this.searchInputNode);

        const labelNode = new Knot('label');
        labelNode.setFor(id);
        labelNode.addClass('mdl-textfield__label');
        searchNode.appendChild(labelNode);

        mdl(searchNode);
    }
    /**
     * @return {undefined}
     */
    open(): void {
        this._search(this.query);
        this.popup.open();
        this.searchInputNode.getNode().focus();
    }
    /**
     * @return {undefined}
     */
    close(): void {
        this.popup.close();
    }
    /**
     * @private
     * @param {string} query
     * @return {undefined}
     */
    private _search(query: string): void {
        this.query = query;
        this.searchInputNode.getNode().value = query;
        this.searchInputNode.set('value', query);

        const regExp = new RegExp(query, 'i');
        const items = [];
        this.options.each((option) => {
            const name = option.get<string>('name');
            if (regExp.test(name)) {
                items.push(option);
            }
        });
        this._drawKnots(items);
    }
}
