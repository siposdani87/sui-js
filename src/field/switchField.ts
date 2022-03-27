import { Item } from '../core/item';
import { BaseCheckboxField } from './baseCheckboxField';

/**
 * @class
 * @extends {BaseCheckbox}
 */
export class SwitchField extends BaseCheckboxField {
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(
        input: Item<HTMLInputElement>,
        label: Item,
        error: Item,
        inputBlock: Item,
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

        this.spanLabel = new Item('span');
        this.spanLabel.addClass('mdl-switch__label');
        this.spanLabel.setHtml(labelText);

        this.input.addClass('mdl-switch__input');

        this.label.insert(this.input);
        this.label.appendChild(this.spanLabel);

        this.dataLabelNode = new Item('span');
        this.dataLabelNode.addClass('field-label');
        this.label.insertBefore(this.dataLabelNode);

        this.refresh();
    }
}
