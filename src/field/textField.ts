import { Knot } from '../core';
import { mdl } from '../utils/render';
import { BaseField } from './baseField';

/**
 * @description Standard text input field with Material Design Lite styling.
 * Extends {@link BaseField} with keyup and change event handling.
 * @category Field
 * @example
 * const textField = new TextField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 * textField.render();
 * textField.setValue('Hello world');
 * @see {@link BaseField}
 */
export class TextField extends BaseField<HTMLInputElement> {
    /**
     * @description Creates a new TextField instance.
     * @param {Knot<HTMLInputElement>} input - The text input element wrapped in a Knot.
     * @param {Knot} label - The label element wrapped in a Knot.
     * @param {Knot} error - The error element wrapped in a Knot.
     * @param {Knot} inputBlock - The input block container wrapped in a Knot.
     */
    constructor(
        input: Knot<HTMLInputElement>,
        label: Knot,
        error: Knot,
        inputBlock: Knot,
    ) {
        super(input, label, error, inputBlock);
        this._init();
    }

    /**
     * @description Initializes the text field by adding the CSS class and binding keyup and change events.
     */
    private _init(): void {
        this.inputBlock.addClass('text-field');

        this.input.addEventListener('keyup', (input) => {
            const inputNode = input.getNode();
            this.modelChange(inputNode.value);
            return true;
        });

        this.input.addEventListener('change', (input) => {
            const inputNode = input.getNode();
            this.modelChange(inputNode.value);
            return true;
        });
    }

    /**
     * @description Renders the text field by applying MDL text field classes to the input block, input, and label.
     */
    override render(): void {
        this.inputBlock.addClass([
            'mdl-textfield',
            'mdl-js-textfield',
            'mdl-textfield--floating-label',
        ]);
        this.input.addClass(['mdl-textfield__input']);
        if (this.label && this.label.exists()) {
            this.label.addClass('mdl-textfield__label');
        }
        this.refresh();
    }

    /**
     * @description Refreshes the text field by updating the invalid state and re-applying MDL upgrades.
     */
    override refresh(): void {
        if (this.isRequired() && this.getValue() === '') {
            this.inputBlock.addClass('is-invalid');
        }

        mdl(this.inputBlock);
    }

    /**
     * @description Returns the raw string value of the input element without type-casting.
     * @returns {*} The input element's current value.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    override getValue(): any {
        return this.input.getNode().value;
    }
}
