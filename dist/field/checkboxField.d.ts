import { Knot } from '../core/knot';
import { BaseCheckboxField } from './baseCheckboxField';
export declare class CheckboxField extends BaseCheckboxField {
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    render(): void;
}
