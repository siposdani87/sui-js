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
export declare const FormField: (this: any, inputBlock: Item<HTMLInputElement>, form: Form) => BaseField<HTMLInputElement> | null;
