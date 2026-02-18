import { typeCast } from '../utils/operation';
import { BaseField } from './baseField';
import { Knot } from '../core/knot';
import { mdl } from '../utils/render';
/**
 * @description Numeric input field with step up/down buttons and min/max value constraints.
 *
 * @example
 * const numberField = new NumberField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 * numberField.render();
 *
 * @see {@link BaseField}
 *
 * @category Field
 */
export class NumberField extends BaseField {
    /**
     * @description Creates a new NumberField instance.
     * @param {Knot<HTMLInputElement>} input - The numeric input element.
     * @param {Knot} label - The label element.
     * @param {Knot} error - The error message element.
     * @param {Knot} inputBlock - The container block element.
     */
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
        this._init();
    }
    /**
     * @description Initializes the field by adding CSS class, step buttons, and input event listeners.
     */
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
    /**
     * @description Creates step up and step down buttons in the action container.
     */
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
    /**
     * @description Clamps the current value within the min/max bounds.
     */
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
    /**
     * @description Returns the max attribute value or the default maximum (9999999999).
     * @returns {number}
     */
    _getMax() {
        const max = this.input.getAttribute('max') || 9999999999;
        return typeCast(max);
    }
    /**
     * @description Returns the min attribute value or the default minimum (0).
     * @returns {number}
     */
    _getMin() {
        const min = this.input.getAttribute('min') || 0;
        return typeCast(min);
    }
    /**
     * @description Returns the step attribute value or the default step (1).
     * @returns {number}
     */
    _getStep() {
        const step = this.input.getAttribute('step') || 1;
        return typeCast(step);
    }
    /**
     * @description Applies MDL textfield classes to the input block, input, and label, then refreshes.
     * @override
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
     * @description Marks the field as invalid when required and empty, then upgrades MDL components.
     * @override
     */
    refresh() {
        if (this.isRequired() && this.getValue() === '') {
            this.inputBlock.addClass('is-invalid');
        }
        mdl(this.inputBlock);
    }
}
