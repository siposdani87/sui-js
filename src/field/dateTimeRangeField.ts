import { BaseField } from './baseField';
import { Popup } from '../component/popup';
import { DateTime } from '../component/dateTime';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { DateIO } from '../utils';

export class DateTimeRangeField extends BaseField<HTMLInputElement> {
    isStartInput: boolean;
    datetimeContainer: Knot;
    datetimeInput: Knot;
    format: string;
    datetimeKnot: Knot;
    datetime: DateTime;
    popup: Popup;

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

    private _initInput(): void {
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

    render(): void {
        if (this.label && this.label.exists()) {
            this.label.addClass('field-label');
        }

        const iconKnot = new Knot('a');
        iconKnot.setAttribute('href', 'javascript:void(0)');
        iconKnot.addClass(['material-icons', 'size-24', 'expander']);
        if (this.isStartInput) {
            iconKnot.setHtml('remove');
            this.datetimeInput.insertAfter(iconKnot);
        } else {
            iconKnot.setHtml('date_range');
            this.actionContainerKnot.appendChild(iconKnot);
        }
        iconKnot.addEventListener('click', this._onClick.bind(this));

        this.refresh();
        this.datetime.draw();
    }

    refresh() {
        if (this.isDisabled()) {
            this.inputBlock.addClass('is-disabled');
        } else {
            this.inputBlock.removeClass('is-disabled');
        }
    }

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

    private _setTag(value: string): void {
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

    private _onClick(): void {
        if (this.isEnabled()) {
            this.datetimeInput.addClass('active');
            this.popup.toggle();
        }
    }
}
