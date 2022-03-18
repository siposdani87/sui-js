import { BaseField } from './baseField';
import { Popup } from '../component/popup';
import { Date } from '../component/date';
import { Item } from '../core/item';
/**
 * @class
 * @extends {BaseField}
 */
export declare class DateTimeRangeField extends BaseField {
    isStartInput: boolean;
    datetimeContainer: Item;
    datetimeInput: Item;
    format: string;
    datetimeNode: Item;
    datetime: Date;
    popup: Popup;
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     * @param {boolean} isStartInput
     */
    constructor(input: Item, label: Item, error: Item, inputBlock: Item, isStartInput: boolean);
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initInput(): void;
    /**
     * @override
     * @return {undefined}
     */
    render(): void;
    /**
     * @override
     */
    refresh(): void;
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value: Object | Function | Array<any> | boolean | number | string | null | undefined): void;
    /**
     * @private
     * @param {string} value
     * @return {undefined}
     */
    _setTag(value: string): void;
    /**
     * @private
     * @return {undefined}
     */
    _onClick(): void;
}
