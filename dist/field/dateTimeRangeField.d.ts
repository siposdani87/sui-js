import { BaseField } from './baseField';
import { Popup } from '../component/popup';
import { DateTime } from '../component/dateTime';
import { Knot } from '../core/knot';
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
export declare class DateTimeRangeField extends BaseField<HTMLInputElement> {
    /** Whether this instance represents the start input of the range. */
    isStartInput: boolean;
    /** Container element wrapping both start and end datetime displays. */
    datetimeContainer: Knot;
    /** Clickable element showing the formatted date/time tag. */
    datetimeInput: Knot;
    /** Display format string read from the input's `data-format` attribute. */
    format: string;
    /** Wrapper element for the {@link DateTime} component. */
    datetimeKnot: Knot;
    /** The {@link DateTime} calendar/time picker component. */
    datetime: DateTime;
    /** Popup overlay containing the datetime picker. */
    popup: Popup;
    /**
     * @param input The underlying `<input>` element wrapped in a {@link Knot}.
     * @param label The associated label element.
     * @param error The element used to display validation errors.
     * @param inputBlock The block-level container wrapping the entire field.
     * @param isStartInput Whether this instance represents the start input of the range.
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot, isStartInput: boolean);
    /**
     * Initializes the range container, input display, and inner components.
     */
    private _init;
    /**
     * Creates the {@link DateTime} picker, wires up change events, and
     * initializes the {@link Popup} overlay.
     */
    private _initInput;
    /**
     * Renders the field label, range separator or expander icon, and draws
     * the datetime picker.
     *
     * @override
     */
    render(): void;
    /**
     * Updates the disabled visual state of the field.
     *
     * @override
     */
    refresh(): void;
    /**
     * Sets the field value, updates the display tag, synchronizes the
     * {@link DateTime} picker, and triggers a change event.
     *
     * @param value The new date/time value.
     * @override
     */
    setValue(value: object | Function | Array<any> | boolean | number | string | null | undefined): void;
    /**
     * Renders a formatted date/time tag inside the display area with an
     * optional close button.
     *
     * @param value The raw date/time string to format and display.
     */
    private _setTag;
    /**
     * Handles click on the input area or icon to toggle the popup.
     */
    private _onClick;
}
