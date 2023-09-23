import { eq, typeCast } from '../utils/operation';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { Tooltip } from '../component/tooltip';
import { consoleDebug } from '../utils/log';
import { Form } from '../component';

/**
 * @template {T}
 * @class
 */
export class BaseField<T extends HTMLInputElement> {
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
     * @param {!Knot} input
     * @param {!Knot=} opt_label
     * @param {!Knot=} opt_error
     * @param {!Knot=} opt_inputBlock
     * @param {!Form=} opt_form
     */
    constructor(
        input: Knot<T>,
        opt_label?: Knot | undefined,
        opt_error?: Knot | undefined,
        opt_inputBlock?: Knot | undefined,
        opt_form?: Form | undefined,
    ) {
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
    eventChange(value: any, previousValue: any) {
        consoleDebug('BaseField.eventChange()', value, previousValue);
    }
    /**
     * @param {!Knot} knot
     * @return {undefined}
     */
    eventClick(knot: Knot): void {
        consoleDebug('Button.eventClick()', knot);
    }
    /**
     * @return {undefined}
     */
    render(): void {
        consoleDebug('BaseField.render()');
    }
    /**
     * @return {undefined}
     */
    refresh(): void {
        consoleDebug('BaseField.refresh()');
    }
    /**
     * @param {*} value
     */
    modelChange(value: any) {
        consoleDebug('BaseField.modelChange()', value);
    }
    /**
     * @return {*}
     */
    getPreviousValue(): any {
        consoleDebug('BaseField.getPreviousValue()');
        return undefined;
    }
    /**
     * @return {string}
     */
    getName(): string {
        const name = this.input.getAttribute('name');
        return this._getAttributeName(name);
    }
    /**
     * @return {*}
     */
    getValue(): any {
        const value = this.input.getNode().value;
        return typeCast(value);
    }
    /**
     * @protected
     * @param {string} inputName
     * @return {string}
     */
    protected _getAttributeName(inputName: string): string {
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
    setError(
        opt_message: string | undefined = '',
        opt_isCustomError: boolean | undefined = false,
    ): void {
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
    checkValidity(
        opt_force: boolean | undefined = false,
        opt_showMessage: boolean | undefined = true,
    ): void {
        const isValid = this.isValid();
        if (isValid) {
            this.setError('');
        } else if (opt_showMessage) {
            this.setError(this.input.getNode().validationMessage);
        }
        const upgradedKnot = this._getUpgradedKnot();
        if (opt_force && upgradedKnot) {
            if (this.getValue()) {
                upgradedKnot.addClass('is-dirty');
            }
            if (isValid) {
                upgradedKnot.removeClass('is-invalid');
            } else {
                upgradedKnot.addClass('is-invalid');
            }
        }
    }
    /**
     * @return {boolean}
     */
    isValidityValid(): boolean {
        const inputNode = this.input.getNode();

        return inputNode.validity.valid;
    }
    /**
     * @return {boolean}
     */
    isValid(): boolean {
        return this.isValidityValid();
    }
    /**
     * @private
     * @return {!Knot}
     */
    private _getUpgradedKnot(): Knot {
        return this.inputBlock;
    }
    /**
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value?: any): void {
        this.input.getNode().value = value;
        this.input.setAttribute('value', value);
        this.input.trigger('change');
    }
    /**
     * @return {boolean}
     */
    exists(): boolean {
        return this.existsInputBlock() || this.existsInput();
    }
    /**
     * @return {boolean}
     */
    existsInput(): boolean {
        return !!this.input && this.input.exists();
    }
    /**
     * @return {boolean}
     */
    existsInputBlock(): boolean {
        return !!this.inputBlock && this.inputBlock.exists();
    }
    /**
     * @param {string} attribute
     * @return {*}
     */
    get(attribute: string): any {
        return this.input.get(attribute);
    }
    /**
     * @return {boolean}
     */
    isRequired(): boolean {
        return this.input.getNode().required;
    }
    /**
     * @param {boolean} state
     * @return {undefined}
     */
    setRequired(state: boolean): void {
        if (state) {
            this.input.setAttribute('required');
        } else {
            this.input.removeAttribute('required');
        }
        this.input.getNode().required = state;
        this.checkValidity(true, false);
        this._setAdditionalLabel(this.label);
    }
    /**
     * @return {boolean}
     */
    isEnabled(): boolean {
        return !this.isDisabled();
    }
    /**
     * @return {boolean}
     */
    isDisabled(): boolean {
        return this.input.getNode().disabled;
    }
    /**
     * @param {boolean} state
     * @return {undefined}
     */
    setDisabled(state: boolean): void {
        if (state) {
            this.input.setAttribute('disabled');
        } else {
            this.input.removeAttribute('disabled');
        }
        this.input.getNode().disabled = state;
        this.checkValidity(true, false);
    }
    /**
     * @return {boolean}
     */
    isVisible(): boolean {
        return !this.inputBlock.hasClass('hidden');
    }
    /**
     * @param {boolean} state
     * @return {undefined}
     */
    setVisibility(state: boolean): void {
        if (state) {
            this.show();
        } else {
            this.hide();
        }
    }
    /**
     * @return {undefined}
     */
    show(): void {
        if (!this.isVisible()) {
            this.inputBlock.removeClass('hidden');
        }
    }
    /**
     * @return {undefined}
     */
    hide(): void {
        if (this.isVisible()) {
            this.inputBlock.addClass('hidden');
        }
    }
    /**
     * @param {string} text
     * @return {undefined}
     */
    setLabel(text: string): void {
        if (this.label && !this.label.isEmpty()) {
            this.label.setHtml(text);
            this._setAdditionalLabel(this.label);
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    private _setInfoContainer(): void {
        if (this.inputBlock && !this.inputBlock.isEmpty()) {
            this.infoContainerKnot = new Query(
                '.info-container',
                this.inputBlock,
            ).getKnot();
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
    private _setActionContainer(): void {
        if (this.inputBlock && !this.inputBlock.isEmpty()) {
            this.actionContainerKnot = new Query(
                '.action-container',
                this.inputBlock,
            ).getKnot();
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
    private _setInfo(label: Knot): void {
        const title = label.getAttribute('title');
        const description = label.getAttribute('desc');
        if (title || description) {
            let infoButton = new Query(
                'a.info-button',
                this.infoContainerKnot,
            ).getKnot();
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
    protected _setAdditionalLabel(label: Knot | undefined): void {
        if (label?.exists()) {
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
    protected _getLabelRequiredText(labelText: string): string {
        if (eq(labelText, true)) {
            return '&nbsp;';
        }
        const requiredPostfix = ' *';
        const postfix = labelText.substring(
            labelText.length - requiredPostfix.length,
        );

        if (this.isRequired() && postfix !== requiredPostfix) {
            labelText += requiredPostfix;
        } else if (!this.isRequired() && postfix === requiredPostfix) {
            labelText = labelText.replace(requiredPostfix, '');
        }
        return labelText;
    }
    /**
     * @private
     * @return {undefined}
     */
    private _setMutation(): void {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.attributeName === 'disabled' || mutation.attributeName === 'required') {
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
