import { Knot } from '../core/knot';
import { Tooltip } from '../component/tooltip';
import { Form } from '../component';
/**
 * @description Abstract base class for all form fields. Handles validation, labeling,
 * visibility, enable/disable state, and error display.
 * @category Field
 * @example
 * // Typically extended by concrete field classes:
 * const textField = new TextField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 * textField.setValue('Hello');
 * textField.checkValidity();
 * @see {@link Form}
 * @see {@link Tooltip}
 * @see {@link Knot}
 */
export declare class BaseField<T extends HTMLInputElement> {
    input: Knot<T>;
    label: Knot;
    error: Knot;
    inputBlock: Knot;
    form?: Form;
    errorTooltip: Tooltip;
    infoContainerKnot: Knot;
    actionContainerKnot: Knot;
    disabled: boolean;
    /**
     * @description Creates a new BaseField instance with the given input, label, error, and input block knots.
     * @param {Knot<T>} input - The input element wrapped in a Knot.
     * @param {Knot} [opt_label] - The label element wrapped in a Knot.
     * @param {Knot} [opt_error] - The error element wrapped in a Knot.
     * @param {Knot} [opt_inputBlock] - The input block container wrapped in a Knot.
     * @param {Form} [opt_form] - The parent form instance.
     */
    constructor(input: Knot<T>, opt_label?: Knot | undefined, opt_error?: Knot | undefined, opt_inputBlock?: Knot | undefined, opt_form?: Form | undefined);
    /**
     * @description Called when the field value changes. Override in subclasses to handle change events.
     * @param {*} value - The new field value.
     * @param {*} previousValue - The previous field value.
     * @example
     * field.eventChange = (value, previousValue) => {
     *     console.log('Changed from', previousValue, 'to', value);
     * };
     */
    eventChange(value: any, previousValue: any): void;
    /**
     * @description Called when the field is clicked. Override in subclasses to handle click events.
     * @param {Knot} knot - The clicked knot element.
     * @example
     * field.eventClick = (knot) => {
     *     console.log('Field clicked', knot);
     * };
     */
    eventClick(knot: Knot): void;
    /**
     * @description Renders the field's DOM structure and applies MDL styling. Override in subclasses to provide specific rendering.
     * @example
     * field.render();
     */
    render(): void;
    /**
     * @description Refreshes the field's visual state. Override in subclasses to update styling or re-apply MDL upgrades.
     * @example
     * field.refresh();
     */
    refresh(): void;
    /**
     * @description Called when the model value changes. Override to synchronize the field with an external data model.
     * @param {*} value - The new model value.
     * @example
     * field.modelChange = (value) => {
     *     model.set(field.getName(), value);
     * };
     */
    modelChange(value: any): void;
    /**
     * @description Returns the previous value of the field before the last change. Override in subclasses to track value history.
     * @returns {*} The previous field value, or undefined by default.
     * @example
     * const prev = field.getPreviousValue();
     */
    getPreviousValue(): any;
    /**
     * @description Returns the field's name derived from the input's name attribute, converted to dot notation.
     * @returns {string} The field name in dot notation (e.g., 'user.address.city').
     * @example
     * // For input with name="user[address][city]"
     * const name = field.getName(); // 'user.address.city'
     */
    getName(): string;
    /**
     * @description Returns the current value of the field, type-cast from the input's string value.
     * @returns {*} The type-cast field value.
     * @example
     * const value = field.getValue();
     */
    getValue(): any;
    /**
     * @description Converts an HTML input name attribute to dot notation by replacing brackets.
     * @param {string} inputName - The raw input name attribute value.
     * @returns {string} The name converted to dot notation.
     */
    protected _getAttributeName(inputName: string): string;
    /**
     * @description Sets or clears the validation error message on the field.
     * @param {string} [opt_message=''] - The error message to display, or empty string to clear.
     * @param {boolean} [opt_isCustomError=false] - Whether this is a custom (server-side) error.
     * @example
     * field.setError('This field is required');
     * field.setError(''); // clears the error
     */
    setError(opt_message?: string | undefined, opt_isCustomError?: boolean | undefined): void;
    /**
     * @description Checks the field's validity and optionally displays the validation message.
     * @param {boolean} [opt_force=false] - Whether to force visual validity updates on the input block.
     * @param {boolean} [opt_showMessage=true] - Whether to display the validation error message.
     * @example
     * field.checkValidity();
     * field.checkValidity(true, false); // force visual update, suppress message
     */
    checkValidity(opt_force?: boolean | undefined, opt_showMessage?: boolean | undefined): void;
    /**
     * @description Checks whether the input element's native validity state is valid.
     * @returns {boolean} True if the input's validity.valid property is true.
     * @example
     * if (field.isValidityValid()) {
     *     console.log('Native validation passed');
     * }
     */
    isValidityValid(): boolean;
    /**
     * @description Checks whether the field is valid. By default delegates to {@link isValidityValid}. Override for custom validation logic.
     * @returns {boolean} True if the field is valid.
     * @example
     * if (field.isValid()) {
     *     form.submit();
     * }
     */
    isValid(): boolean;
    /**
     * @description Returns the upgraded input block knot for MDL styling operations.
     * @returns {Knot} The input block knot.
     */
    private _getUpgradedKnot;
    /**
     * @description Sets the field's value on the underlying input element and triggers a change event.
     * @param {*} [value] - The value to set.
     * @example
     * field.setValue('new value');
     */
    setValue(value?: any): void;
    /**
     * @description Checks whether the field exists in the DOM (either the input block or the input itself).
     * @returns {boolean} True if the field exists.
     * @example
     * if (field.exists()) {
     *     field.render();
     * }
     */
    exists(): boolean;
    /**
     * @description Checks whether the input element exists in the DOM.
     * @returns {boolean} True if the input element exists.
     * @example
     * if (field.existsInput()) {
     *     field.setValue('value');
     * }
     */
    existsInput(): boolean;
    /**
     * @description Checks whether the input block container exists in the DOM.
     * @returns {boolean} True if the input block exists.
     * @example
     * if (field.existsInputBlock()) {
     *     field.show();
     * }
     */
    existsInputBlock(): boolean;
    /**
     * @description Gets an attribute value from the underlying input element.
     * @param {string} attribute - The attribute name to retrieve.
     * @returns {*} The attribute value.
     * @example
     * const type = field.get('type'); // 'text'
     */
    get(attribute: string): any;
    /**
     * @description Checks whether the field is required.
     * @returns {boolean} True if the field is required.
     * @example
     * if (field.isRequired()) {
     *     console.log('This field must be filled');
     * }
     */
    isRequired(): boolean;
    /**
     * @description Sets the required state of the field, updates validation, and refreshes the label.
     * @param {boolean} state - True to make the field required, false to make it optional.
     * @example
     * field.setRequired(true);
     */
    setRequired(state: boolean): void;
    /**
     * @description Checks whether the field is enabled.
     * @returns {boolean} True if the field is enabled (not disabled).
     * @example
     * if (field.isEnabled()) {
     *     field.setValue('enabled');
     * }
     */
    isEnabled(): boolean;
    /**
     * @description Checks whether the field is disabled.
     * @returns {boolean} True if the field is disabled.
     * @example
     * if (field.isDisabled()) {
     *     console.log('Field is disabled');
     * }
     */
    isDisabled(): boolean;
    /**
     * @description Sets the disabled state of the field and updates validation.
     * @param {boolean} state - True to disable the field, false to enable it.
     * @example
     * field.setDisabled(true);
     */
    setDisabled(state: boolean): void;
    /**
     * @description Checks whether the field is visible (not hidden).
     * @returns {boolean} True if the field is visible.
     * @example
     * if (field.isVisible()) {
     *     console.log('Field is shown');
     * }
     */
    isVisible(): boolean;
    /**
     * @description Sets the visibility of the field.
     * @param {boolean} state - True to show the field, false to hide it.
     * @example
     * field.setVisibility(false); // hides the field
     */
    setVisibility(state: boolean): void;
    /**
     * @description Shows the field if it is currently hidden.
     * @example
     * field.show();
     */
    show(): void;
    /**
     * @description Hides the field if it is currently visible.
     * @example
     * field.hide();
     */
    hide(): void;
    /**
     * @description Sets the label text and updates the additional label (required indicator, info tooltip).
     * @param {string} text - The new label text.
     * @example
     * field.setLabel('Email Address');
     */
    setLabel(text: string): void;
    /**
     * @description Initializes the info container knot within the input block.
     */
    private _setInfoContainer;
    /**
     * @description Initializes the action container knot within the input block.
     */
    private _setActionContainer;
    /**
     * @description Creates an info button with a tooltip from the label's title and desc attributes.
     * @param {Knot} label - The label knot containing title and desc attributes.
     */
    private _setInfo;
    /**
     * @description Updates the label text with a required indicator and sets up the info tooltip.
     * @param {Knot | undefined} label - The label knot to update.
     */
    protected _setAdditionalLabel(label: Knot | undefined): void;
    /**
     * @description Appends or removes the required asterisk (*) postfix from the label text.
     * @param {string} labelText - The current label text.
     * @returns {string} The label text with or without the required postfix.
     */
    protected _getLabelRequiredText(labelText: string): string;
    /**
     * @description Sets up a MutationObserver on the input to refresh the field when disabled or required attributes change.
     */
    private _setMutation;
}
