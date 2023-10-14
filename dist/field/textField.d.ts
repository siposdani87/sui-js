import { Knot } from '../core';
import { BaseField } from './baseField';
export declare class TextField extends BaseField<HTMLInputElement> {
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    private _init;
    render(): void;
    refresh(): void;
    getValue(): any;
}
