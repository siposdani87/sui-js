import { mdl } from '../utils/render';
import { BaseField } from './baseField';
/**
 * @class
 * @extends {BaseField}
 */
export class TextField extends BaseField {
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
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
    /**
     * @override
     * @return {undefined}
     */
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
    /**
     * @override
     * @return {undefined}
     */
    refresh() {
        if (this.isRequired() && this.getValue() === '') {
            this.inputBlock.addClass('is-invalid');
        }
        mdl(this.inputBlock);
    }
    /**
     * @override
     * @return {*}
     */
    getValue() {
        return this.input.getNode().value;
    }
}
