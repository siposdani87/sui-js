import { Knot } from '../core/knot';
import { BaseCheckboxField } from './baseCheckboxField';
export class SwitchField extends BaseCheckboxField {
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
    }
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
