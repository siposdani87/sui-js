import { Item } from '../core/item';
import { BaseCheckboxField } from './baseCheckboxField';
/**
 * @class
 * @extends {BaseCheckbox}
 */
export class CheckboxField extends BaseCheckboxField {
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
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
        this.label.setFor(/** @type {string} */ id);
        const labelText = this.label.getHtml(true);
        this.spanLabel = new Item('span');
        this.spanLabel.addClass('mdl-checkbox__label');
        this.spanLabel.setHtml(labelText);
        this.input.addClass('mdl-checkbox__input');
        this.label.insert(this.input);
        this.label.appendChild(this.spanLabel);
        this.dataLabelNode = new Item('span');
        this.dataLabelNode.addClass('field-label');
        this.label.insertBefore(this.dataLabelNode);
        this.refresh();
    }
}
