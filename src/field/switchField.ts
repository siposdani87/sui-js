import { Knot } from '../core/knot';
import { BaseCheckboxField } from './baseCheckboxField';

/**
 * SUI switch toggle field.
 *
 * @description Extends {@link BaseCheckboxField} to render a SUI
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
     * Renders the switch with SUI classes, label span, and data label element.
     */
    override render(): void {
        this.label.addClass('sui-switch');

        const labelText = this.label.getText();

        this.spanLabel = new Knot('span');
        this.spanLabel.addClass('sui-switch__label');
        this.spanLabel.setHtml(labelText);

        this.input.addClass('sui-switch__input');

        this.label.insert(this.input);
        this.label.appendChild(this.spanLabel);

        this.dataLabelKnot = new Knot('span');
        this.dataLabelKnot.addClass('field-label');
        this.label.insertBefore(this.dataLabelKnot);

        this.refresh();
    }
}
