import { BaseField } from './baseField';
import { Knot } from '../core/knot';
export declare class BaseCheckboxField extends BaseField<HTMLInputElement> {
    hiddenInput: Knot;
    spanLabel: Knot;
    dataLabelKnot: Knot;
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    protected _init(): void;
    protected _change(): void;
    getValue(): any;
    setValue(value: Object | Function | Array<any> | boolean | number | string | null | undefined): void;
    setDisabled(state: boolean): void;
    setLabel(text: string): void;
    refresh(): void;
}
