import { BaseField } from './baseField';
import { Item } from '../core/item';
/**
 * @class
 * @extends {BaseField}
 */
export declare class FileField extends BaseField {
    imageTag: any;
    valueSrc: any;
    defaultSrc: any;
    removeButton: Item;
    fileTypes: any;
    fileTypeSVG: string;
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(input: any, label: any, error: any, inputBlock: any);
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
    _lookupByMimeType(mimeType: any): any;
    /**
     * @private
     * @param {string} extension
     * @return {!Array}
     */
    _lookupByExtension(extension: any): any[];
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
    _getFileIconSrc(type: any, color: any): string;
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
     * @param {!Blob} file
     * @return {undefined}
     */
    _read(file: any): void;
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
    setValue(value: any): void;
}
