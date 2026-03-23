import { typeCast } from '../utils/operation';
import { BaseField } from './baseField';
import { Knot } from '../core/knot';

/**
 * Numeric input field with step up/down buttons and min/max value constraints.
 *
 * @example
 * const numberField = new NumberField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 * numberField.render();
 *
 * @see {@link BaseField}
 *
 * @category Field
 */
export class NumberField extends BaseField<HTMLInputElement> {
    /**
     * Initializes the field by adding CSS class, step buttons, and input event listeners.
     */
    protected override _init(): void {
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
     * Creates step up and step down buttons in the action container.
     */
    private _initButtons(): void {
        const actionKnot = new Knot('span');
        actionKnot.addClass('step-change');
        this.actionContainerKnot.appendChild(actionKnot);

        const upButton = new Knot('button');
        upButton.setAttribute('type', 'button');
        upButton.addClass(['up-button', 'icon-button', 'material-icons']);
        upButton.setHtml('keyboard_arrow_up');
        upButton.addEventListener('click', () => {
            if (this.isEnabled()) {
                let value = this.getValue() || 0;
                value += this._getStep();
                this.setValue(value);
            }
        });
        actionKnot.appendChild(upButton);

        const downButton = new Knot('button');
        downButton.setAttribute('type', 'button');
        downButton.addClass(['down-button', 'icon-button', 'material-icons']);
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
     * Clamps the current value within the min/max bounds.
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
     * Returns the max attribute value or the default maximum (9999999999).
     * @returns {number}
     */
    private _getMax(): number {
        const max = this.input.getAttribute('max') || 9999999999;
        return typeCast(max);
    }

    /**
     * Returns the min attribute value or the default minimum (0).
     * @returns {number}
     */
    private _getMin(): number {
        const min = this.input.getAttribute('min') || 0;
        return typeCast(min);
    }

    /**
     * Returns the step attribute value or the default step (1).
     * @returns {number}
     */
    private _getStep(): number {
        const step = this.input.getAttribute('step') || 1;
        return typeCast(step);
    }

    /**
     * Applies SUI textfield classes to the input block, input, and label, then refreshes.
     * @override
     */
    override render(): void {
        this._renderTextField();
        this.refresh();
    }

    /**
     * Marks the field as invalid when required and empty, then upgrades SUI components.
     * @override
     */
    override refresh() {
        this._refreshBase();
    }
}
