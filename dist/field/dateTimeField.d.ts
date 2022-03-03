import { BaseField } from './baseField';
import { Popup } from '../component/popup';
import { Date } from '../component/date';
import { Item } from '../core/item';
/**
 * @class
 * @extends {BaseField}
 */
export declare class DateTimeField extends BaseField {
    datetimeContainer: Item;
    datetimeInput: Item;
    format: any;
    datetimeNode: Item;
    datetime: Date;
    popup: Popup;
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
    setValue(value: any): void;
    /**
     * @private
     * @param {string} value
     * @return {undefined}
     */
    _setTag(value: any): void;
    /**
     * @private
     * @return {undefined}
     */
    _onClick(): void;
}
