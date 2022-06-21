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
import { Item } from '../core/item';
import { Form } from './form';

/**
 * @constructor
 * @this {FormField}
 * @param {!Item} inputBlock
 * @param {!Form} form
 * @return {?BaseField}
 */
export const FormField = function (
    inputBlock: Item<HTMLInputElement | HTMLElement>,
    form: Form,
): BaseField<HTMLInputElement> | null {
    const { input, label, error } = parseInputBlock(inputBlock);

    return _convertToField(input, label, error, inputBlock, form);
};

/**
 * @param {!Item} inputBlock
 * @return {{input: Item, label: Item, error: Item}}
 */
export const parseInputBlock = (
    inputBlock: Item<HTMLInputElement | HTMLElement>,
): {
    input: Item<HTMLInputElement>;
    label: Item;
    error: Item;
} => {
    let input: Item<any> = inputBlock;
    let label = null;
    let error = null;

    let tagName = inputBlock.getTagName();

    const tagType = inputBlock.getAttribute('type');

    if (
        (eq(tagName, 'input') || eq(tagName, 'button')) &&
        !inArray(['hidden', 'reset', 'submit', 'button'], tagType)
    ) {
        inputBlock = inputBlock.getParentNode() as Item<any>;
    }

    tagName = inputBlock.getTagName();
    if (eq(tagName, 'div')) {
        const inputs = new Query<HTMLInputElement>(
            'input, textarea, select',
            inputBlock,
        ).getItems();

        input = inputs[inputs.length - 1];

        label = new Query('label', inputBlock).getItem();

        error = inputBlock.createElement('span');
        error.addClass(['mdl-textfield__error', 'text-truncate']);
        inputBlock.appendChild(error);

        inputBlock.addClass('init-field');
    }

    return {
        input,
        label,
        error,
    };
};

/**
 * @param {!Item} input
 * @param {?Item} label
 * @param {?Item} error
 * @param {!Item} inputBlock
 * @param {!Form} form
 * @return {?BaseField}
 */
const _convertToField = (
    input: Item<HTMLInputElement>,
    label: Item | null,
    error: Item | null,
    inputBlock: Item,
    form: Form,
): BaseField<HTMLInputElement> | null => {
    input.addClass('init-field');

    const dataType = input.getData('type');
    const tagName = input.getTagName();
    let result = null;
    if (eq(tagName, 'textarea')) {
        result = new TextareaField(input, label, error, inputBlock);
    }
    if (eq(tagName, 'select')) {
        result = new SelectField(input, label, error, inputBlock);
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
                        inputs.get(0),
                        label,
                        error,
                        inputBlock,
                        true,
                    );
                } else if (inputs.size() === 0) {
                    result = new DateTimeRangeField(
                        input,
                        label,
                        error,
                        inputBlock.getParentNode(),
                        false,
                    );
                } else if (inputs.size() === 1) {
                    result = new DateTimeField(input, label, error, inputBlock);
                }
                break;
            case 'file':
                result = new FileField(input, label, error, inputBlock);
                break;
            case 'checkbox':
                if (eq(dataType, 'switch')) {
                    result = new SwitchField(input, label, error, inputBlock);
                } else if (eq(dataType, 'icon-toggle')) {
                    result = new IconToggleField(
                        input,
                        label,
                        error,
                        inputBlock,
                    );
                } else {
                    result = new CheckboxField(input, label, error, inputBlock);
                }
                break;
            case 'radio':
                result = new RadiobuttonField(
                    input,
                    label,
                    error,
                    inputBlock,
                    form,
                );
                break;
            case 'range':
                result = new RangeField(input, label, error, inputBlock);
                break;
            case 'color':
                result = new ColorField(input, label, error, inputBlock);
                break;
            case 'hidden':
                result = new HiddenField(input);
                break;
            case 'number':
                result = new NumberField(input, label, error, inputBlock);
                break;
            case 'url':
                result = new UrlField(input, label, error, inputBlock);
                break;
            case 'search':
                result = new SearchField(input, label, error, inputBlock);
                break;
            case 'text':
                if (eq(dataType, 'location')) {
                    result = new LocationField(input, label, error, inputBlock);
                } else {
                    result = new TextField(input, label, error, inputBlock);
                }
                break;
            default:
                result = new TextField(input, label, error, inputBlock);
                break;
        }
    }
    return result;
};
