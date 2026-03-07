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
export declare class TextField extends BaseField<HTMLInputElement> {
    /**
     * @description Initializes the text field by adding the CSS class and binding keyup and change events.
     */
    protected _init(): void;
    /**
     * @description Renders the text field by applying SUI text field classes to the input block, input, and label.
     */
    render(): void;
    /**
     * @description Refreshes the text field by updating the invalid state and re-applying SUI upgrades.
     */
    refresh(): void;
    /**
     * @description Returns the raw string value of the input element without type-casting.
     * @returns {string} The input element's current value.
     */
    getValue(): string;
}
