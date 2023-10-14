import { BaseField } from './baseField';
import { Popup } from '../component/popup';
import { DateTime } from '../component/dateTime';
import { Knot } from '../core/knot';
export declare class DateTimeRangeField extends BaseField<HTMLInputElement> {
    isStartInput: boolean;
    datetimeContainer: Knot;
    datetimeInput: Knot;
    format: string;
    datetimeKnot: Knot;
    datetime: DateTime;
    popup: Popup;
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot, isStartInput: boolean);
    private _init;
    private _initInput;
    render(): void;
    refresh(): void;
    setValue(value: Object | Function | Array<any> | boolean | number | string | null | undefined): void;
    private _setTag;
    private _onClick;
}
