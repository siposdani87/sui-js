import { BaseField } from './baseField';
import { Popup } from '../component/popup';
import { DateTime } from '../component/dateTime';
import { Item } from '../core/item';
import { DateIO } from '../utils';
/**
 * @class
 * @extends {BaseField}
 */
export class DateTimeField extends BaseField {
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.inputBlock.addClass('datetime-field');
        this.input.addClass('hidden');
        this.datetimeContainer = new Item('div');
        this.datetimeContainer.addClass('datetime-container');
        this.input.insertAfter(this.datetimeContainer);
        this.datetimeInput = new Item('div');
        this.datetimeInput.addClass('datetime-input');
        this.datetimeInput.addEventListener('click', this._onClick.bind(this));
        this.datetimeContainer.appendChild(this.datetimeInput);
        this._initInput();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initInput() {
        this.format = this.input.getData('format');
        this.input.addEventListener('change', () => {
            const value = this.getValue().toString();
            this.modelChange(value);
            return true;
        });
        const type = this.input.getAttribute('type');
        const value = this.getValue().toString();
        this.datetimeNode = new Item('div');
        this.datetime = new DateTime(this.datetimeNode, {
            value: value,
            type: type,
        });
        this.datetime.eventClick = (value) => {
            this.setValue(value);
        };
        this.popup = new Popup(this.datetimeNode, this.inputBlock);
        this.popup.eventClose = () => {
            this.datetimeInput.removeClass('active');
        };
        if (value) {
            const formattedValue = this.datetime.getFormattedValue();
            this._setTag(formattedValue);
        }
    }
    /**
     * @override
     * @return {undefined}
     */
    render() {
        if (this.label && this.label.exists()) {
            this.label.addClass('field-label');
        }
        const iconNode = new Item('a');
        iconNode.setAttribute('href', 'javascript:void(0)');
        iconNode.addClass(['material-icons', 'size-24', 'expander']);
        iconNode.setHtml('date_range');
        iconNode.addEventListener('click', this._onClick.bind(this));
        this.actionContainerNode.appendChild(iconNode);
        this.refresh();
        this.datetime.draw();
    }
    /**
     * @override
     */
    refresh() {
        if (this.isDisabled()) {
            this.inputBlock.addClass('is-disabled');
        }
        else {
            this.inputBlock.removeClass('is-disabled');
        }
    }
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value) {
        this._setTag(value);
        this.input.setAttribute('value', value);
        this.input.trigger('change');
        this.datetime.setValue(value);
    }
    /**
     * @private
     * @param {string} value
     * @return {undefined}
     */
    _setTag(value) {
        this.datetimeInput.removeChildren();
        if (value) {
            const date = DateIO.parse(value, this.datetime.getConfig().format);
            const formattedValue = DateIO.format(date, this.format);
            const tagNode = new Item('div');
            tagNode.addClass('field-tag');
            tagNode.setHtml(formattedValue);
            this.datetimeInput.appendChild(tagNode);
            if (this.isEnabled()) {
                const iconNode = new Item('a');
                iconNode.setAttribute('href', 'javascript:void(0)');
                iconNode.addClass(['material-icons', 'size-18', 'close']);
                iconNode.setHtml('close');
                iconNode.addEventListener('click', () => {
                    this.setValue('');
                });
                tagNode.addClass('tag-with-action');
                tagNode.appendChild(iconNode);
            }
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    _onClick() {
        if (this.isEnabled()) {
            this.datetimeInput.addClass('active');
            this.popup.toggle();
        }
    }
}
