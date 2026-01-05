import { BaseField } from './baseField';
import { Knot } from '../core/knot';
export declare class FileField extends BaseField<HTMLInputElement> {
    imageTag: Knot;
    valueSrc: string;
    defaultSrc: string;
    removeButton: Knot;
    fileTypes: {
        [key: string]: [string, string];
    };
    fileTypeSVG: string;
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    private _init;
    private _isDocument;
    private _initDefaultImg;
    private _initValueSrc;
    private _initRemoveButton;
    private _initButtons;
    private _lookupByMimeType;
    private _lookupByExtension;
    private _initFileIcon;
    private _getFileIconSrc;
    render(): void;
    refresh(): void;
    private _read;
    private _handleRemoveButton;
    private _remove;
    setValue(value: object | Function | Array<any> | boolean | number | string | null | undefined): void;
}
