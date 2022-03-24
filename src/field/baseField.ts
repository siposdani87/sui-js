import { eq, typeCast } from '../utils/operation';
import { Item } from '../core/item';
import { Query } from '../core/query';
import { Tooltip } from '../component/tooltip';
import { consoleInfo, consoleWarn } from '../utils/log';
import { Form } from '../component';

/**
 * @class
 */
export class BaseField {
    input: any;
    label: any;
    error: any;
    inputBlock: any;
    form?: Form;
    errorTooltip: Tooltip;
    infoContainerNode: Item;
    actionContainerNode: Item;
    disabled: boolean;
    /**
     * @param {!Item} input
     * @param {!Item=} opt_label
     * @param {!Item=} opt_error
     * @param {!Item=} opt_inputBlock
     * @param {!Form=} opt_form
     */
    constructor(
        input: Item,
        opt_label?: Item | undefined,
        opt_error?: Item | undefined,
        opt_inputBlock?: Item | undefined,
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
        consoleInfo('BaseField.eventChange()', value, previousValue);
    }
    /**
     * @param {!Item} node
     * @return {undefined}
     */
    eventClick(node: Item): void {
        consoleWarn('Button.eventClick()', node);
    }
    /**
     * @return {undefined}
     */
    render(): void {
        consoleWarn('BaseField.render()');
    }
    /**
     * @return {undefined}
     */
    refresh(): void {
        consoleWarn('BaseField.refresh()');
    }
    /**
     * @param {*} value
     */
    modelChange(value: any) {
        consoleWarn('BaseField.modelChange()', value);
    }
    /**
     * @return {*}
     */
    getPreviousValue(): any {
        consoleWarn('BaseField.getPreviousValue()');
        return undefined;
    }
    /**
     * @return {string}
     */
    getName(): string {
        const name = /** @type {string} */ this.input.getAttribute('name');
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
        const upgradedNode = this._getUpgradedNode();
        if (opt_force && upgradedNode) {
            if (this.getValue()) {
                upgradedNode.addClass('is-dirty');
            }
            if (isValid) {
                upgradedNode.removeClass('is-invalid');
            } else {
                upgradedNode.addClass('is-invalid');
            }
        }
    }
    /**
     * @return {boolean}
     */
    isValidityValid(): boolean {
        const node = this.input.getNode();
        return node.validity.valid;
    }
    /**
     * @return {boolean}
     */
    isValid(): boolean {
        return this.isValidityValid();
    }
    /**
     * @private
     * @return {!Item}
     */
    private _getUpgradedNode(): Item {
        return /** @type {!Item} */ this.inputBlock;
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
        if (attribute === 'model') {
            return this.getName();
        }
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
            this.infoContainerNode = new Query(
                '.info-container',
                this.inputBlock,
            ).getItem();
            if (this.infoContainerNode.isEmpty()) {
                this.infoContainerNode = new Item('div');
                this.infoContainerNode.addClass(['info-container']);
                this.inputBlock.appendChild(this.infoContainerNode);
            }
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    private _setActionContainer(): void {
        if (this.inputBlock && !this.inputBlock.isEmpty()) {
            this.actionContainerNode = new Query(
                '.action-container',
                this.inputBlock,
            ).getItem();
            if (this.actionContainerNode.isEmpty()) {
                this.actionContainerNode = new Item('div');
                this.actionContainerNode.addClass(['action-container']);
                this.inputBlock.appendChild(this.actionContainerNode);
            }
        }
    }
    /**
     * @private
     * @param {!Item} label
     * @return {undefined}
     */
    private _setInfo(label: Item): void {
        const title = /** @type {string} */ label.getAttribute('title');
        const description = /** @type {string} */ label.getAttribute('desc');
        if (title || description) {
            let infoButton = new Query(
                'a.info-button',
                this.infoContainerNode,
            ).getItem();
            if (!infoButton.isEmpty()) {
                infoButton.remove();
            }
            infoButton = new Item('a');
            infoButton.setAttribute('title', title || '');
            infoButton.setAttribute('desc', description || '');
            infoButton.setAttribute('href', 'javascript:void(0)');
            infoButton.addClass(['info-button', 'material-icons']);
            infoButton.setHtml('info_outline');
            this.infoContainerNode.appendChild(infoButton);
            const tooltip = new Tooltip(infoButton, 'LEFT');
            tooltip.render();
        }
    }
    /**
     * @protected
     * @param {!Item|undefined} label
     * @return {undefined}
     */
    protected _setAdditionalLabel(label: Item | undefined): void {
        if (label && label.exists()) {
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
            for (let i = 0; i < mutationsList.length; i++) {
                const mutation = mutationsList[i];
                if (mutation.attributeName === 'disabled') {
                    this.refresh();
                } else if (mutation.attributeName === 'required') {
                    this.refresh();
                }
            }
        });
        // observer.disconnect();
        observer.observe(this.input.getNode(), {
            attributeFilter: ['disabled', 'required'],
            attributes: true,
            attributeOldValue: true,
        });
    }
}
