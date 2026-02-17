import { BaseField } from './baseField';
import { Popup } from '../component/popup';
import { DateTime } from '../component/dateTime';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { DateIO } from '../utils';

/**
 * Date/time range picker field with start and end inputs sharing a single
 * container.  Each instance wraps one end of the range and delegates to a
 * {@link DateTime} component inside a {@link Popup} overlay.
 *
 * @example
 * const startInput = new Query<HTMLInputElement>('input.start', formKnot).getKnot();
 * const endInput = new Query<HTMLInputElement>('input.end', formKnot).getKnot();
 * const startField = new DateTimeRangeField(startInput, label, error, inputBlock, true);
 * const endField = new DateTimeRangeField(endInput, label, error, inputBlock, false);
 *
 * @see {@link BaseField}
 * @see {@link DateTime}
 * @see {@link Popup}
 * @see {@link DateIO}
 * @category Field
 */
export class DateTimeRangeField extends BaseField<HTMLInputElement> {
    /** Whether this instance represents the start input of the range. */
    isStartInput: boolean;
    /** Container element wrapping both start and end datetime displays. */
    datetimeContainer!: Knot;
    /** Clickable element showing the formatted date/time tag. */
    datetimeInput!: Knot;
    /** Display format string read from the input's `data-format` attribute. */
    format!: string;
    /** Wrapper element for the {@link DateTime} component. */
    datetimeKnot!: Knot;
    /** The {@link DateTime} calendar/time picker component. */
    datetime!: DateTime;
    /** Popup overlay containing the datetime picker. */
    popup!: Popup;

    /**
     * @param input The underlying `<input>` element wrapped in a {@link Knot}.
     * @param label The associated label element.
     * @param error The element used to display validation errors.
     * @param inputBlock The block-level container wrapping the entire field.
     * @param isStartInput Whether this instance represents the start input of the range.
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
     * Initializes the range container, input display, and inner components.
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
     * Creates the {@link DateTime} picker, wires up change events, and
     * initializes the {@link Popup} overlay.
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
     * Renders the field label, range separator or expander icon, and draws
     * the datetime picker.
     *
     * @override
     */
    override render(): void {
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

    /**
     * Updates the disabled visual state of the field.
     *
     * @override
     */
    override refresh() {
        if (this.isDisabled()) {
            this.inputBlock.addClass('is-disabled');
        } else {
            this.inputBlock.removeClass('is-disabled');
        }
    }

    /**
     * Sets the field value, updates the display tag, synchronizes the
     * {@link DateTime} picker, and triggers a change event.
     *
     * @param value The new date/time value.
     * @override
     */
    override setValue(
        value:
            | object
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
     * Renders a formatted date/time tag inside the display area with an
     * optional close button.
     *
     * @param value The raw date/time string to format and display.
     */
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

    /**
     * Handles click on the input area or icon to toggle the popup.
     */
    private _onClick(): void {
        if (this.isEnabled()) {
            this.datetimeInput.addClass('active');
            this.popup.toggle();
        }
    }
}
