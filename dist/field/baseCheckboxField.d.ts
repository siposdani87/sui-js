import { BaseField } from './baseField';
import { Item } from '../core/item';
/**
 * @class
 * @extends {BaseField}
 */
export declare class BaseCheckboxField extends BaseField {
    hiddenInput: Item;
    spanLabel: Item;
    dataLabelNode: Item;
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(input: any, label: any, error: any, inputBlock: any);
    /**
     * @protected
     * @return {undefined}
     */
    _init(): void;
    /**
     * @protected
     * @return {undefined}
     */
    _change(): void;
    /**
     * @override
     * @return {*}
     */
    getValue(): any;
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value: any): void;
    /**
     * @override
     * @param {boolean} state
     * @return {undefined}
     */
    setDisabled(state: any): void;
    /**
     * @override
     * @param {string} text
     * @return {undefined}
     */
    setLabel(text: any): void;
    /**
     * @override
     */
    refresh(): void;
}
