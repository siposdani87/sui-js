import { mdl } from '../utils/render';
import { BaseField } from './baseField';
import { Item } from '../core/item';

/**
 * @class
 * @extends {BaseField}
 */
export class UrlField extends BaseField<HTMLInputElement> {
    protocol: string;
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(
        input: Item<HTMLInputElement>,
        label: Item,
        error: Item,
        inputBlock: Item,
    ) {
        super(input, label, error, inputBlock);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.inputBlock.addClass('url-field');

        /**
         * @private
         * @const {string}
         */
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
     * @override
     * @return {undefined}
     */
    render(): void {
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
