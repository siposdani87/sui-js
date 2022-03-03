import { BaseField } from './baseField';
import { Item } from '../core/item';
/**
 * @class
 * @extends {BaseField}
 */
export declare class TextareaField extends BaseField {
    richText: any;
    richTextNode: any;
    toolbarNode: Item;
    htmlMode: any;
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
     * @override
     * @return {undefined}
     */
    render(): void;
    /**
     * @return {undefined}
     */
    _renderRichText(): void;
    /**
     * @private
     * @return {boolean}
     */
    _isRichText(): boolean;
    /**
     * @private
     * @return {undefined}
     */
    _renderToolbarButtons(): void;
    /**
     * @private
     * @param {string} iconName
     * @param {!Function} action
     * @return {undefined}
     */
    _renderToolbarButton(iconName: any, action: any): void;
    /**
     * @private
     * @param {boolean} value
     * @return {undefined}
     */
    _setHtmlMode(value: any): void;
    /**
     * @private
     * @return {boolean}
     */
    _isHtmlMode(): boolean;
    /**
     * @private
     * @param {string} sCmd
     * @param {*=} opt_sValue
     * @return {undefined}
     */
    _formatDoc(sCmd: any, opt_sValue?: any): void;
    /**
     * @private
     * @param {boolean} _isHtmlMode
     * @return {undefined}
     */
    _setDocMode(_isHtmlMode: any): void;
    /**
     * @override
     */
    refresh(): void;
    /**
     * @private
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    _setValue(value: any): void;
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
}
