import { BaseField } from './baseField';
import { Popup } from '../component/popup';
import { DateTime } from '../component/dateTime';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { DateIO } from '../utils';

/**
 * @class
 * @extends {BaseField}
 */
export class DateTimeRangeField extends BaseField<HTMLInputElement> {
    isStartInput: boolean;
    datetimeContainer: Knot;
    datetimeInput: Knot;
    format: string;
    datetimeNode: Knot;
    datetime: DateTime;
    popup: Popup;
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
     * @param {boolean} isStartInput
     */
    constructor(
        input: Knot<HTMLInputElement>,
        label: Knot,
        error: Knot,
        inputBlock: Knot,
        isStartInput: boolean,
    ) {
        super(input, label, error, inputBlock);

        this.isStartInput = isStartInput;
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.inputBlock.addClass('datetime-range-field');
        this.input.addClass('hidden');

        this.datetimeContainer = new Query(
            '.datetime-container',
            this.inputBlock,
        ).getKnot();
        if (this.isStartInput) {
            this.datetimeContainer = new Knot('div');
            this.datetimeContainer.addClass('datetime-container');
            this.input.insertAfter(this.datetimeContainer);
        }

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
    private _initInput(): void {
        this.format = this.input.getData('format');

        this.input.addEventListener('change', () => {
            const value = this.getValue().toString();
            this.modelChange(value);
            return true;
        });

        const type = this.input.getAttribute('type');
        const value = this.getValue().toString();

        this.datetimeNode = new Knot('div');
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
    render(): void {
        if (this.label && this.label.exists()) {
            this.label.addClass('field-label');
        }

        const iconNode = new Knot('a');
        iconNode.setAttribute('href', 'javascript:void(0)');
        iconNode.addClass(['material-icons', 'size-24', 'expander']);
        if (this.isStartInput) {
            iconNode.setHtml('remove');
            this.datetimeInput.insertAfter(iconNode);
        } else {
            iconNode.setHtml('date_range');
            this.actionContainerNode.appendChild(iconNode);
        }
        iconNode.addEventListener('click', this._onClick.bind(this));

        this.refresh();
        this.datetime.draw();
    }
    /**
     * @override
     */
    refresh() {
        if (this.isDisabled()) {
            this.inputBlock.addClass('is-disabled');
        } else {
            this.inputBlock.removeClass('is-disabled');
        }
    }
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(
        value:
            | Object
            | Function
            | Array<any>
            | boolean
            | number
            | string
            | null
            | undefined,
    ): void {
        this._setTag(value as string);
        this.input.setAttribute('value', value);
        this.input.trigger('change');
        this.datetime.setValue(value as string);
    }
    /**
     * @private
     * @param {string} value
     * @return {undefined}
     */
    private _setTag(value: string): void {
        this.datetimeInput.removeChildren();
        if (value) {
            const date = DateIO.parse(value, this.datetime.getConfig().format);
            const formattedValue = DateIO.format(date, this.format);

            const tagNode = new Knot('div');
            tagNode.addClass('field-tag');
            tagNode.setHtml(formattedValue);
            this.datetimeInput.appendChild(tagNode);

            if (this.isEnabled()) {
                const iconNode = new Knot('a');
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
    private _onClick(): void {
        if (this.isEnabled()) {
            this.datetimeInput.addClass('active');
            this.popup.toggle();
        }
    }
}
