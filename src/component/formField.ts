import { eq, inArray } from '../utils/operation';
import { Query } from '../core/query';
import { Button } from '../field/button';
import { CheckboxField } from '../field/checkboxField';
import { ColorField } from '../field/colorField';
import { DateTimeField } from '../field/dateTimeField';
import { DateTimeRangeField } from '../field/dateTimeRangeField';
import { HiddenField } from '../field/hiddenField';
import { IconToggleField } from '../field/iconToggleField';
import { RadiobuttonField } from '../field/radiobuttonField';
import { ResetButton } from '../field/resetButton';
import { SearchField } from '../field/searchField';
import { SelectField } from '../field/selectField';
import { SubmitButton } from '../field/submitButton';
import { SwitchField } from '../field/switchField';
import { TextareaField } from '../field/textareaField';
import { UrlField } from '../field/urlField';
import { FileField } from '../field/fileField';
import { RangeField } from '../field/rangeField';
import { NumberField } from '../field/numberField';
import { LocationField } from '../field/locationField';
import { TextField } from '../field/textField';
import { BaseField } from '../field/baseField';
import { Knot } from '../core/knot';
import { Form } from './form';

/**
 * @description Factory function that detects an input element's type and creates the
 * appropriate {@link BaseField} subclass instance. Supports all standard HTML input types
 * plus custom data-type attributes for location, switch, and icon-toggle fields.
 *
 * @param {Knot} inputBlock - The input block DOM element (may be the input itself or its wrapper div).
 * @param {Form} form - The parent form instance, used for radio button grouping.
 * @returns {BaseField | null} The created field instance, or null if the input type is unrecognized.
 *
 * @example
 * const field = FormField(inputBlockKnot, formInstance);
 * if (field) { field.render(); }
 *
 * @see {@link Form} for the form component that uses this factory
 * @see {@link BaseField} for the base class all fields extend
 *
 * @category Component
 */
export const FormField = function (
    inputBlock: Knot<HTMLInputElement | HTMLElement>,
    form: Form,
): BaseField<HTMLInputElement> | null {
    const { input, label, error } = parseInputBlock(inputBlock);

    return _convertToField(input, label, error, inputBlock, form);
};

/**
 * @description Extracts the input, label, and error elements from a form input block.
 * Handles both raw input elements and wrapper div structures, creating error spans as needed.
 *
 * @param {Knot} inputBlock - The input block DOM element to parse.
 * @returns {{ input: Knot, label: Knot | undefined, error: Knot | undefined }} The extracted input, label, and error elements.
 *
 * @example
 * const { input, label, error } = parseInputBlock(inputBlockKnot);
 *
 * @see {@link FormField} for the factory that calls this function
 *
 * @category Component
 */
export const parseInputBlock = (
    inputBlock: Knot<HTMLInputElement | HTMLElement>,
): {
    input: Knot<HTMLInputElement>;
    label: Knot | undefined;
    error: Knot | undefined;
} => {
    let input: Knot<HTMLElement> = inputBlock;
    let label: Knot | undefined = undefined;
    let error: Knot | undefined = undefined;

    let tagName = inputBlock.getTagName();

    const tagType = inputBlock.getAttribute('type');

    if (
        (eq(tagName, 'input') || eq(tagName, 'button')) &&
        !inArray(['hidden', 'reset', 'submit', 'button'], tagType)
    ) {
        inputBlock = inputBlock.getParentKnot() as Knot<HTMLElement>;
    }

    tagName = inputBlock.getTagName();
    if (eq(tagName, 'div')) {
        const inputs = new Query<HTMLInputElement>(
            'input, textarea, select',
            inputBlock,
        ).getItems();

        input = inputs[inputs.length - 1];

        label = new Query('label', inputBlock).getKnot();

        error = inputBlock.createElement('span');
        error.addClass(['mdl-textfield__error', 'text-truncate']);
        inputBlock.appendChild(error);

        inputBlock.addClass('init-field');
    }

    return {
        input: input as Knot<HTMLInputElement>,
        label,
        error,
    };
};

/**
 * @description Converts a parsed input element into the appropriate field class based on tag name and input type.
 * @param {Knot} input - The input element.
 * @param {Knot | undefined} label - The associated label element.
 * @param {Knot | undefined} error - The associated error span element.
 * @param {Knot} inputBlock - The wrapper block element.
 * @param {Form} form - The parent form instance.
 * @returns {BaseField | null} The created field instance, or null.
 */
const _convertToField = (
    input: Knot<HTMLInputElement>,
    label: Knot | undefined,
    error: Knot | undefined,
    inputBlock: Knot,
    form: Form,
): BaseField<HTMLInputElement> | null => {
    input.addClass('init-field');

    const dataType = input.getData('type');
    const tagName = input.getTagName();
    let result = null;
    if (eq(tagName, 'textarea')) {
        result = new TextareaField(input, label!, error!, inputBlock);
    }
    if (eq(tagName, 'select')) {
        result = new SelectField(input, label!, error!, inputBlock);
    } else if (eq(tagName, 'input') || eq(tagName, 'button')) {
        const type = input.get('type');
        switch (type) {
            case 'submit':
                result = new SubmitButton(input);
                break;
            case 'button':
                result = new Button(input);
                break;
            case 'reset':
                result = new ResetButton(input);
                break;
            case 'datetime':
            case 'datetime-local':
            case 'date':
            case 'time':
            case 'month':
            case 'week':
            case 'year':
                const inputs = new Query<HTMLInputElement>('input', inputBlock);
                if (inputs.size() === 2) {
                    result = new DateTimeRangeField(
                        inputs.get(0)!,
                        label!,
                        error!,
                        inputBlock,
                        true,
                    );
                } else if (inputs.size() === 0) {
                    result = new DateTimeRangeField(
                        input,
                        label!,
                        error!,
                        inputBlock.getParentKnot()!,
                        false,
                    );
                } else if (inputs.size() === 1) {
                    result = new DateTimeField(
                        input,
                        label!,
                        error!,
                        inputBlock,
                    );
                }
                break;
            case 'file':
                result = new FileField(input, label!, error!, inputBlock);
                break;
            case 'checkbox':
                if (eq(dataType, 'switch')) {
                    result = new SwitchField(input, label!, error!, inputBlock);
                } else if (eq(dataType, 'icon-toggle')) {
                    result = new IconToggleField(
                        input,
                        label!,
                        error!,
                        inputBlock,
                    );
                } else {
                    result = new CheckboxField(
                        input,
                        label!,
                        error!,
                        inputBlock,
                    );
                }
                break;
            case 'radio':
                result = new RadiobuttonField(
                    input,
                    label!,
                    error!,
                    inputBlock,
                    form,
                );
                break;
            case 'range':
                result = new RangeField(input, label!, error!, inputBlock);
                break;
            case 'color':
                result = new ColorField(input, label!, error!, inputBlock);
                break;
            case 'hidden':
                result = new HiddenField(input);
                break;
            case 'number':
                result = new NumberField(input, label!, error!, inputBlock);
                break;
            case 'url':
                result = new UrlField(input, label!, error!, inputBlock);
                break;
            case 'search':
                result = new SearchField(input, label!, error!, inputBlock);
                break;
            case 'text':
                if (eq(dataType, 'location')) {
                    result = new LocationField(
                        input,
                        label!,
                        error!,
                        inputBlock,
                    );
                } else {
                    result = new TextField(input, label!, error!, inputBlock);
                }
                break;
            default:
                result = new TextField(input, label!, error!, inputBlock);
                break;
        }
    }
    return result;
};
