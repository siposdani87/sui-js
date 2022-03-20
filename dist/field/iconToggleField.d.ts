import { Item } from '../core/item';
import { BaseCheckboxField } from './baseCheckboxField';
/**
 * @class
 * @extends {BaseCheckbox}
 */
export declare class IconToggleField extends BaseCheckboxField {
    checkedIcon: string;
    uncheckedIcon: string;
    icon: Item;
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(input: Item, label: Item, error: Item, inputBlock: Item);
    /**
     * @override
     * @return {undefined}
     */
    render(): void;
    /**
     * @override
     * @protected
     * @return {undefined}
     */
    protected _change(): void;
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value: Object | Function | Array<any> | boolean | number | string | null | undefined): void;
}
