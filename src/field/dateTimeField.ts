import { BaseField } from './baseField';
import { Popup } from '../component/popup';
import { Date } from '../component/date';
import { Item } from '../core/item';

/**
 * @class
 * @extends {BaseField}
 */
export class DateTimeField extends BaseField<HTMLInputElement> {
    datetimeContainer: Item;
    datetimeInput: Item;
    format: string;
    datetimeNode: Item;
    datetime: Date;
    popup: Popup;
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(input: Item<HTMLInputElement>, label: Item, error: Item, inputBlock: Item) {
        super(input, label, error, inputBlock);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
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
    private _initInput(): void {
        this.format = this.input.getData('format');

        this.input.addEventListener('change', () => {
            const value = this.getValue().toString();
            this.modelChange(value);
            return true;
        });

        const type = this.input.getAttribute('type');
        const value = /** @type {string} */ this.getValue().toString();

        this.datetimeNode = new Item('div');
        this.datetime = new Date(this.datetimeNode, {
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
            const formattedValue = this.datetime.getValue();
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
        this._setTag(/** @type {string} */ value as string);
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
            const formattedValue = window['moment'](
                value,
                this.datetime.getConfig().format,
            )['format'](this.format);
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
    private _onClick(): void {
        if (this.isEnabled()) {
            this.datetimeInput.addClass('active');
            this.popup.toggle();
        }
    }
}
