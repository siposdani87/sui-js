import { BaseField } from './baseField';
import { Item } from '../core/item';
/**
 * @class
 * @extends {BaseField}
 */
export declare class NumberField extends BaseField {
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
     * @private
     * @return {undefined}
     */
    _initButtons(): void;
    /**
     * @private
     * @return {undefined}
     */
    _checkValue(): void;
    /**
     * @private
     * @return {number}
     */
    _getMax(): number;
    /**
     * @private
     * @return {number}
     */
    _getMin(): number;
    /**
     * @private
     * @return {number}
     */
    _getStep(): number;
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
