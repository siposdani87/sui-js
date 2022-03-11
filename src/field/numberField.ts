import { typeCast, mdl } from '../utils/operation';
import { BaseField } from './baseField';
import { Item } from '../core/item';

/**
 * @class
 * @extends {BaseField}
 */
export class NumberField extends BaseField {
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(input: Item, label: Item, error: Item, inputBlock: Item) {
        super(input, label, error, inputBlock);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init(): void {
        this.inputBlock.addClass('number-field');

        this._initButtons();

        this.input.addEventListener('keyup', () => {
            this._checkValue();
            const value = this.getValue();
            this.modelChange(value);
            return true;
        });

        this.input.addEventListener('change', () => {
            this._checkValue();
            const value = this.getValue();
            this.modelChange(value);
            return true;
        });
    }
    /**
     * @private
     * @return {undefined}
     */
    _initButtons(): void {
        const actionNode = new Item('span');
        actionNode.addClass('step-change');
        this.actionContainerNode.appendChild(actionNode);

        const upButton = new Item('a');
        upButton.setAttribute('href', 'javascript:void(0)');
        upButton.addClass(['up-button', 'material-icons']);
        upButton.setHtml('keyboard_arrow_up');
        upButton.addEventListener('click', () => {
            if (this.isEnabled()) {
                let value = /** @type {number} */(this).getValue() || 0;
                value += this._getStep();
                this.setValue(value);
            }
        });
        actionNode.appendChild(upButton);

        const downButton = new Item('a');
        downButton.setAttribute('href', 'javascript:void(0)');
        downButton.addClass(['down-button', 'material-icons']);
        downButton.setHtml('keyboard_arrow_down');
        downButton.addEventListener('click', () => {
            if (this.isEnabled()) {
                let value = /** @type {number} */(this).getValue() || 0;
                value -= this._getStep();
                this.setValue(value);
            }
        });
        actionNode.appendChild(downButton);
    }
    /**
     * @private
     * @return {undefined}
     */
    _checkValue(): void {
        const value = /** @type {number} */(this).getValue();
        const min = this._getMin();
        if (value < min) {
            this.setValue(min);
        }
        const max = this._getMax();
        if (value > max) {
            this.setValue(max);
        }
    }
    /**
     * @private
     * @return {number}
     */
    _getMax(): number {
        const max = this.input.getAttribute('max') || 9999999999;
        return /** @type {number} */(typeCast)(max);
    }
    /**
     * @private
     * @return {number}
     */
    _getMin(): number {
        const min = this.input.getAttribute('min') || 0;
        return /** @type {number} */(typeCast)(min);
    }
    /**
     * @private
     * @return {number}
     */
    _getStep(): number {
        const step = this.input.getAttribute('step') || 1;
        return /** @type {number} */(typeCast)(step);
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
