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
    ids: any[];
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
    constructor(input: any, label: any, error: any, inputBlock: any);
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @return {boolean}
     */
    isMultiple(): any;
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
    setValue(value: any): void;
    /**
     * @override
     * @return {*}
     */
    getValue(): any;
    /**
     * @param {string=} opt_attribute
     * @return {*}
     */
    getOptionValue(opt_attribute: any): any;
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
    setOptions(items: any, opt_value?: string, opt_name?: string, opt_image?: string): void;
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
    _setSelectTags(ids: any): void;
    /**
     * @param {string} id
     * @return {undefined}
     * @private
     */
    _setSimpleTag(id: any): void;
    /**
     * @param {!Array} ids
     * @return {undefined}
     * @private
     */
    _setMultipleTag(ids: any): void;
    /**
     * @private
     * @param {!Array|string} tags
     */
    _setTags(tags: any): void;
    /**
     * @private
     * @param {!Array} ids
     * @return {undefined}
     */
    _setSelectedIds(ids: any): void;
    /**
     * @private
     * @return {!Array}
     */
    _getSelectedIds(): any[];
    /**
     * @param {number} id
     * @return {undefined}
     * @private
     */
    _handleSelectedId(id: any): void;
    /**
     * @private
     * @param {!Array} items
     * @return {undefined}
     */
    _drawItems(items: any): void;
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
    _search(query: any): void;
}
