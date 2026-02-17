import { eq, typeCast } from '../utils/operation';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { Tooltip } from '../component/tooltip';
import { consoleDebug } from '../utils/log';
import { Form } from '../component';

export class BaseField<T extends HTMLInputElement> {
    input: Knot<T>;
    label: Knot;
    error: Knot;
    inputBlock: Knot;
    form?: Form;
    errorTooltip!: Tooltip;
    infoContainerKnot!: Knot;
    actionContainerKnot!: Knot;
    disabled!: boolean;

    constructor(
        input: Knot<T>,
        opt_label?: Knot | undefined,
        opt_error?: Knot | undefined,
        opt_inputBlock?: Knot | undefined,
        opt_form?: Form | undefined,
    ) {
        this.input = input;
        this.label = opt_label!;
        this.error = opt_error!;
        this.inputBlock = opt_inputBlock!;
        this.form = opt_form;

        if (this.error) {
            this.errorTooltip = new Tooltip(this.error);
        }

        this._setInfoContainer();
        this._setActionContainer();
        this._setMutation();
        this._setAdditionalLabel(this.label);
    }

    eventChange(value: any, previousValue: any) {
        consoleDebug('BaseField.eventChange()', value, previousValue);
    }

    eventClick(knot: Knot): void {
        consoleDebug('Button.eventClick()', knot);
    }

    render(): void {
        consoleDebug('BaseField.render()');
    }

    refresh(): void {
        consoleDebug('BaseField.refresh()');
    }

    modelChange(value: any) {
        consoleDebug('BaseField.modelChange()', value);
    }

    getPreviousValue(): any {
        consoleDebug('BaseField.getPreviousValue()');
        return undefined;
    }

    getName(): string {
        const name = this.input.getAttribute('name');
        return this._getAttributeName(name);
    }

    getValue(): any {
        const value = this.input.getNode().value;
        return typeCast(value);
    }

    protected _getAttributeName(inputName: string): string {
        let attribute = inputName || '';
        attribute = attribute.replace(/]/g, '');
        attribute = attribute.replace(/\[/g, '.');
        attribute = eq(attribute.slice(-1), '.')
            ? attribute.slice(0, -1)
            : attribute;
        return attribute;
    }

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

    isValidityValid(): boolean {
        const inputNode = this.input.getNode();

        return inputNode.validity.valid;
    }

    isValid(): boolean {
        return this.isValidityValid();
    }

    private _getUpgradedKnot(): Knot {
        return this.inputBlock;
    }

    setValue(value?: any): void {
        this.input.getNode().value = value;
        this.input.setAttribute('value', value);
        this.input.trigger('change');
    }

    exists(): boolean {
        return this.existsInputBlock() || this.existsInput();
    }

    existsInput(): boolean {
        return !!this.input && this.input.exists();
    }

    existsInputBlock(): boolean {
        return !!this.inputBlock && this.inputBlock.exists();
    }

    get(attribute: string): any {
        return this.input.get(attribute);
    }

    isRequired(): boolean {
        return this.input.getNode().required;
    }

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

    isEnabled(): boolean {
        return !this.isDisabled();
    }

    isDisabled(): boolean {
        return this.input.getNode().disabled;
    }

    setDisabled(state: boolean): void {
        if (state) {
            this.input.setAttribute('disabled');
        } else {
            this.input.removeAttribute('disabled');
        }
        this.input.getNode().disabled = state;
        this.checkValidity(true, false);
    }

    isVisible(): boolean {
        return !this.inputBlock.hasClass('hidden');
    }

    setVisibility(state: boolean): void {
        if (state) {
            this.show();
        } else {
            this.hide();
        }
    }

    show(): void {
        if (!this.isVisible()) {
            this.inputBlock.removeClass('hidden');
        }
    }

    hide(): void {
        if (this.isVisible()) {
            this.inputBlock.addClass('hidden');
        }
    }

    setLabel(text: string): void {
        if (this.label && !this.label.isEmpty()) {
            this.label.setHtml(text);
            this._setAdditionalLabel(this.label);
        }
    }

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

    protected _setAdditionalLabel(label: Knot | undefined): void {
        if (label?.exists()) {
            const labelText = this._getLabelRequiredText(label.getHtml(true));
            label.setHtml(labelText);
            this._setInfo(label);
        }
    }

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

    private _setMutation(): void {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (
                    mutation.attributeName === 'disabled' ||
                    mutation.attributeName === 'required'
                ) {
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
