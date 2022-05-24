import { Item } from '../core';
import { BaseField } from './baseField';
/**
 * @class
 * @extends {BaseField}
 */
export declare class TextField extends BaseField<HTMLInputElement> {
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
     * @return {undefined}
     */
    refresh(): void;
    /**
     * @override
     * @return {*}
     */
    getValue(): any;
}
