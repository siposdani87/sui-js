import { BaseField } from './baseField';
import { Popup } from '../component/popup';
import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
/**
 * @class
 * @extends {BaseField}
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
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @return {boolean}
     */
    isMultiple(): boolean;
    /**
     * @private
     * @return {undefined}
     */
    private _initPopup;
    /**
     * @private
     * @return {undefined}
     */
    private _initChangeEvent;
    /**
     * @private
     * @return {undefined}
     */
    private _initOptions;
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
    setValue(value: Object | Function | Array<any> | boolean | number | string | null | undefined): void;
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
    private _hideLoader;
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
    private _change;
    /**
     * @private
     * @param {!Array} ids
     * @return {undefined}
     */
    private _setSelectTags;
    /**
     * @param {string} id
     * @return {undefined}
     * @private
     */
    private _setSimpleTag;
    /**
     * @param {!Array<string>} ids
     * @return {undefined}
     * @private
     */
    private _setMultipleTag;
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
    private _setSelectedIds;
    /**
     * @private
     * @return {!Array}
     */
    private _getSelectedIds;
    /**
     * @param {number} id
     * @return {undefined}
     * @private
     */
    private _handleSelectedId;
    /**
     * @private
     * @param {!Array} items
     * @return {undefined}
     */
    private _drawKnots;
    /**
     * @private
     * @return {undefined}
     */
    private _drawSearchInput;
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
    private _search;
}
