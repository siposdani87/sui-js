import { sui } from '../utils/render';
import { BaseField } from './baseField';
import { Knot } from '../core/knot';

/**
 * @description URL input field with optional protocol prefix display (e.g., "https://").
 *
 * @example
 * const urlField = new UrlField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 * urlField.render();
 *
 * @see {@link BaseField}
 *
 * @category Field
 */
export class UrlField extends BaseField<HTMLInputElement> {
    protocol!: string;

    /**
     * @description Creates a new UrlField instance.
     * @param {Knot<HTMLInputElement>} input - The URL input element.
     * @param {Knot} label - The label element.
     * @param {Knot} error - The error message element.
     * @param {Knot} inputBlock - The container block element.
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
     * @description Initializes the field by reading the protocol data attribute and attaching input event listeners.
     */
    private _init(): void {
        this.inputBlock.addClass('url-field');

        this.protocol = this.input.getData('protocol');

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
     * @description Applies SUI textfield classes and renders the protocol prefix span if configured.
     * @override
     */
    override render(): void {
        this.inputBlock.addClass(['sui-textfield']);
        this.input.addClass(['sui-textfield__input']);
        if (this.label && this.label.exists()) {
            this.label.addClass('sui-textfield__label');
        }

        if (this.protocol) {
            const protocolKnot = new Knot('span');
            protocolKnot.addClass('protocol');
            protocolKnot.setHtml(this.protocol);
            this.input.insertAfter(protocolKnot);
        }

        this.refresh();
    }

    /**
     * @description Marks the field as invalid when required and empty, then upgrades SUI components.
     * @override
     */
    override refresh() {
        if (this.isRequired() && this.getValue() === '') {
            this.inputBlock.addClass('is-invalid');
        }
        if (this.isDisabled()) {
            this.inputBlock.addClass('is-disabled');
        }

        sui(this.inputBlock);
    }
}
