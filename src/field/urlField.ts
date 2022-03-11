import { mdl } from '../utils/operation';
import { BaseField } from './baseField';
import { Item } from '../core/item';

/**
 * @class
 * @extends {BaseField}
 */
export class UrlField extends BaseField {
    protocol: string;
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
        this.inputBlock.addClass('url-field');

        /**
         * @private
         * @const {string}
         */
        this.protocol = /** @type {string} */(this).input.getData('protocol');

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

        if (this.protocol) {
            const protocolNode = new Item('span');
            protocolNode.addClass('protocol');
            protocolNode.setHtml(this.protocol);
            this.input.insertAfter(protocolNode);
        }

        this.refresh();
    }
    /**
     * @override
     */
    refresh() {
        if (this.isRequired() && this.getValue() === '') {
            this.inputBlock.addClass('is-invalid');
        }

        mdl(this.inputBlock);
    }
}
