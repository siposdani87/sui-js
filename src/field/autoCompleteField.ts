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
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
    }
}
