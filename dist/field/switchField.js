import { Knot } from '../core/knot';
import { BaseCheckboxField } from './baseCheckboxField';
/**
 * MDL switch toggle field.
 *
 * @description Extends {@link BaseCheckboxField} to render a Material Design Lite
 * switch toggle with a span label and data label element.
 *
 * @example
 * const switchField = new SwitchField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 *
 * @see {@link BaseCheckboxField}
 * @category Field
 */
export class SwitchField extends BaseCheckboxField {
    /**
     * Creates a new SwitchField instance.
     *
     * @param {Knot<HTMLInputElement>} input The switch input element.
     * @param {Knot} label The label element associated with the switch.
     * @param {Knot} error The error message element.
     * @param {Knot} inputBlock The container block for the input.
     */
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
    }
    /**
     * Renders the switch with MDL classes, label span, and data label element.
     */
    render() {
        this.label.addClass([
            'mdl-switch',
            'mdl-js-switch',
            'mdl-js-ripple-effect',
        ]);
        const labelText = this.label.getText();
        this.spanLabel = new Knot('span');
        this.spanLabel.addClass('mdl-switch__label');
        this.spanLabel.setHtml(labelText);
        this.input.addClass('mdl-switch__input');
        this.label.insert(this.input);
        this.label.appendChild(this.spanLabel);
        this.dataLabelKnot = new Knot('span');
        this.dataLabelKnot.addClass('field-label');
        this.label.insertBefore(this.dataLabelKnot);
        this.refresh();
    }
}
