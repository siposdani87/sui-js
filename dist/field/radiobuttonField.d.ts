import { BaseField } from './baseField';
import { Item } from '../core/item';
import { Query } from '../core/query';
/**
 * @class
 * @extends {BaseField}
 */
export declare class RadiobuttonField extends BaseField {
    dataLabelNode: Item;
    spanLabel: Item;
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     * @param {!Form} form
     */
    constructor(input: any, label: any, error: any, inputBlock: any, form: any);
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @private
     * @return {undefined}
     */
    _change(): void;
    /**
     * @override
     * @return {undefined}
     */
    render(): void;
    /**
     * @override
     */
    refresh(): void;
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value: any): void;
    /**
     * @override
     * @return {*}
     */
    getValue(): any;
    /**
     * @override
     * @param {boolean} state
     * @return {undefined}
     */
    setDisabled(state: any): void;
    /**
     * @override
     * @return {boolean}
     */
    isDisabled(): boolean;
    /**
     * @return {!Query}
     */
    _getRadioButtonInputs(): Query;
    /**
     * @override
     * @param {string} text
     * @return {undefined}
     */
    setLabel(text: any): void;
}
