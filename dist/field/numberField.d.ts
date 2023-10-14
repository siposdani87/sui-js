import { BaseField } from './baseField';
import { Knot } from '../core/knot';
export declare class NumberField extends BaseField<HTMLInputElement> {
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    private _init;
    private _initButtons;
    private _checkValue;
    private _getMax;
    private _getMin;
    private _getStep;
    render(): void;
    refresh(): void;
}
