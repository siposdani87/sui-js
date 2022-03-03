import { BaseField } from './baseField';
/**
 * @class
 * @extends {BaseField}
 */
export declare class TextField extends BaseField {
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
     * @override
     * @return {undefined}
     */
    render(): void;
    /**
     * @override
     * @return {undefined}
     */
    refresh(): void;
    /**
     * @override
     * @return {*}
     */
    getValue(): any;
}
