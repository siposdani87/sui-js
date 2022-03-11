import { Item } from '../core';
import { BaseField } from './baseField';

/**
 * @class
 * @extends {BaseField}
 */
export class AutoCompleteField extends BaseField {
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(input: Item, label: Item, error: Item, inputBlock: Item) {
        super(input, label, error, inputBlock);
    }
}
