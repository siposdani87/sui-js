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
 * @class
 */
export class FormField {
    /**
     */
    constructor() {
        // Rmpty constructor
    }
    /**
     * @param {!Item} inputBlock
     * @param {!Form} form
     * @return {?BaseField}
     */
    static handler(inputBlock: Item, form: Form): BaseField | null {
        let input = inputBlock;
        let label = null;
        let error = null;

        let selectedIndex = null;
        let tagName = inputBlock.getTagName();
        const tagType = inputBlock.getAttribute('type');
        if (
            eq(tagName, 'input') &&
            !inArray(['hidden', 'reset', 'submit', 'button'], tagType)
        ) {
            inputBlock = /** @type {!Item}*/ inputBlock.getParentNode();
            selectedIndex = 0;
        }
        tagName = inputBlock.getTagName();
        if (eq(tagName, 'div')) {
            const inputs = new Query(
                'input, textarea, select',
                inputBlock,
            ).getItems();
            const index =
                selectedIndex !== null
                    ? /** @type {number} */(selectedIndex)
                    : inputs.length - 1;
            input = inputs[index];

            label = new Query('label', inputBlock).getItem();

            error = inputBlock.createElement('span');
            error.addClass(['mdl-textfield__error', 'text-truncate']);
            inputBlock.appendChild(error);
            inputBlock.addClass('init-field');
        }

        return this._getField(input, label, error, inputBlock, form);
    }
    /**
     * @param {!Item} input
     * @param {?Item} label
     * @param {?Item} error
     * @param {!Item} inputBlock
     * @param {!Form} form
     * @return {?BaseField}
     */
    static _getField(
        input: Item,
        label: Item | null,
        error: Item | null,
        inputBlock: Item,
        form: Form,
    ): BaseField | null {
        input.addClass('init-field');
        const dataType = input.getData('type');
        const tagName = input.getTagName();
        let result = null;
        if (eq(tagName, 'textarea')) {
            result = new TextareaField(
                input,
                /** @type {!Item} */ label,
                /** @type {!Item} */ error,
                inputBlock,
            );
        }
        if (eq(tagName, 'select')) {
            result = new SelectField(
                input,
                /** @type {!Item} */ label,
                /** @type {!Item} */ error,
                inputBlock,
            );
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
                    const inputs = new Query('input', inputBlock);
                    if (inputs.size() === 2) {
                        let handledInput = /** @type {!Item} */ inputs.get(0);
                        let isStartInput = true;
                        if (
                            handledInput.getAttribute('name') ===
                            input.getAttribute('name')
                        ) {
                            handledInput = /** @type {!Item} */ inputs.get(1);
                            isStartInput = false;
                        }
                        result = new DateTimeRangeField(
                            handledInput,
                            /** @type {!Item} */ label,
                            /** @type {!Item} */ error,
                            inputBlock,
                            isStartInput,
                        );
                    } else {
                        result = new DateTimeField(
                            input,
                            /** @type {!Item} */ label,
                            /** @type {!Item} */ error,
                            inputBlock,
                        );
                    }
                    break;
                case 'file':
                    result = new FileField(
                        input,
                        /** @type {!Item} */ label,
                        /** @type {!Item} */ error,
                        inputBlock,
                    );
                    break;
                case 'checkbox':
                    if (eq(dataType, 'switch')) {
                        result = new SwitchField(
                            input,
                            /** @type {!Item} */ label,
                            /** @type {!Item} */ error,
                            inputBlock,
                        );
                    } else if (eq(dataType, 'icon-toggle')) {
                        result = new IconToggleField(
                            input,
                            /** @type {!Item} */ label,
                            /** @type {!Item} */ error,
                            inputBlock,
                        );
                    } else {
                        result = new CheckboxField(
                            input,
                            /** @type {!Item} */ label,
                            /** @type {!Item} */ error,
                            inputBlock,
                        );
                    }
                    break;
                case 'radio':
                    result = new RadiobuttonField(
                        input,
                        /** @type {!Item} */ label,
                        /** @type {!Item} */ error,
                        inputBlock,
                        form,
                    );
                    break;
                case 'range':
                    result = new RangeField(
                        input,
                        /** @type {!Item} */ label,
                        /** @type {!Item} */ error,
                        inputBlock,
                    );
                    break;
                case 'color':
                    result = new ColorField(
                        input,
                        /** @type {!Item} */ label,
                        /** @type {!Item} */ error,
                        inputBlock,
                    );
                    break;
                case 'hidden':
                    result = new HiddenField(input);
                    break;
                case 'number':
                    result = new NumberField(
                        input,
                        /** @type {!Item} */ label,
                        /** @type {!Item} */ error,
                        inputBlock,
                    );
                    break;
                case 'url':
                    result = new UrlField(
                        input,
                        /** @type {!Item} */ label,
                        /** @type {!Item} */ error,
                        inputBlock,
                    );
                    break;
                case 'search':
                    result = new SearchField(
                        input,
                        /** @type {!Item} */ label,
                        /** @type {!Item} */ error,
                        inputBlock,
                    );
                    break;
                case 'text':
                    if (eq(dataType, 'location')) {
                        result = new LocationField(
                            input,
                            /** @type {!Item} */ label,
                            /** @type {!Item} */ error,
                            inputBlock,
                        );
                    } else {
                        result = new TextField(
                            input,
                            /** @type {!Item} */ label,
                            /** @type {!Item} */ error,
                            inputBlock,
                        );
                    }
                    break;
                default:
                    result = new TextField(
                        input,
                        /** @type {!Item} */ label,
                        /** @type {!Item} */ error,
                        inputBlock,
                    );
                    break;
            }
        }
        return result;
    }
}
