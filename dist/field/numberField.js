import { typeCast } from '../utils/operation';
import { BaseField } from './baseField';
import { Knot } from '../core/knot';
import { mdl } from '../utils/render';
export class NumberField extends BaseField {
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
        this._init();
    }
    _init() {
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
    _initButtons() {
        const actionKnot = new Knot('span');
        actionKnot.addClass('step-change');
        this.actionContainerKnot.appendChild(actionKnot);
        const upButton = new Knot('a');
        upButton.setAttribute('href', 'javascript:void(0)');
        upButton.addClass(['up-button', 'material-icons']);
        upButton.setHtml('keyboard_arrow_up');
        upButton.addEventListener('click', () => {
            if (this.isEnabled()) {
                let value = this.getValue() || 0;
                value += this._getStep();
                this.setValue(value);
            }
        });
        actionKnot.appendChild(upButton);
        const downButton = new Knot('a');
        downButton.setAttribute('href', 'javascript:void(0)');
        downButton.addClass(['down-button', 'material-icons']);
        downButton.setHtml('keyboard_arrow_down');
        downButton.addEventListener('click', () => {
            if (this.isEnabled()) {
                let value = this.getValue() || 0;
                value -= this._getStep();
                this.setValue(value);
            }
        });
        actionKnot.appendChild(downButton);
    }
    _checkValue() {
        const value = this.getValue();
        const min = this._getMin();
        if (value < min) {
            this.setValue(min);
        }
        const max = this._getMax();
        if (value > max) {
            this.setValue(max);
        }
    }
    _getMax() {
        const max = this.input.getAttribute('max') || 9999999999;
        return typeCast(max);
    }
    _getMin() {
        const min = this.input.getAttribute('min') || 0;
        return typeCast(min);
    }
    _getStep() {
        const step = this.input.getAttribute('step') || 1;
        return typeCast(step);
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
}
