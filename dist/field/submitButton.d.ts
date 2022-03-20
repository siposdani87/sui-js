import { Item } from '../core';
import { BaseField } from './baseField';
/**
 * @class
 * @extends {BaseField}
 */
export declare class SubmitButton extends BaseField {
    /**
     * @param {!Item} input
     */
    constructor(input: Item);
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
