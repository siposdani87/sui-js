import { BaseField } from './baseField';
import { Item } from '../core/item';
/**
 * @class
 * @extends {BaseField}
 */
export declare class BaseCheckboxField extends BaseField<HTMLInputElement> {
    hiddenInput: Item;
    spanLabel: Item;
    dataLabelNode: Item;
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(input: Item<HTMLInputElement>, label: Item, error: Item, inputBlock: Item);
    /**
     * @protected
     * @return {undefined}
     */
    protected _init(): void;
    /**
     * @protected
     * @return {undefined}
     */
    protected _change(): void;
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
    setValue(value: Object | Function | Array<any> | boolean | number | string | null | undefined): void;
    /**
     * @override
     * @param {boolean} state
     * @return {undefined}
     */
    setDisabled(state: boolean): void;
    /**
     * @override
     * @param {string} text
     * @return {undefined}
     */
    setLabel(text: string): void;
    /**
     * @override
     */
    refresh(): void;
}
