import { Knot } from '../core/knot';
import { BaseCheckboxField } from './baseCheckboxField';

/**
 * MDL checkbox field with label and data label display.
 *
 * @description Extends {@link BaseCheckboxField} to render a Material Design Lite
 * checkbox input with a span label and a separate data label element.
 *
 * @example
 * const checkboxField = new CheckboxField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 *
 * @see {@link BaseCheckboxField}
 * @category Field
 */
export class CheckboxField extends BaseCheckboxField {
    /**
     * Creates a new CheckboxField instance.
     *
     * @param {Knot<HTMLInputElement>} input The checkbox input element.
     * @param {Knot} label The label element associated with the checkbox.
     * @param {Knot} error The error message element.
     * @param {Knot} inputBlock The container block for the input.
     */
    constructor(
        input: Knot<HTMLInputElement>,
        label: Knot,
        error: Knot,
        inputBlock: Knot,
    ) {
        super(input, label, error, inputBlock);
    }

    /**
     * Renders the checkbox with MDL classes, label span, and data label element.
     */
    override render(): void {
        this.label.addClass([
            'mdl-checkbox',
            'mdl-js-checkbox',
            'mdl-js-ripple-effect',
        ]);
        const id = this.input.getId()!;
        this.label.setFor(id);

        const labelText = this.label.getHtml(true);

        this.spanLabel = new Knot('span');
        this.spanLabel.addClass('mdl-checkbox__label');
        this.spanLabel.setHtml(labelText);

        this.input.addClass('mdl-checkbox__input');

        this.label.insert(this.input);
        this.label.appendChild(this.spanLabel);

        this.dataLabelKnot = new Knot('span');
        this.dataLabelKnot.addClass('field-label');
        this.label.insertBefore(this.dataLabelKnot);

        this.refresh();
    }
}
