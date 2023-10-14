import { mdl } from '../utils/render';
import { BaseField } from './baseField';
export class TextField extends BaseField {
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
        this._init();
    }
    _init() {
        this.inputBlock.addClass('text-field');
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
    render() {
        this.inputBlock.addClass([
            'mdl-textfield',
            'mdl-js-textfield',
            'mdl-textfield--floating-label',
        ]);
        this.input.addClass(['mdl-textfield__input']);
        if (this.label && this.label.exists()) {
            this.label.addClass('mdl-textfield__label');
        }
        this.refresh();
    }
    refresh() {
        if (this.isRequired() && this.getValue() === '') {
            this.inputBlock.addClass('is-invalid');
        }
        mdl(this.inputBlock);
    }
    getValue() {
        return this.input.getNode().value;
    }
}
