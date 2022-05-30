import { BaseField } from '../field/baseField';
import { Item } from '../core/item';
import { Form } from './form';
/**
 * @constructor
 * @this {FormField}
 * @param {!Item} inputBlock
 * @param {!Form} form
 * @return {?BaseField}
 */
export declare const FormField: (this: any, inputBlock: Item<HTMLInputElement | HTMLElement>, form: Form) => BaseField<HTMLInputElement> | null;
/**
 * @param {!Item} inputBlock
 * @return {{input: Item, label: Item, error: Item}}
 */
export declare const parseInputBlock: (inputBlock: Item<HTMLInputElement | HTMLElement>) => {
    input: Item<HTMLInputElement>;
    label: Item;
    error: Item;
};
