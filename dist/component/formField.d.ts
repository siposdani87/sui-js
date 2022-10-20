import { BaseField } from '../field/baseField';
import { Knot } from '../core/knot';
import { Form } from './form';
/**
 * @constructor
 * @this {FormField}
 * @param {!Knot} inputBlock
 * @param {!Form} form
 * @return {?BaseField}
 */
export declare const FormField: (this: any, inputBlock: Knot<HTMLInputElement | HTMLElement>, form: Form) => BaseField<HTMLInputElement> | null;
/**
 * @param {!Knot} inputBlock
 * @return {{input: Knot, label: Knot, error: Knot}}
 */
export declare const parseInputBlock: (inputBlock: Knot<HTMLInputElement | HTMLElement>) => {
    input: Knot<HTMLInputElement>;
    label: Knot;
    error: Knot;
};
