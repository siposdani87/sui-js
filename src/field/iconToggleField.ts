import { typeCast } from '../utils/operation';
import { Knot } from '../core/knot';
import { BaseCheckboxField } from './baseCheckboxField';

/**
 * Icon-based toggle field with checked and unchecked icon states.
 *
 * Extends {@link BaseCheckboxField} to render a SUI
 * icon toggle that switches between two Material Icons based on the checked state.
 * The checked and unchecked icons are read from `data-checked` and `data-unchecked`
 * attributes on the input element.
 *
 * @example
 * // Input element should have data-checked and data-unchecked attributes:
 * // <input type="checkbox" data-checked="visibility" data-unchecked="visibility_off" />
 * const iconToggle = new IconToggleField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 *
 * @see {@link BaseCheckboxField}
 * @category Field
 */
export class IconToggleField extends BaseCheckboxField {
    /** The Material Icon name shown when the toggle is checked. */
    checkedIcon!: string;
    /** The Material Icon name shown when the toggle is unchecked. */
    uncheckedIcon!: string;
    /** The icon element rendered inside the toggle label. */
    icon!: Knot;

    /**
     * Renders the icon toggle with SUI classes, icon element, and label span.
     */
    override render(): void {
        this.label.addClass('sui-icon-toggle');

        this.checkedIcon = this.input.getData('checked');
        this.uncheckedIcon = this.input.getData('unchecked');

        this.icon = new Knot('em');
        this.icon.addClass(['sui-icon-toggle__label', 'material-icons']);
        this.icon.setHtml(
            this.input.getNode().checked
                ? this.checkedIcon
                : this.uncheckedIcon,
        );

        this.input.addClass('sui-icon-toggle__input');

        const labelText = this.label.getText();

        this.spanLabel = new Knot('span');
        this.spanLabel.addClass('sui-icon__label');
        this.spanLabel.setHtml(labelText);

        this.label.insert(this.input);
        this.label.appendChild(this.icon);
        this.label.appendChild(this.spanLabel);

        this.dataLabelKnot = new Knot('span');
        this.dataLabelKnot.addClass('field-label');
        this.label.insertBefore(this.dataLabelKnot);

        this.refresh();
    }

    /**
     * Handles the change event by updating the displayed icon and notifying the model.
     */
    protected override _change(): void {
        const value = this.getValue();
        this.icon.setHtml(
            this.input.getNode().checked
                ? this.checkedIcon
                : this.uncheckedIcon,
        );
        this.modelChange(value);
    }

    /**
     * Sets the toggle value and updates the displayed icon accordingly.
     *
     * @param {object | Array<unknown> | boolean | number | string | null | undefined} value The value to set.
     */
    override setValue(
        value:
            | object
            | Array<unknown>
            | boolean
            | number
            | string
            | null
            | undefined,
    ): void {
        const currentValue = typeCast(this.input.getAttribute('value'));
        this.input.getNode().checked = currentValue === value;
        if (!this.input.getNode().checked) {
            this.input.removeAttribute('checked');
        }
        this.icon.setHtml(
            this.input.getNode().checked
                ? this.checkedIcon
                : this.uncheckedIcon,
        );
        this.input.trigger('change');
    }
}
