import { BaseField } from './baseField';
import { Item } from '../core/item';
/**
 * @class
 * @extends {BaseField}
 */
export declare class TextareaField extends BaseField {
    richText: Item;
    richTextNode: HTMLElement;
    toolbarNode: Item;
    htmlMode: boolean;
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
    _renderToolbarButton(iconName: string, action: Function): void;
    /**
     * @private
     * @param {boolean} value
     * @return {undefined}
     */
    _setHtmlMode(value: boolean): void;
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
    _formatDoc(sCmd: string, opt_sValue?: any | undefined): void;
    /**
     * @private
     * @param {boolean} _isHtmlMode
     * @return {undefined}
     */
    _setDocMode(_isHtmlMode: boolean): void;
    /**
     * @override
     */
    refresh(): void;
    /**
     * @private
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    _setValue(value: Object | Function | Array<any> | boolean | number | string | null | undefined): void;
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
}
