import { Knot } from '../core/knot';
import { BaseCheckboxField } from './baseCheckboxField';
/**
 * @class
 * @extends {BaseCheckbox}
 */
export declare class IconToggleField extends BaseCheckboxField {
    checkedIcon: string;
    uncheckedIcon: string;
    icon: Knot;
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * @override
     * @return {undefined}
     */
    render(): void;
    /**
     * @override
     * @protected
     * @return {undefined}
     */
    protected _change(): void;
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value: Object | Function | Array<any> | boolean | number | string | null | undefined): void;
}
