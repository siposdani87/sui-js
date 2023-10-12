import { eq, typeCast } from '../utils/operation';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { Tooltip } from '../component/tooltip';
import { consoleDebug } from '../utils/log';
/**
 * @template {T}
 * @class
 */
export class BaseField {
    /**
     * @param {!Knot} input
     * @param {!Knot=} opt_label
     * @param {!Knot=} opt_error
     * @param {!Knot=} opt_inputBlock
     * @param {!Form=} opt_form
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
     * @param {*} value
     * @param {*} previousValue
     */
    eventChange(value, previousValue) {
        consoleDebug('BaseField.eventChange()', value, previousValue);
    }
    /**
     * @param {!Knot} knot
     * @return {undefined}
     */
    eventClick(knot) {
        consoleDebug('Button.eventClick()', knot);
    }
    /**
     * @return {undefined}
     */
    render() {
        consoleDebug('BaseField.render()');
    }
    /**
     * @return {undefined}
     */
    refresh() {
        consoleDebug('BaseField.refresh()');
    }
    /**
     * @param {*} value
     */
    modelChange(value) {
        consoleDebug('BaseField.modelChange()', value);
    }
    /**
     * @return {*}
     */
    getPreviousValue() {
        consoleDebug('BaseField.getPreviousValue()');
        return undefined;
    }
    /**
     * @return {string}
     */
    getName() {
        const name = this.input.getAttribute('name');
        return this._getAttributeName(name);
    }
    /**
     * @return {*}
     */
    getValue() {
        const value = this.input.getNode().value;
        return typeCast(value);
    }
    /**
     * @protected
     * @param {string} inputName
     * @return {string}
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
     * @param {string=} opt_message
     * @param {boolean=} opt_isCustomError
     * @return {undefined}
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
     * @param {boolean=} opt_force
     * @param {boolean=} opt_showMessage
     * @return {undefined}
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
     * @return {boolean}
     */
    isValidityValid() {
        const inputNode = this.input.getNode();
        return inputNode.validity.valid;
    }
    /**
     * @return {boolean}
     */
    isValid() {
        return this.isValidityValid();
    }
    /**
     * @private
     * @return {!Knot}
     */
    _getUpgradedKnot() {
        return this.inputBlock;
    }
    /**
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value) {
        this.input.getNode().value = value;
        this.input.setAttribute('value', value);
        this.input.trigger('change');
    }
    /**
     * @return {boolean}
     */
    exists() {
        return this.existsInputBlock() || this.existsInput();
    }
    /**
     * @return {boolean}
     */
    existsInput() {
        return !!this.input && this.input.exists();
    }
    /**
     * @return {boolean}
     */
    existsInputBlock() {
        return !!this.inputBlock && this.inputBlock.exists();
    }
    /**
     * @param {string} attribute
     * @return {*}
     */
    get(attribute) {
        return this.input.get(attribute);
    }
    /**
     * @return {boolean}
     */
    isRequired() {
        return this.input.getNode().required;
    }
    /**
     * @param {boolean} state
     * @return {undefined}
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
     * @return {boolean}
     */
    isEnabled() {
        return !this.isDisabled();
    }
    /**
     * @return {boolean}
     */
    isDisabled() {
        return this.input.getNode().disabled;
    }
    /**
     * @param {boolean} state
     * @return {undefined}
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
     * @return {boolean}
     */
    isVisible() {
        return !this.inputBlock.hasClass('hidden');
    }
    /**
     * @param {boolean} state
     * @return {undefined}
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
     * @return {undefined}
     */
    show() {
        if (!this.isVisible()) {
            this.inputBlock.removeClass('hidden');
        }
    }
    /**
     * @return {undefined}
     */
    hide() {
        if (this.isVisible()) {
            this.inputBlock.addClass('hidden');
        }
    }
    /**
     * @param {string} text
     * @return {undefined}
     */
    setLabel(text) {
        if (this.label && !this.label.isEmpty()) {
            this.label.setHtml(text);
            this._setAdditionalLabel(this.label);
        }
    }
    /**
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
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
     * @private
     * @param {!Knot} label
     * @return {undefined}
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
     * @protected
     * @param {!Knot|undefined} label
     * @return {undefined}
     */
    _setAdditionalLabel(label) {
        if (label === null || label === void 0 ? void 0 : label.exists()) {
            const labelText = this._getLabelRequiredText(label.getHtml(true));
            label.setHtml(labelText);
            this._setInfo(label);
        }
    }
    /**
     * @protected
     * @param {string} labelText
     * @return {string}
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
     * @private
     * @return {undefined}
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
