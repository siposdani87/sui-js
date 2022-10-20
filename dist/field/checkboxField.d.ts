import { Knot } from '../core/knot';
import { BaseCheckboxField } from './baseCheckboxField';
/**
 * @class
 * @extends {BaseCheckbox}
 */
export declare class CheckboxField extends BaseCheckboxField {
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * @override
     * @return {undefined}
     */
    render(): void;
}
