import { BaseField } from '../field/baseField';
import { Knot } from '../core/knot';
import { Form } from './form';
export declare const FormField: (inputBlock: Knot<HTMLInputElement | HTMLElement>, form: Form) => BaseField<HTMLInputElement> | null;
export declare const parseInputBlock: (inputBlock: Knot<HTMLInputElement | HTMLElement>) => {
    input: Knot<HTMLInputElement>;
    label: Knot;
    error: Knot;
};
