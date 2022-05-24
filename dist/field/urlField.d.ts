import { BaseField } from './baseField';
import { Item } from '../core/item';
/**
 * @class
 * @extends {BaseField}
 */
export declare class UrlField extends BaseField<HTMLInputElement> {
    protocol: string;
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(input: Item<HTMLInputElement>, label: Item, error: Item, inputBlock: Item);
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @override
     * @return {undefined}
     */
    render(): void;
    /**
     * @override
     */
    refresh(): void;
}
