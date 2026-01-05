import { typeCast } from '../utils/operation';
import { Knot } from '../core/knot';
import { BaseCheckboxField } from './baseCheckboxField';

export class IconToggleField extends BaseCheckboxField {
    checkedIcon: string;
    uncheckedIcon: string;
    icon: Knot;

    constructor(
        input: Knot<HTMLInputElement>,
        label: Knot,
        error: Knot,
        inputBlock: Knot,
    ) {
        super(input, label, error, inputBlock);
    }

    render(): void {
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

    protected _change(): void {
        const value = this.getValue();
        this.icon.setHtml(
            this.input.getNode().checked
                ? this.checkedIcon
                : this.uncheckedIcon,
        );
        this.modelChange(value);
    }

    setValue(
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
