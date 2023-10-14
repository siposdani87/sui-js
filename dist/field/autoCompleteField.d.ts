import { Knot } from '../core';
import { BaseField } from './baseField';
export declare class AutoCompleteField extends BaseField<HTMLInputElement> {
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
}
