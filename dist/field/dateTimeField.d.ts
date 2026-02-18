import { BaseField } from './baseField';
import { Popup } from '../component/popup';
import { DateTime } from '../component/dateTime';
import { Knot } from '../core/knot';
/**
 * Date/time picker field that presents a {@link DateTime} component inside a
 * {@link Popup} overlay.  The selected value is displayed as a formatted tag
 * in the input area.
 *
 * @example
 * const input = new Query<HTMLInputElement>('input.datetime', formKnot).getKnot();
 * const field = new DateTimeField(input, label, error, inputBlock);
 * field.render();
 *
 * @see {@link BaseField}
 * @see {@link DateTime}
 * @see {@link Popup}
 * @see {@link DateIO}
 * @category Field
 */
export declare class DateTimeField extends BaseField<HTMLInputElement> {
    /** Container element wrapping the datetime input display. */
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
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * Initializes the datetime container, input display, and inner components.
     */
    private _init;
    /**
     * Creates the {@link DateTime} picker, wires up change events, and
     * initializes the {@link Popup} overlay.
     */
    private _initInput;
    /**
     * Renders the field label, expander icon, and draws the datetime picker.
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
     * Sets the field value, updates the display tag, and triggers a change event.
     *
     * @param value The new date/time value.
     * @override
     */
    setValue(value: object | Array<unknown> | boolean | number | string | null | undefined): void;
    /**
     * Renders a formatted date/time tag inside the display area with an
     * optional close button.
     *
     * @param value The raw date/time string to format and display.
     */
    private _setTag;
    /**
     * Handles click on the input area or expander icon to toggle the popup.
     */
    private _onClick;
}
