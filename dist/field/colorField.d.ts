import { BaseField } from './baseField';
import { Canvas } from '../component/canvas';
import { Popup } from '../component/popup';
import { Tooltip } from '../component/tooltip';
import { Knot } from '../core/knot';
/**
 * Color picker field with a Material Design color palette and a
 * {@link Canvas}-based image picker.  Displays a color preview swatch and
 * opens a {@link Popup} with selectable colors on click.
 *
 * @example
 * const input = new Query<HTMLInputElement>('input.color', formKnot).getKnot();
 * const field = new ColorField(input, label, error, inputBlock);
 * field.render();
 *
 * @see {@link BaseField}
 * @see {@link Canvas}
 * @see {@link Popup}
 * @see {@link Tooltip}
 * @category Field
 */
export declare class ColorField extends BaseField<HTMLInputElement> {
    /** Tooltip displaying the current hex color value. */
    tooltip: Tooltip;
    /** Swatch element previewing the selected color. */
    previewKnot: Knot;
    /** Inner element within the preview swatch. */
    colorKnot: Knot;
    /** Popup overlay containing the color palette. */
    popup: Popup;
    /** Canvas used to render the color palette or image picker. */
    canvas: Canvas;
    /** Optional image element used as a custom color source. */
    image: Knot<HTMLImageElement>;
    /** Two-dimensional array of Material Design color hex values. */
    colors: string[][];
    /**
     * @param input The underlying `<input>` element wrapped in a {@link Knot}.
     * @param label The associated label element.
     * @param error The element used to display validation errors.
     * @param inputBlock The block-level container wrapping the entire field.
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * Initializes the color field, input listeners, image source, preview
     * swatch, and Material Design color palette.
     */
    private _init;
    /**
     * Renders the field label and refreshes the visual state.
     *
     * @override
     */
    render(): void;
    /**
     * Validates required state, updates disabled styling, and applies the
     * current color value to the preview swatch.
     *
     * @override
     */
    refresh(): void;
    /**
     * Hides the native input and wires up the change event to update the
     * preview and tooltip.
     */
    private _initInput;
    /**
     * Creates the preview swatch, popup overlay, and tooltip, then binds
     * the click handler to open the color picker.
     */
    private _initPreview;
    /**
     * Draws the color palette or image onto the canvas.
     */
    private _draw;
    /**
     * Locates an optional `<img>` element, creates the {@link Canvas},
     * and binds pixel-click to color selection.
     */
    private _initImage;
    /**
     * Populates the {@link colors} array with Material Design color swatches
     * ranging from shade 50 through 900.
     */
    private _setMaterialColors;
}
