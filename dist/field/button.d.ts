import { BaseField } from './baseField';
/**
 * @class
 * @extends {BaseField}
 */
export declare class Button extends BaseField {
    /**
     * @param {!Item} input
     */
    constructor(input: any);
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
     */
    refresh(): void;
}
