import { BaseField } from './baseField';
import { Knot } from '../core/knot';
/**
 * @class
 * @extends {BaseField}
 */
export declare class BaseCheckboxField extends BaseField<HTMLInputElement> {
    hiddenInput: Knot;
    spanLabel: Knot;
    dataLabelNode: Knot;
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * @protected
     * @return {undefined}
     */
    protected _init(): void;
    /**
     * @protected
     * @return {undefined}
     */
    protected _change(): void;
    /**
     * @override
     * @return {*}
     */
    getValue(): any;
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value: Object | Function | Array<any> | boolean | number | string | null | undefined): void;
    /**
     * @override
     * @param {boolean} state
     * @return {undefined}
     */
    setDisabled(state: boolean): void;
    /**
     * @override
     * @param {string} text
     * @return {undefined}
     */
    setLabel(text: string): void;
    /**
     * @override
     */
    refresh(): void;
}
