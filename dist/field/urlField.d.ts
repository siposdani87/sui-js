import { BaseField } from './baseField';
import { Knot } from '../core/knot';
export declare class UrlField extends BaseField<HTMLInputElement> {
    protocol: string;
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    private _init;
    render(): void;
    refresh(): void;
}
