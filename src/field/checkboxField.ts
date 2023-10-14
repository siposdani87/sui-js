import { Knot } from '../core/knot';
import { BaseCheckboxField } from './baseCheckboxField';

export class CheckboxField extends BaseCheckboxField {
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
            'mdl-checkbox',
            'mdl-js-checkbox',
            'mdl-js-ripple-effect',
        ]);
        const id = this.input.getId();
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
