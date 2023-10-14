import { BaseField } from './baseField';
import { Knot } from '../core/knot';
import { Form } from '../component';
export declare class RadiobuttonField extends BaseField<HTMLInputElement> {
    dataLabelKnot: Knot;
    spanLabel: Knot;
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot, form: Form);
    private _init;
    private _change;
    render(): void;
    refresh(): void;
    setValue(value: Object | Function | Array<any> | boolean | number | string | null | undefined): void;
    getValue(): any;
    setDisabled(state: boolean): void;
    isDisabled(): boolean;
    private _getRadioButtonInputs;
    setLabel(text: string): void;
}
