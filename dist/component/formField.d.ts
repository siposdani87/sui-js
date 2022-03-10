import { BaseField } from '../field/baseField';
import { Item } from '../core/item';
import { Form } from './form';
/**
 * @class
 */
export declare class FormField {
    /**
     */
    constructor();
    /**
     * @param {!Item} inputBlock
     * @param {!Form} form
     * @return {?BaseField}
     */
    static handler(inputBlock: Item, form: Form): BaseField | null;
    /**
     * @param {!Item} input
     * @param {?Item} label
     * @param {?Item} error
     * @param {!Item} inputBlock
     * @param {!Form} form
     * @return {?BaseField}
     */
    static _getField(input: Item, label: Item | null, error: Item | null, inputBlock: Item, form: Form): BaseField | null;
}
