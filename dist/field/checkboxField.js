import { Knot } from '../core/knot';
import { BaseCheckboxField } from './baseCheckboxField';
/**
 * @class
 * @extends {BaseCheckbox}
 */
export class CheckboxField extends BaseCheckboxField {
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
     */
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
    }
    /**
     * @override
     * @return {undefined}
     */
    render() {
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
