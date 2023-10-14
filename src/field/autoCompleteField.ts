import { Knot } from '../core';
import { BaseField } from './baseField';

export class AutoCompleteField extends BaseField<HTMLInputElement> {
    constructor(
        input: Knot<HTMLInputElement>,
        label: Knot,
        error: Knot,
        inputBlock: Knot,
    ) {
        super(input, label, error, inputBlock);
    }
}
