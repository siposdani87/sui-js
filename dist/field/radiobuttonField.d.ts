import { BaseField } from './baseField';
import { Knot } from '../core/knot';
import { Form } from '../component';
/**
 * @class
 * @extends {BaseField}
 */
export declare class RadiobuttonField extends BaseField<HTMLInputElement> {
    dataLabelKnot: Knot;
    spanLabel: Knot;
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
     * @param {!Form} form
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot, form: Form);
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @private
     * @return {undefined}
     */
    private _change;
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
    setValue(value: Object | Function | Array<any> | boolean | number | string | null | undefined): void;
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
    setDisabled(state: boolean): void;
    /**
     * @override
     * @return {boolean}
     */
    isDisabled(): boolean;
    /**
     * @return {!Query}
     */
    private _getRadioButtonInputs;
    /**
     * @override
     * @param {string} text
     * @return {undefined}
     */
    setLabel(text: string): void;
}
