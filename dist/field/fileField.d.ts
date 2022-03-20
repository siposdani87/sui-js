import { BaseField } from './baseField';
import { Item } from '../core/item';
/**
 * @class
 * @extends {BaseField}
 */
export declare class FileField extends BaseField {
    imageTag: Item;
    valueSrc: string;
    defaultSrc: string;
    removeButton: Item;
    fileTypes: {
        [key: string]: [string, string];
    };
    fileTypeSVG: string;
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(input: Item, label: Item, error: Item, inputBlock: Item);
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @private
     * @return {boolean}
     */
    private _isDocument;
    /**
     * @private
     * @return {undefined}
     */
    private _initDefaultImg;
    /**
     * @private
     * @return {undefined}
     */
    private _initValueSrc;
    /**
     * @private
     * @return {undefined}
     */
    private _initRemoveButton;
    /**
     * @private
     * @return {undefined}
     */
    private _initButtons;
    /**
     * @private
     * @param {string} mimeType
     * @return {!Array}
     */
    private _lookupByMimeType;
    /**
     * @private
     * @param {string} extension
     * @return {!Array}
     */
    private _lookupByExtension;
    /**
     * @private
     * @return {undefined}
     */
    private _initFileIcon;
    /**
     * @private
     * @param {string} type
     * @param {string} color
     * @return {string}
     */
    private _getFileIconSrc;
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
     * @private
     * @param {!File} file
     * @return {undefined}
     */
    private _read;
    /**
     * @private
     * @return {undefined}
     */
    private _handleRemoveButton;
    /**
     * @private
     * @return {undefined}
     */
    private _remove;
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value: Object | Function | Array<any> | boolean | number | string | null | undefined): void;
}
