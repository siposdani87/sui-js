/**
 * @class
 */
export declare class FormField {
    /**
     * @param {!Item} inputBlock
     * @param {!Form} form
     * @return {?BaseField}
     */
    constructor(inputBlock: any, form: any);
    /**
     * @param {!Item} input
     * @param {?Item} label
     * @param {?Item} error
     * @param {!Item} inputBlock
     * @param {!Form} form
     * @return {?BaseField}
     */
    _getField(input: any, label: any, error: any, inputBlock: any, form: any): any;
}
