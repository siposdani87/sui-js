import { mdl } from '../utils/render';
import { BaseField } from './baseField';
import { Knot } from '../core/knot';

export class UrlField extends BaseField<HTMLInputElement> {
    protocol!: string;

    constructor(
        input: Knot<HTMLInputElement>,
        label: Knot,
        error: Knot,
        inputBlock: Knot,
    ) {
        super(input, label, error, inputBlock);
        this._init();
    }

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

    override render(): void {
        this.inputBlock.addClass([
            'mdl-textfield',
            'mdl-js-textfield',
            'mdl-textfield--floating-label',
        ]);
        this.input.addClass(['mdl-textfield__input']);
        if (this.label && this.label.exists()) {
            this.label.addClass('mdl-textfield__label');
        }

        if (this.protocol) {
            const protocolKnot = new Knot('span');
            protocolKnot.addClass('protocol');
            protocolKnot.setHtml(this.protocol);
            this.input.insertAfter(protocolKnot);
        }

        this.refresh();
    }

    override refresh() {
        if (this.isRequired() && this.getValue() === '') {
            this.inputBlock.addClass('is-invalid');
        }

        mdl(this.inputBlock);
    }
}
