import { Knot } from '../core/knot';
import { BaseCheckboxField } from './baseCheckboxField';
/**
 * SUI checkbox field with label and data label display.
 *
 * @description Extends {@link BaseCheckboxField} to render a SUI
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
     * Renders the checkbox with SUI classes, label span, and data label element.
     */
    render() {
        this.label.addClass('sui-checkbox');
        const id = this.input.getId();
        this.label.setFor(id);
        const labelText = this.label.getHtml(true);
        this.spanLabel = new Knot('span');
        this.spanLabel.addClass('sui-checkbox__label');
        this.spanLabel.setHtml(labelText);
        this.input.addClass('sui-checkbox__input');
        this.label.insert(this.input);
        this.label.appendChild(this.spanLabel);
        this.dataLabelKnot = new Knot('span');
        this.dataLabelKnot.addClass('field-label');
        this.label.insertBefore(this.dataLabelKnot);
        this.refresh();
    }
}
