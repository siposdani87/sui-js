import { BaseField } from './baseField';
import { Popup } from '../component/popup';
import { DateTime } from '../component/dateTime';
import { Knot } from '../core/knot';
/**
 * @class
 * @extends {BaseField}
 */
export declare class DateTimeRangeField extends BaseField<HTMLInputElement> {
    isStartInput: boolean;
    datetimeContainer: Knot;
    datetimeInput: Knot;
    format: string;
    datetimeKnot: Knot;
    datetime: DateTime;
    popup: Popup;
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
     * @param {boolean} isStartInput
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot, isStartInput: boolean);
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @private
     * @return {undefined}
     */
    private _initInput;
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
     * @private
     * @param {string} value
     * @return {undefined}
     */
    private _setTag;
    /**
     * @private
     * @return {undefined}
     */
    private _onClick;
}
