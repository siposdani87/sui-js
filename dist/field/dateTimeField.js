import { BaseField } from './baseField';
import { Popup } from '../component/popup';
import { DateTime } from '../component/dateTime';
import { Knot } from '../core/knot';
import { DateIO } from '../utils';
/**
 * @class
 * @extends {BaseField}
 */
export class DateTimeField extends BaseField {
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
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
        this.datetimeContainer = new Knot('div');
        this.datetimeContainer.addClass('datetime-container');
        this.input.insertAfter(this.datetimeContainer);
        this.datetimeInput = new Knot('div');
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
        this.datetimeKnot = new Knot('div');
        this.datetime = new DateTime(this.datetimeKnot, {
            value: value,
            type: type,
        });
        this.datetime.eventClick = (value) => {
            this.setValue(value);
        };
        this.popup = new Popup(this.datetimeKnot, this.inputBlock);
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
        const iconKnot = new Knot('a');
        iconKnot.setAttribute('href', 'javascript:void(0)');
        iconKnot.addClass(['material-icons', 'size-24', 'expander']);
        iconKnot.setHtml('date_range');
        iconKnot.addEventListener('click', this._onClick.bind(this));
        this.actionContainerKnot.appendChild(iconKnot);
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
            const tagKnot = new Knot('div');
            tagKnot.addClass('field-tag');
            tagKnot.setHtml(formattedValue);
            this.datetimeInput.appendChild(tagKnot);
            if (this.isEnabled()) {
                const iconKnot = new Knot('a');
                iconKnot.setAttribute('href', 'javascript:void(0)');
                iconKnot.addClass(['material-icons', 'size-18', 'close']);
                iconKnot.setHtml('close');
                iconKnot.addEventListener('click', () => {
                    this.setValue('');
                });
                tagKnot.addClass('tag-with-action');
                tagKnot.appendChild(iconKnot);
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
