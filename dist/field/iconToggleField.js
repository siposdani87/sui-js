import { typeCast } from '../utils/operation';
import { Item } from '../core/item';
import { BaseCheckboxField } from './baseCheckboxField';
/**
 * @class
 * @extends {BaseCheckbox}
 */
export class IconToggleField extends BaseCheckboxField {
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
            'mdl-icon-toggle',
            'mdl-js-icon-toggle',
            'mdl-js-ripple-effect',
        ]);
        this.checkedIcon = /** @type {string} */ this.input.getData('checked');
        this.uncheckedIcon =
            /** @type {string} */ this.input.getData('unchecked');
        this.icon = new Item('em');
        this.icon.addClass(['mdl-icon-toggle__label', 'material-icons']);
        this.icon.setHtml(this.input.getNode().checked
            ? this.checkedIcon
            : this.uncheckedIcon);
        this.input.addClass('mdl-icon-toggle__input');
        const labelText = this.label.getText();
        this.spanLabel = new Item('span');
        this.spanLabel.addClass('mdl-icon__label');
        this.spanLabel.setHtml(labelText);
        this.label.insert(this.input);
        this.label.appendChild(this.icon);
        this.label.appendChild(this.spanLabel);
        this.dataLabelNode = new Item('span');
        this.dataLabelNode.addClass('field-label');
        this.label.insertBefore(this.dataLabelNode);
        this.refresh();
    }
    /**
     * @override
     * @protected
     * @return {undefined}
     */
    _change() {
        const value = this.getValue();
        this.icon.setHtml(this.input.getNode().checked
            ? this.checkedIcon
            : this.uncheckedIcon);
        this.modelChange(value);
    }
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value) {
        const currentValue = typeCast(this.input.getAttribute('value'));
        this.input.getNode().checked = currentValue === value;
        if (!this.input.getNode().checked) {
            this.input.removeAttribute('checked');
        }
        this.icon.setHtml(this.input.getNode().checked
            ? this.checkedIcon
            : this.uncheckedIcon);
        this.input.trigger('change');
    }
}
