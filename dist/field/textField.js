import { BaseField } from './baseField';
/**
 * @description Standard text input field with SUI styling.
 * Extends {@link BaseField} with keyup and change event handling.
 * @category Field
 * @example
 * const textField = new TextField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 * textField.render();
 * textField.setValue('Hello world');
 * @see {@link BaseField}
 */
export class TextField extends BaseField {
    /**
     * @description Initializes the text field by adding the CSS class and binding keyup and change events.
     */
    _init() {
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
     * @description Renders the text field by applying SUI text field classes to the input block, input, and label.
     */
    render() {
        this._renderTextField();
        this.refresh();
    }
    /**
     * @description Refreshes the text field by updating the invalid state and re-applying SUI upgrades.
     */
    refresh() {
        this._refreshBase();
    }
    /**
     * @description Returns the raw string value of the input element without type-casting.
     * @returns {string} The input element's current value.
     */
    getValue() {
        return this.input.getNode().value;
    }
}
