import { BaseField } from './baseField';
/**
 * @class
 * @extends {BaseField}
 */
export declare class NumberField extends BaseField {
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(input: any, label: any, error: any, inputBlock: any);
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initButtons(): void;
    /**
     * @private
     * @return {undefined}
     */
    _checkValue(): void;
    /**
     * @private
     * @return {number}
     */
    _getMax(): any;
    /**
     * @private
     * @return {number}
     */
    _getMin(): any;
    /**
     * @private
     * @return {number}
     */
    _getStep(): any;
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
