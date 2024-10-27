import {
    isArray,
    eq,
    format,
    neq,
    inArray,
    clear,
    remove,
    eachArray,
} from '../utils/operation';
import { BaseField } from './baseField';
import { Popup } from '../component/popup';
import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { generateId } from '../utils/coder';
import { mdl } from '../utils/render';

export class SelectField extends BaseField<HTMLInputElement> {
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

    constructor(
        input: Knot<HTMLInputElement>,
        label: Knot,
        error: Knot,
        inputBlock: Knot,
    ) {
        super(input, label, error, inputBlock);
        this._init();
    }

    private _init(): void {
        this.input.addClass('hidden');
        this.inputBlock.addClass('select-field');
        this.query = '';
        this.ids = [];

        this._initOptions();
        this._initChangeEvent();
        this._initPopup();
    }

    isMultiple(): boolean {
        return this.input.hasAttribute('multiple');
    }

    private _initPopup(): void {
        this.containerKnot = new Knot('div');
        this._drawSearchInput();

        this.listKnot = new Knot('div');
        this.listKnot.addClass('options-list');
        this.containerKnot.appendChild(this.listKnot);

        this.popup = new Popup(this.containerKnot, this.inputBlock);
    }

    private _initChangeEvent(): void {
        this.input.addEventListener('change', () => {
            this._change();
            return true;
        });
    }

    private _initOptions(): void {
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

    render(): void {
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

    refresh(): void {
        const selectContainerKnot = new Query(
            '.select-container',
            this.inputBlock,
        ).getKnot();
        selectContainerKnot.remove();

        if (this.isDisabled()) {
            this.inputBlock.addClass('is-disabled');
        } else {
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

    setValue(
        value:
            | object
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

    getValue(): any {
        let ids = this._getSelectedIds();
        ids = ids.filter((id) => {
            return !eq(id, '');
        });
        return this.isMultiple() ? ids : ids[0] || null;
    }

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

    showLoader(): void {
        this.iconKnot.setHtml('refresh');
        this.iconKnot.addClass('rotate');
    }

    private _hideLoader(): void {
        this.iconKnot.setHtml('expand_more');
        this.iconKnot.removeClass('rotate');
    }

    setOptions(
        items: Array<Objekt>,
        opt_value: string | undefined = 'value',
        opt_name: string | undefined = 'name',
        opt_image: string | undefined = '',
    ): void {
        const optionKnots = new Query('option', this.input);
        optionKnots.each((optionKnot) => {
            if (optionKnot.getAttribute('value')) {
                optionKnot.remove();
            }
        });

        eachArray(items, (item) => {
            const value = item.get<string>(opt_value);
            const name = item.get<string>(opt_name);
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

    private _change(): void {
        const ids = this._getSelectedIds();
        this._setSelectTags(ids);
        const value = this.getValue();
        this.modelChange(value);
    }

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

    private _setSimpleTag(id: string): void {
        const option = this.options.findById(id);
        this._setTags(option);
    }

    private _setMultipleTag(ids: Array<string>): void {
        const options = [];
        eachArray(ids, (id) => {
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

    private _setTags(tags: Array<Objekt> | Objekt) {
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

            const id = tag.get<string>('id');
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

    private _setSelectedIds(ids: Array<any>): void {
        this.options.each((option) => {
            const id = option.get('id');
            const selected = inArray(ids, id);
            const optionKnot =
                option.get<Knot<HTMLOptionElement>>('option_node');
            const optionNode = optionKnot.getNode();
            if (selected) {
                optionNode.setAttribute('selected', 'selected');
            } else {
                optionNode.removeAttribute('selected');
            }
            optionNode.selected = selected;
        });
        this._change();
    }

    private _getSelectedIds(): Array<any> {
        const ids = [];
        this.options.each((option) => {
            const optionKnot =
                option.get<Knot<HTMLOptionElement>>('option_node');
            const optionNode = optionKnot.getNode();
            if (optionNode.selected) {
                const id = option.get('id');
                ids.push(id);
            }
        });
        return ids.length === 0 ? [''] : ids;
    }

    private _handleSelectedId(id: string): void {
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

    private _drawKnots(items: Array<Objekt>): void {
        this.listKnot.removeChildren();
        const ids = this._getSelectedIds();
        eachArray(items, (item) => {
            const id = item.get<string>('id');
            const listKnot = new Knot('a');
            listKnot.setAttribute('href', 'javascript:void(0)');
            if (inArray(ids, id)) {
                listKnot.addClass('selected');
            }
            listKnot.addEventListener('click', () => {
                this._handleSelectedId(id);
            });
            this.listKnot.appendChild(listKnot);

            const image = item.get<string>('image');
            if (image) {
                const imageKnot = new Knot('img');
                imageKnot.setAttribute('src', image);
                listKnot.appendChild(imageKnot);
            }

            const name = item.get<string>('name');
            const nameKnot = new Knot('span');
            nameKnot.setHtml(name);
            listKnot.appendChild(nameKnot);
        });
    }

    private _drawSearchInput(): void {
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

        this.searchInputKnot = new Knot<HTMLInputElement>('input');
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

    open(): void {
        this._search(this.query);
        this.popup.open();
        this.searchInputKnot.getNode().focus();
    }

    close(): void {
        this.popup.close();
    }

    private _search(query: string): void {
        this.query = query;
        this.searchInputKnot.getNode().value = query;
        this.searchInputKnot.set('value', query);

        const regExp = new RegExp(query, 'i');
        const items: Objekt[] = [];
        this.options.each((option) => {
            const name = option.get<string>('name');
            if (regExp.test(name)) {
                items.push(option);
            }
        });
        this._drawKnots(items);
    }
}
