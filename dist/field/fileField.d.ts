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
    _init(): void;
    /**
     * @private
     * @return {boolean}
     */
    _isDocument(): boolean;
    /**
     * @private
     * @return {undefined}
     */
    _initDefaultImg(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initValueSrc(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initRemoveButton(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initButtons(): void;
    /**
     * @private
     * @param {string} mimeType
     * @return {!Array}
     */
    _lookupByMimeType(mimeType: string): Array<any>;
    /**
     * @private
     * @param {string} extension
     * @return {!Array}
     */
    _lookupByExtension(extension: string): Array<any>;
    /**
     * @private
     * @return {undefined}
     */
    _initFileIcon(): void;
    /**
     * @private
     * @param {string} type
     * @param {string} color
     * @return {string}
     */
    _getFileIconSrc(type: string, color: string): string;
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
    _read(file: File): void;
    /**
     * @private
     * @return {undefined}
     */
    _handleRemoveButton(): void;
    /**
     * @private
     * @return {undefined}
     */
    _remove(): void;
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value: object | Function | Array<any> | boolean | number | string | null | undefined): void;
}
