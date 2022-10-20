import { BaseField } from './baseField';
/**
 * @class
 * @extends {BaseField}
 */
export class AutoCompleteField extends BaseField {
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
     */
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
    }
}
