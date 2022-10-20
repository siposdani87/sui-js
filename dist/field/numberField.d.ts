import { BaseField } from './baseField';
import { Knot } from '../core/knot';
/**
 * @class
 * @extends {BaseField}
 */
export declare class NumberField extends BaseField<HTMLInputElement> {
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
     * @private
     * @return {undefined}
     */
    private _initButtons;
    /**
     * @private
     * @return {undefined}
     */
    private _checkValue;
    /**
     * @private
     * @return {number}
     */
    private _getMax;
    /**
     * @private
     * @return {number}
     */
    private _getMin;
    /**
     * @private
     * @return {number}
     */
    private _getStep;
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
