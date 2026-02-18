import { eq, typeCast } from '../utils/operation';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { Tooltip } from '../component/tooltip';
import { consoleDebug } from '../utils/log';
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
export class BaseField {
    /**
     * @description Creates a new BaseField instance with the given input, label, error, and input block knots.
     * @param {Knot<T>} input - The input element wrapped in a Knot.
     * @param {Knot} [opt_label] - The label element wrapped in a Knot.
     * @param {Knot} [opt_error] - The error element wrapped in a Knot.
     * @param {Knot} [opt_inputBlock] - The input block container wrapped in a Knot.
     * @param {Form} [opt_form] - The parent form instance.
     */
    constructor(input, opt_label, opt_error, opt_inputBlock, opt_form) {
        this.input = input;
        this.label = opt_label;
        this.error = opt_error;
        this.inputBlock = opt_inputBlock;
        this.form = opt_form;
        if (this.error) {
            this.errorTooltip = new Tooltip(this.error);
        }
        this._setInfoContainer();
        this._setActionContainer();
        this._setMutation();
        this._setAdditionalLabel(this.label);
    }
    /**
     * @description Called when the field value changes. Override in subclasses to handle change events.
     * @param {*} value - The new field value.
     * @param {*} previousValue - The previous field value.
     * @example
     * field.eventChange = (value, previousValue) => {
     *     console.log('Changed from', previousValue, 'to', value);
     * };
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eventChange(value, previousValue) {
        consoleDebug('BaseField.eventChange()', value, previousValue);
    }
    /**
     * @description Called when the field is clicked. Override in subclasses to handle click events.
     * @param {Knot} knot - The clicked knot element.
     * @example
     * field.eventClick = (knot) => {
     *     console.log('Field clicked', knot);
     * };
     */
    eventClick(knot) {
        consoleDebug('Button.eventClick()', knot);
    }
    /**
     * @description Renders the field's DOM structure and applies MDL styling. Override in subclasses to provide specific rendering.
     * @example
     * field.render();
     */
    render() {
        consoleDebug('BaseField.render()');
    }
    /**
     * @description Refreshes the field's visual state. Override in subclasses to update styling or re-apply MDL upgrades.
     * @example
     * field.refresh();
     */
    refresh() {
        consoleDebug('BaseField.refresh()');
    }
    /**
     * @description Called when the model value changes. Override to synchronize the field with an external data model.
     * @param {*} value - The new model value.
     * @example
     * field.modelChange = (value) => {
     *     model.set(field.getName(), value);
     * };
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    modelChange(value) {
        consoleDebug('BaseField.modelChange()', value);
    }
    /**
     * @description Returns the previous value of the field before the last change. Override in subclasses to track value history.
     * @returns {*} The previous field value, or undefined by default.
     * @example
     * const prev = field.getPreviousValue();
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getPreviousValue() {
        consoleDebug('BaseField.getPreviousValue()');
        return undefined;
    }
    /**
     * @description Returns the field's name derived from the input's name attribute, converted to dot notation.
     * @returns {string} The field name in dot notation (e.g., 'user.address.city').
     * @example
     * // For input with name="user[address][city]"
     * const name = field.getName(); // 'user.address.city'
     */
    getName() {
        const name = this.input.getAttribute('name');
        return this._getAttributeName(name);
    }
    /**
     * @description Returns the current value of the field, type-cast from the input's string value.
     * @returns {*} The type-cast field value.
     * @example
     * const value = field.getValue();
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getValue() {
        const value = this.input.getNode().value;
        return typeCast(value);
    }
    /**
     * @description Converts an HTML input name attribute to dot notation by replacing brackets.
     * @param {string} inputName - The raw input name attribute value.
     * @returns {string} The name converted to dot notation.
     */
    _getAttributeName(inputName) {
        let attribute = inputName || '';
        attribute = attribute.replace(/]/g, '');
        attribute = attribute.replace(/\[/g, '.');
        attribute = eq(attribute.slice(-1), '.')
            ? attribute.slice(0, -1)
            : attribute;
        return attribute;
    }
    /**
     * @description Sets or clears the validation error message on the field.
     * @param {string} [opt_message=''] - The error message to display, or empty string to clear.
     * @param {boolean} [opt_isCustomError=false] - Whether this is a custom (server-side) error.
     * @example
     * field.setError('This field is required');
     * field.setError(''); // clears the error
     */
    setError(opt_message = '', opt_isCustomError = false) {
        if (this.error) {
            this.errorTooltip.setMessage(opt_message);
            this.error.setHtml(opt_message);
            if (opt_message && opt_isCustomError && this.inputBlock) {
                this.inputBlock.addClass('is-invalid');
            }
        }
    }
    /**
     * @description Checks the field's validity and optionally displays the validation message.
     * @param {boolean} [opt_force=false] - Whether to force visual validity updates on the input block.
     * @param {boolean} [opt_showMessage=true] - Whether to display the validation error message.
     * @example
     * field.checkValidity();
     * field.checkValidity(true, false); // force visual update, suppress message
     */
    checkValidity(opt_force = false, opt_showMessage = true) {
        const isValid = this.isValid();
        if (isValid) {
            this.setError('');
        }
        else if (opt_showMessage) {
            this.setError(this.input.getNode().validationMessage);
        }
        const upgradedKnot = this._getUpgradedKnot();
        if (opt_force && upgradedKnot) {
            if (this.getValue()) {
                upgradedKnot.addClass('is-dirty');
            }
            if (isValid) {
                upgradedKnot.removeClass('is-invalid');
            }
            else {
                upgradedKnot.addClass('is-invalid');
            }
        }
    }
    /**
     * @description Checks whether the input element's native validity state is valid.
     * @returns {boolean} True if the input's validity.valid property is true.
     * @example
     * if (field.isValidityValid()) {
     *     console.log('Native validation passed');
     * }
     */
    isValidityValid() {
        const inputNode = this.input.getNode();
        return inputNode.validity.valid;
    }
    /**
     * @description Checks whether the field is valid. By default delegates to {@link isValidityValid}. Override for custom validation logic.
     * @returns {boolean} True if the field is valid.
     * @example
     * if (field.isValid()) {
     *     form.submit();
     * }
     */
    isValid() {
        return this.isValidityValid();
    }
    /**
     * @description Returns the upgraded input block knot for MDL styling operations.
     * @returns {Knot} The input block knot.
     */
    _getUpgradedKnot() {
        return this.inputBlock;
    }
    /**
     * @description Sets the field's value on the underlying input element and triggers a change event.
     * @param {*} [value] - The value to set.
     * @example
     * field.setValue('new value');
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue(value) {
        this.input.getNode().value = value;
        this.input.setAttribute('value', value);
        this.input.trigger('change');
    }
    /**
     * @description Checks whether the field exists in the DOM (either the input block or the input itself).
     * @returns {boolean} True if the field exists.
     * @example
     * if (field.exists()) {
     *     field.render();
     * }
     */
    exists() {
        return this.existsInputBlock() || this.existsInput();
    }
    /**
     * @description Checks whether the input element exists in the DOM.
     * @returns {boolean} True if the input element exists.
     * @example
     * if (field.existsInput()) {
     *     field.setValue('value');
     * }
     */
    existsInput() {
        return !!this.input && this.input.exists();
    }
    /**
     * @description Checks whether the input block container exists in the DOM.
     * @returns {boolean} True if the input block exists.
     * @example
     * if (field.existsInputBlock()) {
     *     field.show();
     * }
     */
    existsInputBlock() {
        return !!this.inputBlock && this.inputBlock.exists();
    }
    /**
     * @description Gets an attribute value from the underlying input element.
     * @param {string} attribute - The attribute name to retrieve.
     * @returns {*} The attribute value.
     * @example
     * const type = field.get('type'); // 'text'
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(attribute) {
        return this.input.get(attribute);
    }
    /**
     * @description Checks whether the field is required.
     * @returns {boolean} True if the field is required.
     * @example
     * if (field.isRequired()) {
     *     console.log('This field must be filled');
     * }
     */
    isRequired() {
        return this.input.getNode().required;
    }
    /**
     * @description Sets the required state of the field, updates validation, and refreshes the label.
     * @param {boolean} state - True to make the field required, false to make it optional.
     * @example
     * field.setRequired(true);
     */
    setRequired(state) {
        if (state) {
            this.input.setAttribute('required');
        }
        else {
            this.input.removeAttribute('required');
        }
        this.input.getNode().required = state;
        this.checkValidity(true, false);
        this._setAdditionalLabel(this.label);
    }
    /**
     * @description Checks whether the field is enabled.
     * @returns {boolean} True if the field is enabled (not disabled).
     * @example
     * if (field.isEnabled()) {
     *     field.setValue('enabled');
     * }
     */
    isEnabled() {
        return !this.isDisabled();
    }
    /**
     * @description Checks whether the field is disabled.
     * @returns {boolean} True if the field is disabled.
     * @example
     * if (field.isDisabled()) {
     *     console.log('Field is disabled');
     * }
     */
    isDisabled() {
        return this.input.getNode().disabled;
    }
    /**
     * @description Sets the disabled state of the field and updates validation.
     * @param {boolean} state - True to disable the field, false to enable it.
     * @example
     * field.setDisabled(true);
     */
    setDisabled(state) {
        if (state) {
            this.input.setAttribute('disabled');
        }
        else {
            this.input.removeAttribute('disabled');
        }
        this.input.getNode().disabled = state;
        this.checkValidity(true, false);
    }
    /**
     * @description Checks whether the field is visible (not hidden).
     * @returns {boolean} True if the field is visible.
     * @example
     * if (field.isVisible()) {
     *     console.log('Field is shown');
     * }
     */
    isVisible() {
        return !this.inputBlock.hasClass('hidden');
    }
    /**
     * @description Sets the visibility of the field.
     * @param {boolean} state - True to show the field, false to hide it.
     * @example
     * field.setVisibility(false); // hides the field
     */
    setVisibility(state) {
        if (state) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    /**
     * @description Shows the field if it is currently hidden.
     * @example
     * field.show();
     */
    show() {
        if (!this.isVisible()) {
            this.inputBlock.removeClass('hidden');
        }
    }
    /**
     * @description Hides the field if it is currently visible.
     * @example
     * field.hide();
     */
    hide() {
        if (this.isVisible()) {
            this.inputBlock.addClass('hidden');
        }
    }
    /**
     * @description Sets the label text and updates the additional label (required indicator, info tooltip).
     * @param {string} text - The new label text.
     * @example
     * field.setLabel('Email Address');
     */
    setLabel(text) {
        if (this.label && !this.label.isEmpty()) {
            this.label.setHtml(text);
            this._setAdditionalLabel(this.label);
        }
    }
    /**
     * @description Initializes the info container knot within the input block.
     */
    _setInfoContainer() {
        if (this.inputBlock && !this.inputBlock.isEmpty()) {
            this.infoContainerKnot = new Query('.info-container', this.inputBlock).getKnot();
            if (this.infoContainerKnot.isEmpty()) {
                this.infoContainerKnot = new Knot('div');
                this.infoContainerKnot.addClass(['info-container']);
                this.inputBlock.appendChild(this.infoContainerKnot);
            }
        }
    }
    /**
     * @description Initializes the action container knot within the input block.
     */
    _setActionContainer() {
        if (this.inputBlock && !this.inputBlock.isEmpty()) {
            this.actionContainerKnot = new Query('.action-container', this.inputBlock).getKnot();
            if (this.actionContainerKnot.isEmpty()) {
                this.actionContainerKnot = new Knot('div');
                this.actionContainerKnot.addClass(['action-container']);
                this.inputBlock.appendChild(this.actionContainerKnot);
            }
        }
    }
    /**
     * @description Creates an info button with a tooltip from the label's title and desc attributes.
     * @param {Knot} label - The label knot containing title and desc attributes.
     */
    _setInfo(label) {
        const title = label.getAttribute('title');
        const description = label.getAttribute('desc');
        if (title || description) {
            let infoButton = new Query('a.info-button', this.infoContainerKnot).getKnot();
            if (!infoButton.isEmpty()) {
                infoButton.remove();
            }
            infoButton = new Knot('a');
            infoButton.setAttribute('title', title || '');
            infoButton.setAttribute('desc', description || '');
            infoButton.setAttribute('href', 'javascript:void(0)');
            infoButton.addClass(['info-button', 'material-icons']);
            infoButton.setHtml('info');
            this.infoContainerKnot.appendChild(infoButton);
            const tooltip = new Tooltip(infoButton, 'LEFT');
            tooltip.render();
        }
    }
    /**
     * @description Updates the label text with a required indicator and sets up the info tooltip.
     * @param {Knot | undefined} label - The label knot to update.
     */
    _setAdditionalLabel(label) {
        if (label === null || label === void 0 ? void 0 : label.exists()) {
            const labelText = this._getLabelRequiredText(label.getHtml(true));
            label.setHtml(labelText);
            this._setInfo(label);
        }
    }
    /**
     * @description Appends or removes the required asterisk (*) postfix from the label text.
     * @param {string} labelText - The current label text.
     * @returns {string} The label text with or without the required postfix.
     */
    _getLabelRequiredText(labelText) {
        if (eq(labelText, true)) {
            return '&nbsp;';
        }
        const requiredPostfix = ' *';
        const postfix = labelText.substring(labelText.length - requiredPostfix.length);
        if (this.isRequired() && postfix !== requiredPostfix) {
            labelText += requiredPostfix;
        }
        else if (!this.isRequired() && postfix === requiredPostfix) {
            labelText = labelText.replace(requiredPostfix, '');
        }
        return labelText;
    }
    /**
     * @description Sets up a MutationObserver on the input to refresh the field when disabled or required attributes change.
     */
    _setMutation() {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.attributeName === 'disabled' ||
                    mutation.attributeName === 'required') {
                    this.refresh();
                }
            }
        });
        observer.observe(this.input.getNode(), {
            attributeFilter: ['disabled', 'required'],
            attributes: true,
            attributeOldValue: true,
        });
    }
}
