import { BaseField } from './baseField';
import { Tooltip } from '../component/tooltip';
import { Knot } from '../core';
export declare class RangeField extends BaseField<HTMLInputElement> {
    tooltip: Tooltip;
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    private _init;
    render(): void;
    refresh(): void;
    setValue(value: object | Function | Array<any> | boolean | number | string | null | undefined): void;
}
