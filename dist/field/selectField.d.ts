import { BaseField } from './baseField';
import { Popup } from '../component/popup';
import { Collection } from '../core/collection';
import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
/**
 * @class
 * @extends {BaseField}
 */
export declare class SelectField extends BaseField {
    query: string;
    ids: string[];
    containerNode: Item;
    listNode: Item;
    popup: Popup;
    options: Collection<Objekt>;
    iconNode: Item;
    selectContainerNode: Item;
    selectNode: Item;
    searchInputNode: Item<HTMLInputElement>;
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(input: Item, label: Item, error: Item, inputBlock: Item);
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @return {boolean}
     */
    isMultiple(): boolean;
    /**
     * @private
     * @return {undefined}
     */
    _initPopup(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initChangeEvent(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initOptions(): void;
    /**
     * @override
     * @return {undefined}
     */
    render(): void;
    /**
     * @override
     * @return {undefined}
     */
    refresh(): void;
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value: object | Function | Array<any> | boolean | number | string | null | undefined): void;
    /**
     * @override
     * @return {*}
     */
    getValue(): any;
    /**
     * @param {string=} opt_attribute
     * @return {*}
     */
    getOptionValue(opt_attribute?: string): any;
    /**
     * @return {undefined}
     */
    showLoader(): void;
    /**
     * @private
     * @return {undefined}
     */
    _hideLoader(): void;
    /**
     * @param {!Array<!Objekt>} items
     * @param {string=} opt_value
     * @param {string=} opt_name
     * @param {string=} opt_image
     * @return {undefined}
     */
    setOptions(items: Array<Objekt>, opt_value?: string | undefined, opt_name?: string | undefined, opt_image?: string | undefined): void;
    /**
     * @private
     * @return {undefined}
     */
    _change(): void;
    /**
     * @private
     * @param {!Array} ids
     * @return {undefined}
     */
    _setSelectTags(ids: Array<any>): void;
    /**
     * @param {string} id
     * @return {undefined}
     * @private
     */
    _setSimpleTag(id: string): void;
    /**
     * @param {!Array<string>} ids
     * @return {undefined}
     * @private
     */
    _setMultipleTag(ids: Array<string>): void;
    /**
     * @private
     * @param {!Array<Objekt>|Objekt} tags
     */
    _setTags(tags: Array<Objekt> | Objekt): void;
    /**
     * @private
     * @param {!Array} ids
     * @return {undefined}
     */
    _setSelectedIds(ids: Array<any>): void;
    /**
     * @private
     * @return {!Array}
     */
    _getSelectedIds(): Array<any>;
    /**
     * @param {number} id
     * @return {undefined}
     * @private
     */
    _handleSelectedId(id: number): void;
    /**
     * @private
     * @param {!Array} items
     * @return {undefined}
     */
    _drawItems(items: Array<any>): void;
    /**
     * @private
     * @return {undefined}
     */
    _drawSearchInput(): void;
    /**
     * @return {undefined}
     */
    open(): void;
    /**
     * @return {undefined}
     */
    close(): void;
    /**
     * @private
     * @param {string} query
     * @return {undefined}
     */
    _search(query: string): void;
}
