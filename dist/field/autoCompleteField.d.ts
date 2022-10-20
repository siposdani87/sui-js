import { Knot } from '../core';
import { BaseField } from './baseField';
/**
 * @class
 * @extends {BaseField}
 */
export declare class AutoCompleteField extends BaseField<HTMLInputElement> {
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
}
