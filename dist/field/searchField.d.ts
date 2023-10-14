import { BaseField } from './baseField';
import { Knot } from '../core/knot';
export declare class SearchField extends BaseField<HTMLInputElement> {
    holderKnot: Knot;
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    private _init;
    render(): void;
    refresh(): void;
    private _initClearButton;
    eventEnter(value: string): void;
}
