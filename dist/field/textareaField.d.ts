import { BaseField } from './baseField';
import { Knot } from '../core/knot';
/**
 * @class
 * @extends {BaseField}
 */
export declare class TextareaField extends BaseField<HTMLInputElement> {
    richText: Knot;
    richTextNode: HTMLElement;
    toolbarNode: Knot;
    htmlMode: boolean;
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @override
     * @return {undefined}
     */
    render(): void;
    /**
     * @return {undefined}
     */
    private _renderRichText;
    /**
     * @private
     * @return {boolean}
     */
    private _isRichText;
    /**
     * @private
     * @return {undefined}
     */
    private _renderToolbarButtons;
    /**
     * @private
     * @param {string} iconName
     * @param {!Function} action
     * @return {undefined}
     */
    private _renderToolbarButton;
    /**
     * @private
     * @param {boolean} value
     * @return {undefined}
     */
    private _setHtmlMode;
    /**
     * @private
     * @return {boolean}
     */
    private _isHtmlMode;
    /**
     * @private
     * @param {string} sCmd
     * @param {*=} opt_sValue
     * @return {undefined}
     */
    private _formatDoc;
    /**
     * @private
     * @param {boolean} _isHtmlMode
     * @return {undefined}
     */
    private _setDocMode;
    /**
     * @override
     */
    refresh(): void;
    /**
     * @private
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    private _setValue;
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
