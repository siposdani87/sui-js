import { Knot } from '../core/knot';
import { BaseCheckboxField } from './baseCheckboxField';

/**
 * @class
 * @extends {BaseCheckbox}
 */
export class SwitchField extends BaseCheckboxField {
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
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
     * @override
     * @return {undefined}
     */
    render(): void {
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

        this.dataLabelNode = new Knot('span');
        this.dataLabelNode.addClass('field-label');
        this.label.insertBefore(this.dataLabelNode);

        this.refresh();
    }
}
