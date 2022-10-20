import { BaseField } from './baseField';
import { Knot } from '../core/knot';
/**
 * @class
 * @extends {BaseField}
 */
export declare class UrlField extends BaseField<HTMLInputElement> {
    protocol: string;
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @override
     * @return {undefined}
     */
    render(): void;
    /**
     * @override
     */
    refresh(): void;
}
