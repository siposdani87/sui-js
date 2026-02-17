import { typeCast } from '../utils/operation';
import { Knot } from '../core/knot';
import { BaseCheckboxField } from './baseCheckboxField';

/**
 * Icon-based toggle field with checked and unchecked icon states.
 *
 * @description Extends {@link BaseCheckboxField} to render a Material Design Lite
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
    /** @description The Material Icon name shown when the toggle is checked. */
    checkedIcon!: string;
    /** @description The Material Icon name shown when the toggle is unchecked. */
    uncheckedIcon!: string;
    /** @description The icon element rendered inside the toggle label. */
    icon!: Knot;

    /**
     * Creates a new IconToggleField instance.
     *
     * @param {Knot<HTMLInputElement>} input The checkbox input element with icon data attributes.
     * @param {Knot} label The label element associated with the toggle.
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
     * Renders the icon toggle with MDL classes, icon element, and label span.
     */
    override render(): void {
        this.label.addClass([
            'mdl-icon-toggle',
            'mdl-js-icon-toggle',
            'mdl-js-ripple-effect',
        ]);

        this.checkedIcon = this.input.getData('checked');
        this.uncheckedIcon = this.input.getData('unchecked');

        this.icon = new Knot('em');
        this.icon.addClass(['mdl-icon-toggle__label', 'material-icons']);
        this.icon.setHtml(
            this.input.getNode().checked
                ? this.checkedIcon
                : this.uncheckedIcon,
        );

        this.input.addClass('mdl-icon-toggle__input');

        const labelText = this.label.getText();

        this.spanLabel = new Knot('span');
        this.spanLabel.addClass('mdl-icon__label');
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
     * @param {object | Function | Array<any> | boolean | number | string | null | undefined} value The value to set.
     */
    override setValue(
        value:
            | object
            | Function
            | Array<any>
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
