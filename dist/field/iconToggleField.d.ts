import { Knot } from '../core/knot';
import { BaseCheckboxField } from './baseCheckboxField';
export declare class IconToggleField extends BaseCheckboxField {
    checkedIcon: string;
    uncheckedIcon: string;
    icon: Knot;
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    render(): void;
    protected _change(): void;
    setValue(value: Object | Function | Array<any> | boolean | number | string | null | undefined): void;
}
