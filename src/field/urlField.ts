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
     * @description Initializes the field by reading the protocol data attribute and attaching input event listeners.
     */
    protected override _init(): void {
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
        this._renderTextField();

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
        this._refreshBase();
    }
}
