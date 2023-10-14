import { Knot } from '../core';
import { BaseField } from './baseField';
export declare class Button extends BaseField<HTMLInputElement> {
    constructor(input: Knot<HTMLInputElement>);
    private _init;
    render(): void;
    refresh(): void;
}
