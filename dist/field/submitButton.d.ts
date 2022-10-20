import { Knot } from '../core';
import { BaseField } from './baseField';
/**
 * @class
 * @extends {BaseField}
 */
export declare class SubmitButton extends BaseField<HTMLInputElement> {
    /**
     * @param {!Knot} input
     */
    constructor(input: Knot<HTMLInputElement>);
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
