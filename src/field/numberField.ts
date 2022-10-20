import { typeCast } from '../utils/operation';
import { BaseField } from './baseField';
import { Knot } from '../core/knot';
import { mdl } from '../utils/render';

/**
 * @class
 * @extends {BaseField}
 */
export class NumberField extends BaseField<HTMLInputElement> {
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
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
     * @private
     * @return {undefined}
     */
    private _init(): void {
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
    private _initButtons(): void {
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
     * @private
     * @return {undefined}
     */
    private _checkValue(): void {
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
     * @private
     * @return {number}
     */
    private _getMax(): number {
        const max = this.input.getAttribute('max') || 9999999999;
        return typeCast(max);
    }
    /**
     * @private
     * @return {number}
     */
    private _getMin(): number {
        const min = this.input.getAttribute('min') || 0;
        return typeCast(min);
    }
    /**
     * @private
     * @return {number}
     */
    private _getStep(): number {
        const step = this.input.getAttribute('step') || 1;
        return typeCast(step);
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
